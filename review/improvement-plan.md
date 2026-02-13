# Improvement Opportunities

1. **Contact modal accessibility and bloat** _(completed)_
   - ✅ Modal now traps focus, restores the trigger button on close, and keeps scroll locked without visual changes.
   - ✅ Form validation + anti-bot logic live in `useContactForm`, while `ContactTrigger` lazy-loads the modal so other pages hydrate faster.
   - ✅ No change to styling or copy; the UX is identical while the bundle is smaller.

2. **HeroSequence monolith** _(completed)_
   - ✅ Moved `HERO_SETTINGS` and `VIDEO_SOURCES` into `hero/config.ts`, keeping constants typed and shareable.
   - ✅ Extracted every effect/state machine into `useHeroSequence`, so the component now only renders markup while logic lives in a dedicated hook.
   - ✅ Video refs, scroll locking, observers, and timers are encapsulated, making future tweaks safer without altering the visual treatment.

3. **Duplicated legal page layout** _(completed)_
   - ✅ Added `LegalPageLayout` that wraps the hero, content sections, contact CTA, and footer.
   - ✅ Cookies, letsprivacy, and terms pages now pass data objects to the shared layout, keeping visuals synced and future edits data-only.

4. **Scattered typography and inline styles** _(completed)_
   - ✅ Centralized heading/body font stacks as CSS utility classes, so components opt-in via `font-heading`/`font-body` without duplicating fallbacks.
   - ✅ Replaced ad-hoc inline typography styles across the homepage, hero chrome, operators, orbit showcase, and legal layout with Tailwind utilities (tracking, fluid sizes) to keep visuals identical while improving maintainability.

5. **Structured data reuse** _(completed)_
   - ✅ Extracted the organization JSON-LD into `src/lib/structuredData.ts`, so every route can import the same canonical schema object.
   - ✅ `page.tsx` now renders the schema via `next/script` with `beforeInteractive` strategy for best performance while removing raw `dangerouslySetInnerHTML` usage.

6. **Form backend + resilience (open question)**
   - Contact form still simulates submission with a timeout and has no `/api/contact` endpoint or spam protection beyond the image puzzle.
   - **Idea:** plan a server action or API route plus real verification (e.g., Turnstile) so the UX stays the same but submissions are actionable.

7. **Hero degradation strategy** _(completed)_
   - ✅ Added `HeroPoster` plus responsive `frame-{size}.(webp|jpg)` sources so the hero can swap to a static image without visual drift.
   - ✅ `useHeroSequence` now respects `prefers-reduced-motion`, `saveData`, slow connection types, and post-loop freezes to keep the poster visible and skip video decoding.
   - ✅ CTA timing, keyword transitions, and overlays remain in sync whether the hero is video-driven or poster-only, so users still see the full narrative even in low-motion contexts.
   - ✅ Returning visitors land directly on the poster with a "Play hero again" control, thanks to a persisted preference that avoids reloading the videos unless requested.
