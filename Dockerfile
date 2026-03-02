# Build
FROM node:22-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@10.24.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY

RUN pnpm build

# Production
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["node", "server.js"]
