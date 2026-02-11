"use client";

import { useRouter } from "next/navigation";
import LogoMaskOverlay from "./LogoMaskOverlay";

type HeroChromeProps = {
  ctaTargetId?: string;
  showLogo?: boolean;
  showCTA?: boolean;
  logoHref?: string | null;
};

export default function HeroChrome({
  ctaTargetId = "contact",
  showLogo = true,
  showCTA = true,
  logoHref = "/",
}: HeroChromeProps) {
  const router = useRouter();

  const handleCtaClick = () => {
    if (!ctaTargetId) return;
    const target = document.getElementById(ctaTargetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    try {
      window.location.hash = `#${ctaTargetId}`;
    } catch (error) {
      console.error("Unable to set location hash for CTA", error);
    }
  };

  const handleLogoClick = () => {
    if (!logoHref) return;
    router.push(logoHref);
  };

  return (
    <>
      {showLogo && (
        <div className="pointer-events-auto absolute left-6 top-6 z-30 sm:left-12 sm:top-10">
          <LogoMaskOverlay
            visible
            reducedMotion={false}
            dimmedProgress={0}
            onActivate={logoHref ? handleLogoClick : undefined}
          />
        </div>
      )}

      {showCTA && (
        <div className="pointer-events-auto absolute right-6 top-6 z-30 sm:right-12 sm:top-10">
          <button
            type="button"
            onClick={handleCtaClick}
            aria-label="Scroll to contact section"
            className="cta-circle-button relative flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition hover:bg-white/10 sm:h-24 sm:w-24"
          >
            <span className="sr-only">Let&apos;s talk</span>
            <svg
              viewBox="0 0 120 120"
              className="cta-circle-spin absolute inset-0 h-full w-full text-[var(--color-cream)]"
              aria-hidden
            >
              <defs>
                <path id="cookiesCircleText" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
              </defs>
              <text className="fill-current text-[11px] tracking-[0.2em]" style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
                <textPath startOffset="0" href="#cookiesCircleText">
                  Let&apos;s Talk&#160;&#160;•&#160;&#160;Let&apos;s Talk&#160;&#160;•&#160;&#160;Let&apos;s Talk&#160;&#160;•
                </textPath>
              </text>
            </svg>
            <span className="cta-circle-arrow relative text-2xl font-semibold sm:text-3xl">↓</span>
          </button>
        </div>
      )}
    </>
  );
}
