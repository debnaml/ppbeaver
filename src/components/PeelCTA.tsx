"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

interface PeelCTAProps {
  visible: boolean;
  onClick: () => void;
  reducedMotion?: boolean;
}

const PeelCTA = ({ visible, onClick, reducedMotion = false }: PeelCTAProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    gsap.set(wrapperRef.current, {
      y: 120,
      opacity: 0,
      rotateX: -8,
      transformPerspective: 1000,
    });
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.to(wrapperRef.current, {
      y: visible ? 0 : 120,
      opacity: visible ? 1 : 0,
      rotateX: visible && !reducedMotion ? 0 : -8,
      transformPerspective: 1000,
      duration: reducedMotion ? 0.2 : 0.9,
      ease: visible ? "elastic.out(1, 0.8)" : "power2.in",
    });
  }, [visible, reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        "pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center",
        "drop-shadow-2xl"
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/20 bg-[var(--color-supadark)]/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-cream)] backdrop-blur-md transition hover:bg-[var(--color-highlight)] hover:text-[var(--color-ink)]"
      >
        <span>Find out more</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M12 5v14m0 0-4-4m4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PeelCTA;
