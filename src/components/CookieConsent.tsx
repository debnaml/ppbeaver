"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  setConsent,
  deleteAnalyticsCookies,
  CONSENT_UPDATE_EVENT,
} from "@/lib/cookieConsent";

/**
 * GDPR-compliant cookie consent banner.
 *
 * - Appears when no consent choice has been stored.
 * - Accept / Decline buttons are equally prominent (no dark patterns).
 * - Choice is persisted in the `pp_cookie_consent` cookie for 1 year.
 * - Decline removes any GA cookies already set.
 * - Listens for `show-cookie-consent` to allow the user to re-open via footer link.
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  /* Show the banner if no choice has been recorded yet. */
  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  /* Allow reopening the banner (e.g. from a "Manage Cookies" footer link). */
  useEffect(() => {
    const handleShow = () => setVisible(true);
    window.addEventListener("show-cookie-consent", handleShow);
    return () => window.removeEventListener("show-cookie-consent", handleShow);
  }, []);

  const respond = (choice: "accepted" | "declined") => {
    setConsent(choice);
    if (choice === "declined") deleteAnalyticsCookies();
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_UPDATE_EVENT));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[var(--color-ink)]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm leading-relaxed text-white/80">
          We use analytics cookies to understand how visitors use our site. No
          advertising or tracking cookies are set. See our{" "}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="underline hover:text-white">
            Cookies Policy
          </Link>{" "}
          for details.
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => respond("declined")}
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("accepted")}
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
