// Gemeinsame Scrollhilfen. Ein fest stehender Navigationsbalken verdeckt sonst
// genau das Element, zu dem gesprungen wird, und "reduzierte Bewegung" muss
// auch bei Sprüngen aus dem Skript gelten.
export function ruhigeBewegung() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function navHoehe() {
  if (typeof document === "undefined") return 76;
  const roh = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  const wert = Number.parseFloat(roh);
  return Number.isFinite(wert) && wert > 0 ? wert : 76;
}

/** Scrollt den Anfang eines Elements unter den Navigationsbalken. */
export function zumAnfang(el: HTMLElement | null | undefined, extra = 24) {
  if (!el) return;
  const ziel = window.scrollY + el.getBoundingClientRect().top - navHoehe() - extra;
  window.scrollTo({ top: Math.max(0, ziel), behavior: ruhigeBewegung() ? "auto" : "smooth" });
}

/** Zentriert ein Element, ohne es unter dem Navigationsbalken zu parken. */
export function inSicht(el: HTMLElement | null | undefined) {
  if (!el) return;
  const kasten = el.getBoundingClientRect();
  const oben = navHoehe() + 16;
  const passt = kasten.top >= oben && kasten.bottom <= window.innerHeight - 16;
  if (passt) return;
  const mitte = window.scrollY + kasten.top - (window.innerHeight - kasten.height) / 2;
  const grenze = window.scrollY + kasten.top - oben;
  window.scrollTo({
    top: Math.max(0, Math.min(mitte, grenze)),
    behavior: ruhigeBewegung() ? "auto" : "smooth",
  });
}
