import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";
import ScrollSequence from "./ScrollSequence";
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

  return (
    <section aria-labelledby="studio-titel" className="section-y glow glow-left">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Das Studio</span>
          <h2 id="studio-titel" className="display-huge mt-4 max-w-[16ch]">
            So sieht es bei uns aus
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {captions.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="glass sweep card card-hover h-full">
                <div className="media-frame relative mb-7 overflow-hidden rounded-[18px]" style={{ "--frame-ratio": "4 / 3" } as React.CSSProperties}>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,138,61,0.3),transparent_62%),radial-gradient(90%_80%_at_100%_100%,rgba(56,120,255,0.24),transparent_60%)]"
                  />
                  <div className="relative flex h-full items-center justify-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/16 bg-white/8">
                      <Icon name={["users", "dumbbell", "sauna"][i] as "users"} size={26} />
                    </span>
                  </div>
                </div>
                <span className="eyebrow">
                  0{i + 1} von 0{captions.length}
                </span>
                <h3 className="display-md mt-3">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
          <Link href="/probetraining/" className="btn btn-primary">
            Kostenloses Probetraining
            <Icon name="arrowRight" size={18} strokeWidth={2.1} />
          </Link>
          <Link href="/studio/" className="btn btn-ghost">
            Studio ansehen
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
