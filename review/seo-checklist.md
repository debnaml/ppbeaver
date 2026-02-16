# SEO Remediation Checklist

Track the remaining work needed before we can mark the "SEO pass" todo as complete.

## 1. Discovery Files

- [ ] Add `public/robots.txt` with at least `User-agent: *` and an allow list for the hero videos plus a reference to the sitemap.
- [ ] Generate and expose `public/sitemap.xml` (or wire up `next-sitemap`) so crawlers can discover privacy, cookies, terms, etc.

## 2. Route-Level Metadata

- [ ] For every legal route (`/privacy`, `/cookies`, `/terms`), export a canonical URL via `metadata.alternates.canonical`.
- [ ] Add per-page `openGraph` + `twitter` overrides so OG/Twitter cards link to the right URL + social image.
- [ ] Ensure future pages follow the same pattern (consider a helper that consumes route config to produce metadata).

## 3. Social Preview Assets

- [ ] Either add `public/og-image.jpg` (1200×630) to match the current metadata or update `metadata` to point at an existing hero frame.
- [ ] Document the naming convention so new preview images stay consistent.

## 4. Structured Data Placement

- [ ] Move the organization JSON-LD script out of `/app/page.tsx` and into the layout `metadata` (or a shared `<Script>` in `RootLayout`) to avoid hydration warnings.

## 5. Performance/LCP Considerations

- [ ] Review the hero preload strategy (`HeroSequence` preloads two fullscreen videos) and add reduced-motion/mobile fallbacks so LCP is not blocked by heavy assets.
- [ ] Audit `prefers-reduced-motion` handling to ensure it skips timeline heavy animations and serves a lightweight poster.

## 6. Outstanding Spec Questions

- [ ] Answer item #8 in `spec.md` ("Confirm SEO requirements") so we have a written definition of done for future audits.
