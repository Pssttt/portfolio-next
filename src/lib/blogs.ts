import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  ogImage?: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

const blogsDir = path.join(process.cwd(), "public/blogs");

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(blogsDir, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      ogImage: data.ogImage,
      content,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPostMetadata[] {
  try {
    const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

    return files
      .map((file) => {
        const filePath = path.join(blogsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          slug: file.replace(".md", ""),
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          ogImage: data.ogImage,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getAdjacentPosts(
  currentSlug: string
): { prev: string | null; next: string | null } {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  return {
    prev:
      currentIndex < posts.length - 1 ? posts[currentIndex + 1].slug : null,
    next: currentIndex > 0 ? posts[currentIndex - 1].slug : null,
  };
}

export function getAdjacentPostsData(
  currentSlug: string
): { prev: BlogPostMetadata | null; next: BlogPostMetadata | null } {
  const { prev, next } = getAdjacentPosts(currentSlug);
  const posts = getAllBlogPosts();

  return {
    prev: prev ? posts.find((p) => p.slug === prev) || null : null,
    next: next ? posts.find((p) => p.slug === next) || null : null,
  };
}
