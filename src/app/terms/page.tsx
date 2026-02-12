import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "Scope of our work",
    paragraphs: [
      "These terms cover everything from the first exploratory call to the final handover. They keep expectations clear for discovery, delivery, and ongoing support.",
      "We keep the legal framing in plain language: who does what, when assets are delivered, and how decisions get documented.",
    ],
  },
  {
    title: "How we collaborate",
    paragraphs: [
      "We work in close partnership, which means access to the right people, timely feedback, and shared accountability for momentum.",
      "Every engagement includes a single point of contact, sprint or milestone reviews, and the option to adjust scope when priorities shift.",
    ],
  },
  {
    title: "Changing course",
    paragraphs: [
      "If timelines move or new information appears, we bring options—not surprises. You will always see the impact on budget and deliverables before anything shifts.",
      "If either side needs to pause or end the engagement, we make sure knowledge is transferred and responsibilities are tidy before stepping away.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | Performance Peak",
  description: "A clear view of how Performance Peak works with clients, from scope and collaboration to change management.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      heroImage={{ src: "/images/eagle.jpg", alt: "Close up of an eagle" }}
      heading={{ leadingText: "The details", highlightText: "matter" }}
      contactId="terms-contact"
      contentSections={contentSections}
    />
  );
}
