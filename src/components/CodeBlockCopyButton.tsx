"use client";

import { useEffect, useState } from "react";

export function CodeBlockCopyButton() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const callback = () => {
      const codeBlocks = document.querySelectorAll("pre");

      codeBlocks.forEach((pre) => {
        if (pre.querySelector("[data-copy-button]")) return;

        const button = document.createElement("button");
        button.setAttribute("data-copy-button", "true");
        button.type = "button";
        button.title = "Copy code";

        const createCopySvg = () => {
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
          );
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "1.5");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");

          const path1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path1.setAttribute("d", "M8 6L4 12L8 18");
          svg.appendChild(path1);

          const path2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path2.setAttribute("d", "M16 6L20 12L16 18");
          svg.appendChild(path2);

          const path3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path3.setAttribute("d", "M12 5V19");
          svg.appendChild(path3);

          return svg;
        };

        const createCheckSvg = () => {
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
          );
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2.5");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");

          const polyline = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline",
          );
          polyline.setAttribute("points", "20 6 9 17 4 12");
          svg.appendChild(polyline);
          return svg;
        };

        button.appendChild(createCopySvg());

        const textLabel = document.createElement("span");
        textLabel.textContent = "Copy";
        textLabel.style.marginLeft = "4px";
        textLabel.style.fontSize = "12px";
        button.appendChild(textLabel);

        button.setAttribute("aria-label", "Copy code");

        button.style.position = "absolute";
        button.style.top = "8px";
        button.style.right = "8px";
        button.style.padding = "6px 10px";
        button.style.border = "1px solid var(--border)";
        button.style.borderRadius = "4px";
        button.style.backgroundColor = "var(--muted)";
        button.style.color = "var(--foreground)";
        button.style.cursor = "pointer";
        button.style.opacity = "0";
        button.style.transition =
          "opacity 0.2s ease, background-color 0.2s ease";
        button.style.zIndex = "10";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.lineHeight = "1";
        button.style.gap = "4px";

        button.onclick = async () => {
          const code = pre.textContent || "";
          try {
            await navigator.clipboard.writeText(code);

            const oldSvg = button.querySelector("svg");
            if (oldSvg) oldSvg.remove();
            button.appendChild(createCheckSvg());

            textLabel.textContent = "Copied!";
            button.title = "Copied!";

            setTimeout(() => {
              const currentSvg = button.querySelector("svg");
              if (currentSvg) currentSvg.remove();
              button.appendChild(createCopySvg());

              textLabel.textContent = "Copy";
              button.title = "Copy code";
            }, 1500);
          } catch (err) {
            console.error("Failed to copy:", err);
          }
        };

        button.onmouseover = () => {
          button.style.backgroundColor = "var(--secondary)";
        };

        button.onmouseout = () => {
          button.style.backgroundColor = "var(--muted)";
        };

        pre.style.position = "relative";
        pre.addEventListener("mouseenter", () => {
          button.style.opacity = "1";
        });

        pre.addEventListener("mouseleave", () => {
          button.style.opacity = "0";
        });

        pre.appendChild(button);
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 100);
    }
  }, [isHydrated]);

  return null;
}
