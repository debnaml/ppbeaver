import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import SplitHeroHeading from "@/components/SplitHeroHeading";

export type LegalContentSection = {
  title: string;
  paragraphs: string[];
};

export type LegalPageLayoutProps = {
  heroImage: { src: string; alt: string };
  heading: { leadingText: string; highlightText: string };
  contactId: string;
  contactHeading?: string;
  contentSections: LegalContentSection[];
};

const LegalPageLayout = ({
  heroImage,
  heading,
  contactId,
  contactHeading = "Ready to work smarter?",
  contentSections,
}: LegalPageLayoutProps) => {
  return (
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-12">
        <HeroChrome ctaTargetId={contactId} />

        <div className="absolute inset-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="h-full w-full object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(4,21,33,0.4),_rgba(4,21,33,0.85))]"
            aria-hidden
          />
        </div>

        <SplitHeroHeading
          leadingText={heading.leadingText}
          highlightText={heading.highlightText}
          className="relative z-10 max-w-4xl"
        />
      </section>

      <section className="bg-[#2D829B] px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-4xl space-y-16">
          {contentSections.map((section) => (
            <article key={section.title} className="space-y-4">
              <h2
                className="font-heading text-3xl font-semibold text-white sm:text-4xl"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-body text-lg leading-relaxed text-white/80 sm:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <ContactSection id={contactId} heading={contactHeading} className="py-24" />

      <Footer />
    </main>
  );
};

export default LegalPageLayout;
