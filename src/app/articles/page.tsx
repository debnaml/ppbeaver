import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import SplitHeroHeading from "@/components/SplitHeroHeading";
import ArticleCard from "@/components/ArticleCard";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical thinking on digital strategy, AI, data and building things that work — from the Performance Peak team.",
};

export default function ArticlesPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
        ]}
      />
      {/* Hero */}
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-12">
        <HeroChrome ctaTargetId="articles-grid" />

        <div className="absolute inset-0">
          <Image
            src="/images/operator.webp"
            alt="Articles hero background"
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

        <div className="relative z-10 max-w-4xl">
          <SplitHeroHeading
            leadingText="Thinking out"
            highlightText="loud."
          />
        </div>
      </section>

      {/* Articles grid */}
      <section
        id="articles-grid"
        className="w-full px-6 py-16 sm:px-12 sm:py-24"
      >
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Featured article */}
          {featured && (
            <div>
              <h2 className="sr-only">Featured article</h2>
              <ArticleCard article={featured} featured />
            </div>
          )}

          {/* Rest of articles */}
          {rest.length > 0 && (
            <div>
              <h2 className="mb-8 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                More articles
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
