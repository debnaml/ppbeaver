import type { Metadata } from "next";
import { Source_Sans_3, Syne } from "next/font/google";
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
const siteUrl = "https://performancepeak.com";
const siteDescription =
  "We help organisations work smarter with data, AI and thoughtful digital strategy. Practical advice, trusted partners, and technology that just works.";
const brandColor = "#292d40";

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
        url: `${siteUrl}/og-image.jpg`,
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
    images: [`${siteUrl}/og-image.jpg`],
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
        {children}
      </body>
    </html>
  );
}
