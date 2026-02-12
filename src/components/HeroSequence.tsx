"use client";

import clsx from "clsx";

import HeadlineOverlay from "@/components/HeadlineOverlay";
import LogoLoader from "@/components/LogoLoader";
import LogoMaskOverlay from "@/components/LogoMaskOverlay";
import PeelCTA from "@/components/PeelCTA";
import { HERO_SETTINGS } from "@/components/hero/config";
import { useHeroSequence } from "@/components/hero/useHeroSequence";

const HeroSequence = () => {
  const {
    heroRef,
    videoARef,
    videoBRef,
    activeLayer,
    currentKeyword,
    keywordVisible,
    ctaVisible,
    reducedMotion,
    progressDuration,
    progressKey,
    logoMaskVisible,
    logoDimProgress,
    sequenceDormant,
    isReady,
    showProgressFill,
    handleCTA,
    handleContactClick,
  } = useHeroSequence();

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--color-supadark)]"
    >
      <div className="relative h-screen w-full">
        <div className="absolute inset-0">
          <video
            ref={videoARef}
            data-layer="A"
            className={clsx(
              "absolute inset-0 h-full w-full object-cover transition-opacity",
              activeLayer === "A" ? "opacity-100" : "opacity-0"
            )}
            playsInline
            muted
            preload="auto"
            loop={false}
            autoPlay={false}
          />
          <video
            ref={videoBRef}
            data-layer="B"
            className={clsx(
              "absolute inset-0 h-full w-full object-cover transition-opacity",
              activeLayer === "B" ? "opacity-100" : "opacity-0"
            )}
            playsInline
            muted
            preload="auto"
            loop={false}
            autoPlay={false}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 bg-[var(--hero-overlay)]"
          aria-hidden
        />

        <div className="pointer-events-auto absolute left-6 top-6 z-30 sm:left-12 sm:top-10">
          <LogoMaskOverlay
            visible={logoMaskVisible}
            reducedMotion={reducedMotion}
            dimmedProgress={logoDimProgress}
          />
        </div>

        <div className="pointer-events-auto absolute right-6 top-6 z-30 sm:right-12 sm:top-10">
          <button
            type="button"
            onClick={handleContactClick}
            aria-label="Scroll to contact section"
            className="cta-circle-button relative flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white sm:h-24 sm:w-24"
          >
            <span className="sr-only">Let&apos;s talk</span>
            <svg
              viewBox="0 0 120 120"
              className="cta-circle-spin absolute inset-0 h-full w-full text-[var(--color-cream)]"
              aria-hidden
            >
              <defs>
                <path id="circleTextPath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
              </defs>
              <text className="font-heading fill-current text-[11px] tracking-[0.2em]">
                <textPath startOffset="0" href="#circleTextPath">
                  Let&apos;s Talk&#160;&#160;•&#160;&#160;Let&apos;s Talk&#160;&#160;•&#160;&#160;Let&apos;s Talk&#160;&#160;•
                </textPath>
              </text>
            </svg>
            <span className="cta-circle-arrow relative text-2xl font-semibold sm:text-3xl">↓</span>
          </button>
        </div>

        <HeadlineOverlay
          keyword={currentKeyword}
          visible={keywordVisible}
          highlightColor={HERO_SETTINGS.highlightColor}
          reducedMotion={reducedMotion}
          direction="rtl"
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[10px] overflow-hidden rounded-none bg-white/10"
          aria-hidden
        >
          {showProgressFill && (
            <div
              key={progressKey}
              className="hero-progress-fill"
              style={{
                backgroundColor: HERO_SETTINGS.highlightColor,
                animationDuration: `${progressDuration}s`,
                animationPlayState: sequenceDormant ? "paused" : "running",
              }}
            />
          )}
        </div>

        <div className="noise-overlay" aria-hidden />

        <LogoLoader isVisible={!isReady && !sequenceDormant} />
        <PeelCTA
          visible={ctaVisible}
          onClick={handleCTA}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
};

export default HeroSequence;
