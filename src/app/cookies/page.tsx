import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "Why we use cookies",
    paragraphs: [
      "We rely on a handful of essential cookies to keep the site fast, secure, and tailored to the experience you expect.",
      "This is a placeholder for the detailed explanation of the tools, platforms, and safeguards that support those essentials.",
    ],
  },
  {
    title: "Types of cookies",
    paragraphs: [
      "Here we will spell out the different categories — from performance insights to preference tracking — and how each contributes to a smoother visit.",
      "Expect a breakdown of strictly necessary cookies alongside any optional analytics or personalization layers.",
    ],
  },
  {
    title: "Managing your settings",
    paragraphs: [
      "This section will explain the controls you have, the steps for opting in or out, and how often we refresh consent requests.",
      "We will also outline what happens when cookies are disabled so you know exactly what to expect.",
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
