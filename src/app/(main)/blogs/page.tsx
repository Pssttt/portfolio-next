import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogs";
import type { Metadata } from "next";

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
      <div className="text-sm sm:text-base text-foreground mb-6 sm:mb-8 font-medium font-mono">
        $ ls blogs/
      </div>

      <div className="space-y-4 my-12">
        <h1 className="text-2xl sm:text-3xl font-light text-foreground">
          <span className="text-primary">[blogs]</span> My Writings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Documenting my journey in backend development, DevOps, and
          infrastructure.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="block group border border-primary/20 p-6 rounded hover:border-primary/40 hover:bg-card/50 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-cat-sapphire group-hover:text-cat-teal transition-colors">
                  {post.title}
                </h2>
                <time className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
