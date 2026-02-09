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
        "pointer-events-none absolute bottom-12 right-6 z-30 flex justify-end sm:bottom-16 sm:right-12",
        "drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="pp-button pointer-events-auto inline-flex items-center gap-4 rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-7 py-4 text-sm font-semibold text-[var(--color-ink)] shadow-[0_15px_45px_rgba(255,255,255,0.25)] backdrop-blur transition hover:brightness-110 sm:text-base"
      >
        <span>Find Out More</span>
        <svg
          className="pp-button-arrow"
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
