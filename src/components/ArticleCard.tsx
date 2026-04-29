import Image from "next/image";
import Link from "next/link";
import { formatArticleDate, type Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
  featured?: boolean;
};

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[var(--color-highlight)]/40 hover:bg-white/[0.06] ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured
            ? "aspect-[16/9] md:aspect-auto md:w-1/2"
            : "aspect-[16/9]"
        }`}
      >
        <Image
          src={article.heroImage}
          alt={article.heroAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--color-highlight)]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
          {article.category}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col justify-between p-6 ${
          featured ? "md:p-8" : ""
        }`}
      >
        <div>
          <p className="mb-2 font-body text-sm text-white/50">
            {formatArticleDate(article.date)}
            <span className="mx-2 text-white/30">·</span>
            {article.readTime}
          </p>
          <h3
            className={`font-heading font-semibold leading-tight text-[var(--color-cream)] group-hover:text-[var(--color-highlight)] transition ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {article.title}
          </h3>
        </div>
        <p className="mt-3 font-body text-base leading-relaxed text-white/60 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="font-heading text-sm font-medium text-[var(--color-highlight)] transition group-hover:translate-x-1">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
