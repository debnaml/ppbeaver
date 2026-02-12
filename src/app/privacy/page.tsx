import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "What we collect",
    paragraphs: [
      "We only gather the information we need to respond, collaborate, and keep projects moving. No unnecessary detail, no hidden tracking—just the essentials you knowingly share.",
      "When analytics are involved, they are lightweight, aggregated, and pointed at improving the experience rather than building profiles.",
    ],
  },
  {
    title: "How we use it",
    paragraphs: [
      "Data fuels the engagement you asked for: proposals, delivery, support, and the occasional nudge if something needs your input.",
      "Internally, we apply strict access controls and regularly review tooling to ensure your information stays exactly where it should.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You can ask for a copy of the data we hold, request changes, or tell us to delete it entirely. We make that process quick and human.",
      "Reach out any time at privacy@performancepeak.com and we will move fast—no ticketing maze required.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Performance Peak",
  description: "Understand what data we collect, how we use it, and the controls you have with Performance Peak.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      heroImage={{ src: "/images/eagle.jpg", alt: "Eagle captured mid flight" }}
      heading={{ leadingText: "Protecting your", highlightText: "privacy" }}
      contactId="privacy-contact"
      contentSections={contentSections}
    />
  );
}
