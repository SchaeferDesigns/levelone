"use client";

import { useEffect, useRef, useState } from "react";
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
    text: "Maschinen für jede Muskelgruppe. Die Bewegung ist geführt, der Einstieg dadurch leicht und sicher.",
    points: ["Rücken, Brust, Schulter, Beine", "Gewichte in feinen Stufen", "Einweisung inklusive"],
  },
  {
    icon: "target",
    kicker: "Bereich 02",
    title: "Freihantel",
    text: "Kurzhanteln, Langhanteln, Bänke und Racks. Genug Platz, damit niemand auf ein Gerät wartet.",
    points: ["Grundübungen mit Platz", "Breite Hantelabstufung", "Rund um die Uhr zugänglich"],
  },
  {
    icon: "bike",
    kicker: "Bereich 03",
    title: "Cardio",
    text: "Laufband, Stepper und Bikes. Fürs Aufwärmen, für den Fettstoffwechsel oder als eigene Einheit.",
    points: ["Belastung frei steuerbar", "Gut kombinierbar mit Kraft", "Auch für den Wiedereinstieg"],
  },
  {
    icon: "music",
    kicker: "Bereich 04",
    title: "Kurse",
    text: "Rückenfit, Zumba und Pole Dance im eigenen Kursbereich. Feste Termine, klare Anleitung.",
    points: ["Mehrere Schwierigkeitsstufen", "Kleine Gruppen", "Ohne Vorkenntnisse"],
  },
  {
    icon: "sauna",
    kicker: "Bereich 05",
    title: "Wellness",
    text: "Sauna und Solarium direkt im Haus. Regeneration gehört zum Training, nicht als teures Extra.",
    points: ["Sauna nach dem Training", "Solarium im Studio", "Bar mit Kaffee und Shakes"],
  },
];

export default function AreaScroller() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
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
        style={{ height: `${Math.round(stageH + travel)}px` }}
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
              style={{ transform: `translate3d(${-progress * travel}px, 0, 0)` }}
            >
              {areas.map((a) => (
                <article key={a.title} className="hscroll-card glass sweep card">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/14 bg-white/6 text-flame-400">
                      <Icon name={a.icon} size={23} />
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-faint">
                      {a.kicker}
                    </span>
                  </div>
                  <h3 className="display-md mt-6">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{a.text}</p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {a.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[14.5px]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                          <Icon name="check" size={12} strokeWidth={3} />
                        </span>
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
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-faint">
                Bereich {Math.min(areas.length, Math.floor(progress * areas.length) + 1)} von{" "}
                {areas.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
