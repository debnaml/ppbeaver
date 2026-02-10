import Image from "next/image";

import HeroSequence from "@/components/HeroSequence";
import UnderlineReveal from "@/components/UnderlineReveal";

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

export default function Home() {
  return (
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
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
              className="mt-[-0.7rem] mb-8 font-semibold leading-[1.02] text-[var(--color-cream)] drop-shadow-xl"
              style={{
                fontFamily:
                  "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontSize: "clamp(2.85rem, 5.25vw, 6.56rem)",
                letterSpacing: "-2%",
              }}
            >
              We help organisations work <UnderlineReveal width={4}>smarter.</UnderlineReveal>
            </h2>
          </div>
          <div
            className="space-y-8 text-lg font-normal leading-relaxed text-[var(--color-cream)] sm:text-xl lg:text-2xl"
            style={{
              fontFamily:
                "var(--font-source-sans), 'Source Sans 3', 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <p>
              Not by adding complexity, but by quietly fixing what slows you down.
              <br />
              Streamlining how things run <span className="text-[var(--color-highlight)]">/</span> Making better use of the tools and data you already have <span className="text-[var(--color-highlight)]">/</span> Giving you systems that just work.
            </p>
            <p>
              Technology should make life easier, not harder. So we focus on practical improvements that save time, reduce effort and help your business move faster and more confidently.
            </p>
            <p>
              We&apos;ve been working with data, software and AI long before it became a buzzword. That experience means we don&apos;t chase trends or over-engineer solutions. We solve the right problems and build things properly.
            </p>
            <p>We work alongside you as partners, not suppliers. Trusted, hands-on, and there when you need us.</p>
            <p>So you can get on with running your business, while we handle the hard stuff.</p>
          </div>
        </div>
      </section>

      <div id="content" className="px-6 py-16 sm:px-12" />

      <section id="contact" className="px-6 pb-12 sm:px-12">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-16">
          <div
            className="space-y-8"
            style={{
              fontFamily:
                "var(--font-source-sans), 'Source Sans 3', 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <h3
              className="text-4xl font-semibold leading-[1.02] text-[var(--color-cream)] sm:text-5xl lg:text-[4.5rem]"
              style={{
                fontFamily:
                  "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Your company is in <span className="text-[var(--color-highlight)]">safe hands.</span>
            </h3>
            <div className="flex flex-col gap-8 text-base text-white/80 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-lg sm:text-xl">
                Tell us what needs to move faster. We&apos;ll map the blockers, show you the wins, and build a plan that keeps your team focused on what matters.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-[var(--color-highlight)] px-8 py-4 text-base font-semibold text-[#06121A] transition hover:border-white/40 hover:bg-white"
                aria-label="Open contact form"
              >
                Start the conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-24 w-full bg-[#2D829B] px-6 py-20 text-white sm:px-12">
        <div className="flex w-full flex-col gap-12 text-sm text-white/85 sm:flex-row sm:items-start sm:justify-between sm:gap-20">
          <div
            className="text-[var(--color-cream)]"
            style={{
              fontFamily:
                "var(--font-source-sans), 'Source Sans 3', 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <Image src="/logo-full.svg" alt="Performance Peak" width={220} height={68} className="w-52" />
            <div className="pt-[100px] text-base text-white/80">
              <p>
                © {new Date().getFullYear()} Performance Peak (PP Worldwide)
                <br />
                Company Number: 15037470
              </p>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 text-right"
            style={{
              fontFamily:
                "var(--font-source-sans), 'Source Sans 3', 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <p className="text-lg font-semibold text-white">Contact Us</p>
            <p className="text-base text-white/80">Phone. +44 0100 123456</p>
            <a href="mailto:hello@pp-worldwide.com" className="text-base text-white/80 hover:text-[var(--color-highlight)]">
              Email. hello@pp-worldwide.com
            </a>
            <p className="text-base text-white/80">Ig. @performancepeakww</p>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </main>
  );
}
