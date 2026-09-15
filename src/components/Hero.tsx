"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";

/**
 * Startbild mit Tiefenwirkung. Die Ebenen bewegen sich beim Scrollen
 * unterschiedlich schnell, die Uhr zeigt die tatsächliche Uhrzeit.
 * Bei ruhiger Darstellung steht alles still.
 */
export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState<string | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Berlin",
        }).format(new Date()),
      );
    tick();
    const timer = window.setInterval(tick, 20000);

    if (reduced.current) return () => window.clearInterval(timer);

    let frame = 0;
    const measure = () => {
      frame = 0;
      setOffset(Math.min(window.scrollY, 900));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[112px] pb-16 sm:pt-[128px]">
      {/* Hintergrundebenen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${offset * 0.28}px, 0)` }}
      >
        <div className="absolute -right-[12%] -top-[18%] h-[62vw] w-[62vw] max-w-[860px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.4),transparent_66%)] blur-[80px]" />
        <div className="absolute -left-[16%] top-[42%] h-[52vw] w-[52vw] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(56,120,255,0.3),transparent_66%)] blur-[90px]" />
      </div>

      {/* Umrisswort im Hintergrund */}
      <span
        aria-hidden="true"
        className="outline-text pointer-events-none absolute -z-10 select-none whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-[-0.05em] opacity-[0.22]"
        style={{
          left: "50%",
          top: "52%",
          transform: `translate3d(-50%, calc(-50% + ${offset * -0.12}px), 0)`,
        }}
      >
        Level One
      </span>

      <div className="shell relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.24fr)_minmax(0,0.76fr)]">
          <div className="min-w-0" style={{ transform: `translate3d(0, ${offset * -0.05}px, 0)` }}>
            <span className="glass inline-flex items-center gap-2.5 rounded-[999px] px-4 py-2 text-[13px] font-bold">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-flame-500"
                style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
              />
              {now ? `Jetzt ${now} Uhr. Geöffnet.` : "Immer geöffnet."}
            </span>

            <h1 className="display-hero mt-7">
              Trainieren
              <br />
              wann <span className="flame-text">du</span>
              <br />
              willst
            </h1>

            <p className="lead mt-8 max-w-[50ch]">
              Dein Fitnessstudio in Göggingen. 24 Stunden geöffnet, an sieben Tagen die Woche.
              Freihantelbereich, Geräte, Kurse und Sauna unter einem Dach.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/probetraining/" className="btn btn-primary w-full sm:w-auto">
                Kostenloses Probetraining
                <Icon name="arrowRight" size={18} strokeWidth={2.1} />
              </Link>
              <a href={`tel:${site.contact.phone}`} className="btn btn-ghost w-full sm:w-auto">
                <Icon name="phone" size={18} />
                {site.contact.phoneDisplay}
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3.5 text-[14.5px] text-mute">
              {["Ohne Vertrag testen", "Persönliche Einweisung", "Parkplätze am Studio"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Faktenkarte */}
          <div className="min-w-0" style={{ transform: `translate3d(0, ${offset * -0.14}px, 0)` }}>
            <div className="glass-strong sweep relative rounded-[28px] p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">Dein Studio</span>
                  <p className="mt-2.5 text-[21px] font-extrabold leading-tight tracking-tight sm:text-[24px]">
                    Am Brunnenäcker 13
                  </p>
                  <p className="mt-1 text-[15px] text-mute">
                    {site.contact.zip} {site.contact.city}
                  </p>
                </div>
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-flame-400 to-flame-500 text-center text-[17px] font-black leading-none text-[#160702]"
                  aria-hidden="true"
                  style={{ animation: "float-soft 6s ease-in-out infinite" }}
                >
                  24/7
                </span>
              </div>

              <dl className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                  <Icon name="clock" size={20} className="row-span-2 mt-0.5 shrink-0 text-flame-400" />
                  <dt className="text-[14px] font-bold">Trainingszeiten</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">
                    Täglich 24 Stunden, auch an Feiertagen
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                  <Icon name="users" size={20} className="row-span-2 mt-0.5 shrink-0 text-flame-400" />
                  <dt className="text-[14px] font-bold">Servicezeiten</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">
                    Mo bis Fr 9 bis 22&nbsp;Uhr, Sa und So 10 bis 14&nbsp;Uhr
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                  <Icon name="pin" size={20} className="row-span-2 mt-0.5 shrink-0 text-flame-400" />
                  <dt className="text-[14px] font-bold">Anfahrt</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">
                    Parkplätze direkt am Studio, barrierefreier Zugang
                  </dd>
                </div>
              </dl>

              <Link href="/kontakt/" className="btn btn-ghost mt-7 w-full">
                Anfahrt und Kontakt
                <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
