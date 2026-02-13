"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

import { HERO_POSTER_SOURCES } from "@/components/hero/config";

type HeroPosterProps = {
  visible: boolean;
  onReady?: () => void;
};

const buildSrcSet = (format: "webp" | "jpeg") => {
  return HERO_POSTER_SOURCES.map((poster) => {
    const path = format === "webp" ? poster.webp : poster.jpeg;
    return `${path} ${poster.width}w`;
  }).join(", ");
};

const HERO_POSTER_WEBP_SRCSET = buildSrcSet("webp");
const HERO_POSTER_JPEG_SRCSET = buildSrcSet("jpeg");
const HERO_POSTER_FALLBACK = HERO_POSTER_SOURCES[HERO_POSTER_SOURCES.length - 1]?.jpeg;

const HeroPoster = ({ visible, onReady }: HeroPosterProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const hasReportedRef = useRef(false);

  const notifyReady = useCallback(() => {
    if (hasReportedRef.current) return;
    hasReportedRef.current = true;
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    if (node.complete) {
      notifyReady();
      return;
    }

    node.addEventListener("load", notifyReady, { once: true });
    return () => node.removeEventListener("load", notifyReady);
  }, [notifyReady]);

  if (!HERO_POSTER_FALLBACK) {
    return null;
  }

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      <picture className="pointer-events-none absolute inset-0 h-full w-full">
        <source
          type="image/webp"
          srcSet={HERO_POSTER_WEBP_SRCSET}
          sizes="(max-width: 768px) 120vw, (max-width: 1280px) 100vw, 100vw"
        />
        <source
          type="image/jpeg"
          srcSet={HERO_POSTER_JPEG_SRCSET}
          sizes="(max-width: 768px) 120vw, (max-width: 1280px) 100vw, 100vw"
        />
        <img
          ref={imgRef}
          src={HERO_POSTER_FALLBACK}
          alt=""
          role="presentation"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>
    </div>
  );
};

export default HeroPoster;
