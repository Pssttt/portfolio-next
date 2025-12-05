import { Footer } from "@/components/contact/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pyae Sone Shin Thant. Available for collaborations, job opportunities, and technical discussions. Find me on GitHub, LinkedIn, and email.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "Backend Developer",
    "DevOps",
    "Computer Science",
    "React",
    "Node.js",
  ],
};

export default function ContactPage() {
  return (
    <>
      <div className="text-sm sm:text-base text-foreground mb-6 sm:mb-8 font-medium font-mono">
        $ fastfetch
      </div>
      <div className="min-h-[400px]">
        <Footer />
      </div>
    </>
  );
}
