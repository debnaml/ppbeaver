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

const clampValue = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

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
      "Data analysis & reporting",
      "Stakeholder & customer research",
      "Process & workflow reviews",
      "System & technology audits",
      "Journey mapping",
      "Opportunity discovery workshops",
      "Feasibility & business case support",
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
      "Technology & AI strategy",
      "Integration planning",
      "Product & service design",
      "Vendor & platform selection",
      "Architecture & solution design",
      "Change & adoption planning",
      "Delivery leadership & programme support",
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
      "Website design & development",
      "Web and mobile apps",
      "Membership portals & platforms",
      "E-learning & training systems",
      "System integrations & APIs",
      "Workflow automation",
      "AI-powered features & assistants",
      "Custom software & internal tools",
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
      "Optimisation & enhancements",
      "Analytics & performance tracking",
      "Conversion & usability improvements",
      "Tuning & automation improvements",
      "Content & experience updates",
      "Training & enablement",
      "Support & maintenance",
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
  const [heroProgress, setHeroProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const serviceRefs = useMemo(() => SERVICES.map(() => createRef<HTMLDivElement>()), []);
  const lastImageRefs = useMemo(() => SERVICES.map(() => createRef<HTMLDivElement>()), []);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const heroFrame = useRef<number | null>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const activeService = SERVICES[activeIndex];
  const detailRows = activeService.detailGrid ? chunkItems(activeService.detailGrid) : [];

  useEffect(() => {
    const updateActiveService = () => {
      scrollFrame.current = null;
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;
      const sectionTop = sectionNode.getBoundingClientRect().top;
      const boundary = Math.max(sectionTop, 0);

      let nextIndex = SERVICES.length - 1;
      for (let i = 0; i < lastImageRefs.length; i += 1) {
        const anchorNode = lastImageRefs[i].current;
        if (!anchorNode) continue;
        const anchorTop = anchorNode.getBoundingClientRect().top;
        if (anchorTop >= boundary) {
          nextIndex = i;
          break;
        }
      }

      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
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
  }, [lastImageRefs]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const node = introRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      const raf = window.requestAnimationFrame(() => setIntroVisible(true));
      return () => window.cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeroState = () => {
      heroFrame.current = null;
      const wrapper = heroWrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) {
        const resolved = rect.top <= 0 ? 1 : 0;
        setHeroProgress((prev) => (prev === resolved ? prev : resolved));
        return;
      }

      const progress = clampValue(-rect.top / totalScrollable, 0, 1);
      setHeroProgress((prev) => (Math.abs(prev - progress) < 0.01 ? prev : progress));
    };

    const handleHeroScroll = () => {
      if (heroFrame.current) return;
      heroFrame.current = window.requestAnimationFrame(updateHeroState);
    };

    updateHeroState();
    window.addEventListener("scroll", handleHeroScroll, { passive: true });
    window.addEventListener("resize", handleHeroScroll);

    return () => {
      if (heroFrame.current) {
        window.cancelAnimationFrame(heroFrame.current);
        heroFrame.current = null;
      }
      window.removeEventListener("scroll", handleHeroScroll);
      window.removeEventListener("resize", handleHeroScroll);
    };
  }, []);

  const handleSelect = (index: number, shouldScroll = false) => {
    setActiveIndex(index);
    if (shouldScroll && serviceRefs[index]?.current) {
      serviceRefs[index]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroOpacity = Math.max(0, 1 - heroProgress * 1.1);
  const heroScale = Math.max(0.86, 1 - heroProgress * 0.12);
  const heroTranslate = heroProgress * -60;
  const gridLift = (1 - heroProgress) * 80;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate bg-[#2D829B] px-6 py-24 text-[var(--color-cream)] sm:px-12"
    >
      <div ref={heroWrapperRef} className="relative min-h-[200vh]">
        <div className="sticky top-0 z-10 flex h-screen items-center justify-center px-2 sm:px-6">
          <div
            ref={introRef}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroTranslate}px) scale(${heroScale})`,
              filter: `blur(${heroProgress * 1.5}px)`,
              transition: "opacity 200ms ease-out, transform 200ms ease-out, filter 200ms ease-out",
            }}
          >
            <h3
              className={clsx(
                "mt-4 font-heading font-semibold leading-[1.02] text-[clamp(2.85rem,5.25vw,6.56rem)] text-white tracking-[-0.02em] orbit-intro-line",
                introVisible && "orbit-intro-line--visible"
              )}
            >
              Practical advice and hands-on support at{" "}
              <UnderlineReveal width={3}>every</UnderlineReveal> stage.
            </h3>
            <p
              className={clsx(
                "mt-12 max-w-3xl text-lg text-white/80 sm:mt-16 sm:text-xl lg:text-2xl orbit-intro-line",
                introVisible && "orbit-intro-line--visible"
              )}
              style={{
                transitionDelay: introVisible ? "140ms" : undefined,
              }}
            >
              From understanding where you are today to building and improving the systems you rely on
              tomorrow.
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative z-20 -mt-[30vh] sm:-mt-[38vh] lg:-mt-[45vh]"
        style={{
          transform: `translateY(${gridLift}px)`,
          transition: "transform 250ms ease-out",
        }}
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="space-y-12 lg:hidden">
            {SERVICES.map((service) => (
              <div key={`${service.id}-mobile`} className="space-y-6">
                <h4
                  className="font-heading text-3xl font-semibold text-white"
                >
                  {service.title}
                </h4>
                <p className="text-base text-white/80">{service.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {service.images.map((image) => (
                    <article
                      key={`${service.id}-${image.id}-mobile`}
                      className="relative h-40 overflow-hidden rounded-[10px] border border-white/10 bg-[#031216]"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.src})` }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(120deg, ${image.accent} 0%, rgba(3,9,11,0.85) 65%)`,
                        }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden gap-10 lg:grid lg:grid-cols-[0.65fr_1.45fr_1.6fr] lg:items-start">
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
                    className="font-heading text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl"
                  >
                    {service.title}
                  </span>
                  <span
                    className={clsx(
                      "mt-1 h-1 w-24 origin-left bg-[#13C390] transition-all duration-500",
                      activeIndex === index ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:opacity-60"
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="relative min-h-[200px] text-left text-white/85 lg:sticky lg:top-28 lg:self-start">
              <div key={activeService.id} className="space-y-6">
                <p
                  className={clsx("orbit-detail-row text-lg sm:text-xl")}
                  style={{ animationDelay: "40ms" }}
                >
                  {activeService.description}
                </p>
                {activeService.detailGrid && (
                  <table className="w-full border-collapse text-sm text-white/80">
                    <tbody>
                      {detailRows.map((row, rowIndex) => (
                        <tr
                          key={`${activeService.id}-detail-row-${rowIndex}`}
                          className="orbit-detail-row border-t border-white/10 first:border-t-0"
                          style={{ animationDelay: `${rowIndex * 110}ms` }}
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
                  {service.images.map((image, imageIndex) => (
                    <article
                      key={image.id}
                      className="relative h-[320px] overflow-hidden rounded-[10px] border border-white/10 bg-[#031216]"
                      ref={
                        imageIndex === service.images.length - 1
                          ? lastImageRefs[serviceIndex]
                          : undefined
                      }
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
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbitShowcase;
