"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    path: "/about",
    label: "About",
    mobileLabel: "About",
    shortcut: "1",
    command: "cat about.txt",
  },
  {
    path: "/projects",
    label: "Projects",
    mobileLabel: "Work",
    shortcut: "2",
    command: "ls projects/",
  },
  {
    path: "/tech-stack",
    label: "Tech Stack",
    mobileLabel: "Tech",
    shortcut: "3",
    command: "ls tech-stack/",
  },
  {
    path: "/blogs",
    label: "Blogs",
    mobileLabel: "Blogs",
    shortcut: "4",
    command: "ls blogs/",
  },
  {
    path: "/contact",
    label: "Contact",
    mobileLabel: "Contact",
    shortcut: "5",
    command: "fastfetch",
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentItem = navItems.find(
    (item) =>
      pathname === item.path ||
      (item.path === "/blogs" && pathname.startsWith("/blogs/")) ||
      (item.path === "/projects" && pathname.startsWith("/projects/"))
  );

  return (
    <>
      {/* Mobile Drawer Toggle & Current Page */}
      <div className="md:hidden border-b-2 border-primary bg-card flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/20 active:bg-primary/30 transition-all cursor-pointer border border-transparent hover:border-primary/40"
          aria-label="Toggle navigation drawer"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={drawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
          <span className="text-sm font-medium text-foreground">{currentItem?.label || "Menu"}</span>
        </button>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r-2 border-primary z-50 md:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path === "/blogs" && pathname.startsWith("/blogs/")) ||
                (item.path === "/projects" && pathname.startsWith("/projects/"));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`
                    px-6 py-4 text-sm font-medium
                    border-b-2 border-primary last:border-b-0
                    hover:bg-primary/20 transition-all
                    ${
                      isActive
                        ? "bg-primary/30 text-foreground"
                        : "text-muted-foreground"
                    }
                  `}
                  title={`${item.command} (Press ${item.shortcut})`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex border-b-2 border-primary bg-card w-full items-center">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path === "/blogs" && pathname.startsWith("/blogs/")) ||
            (item.path === "/projects" && pathname.startsWith("/projects/"));
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex-1 px-1 sm:px-6 py-3 sm:py-4 
                text-[10px] xs:text-xs sm:text-base font-medium 
                border-r-2 border-primary last:border-r-0
                hover:bg-primary/20 transition-all
                flex items-center justify-center gap-1 sm:gap-2
                ${
                  isActive
                    ? "bg-primary/30 text-foreground"
                    : "text-muted-foreground"
                }
              `}
              title={`${item.command} (Press ${item.shortcut})`}
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="hidden sm:inline text-xs text-primary/60">
                {item.shortcut}
              </span>
              <span className="hidden sm:inline whitespace-nowrap">
                {item.label}
              </span>
              {isActive && (
                <span className="text-primary hidden sm:inline">●</span>
              )}
            </Link>
          );
        })}
        <span
          className="px-3 py-4 text-xs text-muted-foreground/50 whitespace-nowrap select-none hidden lg:flex items-center gap-1"
          title="Press ? to see all keyboard shortcuts"
        >
          <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded font-mono text-xs text-primary/60">?</kbd>
          <span>shortcuts</span>
        </span>
      </nav>
    </>
  );
}
