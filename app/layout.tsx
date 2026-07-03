import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://homebuying.ie"),
  title: { default: "HomeBuying.ie — From mortgage maths to moving day", template: "%s | HomeBuying.ie" },
  description: "Irish mortgage calculators, a clear home-buying checklist, and plain-English document explanations for first-time buyers.",
  openGraph: { title: "HomeBuying.ie", description: "A clearer path from mortgage maths to moving day.", type: "website", locale: "en_IE" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE">
      <body><Analytics/><Header />{children}<Footer /></body>
    </html>
  );
}
