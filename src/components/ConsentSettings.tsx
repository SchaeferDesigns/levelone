"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const STORAGE_KEY = "levelone-consent-map";

/** Einwilligung für externe Karten jederzeit einsehen und widerrufen. */
export default function ConsentSettings() {
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setGranted(window.localStorage.getItem(STORAGE_KEY) === "granted");
    } catch {
      setGranted(false);
    }
  }, []);

  function revoke() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nichts zu tun */
    }
    setGranted(false);
  }

  return (
    <div className="glass card mt-6">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-start gap-3">
          <Icon name="shield" size={22} className="mt-0.5 shrink-0 text-flame-400" />
          <div>
            <p className="text-[16px] font-bold">Einwilligung für externe Karten</p>
            <p className="mt-1 text-[14.5px] text-mute">
              Status:{" "}
              {granted === null
                ? "wird geprüft"
                : granted
                  ? "erteilt, die Karte darf geladen werden"
                  : "nicht erteilt, es werden keine externen Inhalte geladen"}
            </p>
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={revoke} disabled={!granted}>
          {granted ? "Einwilligung widerrufen" : "Keine Einwilligung gespeichert"}
        </button>
      </div>
    </div>
  );
}
