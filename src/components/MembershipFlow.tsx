"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { preis, tarife } from "@/lib/tarife";
import { site } from "@/lib/site";

type Data = {
  tarif: string;
  start: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  geburt: string;
  strasse: string;
  plz: string;
  ort: string;
  zahlung: "sepa" | "rechnung";
  agb: boolean;
  datenschutz: boolean;
};

const leer: Data = {
  tarif: "classic",
  start: "",
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  geburt: "",
  strasse: "",
  plz: "",
  ort: "",
  zahlung: "sepa",
  agb: false,
  datenschutz: false,
};

const schritte = ["Tarif", "Start", "Daten", "Zahlung", "Übersicht"];

export default function MembershipFlow({ start }: { start?: string }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(leer);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tarif");
    const wanted = start ?? fromUrl ?? "";
    if (wanted && tarife.some((t) => t.key === wanted)) {
      setD((v) => ({ ...v, tarif: wanted }));
    }
    // Startdatum: kommender Monatserster
    const n = new Date();
    const next = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    setD((v) => ({ ...v, start: next.toISOString().slice(0, 10) }));
  }, [start]);

  const tarif = tarife.find((t) => t.key === d.tarif) ?? tarife[1];

  function set<K extends keyof Data>(k: K, v: Data[K]) {
    setD((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(s: number) {
    const e: Partial<Record<keyof Data, string>> = {};
    if (s === 1 && !d.start) e.start = "Bitte wähle ein Startdatum.";
    if (s === 2) {
      if (d.vorname.trim().length < 2) e.vorname = "Bitte gib deinen Vornamen an.";
      if (d.nachname.trim().length < 2) e.nachname = "Bitte gib deinen Nachnamen an.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Bitte gib eine gültige E-Mail an.";
      if (d.telefon.trim().length < 6) e.telefon = "Bitte gib eine Telefonnummer an.";
      if (!d.geburt) e.geburt = "Bitte gib dein Geburtsdatum an.";
    }
    if (s === 4) {
      if (!d.agb) e.agb = "Bitte bestätige die Vertragsbedingungen.";
      if (!d.datenschutz) e.datenschutz = "Bitte bestätige die Datenschutzhinweise.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    if (step === schritte.length - 1) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }

  if (done) {
    return (
      <div className="glass-strong sweep rounded-[28px] p-8 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[#160702]">
          <Icon name="check" size={30} strokeWidth={2.6} />
        </span>
        <h2 className="display-md mt-6">Das war der komplette Ablauf</h2>
        <p className="lead mx-auto mt-4 max-w-[54ch]">
          In dieser Vorschau wurde nichts abgeschickt und kein Vertrag geschlossen. Im scharfen
          Betrieb ginge jetzt die Bestätigung an dich raus und der Zugang wäre zum{" "}
          {d.start ? new Date(d.start).toLocaleDateString("de-DE") : "gewählten Datum"} aktiv.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => { setDone(false); setStep(0); }}>
            Ablauf nochmal ansehen
          </button>
          <Link href="/probetraining/" className="btn btn-primary">
            Kostenloses Probetraining
            <Icon name="arrowRight" size={18} strokeWidth={2.1} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong sweep rounded-[28px] p-6 sm:p-9">
      {/* Schrittanzeige */}
      <ol className="flex flex-wrap items-center gap-2" aria-label="Fortschritt">
        {schritte.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              aria-current={i === step ? "step" : undefined}
              className={`flex items-center gap-2 rounded-[999px] px-3.5 py-1.5 text-[13px] font-bold transition-colors duration-400 ${
                i === step
                  ? "bg-gradient-to-br from-flame-400 to-flame-500 text-[#160702]"
                  : i < step
                    ? "border border-white/14 bg-white/8 text-chalk"
                    : "border border-white/10 text-faint"
              }`}
            >
              {i < step ? <Icon name="check" size={13} strokeWidth={3} /> : <span>{i + 1}</span>}
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 min-h-[320px]">
        {/* 1 Tarif */}
        {step === 0 ? (
          <fieldset className="plan-card">
            <legend className="display-md">Tarif wählen</legend>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {tarife.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => set("tarif", t.key)}
                  aria-pressed={d.tarif === t.key}
                  className={`glass rounded-[20px] p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                    d.tarif === t.key ? "ring-2 ring-flame-500" : ""
                  }`}
                >
                  <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
                    {t.name}
                  </span>
                  <span className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-black leading-none tabular-nums">
                      {preis(t.monat)}
                    </span>
                    <span className="text-[15px] font-bold text-mute">€ pro Monat</span>
                  </span>
                  <span className="mt-3 block text-[14px] text-mute">{t.laufzeit}</span>
                  <span className="block text-[14px] text-mute">{t.kuendigung}</span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* 2 Start */}
        {step === 1 ? (
          <div className="plan-card max-w-[420px]">
            <h2 className="display-md">Wann geht es los?</h2>
            <label className="field-label mt-6" htmlFor="m-start">
              Startdatum
            </label>
            <input
              id="m-start"
              type="date"
              className="field-input"
              value={d.start}
              onChange={(e) => set("start", e.target.value)}
              aria-invalid={errors.start ? "true" : undefined}
            />
            {errors.start ? <span className="field-error">{errors.start}</span> : null}
            <p className="mt-4 text-[14.5px] text-mute">
              Dein Zutritt ist ab diesem Tag rund um die Uhr freigeschaltet.
            </p>
          </div>
        ) : null}

        {/* 3 Daten */}
        {step === 2 ? (
          <div className="plan-card">
            <h2 className="display-md">Deine Daten</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {([
                ["vorname", "Vorname", "given-name", "text"],
                ["nachname", "Nachname", "family-name", "text"],
                ["email", "E-Mail", "email", "email"],
                ["telefon", "Telefon", "tel", "tel"],
                ["geburt", "Geburtsdatum", "bday", "date"],
                ["strasse", "Straße und Nummer", "street-address", "text"],
                ["plz", "Postleitzahl", "postal-code", "text"],
                ["ort", "Ort", "address-level2", "text"],
              ] as const).map(([k, label, ac, type]) => (
                <div key={k}>
                  <label className="field-label" htmlFor={`m-${k}`}>
                    {label}
                  </label>
                  <input
                    id={`m-${k}`}
                    type={type}
                    autoComplete={ac}
                    className="field-input"
                    value={d[k] as string}
                    onChange={(e) => set(k, e.target.value)}
                    aria-invalid={errors[k] ? "true" : undefined}
                  />
                  {errors[k] ? <span className="field-error">{errors[k]}</span> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 4 Zahlung */}
        {step === 3 ? (
          <fieldset className="plan-card max-w-[560px]">
            <legend className="display-md">Zahlungsart</legend>
            <div className="mt-6 flex flex-col gap-3">
              {(
                [
                  ["sepa", "SEPA-Lastschrift", "Monatlicher Einzug zum Ersten"],
                  ["rechnung", "Rechnung", "Zahlung per Überweisung"],
                ] as const
              ).map(([k, t, sub]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => set("zahlung", k)}
                  aria-pressed={d.zahlung === k}
                  className={`glass flex items-center gap-4 rounded-[18px] p-5 text-left transition-all duration-300 ${
                    d.zahlung === k ? "ring-2 ring-flame-500" : ""
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                    <Icon name={k === "sepa" ? "euro" : "document"} size={21} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold">{t}</span>
                    <span className="block text-[14px] text-mute">{sub}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-5 rounded-[16px] border border-white/10 bg-white/4 p-4 text-[14px] text-mute">
              Bankdaten werden in dieser Vorschau bewusst nicht abgefragt. Im scharfen Betrieb
              läuft dieser Schritt über den Zahlungsdienstleister oder direkt im Studio.
            </p>
          </fieldset>
        ) : null}

        {/* 5 Übersicht */}
        {step === 4 ? (
          <div className="plan-card">
            <h2 className="display-md">Übersicht</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Tarif", `${tarif.name}, ${preis(tarif.monat)} € pro Monat`],
                ["Laufzeit", `${tarif.laufzeit}, ${tarif.kuendigung.toLowerCase()}`],
                ["Start", d.start ? new Date(d.start).toLocaleDateString("de-DE") : "offen"],
                ["Name", `${d.vorname} ${d.nachname}`.trim() || "offen"],
                ["E-Mail", d.email || "offen"],
                ["Zahlung", d.zahlung === "sepa" ? "SEPA-Lastschrift" : "Rechnung"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[16px] border border-white/10 bg-white/4 p-4">
                  <dt className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[16px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3.5">
              <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-mute">
                <input
                  type="checkbox"
                  className="check mt-0.5"
                  checked={d.agb}
                  onChange={(e) => set("agb", e.target.checked)}
                />
                <span>
                  Ich akzeptiere die{" "}
                  <Link href="/agb/" className="font-semibold text-flame-400 underline underline-offset-4">
                    Vertragsbedingungen
                  </Link>{" "}
                  und die{" "}
                  <Link href="/widerruf/" className="font-semibold text-flame-400 underline underline-offset-4">
                    Widerrufsbelehrung
                  </Link>
                  .
                </span>
              </label>
              {errors.agb ? <span className="field-error">{errors.agb}</span> : null}

              <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-mute">
                <input
                  type="checkbox"
                  className="check mt-0.5"
                  checked={d.datenschutz}
                  onChange={(e) => set("datenschutz", e.target.checked)}
                />
                <span>
                  Ich habe die{" "}
                  <Link href="/datenschutz/" className="font-semibold text-flame-400 underline underline-offset-4">
                    Datenschutzhinweise
                  </Link>{" "}
                  gelesen.
                </span>
              </label>
              {errors.datenschutz ? <span className="field-error">{errors.datenschutz}</span> : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Steuerung */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Zurück
        </button>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[14.5px] text-mute">
            {tarif.name}, {preis(tarif.monat)} € pro Monat
          </span>
          <button type="button" className="btn btn-primary" onClick={next}>
            {step === schritte.length - 1 ? "Abschluss ansehen" : "Weiter"}
            <Icon name="arrowRight" size={18} strokeWidth={2.1} />
          </button>
        </div>
      </div>

      <p className="mt-5 text-[13px] text-faint">
        Fragen vorab? Ruf einfach an unter{" "}
        <a href={`tel:${site.contact.phone}`} className="font-semibold text-chalk">
          {site.contact.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
