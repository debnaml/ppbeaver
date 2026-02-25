# SEO Review — Performance Peak

**Date:** 25 February 2026  
**Scope:** Technical SEO, on-page optimisation, and discoverability audit  
**Severity scale:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low / Informational

---

## Executive Summary

The site has a strong technical SEO foundation — structured data, canonical URLs, Open Graph / Twitter Card metadata, a dynamic sitemap, responsive images, and Google Fonts self-hosted via Next.js. For a single-page consultancy site, the baseline is solid. The main issues are around URL inconsistency between `www` and non-`www` versions, missing structured data depth, thin content indexation signals, and crawlability gaps in the single-page architecture.

---

## Positive Findings (No Action Needed)

- ✅ **Organization structured data** in `layout.tsx` with name, URL, logo, social links, contact point.
- ✅ **Canonical URLs** set via `alternates.canonical` on all pages.
- ✅ **Open Graph and Twitter Card metadata** on every page.
- ✅ **Dynamic `sitemap.ts`** generating XML sitemap for all routes.
- ✅ **`robots.txt`** allowing all user agents with sitemap reference.
- ✅ **Self-hosted Google Fonts** via `next/font/google` — no render-blocking external requests.
- ✅ **`font-display: swap`** for web fonts — no invisible text flash.
- ✅ **Responsive images** with `next/image` `sizes` attribute and WebP/JPEG `<picture>` elements.
- ✅ **`<meta name="description">`** on all pages.
- ✅ **Descriptive `<title>` tags** with template pattern.

---

## 1. ~~URL Inconsistency — `www` vs Non-`www`~~ ✅ RESOLVED

**Severity:** 🔴 Critical → ✅ Fixed

### Finding

There is a conflicting canonical domain across the codebase:

| File                          | URL Used                                               |
| ----------------------------- | ------------------------------------------------------ |
| `layout.tsx` (`siteUrl`)      | `https://www.performancepeak.co.uk`                    |
| `siteMetadata.ts` (`siteUrl`) | `https://www.performancepeak.co.uk`                    |
| `sitemap.ts` (`siteUrl`)      | `https://performancepeak.co.uk` (no `www`)             |
| `robots.txt` (Sitemap)        | `https://performancepeak.co.uk/sitemap.xml` (no `www`) |

This means:

- The canonical URLs in `<head>` point to `www.performancepeak.co.uk`.
- The sitemap submitted to crawlers contains `performancepeak.co.uk` URLs.
- Google will see these as two different sites, potentially splitting link equity and indexation signals.

### Recommendation

1. ~~**Pick one canonical domain** (recommend `www.performancepeak.co.uk` to match the primary metadata).~~ ✅
2. ~~Update `sitemap.ts` to use `https://www.performancepeak.co.uk`.~~ ✅
3. ~~Update `robots.txt` to reference `https://www.performancepeak.co.uk/sitemap.xml`.~~ ✅
4. Configure the hosting provider (Vercel, Cloudflare, etc.) to 301-redirect the non-`www` variant to `www` (or vice versa). _(Confirmed already in place.)_
5. Verify the chosen domain is set as the preferred version in Google Search Console.

---

## 2. Single-Page Architecture — Crawlable Content Depth

**Severity:** 🟠 High — partially mitigated ✅

### Finding

The homepage is a single long-scroll page with four content sections (Hero, About, Services/OrbitShowcase, Contact). Each section uses anchor IDs (`#about`, `#services`, `#contact`) but only the root URL `/` is indexed.

**SEO implications:**

- All keyword-rich content competes on a single URL.
- Google cannot separately rank the "services" content for relevant queries.
- The services section contains detailed service descriptions and bullet points (Insight, Strategy, Build, Optimise) that could each rank independently.
- Internal linking structure is limited — all hash links go to the same page.

### Recommendation

Consider whether the site will benefit from dedicated subpages in the future:

- `/services/insight`, `/services/strategy`, `/services/build`, `/services/optimise`
- `/about`

If the single-page approach is intentional (brand/design decision), then:

1. ~~Ensure the homepage `<meta description>` covers all service keywords.~~ ✅ Updated to include insight, strategy, build, optimise, websites, apps, AI consultancy.
2. ~~Add more semantic HTML signals (additional structured data for each service).~~ ✅ Service structured data added.
3. Consider `FAQ` or `Service` schema markup for the individual service sections. _(Service schema added; FAQ can be added when FAQ content exists.)_

---

## 3. ~~Structured Data — Opportunities for Enhancement~~ ✅ RESOLVED

**Severity:** 🟠 High → ✅ Fixed

### Finding

The current `Organization` schema is well-formed but minimal. Additional structured data opportunities:

| Schema Type                   | Where                       | Benefit                                                                                   |
| ----------------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| `Service`                     | OrbitShowcase services      | Would enable rich results for service-related queries                                     |
| `WebSite` with `SearchAction` | `layout.tsx`                | Enables sitelinks search box in SERPs (less relevant for small sites but future-proofing) |
| `WebPage`                     | Each page                   | Clarifies page type to crawlers                                                           |
| `BreadcrumbList`              | Legal pages                 | Enables breadcrumb display in search results                                              |
| `ContactPage`                 | Contact section             | Reinforces the contact intent signal                                                      |
| `FAQPage`                     | If any FAQ content is added | Enables FAQ rich results                                                                  |

### Recommendation

1. ~~Add `Service` structured data for each of the four service categories.~~ ✅ Added via `hasOfferCatalog` with four Service entries.
2. Add `BreadcrumbList` schema to legal pages (Home > Privacy, etc.). _(Still outstanding.)_
3. ~~Consider `ProfessionalService` or `ConsultingBusiness` as a more specific `@type` than `Organization`.~~ ✅ Changed to `ProfessionalService`.

---

## 4. ~~Legal Pages — Missing `<h1>` and Thin Content Signals~~ ✅ PARTIALLY RESOLVED

**Severity:** 🟡 Medium → partially fixed ✅

### Finding

The legal pages (/privacy, /cookies, /terms) use `SplitHeroHeading` which renders `<p>` and `<span>` elements — not `<h1>`. Search engines strongly weight the `<h1>` tag for understanding page topic.

Additionally:

- The legal pages are very short (each has 3–4 sections with 1–2 paragraphs). While this is fine for terms/cookies, the privacy page could benefit from more comprehensive content (see Data Protection review).
- The privacy and cookies pages share the same OG image (`/og-image.jpg`) — page-specific images would improve social sharing distinctiveness.

### Recommendation

1. ~~Add a proper `<h1>` (can be `sr-only`) reflecting the page title.~~ ✅ `SplitHeroHeading` now renders an `<h1>` element.
2. Expand the privacy policy content (also a data protection requirement). _(Still outstanding.)_
3. Consider page-specific OG images for legal pages. _(Still outstanding.)_

---

## 5. Image Optimisation — Missing `alt` Keywords

**Severity:** 🟡 Medium

### Finding

Several images use generic or empty `alt` attributes where descriptive, keyword-bearing alternatives would improve SEO:

| Image                        | Current Alt                                  | Suggestion                                                                                                                                                                                                             |
| ---------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero poster images           | `alt=""`                                     | Since these are decorative (behind overlay text), empty alt is technically correct, but the hero imagery is a missed branding/SEO opportunity. Consider if a descriptive alt could add value without being misleading. |
| Operator parallax            | `alt=""`                                     | Decorative — correct.                                                                                                                                                                                                  |
| Service image: e-learning    | Falls back to caption "eLearning & training" | Could be more descriptive: "Screenshot of an e-learning platform interface"                                                                                                                                            |
| Footer logo (desktop shadow) | `alt="Performance Peak shadow icon"`         | Good, but `aria-hidden` means crawlers may ignore it. No action needed.                                                                                                                                                |

### Recommendation

1. Add meaningful, keyword-relevant `alt` text to service images where the image conveys information.
2. Keep decorative/atmospheric images as `alt=""` — this is correct practice.

---

## 6. ~~No `<h1>` on 404 Page~~ ✅ PARTIALLY RESOLVED

**Severity:** 🟡 Medium → partially fixed ✅

### Finding

The 404 page (`not-found.tsx`) ~~has no `<h1>` element. The `SplitHeroHeading` renders "Well this is awkward" using `<p>` and `<span>`.~~ now renders an `<h1>` via `SplitHeroHeading`. While 404 pages are not typically indexed, having a proper heading structure helps crawlers understand the page type and provides a better user experience.

Additionally, the 404 page has no `<meta name="robots" content="noindex">` directive, meaning it could theoretically be indexed.

### Recommendation

1. Add a `noindex` meta tag to the 404 page. _(Still outstanding.)_
2. ~~Add a proper `<h1>` for structural clarity.~~ ✅
3. Add a clear link back to the homepage. _(Still outstanding.)_

---

## 7. Sitemap — Dynamic `lastModified` Is Always "Today"

**Severity:** 🟡 Medium

### Finding

In `sitemap.ts`, `lastModified` is set to `new Date().toISOString()`. This means every time the sitemap is generated, all pages show today's date as their last modification — even if the content hasn't changed.

Search engines use `lastModified` as a crawl priority signal. If every page always says "modified today", the signal becomes meaningless and may be ignored by crawlers entirely.

### Recommendation

1. Use static or build-time dates for `lastModified` that reflect actual content changes.
2. Or remove `lastModified` entirely — crawlers will determine freshness independently.

---

## 8. Open Graph Image — Potential Mismatch

**Severity:** 🟡 Medium

### Finding

`layout.tsx` references `/og-image.png` as the default OG image, while `siteMetadata.ts` references `/og-image.jpg`. This could cause:

- A 404 when a social platform requests the OG image from the wrong URL.
- Inconsistent preview cards across platforms.

### Recommendation

1. Verify which file actually exists in `/public/`.
2. Align both files to reference the same image path and format.
3. Test with the Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector.

---

## 9. Internal Linking — Limited Anchor Text Diversity

**Severity:** 🟡 Medium

### Finding

The site's internal linking is minimal by design (single-page architecture):

- Homepage nav links: Home, About, Services, Contact (all hash anchors).
- Footer links: Home, About, Services, Contact Us, Privacy, Cookies, Terms.
- Legal pages link back via the logo (to `/`).

The anchor text is generic ("Home", "About", etc.) and there are no contextual in-content links between pages. This limits the semantic signals crawlers receive about page relationships and keyword relevance.

### Recommendation

1. Add contextual links within legal page content where relevant (e.g. the privacy policy mentioning cookies could link to `/cookies`).
2. If dedicated service pages are added in the future, cross-link between them.
3. Consider adding a "Back to homepage" or "Explore our services" link on legal pages.

---

## 10. Page Speed — Video Preloading Strategy

**Severity:** 🟡 Medium

### Finding

The hero sequence preloads video content from Cloudflare Stream. While the implementation is sophisticated (HD quality check, poster fallback, network-aware degradation), the initial page load involves:

1. Three large video files referenced in `config.ts` (though only one loads initially).
2. Poster images in multiple resolutions (WebP + JPEG).
3. Google Analytics script.
4. GSAP library.
5. Lottie-web library + JSON animation file.

Core Web Vitals (LCP, FID/INP, CLS) are a confirmed Google ranking factor. Heavy video loading could impact LCP on slower connections, though the poster fallback mitigates this.

### Recommendation

1. Monitor Core Web Vitals via Google Search Console and PageSpeed Insights.
2. Consider lazy-loading GSAP and Lottie libraries (they're client-side only, so dynamic imports would help).
3. Ensure the poster image is served from a CDN with proper cache headers for fast LCP.
4. If CLS is a concern, ensure all image/video containers have explicit aspect ratios.

---

## 11. Missing `hreflang` Tags

**Severity:** 🟢 Low

### Finding

The site targets a UK audience (`performancepeak.co.uk`) and the Organization schema lists `areaServed: "Global"`. If the site targets English-speaking users globally, an `hreflang="en-GB"` tag would help search engines understand the language/region targeting.

### Recommendation

Add `hreflang="en-GB"` to the `<html>` tag or as a `<link rel="alternate">` in the metadata. This is low priority unless the site plans to target multiple regions.

---

## 12. `robots.txt` — Permissive Configuration

**Severity:** 🟢 Low

### Finding

The `robots.txt` allows all user agents full access and explicitly allows `/images/`, `/videos/`, and `/hero/` paths. This is fine for a marketing site, but:

- `/api/contact` is crawlable (POST-only, so crawlers won't trigger it, but it's still discoverable).
- There is no `Disallow` for any path.

### Recommendation

Consider adding:

```
Disallow: /api/
```

This prevents crawlers from discovering API endpoints. The `POST` method won't be triggered by crawlers, but it's a defence-in-depth measure.

---

## 13. Social Media Profile Links — Unverified

**Severity:** 🟢 Low

### Finding

The Organization schema includes `sameAs` links to LinkedIn and Instagram:

```json
"sameAs": [
  "https://www.linkedin.com/company/performancepeak",
  "https://www.instagram.com/performancepeak"
]
```

### Recommendation

1. Verify these profiles exist and are active — broken `sameAs` links can negatively affect the Knowledge Graph.
2. Ensure the profile names match exactly (case-sensitive on some platforms).
3. Consider adding a Twitter/X profile if `@performancepeak` is claimed.

---

## 14. ~~Keyword Strategy — Title and Description Optimisation~~ ✅ PARTIALLY RESOLVED

**Severity:** 🟢 Low → partially fixed ✅

### Finding

The current title and description are:

- **Title:** "Digital Strategy & AI Consultancy | Performance Peak"
- **Description:** ~~"We help organisations work smarter with data, AI and thoughtful digital strategy. Practical advice, trusted partners, and technology that just works."~~ → ✅ Updated to: "Digital strategy, AI consultancy and hands-on build services. From insight and planning to websites, apps and ongoing optimisation — practical advice that helps organisations work smarter."
- **Keywords meta:** "performance marketing", "AI consultancy", "digital strategy", "data transformation", "Performance Peak"

The `<meta name="keywords">` tag is present but **ignored by Google** (officially deprecated since 2009). It does no harm but provides no value.

The title and description are well-crafted. Minor optimisation opportunities:

- The description is 145 characters — Google displays up to ~155, so there's room to add a call-to-action.
- "Performance Peak" appears at the end of the title — consider front-loading the brand if brand recognition is a priority.
- Consider including location signals if targeting UK-specific queries (e.g. "UK-based" or "London").

### Recommendation

1. Remove the `keywords` meta tag (or keep it — it's harmless).
2. A/B test title variations in Google Search Console.
3. Optionally add location signals to the description.

---

## Summary of Recommendations (Priority Order)

| Priority | Action                                                                                                          | Status                               |
| -------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 🔴 1     | Fix URL inconsistency — align sitemap.ts and robots.txt to use `www.performancepeak.co.uk`; set up 301 redirect | ✅ Done                              |
| 🟠 2     | Consider dedicated service subpages for keyword targeting (long-term content strategy)                          | Deferred                             |
| 🟠 3     | Add Service, BreadcrumbList, and more specific Organization schema types                                        | ✅ Done (BreadcrumbList outstanding) |
| 🟡 4     | Add `<h1>` to legal and 404 pages                                                                               | ✅ Done                              |
| 🟡 5     | Fix OG image path mismatch between layout.tsx and siteMetadata.ts                                               | Open                                 |
| 🟡 6     | Use static/actual dates for sitemap `lastModified`                                                              | Open                                 |
| 🟡 7     | Improve image `alt` text with descriptive, keyword-relevant content                                             | Open                                 |
| 🟡 8     | Add `noindex` meta tag to 404 page                                                                              | Open                                 |
| 🟡 9     | Add contextual internal links between pages                                                                     | Open                                 |
| 🟡 10    | Monitor Core Web Vitals; lazy-load heavy client-side libraries                                                  | Open                                 |
| 🟢 11    | Add `hreflang="en-GB"`                                                                                          | Open                                 |
| 🟢 12    | Add `Disallow: /api/` to robots.txt                                                                             | Open                                 |
| 🟢 13    | Verify social media profile links in Organization schema                                                        | Open                                 |
| 🟢 14    | ~~Remove deprecated `keywords` meta tag; optionally refine title/description~~ Meta description updated         | ✅ Done                              |
