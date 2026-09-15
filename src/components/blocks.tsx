import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";
import type { IconName } from "./Icon";
import Reveal from "./Reveal";
import Cta from "./Cta";
import { site } from "@/lib/site";

/* ---------------------------------------------------------------- Karten */

export function FeatureCard({
  icon,
  title,
  text,
  href,
  delay = 0,
}: {
  icon: IconName;
  title: string;
  text: string;
  href?: string;
  delay?: number;
}) {
  const inner = (
    <>
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
        <Icon name={icon} size={23} />
      </span>
      <h3 className="mt-5 text-[19px] font-extrabold tracking-tight">{title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{text}</p>
      {href ? (
        <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-bold text-flame-400">
          Mehr erfahren
          <Icon name="arrowRight" size={16} strokeWidth={2.2} />
        </span>
      ) : null}
    </>
  );

  return (
    <Reveal delay={delay} className="h-full">
      {href ? (
        <Link href={href} className="glass card card-hover block h-full">
          {inner}
        </Link>
      ) : (
        <div className="glass card card-hover h-full">{inner}</div>
      )}
    </Reveal>
  );
}

export function TileList({ items }: { items: { icon: IconName; label: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.label} className="flex">
          <Reveal delay={i * 45} className="w-full">
            <div className="glass flex h-full items-center gap-3.5 rounded-2xl px-5 py-4">
              <Icon name={it.icon} size={20} className="shrink-0 text-flame-400" />
              <span className="text-[15px] font-semibold">{it.label}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------- Kennzahlen */

export function StatStrip({
  items,
}: {
  items: { value: string; label: string; icon: IconName }[];
}) {
  return (
    <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[22px] lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-2 px-5 py-7 text-center">
          <Icon name={s.icon} size={22} className="text-flame-400" />
          <span className="text-[26px] font-black leading-none tracking-tight sm:text-[30px]">
            {s.value}
          </span>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-faint sm:text-[13px] sm:tracking-[0.1em]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ Seitenkopf */

export function PageHero({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
      <div className="shell">
        <Reveal immediate className="max-w-[820px]">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-lg mt-5">{title}</h1>
          <p className="lead mt-6 max-w-[62ch]">{text}</p>
          {primary || secondary ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary ? <Cta href={primary.href}>{primary.label}</Cta> : null}
              {secondary ? (
                <Cta href={secondary.href} variant="ghost" icon="arrowRight">
                  {secondary.label}
                </Cta>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Schrittfolge */

export function Steps({
  items,
}: {
  items: { title: string; text: string; icon: IconName }[];
}) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={i * 90} className="h-full">
            <div className="glass card card-hover h-full">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[17px] font-black text-ink-950">
                  {i + 1}
                </span>
                <Icon name={s.icon} size={22} className="text-flame-400" />
              </div>
              <h3 className="mt-5 text-[19px] font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------ Abschluss Aufruf */

export function CtaBand({
  title = "Bereit für dein erstes Training?",
  text = "Komm vorbei, sieh dir das Studio in Ruhe an und trainiere unverbindlich zur Probe. Wir nehmen uns Zeit für dich.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[30px] px-7 py-14 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flame-500/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-flame-400/18 blur-3xl"
            />
            <div className="relative">
              <span className="eyebrow">Jetzt starten</span>
              <h2 className="display-lg mx-auto mt-4 max-w-[20ch]">{title}</h2>
              <p className="lead mx-auto mt-5 max-w-[56ch]">{text}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Cta href="/probetraining/">Kostenloses Probetraining</Cta>
                <Cta href={`tel:${site.contact.phone}`} variant="ghost" icon="phone" external>
                  {site.contact.phoneDisplay}
                </Cta>
              </div>
              <p className="mt-6 text-[13.5px] text-faint">
                Unverbindlich, ohne Vertrag und ohne versteckte Kosten.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Bildflaeche */

export function MediaFrame({
  label,
  icon = "dumbbell",
  ratio = "4/3",
  className = "",
}: {
  label: string;
  icon?: IconName;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`glass media-frame relative overflow-hidden rounded-[24px] ${className}`}
      style={{ "--frame-ratio": ratio } as React.CSSProperties}
      role="img"
      aria-label={label}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,138,61,0.28),transparent_60%),radial-gradient(90%_80%_at_100%_100%,rgba(56,120,255,0.22),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(70% 70% at 50% 50%, #000, transparent)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/16 bg-white/8 text-chalk">
          <Icon name={icon} size={26} />
        </span>
        <span className="text-[14px] font-semibold text-mute">{label}</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Hinweis */

export function NoticeCard({
  icon = "info",
  title,
  text,
  action,
}: {
  icon?: IconName;
  title: string;
  text: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="glass card">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
            <Icon name={icon} size={22} />
          </span>
          <div>
            <h3 className="text-[18px] font-extrabold tracking-tight">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
          </div>
        </div>
        {action ? (
          <Cta href={action.href} variant="ghost" className="self-start">
            {action.label}
          </Cta>
        ) : null}
      </div>
    </div>
  );
}
