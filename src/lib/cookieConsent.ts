/* -------------------------------------------------------------------------- */
/*  Cookie-consent helpers                                                    */
/*  Manages the pp_cookie_consent cookie and GA cookie cleanup.               */
/* -------------------------------------------------------------------------- */

export type ConsentStatus = "accepted" | "declined" | null;

const CONSENT_COOKIE = "pp_cookie_consent";
const CONSENT_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/** Read the current consent status from the cookie. */
export function getConsent(): ConsentStatus {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`)
  );
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return value === "accepted" || value === "declined" ? value : null;
}

/** Persist the user's consent choice. */
export function setConsent(status: "accepted" | "declined") {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE}=${status};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax;Secure`;
}

/**
 * Delete every Google Analytics cookie (_ga, _ga_*, _gid, _gat*).
 * Tries the current hostname, a dot-prefixed version, and the parent domain
 * so cookies set on any of those scopes are cleared.
 */
export function deleteAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    if (
      name.startsWith("_ga") ||
      name.startsWith("_gid") ||
      name.startsWith("_gat")
    ) {
      const hostname = window.location.hostname;
      const domains = [hostname, `.${hostname}`];
      const parts = hostname.split(".");
      if (parts.length > 2) {
        domains.push(`.${parts.slice(1).join(".")}`);
      }
      for (const domain of domains) {
        document.cookie = `${name}=;path=/;domain=${domain};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
      // Also try without explicit domain
      document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
}

/** Custom event name dispatched when consent changes. */
export const CONSENT_UPDATE_EVENT = "cookie-consent-update";
