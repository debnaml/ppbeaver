"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealParagraphProps {
  children: ReactNode;
  className?: string;
  order?: number;
}

const BASE_DELAY_STEP = 220;

const RevealParagraph = ({ children, className, order = 0 }: RevealParagraphProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const baseDelay = Math.max(order, 0) * BASE_DELAY_STEP;

  useEffect(() => {
    const element = paragraphRef.current;
    if (!element || typeof window === "undefined") {
      return undefined;
    }

    let timeoutId: number | null = null;

    const revealWithDelay = () => {
      timeoutId = window.setTimeout(() => setIsVisible(true), baseDelay);
    };

    if (typeof IntersectionObserver === "undefined") {
      revealWithDelay();
      return () => {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealWithDelay();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [baseDelay]);

  return (
    <p
      ref={paragraphRef}
      className={clsx("reveal-paragraph", isVisible && "reveal-paragraph--visible", className)}
    >
      {children}
    </p>
  );
};

export default RevealParagraph;
