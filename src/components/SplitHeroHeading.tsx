"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type SplitHeroHeadingProps = {
  leadingText: string;
  highlightText: string;
  className?: string;
};

export default function SplitHeroHeading({ leadingText, highlightText, className = "" }: SplitHeroHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
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
    let context: { revert: () => void } | null = null;
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      context = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-heading-part]",
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.15 }
        );
      }, containerRef);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <h1 ref={containerRef} className={clsx("flex flex-col text-left", className)}>
      <span
        data-hero-heading-part
        className={clsx(
          "font-heading text-[clamp(2.4rem,4vw,5.6rem)] font-medium leading-tight text-[var(--color-cream)] tracking-[-0.01em] drop-shadow",
          !prefersReducedMotion && "opacity-0"
        )}
      >
        {leadingText}
      </span>
      <span
        data-hero-heading-part
        className={clsx(
          "font-heading mt-[-0.4rem] text-[clamp(3.8rem,7vw,8.75rem)] font-semibold leading-[1.02] text-[var(--color-highlight)] tracking-[-0.02em] drop-shadow-xl",
          !prefersReducedMotion && "opacity-0"
        )}
      >
        {highlightText}
      </span>
    </h1>
  );
}
