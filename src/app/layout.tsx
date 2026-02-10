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
const siteUrl = "https://performancepeak.com";
const siteDescription =
  "Performance Peak is a creative performance agency helping teams build with intelligence, imagination, and information.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Build with Intelligence`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "performance marketing",
    "creative agency",
    "video strategy",
    "Performance Peak",
  ],
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | Build with Intelligence`,
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
    title: `${siteName} | Build with Intelligence`,
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
