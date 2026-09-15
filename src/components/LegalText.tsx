"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/site";

type Props = {
  /** Dateiname ohne Endung in /public/rechtstexte */
  file: string;
  title: string;
};

/**
 * Laedt den Rechtstext aus /public/rechtstexte/<file>.txt.
 * Solange die Datei leer ist, erscheint ein sachlicher Hinweis statt Platzhaltertext.
 * Die Texte koennen jederzeit direkt in der .txt Datei gepflegt werden, ohne neuen Build.
 */
export default function LegalText({ file, title }: Props) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/rechtstexte/${file}.txt`, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((t) => {
        if (!active) return;
        setText(t.trim());
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setText("");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [file]);

  if (loading) {
    return (
      <div className="glass card" aria-busy="true">
        <p className="text-mute">{title} wird geladen.</p>
      </div>
    );
  }

  if (!text) {
    return (
      <div className="glass card">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/14 bg-white/5">
          <Icon name="document" size={24} className="text-flame-400" />
        </span>
        <h2 className="display-md mt-6">{title} folgt in Kürze</h2>
        <p className="lead mt-4 max-w-[60ch]">
          Der vollständige Text wird derzeit erstellt und in Kürze an dieser Stelle veröffentlicht.
          Bis dahin erreichst du uns jederzeit persönlich.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={`tel:${site.contact.phone}`}>
            <Icon name="phone" size={18} />
            {site.contact.phoneDisplay}
          </a>
          <Link className="btn btn-ghost" href="/kontakt/">
            Zum Kontakt
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass card">
      <div className="whitespace-pre-wrap text-[15.5px] leading-relaxed text-mute">{text}</div>
    </div>
  );
}
