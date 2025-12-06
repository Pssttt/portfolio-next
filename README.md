# Pyae Sone Shin Thant - Portfolio

A modern, performant portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features MDX-based blog posts, dark mode support, and optimized for SEO and performance.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com) for blog posts with syntax highlighting
- **Code Highlighting**: [Shiki](https://shiki.matsu.io)
- **Fonts**: Custom "Hack" font with Next.js font optimization
- **Dark Mode**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Code Quality**: [Biome](https://biomejs.dev)
- **Deployment**: Docker, Vercel-ready (Coolify now)

## 📋 Features

- Server-side rendered React components
- MDX blog with code syntax highlighting and auto-linked headings
- Dark/Light theme support
- Fully responsive design
- Accessibility-first (skip-to-content, semantic HTML)
- SEO optimized with metadata
- Optimized fonts and assets
- Docker support for containerized deployment

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone repository
git clone https://github.com/Pssttt/portfolio-next
cd portfolio-next

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Changes auto-reload.

### Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linter/formatter
pnpm lint
pnpm format
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # Home page layout
│   ├── (main)/            # Main content routes
│   │   └── blogs/         # Blog posts
│   ├── layout.tsx         # Root layout
│   └── favicon.ico
├── components/            # Reusable React components
├── data/                  # Static data & configuration
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities & helpers
public/
├── fonts/                 # Custom fonts
├── blogs/                 # Blog post assets
└── [favicons & manifest]
```

## 📝 Writing Blog Posts

Blog posts are MDX files stored in `public/blogs/`. Each post requires front matter:

```yaml
---
title: "Your Post Title"
date: "2025-12-06"
excerpt: "Brief description"
---
```

Posts support:

- Markdown formatting
- Code blocks with syntax highlighting
- GitHub Flavored Markdown (tables, strikethrough, etc.)
- Auto-linked headings with anchor navigation

## 🐳 Docker Deployment

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📈 Performance Optimizations

- Next.js Image optimization
- Custom font preloading
- Automatic code splitting
- Static site generation where applicable
- Metadata optimization for SEO

## 🔧 Configuration

- **Tailwind**: `tailwind.config.mjs`
- **Next.js**: `next.config.mjs`
- **Biome**: `biome.json` (linting & formatting)
- **TypeScript**: `tsconfig.json`

## 📜 License

Personal portfolio project.
