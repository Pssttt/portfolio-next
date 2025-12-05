"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="px-3 py-2 border-2 border-primary hover:bg-primary/20 transition-all text-foreground font-medium text-sm font-mono"
        disabled
      >
        [◐]
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 border-2 border-primary hover:bg-primary/20 transition-all text-foreground font-medium text-sm font-mono"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Currently ${theme} mode. Click to switch.`}
    >
      {theme === "dark" ? "[☀]" : "[☾]"}
    </button>
  );
}
