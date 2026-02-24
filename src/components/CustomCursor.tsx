"use client";

import { useEffect, useState, useRef } from "react";

const CLICKABLE_SELECTOR = "a, button, input, textarea, [role='button']";
const TEXT_INPUT_SELECTOR =
  "input[type='text'], input[type='email'], textarea, [contenteditable]";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<"default" | "hover" | "click" | "text">(
    "default",
  );
  const [isDesktop, setIsDesktop] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pendingPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setPosition(pendingPosRef.current);
        rafRef.current = undefined;
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      pendingPosRef.current = { x: e.clientX, y: e.clientY };
      scheduleUpdate();

      const target = e.target as HTMLElement;
      const isTextInput = target.closest(TEXT_INPUT_SELECTOR);
      const isClickable = target.closest(CLICKABLE_SELECTOR);

      if (state !== "click") {
        if (isTextInput) {
          setState("text");
        } else if (isClickable) {
          setState("hover");
        } else {
          setState("default");
        }
      }
    };

    const handleMouseDown = () => setState("click");
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTextInput = target.closest(TEXT_INPUT_SELECTOR);
      const isClickable = target.closest(CLICKABLE_SELECTOR);

      if (isTextInput) {
        setState("text");
      } else if (isClickable) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      setState("default");
    };

    window.addEventListener("pointermove", handlePointerMove as EventListener);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove as EventListener,
      );
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isDesktop || reducedMotion) return null;

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
