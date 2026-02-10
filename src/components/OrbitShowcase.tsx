"use client";

import clsx from "clsx";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import UnderlineReveal from "@/components/UnderlineReveal";

type ServiceImage = {
  id: string;
  src: string;
  caption: string;
  accent: string;
};

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  images: ServiceImage[];
};

const SERVICES: Service[] = [
  {
    id: "insight",
    number: "01",
    title: "Insight",
    description:
      "We drop inside your operation, interview your teams, and trace every workflow to understand where time, trust, and value leak away.",
    images: [
      {
        id: "insight-1",
        src: "/images/operator.jpg",
        caption: "Ops floor interviews",
        accent: "rgba(19,195,144,0.4)",
      },
      {
        id: "insight-2",
        src: "/images/orbit-operator.jpg",
        caption: "Shadowing live work",
        accent: "rgba(14,27,52,0.55)",
      },
      {
        id: "insight-3",
        src: "/images/operator.jpg",
        caption: "Signal vs. noise",
        accent: "rgba(116,185,255,0.35)",
      },
      {
        id: "insight-4",
        src: "/images/orbit-operator.jpg",
        caption: "Systems audit",
        accent: "rgba(255,255,255,0.18)",
      },
    ],
  },
  {
    id: "strategy",
    number: "02",
    title: "Strategy",
    description:
      "Findings become focus. We map the opportunities, set measurable wins, and give every initiative an accountable owner.",
    images: [
      {
        id: "strategy-1",
        src: "/images/orbit-operator.jpg",
        caption: "North-star planning",
        accent: "rgba(212,173,255,0.35)",
      },
      {
        id: "strategy-2",
        src: "/images/operator.jpg",
        caption: "Decision tables",
        accent: "rgba(19,195,144,0.4)",
      },
      {
        id: "strategy-3",
        src: "/images/orbit-operator.jpg",
        caption: "Value roadmaps",
        accent: "rgba(255,214,153,0.3)",
      },
      {
        id: "strategy-4",
        src: "/images/operator.jpg",
        caption: "Investment cases",
        accent: "rgba(14,27,52,0.55)",
      },
    ],
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Cross-functional pods stand up automations, data fabrics, and intelligent dashboards without slowing the day-to-day.",
    images: [
      {
        id: "build-1",
        src: "/images/operator.jpg",
        caption: "Automation pods",
        accent: "rgba(19,195,144,0.5)",
      },
      {
        id: "build-2",
        src: "/images/orbit-operator.jpg",
        caption: "AI copilots",
        accent: "rgba(144,205,244,0.35)",
      },
      {
        id: "build-3",
        src: "/images/operator.jpg",
        caption: "Decision engines",
        accent: "rgba(255,255,255,0.2)",
      },
      {
        id: "build-4",
        src: "/images/orbit-operator.jpg",
        caption: "Command dashboards",
        accent: "rgba(212,173,255,0.35)",
      },
    ],
  },
  {
    id: "optimise",
    number: "04",
    title: "Optimise",
    description:
      "We keep score, run the playbacks, and tune the systems so gains compound instead of fading after launch.",
    images: [
      {
        id: "optimise-1",
        src: "/images/orbit-operator.jpg",
        caption: "Runbook reviews",
        accent: "rgba(14,27,52,0.55)",
      },
      {
        id: "optimise-2",
        src: "/images/operator.jpg",
        caption: "Performance telemetry",
        accent: "rgba(19,195,144,0.45)",
      },
      {
        id: "optimise-3",
        src: "/images/orbit-operator.jpg",
        caption: "Continuous tuning",
        accent: "rgba(255,214,153,0.3)",
      },
      {
        id: "optimise-4",
        src: "/images/operator.jpg",
        caption: "Playbacks",
        accent: "rgba(212,173,255,0.35)",
      },
    ],
  },
];

const OrbitShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const serviceRefs = useMemo(() => SERVICES.map(() => createRef<HTMLDivElement>()), []);
  const scrollFrame = useRef<number | null>(null);
  const activeService = SERVICES[activeIndex];

  useEffect(() => {
    const updateActiveService = () => {
      scrollFrame.current = null;
      const anchor = window.innerHeight * 0.35;
      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      serviceRefs.forEach((ref, index) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top - anchor);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
    };

    const handleScroll = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = window.requestAnimationFrame(updateActiveService);
    };

    updateActiveService();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollFrame.current) {
        window.cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [serviceRefs]);

  const handleSelect = (index: number, shouldScroll = false) => {
    setActiveIndex(index);
    if (shouldScroll && serviceRefs[index]?.current) {
      serviceRefs[index]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-[#2D829B] px-6 py-24 text-[var(--color-cream)] sm:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h3
          className="mt-4 font-semibold leading-[1.02] text-white"
          style={{
            fontFamily:
              "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: "clamp(2.85rem, 5.25vw, 6.56rem)",
            letterSpacing: "-2%",
          }}
        >
          Practical support at{" "}
          <UnderlineReveal width={3}>every</UnderlineReveal> stage.
        </h3>
        <p className="mt-12 max-w-3xl text-lg text-white/80 sm:mt-16 sm:text-xl lg:text-2xl">
          From understanding where you are today to building and improving the systems you rely on
          tomorrow.
        </p>
      </div>
      <div className="mx-auto mt-16 grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr_1.7fr] lg:items-start">
        <div className="space-y-6 text-left lg:sticky lg:top-28 lg:self-start">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onMouseEnter={() => handleSelect(index, false)}
              onFocus={() => handleSelect(index, false)}
              onClick={() => handleSelect(index, true)}
              className={clsx(
                "group flex flex-col gap-2 text-left transition-colors",
                activeIndex === index ? "text-white" : "text-white/45 hover:text-white/75"
              )}
            >
              <span className="text-sm font-semibold tracking-[0.45em] text-white/50">
                {service.number}
              </span>
              <span
                className="text-4xl font-semibold leading-none sm:text-5xl"
                style={{
                  fontFamily:
                    "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {service.title}
              </span>
              <span
                className={clsx(
                  "mt-1 h-1 w-24 origin-left bg-white transition-all duration-500",
                  activeIndex === index ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:opacity-60"
                )}
              />
            </button>
          ))}
        </div>

        <div className="relative min-h-[260px] lg:sticky lg:top-28 lg:self-start">
          <div key={activeService.id} className="description-panel rounded-[32px] border border-white/15 bg-white/10 p-8 text-left">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">{activeService.number}</p>
            <h4
              className="mt-4 text-3xl font-semibold text-white sm:text-4xl"
              style={{
                fontFamily:
                  "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              {activeService.title}
            </h4>
            <p className="mt-4 text-lg text-white/85 sm:text-xl">{activeService.description}</p>
          </div>
        </div>

        <div className="space-y-10 pb-12">
          {SERVICES.map((service, serviceIndex) => (
            <div
              key={service.id}
              ref={serviceRefs[serviceIndex]}
              className="space-y-6"
            >
              {service.images.map((image) => (
                <article
                  key={image.id}
                  className="relative h-[320px] overflow-hidden rounded-[40px] border border-white/10 bg-[#031216]"
                >
                  <div
                    className={clsx(
                      "absolute inset-0 bg-cover bg-center transition duration-[900ms]",
                      activeIndex === serviceIndex ? "scale-100" : "scale-[1.05]"
                    )}
                    style={{ backgroundImage: `url(${image.src})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(120deg, ${image.accent} 0%, rgba(3,9,11,0.85) 65%)`,
                    }}
                  />
                  <div className="absolute bottom-6 left-6 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                    {image.caption}
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .description-panel {
          animation: panel-slide 0.6s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes panel-slide {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default OrbitShowcase;
