"use client";

import { useState, useEffect } from "react";

const SHORTCUTS = [
  { key: "j", description: "Scroll down" },
  { key: "k", description: "Scroll up" },
  { key: "gg", description: "Go to top" },
  { key: "Shift+G", description: "Go to bottom" },
  { key: "Shift+H", description: "Home page" },
  { key: "1", description: "About" },
  { key: "2", description: "Projects" },
  { key: "3", description: "Tech Stack" },
  { key: "4", description: "Blogs" },
  { key: "5", description: "Contact" },
  { key: "?", description: "Show this help" },
];

export function ShortcutHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (
        (e.key === "?" || (e.key === "/" && e.shiftKey)) &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-card border-2 border-border rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-8 text-primary">
          Keyboard Shortcuts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHORTCUTS.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center gap-4 p-3 rounded border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors"
            >
              <kbd className="px-3 py-2 bg-muted border border-border rounded font-mono text-sm font-bold text-primary min-w-fit whitespace-nowrap">
                {shortcut.key}
              </kbd>
              <span className="text-base text-foreground">
                {shortcut.description}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6 text-center">
          Press{" "}
          <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">
            ESC
          </kbd>{" "}
          to close
        </p>
      </div>
    </div>
  );
}
