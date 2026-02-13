"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { buildPagePath, isAnalyticsEnabled, trackPageview } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAnalyticsEnabled) return;
    const path = buildPagePath(pathname ?? "/", searchParams);
    trackPageview(path);
  }, [pathname, searchParams]);

  return null;
};

export default AnalyticsTracker;
