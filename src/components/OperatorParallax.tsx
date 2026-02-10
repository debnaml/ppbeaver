"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const TEXT_SEGMENTS = [
  "Build with intelligence",
  "Build with imagination",
  "Build with information",
];
const MARQUEE_LINES = [
  { direction: -1, offset: 0 },
  { direction: 1, offset: -20 },
  { direction: -1, offset: 0 },
];
const HIGHLIGHT_WORDS = ["intelligence", "imagination", "information"];

const renderSegment = (segment: string) => {
  const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "gi");
  return segment.split(regex).filter(Boolean).map((part, index) => {
    const isHighlight = HIGHLIGHT_WORDS.some((word) => word.toLowerCase() === part.toLowerCase());
    if (isHighlight) {
      return (
        <span key={`highlight-${part}-${index}`} className="text-[#13C390] opacity-80">
          {part}
        </span>
      );
    }
    return (
      <span key={`segment-${part}-${index}`} className="opacity-80">
        {part}
      </span>
    );
  });
};

const OperatorParallax = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      setOffset((prev) => {
        const next = clamp(progress * -60, -40, 40);
        return Math.abs(prev - next) < 0.5 ? prev : next;
      });

      const viewport = window.innerHeight;
      const scrub = (viewport - rect.top) / (rect.height + viewport);
      const nextProgress = clamp(scrub, 0, 1);
      setScrollProgress((prev) => {
        if (Math.abs(prev - nextProgress) < 0.01) return prev;
        return nextProgress;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive]);

  const parallaxOffset = isActive ? offset : 0;
  const marqueeProgress = isActive ? scrollProgress : 0;

  return (
    <section ref={sectionRef} className="relative isolate px-0 py-0">
      <div ref={containerRef} className="relative h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: "url(/images/operator.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxOffset}px) scale(1.05)`,
            transition: "transform 120ms ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/60" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 px-6 sm:px-12">
          {MARQUEE_LINES.map(({ direction, offset }, index) => (
            <div key={`marquee-${index}`} className="overflow-hidden">
              <p
                className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[0.1em] text-white/80"
                style={{ fontFamily: "var(--font-syne), 'Syne', system-ui, sans-serif" }}
              >
                <span
                  className="inline-flex min-w-full whitespace-nowrap will-change-transform"
                  style={{
                    transform: `translateX(${direction * marqueeProgress * 25 + offset}%)`,
                    transition: "transform 90ms linear",
                  }}
                  aria-hidden
                >
                  {[...Array(3)].map((_, repeatIndex) => (
                    <span
                      key={`segment-repeat-${index}-${repeatIndex}`}
                      className="inline-flex items-center gap-4"
                    >
                      {TEXT_SEGMENTS.map((segment, segmentIndex) => (
                        <span key={`${segment}-${segmentIndex}`} className="inline-flex items-center gap-4">
                          <span className="inline-flex gap-2">
                            {renderSegment(segment)}
                          </span>
                          {segmentIndex < TEXT_SEGMENTS.length - 1 && (
                            <span
                              className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
                              aria-hidden
                            >
                              <span
                                className="inline-block h-6 w-6 bg-contain bg-center bg-no-repeat opacity-90"
                                style={{
                                  backgroundImage: "url(/logo.svg)",
                                  filter: "brightness(0) saturate(100%) invert(100%)",
                                }}
                              />
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatorParallax;
