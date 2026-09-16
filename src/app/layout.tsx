import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollTop from "@/components/ScrollTop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Fitnessstudio mit 24 Stunden Training`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Fitnessstudio Göggingen",
    "Fitness Ostalbkreis",
    "24 Stunden Fitnessstudio",
    "Krafttraining Schwäbisch Gmünd",
    "Kurse Fitness Göggingen",
    "Personal Training Ostalbkreis",
    "Sauna Göggingen",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Fitnessstudio mit 24 Stunden Training`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Level One Göggingen, Fitnessstudio mit 24 Stunden Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Fitnessstudio mit 24 Stunden Training`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "fitness",
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#inhalt">
          Zum Inhalt springen
        </a>
        <ScrollTop />
        <ScrollProgress />
        <Nav />
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <JsonLd />
      </body>
    </html>
  );
}
