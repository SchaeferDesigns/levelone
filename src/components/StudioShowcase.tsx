import fs from "node:fs";
import path from "node:path";
import ScrollSequence from "./ScrollSequence";
import BarbellStory from "./BarbellStory";
import type { Caption, SequenceManifest } from "./ScrollSequence";

const captions: Caption[] = [
  {
    title: "Komm rein",
    text: "Empfang, Umkleide, Trainingsfläche. Kurze Wege, keine Schleusen, kein Suchen. Du bist in zwei Minuten umgezogen und stehst am ersten Gerät.",
  },
  {
    title: "Nimm dir Platz",
    text: "Freihantelbereich mit Racks und Bänken, dazu Maschinen für jede Muskelgruppe. Genug Fläche, damit niemand auf ein Gewicht wartet.",
  },
  {
    title: "Und danach",
    text: "Kursbereich, Sauna und Solarium sind Teil des Studios. Regeneration gehört zum Training, nicht in ein Zusatzpaket.",
  },
];

/**
 * Zeigt das Studio. Liegt eine Bildsequenz unter public/sequenz, wird sie
 * am Scrollen abgespielt. Fehlt sie, erscheint eine gestaltete Vorschau,
 * damit die Seite trotzdem vollständig ist.
 */
function readManifest(): SequenceManifest | null {
  try {
    const file = path.join(process.cwd(), "public", "sequenz", "manifest.json");
    const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<SequenceManifest>;
    if (!raw.count || !raw.pattern) return null;
    return {
      count: Number(raw.count),
      pattern: String(raw.pattern),
      pad: Number(raw.pad ?? 4),
      width: Number(raw.width ?? 1600),
      height: Number(raw.height ?? 900),
      poster: raw.poster ? String(raw.poster) : undefined,
    };
  } catch {
    return null;
  }
}

export default function StudioShowcase() {
  const manifest = readManifest();

  if (manifest) {
    return <ScrollSequence manifest={manifest} captions={captions} />;
  }

  return <BarbellStory />;
}
