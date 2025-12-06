"use client";

import { useEffect, useState } from "react";

const CLICKABLE_SELECTOR = "a, button, input, textarea, [role='button']";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<"default" | "hover" | "click">("default");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = target.closest(CLICKABLE_SELECTOR);

      if (state !== "click") {
        setState(isClickable ? "hover" : "default");
      }
    };

    const handleMouseDown = () => setState("click");
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest(CLICKABLE_SELECTOR);
      setState(isClickable ? "hover" : "default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        id="cursor-dot"
        className={`cursor-${state}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        id="cursor-ring"
        className={`cursor-${state}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
