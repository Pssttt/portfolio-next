"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useVimNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const isModified = e.ctrlKey || e.metaKey || e.altKey;

      // j - scroll down / navigate next
      if (!isModified && e.key === "j") {
        e.preventDefault();
        window.scrollBy(0, 100);
      }

      // k - scroll up / navigate previous
      if (!isModified && e.key === "k") {
        e.preventDefault();
        window.scrollBy(0, -100);
      }

      // g followed by g - go to top
      if (!isModified && e.key === "g") {
        e.preventDefault();
        let gPressed = true;
        const handleSecondG = (e2: KeyboardEvent) => {
          if (e2.key === "g" && !e2.ctrlKey && !e2.metaKey && !e2.altKey) {
            e2.preventDefault();
            window.scrollTo(0, 0);
          }
          gPressed = false;
          document.removeEventListener("keydown", handleSecondG);
        };
        document.addEventListener("keydown", handleSecondG);
        setTimeout(() => {
          if (gPressed) {
            document.removeEventListener("keydown", handleSecondG);
          }
        }, 1000);
      }

      if (!isModified && e.key === "G" && e.shiftKey) {
        e.preventDefault();
        window.scrollTo(0, document.documentElement.scrollHeight);
      }

      // h - navigate home
      if (!isModified && e.key === "H" && e.shiftKey) {
        e.preventDefault();
        router.push("/");
      }

      // num keys 1-5 for navigation
      if (!isModified && e.shiftKey === false && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const routes: Record<string, string> = {
          "1": "/about",
          "2": "/projects",
          "3": "/tech-stack",
          "4": "/blogs",
          "5": "/contact",
        };
        router.push(routes[e.key]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);
}
