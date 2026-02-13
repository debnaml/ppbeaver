"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";

import { trackEvent } from "@/lib/analytics";

import { HERO_SETTINGS, VIDEO_SOURCES, type Layer } from "./config";

const HERO_POSTER_STORAGE_KEY = "ppb:heroPosterMode";
const HERO_POSTER_STORAGE_TTL = 24 * 60 * 60 * 1000; // 1 day

const parsePosterPreference = (raw: string | null) => {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { value?: string; expiresAt?: number };
    if (typeof parsed === "object" && parsed) {
      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        return false;
      }
      return parsed.value === "poster";
    }
  } catch {
    // Fall back to legacy string storage
    return raw === "poster";
  }
  return raw === "poster";
};
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const useHeroSequence = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const ctaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keywordSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoMaskTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasDormantRef = useRef(false);
  const resumeFromDormantRef = useRef(false);

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
  const [heroFrozen, setHeroFrozen] = useState(false);
  const [networkPrefersPoster, setNetworkPrefersPoster] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const [persistentPosterMode, setPersistentPosterMode] = useState(false);

  const sequenceDormant = !heroInView || !windowFocused;
  const preferStaticPoster = reducedMotion || networkPrefersPoster || persistentPosterMode;
  const posterVisible = preferStaticPoster || heroFrozen;

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
    if (heroFrozen || preferStaticPoster) return;
    const activeVideo = getLayerRef(activeLayer).current;
    if (!activeVideo || !isReady) return;
    resumeFromDormantRef.current = true;
    void activeVideo.play().catch(() => undefined);
  }, [activeLayer, getLayerRef, heroFrozen, isReady, preferStaticPoster]);

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

  const commitPosterExperience = useCallback(
    (shouldUsePoster: boolean, allowWithoutPoster = false) => {
      if (!shouldUsePoster) return;
      if (!posterReady && !allowWithoutPoster) return;
      if (allowWithoutPoster && !posterReady) {
        setPosterReady(true);
      }
      if (!isReady) {
        setIsReady(true);
      }
      if (!keywordVisible) {
        setKeywordVisible(true);
      }
      if (!ctaVisible) {
        if (ctaTimeoutRef.current) {
          clearTimeout(ctaTimeoutRef.current);
        }
        ctaTimeoutRef.current = window.setTimeout(() => {
          setCtaVisible(true);
          ctaTimeoutRef.current = null;
        }, HERO_SETTINGS.ctaRevealDelay);
      }
    },
    [ctaVisible, isReady, keywordVisible, posterReady]
  );

    const storePosterPreference = useCallback(() => {
      if (typeof window === "undefined") return;
      try {
        const payload = JSON.stringify({
          value: "poster",
          expiresAt: Date.now() + HERO_POSTER_STORAGE_TTL,
        });
        window.localStorage.setItem(HERO_POSTER_STORAGE_KEY, payload);
      } catch {
        // Ignore storage failures
      }
    }, []);

  const activatePosterPreference = useCallback(() => {
    if (persistentPosterMode) return;
    setPersistentPosterMode(true);
    storePosterPreference();
    commitPosterExperience(true);
  }, [commitPosterExperience, persistentPosterMode, storePosterPreference]);

  const clearPosterPreference = useCallback(() => {
    setPersistentPosterMode(false);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(HERO_POSTER_STORAGE_KEY);
      } catch {
        // Ignore storage failures
      }
    }
  }, []);

    useIsomorphicLayoutEffect(() => {
      if (typeof window === "undefined") return;
      let storedRaw: string | null = null;
      try {
        storedRaw = window.localStorage.getItem(HERO_POSTER_STORAGE_KEY);
      } catch {
        storedRaw = null;
      }
      const shouldPersist = parsePosterPreference(storedRaw);
      if (shouldPersist) {
        setPersistentPosterMode(true);
      } else if (storedRaw) {
        try {
          window.localStorage.removeItem(HERO_POSTER_STORAGE_KEY);
        } catch {
          // Ignore removal failures
        }
      }
    }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      const prefersReducedMotion = mq.matches;
      setReducedMotion(prefersReducedMotion);
      commitPosterExperience(prefersReducedMotion || networkPrefersPoster);
    };
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [commitPosterExperience, networkPrefersPoster]);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    type NavigatorWithConnection = Navigator & {
      connection?: NetworkInformation;
      mozConnection?: NetworkInformation;
      webkitConnection?: NetworkInformation;
    };

    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
    if (!connection) return;

    const evaluate = () => {
      const saveData = connection.saveData === true;
      const slowType =
        connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
      const lowDownlink =
        typeof connection.downlink === "number" &&
        connection.downlink > 0 &&
        connection.downlink < 1.5;
      const prefersPoster = saveData || slowType || lowDownlink;
      setNetworkPrefersPoster(prefersPoster);
      commitPosterExperience(prefersPoster || reducedMotion);
    };

    evaluate();

    const handleChange = () => evaluate();

    if (typeof connection.addEventListener === "function") {
      connection.addEventListener("change", handleChange);
      return () => connection.removeEventListener("change", handleChange);
    }

    const previous = connection.onchange;
    connection.onchange = handleChange;
    return () => {
      connection.onchange = previous ?? null;
    };
  }, [commitPosterExperience, reducedMotion]);

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
    if (isReady || preferStaticPoster) return;

    const shouldLock =
      window.navigator?.connection?.saveData !== true && !preferStaticPoster;
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
  }, [isReady, preferStaticPoster]);

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

  useEffect(() => {
    if (!isReady) return;
    storePosterPreference();
  }, [isReady, storePosterPreference]);

  useEffect(() => {
    if (!preferStaticPoster || isReady) return;
    if (typeof window === "undefined") return;

    if (posterReady) {
      const raf = window.requestAnimationFrame(() => {
        commitPosterExperience(true);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    const fallback = window.setTimeout(() => {
      commitPosterExperience(true, true);
    }, HERO_SETTINGS.posterFallbackReveal);
    return () => window.clearTimeout(fallback);
  }, [commitPosterExperience, isReady, posterReady, preferStaticPoster]);

  const primeVideo = useCallback(
    (layer: Layer, index: number, autoplay = false, force = false) => {
      if (preferStaticPoster) return;
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
    [getLayerRef, preferStaticPoster, sequenceDormant]
  );

  const pauseLayer = useCallback(
    (layer: Layer) => {
      const element = getLayerRef(layer).current;
      if (!element) return;
      element.pause();
      element.currentTime = 0;
    },
    [getLayerRef]
  );

  const holdHeroOnFirstFrame = useCallback(
    (targetLayer: Layer, previousLayer: Layer) => {
      const firstIndex = 0;
      setHeroFrozen(true);
      primeVideo(targetLayer, firstIndex, false, true);
      const targetVideo = getLayerRef(targetLayer).current;
      if (targetVideo) {
        targetVideo.pause();
        targetVideo.currentTime = 0;
      }
      pauseLayer(previousLayer);
      setActiveLayer(targetLayer);
      setCurrentVideoIndex(firstIndex);
      setCurrentKeyword(VIDEO_SOURCES[firstIndex].keyword);
      setKeywordVisible(true);
      setProgressDuration(0);
      activatePosterPreference();
    },
    [activatePosterPreference, getLayerRef, pauseLayer, primeVideo]
  );

  const advanceSequence = useCallback(() => {
    if (sequenceDormant || heroFrozen || preferStaticPoster) return;
    const totalVideos = VIDEO_SOURCES.length;
    if (totalVideos === 0) return;

    const nextIndex = (currentVideoIndex + 1) % totalVideos;
    const nextLayer: Layer = activeLayer === "A" ? "B" : "A";
    const previousLayer = activeLayer;

    const wrappingToFirst = nextIndex === 0 && currentVideoIndex === totalVideos - 1;

    if (wrappingToFirst) {
      holdHeroOnFirstFrame(nextLayer, previousLayer);
      if (!ctaVisible) {
        if (ctaTimeoutRef.current) {
          clearTimeout(ctaTimeoutRef.current);
        }
        ctaTimeoutRef.current = window.setTimeout(() => {
          setCtaVisible(true);
          ctaTimeoutRef.current = null;
        }, HERO_SETTINGS.ctaRevealDelay);
      }
      return;
    }

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
  }, [activeLayer, ctaVisible, currentVideoIndex, heroFrozen, holdHeroOnFirstFrame, pauseLayer, preferStaticPoster, primeVideo, sequenceDormant, transitionKeyword]);

  useEffect(() => {
    if (isReady || preferStaticPoster) return;
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
  }, [getLayerRef, isReady, preferStaticPoster, primeVideo, restartAndPlay, waitForHdQuality]);

  useEffect(() => {
    if (sequenceDormant || heroFrozen || preferStaticPoster) return;
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
  }, [activeLayer, advanceSequence, getLayerRef, heroFrozen, preferStaticPoster, sequenceDormant]);

  useEffect(() => {
    if (!isReady || heroFrozen || preferStaticPoster) {
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
  }, [activeLayer, getLayerRef, heroFrozen, isReady, preferStaticPoster]);

  useEffect(() => {
    return () => {
      if (ctaTimeoutRef.current) {
        clearTimeout(ctaTimeoutRef.current);
        ctaTimeoutRef.current = null;
      }
    };
  }, []);

    const handleCTA = useCallback(() => {
      const reachedPrimary = scrollToSection("about");
      trackEvent("hero_cta_click", {
        source: "hero-peel",
        destination: reachedPrimary ? "about" : "content",
        fallbackUsed: !reachedPrimary,
      });
      if (reachedPrimary) return;
      scrollToSection("content");
    }, [scrollToSection]);

    const handleContactClick = useCallback(() => {
      const reachedPrimary = scrollToSection("contact");
      trackEvent("contact_cta_click", {
        source: "hero-floating-button",
        destination: reachedPrimary ? "contact" : "content",
        fallbackUsed: !reachedPrimary,
      });
      if (reachedPrimary) return;
      scrollToSection("content");
    }, [scrollToSection]);

  const replayAvailable = persistentPosterMode && !reducedMotion && !networkPrefersPoster;

  const handleReplay = useCallback(() => {
    if (!replayAvailable) return;
    clearPosterPreference();
    if (ctaTimeoutRef.current) {
      clearTimeout(ctaTimeoutRef.current);
      ctaTimeoutRef.current = null;
    }
    setHeroFrozen(false);
    setCtaVisible(false);
    setKeywordVisible(false);
    setIsReady(false);
    setLogoMaskVisible(false);
    setProgressDuration(0);
    setProgressKey((prev) => prev + 1);
    setCurrentVideoIndex(0);
    setActiveLayer("A");
    const firstSource = VIDEO_SOURCES[0];
    if (firstSource) {
      setCurrentKeyword(firstSource.keyword);
    }
  }, [clearPosterPreference, replayAvailable]);

  const handlePosterReady = useCallback(() => {
    setPosterReady(true);
    commitPosterExperience(preferStaticPoster);
  }, [commitPosterExperience, preferStaticPoster]);

  const showProgressFill = useMemo(
    () => isReady && progressDuration > 0 && !heroFrozen && !preferStaticPoster,
    [heroFrozen, isReady, preferStaticPoster, progressDuration]
  );

  return {
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
    posterVisible,
    posterOnlyMode: preferStaticPoster,
    replayAvailable,
    handleReplay,
    handlePosterReady,
    handleCTA,
    handleContactClick,
  } as const;
};
