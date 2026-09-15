import fs from "node:fs";
import path from "node:path";
import ScrollSequence from "./ScrollSequence";
import type { Caption, SequenceManifest } from "./ScrollSequence";

const captions: Caption[] = [
  {
    title: "Komm rein",
    text: "Empfang, Umkleide, Trainingsfläche. Kurze Wege, kein Suchen. In zwei Minuten stehst du am ersten Gerät.",
  },
  {
    title: "Nimm dir Platz",
    text: "Freihantelbereich mit Racks und Bänken, dazu Maschinen für jede Muskelgruppe. Genug Fläche für alle.",
  },
  {
    title: "Und danach",
    text: "Kursbereich, Sauna und Solarium gehören dazu. Erholung ist Teil des Trainings.",
  },
];

/**
 * Spielt eine Bildsequenz am Scrollen ab, sobald eine unter public/sequenz
 * hinterlegt ist. Ohne Sequenz erscheint nichts, damit keine leere Fläche
 * entsteht.
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
  if (!manifest) return null;
  return <ScrollSequence manifest={manifest} captions={captions} />;
}
