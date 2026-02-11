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
