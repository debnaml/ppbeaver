import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const contentSections = [
  {
    title: "Using this website",
    paragraphs: [
      "Performance Peak maintains this site to share our work, insights, and ways to get in touch. You are welcome to browse, share links, and reference information for your own planning as long as you do so lawfully and without disrupting the service.",
      "By continuing to use the site you confirm you will not attempt to gain unauthorised access, introduce malicious code, or scrape content in a way that degrades performance for other visitors.",
    ],
  },
  {
    title: "Content and intellectual property",
    paragraphs: [
      "The copy, visuals, trademarks, and layouts you see here belong to Performance Peak or the partners who have authorised us to use them. Please do not reuse them without written permission.",
      "Feel free to link to any page on the site. If you would like to republish an article or use imagery elsewhere, email hello@performancepeak.com and we will let you know what is possible.",
    ],
  },
  {
    title: "Accuracy, links, and liability",
    paragraphs: [
      "We aim to keep every page current and helpful, but the site is provided “as is.” We do not guarantee that every detail is error-free or that the site will be available without interruption.",
      "Links to other websites are shared for convenience. Performance Peak is not responsible for the content, security, or privacy practices of those external destinations.",
    ],
  },
  {
    title: "Updates and contact",
    paragraphs: [
      "We refresh these Terms of Use whenever we add new features or need to clarify how the site works. The updated date at the bottom of the page shows when the latest changes went live.",
      "Questions or concerns? Email hello@performancepeak.com and we will respond quickly—usually within one or two working days.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | Performance Peak",
  description: "A clear view of how Performance Peak works with clients, from scope and collaboration to change management.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      heroImage={{ src: "/images/eagle.jpg", alt: "Close up of an eagle" }}
      heading={{ leadingText: "The details", highlightText: "matter" }}
      contactId="terms-contact"
      contentSections={contentSections}
    />
  );
}
