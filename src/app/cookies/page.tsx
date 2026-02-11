import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import SplitHeroHeading from "@/components/SplitHeroHeading";

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
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-12">
        <HeroChrome ctaTargetId="cookies-contact" />

        <div className="absolute inset-0">
          <Image
            src="/images/cookie.jpg"
            alt="Cookies stacked on a dark surface"
            fill
            priority
            className="h-full w-full object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(4,21,33,0.4),_rgba(4,21,33,0.85))]" aria-hidden />
        </div>

        <SplitHeroHeading
          leadingText="Those pesky"
          highlightText="cookies"
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

      <ContactSection
        id="cookies-contact"
        heading="Ready to work smarter?"
        className="py-24"
      />

      <Footer />
    </main>
  );
}
