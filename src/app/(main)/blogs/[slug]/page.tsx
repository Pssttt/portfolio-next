import { getAllBlogPosts, getAdjacentPostsData } from "@/lib/blogs";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Comments } from "@/components/blog/Comments";
import { calculateReadingTime } from "@/lib/reading-time";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Blog Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Pyae Sone Shin Thant" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: `/blogs/${slug}/opengraph-image` }],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  const adjacentPosts = await getAdjacentPostsData(slug);

  if (!post) {
    notFound();
  }

  const MDXContent = dynamic(
    () => import(`./${slug}.mdx`).then((mod) => mod.default),
    { loading: () => <div>Loading...</div> },
  );

  return (
    <div className="space-y-8">
      <Link
        href="/blogs"
        className="text-sm text-cat-sky hover:text-cat-sapphire hover:underline transition-colors inline-flex items-center gap-1"
      >
        ← Back to Blogs
      </Link>

      <div className="flex gap-8 max-w-6xl">
        <div className="flex-1 min-w-0">
          <article className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-cat-sapphire">
                {post.title}
              </h1>
              <div className="flex flex-col gap-3">
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span>{calculateReadingTime(post.content)} min read</span>
                  <span>•</span>
                  <ShareLinks title={post.title} slug={slug} />
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground [&_p]:text-muted-foreground [&_p]:my-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:list-inside [&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:list-inside [&_li]:text-muted-foreground [&_a]:text-cat-sky [&_a:hover]:underline [&_code]:text-cat-red [&_code]:bg-cat-surface0 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-cat-surface0 [&_pre]:border [&_pre]:border-primary/20 [&_pre]:rounded [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic [&_hr]:border-primary/30 [&_hr]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_img]:my-4 [&_.autolink-heading]:no-underline [&_.autolink-heading]:text-foreground">
              <MDXContent />
            </div>
          </article>
        </div>

        <TableOfContents />
      </div>

      {(adjacentPosts.prev || adjacentPosts.next) && (
        <div className="max-w-4xl mt-12 pt-8 border-t border-primary/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adjacentPosts.prev ? (
            <Link
              href={`/blogs/${adjacentPosts.prev.slug}`}
              className="group border border-primary/30 p-4 hover:bg-card/50 transition-all"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5m0 0l7 7m-7-7l7-7"
                  />
                </svg>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Previous
                  </div>
                  <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {adjacentPosts.prev.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {adjacentPosts.next ? (
            <Link
              href={`/blogs/${adjacentPosts.next.slug}`}
              className="group border border-primary/30 p-4 hover:bg-card/50 transition-all sm:text-right"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <svg
                  className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m0 0l-7-7m7 7l-7 7"
                  />
                </svg>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Next</div>
                  <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {adjacentPosts.next.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      )}

      <div className="max-w-4xl">
        <Comments />
      </div>
    </div>
  );
}
