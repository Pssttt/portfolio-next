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
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-light text-foreground">
          <span className="text-primary">[blogs]</span> My Writings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Documenting my journey in backend development, DevOps, and
          infrastructure.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="block border-2 border-primary/40 bg-card/40 rounded-lg px-6 py-5 hover:border-primary/80 hover:bg-card/70 hover:shadow-lg transition-all group"
          >
            <div className="space-y-2">
              <span className="text-cat-sapphire text-sm font-mono font-semibold">
                #{String(posts.length - index).padStart(2, "0")}
              </span>
              <h2 className="text-lg sm:text-xl text-foreground font-semibold group-hover:text-cat-sapphire transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="text-cat-yellow">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <span className="text-cat-sky group-hover:text-cat-teal text-sm hover:underline inline-flex items-center gap-1 font-medium">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-muted-foreground text-sm py-8">
          <p>$ echo "No posts yet. Coming soon..."</p>
          <p className="pt-2">No posts yet. Coming soon...</p>
        </div>
      )}
    </>
  );
}
