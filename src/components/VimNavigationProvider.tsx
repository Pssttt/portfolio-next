"use client";

import { useVimNavigation } from "@/hooks/useVimNavigation";
import { ShortcutHelp } from "./ShortcutHelp";
import { CodeBlockCopyButton } from "./CodeBlockCopyButton";

export function VimNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useVimNavigation();
  return (
    <>
      <ShortcutHelp />
      <CodeBlockCopyButton />
      {children}
    </>
  );
}
