"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  ogImage?: string;
  content?: string;
}

const blogsDir = path.join(process.cwd(), "src/app/(main)/blogs/[slug]");

export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  try {
    const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".mdx"));

    return files
      .map((file) => {
        const filePath = path.join(blogsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          slug: file.replace(".mdx", ""),
          title: data.title || "",
          date: data.date || "",
          excerpt: data.excerpt || "",
          ogImage: data.ogImage,
          content: fileContent,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getAdjacentPostsData(currentSlug: string): Promise<{
  prev: BlogPostMetadata | null;
  next: BlogPostMetadata | null;
}> {
  const posts = await getAllBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}
