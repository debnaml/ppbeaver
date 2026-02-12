# Improvement Opportunities

1. **Contact modal accessibility and bloat** _(completed)_
   - ✅ Modal now traps focus, restores the trigger button on close, and keeps scroll locked without visual changes.
   - ✅ Form validation + anti-bot logic live in `useContactForm`, while `ContactTrigger` lazy-loads the modal so other pages hydrate faster.
   - ✅ No change to styling or copy; the UX is identical while the bundle is smaller.

2. **HeroSequence monolith** _(completed)_
   - ✅ Moved `HERO_SETTINGS` and `VIDEO_SOURCES` into `hero/config.ts`, keeping constants typed and shareable.
   - ✅ Extracted every effect/state machine into `useHeroSequence`, so the component now only renders markup while logic lives in a dedicated hook.
   - ✅ Video refs, scroll locking, observers, and timers are encapsulated, making future tweaks safer without altering the visual treatment.

3. **Duplicated legal page layout**
   - Cookies, privacy, and terms pages repeat the same hero/content/contact structure with only data changes.
   - **Idea:** introduce a `LegalPageLayout` that accepts hero props and `contentSections`, so new policies only supply data and optional overrides.

4. **Scattered typography and inline styles**
   - Font stacks, letter spacing, and colors are hard-coded throughout `page.tsx` and legal pages, making copy edits require style knowledge.
   - **Idea:** consolidate recurrent styles into CSS utilities or Tailwind classes, using CSS variables for highlight colors to simplify maintenance.

5. **Structured data reuse**
   - Organization JSON-LD is defined inside `page.tsx` and injected via `dangerouslySetInnerHTML`, so other routes miss the schema and edits are error-prone.
   - **Idea:** move schema definitions into a shared helper and render via `next/script` so every route can import the same data.

6. **Form backend + resilience (open question)**
   - Contact form still simulates submission with a timeout and has no `/api/contact` endpoint or spam protection beyond the image puzzle.
   - **Idea:** plan a server action or API route plus real verification (e.g., Turnstile) so the UX stays the same but submissions are actionable.

7. **Hero degradation strategy (open question)**
   - Heavy video hero may impact low-power devices; currently only reduced-motion preference is checked.

- **Idea:** serve a static poster when `navigator.connection.saveData` or low bandwidth is detected, keeping visuals intact for high-end clients.
