import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { GitHubStarField } from "@/components/about/GitHubStarField";

export const metadata: Metadata = {
  title: "About - Pyae Sone Shin Thant",
  description:
    "CS student & DevOps Engineer Intern at social.plus. Passionate about backend development, cloud infrastructure, and CI/CD pipelines.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "DevOps",
    "Backend Development",
    "social.plus",
    "Computer Science",
    "Infrastructure",
    "Docker",
    "AWS",
  ],
};

export default function AboutPage() {
  return (
    <>
      <div className="text-sm sm:text-base text-foreground mb-6 sm:mb-8 font-medium font-mono">
        $ bat about.txt
      </div>
      <div className="min-h-[400px]">
        <About />
        <GitHubStarField />
      </div>
    </>
  );
}
