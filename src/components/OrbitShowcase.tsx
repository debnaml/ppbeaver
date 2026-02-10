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
  title: string;
  description: string;
  detailGrid?: string[];
  images: ServiceImage[];
};

const chunkItems = (items: string[], chunkSize = 2) => {
  const rows: string[][] = [];
  items.forEach((item, index) => {
    if (index % chunkSize === 0) {
      rows.push([item]);
    } else {
      rows[rows.length - 1].push(item);
    }
  });
  return rows;
};

const SERVICES: Service[] = [
  {
    id: "insight",
    title: "Insight",
    description:
      "Independent advice grounded in your data, your team and how your organisation actually works.",
    detailGrid: [
      "Data analysis and reporting",
      "Stakeholder and customer research",
      "Process and workflow reviews",
      "System and technology audits",
      "Journey mapping",
      "Opportunity discovery workshops",
      "Feasibility and business case support",
      "Clear, practical recommendations",
    ],
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
    title: "Strategy",
    description:
      "Thoughtful planning and experienced guidance to help you prioritise the right changes with confidence.",
    detailGrid: [
      "Digital transformation roadmaps",
      "Technology and AI strategy",
      "Automation and integration planning",
      "Product and service design",
      "Vendor and platform selection",
      "Architecture and solution design",
      "Change and adoption planning",
      "Delivery leadership and programme support",
    ],
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
    title: "Build",
    description:
      "From websites to internal systems, we design and build reliable tools that are simple to use and built to last.",
    detailGrid: [
      "Website design and development",
      "Web and mobile apps",
      "Membership portals and platforms",
      "E-learning and training systems",
      "System integrations and APIs",
      "Workflow automation",
      "AI-powered features and assistants",
      "Custom software and internal tools",
    ],
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
    title: "Optimise",
    description:
      "We stay with you after launch, refining, supporting and evolving your systems so they continue to deliver value over time.",
    detailGrid: [
      "Ongoing optimisation and enhancements",
      "Analytics and performance tracking",
      "Conversion and usability improvements",
      "AI tuning and automation improvements",
      "Content and experience updates",
      "Training and enablement",
      "Support and maintenance",
      "Long-term partnership and advisory",
    ],
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
  const detailRows = activeService.detailGrid ? chunkItems(activeService.detailGrid) : [];

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
          Practical advice and hands-on support at{" "}
          <UnderlineReveal width={3}>every</UnderlineReveal> stage.
        </h3>
        <p className="mt-12 max-w-3xl text-lg text-white/80 sm:mt-16 sm:text-xl lg:text-2xl">
          From understanding where you are today to building and improving the systems you rely on
          tomorrow.
        </p>
      </div>
      <div className="mx-auto mt-16 grid w-full max-w-[1600px] gap-10 lg:grid-cols-[0.65fr_1.45fr_1.6fr] lg:items-start">
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

        <div className="relative min-h-[200px] text-left text-white/85 lg:sticky lg:top-28 lg:self-start">
          <div key={activeService.id} className="space-y-6">
            <p className="text-lg sm:text-xl">{activeService.description}</p>
            {activeService.detailGrid && (
              <table className="w-full border-collapse text-sm text-white/80">
                <tbody>
                  {detailRows.map((row, rowIndex) => (
                    <tr
                      key={`${activeService.id}-detail-row-${rowIndex}`}
                      className="border-t border-white/10 first:border-t-0"
                    >
                      <td className="py-3 pr-4 align-top">{row[0]}</td>
                      <td className="border-l border-white/15 py-3 pl-4 align-top">{row[1] ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
    </section>
  );
};

export default OrbitShowcase;
