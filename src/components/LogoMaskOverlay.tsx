"use client";

import clsx from "clsx";
import { useState } from "react";

interface LogoMaskOverlayProps {
  visible: boolean;
  reducedMotion?: boolean;
  dimmedProgress?: number;
  onActivate?: () => void;
}

const LogoMaskOverlay = ({
  visible,
  reducedMotion = false,
  dimmedProgress = 0,
  onActivate,
}: LogoMaskOverlayProps) => {
  const [isFalling, setIsFalling] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);

  const handleClick = () => {
    if (onActivate) {
      onActivate();
    }
    if (isFalling || hasFallen) return;
    setIsFalling(true);
  };

  const handleAnimationEnd = () => {
    setIsFalling(false);
    setHasFallen(true);
  };

  return (
    <button
      type="button"
      aria-label="Performance Peak mark"
      onClick={handleClick}
      className={clsx(
        "group relative inline-flex items-center justify-center",
        "transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        reducedMotion && "duration-300"
      )}
    >
      <span
        className={clsx(
          "logo-mask-shape",
          "block aspect-[1089/608] w-[clamp(120px,15vw,220px)] drop-shadow-2xl transition duration-300",
          isFalling && (reducedMotion ? "logo-mask-shape--tilt" : "logo-mask-shape--falling"),
          hasFallen && "logo-mask-shape--resting"
        )}
        onAnimationEnd={handleAnimationEnd}
        style={{
          backgroundColor: "var(--color-highlight)",
          mixBlendMode: "multiply",
          maskImage: "url(/logo.svg)",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
          WebkitMaskImage: "url(/logo.svg)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          opacity: 0.65 - 0.55 * Math.min(Math.max(dimmedProgress, 0), 1),
        }}
      />
    </button>
  );
};

export default LogoMaskOverlay;
