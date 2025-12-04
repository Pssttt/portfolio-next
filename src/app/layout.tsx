import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pyae Sone Shin Thant - Computer Science Student & Backend Developer",
  description:
    "CS student passionate about DevOps and Backend Development. Experience with React, Node.js, Hono, PostgreSQL, and cloud infrastructure.",
  authors: [{ name: "Pyae Sone Shin Thant" }],
  keywords: [
    "Backend Developer",
    "DevOps",
    "Computer Science",
    "React",
    "Node.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
