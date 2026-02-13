# Semantic Layout Review

## 1. Establish a Page-Level Heading _(addressed)_

- **Finding:** `src/app/page.tsx` rendered copy starting at `<h2>` inside the About section; there was no `<h1>` anywhere in the document.
- **Action:** Added an sr-only `<h1>` immediately inside `<main>` so assistive tech receives a primary landmark without changing visuals.

## 2. Provide Top-Level Navigation _(addressed)_

- **Finding:** The only `<nav>` element was in the footer (`src/components/Footer.tsx`). Users had to reach the bottom of the page before encountering navigation links.
- **Action:** Added a focusable skip link plus a sr-only primary `<nav>` near the top of `page.tsx`, giving screen readers a navigation landmark without introducing visible UI.

## 3. Headings for All Sections

- **Finding:** `HeroSequence` and `OperatorParallax` wrap content in `<section>` tags without a discernible heading, making section landmarks anonymous.
- **Recommendation:** Ensure each `<section>` contains an `<h2>`/`<h3>` (visible or `sr-only`) describing its content so screen readers can announce meaningful labels.

## 4. Semantics for Services Grid

- **Finding:** In `OrbitShowcase`, service cards are `<div>` groups without list/article semantics.
- **Recommendation:** Wrap each service block in an `<article>` (or `<li>` inside a `<ul>`). Use proper heading levels for titles and list elements for detail grids to keep the document outline coherent.

## 5. Footer Link Structure

- **Finding:** Footer navigation and legal links are plain anchors within a `<nav>` but lack list semantics.
- **Recommendation:** Convert menu sections to unordered lists (`<ul><li>`) for consistent announcements and easier focus management.
