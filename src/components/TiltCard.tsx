"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
};

/**
 * Subtle 3D hover tilt for media cards. Only active on fine pointers
 * with motion allowed; renders a plain wrapper otherwise.
 */
const TiltCard = ({ children, className, maxTilt = 5 }: TiltCardProps) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || !innerRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    innerRef.current.style.transform = `rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(1.015)`;
  };

  const handleLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className={className}
      style={{ perspective: "900px" }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        ref={innerRef}
        style={{
          transition: "transform 0.25s ease-out",
          willChange: enabled ? "transform" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
