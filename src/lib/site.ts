/**
 * Zentrale Stammdaten der Website.
 * Alle Angaben hier einmal pflegen, sie werden auf allen Seiten,
 * im Footer, in den Meta-Daten und im strukturierten Datensatz verwendet.
 */

export const site = {
  name: "Level One Göggingen",
  legalName: "Level One Göggingen GmbH",
  shortName: "Level One",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.levelonegoeggingen.de",
  claim: "Dein Fitnessstudio in Göggingen. 24 Stunden geöffnet.",
  description:
    "Fitnessstudio in Göggingen im Ostalbkreis. Trainiere rund um die Uhr an sieben Tagen die Woche. Geräte, Freihantelbereich, Cardio, Kurse, Personal Training, Sauna und Solarium.",
  contact: {
    // Telefon und Adresse sind aus öffentlichen Verzeichnissen übernommen und vor dem Livegang zu prüfen.
    phone: "+4971752618200",
    phoneDisplay: "07175 2618200",
    email: "info@levelonefitness.de",
    street: "Am Brunnenäcker 13",
    zip: "73571",
    city: "Göggingen",
    region: "Baden-Württemberg",
    country: "DE",
  },
  hours: {
    training: [
      { days: "Montag bis Sonntag", time: "24 Stunden geöffnet" },
      { days: "Feiertage", time: "24 Stunden geöffnet" },
    ],
    service: [
      { days: "Montag bis Freitag", time: "9 bis 22 Uhr" },
      { days: "Samstag und Sonntag", time: "10 bis 14 Uhr" },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/level_one_goeggingen/",
    facebook: "https://www.facebook.com/LevelOneGoeggingen/",
  },
  maps: "https://www.google.com/maps/search/?api=1&query=Am+Brunnen%C3%A4cker+13%2C+73571+G%C3%B6ggingen",
} as const;

export const mainNav = [
  { href: "/training/", label: "Training" },
  { href: "/kurse/", label: "Kurse" },
  { href: "/wellness/", label: "Wellness" },
  { href: "/mitgliedschaft/", label: "Mitgliedschaft" },
  { href: "/studio/", label: "Studio" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

export const footerNav = {
  angebot: [
    { href: "/training/", label: "Training" },
    { href: "/kurse/", label: "Kurse" },
    { href: "/wellness/", label: "Sauna und Solarium" },
    { href: "/mitgliedschaft/", label: "Mitgliedschaft" },
  ],
  studio: [
    { href: "/mitglied-werden/", label: "Mitglied werden" },
    { href: "/studio/", label: "Über das Studio" },
    { href: "/faq/", label: "Häufige Fragen" },
    { href: "/probetraining/", label: "Probetraining" },
    { href: "/kontakt/", label: "Kontakt und Anfahrt" },
  ],
  recht: [
    { href: "/impressum/", label: "Impressum" },
    { href: "/datenschutz/", label: "Datenschutz" },
    { href: "/agb/", label: "AGB" },
    { href: "/widerruf/", label: "Widerrufsbelehrung" },
  ],
} as const;

/** Optionaler Endpunkt für Formulare. Ohne Konfiguration nutzt das Formular den E-Mail-Fallback. */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
