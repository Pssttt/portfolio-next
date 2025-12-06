import { Footer } from "@/components/contact/Footer";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Pyae Sone Shin Thant",
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
      <div className="min-h-[400px] space-y-12">
        <div>
          <Footer />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
