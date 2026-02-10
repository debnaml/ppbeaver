"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import HeadlineOverlay from "@/components/HeadlineOverlay";
import LogoLoader from "@/components/LogoLoader";
import LogoMaskOverlay from "@/components/LogoMaskOverlay";
import PeelCTA from "@/components/PeelCTA";

// TODO(USER): Replace sample VIDEO_SOURCES with final Cloudflare Stream playback URLs.

const HERO_SETTINGS = {
  crossfadeDuration: 0.9,
  scrollLockFailsafe: 4500,
  highlightColor: "var(--color-highlight)",
  minHeroHeight: 700,
  hdCheckInterval: 150,
  hdMaxWait: 2800,
  hdRevealDelay: 280,
  playbackRate: 0.75,
  loaderMinimumVisible: 2800,
  keywordSwapDelay: 320,
  ctaRevealDelay: 400,
};

const VIDEO_SOURCES = [
  {
    id: "intelligence",
    keyword: "Intelligence",
    src: "https://customer-wsmbmuhwgz78t75t.cloudflarestream.com/c3afc872905c9c9bd4e686a599ce56de/downloads/default.mp4",
  },
  {
    id: "imagination",
    keyword: "Imagination",
    src: "https://customer-wsmbmuhwgz78t75t.cloudflarestream.com/34599ee19486ebb6629e62bdf741aafb/downloads/default.mp4",
  },
  {
    id: "information",
    keyword: "Information",
    src: "https://customer-wsmbmuhwgz78t75t.cloudflarestream.com/09ad8c792656b9c258f0aa3e3a15d18b/downloads/default.mp4",
  },
];

type Layer = "A" | "B";

const HeroSequence = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState(VIDEO_SOURCES[0].keyword);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState<Layer>("A");
  const [keywordVisible, setKeywordVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressDuration, setProgressDuration] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [logoMaskVisible, setLogoMaskVisible] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [logoDimProgress, setLogoDimProgress] = useState(0);
  const [windowFocused, setWindowFocused] = useState(true);

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const ctaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keywordSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoMaskTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const wasDormantRef = useRef(false);
  const resumeFromDormantRef = useRef(false);

  const sequenceDormant = !heroInView || !windowFocused;

  const scrollToSection = useCallback(
    (id: string) => {
      if (typeof document === "undefined") return false;
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      return true;
    },
    [reducedMotion]
  );

  const getLayerRef = useCallback(
    (layer: Layer) => (layer === "A" ? videoARef : videoBRef),
    []
  );

  const pauseSequence = useCallback(() => {
    (["A", "B"] as Layer[]).forEach((layer) => {
      const element = getLayerRef(layer).current;
      if (!element) return;
      element.pause();
    });
  }, [getLayerRef]);

  const resumeSequence = useCallback(() => {
    const activeVideo = getLayerRef(activeLayer).current;
    if (!activeVideo || !isReady) return;
    resumeFromDormantRef.current = true;
    void activeVideo.play().catch(() => undefined);
  }, [activeLayer, getLayerRef, isReady]);

  const restartAndPlay = useCallback((video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
    video.playbackRate = HERO_SETTINGS.playbackRate;
    void video.play().catch(() => undefined);
  }, []);

  const waitForHdQuality = useCallback((video: HTMLVideoElement) => {
    return new Promise<void>((resolve) => {
      const startedAt = performance.now();
      const inspect = () => {
        const hasHeight =
          !HERO_SETTINGS.minHeroHeight || video.videoHeight >= HERO_SETTINGS.minHeroHeight;
        const decodeReady = video.readyState >= 4;
        const timedOut = performance.now() - startedAt >= HERO_SETTINGS.hdMaxWait;
        if ((hasHeight && decodeReady) || timedOut) {
          window.setTimeout(resolve, HERO_SETTINGS.hdRevealDelay);
          return;
        }
        window.setTimeout(inspect, HERO_SETTINGS.hdCheckInterval);
      };
      inspect();
    });
  }, []);

  const transitionKeyword = useCallback((nextWord: string) => {
    if (keywordSwapTimeoutRef.current) {
      clearTimeout(keywordSwapTimeoutRef.current);
      keywordSwapTimeoutRef.current = null;
    }
    setKeywordVisible(false);
    keywordSwapTimeoutRef.current = window.setTimeout(() => {
      setCurrentKeyword(nextWord);
      setKeywordVisible(true);
    }, HERO_SETTINGS.keywordSwapDelay);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mq.matches);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

    useEffect(() => {
      if (typeof window === "undefined" || typeof document === "undefined") return;

    const evaluate = () => {
      const visible = document.visibilityState !== "hidden";
      const focused = document.hasFocus();
      setWindowFocused(visible && focused);
    };

    const handleVisibility = () => evaluate();
    const handleFocus = () => evaluate();
    const handleBlur = () => setWindowFocused(false);

    evaluate();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (keywordSwapTimeoutRef.current) {
        clearTimeout(keywordSwapTimeoutRef.current);
        keywordSwapTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    if (isReady) return;

    const shouldLock = window.navigator?.connection?.saveData !== true;
    const nearTop = window.scrollY <= 48;
    if (!shouldLock || !nearTop) return;

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";

    const failsafe = window.setTimeout(() => {
      html.style.overflow = prev;
    }, HERO_SETTINGS.scrollLockFailsafe);

    return () => {
      window.clearTimeout(failsafe);
      html.style.overflow = prev;
    };
  }, [isReady]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = heroRef.current;
    if (!element) return;

    let raf = 0;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const progress = Math.min(Math.max((200 - rect.bottom) / 200, 0), 1);
      setLogoDimProgress(progress);
    };

    const handleScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  useEffect(() => {
    const scheduleVisibility = (value: boolean, delay: number) => {
      if (logoMaskTimeoutRef.current) {
        clearTimeout(logoMaskTimeoutRef.current);
        logoMaskTimeoutRef.current = null;
      }
      logoMaskTimeoutRef.current = window.setTimeout(() => {
        setLogoMaskVisible(value);
        logoMaskTimeoutRef.current = null;
      }, delay);
    };

    if (!isReady) {
      scheduleVisibility(false, 0);
      return () => {
        if (logoMaskTimeoutRef.current) {
          clearTimeout(logoMaskTimeoutRef.current);
          logoMaskTimeoutRef.current = null;
        }
      };
    }

    scheduleVisibility(true, reducedMotion ? 0 : 250);

    return () => {
      if (logoMaskTimeoutRef.current) {
        clearTimeout(logoMaskTimeoutRef.current);
        logoMaskTimeoutRef.current = null;
      }
    };
  }, [isReady, reducedMotion]);

  useEffect(() => {
    if (sequenceDormant) {
      pauseSequence();
    } else if (wasDormantRef.current) {
      resumeSequence();
    }

    wasDormantRef.current = sequenceDormant;
  }, [pauseSequence, resumeSequence, sequenceDormant]);

  const primeVideo = useCallback(
    (layer: Layer, index: number, autoplay = false, force = false) => {
      if (sequenceDormant && !force) return;
      const element = getLayerRef(layer).current;
      if (!element) return;
      const source = VIDEO_SOURCES[index];

      if (element.dataset.srcId !== source.id) {
        element.dataset.srcId = source.id;
        element.src = source.src;
        element.load();
      }

      const startPlayback = () => {
        element.currentTime = 0;
        element.playbackRate = HERO_SETTINGS.playbackRate;
        element
          .play()
          .then(() => undefined)
          .catch(() => undefined);
      };

      if (autoplay) {
        const handleAutoplay = () => {
          if (sequenceDormant && !force) return;
          startPlayback();
        };

        if (element.readyState >= 3) {
          handleAutoplay();
        } else {
          const handleCanPlay = () => {
            element.removeEventListener("canplaythrough", handleCanPlay);
            handleAutoplay();
          };
          element.addEventListener("canplaythrough", handleCanPlay);
        }
      }
    },
    [getLayerRef, sequenceDormant]
  );

  const pauseLayer = useCallback((layer: Layer) => {
    const element = getLayerRef(layer).current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  }, [getLayerRef]);

  const advanceSequence = useCallback(() => {
    if (sequenceDormant) return;
    const totalVideos = VIDEO_SOURCES.length;
    if (totalVideos === 0) return;

    const nextIndex = (currentVideoIndex + 1) % totalVideos;
    const nextLayer: Layer = activeLayer === "A" ? "B" : "A";
    const previousLayer = activeLayer;

    transitionKeyword(VIDEO_SOURCES[nextIndex].keyword);
    primeVideo(nextLayer, nextIndex, true);
    setActiveLayer(nextLayer);
    setCurrentVideoIndex(nextIndex);

    window.setTimeout(
      () => pauseLayer(previousLayer),
      HERO_SETTINGS.crossfadeDuration * 1000 + 200
    );

    const preloadIndex = (nextIndex + 1) % totalVideos;
    if (totalVideos > 1) {
      primeVideo(previousLayer, preloadIndex);
    }

    if (!ctaVisible && nextIndex === 0) {
      if (ctaTimeoutRef.current) {
        clearTimeout(ctaTimeoutRef.current);
      }
      ctaTimeoutRef.current = window.setTimeout(() => {
        setCtaVisible(true);
        ctaTimeoutRef.current = null;
      }, HERO_SETTINGS.ctaRevealDelay);
    }
  }, [activeLayer, ctaVisible, currentVideoIndex, pauseLayer, primeVideo, sequenceDormant, transitionKeyword]);

  useEffect(() => {
    if (isReady) return;
    const initialLayer: Layer = "A";
    primeVideo(initialLayer, 0, false, true);
    const initialVideo = getLayerRef(initialLayer).current;
    if (!initialVideo) return;

    let cancelled = false;

    const finalizeReady = () => {
      initialVideo.pause();
      initialVideo.currentTime = 0;
      const preloadNext = 1;
      if (preloadNext < VIDEO_SOURCES.length) {
        primeVideo("B", preloadNext, false, true);
      }
      const hdReady = waitForHdQuality(initialVideo);
      const minimumVisible = new Promise((resolve) =>
        window.setTimeout(resolve, HERO_SETTINGS.loaderMinimumVisible)
      );

      Promise.all([hdReady, minimumVisible]).then(() => {
        if (!cancelled) {
          restartAndPlay(initialVideo);
          setIsReady(true);
          setKeywordVisible(true);
        }
      });
    };
    const handleReadyEvent = () => {
      initialVideo.removeEventListener("canplaythrough", handleReadyEvent);
      if (!cancelled) {
        finalizeReady();
      }
    };

    if (initialVideo.readyState >= 3) {
      finalizeReady();
    } else {
      initialVideo.addEventListener("canplaythrough", handleReadyEvent);
    }

    return () => {
      cancelled = true;
      initialVideo.removeEventListener("canplaythrough", handleReadyEvent);
    };
  }, [getLayerRef, isReady, primeVideo, restartAndPlay, waitForHdQuality]);

  useEffect(() => {
    if (sequenceDormant) return;
    const layer = activeLayer;
    const videoEl = getLayerRef(layer).current;
    if (!videoEl) return;

    const handleEnded = () => {
      advanceSequence();
    };

    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [activeLayer, advanceSequence, getLayerRef, sequenceDormant]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const video = getLayerRef(activeLayer).current;
    if (!video) {
      return;
    }

    const computeDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        return video.duration;
      }
      if (video.seekable?.length) {
        return video.seekable.end(video.seekable.length - 1);
      }
      return 0;
    };

    const triggerAnimation = () => {
      const baseDuration = computeDuration();
      if (baseDuration <= 0) return;
      const rate = video.playbackRate || 1;
      const adjusted = rate > 0 ? baseDuration / rate : baseDuration;
      setProgressDuration(adjusted);
      setProgressKey((prev) => prev + 1);
    };

    const handlePlay = () => {
      if (resumeFromDormantRef.current) {
        resumeFromDormantRef.current = false;
        return;
      }
      triggerAnimation();
    };

    const handleLoadedMetadata = () => {
      if (!video.paused) {
        triggerAnimation();
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (!video.paused) {
      triggerAnimation();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [activeLayer, getLayerRef, isReady]);



  useEffect(() => {
    return () => {
      if (ctaTimeoutRef.current) {
        clearTimeout(ctaTimeoutRef.current);
        ctaTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCTA = () => {
    if (scrollToSection("about")) return;
    scrollToSection("content");
  };

  const handleContactClick = () => {
    if (scrollToSection("contact")) return;
    scrollToSection("content");
  };

  const showProgressFill = isReady && progressDuration > 0;

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
              <text
                className="fill-current text-[11px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
              >
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
