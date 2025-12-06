export function calculateReadingTime(content: string | undefined): number {
  const wordsPerMinute = 200;
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
