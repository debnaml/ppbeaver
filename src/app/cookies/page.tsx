import LegalPageLayout from "@/components/legal/LegalPageLayout";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { buildPageMetadata } from "@/lib/siteMetadata";

const contentSections = [
  {
    title: "Why we use cookies",
    paragraphs: [
      "Cookies let us remember the basics of your visit so pages stay quick, secure and consistent every time you return. We only keep what we need, and no advertising, personalisation or social-media cookies are ever set.",
    ],
  },
  {
    title: "Consent cookie",
    paragraphs: [
      "pp_cookie_consent — Stores your Accept or Decline choice from the cookie banner. It lasts for one year so we can remember your preference across visits. This cookie is classified as strictly necessary because it records the consent decision itself.",
    ],
  },
  {
    title: "Analytics cookies (require consent)",
    paragraphs: [
      "These cookies are only set after you click 'Accept' on the cookie banner. If you decline, no analytics cookies are placed and the site works exactly the same.",
      "_ga — Assigns a pseudonymous ID so Google Analytics can count unique visitors and understand how people arrive on the site. It lasts for up to two years and is refreshed on return visits.",
      "_ga_<property-id> — Keeps session-level details such as which pages you view during a single visit and how long the session lasts. It also persists for up to two years but is primarily used for session stitching.",
      "We have disabled advertising features and Google Signals in our GA4 configuration. IP addresses are not stored. The aggregate reports we review help us spot trends without identifying individual visitors.",
    ],
  },
  {
    title: "Local storage",
    paragraphs: [
      "We store a small preference in your browser's local storage (ppb:heroPosterMode) to remember whether you prefer the static hero image over the video. This does not contain personal data and expires automatically after 24 hours.",
    ],
  },
  {
    title: "Managing your settings",
    paragraphs: [
      "You can change your cookie choice at any time using the 'Manage Cookies' link in our website footer, which re-opens the consent banner. If you decline or withdraw consent, any existing analytics cookies are automatically deleted.",
      "You can also block or clear cookies through your browser settings or dedicated privacy tools — everything on the site will still be readable.",
      "If you spot anything unexpected or want us to remove historical analytics data tied to your visits, email hello@performancepeak.co.uk and we will take care of it.",
    ],
  },
];

export const metadata = buildPageMetadata({
  title: "Cookies Policy | Performance Peak",
  description:
    "Learn how Performance Peak uses cookies, why they matter, and how you can control your preferences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Cookies", path: "/cookies" },
        ]}
      />
      <LegalPageLayout
        heroImage={{ src: "/images/cookie.webp", alt: "Cookies stacked on a dark surface" }}
        heading={{ leadingText: "Those pesky", highlightText: "cookies" }}
        contactId="cookies-contact"
        contentSections={contentSections}
      />
    </>
  );
}
