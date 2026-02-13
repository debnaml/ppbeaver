import HeroSequence from "@/components/HeroSequence";
import Footer from "@/components/Footer";
import RevealParagraph from "@/components/RevealParagraph";
import UnderlineReveal from "@/components/UnderlineReveal";
import OrbitShowcase from "@/components/OrbitShowcase";
import OperatorParallax from "@/components/OperatorParallax";
import ContactSection from "@/components/ContactSection";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Performance Peak",
  url: "https://performancepeak.com",
  logo: "https://performancepeak.com/logo.svg",
  sameAs: [
    "https://www.linkedin.com/company/performancepeak",
    "https://www.instagram.com/performancepeak",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business",
    email: "hello@performancepeak.com",
    areaServed: "Global",
  },
  slogan: "Build with intelligence, imagination, and information.",
};

const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <nav className="visually-hidden" aria-label="Primary navigation">
        <ul>
          {primaryNavLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <main id="main-content" className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
        <h1 className="visually-hidden">
          Digital Strategy & AI Consultancy | Performance Peak
        </h1>
        <HeroSequence />

      <section id="about" className="relative isolate w-full overflow-hidden px-6 py-24 sm:px-12">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex w-1/3 min-w-[260px] justify-end opacity-10"
          aria-hidden
        >
          <div
            className="h-full w-full max-w-none rotate-90"
            style={{
              backgroundImage: "url(/logo.svg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <div className="relative max-w-5xl space-y-6">
          <div>
            <h2
              className="mt-[-0.7rem] mb-12 font-heading text-[clamp(2.85rem,5.25vw,6.56rem)] font-semibold leading-[1.02] text-[var(--color-cream)] drop-shadow-xl tracking-[-0.02em] sm:mb-16"
            >
              We help organisations work <UnderlineReveal width={4}>smarter.</UnderlineReveal>
            </h2>
          </div>
          <div className="font-body space-y-8 text-lg font-normal leading-relaxed sm:text-xl lg:text-2xl">
            <RevealParagraph order={0}>
              Not by adding complexity, but by quietly fixing what slows you down.
              <br />
              Streamlining how things run <span className="text-[var(--color-highlight)]">/</span> Making better use of the tools and data you already have <span className="text-[var(--color-highlight)]">/</span> Giving you systems that just work.
            </RevealParagraph>
            <RevealParagraph order={1}>
              Technology should make life easier, not harder. So we focus on practical improvements that save time, reduce effort and help your business move faster and more confidently.
            </RevealParagraph>
            <RevealParagraph order={2}>
              We&apos;ve been working with data, software and AI long before it became a buzzword. That experience means we don&apos;t chase trends or over-engineer solutions. We solve the right problems and build things properly.
            </RevealParagraph>
            <RevealParagraph order={3}>We work alongside you as partners, not suppliers. Trusted, hands-on, there when you need us, so you can get on with running your business.</RevealParagraph>
          </div>
        </div>
      </section>

      <OperatorParallax />

      <OrbitShowcase />
      <ContactSection />

      <Footer />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </main>
    </>
  );
}
