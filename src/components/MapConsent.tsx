"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";

const STORAGE_KEY = "levelone-consent-map";

export function readMapConsent() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

/**
 * Zwei-Klick-Loesung: Die Karte wird erst nach aktiver Einwilligung geladen.
 * Vorher verlaesst keine Anfrage den Browser der Besucher.
 */
export default function MapConsent() {
  const [loaded, setLoaded] = useState(false);
  const [remember, setRemember] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (readMapConsent()) setLoaded(true);
  }, []);

  function accept() {
    if (remember) {
      try {
        window.localStorage.setItem(STORAGE_KEY, "granted");
      } catch {
        /* Speicher nicht verfügbar, Einwilligung gilt nur für diesen Besuch */
      }
    }
    setLoaded(true);
  }

  return (
    <div className="glass relative overflow-hidden rounded-[22px]">
      <div className="aspect-[16/10] w-full sm:aspect-[16/8]">
        {mounted && loaded ? (
          <iframe
            title="Karte mit dem Standort von Level One Göggingen"
            src={site.osmEmbed}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full border-0"
            style={{ filter: "grayscale(0.35) contrast(1.05) brightness(0.85)" }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-7 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/14 bg-white/5">
              <Icon name="pin" size={26} className="text-flame-400" />
            </span>
            <div>
              <p className="text-[17px] font-bold">Karte wird erst nach Zustimmung geladen</p>
              <p className="mx-auto mt-2 max-w-[52ch] text-[14.5px] text-mute">
                Beim Laden der Karte wird eine Verbindung zu OpenStreetMap aufgebaut. Dabei wird
                deine IP-Adresse an den Kartenanbieter übertragen.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-mute">
              <input
                type="checkbox"
                className="h-4.5 w-4.5 accent-[#ff5a1f]"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Entscheidung für künftige Besuche speichern
            </label>
            <div className="flex flex-wrap justify-center gap-2.5">
              <button type="button" className="btn btn-primary" onClick={accept}>
                Karte laden
                <Icon name="arrowRight" size={18} strokeWidth={2.1} />
              </button>
              <a
                className="btn btn-ghost"
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" size={18} />
                Route in Maps öffnen
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
