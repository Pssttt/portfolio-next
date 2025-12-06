"use client";

import { ThemeProvider } from "next-themes";
import { VimNavigationProvider } from "./VimNavigationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      themes={["light", "dark"]}
    >
      <VimNavigationProvider>{children}</VimNavigationProvider>
    </ThemeProvider>
  );
}
