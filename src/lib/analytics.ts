declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;
type SearchParamsLike = { toString(): string } | null | undefined;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const isAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID);

const invokeGtag = (...args: unknown[]) => {
  if (typeof window === "undefined") return;
  if (!window.gtag || !isAnalyticsEnabled) return;
  window.gtag(...args);
};

export const trackPageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  invokeGtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = (action: string, params?: AnalyticsEventParams) => {
  if (!GA_MEASUREMENT_ID) return;
  invokeGtag("event", action, params);
};

export const initAnalyticsLayer = () => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
};

export const buildPagePath = (pathname: string | null, searchParams?: SearchParamsLike) => {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname ?? "/";
};

export {};