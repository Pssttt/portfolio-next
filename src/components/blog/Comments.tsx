"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { theme } = useTheme();

  return (
    <div
      className="mt-16 pt-8 border-t border-primary/30"
      onMouseEnter={() => document.body.classList.add("giscus-hover")}
      onMouseLeave={() => document.body.classList.remove("giscus-hover")}
    >
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
        loading="lazy"
      />
    </div>
  );
}
