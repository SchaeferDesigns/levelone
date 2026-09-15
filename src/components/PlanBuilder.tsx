"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import Icon from "./Icon";
import type { IconName } from "./Icon";

type Goal = "muskel" | "abnehmen" | "ruecken" | "ausdauer" | "einstieg";
type Level = "neu" | "zurueck" | "erfahren";

const goals: { key: Goal; label: string; icon: IconName; note: string }[] = [
  { key: "muskel", label: "Muskeln aufbauen", icon: "dumbbell", note: "Schwer, sauber, planbar steigern" },
  { key: "abnehmen", label: "Abnehmen", icon: "flame", note: "Kraft erhält, Cardio verbrennt" },
  { key: "ruecken", label: "Rücken stärken", icon: "pulse", note: "Rumpf, oberer Rücken, Hüfte" },
  { key: "ausdauer", label: "Fitter werden", icon: "bike", note: "Grundlage für alles andere" },
  { key: "einstieg", label: "Wiedereinstieg", icon: "sparkles", note: "Ruhig starten, Gewohnheit bauen" },
];

const levels: { key: Level; label: string }[] = [
  { key: "neu", label: "Noch nie trainiert" },
  { key: "zurueck", label: "Lange raus" },
  { key: "erfahren", label: "Erfahren" },
];

const volume: Record<Goal, { sets: string; reps: string; extra: string }> = {
  muskel: { sets: "3 bis 4 Sätze", reps: "8 bis 12 Wiederholungen", extra: "Pausen 90 bis 120 Sekunden" },
  abnehmen: { sets: "3 Sätze", reps: "12 bis 15 Wiederholungen", extra: "Kurze Pausen, danach 15 Minuten Cardio" },
  ruecken: { sets: "2 bis 3 Sätze", reps: "12 bis 15 Wiederholungen", extra: "Saubere Ausführung vor Gewicht" },
  ausdauer: { sets: "2 bis 3 Sätze", reps: "15 bis 20 Wiederholungen", extra: "Plus 20 Minuten lockeres Cardio" },
  einstieg: { sets: "2 Sätze", reps: "12 bis 15 Wiederholungen", extra: "Erste vier Wochen bewusst leicht" },
};

const pool: Record<string, { neu: string[]; erfahren: string[] }> = {
  ganz: {
    neu: ["Beinpresse", "Brustpresse", "Rudern am Kabel", "Bauchpresse"],
    erfahren: ["Kniebeuge", "Bankdrücken", "Langhantelrudern", "Beinheben"],
  },
  ganz2: {
    neu: ["Beinbeuger", "Latzug", "Schulterdrücken Maschine", "Rückenstrecker"],
    erfahren: ["Kreuzheben", "Klimmzug", "Schulterdrücken Kurzhantel", "Rumpfstütz"],
  },
  ganz3: {
    neu: ["Ausfallschritte", "Butterfly", "Rudern eng", "Seitheben"],
    erfahren: ["Frontkniebeuge", "Schrägbankdrücken", "Rudern Kurzhantel", "Seitheben"],
  },
  druecken: {
    neu: ["Brustpresse", "Schrägbank Maschine", "Schulterdrücken Maschine", "Trizeps am Kabel"],
    erfahren: ["Bankdrücken", "Schrägbank Kurzhantel", "Schulterdrücken", "Dips"],
  },
  ziehen: {
    neu: ["Latzug", "Rudern am Kabel", "Reverse Butterfly", "Bizeps am Kabel"],
    erfahren: ["Klimmzug", "Langhantelrudern", "Face Pull", "Bizeps Kurzhantel"],
  },
  beine: {
    neu: ["Beinpresse", "Beinstrecker", "Beinbeuger", "Wadenheben"],
    erfahren: ["Kniebeuge", "Rumänisches Kreuzheben", "Beinpresse", "Wadenheben"],
  },
  ober: {
    neu: ["Brustpresse", "Latzug", "Schulterdrücken Maschine", "Bizeps am Kabel"],
    erfahren: ["Bankdrücken", "Klimmzug", "Schulterdrücken", "Trizeps Kurzhantel"],
  },
  unter: {
    neu: ["Beinpresse", "Beinbeuger", "Hüftheben", "Wadenheben"],
    erfahren: ["Kniebeuge", "Beinbeuger", "Hüftheben mit Langhantel", "Wadenheben"],
  },
  rumpf: {
    neu: ["Rückenstrecker", "Bauchpresse", "Seitstütz", "Hüftmobilisation"],
    erfahren: ["Rückenstrecker", "Beinheben hängend", "Seitstütz", "Hüftmobilisation"],
  },
};

function buildPlan(goal: Goal, days: number, level: Level) {
  const hard = level === "erfahren" ? "erfahren" : "neu";
  const pick = (k: string) => pool[k][hard as "neu" | "erfahren"];

  let plan: { title: string; focus: string; items: string[] }[] = [];

  if (days === 2) {
    plan = [
      { title: "Tag 1", focus: "Ganzkörper A", items: pick("ganz") },
      { title: "Tag 2", focus: "Ganzkörper B", items: pick("ganz2") },
    ];
  } else if (days === 3) {
    plan =
      level === "erfahren"
        ? [
            { title: "Tag 1", focus: "Drücken", items: pick("druecken") },
            { title: "Tag 2", focus: "Ziehen", items: pick("ziehen") },
            { title: "Tag 3", focus: "Beine", items: pick("beine") },
          ]
        : [
            { title: "Tag 1", focus: "Ganzkörper A", items: pick("ganz") },
            { title: "Tag 2", focus: "Ganzkörper B", items: pick("ganz2") },
            { title: "Tag 3", focus: "Ganzkörper C", items: pick("ganz3") },
          ];
  } else if (days === 4) {
    plan = [
      { title: "Tag 1", focus: "Oberkörper A", items: pick("ober") },
      { title: "Tag 2", focus: "Unterkörper A", items: pick("unter") },
      { title: "Tag 3", focus: "Oberkörper B", items: pick("druecken") },
      { title: "Tag 4", focus: "Unterkörper B", items: pick("beine") },
    ];
  } else {
    plan = [
      { title: "Tag 1", focus: "Drücken", items: pick("druecken") },
      { title: "Tag 2", focus: "Ziehen", items: pick("ziehen") },
      { title: "Tag 3", focus: "Beine", items: pick("beine") },
      { title: "Tag 4", focus: "Oberkörper", items: pick("ober") },
      { title: "Tag 5", focus: "Rumpf und Mobilität", items: pick("rumpf") },
    ];
  }

  // Beim Rückenziel bekommt der letzte Tag den Rumpfschwerpunkt
  if (goal === "ruecken") {
    plan[plan.length - 1] = {
      ...plan[plan.length - 1],
      focus: "Rücken und Rumpf",
      items: pick("rumpf"),
    };
  }
  return plan;
}

export default function PlanBuilder() {
  const uid = useId();
  const [goal, setGoal] = useState<Goal>("muskel");
  const [days, setDays] = useState(3);
  const [level, setLevel] = useState<Level>("neu");
  const [pulse, setPulse] = useState(0);

  // Bei jeder Änderung läuft der Plan neu ein
  useEffect(() => {
    setPulse((n) => n + 1);
  }, [goal, days, level]);

  const plan = buildPlan(goal, days, level);
  const v = volume[goal];
  const g = goals.find((x) => x.key === goal)!;

  return (
    <div className="glass-strong sweep rounded-[28px] p-6 sm:p-9">
      <div className="grid gap-7 lg:grid-cols-[1.5fr_0.7fr_1fr]">
        <fieldset>
          <legend className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
            Dein Ziel
          </legend>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {goals.map((x) => (
              <button
                key={x.key}
                type="button"
                onClick={() => setGoal(x.key)}
                aria-pressed={goal === x.key}
                className="goal-tab"
              >
                <Icon name={x.icon} size={17} />
                {x.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
            Tage pro Woche
          </legend>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {[2, 3, 4, 5].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                aria-pressed={days === d}
                className="goal-tab min-w-[64px] justify-center"
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
            Erfahrung
          </legend>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => setLevel(l.key)}
                aria-pressed={level === l.key}
                className="goal-tab"
              >
                {l.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 border-t border-white/10 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Dein Vorschlag</span>
            <h3 className="display-md mt-2.5">
              {days} Einheiten, {g.label.toLowerCase()}
            </h3>
            <p className="mt-2 text-[15px] text-mute">{g.note}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {[v.sets, v.reps, v.extra].map((t) => (
              <li
                key={t}
                className="rounded-[999px] border border-white/12 bg-white/5 px-3.5 py-2 text-[13.5px] font-semibold"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div key={pulse} className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plan.map((d, i) => (
            <article
              key={`${uid}-${d.title}`}
              className="plan-card glass rounded-[20px] p-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                  {d.title}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[13px] font-black text-[#160702]">
                  {i + 1}
                </span>
              </div>
              <h4 className="mt-3 text-[19px] font-extrabold tracking-tight">{d.focus}</h4>
              <ul className="mt-4 flex flex-col gap-2">
                {d.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-mute">
                    <Icon name="check" size={13} strokeWidth={3} className="mt-1 shrink-0 text-flame-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/mitglied-werden/" className="btn btn-primary">
            Mit diesem Plan starten
            <Icon name="arrowRight" size={18} strokeWidth={2.1} />
          </Link>
          <Link href="/probetraining/" className="btn btn-ghost">
            Erst kostenlos testen
          </Link>
          <p className="text-[13.5px] text-faint">
            Vorschlag zur Orientierung. Im Studio passen wir ihn an dich an.
          </p>
        </div>
      </div>
    </div>
  );
}
