"use client";

import { useEffect } from "react";

type RGB = [number, number, number];

const BASE_COLOR: RGB = [41, 45, 64]; // --color-supadark #292d40

const parseHex = (hex: string): RGB | null => {
  const value = hex.replace("#", "");
  if (value.length !== 6) return null;
  const num = Number.parseInt(value, 16);
  if (Number.isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Scroll-scrubbed page background. Sections opt in with a
 * `data-morph-bg="#hex"` attribute; as each section's top edge travels
 * up the viewport the <main> background colour is blended towards its
 * colour, so section boundaries morph instead of hard-cutting.
 */
const ScrollBackdrop = () => {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-morph-bg]"));
    const stops = nodes
      .map((node) => ({ node, color: parseHex(node.dataset.morphBg ?? "") }))
      .filter((stop): stop is { node: HTMLElement; color: RGB } => stop.color !== null);
    if (!stops.length) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const vh = window.innerHeight;
      let color: RGB = [...BASE_COLOR];

      for (const { node, color: target } of stops) {
        const top = node.getBoundingClientRect().top;
        // Blend in as the section top travels from 90% to 30% of the viewport.
        const t = smoothstep(clamp01((vh * 0.9 - top) / (vh * 0.6)));
        color = [
          color[0] + (target[0] - color[0]) * t,
          color[1] + (target[1] - color[1]) * t,
          color[2] + (target[2] - color[2]) * t,
        ];
      }

      document.body.style.setProperty(
        "--page-bg",
        `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])})`
      );
    };

    const schedule = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.body.style.removeProperty("--page-bg");
    };
  }, []);

  return null;
};

export default ScrollBackdrop;
