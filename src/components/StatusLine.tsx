"use client";

export function StatusLine() {
  return (
    <div className="fixed bottom-3 right-4 z-40 opacity-20 hover:opacity-70 transition-opacity duration-300">
      <span className="text-[10px] text-muted-foreground select-none font-mono flex items-center gap-1.5">
        <kbd className="px-1 py-0.5 bg-muted border border-border rounded font-mono text-[10px] text-primary">
          ?
        </kbd>
        shortcuts
      </span>
    </div>
  );
}
