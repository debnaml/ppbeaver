"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Polaroid-style mascot card that springs into view when the contact
 * section is reached — carries the beaver character through to the
 * site's payoff moment.
 */
const BeaverStamp = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={clsx("beaver-stamp", visible && "beaver-stamp--visible")}>
      <Image
        src="/images/site-beaver.webp"
        alt="Performance Peak beaver mascot giving a thumbs up"
        width={168}
        height={168}
        className="block rounded-[4px]"
      />
      <span className="beaver-stamp-caption">Ready when you are</span>
    </div>
  );
};

export default BeaverStamp;
