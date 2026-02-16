import type { Metadata } from "next";

const siteName = "Performance Peak";
const siteUrl = "https://performancepeak.com";
const defaultOgImage = `${siteUrl}/og-image.jpg`;
const twitterHandle = "@performancepeak";

type OpenGraphType = "article" | "website";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  ogType?: OpenGraphType;
}

export const siteMetadataDefaults = {
  siteName,
  siteUrl,
  defaultOgImage,
  twitterHandle,
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogType = "article",
}: PageMetaOptions): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: ogType,
      siteName,
      title,
      description,
      url: canonical,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteName} hero preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: twitterHandle,
      images: [defaultOgImage],
    },
  };
}
