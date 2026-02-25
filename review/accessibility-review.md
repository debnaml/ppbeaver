# Accessibility Review — Performance Peak

**Date:** 25 February 2026  
**Scope:** WCAG 2.2 Level AA static code audit of all pages and components  
**Severity scale:** 🔴 Critical (Level A fail) · 🟠 High (Level AA fail) · 🟡 Medium (best practice) · 🟢 Low / Informational

---

## Executive Summary

The site demonstrates strong accessibility awareness — a skip link, hidden navigation, `aria-label` attributes, `aria-live` regions, focus trapping in the modal, `prefers-reduced-motion` support, and screen-reader-only headings are all present. These are the hallmarks of a team that has considered accessibility from the outset.

However, several WCAG 2.2 conformance gaps remain, primarily around colour contrast, focus visibility on custom elements, missing form error announcements, and keyboard operability of the services showcase interaction.

---

## Positive Findings (No Action Needed)

These are worth preserving and should not regress:

- ✅ **Skip link** — present on the homepage, styled with `:focus-visible` reveal.
- ✅ **`lang="en"`** on `<html>` (WCAG 3.1.1).
- ✅ **Screen-reader-only `<h1>`** with descriptive page title.
- ✅ **Hidden primary navigation** — provides assistive technology with route links.
- ✅ **`aria-label="Primary navigation"` and `aria-label="Footer navigation"`** on navs.
- ✅ **`aria-live="polite"`** on the hero headline overlay.
- ✅ **Modal focus trapping** — `ContactModal` traps focus, restores it on close, handles Escape key.
- ✅ **`prefers-reduced-motion` support** — hero sequence, GSAP animations, CSS animations all respect the media query.
- ✅ **`font-display: swap`** for web fonts.
- ✅ **Honeypot field hidden from assistive technology** with `aria-hidden`, `tabIndex={-1}`.
- ✅ **Decorative images** correctly use `aria-hidden` or `role="presentation"`.

---

## 1. Colour Contrast — Text on Translucent Backgrounds

**Severity:** 🟠 High (WCAG 1.4.3 — Contrast Minimum, Level AA)

### Finding

Several text/background combinations are at risk of failing the 4.5:1 contrast ratio for normal text:

| Location                 | Text Colour                            | Background                                | Concern                                                                                        |
| ------------------------ | -------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Hero headline overlay    | `var(--color-cream)` (#fcf7e9)         | Semi-transparent overlay over video/image | Contrast depends entirely on the underlying video frame — can drop below 4.5:1 on light scenes |
| Contact form labels      | `text-white/80` (rgba 255,255,255,0.8) | `bg-white/5` on `--color-ink` (#0b0d18)   | Likely passes, but the 80% opacity reduces the effective contrast                              |
| Form error messages      | `#FF9B9B`                              | Dark modal background                     | Pink on dark can be borderline — needs verification                                            |
| Footer legal text        | `text-white/90`                        | `#13C390` (bright green)                  | White on mid-green may fail for small text                                                     |
| Orbit detail grid        | `text-white/80`                        | `#2D829B` (ocean blue)                    | 80% white on teal needs measurement                                                            |
| Cookie/privacy body text | `text-white/80`                        | `#2D829B`                                 | Same as above                                                                                  |
| "Prefer email?" text     | `text-white/60`                        | Dark background                           | 60% opacity white is very likely to fail                                                       |

### Recommendation

1. Audit all text/background pairs with a contrast checker (e.g. WebAIM Contrast Checker or the Chrome DevTools audit).
2. Increase text opacity where needed — `text-white/80` should generally be `text-white/90` or `text-white` for body text.
3. The `text-white/60` on the "Prefer email?" label in `ContactTrigger.tsx` is almost certainly below 4.5:1 and should be raised.
4. For text over video, ensure the overlay opacity is high enough to guarantee contrast in all frames, or add a solid fallback behind the text.

---

## 2. Focus Visibility on Custom Interactive Elements

**Severity:** 🟠 High (WCAG 2.4.7 — Focus Visible, Level AA)

### Finding

Several custom buttons and interactive elements lack visible focus indicators:

| Element                    | File                  | Issue                                                                    |
| -------------------------- | --------------------- | ------------------------------------------------------------------------ |
| Service category buttons   | `OrbitShowcase.tsx`   | No `:focus-visible` outline or ring — only `hover` and colour transition |
| Verification image buttons | `ContactModal.tsx`    | `aria-pressed` is set, but no focus ring style is defined                |
| "Go back" button           | `ContactModal.tsx`    | No focus ring                                                            |
| Logo mark button           | `LogoMaskOverlay.tsx` | No visible focus indicator                                               |
| "Play hero again" button   | `HeroSequence.tsx`    | `hover:bg-white/10` but no focus style                                   |
| "Find Out More" peel CTA   | `PeelCTA.tsx`         | No focus ring                                                            |

The CTA circle buttons and `.pp-button` class do have `:focus-visible` styles in `globals.css` for the arrow animation, but not for a visible outline/ring.

### Recommendation

Add a consistent focus ring to all interactive elements. A utility class approach works well:

```css
:focus-visible {
  outline: 2px solid var(--color-highlight);
  outline-offset: 2px;
}
```

Or use Tailwind's `focus-visible:ring-2 focus-visible:ring-[var(--color-highlight)]` on each button.

---

## 3. Contact Modal — Form Error Announcements

**Severity:** 🟠 High (WCAG 3.3.1 — Error Identification, Level A)

### Finding

When form validation fails, error messages appear visually (`{errors.name && <p>...</p>}`) but are not announced to screen readers. There is no `role="alert"`, `aria-live`, or `aria-describedby` linking error messages to their fields.

### Recommendation

1. Add `aria-describedby` to each form field pointing to its error message element.
2. Wrap error messages in `<p role="alert">` so they are announced when they appear.
3. Add an `aria-invalid={true}` attribute to fields that have errors.
4. On submission failure, move focus to the first invalid field or to an error summary.

Example:

```tsx
<input id="contact-name" aria-describedby="contact-name-error" aria-invalid={!!errors.name} ... />
{errors.name && <p id="contact-name-error" role="alert" className="text-sm text-[#FF9B9B]">{errors.name}</p>}
```

---

## 4. Missing Landmark Structures on Legal Pages

**Severity:** 🟡 Medium (WCAG 1.3.1 — Info and Relationships, Level A)

### Finding

The legal pages (`LegalPageLayout.tsx`) use `<main>`, `<section>`, and `<footer>` elements, which is good. However:

- There is no `<header>` landmark wrapping the hero chrome/logo area.
- The `<nav>` in the footer is properly labelled, but the legal pages have no page-level `<nav>` for assistive technology users to navigate back to the homepage (unlike the main page which has the hidden nav).
- Content sections use `<article>` elements, which is semantically appropriate.

### Recommendation

1. Add a visually-hidden navigation to legal pages (similar to the homepage's hidden nav).
2. Wrap the hero chrome area in a `<header>` element for landmark navigation.

---

## 5. Heading Hierarchy Issues

**Severity:** 🟡 Medium (WCAG 1.3.1 — Info and Relationships, Level A)

### Finding

| Page        | Issue                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage    | `<h1>` (sr-only) → `<h2>` (sr-only in HeroSequence) → `<h2>` (About) → `<h2>` (sr-only in OperatorParallax) → **`<h3>`** (OrbitShowcase intro) → **`<h4>`** (service titles) → `<h2>` (Contact). The jump from `<h2>` to `<h3>` to `<h4>` within the services section creates a nested structure that may confuse screen readers expecting a flat or properly nested outline. |
| Legal pages | No `<h1>` — the heading uses `<p>` and `<span>` in `SplitHeroHeading.tsx`. Content sections correctly use `<h2>`.                                                                                                                                                                                                                                                             |
| 404 page    | Same as legal — no `<h1>`.                                                                                                                                                                                                                                                                                                                                                    |

### Recommendation

1. Add an `<h1>` to legal and 404 pages (can be `sr-only` if the visual design uses the `SplitHeroHeading` component).
2. Consider flattening the OrbitShowcase heading hierarchy: the intro could be `<h2>` and service titles `<h3>`.

---

## 6. Keyboard Operability — OrbitShowcase Service Navigation

**Severity:** 🟡 Medium (WCAG 2.1.1 — Keyboard, Level A)

### Finding

The desktop service category navigation in `OrbitShowcase.tsx` uses `onMouseEnter` and `onFocus` to switch the active service. The `onClick` handler scrolls to the service panel. This is partially keyboard-accessible (Tab + focus triggers the switch), but:

- There is no arrow key navigation between service items (recommended for tab-like interfaces).
- The `aria-controls` and `aria-expanded` attributes are present ✅, but there is no `role="tablist"` / `role="tab"` / `role="tabpanel"` structure to communicate the pattern to assistive technology.

### Recommendation

Either:

- **Adopt the ARIA tabs pattern** (`role="tablist"`, `role="tab"`, `role="tabpanel"`, arrow key navigation), or
- **Ensure the current button-based approach is fully keyboard-navigable** with clear focus indicators and `aria-expanded` announcements.

---

## 7. Contact Modal — Missing Announced Title

**Severity:** 🟡 Medium (WCAG 4.1.2 — Name, Role, Value, Level A)

### Finding

The modal has `aria-labelledby="contact-modal-title"` pointing to an `<h3 className="sr-only">Contact Performance Peak</h3>`. This is correct. However, when the step changes from "form" to "verify", the visible context changes dramatically (from form fields to image selection) but the modal title remains the same. Screen reader users may not understand the context shift.

### Recommendation

Add a step-specific `aria-live` announcement or update the sr-only title when the step changes, e.g. "Contact Performance Peak — Verify you're human".

---

## 8. Images — Incomplete `alt` Text Coverage

**Severity:** 🟡 Medium (WCAG 1.1.1 — Non-text Content, Level A)

### Finding

Most images are handled correctly, but:

| Image                             | File                   | Issue                                                                                                                                                                                                                    |
| --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Service images in `OrbitShowcase` | `OrbitShowcase.tsx`    | `alt` falls back to `image.caption` (e.g. "Customer research", "Product design") which is descriptive enough. However, some `alt` values are reused (e.g. two images share "eLearning & training" as their caption/alt). |
| Operator parallax image           | `OperatorParallax.tsx` | `alt=""` with `role="presentation"` ✅ (decorative image, correct treatment).                                                                                                                                            |
| Footer logos                      | `Footer.tsx`           | Desktop decorative logo uses `aria-hidden` ✅. Mobile logo has `alt="Performance Peak"` ✅.                                                                                                                              |
| Verification images               | `ContactModal.tsx`     | `alt` attributes are descriptive ✅.                                                                                                                                                                                     |

### Recommendation

1. Ensure each service image has a unique, descriptive `alt` attribute (avoid duplicating captions when images differ).
2. Review `build-2` image which has caption "eLearning & training" but `highlightDetail` "Web and mobile apps" — the alt should reflect what the image actually shows.

---

## 9. Touch Target Size

**Severity:** 🟡 Medium (WCAG 2.5.8 — Target Size Minimum, Level AA — new in WCAG 2.2)

### Finding

WCAG 2.2 requires interactive targets to be at least 24×24 CSS pixels (Level AA). Most buttons in the design appear large enough, but:

- Footer navigation links have no explicit padding and rely on text size alone — touch targets may be < 24px tall on mobile.
- The verification image select buttons in the modal are large ✅.
- The CTA circle button is 80×80 / 96×96 ✅.

### Recommendation

Add sufficient padding to footer navigation links to ensure at least 44×44 CSS px touch targets (the AAA recommendation) or at minimum 24×24 CSS px for AA.

---

## 10. `aria-hidden` vs `aria-hidden="true"`

**Severity:** 🟢 Low

### Finding

Several elements use the shorthand `aria-hidden` (without `="true"`):

```tsx
<div aria-hidden>
```

In JSX, `aria-hidden` without a value evaluates to `aria-hidden=""` which is technically truthy but not spec-standard. The explicit `aria-hidden="true"` is preferred for clarity and cross-browser/AT consistency.

### Recommendation

Use `aria-hidden="true"` explicitly throughout the codebase. A search-and-replace would catch these.

---

## 11. Scrolling Behaviour — Scroll Lock During Hero Load

**Severity:** 🟢 Low

### Finding

`useHeroSequence.ts` locks scrolling (`html.style.overflow = "hidden"`) while the hero video loads, with a failsafe timeout of 4.5 seconds. If the video fails to load (e.g. network error), users may be unable to scroll for up to 4.5 seconds.

While this is mitigated by the `preferStaticPoster` path (slow connections, reduced motion, localStorage preference), a full scroll lock can be disorienting for users, particularly those using assistive technology.

### Recommendation

1. Consider reducing the failsafe timeout.
2. Ensure the scroll lock is released immediately if the poster fallback activates.
3. Add an `aria-busy="true"` to the hero section while loading to communicate the state to assistive technology.

---

## 12. Video Autoplay and Captions

**Severity:** 🟢 Low (WCAG 1.2.1 — Audio-only and Video-only, Level A)

### Finding

The hero videos autoplay muted with no audio track, which satisfies WCAG 1.4.2 (Audio Control). Since the videos are purely decorative/atmospheric and muted, captions and audio descriptions are not strictly required under WCAG.

However, the `OperatorParallax` section and OrbitShowcase sections also include muted autoplay videos. These are also decorative.

### Recommendation

No action required for WCAG compliance. If any future video includes meaningful content or audio, captions and transcripts will be needed.

---

## Summary of Recommendations (Priority Order)

| Priority | Action                                                                            | Status  |
| -------- | --------------------------------------------------------------------------------- | ------- |
| 🟠 1     | Audit and fix colour contrast ratios across all text/background pairs             | Open    |
| 🟠 2     | Add visible focus indicators to all custom interactive elements                   | ✅ Done |
| 🟠 3     | Add `aria-describedby`, `aria-invalid`, and `role="alert"` to form errors         | ✅ Done |
| 🟡 4     | Add hidden navigation and `<header>` landmark to legal/404 pages                  | Open    |
| 🟡 5     | Fix heading hierarchy (add `<h1>` to legal pages, flatten OrbitShowcase headings) | ✅ Done*|
| 🟡 6     | Add ARIA tabs pattern or improved keyboard nav to OrbitShowcase                   | Open    |
| 🟡 7     | Update modal title / add aria-live on step change                                 | Open    |
| 🟡 8     | Fix duplicate/mismatched image alt attributes                                     | Open    |
| 🟡 9     | Ensure footer nav links meet 24×24 CSS px minimum touch target                    | Open    |
| 🟢 10    | Use explicit `aria-hidden="true"` throughout                                      | Open    |
| 🟢 11    | Add `aria-busy` to hero section during load; review scroll lock timeout           | Open    |

*Item 5: `<h1>` added to legal pages and OrbitShowcase headings flattened in SEO work.
