import { TechStack } from "@/components/tech-stack/TechStack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack - Pyae Sone Shin Thant",
  description:
    "Technologies and tools I work with. Full-stack development, DevOps, cloud infrastructure, and modern tooling.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Docker",
    "Kubernetes",
    "AWS",
    "DevOps",
  ],
};

export default function TechStackPage() {
  return (
    <>
      <div className="text-sm sm:text-base text-foreground mb-6 sm:mb-8 font-medium font-mono">
        $ ls tech-stack/
      </div>
      <div className="min-h-[400px]">
        <TechStack />
      </div>
    </>
  );
}
