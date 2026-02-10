"use client";

import clsx from "clsx";

interface LogoMaskOverlayProps {
  visible: boolean;
  reducedMotion?: boolean;
  dimmedProgress?: number;
}

const LogoMaskOverlay = ({
  visible,
  reducedMotion = false,
  dimmedProgress = 0,
}: LogoMaskOverlayProps) => {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className={clsx(
        "group relative inline-flex items-center justify-center",
        "transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        reducedMotion && "duration-300"
      )}
    >
      <span
        className="block aspect-[1089/608] w-[clamp(120px,15vw,220px)] drop-shadow-2xl transition duration-300 group-hover:scale-[1.04]"
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
