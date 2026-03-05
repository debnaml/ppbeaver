"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import lottie, { type AnimationItem } from "lottie-web/build/player/lottie_light";

interface LottieOnViewProps {
  src: string;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
}

const LottieOnView = ({ src, loop = true, className, ariaLabel }: LottieOnViewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const playWhenReadyRef = useRef(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    let isCancelled = false;

    const loadAnimation = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Failed to fetch ${src}`);
        const data = (await response.json()) as Record<string, unknown>;
        if (isCancelled || !containerRef.current) return;

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop,
          autoplay: false,
          animationData: data,
        });

        if (playWhenReadyRef.current) {
          animationRef.current.goToAndPlay(0, true);
        } else {
          animationRef.current.goToAndStop(0, true);
        }
      } catch (error) {
        console.error("Lottie load failed", error);
        setHasError(true);
      }
    };

    loadAnimation();

    return () => {
      isCancelled = true;
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [loop, src]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      playWhenReadyRef.current = true;
      animationRef.current?.play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        playWhenReadyRef.current = entry.isIntersecting;
        const animation = animationRef.current;
        if (!animation) return;
        if (entry.isIntersecting) {
          animation.goToAndPlay(0, true);
        } else {
          animation.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return (
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-[10px] bg-black/20 text-sm text-white/70",
          className
        )}
      >
        Animation unavailable
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={clsx("relative block w-full overflow-hidden", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    />
  );
};

export default LottieOnView;
