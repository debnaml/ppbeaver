import type { Metadata } from "next";
import { Source_Sans_3, Syne } from "next/font/google";

import ConditionalAnalytics from "@/components/analytics/ConditionalAnalytics";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const siteName = "Performance Peak";
const defaultTitle = "Digital Strategy & AI Consultancy | Performance Peak";
const siteUrl = "https://www.performancepeak.co.uk";
const siteDescription =
  "Digital strategy, AI consultancy and hands-on build services. From insight and planning to websites, apps and ongoing optimisation, practical advice that helps organisations work smarter.";
const brandColor = "#292d40";
const defaultOgImage = `${siteUrl}/og-image.png`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  sameAs: [
    "https://www.linkedin.com/company/performance-peak-ai-digital-transformation/",
    "https://www.instagram.com/performancepeak",
    "https://find-and-update.company-information.service.gov.uk/company/15037470",
  ],
  email: "hello@performancepeak.co.uk",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ipswich",
    addressCountry: "GB",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@performancepeak.co.uk",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
  ],
  slogan: "Build with intelligence, imagination, and information.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Strategy & AI Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Insight",
          description:
            "Independent advice grounded in your data, your team and how your organisation actually works. Including data analysis, stakeholder research, process reviews, technology audits, and feasibility studies.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Strategy",
          description:
            "Thoughtful planning and experienced guidance to help you prioritise the right changes with confidence. Including transformation roadmaps, AI strategy, integration planning, and delivery leadership.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Build",
          description:
            "From websites to internal systems, we design and build reliable tools that are simple to use and built to last. Including website development, UX/UI design, web and mobile apps, e-learning systems, and AI-powered features.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Optimise",
          description:
            "We stay with you after launch, refining, supporting and evolving your systems so they continue to deliver value over time. Including analytics, conversion improvements, security reviews, and ongoing support.",
        },
      },
    ],
  },
};

export const viewport = {
  themeColor: brandColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "performance marketing",
    "AI consultancy",
    "digital strategy",
    "data transformation",
    "Performance Peak",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: brandColor,
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: siteDescription,
    url: siteUrl,
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
    title: defaultTitle,
    description: siteDescription,
    creator: "@performancepeak",
    images: [defaultOgImage],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${sourceSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ConditionalAnalytics />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
