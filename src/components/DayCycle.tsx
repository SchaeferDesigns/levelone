"use client";

import Icon from "./Icon";
import type { IconName } from "./Icon";
import { useScrollProgress } from "@/lib/useScrollProgress";

type Phase = {
  time: string;
  label: string;
  title: string;
  text: string;
  icon: IconName;
  sky: string;
};

const phases: Phase[] = [
  {
    time: "04:45",
    label: "Vor der Frühschicht",
    title: "Wenn andere noch schlafen",
    text: "Die Schicht beginnt um sechs. Du warst da schon unter der Stange, hast geduscht und bist wach im Kopf. Kein Warten, keine Musikdiskussion, nur du und dein Plan.",
    icon: "flame",
    sky: "radial-gradient(120% 90% at 78% 10%, rgba(38,72,150,0.42), transparent 60%), radial-gradient(90% 80% at 10% 90%, rgba(12,18,40,0.9), transparent 60%), #05070a",
  },
  {
    time: "08:30",
    label: "Nach dem Bringdienst",
    title: "Die ruhigste Stunde",
    text: "Kinder in der Schule, Studio halb leer. Wer flexibel ist, trainiert jetzt und hat den Rest des Tages frei. Während der Servicezeiten ist jemand da, wenn du eine Frage hast.",
    icon: "sun",
    sky: "radial-gradient(120% 90% at 70% 6%, rgba(255,138,61,0.32), transparent 62%), radial-gradient(90% 80% at 8% 92%, rgba(40,52,88,0.6), transparent 60%), #07090e",
  },
  {
    time: "12:15",
    label: "Mittagspause",
    title: "Vierzig Minuten reichen",
    text: "Kurzes Aufwärmen, drei Übungen, fertig. Wir bauen dir einen Plan, der in die Pause passt, statt einen, der zwei Stunden braucht und deshalb nie stattfindet.",
    icon: "clock",
    sky: "radial-gradient(130% 100% at 50% -10%, rgba(255,170,90,0.3), transparent 58%), radial-gradient(90% 80% at 90% 90%, rgba(56,120,255,0.18), transparent 60%), #080b11",
  },
  {
    time: "17:30",
    label: "Nach Feierabend",
    title: "Die volle Stunde",
    text: "Jetzt ist am meisten los, und genau das trägt. Volle Geräte heißt bei uns trotzdem kein Wartezimmer, weil sich die Mitglieder über 24 Stunden verteilen.",
    icon: "dumbbell",
    sky: "radial-gradient(120% 90% at 82% 14%, rgba(255,90,31,0.4), transparent 60%), radial-gradient(90% 80% at 6% 88%, rgba(120,40,20,0.38), transparent 60%), #07080c",
  },
  {
    time: "20:45",
    label: "Kursabend",
    title: "Zusammen fällt es leichter",
    text: "Rückenfit, Zumba, Pole Dance. Ein fester Termin im Kalender wirkt stärker als jeder Vorsatz, und in der Gruppe ziehst du auch an schwachen Tagen mit.",
    icon: "music",
    sky: "radial-gradient(120% 90% at 30% 10%, rgba(160,60,200,0.28), transparent 60%), radial-gradient(90% 80% at 90% 80%, rgba(255,90,31,0.24), transparent 60%), #06070c",
  },
  {
    time: "01:20",
    label: "Nachtschicht",
    title: "Dein Schlüssel, deine Zeit",
    text: "Die Spätschicht ist raus, du kommst rein. Mit deinem eigenen Zutrittsmedium öffnest du die Tür zu jeder Uhrzeit, an sieben Tagen die Woche, auch an Feiertagen.",
    icon: "key",
    sky: "radial-gradient(120% 90% at 20% 6%, rgba(30,54,120,0.4), transparent 58%), radial-gradient(80% 70% at 88% 92%, rgba(10,14,30,0.9), transparent 60%), #04060a",
  },
];

export default function DayCycle() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const index = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  const active = phases[index];

  function jumpTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((i + 0.5) / phases.length) * span;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="tag-titel" className="relative">
      <div
        ref={ref}
        className="day-track"
        style={{ height: `${(phases.length + 1) * 100}svh` }}
      >
        <div className="day-stage">
          <div className="day-sky" style={{ background: active.sky }} aria-hidden="true" />

          <div className="shell w-full">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="eyebrow">24 Stunden geöffnet</span>
                <h2 id="tag-titel" className="display-md mt-3">
                  Ein Tag im Level One
                </h2>
              </div>
              <span className="hidden items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-faint sm:inline-flex">
                <Icon name="chevronDown" size={16} />
                Weiterscrollen
              </span>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="day-clock flame-text" aria-hidden="true">
                  {active.time}
                </p>
                <p className="mt-4 text-[15px] font-bold uppercase tracking-[0.2em] text-mute">
                  {active.label}
                </p>
              </div>

              <ol className="day-phases">
                {phases.map((p, i) => (
                  <li key={p.time} className="day-phase" data-active={i === index}>
                    <div className="glass sweep card">
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/14 bg-white/6 text-flame-400">
                          <Icon name={p.icon} size={23} />
                        </span>
                        <span className="text-[15px] font-bold uppercase tracking-[0.16em] text-faint">
                          {p.time} Uhr
                        </span>
                      </div>
                      <h3 className="display-md mt-5">{p.title}</h3>
                      <p className="mt-4 text-[16px] leading-relaxed text-mute">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Zeitleiste zum Springen */}
            <div className="mt-10 hidden lg:block">
              <div className="flex items-center gap-3">
                {phases.map((p, i) => (
                  <button
                    key={p.time}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Zum Abschnitt ${p.time} Uhr, ${p.label}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group flex-1"
                  >
                    <span
                      className={`block h-1.5 w-full rounded-full transition-colors duration-500 ${
                        i === index
                          ? "bg-gradient-to-r from-flame-400 to-flame-500"
                          : "bg-white/14 group-hover:bg-white/30"
                      }`}
                    />
                    <span
                      className={`mt-2.5 block text-left text-[12px] font-bold tracking-[0.1em] transition-colors duration-500 ${
                        i === index ? "text-chalk" : "text-faint"
                      }`}
                    >
                      {p.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
