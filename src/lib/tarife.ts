/**
 * Tarife für die Vorschau.
 * Die Beträge sind Beispielwerte. Sobald die echten Konditionen vorliegen,
 * werden sie hier einmal eingetragen und wirken auf allen Seiten.
 */
export type Tarif = {
  key: string;
  name: string;
  monat: number;
  laufzeit: string;
  kuendigung: string;
  aufnahme: number;
  highlight?: boolean;
  badge?: string;
  extras: string[];
};

export const tarife: Tarif[] = [
  {
    key: "flex",
    name: "Flex",
    monat: 39.9,
    laufzeit: "Ohne Mindestlaufzeit",
    kuendigung: "Monatlich kündbar",
    aufnahme: 0,
    extras: ["Volle Freiheit beim Ausstieg", "Ideal zum Reinschnuppern"],
  },
  {
    key: "classic",
    name: "Classic",
    monat: 29.9,
    laufzeit: "12 Monate",
    kuendigung: "Danach monatlich kündbar",
    aufnahme: 0,
    highlight: true,
    badge: "Am häufigsten gewählt",
    extras: ["Bester Preis für Regelmäßige", "Freie Kurswahl"],
  },
  {
    key: "duo",
    name: "Duo",
    monat: 24.9,
    laufzeit: "12 Monate",
    kuendigung: "Danach monatlich kündbar",
    aufnahme: 0,
    extras: ["Preis pro Person", "Nur gemeinsam zu zweit"],
  },
];

export const enthalten = [
  "Zutritt rund um die Uhr, sieben Tage die Woche",
  "Alle Trainingsbereiche im Studio",
  "Einweisung an den Geräten durch das Team",
  "Trainingsplan, abgestimmt auf dein Ziel",
  "Sauna und Solarium",
  "Wasser und Betreuung in den Servicezeiten",
];

export const guenstigster = Math.min(...tarife.map((t) => t.monat));

export function preis(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
