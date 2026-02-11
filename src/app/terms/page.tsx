import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import SplitHeroHeading from "@/components/SplitHeroHeading";

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
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-12">
        <HeroChrome ctaTargetId="terms-contact" />

        <div className="absolute inset-0">
          <Image
            src="/images/eagle.jpg"
            alt="Close up of an eagle"
            fill
            priority
            className="h-full w-full object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(4,21,33,0.4),_rgba(4,21,33,0.85))]" aria-hidden />
        </div>

        <SplitHeroHeading
          leadingText="The details"
          highlightText="matter"
          className="relative z-10 max-w-4xl"
        />
      </section>

      <section className="bg-[#2D829B] px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-4xl space-y-16">
          {contentSections.map((section) => (
            <article key={section.title} className="space-y-4">
              <h2
                className="text-3xl font-semibold text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-white/80 sm:text-xl"
                  style={{ fontFamily: "var(--font-source-sans), 'Source Sans 3', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <ContactSection id="terms-contact" heading="Ready to work smarter?" className="py-24" />

      <Footer />
    </main>
  );
}
