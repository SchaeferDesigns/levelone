"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/deployment";
import Icon from "./Icon";
import { useScrollProgress } from "@/lib/useScrollProgress";

export type SequenceManifest = {
  /** Anzahl der Einzelbilder */
  count: number;
  /** Dateiname mit {i} als Platzhalter für die Nummer, z. B. "frame-{i}.webp" */
  pattern: string;
  /** Stellen, auf die die Nummer aufgefüllt wird */
  pad: number;
  width: number;
  height: number;
  /** Erstes Bild, wird als Standbild genutzt */
  poster?: string;
};

export type Caption = { title: string; text: string };

function framePath(m: SequenceManifest, i: number) {
  const n = String(i + 1).padStart(m.pad, "0");
  return assetPath(`/sequenz/${m.pattern.replace("{i}", n)}`);
}

/**
 * Bildsequenz, die am Scrollen abgespielt wird.
 * Die Bilder werden erst geladen, wenn der Abschnitt in die Nähe kommt.
 * Auf kleinen Displays, bei Datensparmodus und bei ruhiger Darstellung
 * erscheint stattdessen ein einzelnes Standbild.
 */
export default function ScrollSequence({
  manifest,
  captions,
}: {
  manifest: SequenceManifest;
  captions: Caption[];
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [simple, setSimple] = useState(true);

  /* Entscheiden, ob die Sequenz überhaupt geladen wird */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSimple(reduced || small || Boolean(conn?.saveData));
  }, []);

  /* Bilder laden, sobald der Abschnitt näher kommt */
  useEffect(() => {
    if (simple) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        const images: HTMLImageElement[] = [];
        let loaded = 0;
        for (let i = 0; i < manifest.count; i += 1) {
          const img = new Image();
          img.decoding = "async";
          img.src = framePath(manifest, i);
          img.onload = () => {
            loaded += 1;
            if (!cancelled && loaded === 1) setReady(true);
          };
          images[i] = img;
        }
        imagesRef.current = images;
      },
      { rootMargin: "700px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [manifest, simple, ref]);

  /* Aktuelles Bild zeichnen */
  useEffect(() => {
    if (simple || !ready) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const index = Math.min(manifest.count - 1, Math.round(progress * (manifest.count - 1)));
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }, [progress, ready, simple, manifest.count]);

  const captionIndex = Math.min(
    captions.length - 1,
    Math.floor(progress * captions.length),
  );

  const poster = manifest.poster ? `/sequenz/${manifest.poster}` : framePath(manifest, 0);

  return (
    <section aria-labelledby="studio-titel" className="relative">
      <div
        ref={ref}
        className="seq-track"
        style={{ height: simple ? undefined : `${Math.max(240, captions.length * 110)}svh` }}
      >
        <div className="seq-stage">
          {simple ? (
            <img
              src={assetPath(poster)}
              alt="Blick in das Level One Göggingen"
              width={manifest.width}
              height={manifest.height}
              className="seq-canvas"
            />
          ) : (
            <canvas ref={canvasRef} className="seq-canvas" aria-hidden="true" />
          )}
          <div className="seq-shade" aria-hidden="true" />

          <div className="shell relative w-full">
            <h2 id="studio-titel" className="sr-only">
              Ein Blick in das Studio
            </h2>
            <div className="relative min-h-[260px] max-w-[560px]">
              {captions.map((c, i) => (
                <div key={c.title} className="seq-caption" data-active={simple || i === captionIndex}>
                  <span className="eyebrow">
                    0{i + 1} von 0{captions.length}
                  </span>
                  <p className="display-huge mt-4">{c.title}</p>
                  <p className="lead mt-5">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Link href="/probetraining/" className="btn btn-primary">
                Kostenloses Probetraining
                <Icon name="arrowRight" size={18} strokeWidth={2.1} />
              </Link>
              <Link href="/studio/" className="btn btn-ghost">
                Studio ansehen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
