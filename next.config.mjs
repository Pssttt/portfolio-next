import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://analytics.psstee.dev",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "frame-src https://challenges.cloudflare.com https://giscus.app",
      "connect-src 'self' https://analytics.psstee.dev https://api.github.com",
    ].join("; "),
  },
];

const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          properties: { className: "autolink-heading" },
        },
      ],
      [
        "rehype-pretty-code",
        {
          theme: "catppuccin-mocha",
          keepBackground: true,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
