import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HeroChrome from "@/components/HeroChrome";
import ContactSection from "@/components/ContactSection";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { ARTICLES, getArticleBySlug, formatArticleDate } from "@/lib/articles";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.heroImage }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  /* Find previous / next for navigation */
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const next =
    currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  return (
    <main className="bg-[var(--color-supadark)] text-[var(--color-cream)]">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ]}
      />
      {/* Hero image */}
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
        <HeroChrome ctaTargetId="article-body" logoHref="/articles" />

        <div className="absolute inset-0">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
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

        <div className="relative z-10 w-full px-6 pb-12 pt-28 sm:px-12 sm:pb-16">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-[var(--color-highlight)]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              {article.category}
            </span>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.02em]">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-body text-sm text-white/50">
              <span>{article.author.name}</span>
              <span className="text-white/20">·</span>
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              <span className="text-white/20">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article
        id="article-body"
        className="w-full px-6 py-16 sm:px-12 sm:py-24"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {article.body.map((paragraph, i) => (
            <p
              key={i}
              className={`font-body text-lg leading-relaxed sm:text-xl ${
                i === 0
                  ? "text-white/90 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[var(--color-highlight)]"
                  : "text-white/70"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Author / CTA divider */}
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        <div className="flex items-center gap-4 border-t border-white/10 pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-highlight)]/20">
            <span className="font-heading text-lg font-bold text-[var(--color-highlight)]">
              PP
            </span>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-[var(--color-cream)]">
              {article.author.name}
            </p>
            <p className="font-body text-sm text-white/50">
              {article.author.role}
            </p>
          </div>
        </div>
      </div>

      {/* Prev / Next navigation */}
      <nav
        aria-label="Article navigation"
        className="mx-auto max-w-3xl px-6 py-12 sm:px-12"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              href={`/articles/${prev.slug}`}
              className="group flex flex-col rounded-xl border border-white/10 p-5 transition hover:border-[var(--color-highlight)]/40 sm:max-w-[48%]"
            >
              <span className="font-body text-xs uppercase tracking-wider text-white/40">
                ← Previous
              </span>
              <span className="mt-1 font-heading text-base font-semibold text-[var(--color-cream)] transition group-hover:text-[var(--color-highlight)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/articles/${next.slug}`}
              className="group flex flex-col items-end rounded-xl border border-white/10 p-5 text-right transition hover:border-[var(--color-highlight)]/40 sm:max-w-[48%]"
            >
              <span className="font-body text-xs uppercase tracking-wider text-white/40">
                Next →
              </span>
              <span className="mt-1 font-heading text-base font-semibold text-[var(--color-cream)] transition group-hover:text-[var(--color-highlight)]">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>

      {/* Back to all articles */}
      <div className="mx-auto max-w-3xl px-6 pb-8 sm:px-12">
        <Link
          href="/articles"
          className="font-heading text-sm font-medium text-[var(--color-highlight)] transition hover:opacity-80"
        >
          ← Back to all articles
        </Link>
      </div>

      <ContactSection />
      <Footer />
    </main>
  );
}
