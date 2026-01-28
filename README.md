# Pyae Sone Shin Thant - Portfolio

A modern, performant portfolio website built with Next.js 16, React 19, and TypeScript. This project features MDX-based blog posts, dark mode support, and is optimized for SEO and high performance.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com) for blog posts with syntax highlighting
- **Code Highlighting**: [Shiki](https://shiki.matsu.io)
- **Fonts**: Custom "Hack" font with Next.js font optimization
- **Dark Mode**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Comments**: [Giscus](https://giscus.app)
- **Code Quality**: [Biome](https://biomejs.dev)
- **Deployment**: Docker, Coolify / Vercel-ready

## Features

- **Server-Side Rendering**: Optimized React components for fast initial load and SEO.
- **Interactive Blog**: MDX-powered blog with code syntax highlighting, auto-linked headings, and Giscus comments.
- **Custom Terminal Cursor**: A unique terminal-styled interactive cursor with context-aware states (hover, click, text).
- **Vim-Style Navigation**: Full site navigation support using keyboard shortcuts (h, j, k, l) for a power-user experience.
- **Keyboard Shortcuts**: Comprehensive shortcut system with a visual help guide (accessible via `?`).
- **Contact System**: Integrated contact form with message persistence and admin management interface.
- **Resume Tracking**: Automated statistics tracking for resume downloads.
- **Responsive Design**: Fluid layout optimized for all screen sizes and devices.
- **Accessibility**: Built with semantic HTML, skip-to-content links, and keyboard focus management.
- **Dark/Light Themes**: Full theme support using Catppuccin color palettes (Mocha and Latte).

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) to view the site.

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

## Project Structure

```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── (home)/            # Landing page
│   ├── (main)/            # Main content routes (blogs, projects, etc.)
│   ├── admin/             # Admin dashboard for stats and messages
│   └── api/               # Serverless API routes
├── components/            # Reusable React components
├── data/                  # Static data, projects, and local persistence
├── hooks/                 # Custom React hooks (navigation, tracking)
└── lib/                   # Utility functions and shared helpers
public/
├── fonts/                 # Custom Hack font files
├── blogs/                 # Blog post assets and OG images
└── [assets]               # Favicons, manifests, and site assets
```

## Writing Blog Posts

Blog posts are MDX files stored in `public/blogs/`. Each post requires front matter configuration:

```yaml
---
title: "Your Post Title"
date: "2025-12-06"
excerpt: "Brief description of the post"
---
```

Posts support full Markdown formatting, code blocks with Shiki syntax highlighting, and GitHub Flavored Markdown features.

## Docker Deployment

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Performance & Optimization

- **Next.js Image Optimization**: Automatic resizing and format conversion.
- **Font Preloading**: Optimized delivery of the custom Hack font.
- **Static Generation**: High-performance static site generation for blog content.
- **Metadata Management**: Dynamic SEO optimization for every page.
- **Zero-Config Linting**: Enforced standards using Biome for near-instant linting and formatting.

## Configuration

- **Tailwind**: `tailwind.config.mjs`
- **Next.js**: `next.config.mjs`
- **Biome**: `biome.json`
- **TypeScript**: `tsconfig.json`

## License

Personal portfolio project.
