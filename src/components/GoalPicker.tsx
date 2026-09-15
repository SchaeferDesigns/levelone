"use client";

import Link from "next/link";
import { useId, useState } from "react";
import Icon from "./Icon";
import type { IconName } from "./Icon";

type Goal = {
  key: string;
  label: string;
  icon: IconName;
  headline: string;
  text: string;
  plan: string[];
  focus: string;
};

const goals: Goal[] = [
  {
    key: "muskel",
    label: "Muskeln aufbauen",
    icon: "dumbbell",
    headline: "Schwerer werden, sichtbar werden",
    text: "Der Reiz muss steigen, sonst passiert nichts. Wir setzen auf wenige große Übungen, saubere Technik und eine Steigerung, die du im Heft nachlesen kannst.",
    plan: [
      "Drei feste Einheiten pro Woche",
      "Grundübungen an Gerät und Hantel",
      "Gewicht alle zwei Wochen prüfen",
    ],
    focus: "Freihantel und Geräte",
  },
  {
    key: "abnehmen",
    label: "Abnehmen",
    icon: "flame",
    headline: "Weniger wiegen, mehr aushalten",
    text: "Krafttraining hält die Muskulatur, Cardio erhöht den Verbrauch, die Ernährung entscheidet. Wir kümmern uns um alle drei Teile statt nur um einen.",
    plan: [
      "Kraft plus Cardio kombiniert",
      "Realistische Ernährungsschritte",
      "Fortschritt über Umfang statt nur Gewicht",
    ],
    focus: "Cardio, Geräte und Ernährung",
  },
  {
    key: "ruecken",
    label: "Rücken stärken",
    icon: "pulse",
    headline: "Sitzen und Schichtarbeit ausgleichen",
    text: "Der Rücken meldet sich meistens dort, wo die Kraft fehlt. Wir kräftigen gezielt Rumpf und oberen Rücken und arbeiten an der Beweglichkeit der Hüfte.",
    plan: [
      "Rückenfit im Kursbereich",
      "Gezielte Kräftigung an Geräten",
      "Mobilisation für Hüfte und Brustwirbelsäule",
    ],
    focus: "Kurse und Geräte",
  },
  {
    key: "ausdauer",
    label: "Fitter werden",
    icon: "bike",
    headline: "Treppen ohne Pause",
    text: "Kondition ist die Grundlage für alles andere. Wir starten in einem Tempo, das du durchhältst, und steigern in kleinen Schritten statt in großen Sprüngen.",
    plan: [
      "Zwei bis drei lockere Einheiten",
      "Belastung nach Gefühl und Puls",
      "Ergänzend Kraft für Gelenke",
    ],
    focus: "Cardio und Kurse",
  },
  {
    key: "einstieg",
    label: "Wiedereinstieg",
    icon: "sparkles",
    headline: "Nach langer Pause zurück",
    text: "Der häufigste Fehler ist ein zu harter Start. Wir beginnen bewusst ruhig, bauen die Gewohnheit auf und steigern erst, wenn die ersten Wochen sitzen.",
    plan: [
      "Zwei kurze Einheiten pro Woche",
      "Geführte Geräte für den Start",
      "Nach vier Wochen gemeinsam nachsteuern",
    ],
    focus: "Geräte und Betreuung",
  },
];

export default function GoalPicker() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const goal = goals[active];

  return (
    <div>
      <div role="tablist" aria-label="Dein Ziel" className="flex flex-wrap gap-2.5">
        {goals.map((g, i) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next =
                  e.key === "ArrowRight"
                    ? (active + 1) % goals.length
                    : (active - 1 + goals.length) % goals.length;
                setActive(next);
                document.getElementById(`${uid}-tab-${next}`)?.focus();
              }
            }}
            className="goal-tab"
          >
            <Icon name={g.icon} size={18} />
            {g.label}
          </button>
        ))}
      </div>

      {goals.map((g, i) => (
        <div
          key={g.key}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
          className="mt-7"
        >
          <div className="glass-strong sweep rounded-[26px] p-7 sm:p-10">
            <div className="grid gap-9 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="eyebrow">{g.focus}</span>
                <h3 className="display-md mt-3">{g.headline}</h3>
                <p className="lead mt-4">{g.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/probetraining/" className="btn btn-primary">
                    Im Probetraining besprechen
                    <Icon name="arrowRight" size={18} strokeWidth={2.1} />
                  </Link>
                  <Link href="/training/" className="btn btn-ghost">
                    Bereiche ansehen
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
                  So sieht der Start aus
                </p>
                <ol className="mt-5 flex flex-col gap-3.5">
                  {g.plan.map((p, n) => (
                    <li key={p} className="flex items-start gap-3.5 text-[15.5px]">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[13px] font-black text-[#160702]">
                        {n + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
