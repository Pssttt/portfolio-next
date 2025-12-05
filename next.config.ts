import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
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
        { theme: "catppuccin-mocha", keepBackground: true },
      ],
    ],
  },
});

export default withMDX(nextConfig);
