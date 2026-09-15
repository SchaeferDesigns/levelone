"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import type { IconName } from "./Icon";
import { useScrollProgress } from "@/lib/useScrollProgress";

type Area = {
  icon: IconName;
  kicker: string;
  title: string;
  text: string;
  points: string[];
};

const areas: Area[] = [
  {
    icon: "dumbbell",
    kicker: "Bereich 01",
    title: "Geräte",
    text: "Maschinen für jede Muskelgruppe. Geführte Bewegung, sicherer Einstieg.",
    points: ["Rücken, Brust, Schulter, Beine", "Gewichte in feinen Stufen", "Einweisung inklusive"],
  },
  {
    icon: "target",
    kicker: "Bereich 02",
    title: "Freihantel",
    text: "Kurzhanteln, Langhanteln, Bänke, Racks. Platz für die Grundübungen.",
    points: ["Grundübungen mit Platz", "Breite Hantelabstufung", "Rund um die Uhr zugänglich"],
  },
  {
    icon: "bike",
    kicker: "Bereich 03",
    title: "Cardio",
    text: "Laufband, Stepper, Bikes. Zum Aufwärmen oder als eigene Einheit.",
    points: ["Belastung frei steuerbar", "Gut kombinierbar mit Kraft", "Auch für den Wiedereinstieg"],
  },
  {
    icon: "music",
    kicker: "Bereich 04",
    title: "Kurse",
    text: "Rückenfit, Zumba, Pole Dance. Feste Termine, klare Anleitung.",
    points: ["Mehrere Schwierigkeitsstufen", "Kleine Gruppen", "Ohne Vorkenntnisse"],
  },
  {
    icon: "sauna",
    kicker: "Bereich 05",
    title: "Wellness",
    text: "Sauna und Solarium im Haus. Erholung gehört dazu, nicht ins Zusatzpaket.",
    points: ["Sauna nach dem Training", "Solarium im Studio", "Bar mit Kaffee und Shakes"],
  },
];

export default function AreaScroller() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = progress * (areas.length - 1);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);
  const [stageH, setStageH] = useState(900);

  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      setTravel(Math.max(0, row.scrollWidth - window.innerWidth + 40));
      setStageH(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section aria-labelledby="bereiche-titel" className="relative">
      <div
        ref={ref}
        className="hscroll-track"
        style={{ height: `${Math.round(stageH + travel * 0.9)}px` }}
      >
        <div className="hscroll-stage">
          <div className="w-full">
            <div className="shell">
              <span className="eyebrow">Trainingsflächen</span>
              <h2 id="bereiche-titel" className="display-huge mt-3">
                Fünf Bereiche,
                <br />
                <span className="flame-text">eine Mitgliedschaft</span>
              </h2>
            </div>

            <div
              ref={rowRef}
              className="hscroll-row mt-10"
              style={{
                transform: `translate3d(${-progress * travel}px, 0, 0)`,
                transition: "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {areas.map((a, i) => (
                <article
                  key={a.title}
                  className="hscroll-card glass sweep card card-hover"
                  style={{
                    opacity: Math.abs(i - active) <= 0.7 ? 1 : 0.45,
                    transform: `scale(${Math.abs(i - active) <= 0.7 ? 1 : 0.955})`,
                    transition:
                      "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/14 bg-white/6 text-flame-400">
                      <Icon name={a.icon} size={26} />
                    </span>
                    <span className="text-[clamp(3rem,7vw,5.2rem)] font-black leading-none tracking-tight text-white/8">
                      {a.kicker.replace("Bereich ", "")}
                    </span>
                  </div>
                  <h3 className="display-huge mt-5">{a.title}</h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-mute">{a.text}</p>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {a.points.map((pt) => (
                      <li
                        key={pt}
                        className="inline-flex items-center gap-2 rounded-[999px] border border-white/12 bg-white/5 px-4 py-2 text-[14px] font-semibold"
                      >
                        <Icon name="check" size={13} strokeWidth={3} className="text-flame-400" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="shell mt-10">
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
                role="presentation"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-flame-400 to-flame-500 transition-[width] duration-150"
                  style={{ width: `${Math.max(6, progress * 100)}%` }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-faint">
                  Bereich {Math.min(areas.length, Math.floor(progress * areas.length) + 1)} von{" "}
                  {areas.length}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <Link href="/training/" className="btn btn-ghost">
                    Alle Trainingsangebote
                    <Icon name="arrowRight" size={17} />
                  </Link>
                  <Link href="/kurse/" className="btn btn-ghost">
                    Kurse und Termine
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
