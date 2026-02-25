import type { NextConfig } from "next";

/* ------------------------------------------------------------------ */
/*  Content-Security-Policy                                           */
/*  Using Report-Only mode initially so violations are logged in the  */
/*  browser console without blocking anything. Once verified, rename  */
/*  the header to "Content-Security-Policy" to enforce.               */
/* ------------------------------------------------------------------ */
const cspDirectives = [
  "default-src 'self'",
  // 'unsafe-inline' required for: React inline styles rendered via style={{}},
  // Next.js hydration scripts, and the GA dataLayer init in ConditionalAnalytics.
  "script-src 'self' https://www.googletagmanager.com 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self' https://customer-wsmbmuhwgz78t75t.cloudflarestream.com",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://customer-wsmbmuhwgz78t75t.cloudflarestream.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  /* CSP — Enforced */
  {
    key: "Content-Security-Policy",
    value: cspDirectives,
  },
  /* HSTS — domain-only, no includeSubDomains, no preload.
     Starting at 5 minutes; increase to 86400 (1 day) then
     31536000 (1 year) once confident. */
  {
    key: "Strict-Transport-Security",
    value: "max-age=2592000",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
