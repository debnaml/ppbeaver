"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

interface HeadlineOverlayProps {
  keyword: string;
  visible: boolean;
  highlightColor?: string;
  direction?: "rtl" | "ltr";
  reducedMotion?: boolean;
}

const HeadlineOverlay = ({
  keyword,
  visible,
  highlightColor = "var(--color-highlight)",
  direction = "rtl",
  reducedMotion = false,
}: HeadlineOverlayProps) => {
  const keywordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const keywordEl = keywordRef.current;
    if (!keywordEl) return;
    const fromX = direction === "rtl" ? 60 : -60;
    const tl = gsap.timeline();

    if (visible) {
      if (reducedMotion) {
        tl.fromTo(keywordEl, { opacity: 0 }, { opacity: 1, duration: 0.15 });
      } else {
        tl.fromTo(
          keywordEl,
          { opacity: 0, x: -fromX },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    } else {
      if (reducedMotion) {
        tl.to(keywordEl, { opacity: 0, duration: 0.15 });
      } else {
        tl.to(keywordEl, {
          opacity: 0,
          x: -fromX,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    return () => {
      tl.kill();
    };
  }, [visible, direction, reducedMotion, keyword]);

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 z-20 flex flex-col items-start justify-end gap-0 text-left text-white transition-all",
        "px-6 sm:px-12 pb-12 sm:pb-16"
      )}
      aria-live="polite"
    >
      <p
        className="text-[clamp(2.4rem,4vw,5.6rem)] font-medium text-[var(--color-cream)] drop-shadow leading-tight"
        style={{ letterSpacing: "-1%" }}
      >
        Build with
      </p>
      <span
        ref={keywordRef}
        className="font-semibold leading-[1.02] drop-shadow-xl"
        style={{
          color: highlightColor,
          fontSize: "clamp(3.8rem, 7vw, 8.75rem)",
          marginTop: "-0.4rem",
          letterSpacing: "-2%",
        }}
      >
        {keyword.toLowerCase()}
      </span>
    </div>
  );
};

export default HeadlineOverlay;
