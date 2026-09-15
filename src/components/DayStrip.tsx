"use client";

import { useId, useState } from "react";
import Icon from "./Icon";
import type { IconName } from "./Icon";

type Phase = {
  time: string;
  label: string;
  title: string;
  text: string;
  icon: IconName;
  tint: string;
};

const phases: Phase[] = [
  {
    time: "04:45",
    label: "Vor der Frühschicht",
    title: "Wenn andere noch schlafen",
    text: "Die Schicht beginnt um sechs. Du warst da schon unter der Stange, hast geduscht und bist wach im Kopf. Kein Warten, keine Musikdiskussion.",
    icon: "flame",
    tint: "rgba(38,72,150,0.4)",
  },
  {
    time: "08:30",
    label: "Nach dem Bringdienst",
    title: "Die ruhigste Stunde",
    text: "Kinder in der Schule, Studio halb leer. Wer flexibel ist, trainiert jetzt und hat den Rest des Tages frei.",
    icon: "sun",
    tint: "rgba(255,138,61,0.32)",
  },
  {
    time: "12:15",
    label: "Mittagspause",
    title: "Vierzig Minuten reichen",
    text: "Kurzes Aufwärmen, drei Übungen, fertig. Wir bauen dir einen Plan, der in die Pause passt, statt einen, der nie stattfindet.",
    icon: "clock",
    tint: "rgba(255,170,90,0.3)",
  },
  {
    time: "17:30",
    label: "Nach Feierabend",
    title: "Die volle Stunde",
    text: "Jetzt ist am meisten los, und genau das trägt. Volle Geräte heißt bei uns trotzdem kein Wartezimmer.",
    icon: "dumbbell",
    tint: "rgba(255,90,31,0.38)",
  },
  {
    time: "20:45",
    label: "Kursabend",
    title: "Zusammen fällt es leichter",
    text: "Rückenfit, Zumba, Pole Dance. Ein fester Termin wirkt stärker als jeder Vorsatz, und in der Gruppe ziehst du mit.",
    icon: "music",
    tint: "rgba(160,60,200,0.3)",
  },
  {
    time: "01:20",
    label: "Nachtschicht",
    title: "Dein Schlüssel, deine Zeit",
    text: "Die Spätschicht ist raus, du kommst rein. Mit deinem Zutrittsmedium öffnest du die Tür zu jeder Uhrzeit, auch an Feiertagen.",
    icon: "key",
    tint: "rgba(30,54,120,0.42)",
  },
];

/** Kompakter Tagesüberblick. Eine Uhrzeit wählen, der Text wechselt. */
export default function DayStrip() {
  const [active, setActive] = useState(3);
  const uid = useId();
  const phase = phases[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Uhrzeit wählen"
        className="glass grid grid-cols-3 gap-px overflow-hidden rounded-[22px] lg:grid-cols-6"
      >
        {phases.map((p, i) => (
          <button
            key={p.time}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const next =
                e.key === "ArrowRight"
                  ? (active + 1) % phases.length
                  : (active - 1 + phases.length) % phases.length;
              setActive(next);
              document.getElementById(`${uid}-tab-${next}`)?.focus();
            }}
            className={`flex flex-col items-center gap-1.5 px-3 py-5 transition-colors duration-400 ${
              i === active ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Icon
              name={p.icon}
              size={19}
              className={i === active ? "text-flame-400" : "text-faint"}
            />
            <span
              className={`text-[16px] font-black tabular-nums tracking-tight ${
                i === active ? "text-chalk" : "text-mute"
              }`}
            >
              {p.time}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="glass-strong sweep relative mt-5 overflow-hidden rounded-[26px] p-7 sm:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${phase.tint}, transparent 68%)` }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div>
            <p className="text-[clamp(2.6rem,7vw,4.6rem)] font-black leading-none tracking-tight tabular-nums flame-text">
              {phase.time}
            </p>
            <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.18em] text-mute">
              {phase.label}
            </p>
          </div>
          <div className="lg:border-l lg:border-white/10 lg:pl-9">
            <h3 className="display-md">{phase.title}</h3>
            <p className="lead mt-4 max-w-[54ch]">{phase.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
