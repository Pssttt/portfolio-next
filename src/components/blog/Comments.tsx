"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Comments() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="mt-16 pt-8 border-t border-primary/30"
      onMouseEnter={() => document.body.classList.add("giscus-hover")}
      onMouseLeave={() => document.body.classList.remove("giscus-hover")}
    >
      {isLoading && (
        <div className="space-y-4 mb-6">
          <div className="h-12 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-2/3 animate-pulse" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      )}
      <div style={{ display: isLoading ? "none" : "block" }}>
        <Giscus
          id="comments"
          repo="Pssttt/portfolio-next"
          repoId="R_kgDOQiN-nA"
          category="General"
          categoryId="DIC_kwDOQiN-nM4C1isK"
          mapping="title"
          term="Comments"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme === "dark" ? "catppuccin_mocha" : "catppuccin_latte"}
          lang="en"
          loading="eager"
        />
      </div>
    </div>
  );
}
