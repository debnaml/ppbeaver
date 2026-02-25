"use client";

import { useEffect, useState, Suspense } from "react";
import { getConsent, CONSENT_UPDATE_EVENT } from "@/lib/cookieConsent";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";
import AnalyticsTracker from "./AnalyticsTracker";

/**
 * Dynamically loads Google Analytics only after the user has given
 * cookie consent. Listens for consent changes so GA loads immediately
 * when the user clicks "Accept" without a page refresh.
 */

const loadGA = () => {
  if (!GA_MEASUREMENT_ID) return;
  // Prevent double-loading
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return;

  // Initialise dataLayer + gtag using plain JS (matches GA's expected pattern)
  const init = document.createElement("script");
  init.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(init);

  // Load the GA library
  const lib = document.createElement("script");
  lib.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  lib.async = true;
  document.head.appendChild(lib);
};

const ConditionalAnalytics = () => {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check stored consent on mount
    setConsented(getConsent() === "accepted");

    // React to consent changes
    const onUpdate = () => setConsented(getConsent() === "accepted");
    window.addEventListener(CONSENT_UPDATE_EVENT, onUpdate);
    return () => window.removeEventListener(CONSENT_UPDATE_EVENT, onUpdate);
  }, []);

  useEffect(() => {
    if (consented && isAnalyticsEnabled) loadGA();
  }, [consented]);

  if (!consented || !isAnalyticsEnabled) return null;

  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
};

export default ConditionalAnalytics;
