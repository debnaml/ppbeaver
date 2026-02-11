"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap } from "gsap";

type SplitHeroHeadingProps = {
  leadingText: string;
  highlightText: string;
  className?: string;
};

export default function SplitHeroHeading({ leadingText, highlightText, className = "" }: SplitHeroHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-heading-part]",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.15 }
      );
    }, containerRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={clsx("flex flex-col text-left", className)}>
      <p
        data-hero-heading-part
        className={clsx(
          "text-[clamp(2.4rem,4vw,5.6rem)] font-medium text-[var(--color-cream)] drop-shadow leading-tight",
          !prefersReducedMotion && "opacity-0"
        )}
        style={{
          letterSpacing: "-1%",
          fontFamily:
            "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {leadingText}
      </p>
      <span
        data-hero-heading-part
        className={clsx("font-semibold leading-[1.02] drop-shadow-xl", !prefersReducedMotion && "opacity-0")}
        style={{
          color: "var(--color-highlight)",
          fontSize: "clamp(3.8rem, 7vw, 8.75rem)",
          marginTop: "-0.4rem",
          letterSpacing: "-2%",
          fontFamily:
            "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {highlightText}
      </span>
    </div>
  );
}
