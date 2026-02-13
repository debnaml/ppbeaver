import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "Why we use cookies",
    paragraphs: [
      "Cookies let us remember the basics of your visit so pages stay quick, secure, and consistent every time you return.",
      "We only keep what we need for performance insights, and the data we review is aggregated so it helps us spot trends without profiling individual visitors.",
    ],
  },
  {
    title: "Analytics cookies in use",
    paragraphs: [
      "_ga (Google Analytics) assigns an anonymous ID so we can understand how many people explore each page and how they arrive on the site. It lasts for two years and is refreshed when you return so long-term trends stay accurate.",
      "_ga_GNTKBV087EC (Google Analytics) keeps short-lived session details, such as which sections you read during a single visit. It typically resets every two years but is mainly used to stitch together activity from the same session.",
      "We do not set advertising, personalization, or third-party cookies—if analytics is disabled in your browser, these measurements simply drop away.",
    ],
  },
  {
    title: "Managing your settings",
    paragraphs: [
      "You can block or clear our cookies at any time through your browser settings or dedicated privacy tools—everything on the site will still be readable, but our analytics numbers may lose a bit of accuracy.",
      "If you spot anything unexpected or want us to remove historical analytics data tied to your visits, email hello@performancepeak.com and we will take care of it.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Cookies Policy | Performance Peak",
  description: "Learn how Performance Peak uses cookies, why they matter, and how you can control your preferences.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      heroImage={{ src: "/images/cookie.jpg", alt: "Cookies stacked on a dark surface" }}
      heading={{ leadingText: "Those pesky", highlightText: "cookies" }}
      contactId="cookies-contact"
      contentSections={contentSections}
    />
  );
}
