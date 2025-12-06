"use client";

import { useVimNavigation } from "@/hooks/useVimNavigation";
import { ShortcutHelp } from "./ShortcutHelp";

export function VimNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useVimNavigation();
  return (
    <>
      <ShortcutHelp />
      {children}
    </>
  );
}
