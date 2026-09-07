import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { SITE } from "@/lib/site";

const siteUrl = new URL(SITE.url);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "HomeBuying.ie — From mortgage maths to moving day", template: "%s | HomeBuying.ie" },
  description: "Irish mortgage calculators, a clear home-buying checklist, and plain-English document explanations for first-time buyers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "HomeBuying.ie",
    description: "A clearer path from mortgage maths to moving day.",
    url: SITE.url,
    siteName: "HomeBuying.ie",
    type: "website",
    locale: "en_IE",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "HomeBuying.ie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeBuying.ie",
    description: "A clearer path from mortgage maths to moving day.",
    images: ["/twitter.svg"],
  },
  icons: { icon: "/icon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
