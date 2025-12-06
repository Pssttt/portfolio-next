"use client";

import { useState } from "react";

interface ShareLinksProps {
  title: string;
  slug: string;
}

export function ShareLinks({ title, slug }: ShareLinksProps) {
  const url = `https://psstee.dev${slug}`;
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const excerpt = "Check out this article";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">share:</span>
      <a
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 border border-muted-foreground/30 rounded text-muted-foreground transition-all hover:text-[#89dceb] hover:border-[#89dceb]"
        title="Share on X"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle/?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(excerpt)}&source=psstee.dev`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 border border-muted-foreground/30 rounded text-muted-foreground transition-all hover:text-[#89dceb] hover:border-[#89dceb]"
        title="Share on LinkedIn"
      >
        linkedin
      </a>
      <button
        onClick={handleCopy}
        className={`px-2 py-1 border rounded transition-all cursor-pointer w-12 flex items-center justify-center ${
          copied
            ? "border-[#89dceb] text-[#89dceb]"
            : "border-muted-foreground/30 text-muted-foreground hover:text-[#89dceb] hover:border-[#89dceb]"
        }`}
        title="Copy link"
      >
        {copied ? "✓" : "copy"}
      </button>
    </div>
  );
}
