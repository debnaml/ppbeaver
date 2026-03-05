"use client";

import clsx from "clsx";
import Image from "next/image";
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import UnderlineReveal from "@/components/UnderlineReveal";
import LottieOnView from "@/components/LottieOnView";

type ServiceImage = {
  id: string;
  src: string;
  caption: string;
  accent: string;
  mediaType?: "image" | "video" | "lottie";
  poster?: string;
  size?: "sm" | "lg";
  alt?: string;
  highlightDetail?: string;
};
type Service = {
  id: string;
  title: string;
  description: string;
  detailGrid?: string[];
  images: ServiceImage[];
};

const clampValue = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const ALIGNMENT_THRESHOLD = 16;

const SERVICES: Service[] = [
  {
    id: "insight",
    title: "Insight",
    description:
      "Independent advice grounded in your data, your team and how your organisation actually works.",
    detailGrid: [
      "Data analysis & reporting",
      "Stakeholder & customer research",
      "Process reviews",
      "Technology audits",
      "Journey mapping",
      "Opportunity workshops",
      "Feasibility studies",
      "Business case support",
    ],
    images: [
      {
        id: "insight-1",
        src: "/lottie/customer-research-dark.json",
        caption: "Customer research",
        accent: "rgba(51, 11, 63, 0.0)",
        mediaType: "lottie",
        highlightDetail: "Stakeholder & customer research",
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    description:
      "Thoughtful planning and experienced guidance to help you prioritise the right changes with confidence.",
    detailGrid: [
      "Transformation roadmaps",
      "Technology & AI strategy",
      "Integration planning",
      "Product & service design",
      "Vendor & platform selection",
      "Solution design",
      "Delivery leadership",
    ],
    images: [
      {
        id: "strategy-1",
        src: "/images/service-images/service-mobile.webp",
        caption: "Product design",
        accent: "rgba(212,173,255,0.35)",
        highlightDetail: "Product & service design",
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
      "UX/UI design",
      "Web and mobile apps",
      "Membership portals",
      "E-learning & training systems",
      "System integrations & APIs",
      "Workflow automation",
      "AI-powered features & assistants",
    ],
    images: [      
      {
        id: "build-1",
        src: "/images/service-images/e-learning.webp",
        caption: "eLearning & training",
        accent: "rgba(60,13,57,0.35)",
        size: "lg",
        highlightDetail: "E-learning & training systems",
      },
      {
        id: "build-2",
        src: "/images/service-images/web.webp",
        caption: "eLearning & training",
        accent: "rgba(60,13,57,0.35)",
        size: "lg",
        highlightDetail: "Web and mobile apps",
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
      "Conversion improvements",
      "Tuning & automation",
      "Content & experience updates",
      "Security reviews & updates",
      "Support & maintenance",
    ],
    images: [
      {
        id: "optimise-1",
        src: "/images/orbit-operator.webp",
        caption: "Runbook reviews",
        accent: "rgba(14,27,52,0.55)",
        highlightDetail: "Support & maintenance",
      },
      
    ],
  },
];

const OrbitShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const serviceRefs = useMemo(() => SERVICES.map(() => createRef<HTMLElement>()), []);
  const imageRefs = useMemo(
    () => SERVICES.map((service) => service.images.map(() => createRef<HTMLElement>())),
    []
  );
  const detailColumnRef = useRef<HTMLDivElement | null>(null);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const heroFrame = useRef<number | null>(null);
  const imageScrollFrame = useRef<number | null>(null);
  const [activeImageIndices, setActiveImageIndices] = useState(() => SERVICES.map(() => 0));
  const [introVisible, setIntroVisible] = useState(false);
  const activeService = SERVICES[activeIndex];
  const activeImageIndex = activeImageIndices[activeIndex] ?? 0;
  const highlightedDetail = activeService.images[activeImageIndex]?.highlightDetail;

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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateActiveImages = () => {
      imageScrollFrame.current = null;
      const detailTop = detailColumnRef.current
        ? detailColumnRef.current.getBoundingClientRect().top
        : window.innerHeight * 0.25;

      const nextIndices = SERVICES.map((service, serviceIndex) => {
        const refs = imageRefs[serviceIndex];
        if (!refs.length) return 0;
        let current = 0;
        refs.forEach((refObj, imageIndex) => {
          const node = refObj.current;
          if (!node) return;
          const top = node.getBoundingClientRect().top;
          if (top <= detailTop + ALIGNMENT_THRESHOLD) {
            current = imageIndex;
          }
        });
        return current;
      });

      let nextActiveService = 0;
      for (let i = 0; i < SERVICES.length; i += 1) {
        const firstRef = imageRefs[i]?.[0]?.current ?? serviceRefs[i]?.current;
        if (!firstRef) continue;
        const top = firstRef.getBoundingClientRect().top;
        if (top <= detailTop + ALIGNMENT_THRESHOLD) {
          nextActiveService = i;
        } else {
          break;
        }
      }

      setActiveImageIndices((prev) => {
        for (let i = 0; i < nextIndices.length; i += 1) {
          if (prev[i] !== nextIndices[i]) {
            return nextIndices;
          }
        }
        return prev;
      });

      setActiveIndex((prev) => (prev === nextActiveService ? prev : nextActiveService));
    };

    const handleImageScroll = () => {
      if (imageScrollFrame.current) return;
      imageScrollFrame.current = window.requestAnimationFrame(updateActiveImages);
    };

    updateActiveImages();
    window.addEventListener("scroll", handleImageScroll, { passive: true });
    window.addEventListener("resize", handleImageScroll);

    return () => {
      if (imageScrollFrame.current) {
        window.cancelAnimationFrame(imageScrollFrame.current);
        imageScrollFrame.current = null;
      }
      window.removeEventListener("scroll", handleImageScroll);
      window.removeEventListener("resize", handleImageScroll);
    };
  }, [imageRefs, serviceRefs]);

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
  const isHighlightedDetail = (value?: string) => Boolean(value && highlightedDetail && value === highlightedDetail);
  const assignImageRef = useCallback(
    (serviceIndex: number, imageIndex: number) => (node: HTMLElement | null) => {
      imageRefs[serviceIndex][imageIndex].current = node;
    },
    [imageRefs]
  );

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
            <h2
              className={clsx(
                "mt-4 font-heading font-semibold leading-[1.02] text-[clamp(2.85rem,5.25vw,6.56rem)] text-white tracking-[-0.02em] orbit-intro-line",
                introVisible && "orbit-intro-line--visible"
              )}
            >
              Practical advice and hands-on support at{" "}
              <UnderlineReveal width={3}>every</UnderlineReveal> stage.
            </h2>
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
          <ul role="list" className="space-y-12 lg:hidden">
            {SERVICES.map((service) => {
              const mobileTitleId = `service-${service.id}-title-mobile`;
              return (
                <li key={`${service.id}-mobile`}>
                  <article aria-labelledby={mobileTitleId} className="space-y-6">
                    <h3 id={mobileTitleId} className="font-heading text-3xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-base text-white/80">{service.description}</p>
                    <div className="grid grid-cols-2 gap-4" role="list">
                      {service.images.map((image) => (
                        <figure
                          key={`${service.id}-${image.id}-mobile`}
                          className="relative overflow-hidden rounded-[10px]"
                        >
                          {image.mediaType === "video" ? (
                            <video
                              className="block w-full"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              poster={image.poster}
                            >
                              <source src={image.src} type="video/mp4" />
                            </video>
                          ) : image.mediaType === "lottie" ? (
                            <LottieOnView
                              src={image.src}
                              className="block w-full"
                              ariaLabel={image.alt ?? image.caption}
                            />
                          ) : (
                            <Image
                              src={image.src}
                              alt={image.alt ?? image.caption}
                              width={600}
                              height={400}
                              className="block h-auto w-full object-cover"
                              sizes="(max-width: 1024px) 50vw, 20vw"
                            />
                          )}
                        </figure>
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="hidden gap-10 lg:grid lg:grid-cols-[0.75fr_1.35fr_1.3fr] lg:items-start">
            <nav aria-label="Service categories" className="lg:sticky lg:top-28 lg:self-start">
              <ul role="list" className="space-y-6 text-left">
                {SERVICES.map((service, index) => {
                  const titleId = `service-${service.id}-title`;
                  const panelId = `service-panel-${service.id}`;
                  return (
                    <li key={service.id}>
                      <button
                        type="button"
                        aria-controls={panelId}
                        aria-expanded={activeIndex === index}
                        onMouseEnter={() => handleSelect(index, false)}
                        onFocus={() => handleSelect(index, false)}
                        onClick={() => handleSelect(index, true)}
                        className={clsx(
                          "group flex flex-col gap-2 text-left transition-colors",
                          activeIndex === index ? "text-white" : "text-white/45 hover:text-white/75"
                        )}
                      >
                        <span
                          id={titleId}
                          className="font-heading text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl"
                        >
                          {service.title}
                        </span>
                        <span
                          className={clsx(
                            "mt-1 h-1 w-24 origin-left bg-[#13C390] transition-all duration-500",
                            activeIndex === index
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:opacity-60"
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              ref={detailColumnRef}
              className="relative min-h-[200px] text-left text-white/85 lg:sticky lg:top-28 lg:self-start"
            >
              <div key={activeService.id} className="space-y-6">
                <p
                  className={clsx("orbit-detail-row text-lg sm:text-xl")}
                  style={{ animationDelay: "40ms" }}
                >
                  {activeService.description}
                </p>
                {activeService.detailGrid && (
                  <div className="mt-2 border-t border-white/15">
                    <ul
                      role="list"
                      className="grid grid-cols-1 text-sm text-white/80 sm:grid-cols-2"
                    >
                      {activeService.detailGrid.map((detail, detailIndex) => {
                      const rowNumber = Math.floor(detailIndex / 2);
                      const isSecondColumn = detailIndex % 2 === 1;
                      const needsRowDivider = rowNumber >= 1;

                      return (
                        <li
                          key={`${activeService.id}-detail-${detailIndex}`}
                          className={clsx(
                            "orbit-detail-row transition-colors py-3",
                              needsRowDivider && "border-t border-white/15",
                              isSecondColumn ? "sm:border-l sm:border-white/15 sm:pl-4" : "sm:pr-4",
                            isHighlightedDetail(detail) &&
                              "text-white underline decoration-[#13C390] decoration-2 underline-offset-4"
                          )}
                          style={{ animationDelay: `${detailIndex * 90}ms` }}
                        >
                          {detail}
                        </li>
                      );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-10 pb-12">
              {SERVICES.map((service, serviceIndex) => {
                const panelId = `service-panel-${service.id}`;
                const labelId = `service-${service.id}-title`;
                return (
                  <article
                    key={service.id}
                    id={panelId}
                    aria-labelledby={labelId}
                    ref={serviceRefs[serviceIndex]}
                    className="space-y-6"
                  >
                    {service.images.map((image, imageIndex) => (
                      <figure
                        key={image.id}
                        className="relative overflow-hidden rounded-[10px]"
                        ref={assignImageRef(serviceIndex, imageIndex)}
                      >
                      {image.mediaType === "video" ? (
                        <video
                          className={clsx(
                            "block w-full transition duration-[900ms]",
                            activeIndex === serviceIndex ? "scale-100" : "scale-100"
                          )}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          poster={image.poster}
                        >
                          <source src={image.src} type="video/mp4" />
                        </video>
                      ) : image.mediaType === "lottie" ? (
                        <LottieOnView
                          src={image.src}
                          className="block w-full"
                          ariaLabel={image.alt ?? image.caption}
                        />
                      ) : (
                        <Image
                          src={image.src}
                          alt={image.alt ?? image.caption}
                          width={900}
                          height={600}
                          className="block h-auto w-full object-cover"
                          sizes="(max-width: 1024px) 100vw, 30vw"
                        />
                      )}
                    </figure>
                  ))}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbitShowcase;
