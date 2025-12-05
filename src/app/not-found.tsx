"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-sm sm:text-base text-foreground font-medium font-mono">
          $ cd {pathname}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-4xl sm:text-5xl font-bold text-cat-red font-mono">
              <span className="text-cat-red">bash:</span> cd: {pathname}: No
              such file or directory
            </div>
            <div className="text-muted-foreground text-sm sm:text-base font-mono">
              <span className="text-cat-yellow">[error 404]</span> The requested
              path does not exist
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-primary/30">
            <p className="text-foreground text-sm font-mono">
              <span className="text-primary">$</span> ls /available-routes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground text-sm pl-4">
              <Link
                href="/about"
                className="text-cat-sky hover:text-primary hover:underline transition-colors flex items-center gap-2 group"
                aria-label="Navigate to about page"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>{" "}
                /about
              </Link>
              <Link
                href="/projects"
                className="text-cat-sky hover:text-primary hover:underline transition-colors flex items-center gap-2 group"
                aria-label="Navigate to projects page"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>{" "}
                /projects
              </Link>
              <Link
                href="/tech-stack"
                className="text-cat-sky hover:text-primary hover:underline transition-colors flex items-center gap-2 group"
                aria-label="Navigate to tech stack page"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>{" "}
                /tech-stack
              </Link>
              <Link
                href="/blogs"
                className="text-cat-sky hover:text-primary hover:underline transition-colors flex items-center gap-2 group"
                aria-label="Navigate to blog page"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>{" "}
                /blogs
              </Link>
              <Link
                href="/contact"
                className="text-cat-sky hover:text-primary hover:underline transition-colors flex items-center gap-2 group"
                aria-label="Navigate to contact page"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>{" "}
                /contact
              </Link>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/"
              className="inline-block px-6 py-3 border-2 border-primary hover:bg-primary/20 hover:border-accent transition-all text-foreground font-medium text-sm font-mono group"
              aria-label="Return to home page"
            >
              $ cd ~{" "}
              <span className="group-hover:text-accent transition-colors">
                (Go Home)
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
