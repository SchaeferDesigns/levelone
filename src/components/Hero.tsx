"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";
import { guenstigster, preis } from "@/lib/tarife";

const lines = ["Trainieren", "wann du", "willst"];

/**
 * Startbild mit Tiefe und Reaktion.
 * Die Ebenen bewegen sich beim Scrollen unterschiedlich schnell, Licht und
 * Umrisswort folgen zusätzlich dem Mauszeiger, der Hauptknopf zieht leicht an.
 * Bei ruhiger Darstellung steht alles still.
 */
export default function Hero() {
  const [scroll, setScroll] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [now, setNow] = useState<string | null>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const reduced = useRef(false);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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
      setScroll(Math.min(window.scrollY, 1100));
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

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduced.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });

    // Der Hauptknopf zieht leicht zum Zeiger, solange er in Reichweite ist
    const b = ctaRef.current?.getBoundingClientRect();
    if (!b) return;
    const dx = e.clientX - (b.left + b.width / 2);
    const dy = e.clientY - (b.top + b.height / 2);
    const dist = Math.hypot(dx, dy);
    const radius = 170;
    if (dist < radius) {
      const pull = (1 - dist / radius) * 0.34;
      setMagnet({ x: dx * pull, y: dy * pull });
    } else if (magnet.x !== 0 || magnet.y !== 0) {
      setMagnet({ x: 0, y: 0 });
    }
  }, [magnet.x, magnet.y]);

  const fade = Math.max(0, 1 - scroll / 620);

  return (
    <section
      ref={sectionRef}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        onMove(e);
      }}
      onPointerLeave={() => {
        setPointer({ x: 0, y: 0 });
        setMagnet({ x: 0, y: 0 });
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[124px] pb-20 sm:pt-[140px]"
    >
      {/* Licht, das dem Zeiger folgt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          transform: `translate3d(${pointer.x * 34}px, ${scroll * 0.3 + pointer.y * 24}px, 0)`,
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="absolute -right-[12%] -top-[18%] h-[62vw] w-[62vw] max-w-[860px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.42),transparent_66%)] blur-[80px]" />
        <div className="absolute -left-[16%] top-[42%] h-[52vw] w-[52vw] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(56,120,255,0.3),transparent_66%)] blur-[90px]" />
      </div>

      {/* Umrisswort, bewegt sich gegen die Scrollrichtung */}
      <span
        aria-hidden="true"
        className="outline-text pointer-events-none absolute -z-10 select-none whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-[-0.05em]"
        style={{
          left: "50%",
          top: "50%",
          opacity: 0.2 * fade + 0.04,
          transform: `translate3d(calc(-50% + ${pointer.x * -46}px), calc(-50% + ${scroll * -0.42 + pointer.y * -18}px), 0) scale(${1 + scroll * 0.00022})`,
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s linear",
        }}
      >
        Level One
      </span>

      {/* Feines Raster, das mitatmet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 45%, #000, transparent)",
          transform: `translate3d(${pointer.x * -18}px, ${scroll * 0.14}px, 0)`,
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <div
        className="shell relative w-full"
        style={{ opacity: fade * 0.4 + 0.6, transform: `translate3d(0, ${scroll * -0.06}px, 0)` }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.24fr)_minmax(0,0.76fr)]">
          <div className="min-w-0">
            <span className="glass hero-in inline-flex items-center gap-2.5 rounded-[999px] px-4 py-2 text-[13px] font-bold">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-flame-500"
                style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
              />
              {now ? `Jetzt ${now} Uhr. Geöffnet.` : "Immer geöffnet."}
            </span>

            <h1 className="display-hero mt-7">
              {lines.map((l, i) => (
                <span key={l} className="line-mask">
                  <span className="line-inner" style={{ animationDelay: `${120 + i * 110}ms` }}>
                    {i === 1 ? (
                      <>
                        wann <span className="flame-text">du</span>
                      </>
                    ) : (
                      l
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="lead hero-in mt-8 max-w-[46ch]" style={{ animationDelay: "420ms" }}>
              Dein Fitnessstudio in Göggingen. 24 Stunden geöffnet, sieben Tage die Woche.
            </p>

            <div
              className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "520ms" }}
            >
              <Link
                ref={ctaRef}
                href="/mitglied-werden/"
                className="btn btn-primary w-full sm:w-auto"
                style={{
                  transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0)`,
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Mitglied werden ab {preis(guenstigster)} €
                <Icon name="arrowRight" size={18} strokeWidth={2.1} />
              </Link>
              <Link href="/probetraining/" className="btn btn-ghost w-full sm:w-auto">
                Erst kostenlos testen
              </Link>
            </div>

            <ul
              className="hero-in mt-9 flex flex-wrap gap-x-5 gap-y-3.5 text-[14.5px] text-mute"
              style={{ animationDelay: "620ms" }}
            >
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

          {/* Faktenkarte, kippt leicht mit dem Zeiger */}
          <div
            className="min-w-0"
            style={{
              transform: `perspective(1100px) rotateX(${pointer.y * -4}deg) rotateY(${pointer.x * 6}deg) translate3d(0, ${scroll * -0.16}px, 0)`,
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="glass-strong sweep hero-in relative rounded-[28px] p-7" style={{ animationDelay: "300ms" }}>
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
                  <dt className="text-[14px] font-bold">Training</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">Täglich 24 Stunden</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                  <Icon name="users" size={20} className="row-span-2 mt-0.5 shrink-0 text-flame-400" />
                  <dt className="text-[14px] font-bold">Beratung</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">
                    Mo bis Fr 9 bis 22&nbsp;Uhr, Sa und So 10 bis 14&nbsp;Uhr
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                  <Icon name="car" size={20} className="row-span-2 mt-0.5 shrink-0 text-flame-400" />
                  <dt className="text-[14px] font-bold">Parken</dt>
                  <dd className="col-start-2 text-[14.5px] text-mute">Direkt am Studio, kostenfrei</dd>
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

      {/* Hinweis zum Weiterscrollen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
        style={{ opacity: fade }}
      >
        <span className="flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-faint">
          Scrollen
          <span className="scroll-line" />
        </span>
      </div>
    </section>
  );
}
