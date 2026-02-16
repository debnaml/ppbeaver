import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/siteMetadata";

const contentSections = [
  {
    title: "Information we collect",
    paragraphs: [
      "When you complete our contact form we ask for your name, company, email address, and a short description of the work you have in mind. Anything else we reference (meeting notes, follow-up documents, shared files) is created together and stored only for as long as that engagement requires.",
      "We also log high-level site analytics through Google Analytics, plus a small local preference that remembers if you prefer the static hero image. None of that ties back to your personal identity, it simply helps us understand traffic patterns and keep the experience consistent.",
    ],
  },
  {
    title: "How we use and protect it",
    paragraphs: [
      "Your details power the conversations you start with us: preparing proposals, planning delivery, booking workshops, and sending status updates. We do not sell, rent, or share that information with advertisers or unrelated partners.",
      "Project data sits inside the same secure tools we rely on every day (our project hub, and encrypted backups). Access is limited to the people actively supporting your work, and we regularly archive or delete closed engagement data.",
    ],
  },
  {
    title: "Analytics & processors",
    paragraphs: [
      "Google Analytics sets two cookies (`_ga` and `_ga_GNTKBV087EC`) so we can see aggregate metrics like page popularity, device type, and approximate geography. We enabled IP anonymisation and disabled advertising features, so the reports stay focused on performance rather than profiling.",
      "If you block analytics cookies or use a tracker blocker, the site still works, our dashboards simply show less data. We never add third-party advertising pixels or social media trackers.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [      
      "Email hello@performancepeak.co.uk with any questions and we will walk you through the process, including confirming completion once everything is cleaned up.",
    ],
  },
];

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Performance Peak",
  description:
    "Understand what data we collect, how we use it, and the controls you have with Performance Peak.",
  path: "/privacy",
});

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
