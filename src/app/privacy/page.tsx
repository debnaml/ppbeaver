import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import SplitHeroHeading from "@/components/SplitHeroHeading";

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
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-12">
        <HeroChrome ctaTargetId="privacy-contact" />

        <div className="absolute inset-0">
          <Image
            src="/images/eagle.jpg"
            alt="Eagle captured mid flight"
            fill
            priority
            className="h-full w-full object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(4,21,33,0.4),_rgba(4,21,33,0.85))]" aria-hidden />
        </div>

        <SplitHeroHeading
          leadingText="Protecting your"
          highlightText="privacy"
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

      <ContactSection id="privacy-contact" heading="Ready to work smarter?" className="py-24" />

      <Footer />
    </main>
  );
}
