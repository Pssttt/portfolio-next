import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const hack = localFont({
  src: [
    {
      path: "../../public/fonts/hack-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hack-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hack",
});

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hack.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e1e2e" />
        <script
          defer
          src="https://analytics.psstee.dev/script.js"
          data-website-id="97f72dc7-90e0-4336-94f3-b90be3ef6ac9"
        />
      </head>
      <body className="antialiased">
        <Providers>
          <CustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to main content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
