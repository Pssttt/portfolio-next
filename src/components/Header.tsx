"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme/ThemeToggle";

export function Header() {
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Pyae Sone Shin Thant";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <header className="space-y-4 sm:space-y-5 border-2 border-primary p-6 sm:p-10 bg-card/50 shadow-lg relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="text-xs sm:text-base text-muted-foreground pr-16">
        <span className="text-foreground font-medium">psst@portfolio</span>:~$
        bat profile.txt
      </div>
      <h1 className="text-2xl sm:text-5xl font-light tracking-tight min-h-[2.5rem] sm:min-h-[3.5rem] break-words pr-16">
        {displayedName}
        {!isTypingComplete && <span className="animate-pulse">▋</span>}
      </h1>
      <p className="text-lg sm:text-2xl text-foreground font-light">
        Computer Science Student | Aspiring DevOps Engineer
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href="/resume.pdf"
          download
          className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary hover:bg-primary/20 transition-all text-foreground font-medium text-sm sm:text-base inline-flex items-center gap-2"
          aria-label="Download resume PDF"
        >
          <span className="font-mono text-primary">[↓]</span>
          <span>Download Resume</span>
        </a>
        <a
          href="mailto:me@psstee.dev"
          className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-[#89dceb] hover:bg-[#89dceb]/20 transition-all text-foreground font-medium text-sm sm:text-base inline-flex items-center gap-2"
          aria-label="Send email to me@psstee.dev"
        >
          <span className="font-mono text-cat-sky">[@]</span>
          <span>Email Me</span>
        </a>
      </div>

      <div className="text-sm sm:text-base text-muted-foreground pt-2 sm:pt-4 space-y-1 sm:space-y-2 flex flex-col w-fit">
        <a
          href="https://github.com/Pssttt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:text-primary transition-colors"
          aria-label="Visit my GitHub profile"
        >
          → github.com/Pssttt
        </a>
        <a
          href="https://www.linkedin.com/in/pssteee/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:text-primary transition-colors"
          aria-label="Visit my LinkedIn profile"
        >
          → linkedin.com/in/pssteee
        </a>
      </div>
    </header>
  );
}
