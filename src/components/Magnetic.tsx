"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** How strongly the child follows the cursor (0–1). */
  strength?: number;
  className?: string;
};

/**
 * Wraps a single interactive element and makes it gently follow the
 * cursor while hovered ("magnetic button"). Only active on fine
 * pointers with motion allowed.
 */
const Magnetic = ({ children, strength = 0.3, className }: MagneticProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!enabled || !wrapper) return;
    const target = wrapper.firstElementChild as HTMLElement | null;
    if (!target) return;

    const handleMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      target.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
    };

    const handleEnter = () => {
      target.style.transition = "transform 0.18s ease-out";
    };

    const handleLeave = () => {
      target.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      target.style.transform = "translate(0px, 0px)";
    };

    wrapper.addEventListener("pointerenter", handleEnter);
    wrapper.addEventListener("pointermove", handleMove);
    wrapper.addEventListener("pointerleave", handleLeave);

    return () => {
      wrapper.removeEventListener("pointerenter", handleEnter);
      wrapper.removeEventListener("pointermove", handleMove);
      wrapper.removeEventListener("pointerleave", handleLeave);
      target.style.transform = "";
      target.style.transition = "";
    };
  }, [enabled, strength]);

  return (
    <div ref={wrapperRef} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};

export default Magnetic;
