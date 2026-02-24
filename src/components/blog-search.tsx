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
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const post of initialPosts) {
      for (const tag of post.tags ?? []) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    if (activeTag) {
      posts = posts.filter((post) => post.tags?.includes(activeTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        return titleMatch || excerptMatch;
      });
    }

    return posts;
  }, [searchQuery, activeTag, initialPosts]);

  const isFiltering = searchQuery.trim() || activeTag;

  return (
    <>
      <div className="pt-6 pb-4 space-y-4">
        <input
          type="text"
          placeholder="Search posts... (title, content)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-primary/40 bg-card/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/80 focus:bg-card/70 transition-all"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Filter by tag">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
                  activeTag === tag
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-primary/30 bg-card/40 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
                aria-pressed={activeTag === tag}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <p
          className="text-xs text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {isFiltering
            ? `Found ${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""}`
            : ""}
        </p>
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
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="text-cat-yellow">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 font-mono text-cat-mauve bg-cat-surface0 border border-cat-surface1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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

      {filteredPosts.length === 0 && isFiltering && (
        <div className="text-muted-foreground text-sm py-8">
          <p>$ grep -r "{searchQuery || `#${activeTag}`}" posts/</p>
          <p className="pt-2">No posts found matching your search.</p>
        </div>
      )}

      {initialPosts.length === 0 && !isFiltering && (
        <div className="text-muted-foreground text-sm py-8">
          <p>$ echo "No posts yet. Coming soon..."</p>
          <p className="pt-2">No posts yet. Coming soon...</p>
        </div>
      )}
    </>
  );
}
