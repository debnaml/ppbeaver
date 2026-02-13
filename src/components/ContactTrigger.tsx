"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

const ContactModal = dynamic(() => import("./ContactModal"), {
  loading: () => null,
  ssr: false,
});

const buttonClasses =
  "pp-button inline-flex items-center rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-8 py-4 text-base font-semibold text-[var(--color-ink)] backdrop-blur transition hover:brightness-110";

const emailClasses = "text-sm text-white/60";

const ContactTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const handleOpen = () => {
    trackEvent("contact_cta_click", {
      source: "contact-section",
    });
    setIsOpen(true);
  };

  return (
    <>
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          aria-label="Open contact form"
          className={buttonClasses}
          onClick={handleOpen}
          ref={triggerRef}
        >
          Let&apos;s talk
        </button>
        <p className={emailClasses} style={{ marginTop: "15px" }}>
          Prefer email?{" "}
          <a
            href="mailto:hello@performancepeak.com"
            className="text-[#66f2d5] underline"
            onClick={() =>
              trackEvent("contact_email_click", {
                source: "contact-section",
              })
            }
          >
            hello@performancepeak.com
          </a>
        </p>
      </div>

      {isOpen ? <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

export default ContactTrigger;
