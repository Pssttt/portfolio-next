import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { GitHubStarField } from "@/components/about/GitHubStarField";

export const metadata: Metadata = {
  title: "About - Pyae Sone Shin Thant",
  description:
    "Computer Science student at KMUTT, passionate about DevOps and Backend Development. Currently serving as Dev Lead for a 50+ developer integrated project.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "DevOps",
    "Backend Development",
    "Dev Lead",
    "Computer Science",
    "Infrastructure",
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
