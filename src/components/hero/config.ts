export type Layer = "A" | "B";

export type VideoSource = {
  id: string;
  keyword: string;
  src: string;
};

export type HeroPosterSource = {
  width: number;
  height: number;
  webp: string;
  jpeg: string;
};

export const HERO_SETTINGS = {
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
  posterFallbackReveal: 800,
} as const;

// TODO(USER): Replace sample VIDEO_SOURCES with final Cloudflare Stream playback URLs.
export const VIDEO_SOURCES: VideoSource[] = [
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

export const HERO_POSTER_SOURCES: HeroPosterSource[] = [
  {
    width: 960,
    height: 540,
    webp: "/images/frame-960×540.webp",
    jpeg: "/images/frame-960×540.jpg",
  },
  {
    width: 1280,
    height: 720,
    webp: "/images/frame-1280×720.webp",
    jpeg: "/images/frame-1280×720.jpg",
  },
  {
    width: 1920,
    height: 1080,
    webp: "/images/frame-1920×1080.webp",
    jpeg: "/images/frame-1920×1080.jpg",
  },
];
