"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { mainNav, site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="shell">
        <div
          className={`glass pointer-events-auto mx-auto mt-3 flex items-center gap-3 rounded-[999px] pl-4 pr-3 transition-all duration-500 ${
            compact ? "py-2 shadow-2xl" : "py-2.5"
          }`}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 py-1"
            aria-label={`${site.name}, zur Startseite`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-flame-400 to-flame-500 text-ink-950 shadow-[0_8px_20px_-8px_rgba(255,90,31,0.9)]">
              <Icon name="dumbbell" size={19} strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-black tracking-tight">LEVEL ONE</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mute">
                Göggingen
              </span>
            </span>
          </Link>

          <nav aria-label="Hauptnavigation" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative inline-flex items-center rounded-[999px] px-3.5 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${
                      isActive(item.href)
                        ? "bg-white/10 text-chalk"
                        : "text-mute hover:text-chalk"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href={`tel:${site.contact.phone}`}
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-chalk transition-colors hover:bg-white/10 sm:grid"
              aria-label={`Anrufen unter ${site.contact.phoneDisplay}`}
            >
              <Icon name="phone" size={18} />
            </a>
            <Link
              href="/probetraining/"
              className="hidden rounded-[999px] bg-gradient-to-br from-flame-400 to-flame-500 px-5 py-3 text-[14.5px] font-extrabold text-ink-950 shadow-[0_12px_28px_-12px_rgba(255,90,31,0.95)] transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              Probetraining
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-chalk transition-colors hover:bg-white/10 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={20} strokeWidth={2.1} />
              <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobiles Menue */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="pointer-events-auto fixed inset-0 top-0 z-40 lg:hidden"
      >
        <button
          type="button"
          aria-label="Menü schließen"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-ink-950/70 backdrop-blur-xl"
        />
        <div className="glass-strong absolute inset-x-3 top-[84px] rounded-[26px] p-5">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-bold transition-colors ${
                      isActive(item.href) ? "bg-white/10 text-chalk" : "text-mute"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq/"
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-bold text-mute"
                >
                  Häufige Fragen
                  <Icon name="arrowRight" size={18} />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-4 grid gap-2.5">
            <Link href="/probetraining/" className="btn btn-primary w-full">
              Kostenloses Probetraining
              <Icon name="arrowRight" size={18} strokeWidth={2.1} />
            </Link>
            <a href={`tel:${site.contact.phone}`} className="btn btn-ghost w-full">
              <Icon name="phone" size={18} />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
