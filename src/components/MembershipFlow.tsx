"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import { preis, tarife } from "@/lib/tarife";
import { site } from "@/lib/site";

type Zahlung = "sepa" | "rechnung";

type Data = {
  tarif: string;
  start: string;
  anrede: string;
  vorname: string;
  nachname: string;
  geburt: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  partnerName: string;
  partnerEmail: string;
  quelle: string;
  zahlung: Zahlung;
  kontoinhaber: string;
  agb: boolean;
  datenschutz: boolean;
};

const leer: Data = {
  tarif: "classic",
  start: "",
  anrede: "",
  vorname: "",
  nachname: "",
  geburt: "",
  email: "",
  telefon: "",
  strasse: "",
  plz: "",
  ort: "",
  partnerName: "",
  partnerEmail: "",
  quelle: "",
  zahlung: "sepa",
  kontoinhaber: "",
  agb: false,
  datenschutz: false,
};

const schritte = ["Tarif", "Start", "Daten", "Zahlung", "Übersicht"];
const quellen = ["Suchmaschine", "Empfehlung", "Social Media", "Vorbeigefahren", "Sonstiges"];

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function datum(s: string) {
  return s ? new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }) : "offen";
}

function alter(geburt: string) {
  if (!geburt) return 0;
  const g = new Date(geburt);
  const h = new Date();
  let a = h.getFullYear() - g.getFullYear();
  const m = h.getMonth() - g.getMonth();
  if (m < 0 || (m === 0 && h.getDate() < g.getDate())) a -= 1;
  return a;
}

export default function MembershipFlow() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(leer);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [done, setDone] = useState(false);

  const heute = useMemo(() => new Date(), []);
  const morgen = useMemo(() => new Date(heute.getFullYear(), heute.getMonth(), heute.getDate() + 1), [heute]);
  const ersterNaechster = useMemo(
    () => new Date(heute.getFullYear(), heute.getMonth() + 1, 1),
    [heute],
  );
  const ersterUebernaechster = useMemo(
    () => new Date(heute.getFullYear(), heute.getMonth() + 2, 1),
    [heute],
  );

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tarif");
    setD((v) => ({
      ...v,
      tarif: fromUrl && tarife.some((t) => t.key === fromUrl) ? fromUrl : v.tarif,
      start: iso(ersterNaechster),
    }));
  }, [ersterNaechster]);

  const tarif = tarife.find((t) => t.key === d.tarif) ?? tarife[1];
  const istDuo = tarif.key === "duo";
  const monate = tarif.laufzeit.startsWith("12") ? 12 : 0;
  const erstesJahr = tarif.monat * 12 + tarif.aufnahme;

  function set<K extends keyof Data>(k: K, v: Data[K]) {
    setD((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function focusFirst(e: Partial<Record<keyof Data, string>>) {
    const first = Object.keys(e)[0];
    if (!first) return;
    const el = document.getElementById(`m-${first}`);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function validate(s: number) {
    const e: Partial<Record<keyof Data, string>> = {};
    if (s === 1) {
      if (!d.start) e.start = "Bitte wähle ein Startdatum.";
      else if (new Date(d.start) < new Date(iso(heute))) e.start = "Das Startdatum liegt in der Vergangenheit.";
    }
    if (s === 2) {
      if (d.vorname.trim().length < 2) e.vorname = "Bitte gib deinen Vornamen an.";
      if (d.nachname.trim().length < 2) e.nachname = "Bitte gib deinen Nachnamen an.";
      if (!d.geburt) e.geburt = "Bitte gib dein Geburtsdatum an.";
      else if (alter(d.geburt) < 15) e.geburt = "Ein Abschluss ist ab 15 Jahren möglich.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Bitte gib eine gültige E-Mail an.";
      if (d.telefon.replace(/\D/g, "").length < 7) e.telefon = "Bitte gib eine erreichbare Telefonnummer an.";
      if (d.strasse.trim().length < 4) e.strasse = "Bitte gib Straße und Hausnummer an.";
      if (!/^\d{5}$/.test(d.plz.trim())) e.plz = "Die Postleitzahl hat fünf Ziffern.";
      if (d.ort.trim().length < 2) e.ort = "Bitte gib deinen Wohnort an.";
      if (istDuo && d.partnerName.trim().length < 3)
        e.partnerName = "Für den Duo-Tarif brauchen wir den Namen der zweiten Person.";
    }
    if (s === 3 && d.zahlung === "sepa" && d.kontoinhaber.trim().length < 3) {
      e.kontoinhaber = "Bitte gib an, wer das Konto führt.";
    }
    if (s === 4) {
      if (!d.agb) e.agb = "Bitte bestätige die Vertragsbedingungen.";
      if (!d.datenschutz) e.datenschutz = "Bitte bestätige die Datenschutzhinweise.";
    }
    setErrors(e);
    if (Object.keys(e).length) focusFirst(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    if (step === schritte.length - 1) {
      setDone(true);
      window.scrollTo({ top: Math.max(0, window.scrollY - 200), behavior: "smooth" });
      return;
    }
    setStep((s) => s + 1);
  }

  const feld = (
    k: keyof Data,
    label: string,
    opts: { type?: string; autoComplete?: string; hint?: string; span?: boolean; inputMode?: "text" | "tel" | "email" | "numeric"; max?: string } = {},
  ) => (
    <div className={opts.span ? "sm:col-span-2" : undefined}>
      <label className="field-label" htmlFor={`m-${k}`}>
        {label}
      </label>
      <input
        id={`m-${k}`}
        type={opts.type ?? "text"}
        inputMode={opts.inputMode}
        max={opts.max}
        autoComplete={opts.autoComplete}
        className="field-input"
        value={d[k] as string}
        onChange={(e) => set(k, e.target.value as Data[typeof k])}
        aria-invalid={errors[k] ? "true" : undefined}
        aria-describedby={errors[k] ? `err-${k}` : opts.hint ? `hint-${k}` : undefined}
      />
      {errors[k] ? (
        <span className="field-error" id={`err-${k}`}>
          {errors[k]}
        </span>
      ) : opts.hint ? (
        <span className="mt-1.5 block text-[13px] text-faint" id={`hint-${k}`}>
          {opts.hint}
        </span>
      ) : null}
    </div>
  );

  if (done) {
    return (
      <div className="glass-strong rounded-[28px] p-8 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[#160702]">
          <Icon name="check" size={30} strokeWidth={2.6} />
        </span>
        <h2 className="display-md mt-6">Das war der komplette Ablauf</h2>
        <p className="lead mx-auto mt-4 max-w-[56ch]">
          In dieser Vorschau wurde nichts abgeschickt und kein Vertrag geschlossen. Im scharfen
          Betrieb ginge jetzt die Bestätigung an {d.email || "deine Adresse"} raus und dein Zutritt
          wäre ab dem {datum(d.start)} freigeschaltet.
        </p>
        <div className="mx-auto mt-8 max-w-[440px] rounded-[18px] border border-white/10 bg-white/4 p-5 text-left">
          <dl className="flex flex-col gap-2.5 text-[15px]">
            {[
              ["Tarif", `${tarif.name}, ${preis(tarif.monat)} € pro Monat`],
              ["Start", datum(d.start)],
              ["Zahlung", d.zahlung === "sepa" ? "SEPA-Lastschrift" : "Rechnung"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-mute">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
          >
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
    <div className="glass-strong rounded-[28px] p-6 sm:p-9">
      {/* Schrittanzeige, erledigte Schritte sind anklickbar */}
      <ol className="flex flex-wrap items-center gap-2" aria-label="Fortschritt">
        {schritte.map((s, i) => {
          const erledigt = i < step;
          const inner = (
            <>
              {erledigt ? <Icon name="check" size={13} strokeWidth={3} /> : <span>{i + 1}</span>}
              {s}
            </>
          );
          return (
            <li key={s}>
              {erledigt ? (
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className="flex items-center gap-2 rounded-[999px] border border-white/14 bg-white/8 px-3.5 py-1.5 text-[13px] font-bold transition-colors hover:border-flame-400/60"
                >
                  {inner}
                </button>
              ) : (
                <span
                  aria-current={i === step ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-[999px] px-3.5 py-1.5 text-[13px] font-bold ${
                    i === step
                      ? "bg-gradient-to-br from-flame-400 to-flame-500 text-[#160702]"
                      : "border border-white/10 text-faint"
                  }`}
                >
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 min-h-[360px]">
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
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
                      {t.name}
                    </span>
                    {d.tarif === t.key ? (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[#160702]">
                        <Icon name="check" size={13} strokeWidth={3} />
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-black leading-none tabular-nums">
                      {preis(t.monat)}
                    </span>
                    <span className="text-[15px] font-bold text-mute">€ pro Monat</span>
                  </span>
                  <span className="mt-3 block text-[14px] text-mute">{t.laufzeit}</span>
                  <span className="block text-[14px] text-mute">{t.kuendigung}</span>
                  <span className="mt-2 block text-[14px] text-flame-400">
                    {t.aufnahme === 0 ? "Keine Aufnahmegebühr" : `Aufnahme ${preis(t.aufnahme)} €`}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* 2 Start */}
        {step === 1 ? (
          <div className="plan-card">
            <h2 className="display-md">Wann geht es los?</h2>
            <p className="mt-3 max-w-[54ch] text-[15px] text-mute">
              Ab diesem Tag ist dein Zutritt rund um die Uhr freigeschaltet.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { l: "So früh wie möglich", v: iso(morgen) },
                { l: `Ab ${ersterNaechster.toLocaleDateString("de-DE", { month: "long" })}`, v: iso(ersterNaechster) },
                { l: `Ab ${ersterUebernaechster.toLocaleDateString("de-DE", { month: "long" })}`, v: iso(ersterUebernaechster) },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => set("start", o.v)}
                  aria-pressed={d.start === o.v}
                  className="goal-tab"
                >
                  {o.l}
                </button>
              ))}
            </div>

            <div className="mt-6 max-w-[320px]">
              <label className="field-label" htmlFor="m-start">
                Oder ein eigenes Datum
              </label>
              <input
                id="m-start"
                type="date"
                min={iso(morgen)}
                className="field-input"
                value={d.start}
                onChange={(e) => set("start", e.target.value)}
                aria-invalid={errors.start ? "true" : undefined}
              />
              {errors.start ? <span className="field-error">{errors.start}</span> : null}
            </div>

            <p className="mt-6 rounded-[16px] border border-white/10 bg-white/4 p-4 text-[14.5px] text-mute">
              Gewählt: <strong className="font-bold text-chalk">{datum(d.start)}</strong>
              {monate ? `, Mindestlaufzeit ${monate} Monate` : ", ohne Mindestlaufzeit"}
            </p>
          </div>
        ) : null}

        {/* 3 Daten */}
        {step === 2 ? (
          <div className="plan-card">
            <h2 className="display-md">Deine Daten</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="m-anrede">
                  Anrede <span className="text-faint">(optional)</span>
                </label>
                <select
                  id="m-anrede"
                  className={`field-input ${d.anrede ? "" : "text-faint"}`}
                  value={d.anrede}
                  onChange={(e) => set("anrede", e.target.value)}
                >
                  <option value="">Keine Angabe</option>
                  <option value="Frau">Frau</option>
                  <option value="Herr">Herr</option>
                  <option value="Divers">Divers</option>
                </select>
              </div>
              <div />
              {feld("vorname", "Vorname", { autoComplete: "given-name" })}
              {feld("nachname", "Nachname", { autoComplete: "family-name" })}
              {feld("geburt", "Geburtsdatum", { type: "date", autoComplete: "bday", max: iso(heute), hint: "Ab 15 Jahren, unter 18 mit Einwilligung der Eltern" })}
              {feld("telefon", "Telefon", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
              {feld("email", "E-Mail", { type: "email", inputMode: "email", autoComplete: "email", span: true, hint: "Hierhin geht die Bestätigung" })}
              {feld("strasse", "Straße und Hausnummer", { autoComplete: "street-address", span: true })}
              {feld("plz", "Postleitzahl", { inputMode: "numeric", autoComplete: "postal-code" })}
              {feld("ort", "Ort", { autoComplete: "address-level2" })}

              {istDuo ? (
                <>
                  <div className="sm:col-span-2 mt-2 rounded-[16px] border border-flame-500/25 bg-flame-500/8 p-4 text-[14.5px]">
                    Der Duo-Tarif gilt für zwei Personen. Die zweite Person bekommt eine eigene
                    Einladung per E-Mail.
                  </div>
                  {feld("partnerName", "Name der zweiten Person")}
                  {feld("partnerEmail", "E-Mail der zweiten Person", { type: "email", inputMode: "email" })}
                </>
              ) : null}

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="m-quelle">
                  Wie hast du von uns erfahren? <span className="text-faint">(optional)</span>
                </label>
                <select
                  id="m-quelle"
                  className={`field-input ${d.quelle ? "" : "text-faint"}`}
                  value={d.quelle}
                  onChange={(e) => set("quelle", e.target.value)}
                >
                  <option value="">Keine Angabe</option>
                  {quellen.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : null}

        {/* 4 Zahlung */}
        {step === 3 ? (
          <div className="plan-card">
            <h2 className="display-md">Zahlung</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <fieldset>
                <legend className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
                  Zahlungsart
                </legend>
                <div className="mt-3.5 flex flex-col gap-3">
                  {(
                    [
                      ["sepa", "SEPA-Lastschrift", "Monatlicher Einzug, nichts zu tun"],
                      ["rechnung", "Rechnung", "Überweisung zum Monatsanfang"],
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

                {d.zahlung === "sepa" ? (
                  <div className="mt-5">
                    {feld("kontoinhaber", "Kontoinhaber", { autoComplete: "name", hint: "Nur der Name, keine Bankdaten in dieser Vorschau" })}
                  </div>
                ) : null}
              </fieldset>

              <div className="glass rounded-[20px] p-5">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
                  Was abgebucht wird
                </p>
                <dl className="mt-4 flex flex-col gap-2.5 text-[15px]">
                  {[
                    ["Monatsbeitrag", `${preis(tarif.monat)} €`],
                    ["Aufnahmegebühr", tarif.aufnahme === 0 ? "entfällt" : `${preis(tarif.aufnahme)} €`],
                    ["Erste Abbuchung", datum(d.start)],
                    ["Rhythmus", "monatlich zum Ersten"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-mute">{k}</dt>
                      <dd className="text-right font-semibold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-white/10 pt-4 text-[13.5px] text-faint">
                  Bankverbindung und Mandat werden in dieser Vorschau bewusst nicht erfasst. Im
                  scharfen Betrieb läuft der Schritt über den Zahlungsdienstleister.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* 5 Übersicht */}
        {step === 4 ? (
          <div className="plan-card">
            <h2 className="display-md">Alles richtig?</h2>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {[
                {
                  titel: "Tarif",
                  schritt: 0,
                  zeilen: [
                    [tarif.name, `${preis(tarif.monat)} € pro Monat`],
                    ["Laufzeit", tarif.laufzeit],
                    ["Kündigung", tarif.kuendigung],
                  ],
                },
                {
                  titel: "Start",
                  schritt: 1,
                  zeilen: [
                    ["Erster Trainingstag", datum(d.start)],
                    ["Zutritt", "rund um die Uhr, sieben Tage"],
                  ],
                },
                {
                  titel: "Deine Daten",
                  schritt: 2,
                  zeilen: [
                    ["Name", `${d.anrede} ${d.vorname} ${d.nachname}`.trim() || "offen"],
                    ["E-Mail", d.email || "offen"],
                    ["Telefon", d.telefon || "offen"],
                    ["Adresse", `${d.strasse}, ${d.plz} ${d.ort}`.replace(/^, |, $/g, "") || "offen"],
                    ...(istDuo ? ([["Zweite Person", d.partnerName || "offen"]] as [string, string][]) : []),
                  ],
                },
                {
                  titel: "Zahlung",
                  schritt: 3,
                  zeilen: [
                    ["Art", d.zahlung === "sepa" ? "SEPA-Lastschrift" : "Rechnung"],
                    ...(d.zahlung === "sepa" ? ([["Kontoinhaber", d.kontoinhaber || "offen"]] as [string, string][]) : []),
                    ["Erste Abbuchung", datum(d.start)],
                  ],
                },
              ].map((b) => (
                <div key={b.titel} className="glass rounded-[20px] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-faint">
                      {b.titel}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(b.schritt)}
                      className="text-[13.5px] font-bold text-flame-400 underline underline-offset-4"
                    >
                      Ändern
                    </button>
                  </div>
                  <dl className="mt-3.5 flex flex-col gap-2 text-[15px]">
                    {b.zeilen.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="text-mute">{k}</dt>
                        <dd className="text-right font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[20px] border border-flame-500/25 bg-flame-500/8 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-[15px] font-bold">
                  {monate ? "Kosten im ersten Jahr" : "Kosten pro Monat"}
                </span>
                <span className="text-[28px] font-black tabular-nums flame-text">
                  {preis(monate ? erstesJahr : tarif.monat)} €
                </span>
              </div>
              <p className="mt-2 text-[13.5px] text-mute">
                {monate
                  ? `${preis(tarif.monat)} € mal zwölf Monate, keine Aufnahmegebühr.`
                  : "Monatlich kündbar, keine Aufnahmegebühr."}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3.5">
              <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-mute">
                <input
                  type="checkbox"
                  className="check mt-0.5"
                  checked={d.agb}
                  onChange={(e) => set("agb", e.target.checked)}
                  aria-invalid={errors.agb ? "true" : undefined}
                />
                <span>
                  Ich akzeptiere die{" "}
                  <Link href="/agb/" className="font-semibold text-flame-400 underline underline-offset-4">
                    Vertragsbedingungen
                  </Link>{" "}
                  und habe die{" "}
                  <Link href="/widerruf/" className="font-semibold text-flame-400 underline underline-offset-4">
                    Widerrufsbelehrung
                  </Link>{" "}
                  gelesen.
                </span>
              </label>
              {errors.agb ? <span className="field-error">{errors.agb}</span> : null}

              <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-mute">
                <input
                  type="checkbox"
                  className="check mt-0.5"
                  checked={d.datenschutz}
                  onChange={(e) => set("datenschutz", e.target.checked)}
                  aria-invalid={errors.datenschutz ? "true" : undefined}
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
