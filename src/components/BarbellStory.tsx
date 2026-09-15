"use client";

import Link from "next/link";
import Icon from "./Icon";
import { useScrollProgress } from "@/lib/useScrollProgress";

const steps = [
  {
    title: "Jeder fängt klein an",
    text: "Bei uns beginnt niemand mit dem Anspruch, sofort viel zu heben. Zuerst sitzt die Technik, dann kommt Gewicht dazu. Jedes Gerät wird dir erklärt, bevor du allein daran trainierst.",
  },
  {
    title: "Dann kommt Gewicht dazu",
    text: "Nach wenigen Wochen trägt der Körper mehr, als die meisten sich zutrauen. Dein Plan wächst mit, in Schritten, die du auch an einem schlechten Tag schaffst.",
  },
  {
    title: "Und das nächste",
    text: "Fortschritt entsteht durch Wiederholung, nicht durch Motivation. Deshalb zählt vor allem, dass du regelmäßig kommst. Rund um die Uhr geöffnet heißt: keine Ausrede über die Uhrzeit.",
  },
  {
    title: "Bis du stehen bleibst",
    text: "Und genau dann greifen wir ein. Neue Übungen, andere Reize, angepasste Pausen. Stillstand ist der Punkt, an dem die meisten aufhören. Bei uns ist er der Punkt, an dem wir nachsteuern.",
  },
];

const PLATES = 4;
const BAR_KG = 20;
const PLATE_KG = 20;

export default function BarbellStory() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
  const step = steps[index];

  // Wie viele Scheiben liegen schon auf der Stange
  const loaded = Math.min(PLATES, Math.floor(progress * (PLATES + 0.4)));
  const kg = BAR_KG + loaded * PLATE_KG * 2;

  // Die Stange biegt sich unter Last
  const bend = loaded * 2.4;

  const plate = (i: number) => {
    const on = i < loaded;
    const h = 190 - i * 30;
    const y = 160 - h / 2;
    return { on, h, y };
  };

  return (
    <section aria-labelledby="fortschritt-titel" className="relative">
      <div ref={ref} className="seq-track" style={{ height: `${steps.length * 85 + 100}svh` }}>
        <div className="seq-stage !bg-transparent">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(70% 55% at 50% 42%, rgba(255,90,31,${0.08 + loaded * 0.05}), transparent 70%)`,
              transition: "background 0.8s ease",
            }}
          />

          <div className="shell w-full">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="eyebrow">Dein Fortschritt</span>
                <h2 id="fortschritt-titel" className="sr-only">
                  So entwickelt sich dein Training
                </h2>

                <div className="relative mt-5 min-h-[330px] sm:min-h-[300px] lg:min-h-[280px]">
                  {steps.map((s, i) => (
                    <div key={s.title} className="seq-caption" data-active={i === index}>
                      <p className="display-lg">{s.title}</p>
                      <p className="lead mt-5 max-w-[52ch]">{s.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/probetraining/" className="btn btn-primary">
                    Kostenloses Probetraining
                    <Icon name="arrowRight" size={18} strokeWidth={2.1} />
                  </Link>
                  <Link href="/training/" className="btn btn-ghost">
                    Trainingsbereiche
                  </Link>
                </div>
              </div>

              {/* Hantel, die sich beim Scrollen fuellt */}
              <div>
                <div className="glass sweep rounded-[26px] p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
                      Auf der Stange
                    </span>
                    <span className="text-[30px] font-black tabular-nums tracking-tight flame-text sm:text-[36px]">
                      {kg} kg
                    </span>
                  </div>

                  <svg
                    viewBox="90 45 720 230"
                    className="mt-4 w-full"
                    role="img"
                    aria-label={`Langhantel mit ${loaded} von ${PLATES} Scheiben je Seite, insgesamt ${kg} Kilogramm`}
                  >
                    <defs>
                      <linearGradient id="plateFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#ff8a3d" />
                        <stop offset="1" stopColor="#ff5a1f" />
                      </linearGradient>
                    </defs>

                    {/* Stange */}
                    <g
                      style={{
                        transform: `translateY(${bend}px)`,
                        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <rect x="150" y="152" width="600" height="16" rx="8" fill="rgba(244,247,251,0.82)" />
                      <rect x="330" y="148" width="6" height="24" rx="3" fill="rgba(5,7,10,0.5)" />
                      <rect x="564" y="148" width="6" height="24" rx="3" fill="rgba(5,7,10,0.5)" />
                      <rect x="252" y="142" width="12" height="36" rx="4" fill="rgba(244,247,251,0.55)" />
                      <rect x="636" y="142" width="12" height="36" rx="4" fill="rgba(244,247,251,0.55)" />
                    </g>

                    {/* Scheiben links und rechts */}
                    {Array.from({ length: PLATES }).map((_, i) => {
                      const { on, h, y } = plate(i);
                      const lx = 214 - i * 34;
                      const rx = 658 + i * 34;
                      const common = {
                        width: 26,
                        height: h,
                        rx: 9,
                        fill: "url(#plateFill)",
                        style: {
                          opacity: on ? 1 : 0,
                          transform: `translateY(${on ? bend : bend - 26}px) scaleY(${on ? 1 : 0.6})`,
                          transformOrigin: "center",
                          transition: `opacity 0.45s ease ${i * 40}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms`,
                        } as React.CSSProperties,
                      };
                      const ghost = {
                        width: 26,
                        height: h,
                        rx: 9,
                        fill: "none",
                        stroke: "rgba(244,247,251,0.16)",
                        strokeWidth: 2,
                        strokeDasharray: "6 7",
                        style: {
                          opacity: on ? 0 : 1,
                          transform: `translateY(${bend}px)`,
                          transition: "opacity 0.4s ease",
                        } as React.CSSProperties,
                      };
                      return (
                        <g key={i}>
                          <rect x={lx} y={y} {...ghost} />
                          <rect x={rx} y={y} {...ghost} />
                          <rect x={lx} y={y} {...common} />
                          <rect x={rx} y={y} {...common} />
                        </g>
                      );
                    })}
                  </svg>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-flame-400 to-flame-500"
                        style={{
                          width: `${Math.max(4, progress * 100)}%`,
                          transition: "width 0.15s linear",
                        }}
                      />
                    </div>
                    <span className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-faint">
                      Schritt {index + 1} von {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
