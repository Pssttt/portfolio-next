"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 border-2 border-primary hover:bg-primary/20 transition-all text-foreground font-medium text-sm font-mono"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Currently ${theme} mode. Click to switch.`}
    >
      {theme === "dark" ? "[☀]" : "[☾]"}
    </button>
  );
}

