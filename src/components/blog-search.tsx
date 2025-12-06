"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { BlogPostMetadata } from "@/lib/blogs";

export function BlogSearch({
  initialPosts,
}: {
  initialPosts: BlogPostMetadata[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return initialPosts;

    const query = searchQuery.toLowerCase();
    return initialPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      return titleMatch || excerptMatch;
    });
  }, [searchQuery, initialPosts]);

  return (
    <>
      <div className="pt-6 pb-4">
        <input
          type="text"
          placeholder="Search posts... (title, content)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-primary/40 bg-card/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/80 focus:bg-card/70 transition-all"
        />
        {searchQuery && (
          <p className="text-xs text-muted-foreground mt-2">
            Found {filteredPosts.length} result
            {filteredPosts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="block border-2 border-primary/40 bg-card/40 rounded-lg px-6 py-5 hover:border-primary/80 hover:bg-card/70 hover:shadow-lg transition-all group"
          >
            <div className="space-y-2">
              <span className="text-cat-sapphire text-sm font-mono font-semibold">
                #{String(filteredPosts.length - index).padStart(2, "0")}
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

      {filteredPosts.length === 0 && searchQuery && (
        <div className="text-muted-foreground text-sm py-8">
          <p>$ grep -r "{searchQuery}" posts/</p>
          <p className="pt-2">No posts found matching your search.</p>
        </div>
      )}

      {initialPosts.length === 0 && !searchQuery && (
        <div className="text-muted-foreground text-sm py-8">
          <p>$ echo "No posts yet. Coming soon..."</p>
          <p className="pt-2">No posts yet. Coming soon...</p>
        </div>
      )}
    </>
  );
}
