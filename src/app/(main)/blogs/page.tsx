import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { getAllBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogs - Pyae Sone Shin Thant",
  description:
    "Technical writing on DevOps, backend development, and infrastructure. Learning from real-world project experiences and best practices.",
  keywords: [
    "Blog",
    "DevOps",
    "Backend",
    "Infrastructure",
    "Technical Writing",
  ],
};

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <div className="space-y-4">
        <div className="text-sm font-mono text-muted-foreground">
          $ ls blogs/
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          <span className="text-primary">[blogs]</span> My Writings
        </h1>
        <p className="text-secondary max-w-2xl">
          Documenting my journey in backend development, DevOps, and
          infrastructure.{" "}
        </p>
      </div>

      <BlogSearch initialPosts={posts} />
    </>
  );
}
