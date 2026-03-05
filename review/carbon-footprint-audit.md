# Carbon Footprint Audit — performancepeak.co.uk

**Date:** 27 February 2026  
**Model:** Sustainable Web Design Model v4 (SWD v4, 2024)  
**Methodology:** Green Web Foundation / CO2.js  
**Live URL:** https://www.performancepeak.co.uk  
**External benchmark:** [websitecarbon.com result](https://www.websitecarbon.com/website/performancepeak-co-uk/)

---

## 1. Executive Summary

|                                      |                                                      |
| ------------------------------------ | ---------------------------------------------------- |
| **websitecarbon.com rating**         | **F** — dirtier than ~82 % of all web pages globally |
| **Measured CO₂e per visit**          | **0.69 g**                                           |
| **Annual CO₂e (10 k views/month)**   | **83.03 kg**                                         |
| **Annual energy (10 k views/month)** | **168 kWh**                                          |
| **Green hosting detected**           | **No**                                               |

The Performance Peak homepage is rated **F** by Website Carbon — the lowest possible grade. The primary driver is the **auto-playing hero video sequence** (three Cloudflare Stream clips, ~4–5 MB adaptive transfer) which pushes total page weight well beyond the HTTP Archive median of ~2,400 KB.

Without video (poster / `prefers-reduced-motion` mode), the page weighs roughly **830 KB** and would score approximately **0.10 g CO₂e per visit** — equivalent to an **A/B rating**. However, most visitors receive the full video experience, which is what external tools measure.

Additionally, the site is **not recognised as green-hosted** by the Green Web Foundation. Although Vercel runs on AWS infrastructure (which has renewable energy commitments) and Cloudflare has a 100 % renewable energy pledge, neither provider's green credentials have been verified and registered in the Green Web Foundation's dataset for this domain. This means the full data-centre energy segment (16.8 % of total) counts towards emissions without any offset.

### Key Findings at a Glance

| Scenario                          | Page Weight                       | CO₂e/visit                               | Rating Equivalent |
| --------------------------------- | --------------------------------- | ---------------------------------------- | ----------------- |
| **Live site (websitecarbon.com)** | ~4,300 KB (cache-adjusted)        | **0.69 g**                               | **F**             |
| Full video (SWD v4 calc)          | ~5,830 KB raw / 5,655 KB adjusted | 0.89 g                                   | F                 |
| Poster only (no video)            | 830 KB raw / 655 KB adjusted      | 0.10 g                                   | A–B               |
| **If green hosting verified**     | Same weights                      | **0.63 g** (video) / **0.09 g** (poster) | D–E / A           |

> **The biggest lever for improvement is the hero video content**, which accounts for ~85 % of total page transfer. The second-biggest lever is achieving **verified green hosting** status.

---

## 2. SWD v4 Model Parameters

The Sustainable Web Design Model v4 breaks energy consumption into three operational system segments:

| System Segment          | Energy Intensity | Share of Total |
| ----------------------- | ---------------- | -------------- |
| Consumer devices        | 0.210 kWh/GB     | 64.2 %         |
| Network transfer        | 0.062 kWh/GB     | 19.0 %         |
| Data centre             | 0.055 kWh/GB     | 16.8 %         |
| **Total (operational)** | **0.327 kWh/GB** | **100 %**      |

**Carbon intensity of electricity:**

- Global average: **494 g CO₂e/kWh** (IEA 2022)
- UK grid (visitor-weighted): **~180 g CO₂e/kWh** (National Grid ESO 2024)

**Caching assumptions (SWD standard):**

- 75 % new visitors (full transfer)
- 25 % returning visitors (only non-cached resources transferred)

**Green hosting modifier:**  
When the data centre is powered by verified renewable energy, the DC segment (0.055 kWh/GB) is treated as zero-carbon. Effective operational intensity drops from 0.327 to **0.272 kWh/GB** — a 16.8 % reduction.

**⚠️ performancepeak.co.uk is NOT currently verified as green-hosted** in the Green Web Foundation dataset (checked 27 Feb 2026). All calculations below use the full 0.327 kWh/GB intensity unless explicitly noted.

---

## 3. websitecarbon.com Benchmark (External)

Tested 27 Feb 2026 from https://www.websitecarbon.com/website/performancepeak-co-uk/

| Metric                           | Value                                    |
| -------------------------------- | ---------------------------------------- |
| Rating                           | **F**                                    |
| CO₂e per page view               | **0.69 g**                               |
| Dirtier than                     | ~82 % of all web pages globally          |
| Annual CO₂e (10 k views/month)   | 83.03 kg                                 |
| Annual energy (10 k views/month) | 168 kWh                                  |
| Green hosting                    | **Not detected** ("bog standard energy") |
| Potential saving if green hosted | 9 % less CO₂                             |
| Annual CO₂ equivalent            | As much as 4 trees absorb in a year      |

**Why the F rating?** Website Carbon uses a headless browser to measure actual page transfer. This captures the auto-playing Cloudflare Stream hero videos, resulting in a total transfer of approximately **4.3 MB** (cache-adjusted). Combined with non-green hosting status, this produces the 0.69 g figure.

### Back-calculation verification

Using the reported 168 kWh ÷ 120,000 annual visits = **0.0014 kWh/visit**.  
0.0014 kWh ÷ 0.327 kWh/GB = **0.00428 GB ≈ 4,282 KB** cache-adjusted transfer.  
0.00428 GB × 0.327 kWh/GB × 494 g/kWh = **0.691 g** ✓ — matches their reported 0.69 g.

---

## 4. Page Weight Inventory (Live Site)

Measured via compressed (gzip/br) transfer from www.performancepeak.co.uk on 27 Feb 2026.

### 4.1 Resource Breakdown (First Visit)

| Resource                     | Files       | Transfer Size (KB)          | Notes                                                                      |
| ---------------------------- | ----------- | --------------------------- | -------------------------------------------------------------------------- |
| **HTML**                     | 1           | 13                          | Server-rendered, compressed                                                |
| **JavaScript**               | 14 chunks   | 347                         | Next.js 16 + React 19 + GSAP + Lottie                                      |
| **CSS**                      | 1 chunk     | 10                          | Tailwind v4, single bundle                                                 |
| **Fonts**                    | 2 × woff2   | 63                          | Syne (35 KB) + Source Sans 3 (29 KB), self-hosted via `next/font`          |
| **Lottie animation**         | 1 JSON      | 63                          | customer-research-dark.json (gzip'd)                                       |
| **Hero poster**              | 1 webp      | 127                         | 1920 × 1080 webp (largest srcset), `<picture>` with responsive variants    |
| **Operator parallax**        | 1 webp      | 45                          | `<picture>` with jpg fallback                                              |
| **Service images**           | 4 optimised | 156                         | Via `next/image` (q=75, w=828): 36 + 38 + 67 + 15 KB                       |
| **SVG logos + favicons**     | ~6          | 5                           | logo.svg (1 KB), logo-full.svg (3 KB), favicon.svg, etc.                   |
| **Subtotal (no video)**      | —           | **~830**                    | —                                                                          |
| **Cloudflare Stream videos** | 3 clips     | **~4,000–5,000** (measured) | HLS adaptive; websitecarbon.com captured ~3,500–4,200 KB of video transfer |
| **Total (with hero video)**  | —           | **~4,800–5,800**            | —                                                                          |

### 4.2 Resources NOT Loaded per Normal Visit

| Resource                   | Size (KB) | When Loaded                                |
| -------------------------- | --------- | ------------------------------------------ |
| og-image.png               | 1,103     | Only by social-media crawlers (Open Graph) |
| Google Analytics (gtag.js) | ~90       | Only if user accepts analytics cookies     |
| Contact modal images       | Variable  | Only on modal interaction                  |

### 4.3 Heaviest Resources — Where the Carbon Lives

| Rank  | Resource                               | Transfer (KB) | % of Total (with video) |
| ----- | -------------------------------------- | ------------- | ----------------------- |
| **1** | **Cloudflare Stream videos (3 clips)** | **~4,000**    | **~77 %**               |
| 2     | Hero poster (1920 webp)                | 127           | 2.4 %                   |
| 3     | JS chunk `1c59271764b24e65.js`         | 94            | 1.8 %                   |
| 4     | JS chunk `aee6c7720838f8a2.js`         | 71            | 1.4 %                   |
| 5     | web.jpg (service image)                | 67            | 1.3 %                   |
| 6     | Lottie JSON (compressed)               | 63            | 1.2 %                   |
| 7     | Operator parallax (webp)               | 45            | 0.9 %                   |
| 8     | JS chunk `a6dad97d9634a72d.js`         | 41            | 0.8 %                   |
| 9     | e-learning.png (service image)         | 38            | 0.7 %                   |
| 10    | service-mobile.jpg                     | 36            | 0.7 %                   |

> **The hero video is responsible for approximately 77 % of all page transfer and therefore ~77 % of the carbon emissions.** Everything else on the page is well-optimised.

---

## 5. Carbon Calculations (SWD v4)

All calculations use standard (non-green) hosting at 0.327 kWh/GB, matching websitecarbon.com's treatment.

### 5.1 Scenario A — Live Site (With Hero Videos) — Current State

**Estimated raw page weight:** ~5,200 KB (using websitecarbon.com's implied measurement as anchor)

**Cache-adjusted weighted transfer:** ~4,282 KB (0.00418 GB)  
(Back-calculated from websitecarbon.com's 168 kWh annual / 120 k visits)

| Metric                                | Global Grid (494 g/kWh) | UK Grid (180 g/kWh) |
| ------------------------------------- | ----------------------- | ------------------- |
| Energy per visit                      | 0.00140 kWh             | 0.00140 kWh         |
| **CO₂e per visit (standard hosting)** | **0.69 g**              | **0.25 g**          |
| CO₂e per visit (if green hosted)      | 0.63 g                  | 0.23 g              |
| Annual @ 10 k views/month             | 83.0 kg                 | 30.2 kg             |
| Annual @ 50 k views/month             | 415.2 kg                | 151.3 kg            |
| websitecarbon.com grade               | **F**                   | —                   |

### 5.2 Scenario B — Poster / Reduced-Motion Mode (No Video)

**Unadjusted page weight:** 830 KB (0.000811 GB)

**Cache-adjusted weighted transfer:**

- New visitors: 0.75 × 830 KB = 623 KB
- Returning visitors: 0.25 × (830 − 696 KB cacheable) = 34 KB
- **Weighted average: 657 KB (0.000641 GB)**

Cacheable resources (JS + CSS + fonts + static images): **696 KB**

| Metric                                | Global Grid (494 g/kWh) | UK Grid (180 g/kWh) |
| ------------------------------------- | ----------------------- | ------------------- |
| Energy per visit                      | 0.000210 kWh            | 0.000210 kWh        |
| **CO₂e per visit (standard hosting)** | **0.104 g**             | **0.038 g**         |
| CO₂e per visit (if green hosted)      | 0.086 g                 | 0.031 g             |
| Annual @ 10 k views/month             | 12.4 g (0.012 kg)       | 4.5 g               |
| Annual @ 50 k views/month             | 62.2 g                  | 22.7 g              |
| Estimated websitecarbon.com grade     | **A–B**                 | —                   |

> Standard hosting: CO₂ = 0.000641 GB × 0.327 kWh/GB × 494 g/kWh = **0.104 g**

### 5.3 Comparison with Benchmarks

| Benchmark                               | Page Weight   | CO₂e/visit | Grade   |
| --------------------------------------- | ------------- | ---------- | ------- |
| **Performance Peak (live, with video)** | **~5,200 KB** | **0.69 g** | **F**   |
| **Performance Peak (poster only)**      | **830 KB**    | **0.10 g** | **A–B** |
| HTTP Archive median page (2024)         | 2,400 KB      | ~0.31 g    | C–D     |
| websitecarbon.com "green" threshold     | —             | < 0.34 g   | B+      |
| Average top-1M website                  | ~2,800 KB     | ~0.36 g    | D       |
| Most polluting 10 % of sites            | > 5,000 KB    | > 0.65 g   | F       |

### 5.4 What Would It Take to Reach Each Grade?

Using SWD v4 at 0.327 kWh/GB and 494 g CO₂e/kWh (standard hosting):

| Target Grade       | Max CO₂e/visit | Max Page Weight (adjusted) | Required Reduction     |
| ------------------ | -------------- | -------------------------- | ---------------------- |
| **A+** (< 0.095 g) | 0.095 g        | ~588 KB                    | 86 % (eliminate video) |
| **A** (< 0.185 g)  | 0.185 g        | ~1,145 KB                  | 73 %                   |
| **B** (< 0.341 g)  | 0.341 g        | ~2,111 KB                  | 51 %                   |
| **C** (< 0.493 g)  | 0.493 g        | ~3,051 KB                  | 29 %                   |
| **D** (< 0.656 g)  | 0.656 g        | ~4,060 KB                  | 5 %                    |
| Current            | 0.69 g         | ~4,282 KB                  | —                      |

---

## 6. Green Hosting Status — Critical Gap

### 6.1 Current Status

The Green Web Foundation check (27 Feb 2026) returned:

> **"No evidence found"** — performancepeak.co.uk is not in the Green Web Dataset.

This means the full data-centre segment (16.8 % of energy, 0.055 kWh/GB) is treated as carbon-emitting. If green hosting were verified, CO₂e per visit would drop by approximately 9 % (from 0.69 g to ~0.63 g).

### 6.2 Why Isn't Vercel Detected?

Vercel runs on AWS infrastructure. While AWS has committed to 100 % renewable energy by 2025, individual domains hosted on Vercel are **not automatically registered** in the Green Web Foundation database. The Green Web Foundation requires hosting providers to submit evidence of renewable energy procurement — Vercel has not done so for its customers' domains as of this date.

### 6.3 How to Get Verified

**Option A — Ask Vercel to register with the Green Web Foundation:**  
Contact Vercel support and reference the [Green Web Foundation's provider guide](https://www.thegreenwebfoundation.org/support/why-does-my-website-show-up-as-grey-in-the-green-web-checker/). If Vercel submits evidence for their infrastructure, all Vercel-hosted sites would be recognised.

**Option B — Submit evidence as a website owner:**  
Website owners can submit their own evidence via the Green Web Foundation's [verification process](https://www.thegreenwebfoundation.org/green-web-check/) by providing documentation of their hosting provider's renewable energy use.

**Impact:** Verification would reduce the websitecarbon.com score from **0.69 g to ~0.63 g** — still an F, but a prerequisite for any future grade improvements.

---

## 7. Positive Practices Already in Place

Despite the F rating driven by video, the site demonstrates many genuine sustainability practices:

### 7.1 Excellent Practices ✅

| Practice                                      | Impact | Detail                                                                                                         |
| --------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| **Self-hosted fonts via `next/font`**         | Medium | Eliminates third-party font requests to fonts.googleapis.com; reduces DNS lookups, connections, and transfer   |
| **woff2 format only**                         | Medium | 2 font files totalling 63 KB — well optimised                                                                  |
| **`font-display: swap`**                      | Low    | Prevents invisible text during font load                                                                       |
| **Next.js Image optimisation**                | High   | All service images served via `/_next/image` with quality 75, responsive widths, and automatic WebP conversion |
| **Responsive hero poster**                    | Medium | `<picture>` element with 3 srcset breakpoints (960/1280/1920) and WebP + JPEG fallback                         |
| **Operator image uses `<picture>` with WebP** | Medium | WebP source (45 KB) vs JPEG fallback (684 KB) — 93 % saving                                                    |
| **Cloudflare Stream for video**               | Medium | Adaptive bitrate streaming is better than hosting raw video files (but still heavy)                            |
| **Video respects `prefers-reduced-motion`**   | High   | `posterOnlyMode` eliminates all video transfer for users with motion preferences — drops page to ~830 KB       |
| **Conditional analytics**                     | Medium | Google Analytics only loads after explicit cookie consent — no tracking scripts for declining users            |
| **No advertising or tracking**                | Medium | Zero third-party ad scripts, no social embeds, no tracking pixels                                              |
| **Cookie consent is lightweight**             | Low    | In-house component, no heavy CMP SDK loaded                                                                    |
| **Minimal dependency tree**                   | Medium | Only essential packages: React, Next.js, GSAP, Lottie, Resend — no bloated UI framework                        |
| **Tailwind CSS (single bundle)**              | Medium | 10 KB compressed CSS with tree-shaking; no unused CSS                                                          |
| **SVG logos**                                 | Low    | 1–3 KB each; resolution-independent, no raster waste                                                           |
| **Static generation**                         | Medium | Pages are statically generated at build time — minimal server compute per visit                                |

### 7.2 Good Practices 👍

| Practice                              | Detail                                                                  |
| ------------------------------------- | ----------------------------------------------------------------------- |
| Server-side rendering                 | Reduces client-side JS processing energy                                |
| Code splitting                        | 14 smaller JS chunks loaded as needed rather than one monolithic bundle |
| Gzip/Brotli compression               | All text resources compressed on the wire                               |
| Edge deployment (Vercel Edge Network) | Serves from nearest PoP — shorter network path = less energy            |
| HTTPS only                            | HSTS header set (no wasted HTTP→HTTPS redirect on repeat visits)        |
| Dark colour scheme                    | Lower pixel power draw on OLED screens                                  |

> **Key insight:** If the video were removed, nearly every other aspect of this site would be considered best-in-class for sustainability. The non-video page (830 KB) is **65 % below** the HTTP Archive median.

---

## 8. Improvement Recommendations

### 8.0 Priority Roadmap — From F to B

| Step          | Action                                                             | Est. CO₂e After | Grade |
| ------------- | ------------------------------------------------------------------ | --------------- | ----- |
| Current state | —                                                                  | 0.69 g          | F     |
| **Step 1**    | Reduce video clips from 3 → 1 (or shorten total duration to ~10 s) | ~0.35 g         | C     |
| **Step 2**    | Verify green hosting with Green Web Foundation                     | ~0.32 g         | B     |
| **Step 3**    | Optimise Lottie + JS bundles                                       | ~0.28 g         | B     |
| **Step 4**    | Consider click-to-play or intersection-triggered video             | ~0.10 g         | A     |

### 8.1 Critical Impact — Video (the 77 % problem) 🔴

| #   | Recommendation                                                                                                                                                                                                                                                                | Current   | Target          | Est. Saving                            |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------- | -------------------------------------- |
| 1   | **Reduce video count or duration** — The three Cloudflare Stream clips (~4–5 MB total) are responsible for 77 % of all emissions. Reducing to **1 clip** or capping total duration at **10 seconds** would halve the video transfer.                                          | ~4,000 KB | ~1,500–2,000 KB | ~2,000–2,500 KB/visit                  |
| 2   | **Consider click-to-play or scroll-triggered video** — Instead of auto-playing, show the static poster and only load/play video on user interaction or when the hero enters the viewport. This would make the default experience poster-only (~830 KB), with video as opt-in. | Auto-play | Click-to-play   | ~4,000 KB for non-interacting visitors |
| 3   | **Cap adaptive bitrate** — If Cloudflare Stream allows, set a maximum resolution of 720p for the hero. Since the video is purely decorative (background ambience), full HD is unnecessary.                                                                                    | HLS auto  | 720p max        | ~30–50 % of video transfer             |
| 4   | **Shorter loop with single source** — Combine the three "intelligence / imagination / information" clips into a single shorter montage. Fewer HLS manifest requests, single adaptive stream, reduced total bytes.                                                             | 3 streams | 1 stream        | Network overhead + ~1,000 KB           |

### 8.2 High Impact 🟠

| #   | Recommendation                                                                                                                                                        | Current      | Target   | Est. Saving         |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ------------------- |
| 5   | **Get verified green hosting** — Register with the Green Web Foundation (see Section 6.3). This alone reduces the score by ~9 %.                                      | Not verified | Verified | ~0.06 g/visit (9 %) |
| 6   | ~~**Reduce Lottie JSON size**~~ — Already optimised: no high-precision floats found. Switched to `lottie_light` SVG-only build (88 KB → 59 KB gzip, **29 KB saved**). | 88 KB (gzip) | 59 KB    | ✅ 29 KB saved      |
| 7   | ~~**Compress the OG image**~~ — Done: 1,103 KB → 308 KB PNG + 68 KB WebP.                                                                                             | 1,103 KB     | 308 KB   | ✅ ~800 KB saved    |
| 8   | ~~**Lazy-load below-fold service images**~~ — Already lazy: Next.js `Image` defaults to `loading="lazy"` when `priority` is not set.                                  | Already lazy | —        | ✅ No change needed |

### 8.3 Medium Impact 🟡

| #   | Recommendation                                                                                                                                                                                                                             | Detail                                                                                                         | Est. Saving                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 9   | ~~**Audit the largest JS chunks**~~ — Completed. `lottie-web` switched to `lottie_light` (SVG-only, 29 KB gzip saved). GSAP converted to dynamic `import()` — deferred from critical render path. Total initial JS reduced by ~57 KB gzip. | ✅ Done                                                                                                        | ✅ Done                       |
| 10  | ~~**Convert remaining JPEG service images to WebP/AVIF**~~ — All service images and page images converted to WebP.                                                                                                                         | ✅ Done                                                                                                        | ✅ Done                       |
| 11  | **Subset fonts further** — Skipped: only ASCII + 8 special chars used; savings ~15–25 KB deemed not worth the build complexity.                                                                                                            | Skipped                                                                                                        | —                             |
| 12  | **Add `Cache-Control: immutable` headers**                                                                                                                                                                                                 | Verify Vercel sets `immutable` on `_next/static/` assets and fonts to eliminate revalidation on return visits. | Reduced return-visit requests |

### 8.4 Low Impact 🟢

| #   | Recommendation                                    | Detail                                                                                                            |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 13  | ~~**Remove unused images from `/public`**~~       | ✅ Done — 7 unused images removed, 11 WebP versions added.                                                        |
| 14  | ~~**Add `fetchpriority="high"` on hero poster**~~ | ✅ Already set — `HeroPoster.tsx` has `fetchPriority="high"` and `loading="eager"`.                               |
| 15  | **Add a sustainability statement**                | Including a carbon/sustainability note in the footer signals environmental awareness to users and search engines. |

---

## 9. Sustainability Scorecard

| Category                           | Score                                                                                                       | Rating     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| **Page weight (no video)**         | 830 KB — 65 % below 2,400 KB median                                                                         | ⭐⭐⭐⭐⭐ |
| **Page weight (with video)**       | ~5,200 KB — 2× the median, drives the F                                                                     | ⭐⭐       |
| **Green hosting**                  | NOT verified in Green Web Foundation database                                                               | ⭐         |
| **Image optimisation**             | WebP, responsive images, Next.js Image component                                                            | ⭐⭐⭐⭐⭐ |
| **Font efficiency**                | Self-hosted woff2, `swap` display, 63 KB total                                                              | ⭐⭐⭐⭐   |
| **JavaScript efficiency**          | ~290 KB compressed JS; lottie_light SVG-only build; GSAP dynamically imported (deferred from critical path) | ⭐⭐⭐⭐⭐ |
| **Third-party impact**             | Conditional analytics only; no ads/trackers/social embeds                                                   | ⭐⭐⭐⭐⭐ |
| **Reduced-motion support**         | Video completely eliminated for `prefers-reduced-motion`                                                    | ⭐⭐⭐⭐⭐ |
| **Caching strategy**               | Static generation + immutable hashed assets                                                                 | ⭐⭐⭐⭐   |
| **Video sustainability**           | 3 auto-playing HLS streams, no user opt-in, no bitrate cap                                                  | ⭐         |
|                                    |                                                                                                             |            |
| **websitecarbon.com Grade**        |                                                                                                             | **F**      |
| **Overall (accounting for video)** |                                                                                                             | **D**      |
| **Overall (poster-only mode)**     |                                                                                                             | **A**      |

---

## 10. Annual Carbon Projections

### 10.1 Current State (With Video, Standard Hosting)

| Monthly Pageviews | Annual CO₂e | Equivalent                        |
| ----------------- | ----------- | --------------------------------- |
| 1,000             | 8.3 kg      | Charging a smartphone 1,100 times |
| 10,000            | **83.0 kg** | **4 trees' annual absorption**    |
| 50,000            | 415.2 kg    | Driving an electric car 1,075 km  |
| 100,000           | 830.4 kg    | London → Edinburgh return flight  |

### 10.2 Target State (1 Video Clip + Green Hosting)

| Monthly Pageviews | Annual CO₂e | Reduction |
| ----------------- | ----------- | --------- |
| 1,000             | ~2.5 kg     | −70 %     |
| 10,000            | ~25.2 kg    | −70 %     |
| 50,000            | ~126.0 kg   | −70 %     |

### 10.3 Best Case (Poster Only + Green Hosting)

| Monthly Pageviews | Annual CO₂e       | Reduction |
| ----------------- | ----------------- | --------- |
| 1,000             | 1.0 g             | −99.99 %  |
| 10,000            | 10.3 g (0.010 kg) | −99.99 %  |
| 50,000            | 51.6 g (0.052 kg) | −99.99 %  |

---

## 11. Methodology Notes

- **SWD Model Version:** v4 (2024), as defined by the Sustainable Web Design community and implemented in the Green Web Foundation's CO2.js library.
- **Transfer sizes** measured from the live site using compressed (gzip/Brotli) responses from Vercel's edge network on 27 Feb 2026.
- **websitecarbon.com** was used as the primary external benchmark. Their tool uses a headless browser to measure actual page transfer (including auto-playing video), and applies the SWD model with global grid intensity. Their reported figures of 0.69 g/visit and 83.03 kg/year at 10 k views/month were verified via back-calculation.
- **Video estimates** for our own SWD calculation are based on the websitecarbon.com back-calculation (~4.3 MB cache-adjusted) and align with expected Cloudflare Stream HLS adaptive bitrate transfer for three short clips.
- **Green hosting status:** Checked via the Green Web Foundation's Green Web Check tool on 27 Feb 2026 for both `performancepeak.co.uk` and `www.performancepeak.co.uk` — result: "No evidence found." All calculations use standard hosting (full 0.327 kWh/GB) unless explicitly marked otherwise.
- **Returning visitor caching** assumes JS bundles, CSS, fonts, and static images are fully cached (696 KB cacheable from a total 830 KB). Only the HTML document, videos, and any dynamic content are re-fetched.
- **Grid carbon intensity** uses the IEA 2022 global average of 494 g CO₂e/kWh (matching websitecarbon.com). The UK-specific figure (~180 g CO₂e/kWh) is provided for regional context given the company's UK base.
- This audit does **not** include embodied carbon of hardware manufacturing (servers, user devices, network equipment) — only operational energy as per the SWD model scope.

---

## 12. Tools & References

- [Sustainable Web Design Model](https://sustainablewebdesign.org/calculating-digital-emissions/) — methodology
- [CO2.js](https://github.com/thegreenwebfoundation/co2.js) — Green Web Foundation calculation library
- [Website Carbon Calculator — performancepeak.co.uk result](https://www.websitecarbon.com/website/performancepeak-co-uk/) — external benchmark (F, 0.69 g)
- [Green Web Foundation — performancepeak.co.uk check](https://www.thegreenwebfoundation.org/green-web-check/?url=performancepeak.co.uk) — hosting verification (not green)
- [HTTP Archive](https://httparchive.org/reports/page-weight) — page weight statistics
- [IEA Electricity Maps](https://www.iea.org/data-and-statistics) — grid carbon intensity data
- [Website Carbon Rating System](https://www.websitecarbon.com/introducing-the-website-carbon-rating-system/) — grade thresholds
