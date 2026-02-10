import HeroSequence from "@/components/HeroSequence";
import UnderlineReveal from "@/components/UnderlineReveal";

const services = [
  {
    title: "Intelligence Layer",
    summary: "Audience research, measurement frameworks, and creative diagnostics that expose where performance leaks.",
    highlights: ["Signal mapping", "KPI instrumentation", "Testing roadmaps"],
  },
  {
    title: "Imagination Layer",
    summary: "Creative systems, hero films, and modular content built for experimentation at speed.",
    highlights: ["Narrative sprints", "AI-aided concepting", "Motion systems"],
  },
  {
    title: "Information Layer",
    summary: "Full-funnel optimization and media acceleration with transparent reporting.",
    highlights: ["Acquisition playbooks", "Omni-channel delivery", "Always-on optimization"],
  },
];

const caseStudies = [
  {
    client: "Atlas Renewables",
    result: "+38% qualified pipeline",
    summary: "Redefined their hero narrative, built a data-backed creative matrix, and shipped a looping hero experience for their investor portal.",
    tags: ["B2B", "Product film", "Lifecycle"],
  },
  {
    client: "Mono Commerce",
    result: "4.2x creative efficiency",
    summary: "Implemented our tri-video hero system, connected to CRM signal loops, and reduced cost-per-demo overnight.",
    tags: ["SaaS", "Lifecycle", "Motion"],
  },
];

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

      <section className="relative isolate w-full overflow-hidden px-6 py-24 sm:px-12">
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

      <div id="content" className="relative isolate mx-auto flex max-w-6xl flex-col gap-20 px-6 py-24 sm:px-10">
        <section className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.6em] text-[var(--color-highlight)]">
              Services
            </p>
            <h3 className="text-3xl font-semibold">Stack the three layers of peak performance.</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <header>
                  <h4 className="text-2xl font-semibold text-white">{service.title}</h4>
                </header>
                <p className="text-base text-[#c0c4db]">{service.summary}</p>
                <ul className="mt-auto space-y-2 text-sm text-white/80">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-highlight)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.6em] text-[var(--color-highlight)]">
              Case Studies
            </p>
            <h3 className="text-3xl font-semibold">Proof from teams who shipped with us.</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study.client}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141629] to-[#1f2237] p-8"
              >
                <header className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                      {study.client}
                    </p>
                    <h4 className="text-2xl font-semibold text-white">{study.result}</h4>
                  </div>
                  <div className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
                    In Motion
                  </div>
                </header>
                <p className="text-base text-[#c0c4db]">{study.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs text-white/70">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.6em] text-[var(--color-highlight)]">
              Contact
            </p>
            <h3 className="text-3xl font-semibold text-white">Ready to build with Performance Peak?</h3>
            <p className="text-base text-[#c0c4db]">
              Tell us about your next launch, hero sequence, or growth plateau. We will assemble a mission squad within 48 hours.
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <p>hello@performancepeak.com</p>
              <p>+1 (917) 555-2046</p>
            </div>
          </div>
          <form className="grid gap-4">
            <label className="text-sm font-medium text-white/90">
              Name
              <input
                type="text"
                name="name"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-[#16182a] px-4 py-3 text-white placeholder-white/40 focus:border-[var(--color-highlight)] focus:outline-none"
                placeholder="Avery Founder"
              />
            </label>
            <label className="text-sm font-medium text-white/90">
              Email
              <input
                type="email"
                name="email"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-[#16182a] px-4 py-3 text-white placeholder-white/40 focus:border-[var(--color-highlight)] focus:outline-none"
                placeholder="you@brand.com"
                required
              />
            </label>
            <label className="text-sm font-medium text-white/90">
              Project Pulse
              <textarea
                name="project"
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/20 bg-[#16182a] px-4 py-3 text-white placeholder-white/40 focus:border-[var(--color-highlight)] focus:outline-none"
                placeholder="Hero video, product films, launch system..."
              />
            </label>
            <button
              type="submit"
              className="pp-button mt-2 inline-flex items-center gap-4 rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-7 py-4 text-sm font-semibold text-[var(--color-ink)] shadow-[0_15px_45px_rgba(255,255,255,0.25)] backdrop-blur transition hover:brightness-110 sm:text-base"
            >
              <span>Send Brief</span>
              <svg
                className="pp-button-arrow"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 12h14m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Performance Peak. Crafted for Vercel deployment.</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com" className="underline-offset-4 hover:underline">
              LinkedIn
            </a>
            <a href="https://www.instagram.com" className="underline-offset-4 hover:underline">
              Instagram
            </a>
          </div>
        </footer>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </main>
  );
}
