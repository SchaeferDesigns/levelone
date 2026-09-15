"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { formEndpoint, site } from "@/lib/site";

type Variant = "probetraining" | "kontakt";

type Values = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  wunschtermin: string;
  message: string;
  consent: boolean;
  company: string; // Honeypot
};

const emptyValues: Values = {
  name: "",
  email: "",
  phone: "",
  goal: "",
  wunschtermin: "",
  message: "",
  consent: false,
  company: "",
};

const goals = [
  "Muskelaufbau",
  "Abnehmen und Definition",
  "Rücken und Beweglichkeit",
  "Ausdauer und Gesundheit",
  "Wiedereinstieg nach Pause",
  "Noch unentschlossen",
];

export default function ContactForm({ variant = "kontakt" }: { variant?: Variant }) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isTrial = variant === "probetraining";

  const subject = useMemo(
    () => (isTrial ? "Anfrage Probetraining" : "Anfrage über die Website"),
    [isTrial],
  );

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const formRef = useRef<HTMLFormElement | null>(null);
  const [summary, setSummary] = useState("");

  function focusFirstError(next: Partial<Record<keyof Values, string>>) {
    const order: (keyof Values)[] = ["name", "email", "phone", "message", "consent"];
    const first = order.find((k) => next[k]);
    if (!first) return;
    const selector = first === "consent" ? 'input[type="checkbox"]' : `#f-${first}`;
    const el = formRef.current?.querySelector<HTMLElement>(selector);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function validate() {
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2) next.name = "Bitte gib deinen Namen an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (!isTrial && values.message.trim().length < 10)
      next.message = "Bitte beschreibe dein Anliegen in ein paar Worten.";
    if (!values.consent) next.consent = "Ohne Einwilligung dürfen wir die Anfrage nicht bearbeiten.";
    setErrors(next);
    const count = Object.keys(next).length;
    if (count > 0) {
      setSummary(
        count === 1
          ? "Eine Angabe fehlt oder ist nicht gültig. Das Feld ist markiert."
          : `${count} Angaben fehlen oder sind nicht gültig. Die Felder sind markiert.`,
      );
      focusFirstError(next);
    } else {
      setSummary("");
    }
    return count === 0;
  }

  function buildPlainText() {
    const lines = [
      `Name: ${values.name}`,
      `E-Mail: ${values.email}`,
      values.phone ? `Telefon: ${values.phone}` : "",
      isTrial && values.goal ? `Ziel: ${values.goal}` : "",
      isTrial && values.wunschtermin ? `Wunschtermin: ${values.wunschtermin}` : "",
      values.message ? `Nachricht: ${values.message}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (values.company) return; // Honeypot: stiller Abbruch
    if (!validate()) return;

    if (!formEndpoint) {
      // Ohne konfigurierten Endpunkt oeffnet sich das E-Mail-Programm mit fertiger Nachricht.
      const href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(buildPlainText())}`;
      window.location.href = href;
      setState("sent");
      return;
    }

    try {
      setState("sending");
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...values, company: undefined }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      setValues(emptyValues);
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="glass card text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-ink-950">
          <Icon name="check" size={30} strokeWidth={2.6} />
        </span>
        <h3 className="display-md mt-6">
          {formEndpoint ? "Anfrage ist raus" : "Fast geschafft"}
        </h3>
        <p className="lead mx-auto mt-3 max-w-[52ch]">
          {formEndpoint
            ? "Wir melden uns innerhalb der Servicezeiten bei dir. In der Regel noch am selben Tag."
            : "Wir haben dein E-Mail-Programm mit der fertigen Nachricht geöffnet. Bitte schick sie ab, dann melden wir uns zügig zurück. Falls sich nichts geöffnet hat, erreichst du uns direkt über die Wege unten."}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a className="btn btn-ghost" href={`tel:${site.contact.phone}`}>
            <Icon name="phone" size={18} />
            Lieber direkt anrufen
          </a>
          <a className="btn btn-ghost" href={`mailto:${site.contact.email}`}>
            <Icon name="mail" size={18} />
            {site.contact.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="glass card" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="f-name">
            Name <span className="text-flame-400">*</span>
          </label>
          <input
            id="f-name"
            name="name"
            className="field-input"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "err-name" : undefined}
            placeholder="Vor- und Nachname"
            required
          />
          {errors.name ? (
            <span className="field-error" id="err-name">
              {errors.name}
            </span>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="f-email">
            E-Mail <span className="text-flame-400">*</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            className="field-input"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "err-email" : undefined}
            placeholder="name@beispiel.de"
            required
          />
          {errors.email ? (
            <span className="field-error" id="err-email">
              {errors.email}
            </span>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="f-phone">
            Telefon <span className="text-faint">(optional)</span>
          </label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="field-input"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            placeholder="Für die Rückmeldung"
          />
          {errors.phone ? (
            <span className="field-error" id="err-phone">
              {errors.phone}
            </span>
          ) : null}
        </div>

        {isTrial ? (
          <>
            <div className="sm:col-span-1">
              <label className="field-label" htmlFor="f-goal">
                Dein Ziel
              </label>
              <select
                id="f-goal"
                name="goal"
                className="field-input"
                value={values.goal}
                onChange={(e) => update("goal", e.target.value)}
              >
                <option value="">Bitte auswählen</option>
                {goals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="f-termin">
                Wunschtermin <span className="text-faint">(optional)</span>
              </label>
              <input
                id="f-termin"
                name="wunschtermin"
                className="field-input"
                value={values.wunschtermin}
                onChange={(e) => update("wunschtermin", e.target.value)}
                placeholder="z. B. Dienstag ab 18 Uhr"
              />
            </div>
          </>
        ) : null}

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="f-message">
            Nachricht {isTrial ? <span className="text-faint">(optional)</span> : <span className="text-flame-400">*</span>}
          </label>
          <textarea
            id="f-message"
            name="message"
            className="field-input"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "err-message" : undefined}
            placeholder={
              isTrial
                ? "Gibt es etwas, das wir vorab wissen sollten?"
                : "Worum geht es? Wir antworten so schnell wie möglich."
            }
          />
          {errors.message ? (
            <span className="field-error" id="err-message">
              {errors.message}
            </span>
          ) : null}
        </div>

        {/* Honeypot gegen Spam, fuer Menschen unsichtbar */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="f-company">Firma nicht ausfüllen</label>
          <input
            id="f-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-mute">
            <input
              type="checkbox"
              className="check mt-0.5"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={errors.consent ? "true" : undefined}
              aria-describedby={errors.consent ? "err-consent" : undefined}
              required
            />
            <span>
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
              verwendet werden. Weitere Informationen in der{" "}
              <Link href="/datenschutz/" className="font-semibold text-flame-400 underline underline-offset-4">
                Datenschutzerklärung
              </Link>
              .
            </span>
          </label>
          {errors.consent ? (
            <span className="field-error" id="err-consent">
              {errors.consent}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Wird gesendet" : isTrial ? "Probetraining anfragen" : "Nachricht senden"}
          <Icon name="arrowRight" size={18} strokeWidth={2.1} />
        </button>
        <p className="text-[13.5px] text-faint">
          Antwort in der Regel am selben Werktag. Keine Weitergabe an Dritte.
        </p>
      </div>

      <p aria-live="polite" className={summary ? "field-error mt-4" : "sr-only"}>
        {summary || (state === "error" ? "Das Senden hat nicht funktioniert." : "")}
      </p>

      {state === "error" ? (
        <div className="mt-5 rounded-2xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 p-4 text-[14.5px]">
          Das Senden hat gerade nicht funktioniert. Bitte ruf uns kurz an unter{" "}
          <a className="font-bold underline underline-offset-4" href={`tel:${site.contact.phone}`}>
            {site.contact.phoneDisplay}
          </a>{" "}
          oder schreib an{" "}
          <a className="font-bold underline underline-offset-4" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </div>
      ) : null}
    </form>
  );
}
