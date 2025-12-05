import Projects from "@/components/projects/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Pyae Sone Shin Thant",
  description:
    "Featured projects showcasing expertise in full-stack development, real-time systems, AI integration, and enterprise architecture. From Smart City Hub to AI-powered platforms.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "Projects",
    "Full-stack",
    "React",
    "Next.js",
    "Node.js",
    "AI",
    "Web Development",
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <div className="text-sm sm:text-base text-foreground mb-6 sm:mb-8 font-medium font-mono">
        $ ls projects/
      </div>
      <div className="min-h-[400px]">
        <Projects />
      </div>
    </>
  );
}
