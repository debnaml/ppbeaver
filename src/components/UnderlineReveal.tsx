"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";

interface UnderlineRevealProps {
  children: ReactNode;
  color?: string;
  width?: number;
}

const UnderlineReveal = ({
  children,
  color = "var(--color-highlight)",
  width = 0.18,
}: UnderlineRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={clsx("underline-reveal", visible && "underline-reveal--visible")}
      style={{
        "--underline-color": color,
        "--underline-thickness": `${width}px`,
      } as CSSProperties}
    >
      {children}
    </span>
  );
};

export default UnderlineReveal;
