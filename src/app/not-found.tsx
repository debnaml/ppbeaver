import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "You may have strayed off-course",
    paragraphs: [
      "The link you followed either expired, moved, or never existed outside of an over-caffeinated brainstorm. Our navigation beacons are usually reliable, but every good adventure has a mystery waypoint or two.",
      "Good news: nothing exploded, and the rest of the site is still humming along nicely. Take a deep breath, grab a fresh cup of something warm, and let us guide you back to solid ground.",
    ],
  },
  {
    title: "Try these handy coordinates",
    paragraphs: [
      "Hop back to the hero section via the main logo, visit the services showcase to see how we untangle complex programmes, or head straight to the contact form if you already know what you need.",
      "If you're hunting for something specific? Case studies, AI governance notes, or transformation frameworks? Drop us a line and we'll send you the exact resource instead of a 404 detour.",
    ],
  },
  {
    title: "Still feeling lost?",
    paragraphs: [
      "Email hello@performancepeak.com with the page you expected and any clues you have. We'll investigate, fix any broken signposts, and send you the right link plus a cheerful apology gif for the trouble.",
    ],
  },
];

export default function NotFoundPage() {
  return (
    <LegalPageLayout
      // TODO: Replace placeholder image once the bespoke 404 artwork is ready.
      heroImage={{ src: "/images/lost-mole.jpg", alt: "Illustration of a mole lost in the snow." }}
      heading={{ leadingText: "Well this is", highlightText: "awkward" }}
      contactId="not-found-contact"
      contactHeading="Need a human guide?"
      contentSections={contentSections}
    />
  );
}
