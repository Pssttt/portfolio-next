# Build
FROM node:25-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.24.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production
FROM node:25-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

RUN npm install -g pnpm@10.24.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod && \
  pnpm store prune

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["pnpm", "start"]
