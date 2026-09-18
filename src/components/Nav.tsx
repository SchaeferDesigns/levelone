"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { mainNav, site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [pill, setPill] = useState({ x: 0, w: 0, visible: false, hovered: false });

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")),
    [pathname],
  );

  /* Markierung auf den aktiven Eintrag setzen */
  const moveToActive = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const idx = mainNav.findIndex((i) => isActive(i.href));
    const el = idx >= 0 ? itemRefs.current[idx] : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false, hovered: false }));
      return;
    }
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, visible: true, hovered: false });
  }, [isActive]);

  useLayoutEffect(() => {
    moveToActive();
  }, [moveToActive]);

  useEffect(() => {
    const onResize = () => moveToActive();
    window.addEventListener("resize", onResize);
    const list = listRef.current;
    const ro = list ? new ResizeObserver(onResize) : null;
    if (list && ro) ro.observe(list);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [moveToActive]);

  function hoverItem(i: number) {
    const list = listRef.current;
    const el = itemRefs.current[i];
    if (!list || !el) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, visible: true, hovered: !isActive(mainNav[i].href) });
  }

  /*
   * Die Form folgt der Scrollposition, laeuft dem Ziel aber gedaempft
   * hinterher. Ein einzelner Radtick bewegt sie damit nur ein Stueck weit,
   * und Andocken und Loesen sind derselbe Vorgang in beide Richtungen.
   */
  useEffect(() => {
    const ziel = () => Math.min(1, Math.max(0, window.scrollY / 260));
    const schreibe = (v: number) => barRef.current?.style.setProperty("--nav-t", String(v));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const simple = () => schreibe(ziel());
      simple();
      window.addEventListener("scroll", simple, { passive: true });
      return () => window.removeEventListener("scroll", simple);
    }

    let frame = 0;
    let current = ziel();
    let last = 0;
    schreibe(current);

    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const target = ziel();
      // Exponentielle Daempfung, unabhaengig von der Bildrate
      current += (target - current) * (1 - Math.exp(-dt / 190));
      if (Math.abs(target - current) < 0.0015) {
        current = target;
        schreibe(current);
        frame = 0;
        last = 0;
        return;
      }
      schreibe(current);
      frame = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Lichtreflex folgt dem Zeiger */
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    bar.style.setProperty("--sheen-x", `${e.clientX - r.left}px`);
    bar.style.setProperty("--sheen-y", `${e.clientY - r.top}px`);
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  /* Fokus im Menü halten */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    focusables()[0]?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const lastEl = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (activeEl === first || !panel?.contains(activeEl))) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Hintergrund sperren und ausblenden */
  useLayoutEffect(() => {
    if (!open) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const pathnameAtOpen = window.location.pathname;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      rootOverflow: root.style.overflow,
      overscrollBehavior: root.style.overscrollBehavior,
    };
    const main = document.getElementById("inhalt");
    const footer = document.querySelector("footer");
    const quick = document.querySelector<HTMLElement>('nav[aria-label="Schnellzugriff"]');
    const background = [main, footer, quick].filter((el): el is HTMLElement => el !== null);
    const wasInert = background.map((el) => el.inert);
    // overflow:hidden alone still lets the document move on mobile Safari.
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, left: `-${scrollX}px`, width: "100%", overflow: "hidden" });
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    background.forEach((el) => { el.inert = true; });
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onDesktop);
    return () => {
      desktop.removeEventListener("change", onDesktop);
      const { rootOverflow, overscrollBehavior, ...bodyStyles } = previous;
      Object.assign(body.style, bodyStyles);
      root.style.overflow = rootOverflow;
      root.style.overscrollBehavior = overscrollBehavior;
      background.forEach((el, i) => { el.inert = wasInert[i]; });
      const samePage = window.location.pathname === pathnameAtOpen;
      window.scrollTo({ left: samePage ? scrollX : 0, top: samePage ? scrollY : 0, behavior: "instant" });
    };
  }, [open]);

  return (
    <>
      <header className="nav-wrap">
        <div
          ref={barRef}
          className="nav-bar"
          onMouseMove={onMove}
        >
          <div className="nav-inner">
            <Link
              href="/"
              className="nav-brand flex shrink-0 items-center gap-3"
              aria-label={`${site.name}, zur Startseite`}
            >
              <span className="nav-mark">
                <Icon name="dumbbell" size={20} strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[16px] font-black tracking-tight">LEVEL ONE</span>
                <span className="nav-sub">Göggingen</span>
              </span>
            </Link>

            <nav aria-label="Hauptnavigation" className="ml-auto hidden lg:block">
              <ul
                ref={listRef}
                className="nav-list"
                onMouseLeave={moveToActive}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) moveToActive();
                }}
              >
                <li
                  aria-hidden="true"
                  className="nav-pill"
                  data-visible={pill.visible}
                  data-hovered={pill.hovered}
                  style={{ transform: `translate3d(${pill.x}px, -50%, 0)`, width: pill.w }}
                />
                {mainNav.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="nav-link"
                      onMouseEnter={() => hoverItem(i)}
                      onFocus={() => hoverItem(i)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2 lg:ml-3">
              <a
                href={`tel:${site.contact.phone}`}
                className="nav-round hidden sm:grid"
                aria-label={`Anrufen unter ${site.contact.phoneDisplay}`}
              >
                <Icon name="phone" size={18} />
              </a>
              <Link href="/mitglied-werden/" className="nav-cta hidden md:inline-flex">
                Mitglied werden
                <Icon name="arrowRight" size={17} strokeWidth={2.2} />
              </Link>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="nav-round lg:hidden"
              >
                <span className="burger" data-open={open} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobiles Menü */}
        <div id="mobile-menu" hidden={!open} className="pointer-events-auto fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={close}
            className="absolute inset-0 h-full w-full touch-none bg-ink-950/72 backdrop-blur-2xl"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            data-open={open}
            className="menu-sheet glass-strong absolute inset-x-5 top-[92px] max-h-[calc(100dvh-112px)] overflow-y-auto overscroll-contain rounded-[26px] p-5"
          >
            <nav aria-label="Mobile Navigation">
              <ul className="flex flex-col gap-1">
                {[...mainNav, { href: "/faq/", label: "Häufige Fragen" }].map((item, i) => (
                  <li
                    key={item.href}
                    className="menu-item"
                    style={{ "--menu-delay": `${60 + i * 45}ms` } as React.CSSProperties}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-bold transition-colors ${
                        isActive(item.href) ? "bg-white/12 text-chalk" : "text-mute"
                      }`}
                    >
                      {item.label}
                      <Icon name="arrowRight" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className="menu-item mt-4 grid gap-2.5"
              style={{ "--menu-delay": "420ms" } as React.CSSProperties}
            >
              <Link href="/mitglied-werden/" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Mitglied werden
                <Icon name="arrowRight" size={18} strokeWidth={2.1} />
              </Link>
              <Link href="/probetraining/" onClick={() => setOpen(false)} className="btn btn-ghost w-full">
                Kostenloses Probetraining
              </Link>
              <a href={`tel:${site.contact.phone}`} className="btn btn-ghost w-full">
                <Icon name="phone" size={18} />
                {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
