import { absoluteUrl, site } from "@/lib/site";

/** Strukturierte Daten für Suchmaschinen und lokale Suchergebnisse. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": absoluteUrl("/#studio"),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: absoluteUrl(),
    telephone: site.contact.phone,
    email: site.contact.email,
    image: absoluteUrl("/og.png"),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.street,
      postalCode: site.contact.zip,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    areaServed: [
      { "@type": "City", name: "Göggingen" },
      { "@type": "City", name: "Schwäbisch Gmünd" },
      { "@type": "City", name: "Leinzell" },
      { "@type": "City", name: "Iggingen" },
      { "@type": "City", name: "Heuchlingen" },
      { "@type": "City", name: "Mutlangen" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "24 Stunden Training", value: true },
      { "@type": "LocationFeatureSpecification", name: "Freihantelbereich", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cardiobereich", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kursangebot", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: "Solarium", value: true },
      { "@type": "LocationFeatureSpecification", name: "Personal Training", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kostenfreie Parkplätze", value: true },
      { "@type": "LocationFeatureSpecification", name: "Barrierefreier Zugang", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
