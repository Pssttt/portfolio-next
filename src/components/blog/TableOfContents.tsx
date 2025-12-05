"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3"),
    ).map((heading) => ({
      id: heading.id,
      title: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }));

    setItems(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "0px 0px -66% 0px" },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <nav className="sticky top-32 space-y-3 text-sm w-56 max-h-[calc(100vh-200px)] overflow-y-auto">
        <p className="font-semibold text-foreground text-base">On this page</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={`block py-1 transition-all duration-200 ${
                  item.level === 3 ? "pl-4" : ""
                } ${
                  activeId === item.id
                    ? "text-cat-sapphire font-semibold border-l-2 border-cat-sapphire pl-3"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
