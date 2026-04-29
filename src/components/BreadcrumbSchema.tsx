const siteUrl = "https://www.performancepeak.co.uk";

export type BreadcrumbItem = {
  name: string;
  /** Path relative to the site root, e.g. "/articles" or "/articles/my-post". Use "/" for home. */
  path: string;
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * Renders a BreadcrumbList JSON-LD <script> tag for SEO / AI readiness.
 * Produces no visible output. Place anywhere within the page tree.
 */
const BreadcrumbSchema = ({ items }: Props) => {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BreadcrumbSchema;
