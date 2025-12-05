"use client";

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

  return (
    <nav className="flex border-b-2 border-primary bg-card">
      {navItems.map((item, index) => {
        const isActive =
          pathname === item.path ||
          (item.path === "/blogs" && pathname.startsWith("/blogs/"));
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
            <span className="sm:hidden whitespace-nowrap">
              {item.mobileLabel}
            </span>
            {isActive && (
              <span className="text-primary hidden sm:inline">●</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
