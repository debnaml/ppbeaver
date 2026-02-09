"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import HeadlineOverlay from "@/components/HeadlineOverlay";
import LogoLoader from "@/components/LogoLoader";
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

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const ctaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keywordSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getLayerRef = useCallback(
    (layer: Layer) => (layer === "A" ? videoARef : videoBRef),
    []
  );

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
    return () => {
      if (keywordSwapTimeoutRef.current) {
        clearTimeout(keywordSwapTimeoutRef.current);
        keywordSwapTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isReady) return;

    const shouldLock = window.navigator?.connection?.saveData !== true;
    if (!shouldLock) return;

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

  const primeVideo = useCallback(
    (layer: Layer, index: number, autoplay = false) => {
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
        if (element.readyState >= 3) {
          startPlayback();
        } else {
          const handleCanPlay = () => {
            element.removeEventListener("canplaythrough", handleCanPlay);
            startPlayback();
          };
          element.addEventListener("canplaythrough", handleCanPlay);
        }
      }
    },
    [getLayerRef]
  );

  const pauseLayer = useCallback((layer: Layer) => {
    const element = getLayerRef(layer).current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  }, [getLayerRef]);

  const advanceSequence = useCallback(() => {
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
  }, [activeLayer, ctaVisible, currentVideoIndex, pauseLayer, primeVideo, transitionKeyword]);

  useEffect(() => {
    const initialLayer: Layer = "A";
    primeVideo(initialLayer, 0);
    const initialVideo = getLayerRef(initialLayer).current;
    if (!initialVideo) return;

    let cancelled = false;

    const handleReady = () => {
      initialVideo.pause();
      initialVideo.currentTime = 0;
      const preloadNext = 1;
      if (preloadNext < VIDEO_SOURCES.length) {
        primeVideo("B", preloadNext);
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
      initialVideo.removeEventListener("canplaythrough", handleReady);
    };

    initialVideo.addEventListener("canplaythrough", handleReady);

    return () => {
      cancelled = true;
      initialVideo.removeEventListener("canplaythrough", handleReady);
    };
  }, [getLayerRef, primeVideo, restartAndPlay, waitForHdQuality]);

  useEffect(() => {
    const layer = activeLayer;
    const videoEl = getLayerRef(layer).current;
    if (!videoEl) return;

    const handleEnded = () => advanceSequence();

    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [activeLayer, advanceSequence, getLayerRef]);


  useEffect(() => {
    return () => {
      if (ctaTimeoutRef.current) {
        clearTimeout(ctaTimeoutRef.current);
        ctaTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCTA = () => {
    const target = document.getElementById("content");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--color-supadark)]">
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

        <HeadlineOverlay
          keyword={currentKeyword}
          visible={keywordVisible}
          highlightColor={HERO_SETTINGS.highlightColor}
          reducedMotion={reducedMotion}
          direction="rtl"
        />

        <div className="noise-overlay" aria-hidden />

        <LogoLoader isVisible={!isReady} />
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
