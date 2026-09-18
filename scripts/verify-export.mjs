import { readdir, readFile, stat, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));
const forbidden = new Set(["sitemap.xml", "robots.txt", ".htaccess"]);

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(name));
    else result.push(name);
  }
  return result;
}

export async function validateExport({ preview = true, basePath = "/demo/levelone", directory = path.join(project, "out") } = {}) {
  const errors = new Set();
  const exported = await files(directory);
  const exists = async (name) => access(name).then(() => true, () => false);
  const prefix = `${basePath}/`;
  const fail = (file, message) => errors.add(`${path.relative(directory, file)}: ${message}`);
  const references = [];

  function checkUrl(file, raw) {
    let value = raw.replace(/&amp;/g, "&").trim();
    if (/^https?:\/\//i.test(value)) {
      const url = new URL(value);
      if (preview && /^(www\.)?levelonegoeggingen\.de$/.test(url.hostname)) {
        fail(file, `Live-URL im Vorschau-Export: ${value}`);
      }
      if (url.origin !== "https://schaeferdesigns.de") return;
      value = url.pathname;
    }
    if (!value.startsWith("/")) return;
    if (!value.startsWith(prefix) || value.startsWith("//")) {
      fail(file, `Pfad außerhalb ${prefix}: ${raw}`);
      return;
    }
    // Decode and normalize to catch encoded traversal as well as missing assets/routes.
    try {
      const pathname = decodeURIComponent(new URL(value, "https://export.invalid").pathname);
      if (!pathname.startsWith(prefix) || pathname.includes("\\")) {
        fail(file, `Ungültiger Pfad: ${raw}`);
        return;
      }
      references.push({ file, raw, target: path.join(directory, pathname.slice(prefix.length)) });
    } catch {
      fail(file, `Ungültige URL: ${raw}`);
    }
  }

  for (const file of exported) {
    const relative = path.relative(directory, file);
    const parts = relative.split(path.sep);
    const segmentStart = parts.findIndex((part) => part.startsWith("__next."));
    if (segmentStart >= 0 && segmentStart < parts.length - 1) {
      const flattened = path.join(directory, ...parts.slice(0, segmentStart), parts.slice(segmentStart).join("."));
      if (!await exists(flattened)) fail(file, `Prefetch-Datei fehlt: ${path.relative(directory, flattened)}`);
      else if (!(await readFile(file)).equals(await readFile(flattened))) fail(file, "Prefetch-Datei hat abweichenden Inhalt");
    }
    if (parts.some((part) => ["cache", "dist", "BUILD_ID"].includes(part))) fail(file, "Build-Interna im Export");
    if ((await stat(file)).size > 24_000_000) fail(file, "Datei größer als 24 MB");
    if (preview && forbidden.has(path.basename(file))) fail(file, "Im Vorschaumodus verboten");
    if (!/\.(html|css|js|json|txt|svg|xml|webmanifest)$/i.test(file)) continue;
    const source = await readFile(file, "utf8");
    // Also inspect serialized HTML/React payloads (escaped quotes and slashes).
    const decoded = source.replace(/\\u002[fF]/g, "/").replace(/\\\//g, "/").replace(/\\+"/g, '"');
    if (/\.html$/i.test(file)) {
      if (/<base\b[^>]*\bhref\s*=/i.test(source)) fail(file, "<base href> ist verboten");
      if (preview && !/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(source)) fail(file, "robots noindex fehlt");
      if (preview && /<link\b[^>]*rel=["']canonical["']/i.test(source)) fail(file, "Canonical im Vorschau-Export");
    }
    if (/\.(html|svg|txt|json|webmanifest)$/i.test(file)) {
      for (const match of decoded.matchAll(/\b(?:src|href|poster|action|data|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) checkUrl(file, match[1] ?? match[2] ?? match[3]);
      // RSC href props belong to next/link, which prefixes them during rendering.
      // Check actual href attributes above, but never rewrite logical router props.
      for (const match of decoded.matchAll(/["'](?:src|poster|action|url|image|@id)["']\s*:\s*["']([^"']+)["']/gi)) checkUrl(file, match[1]);
      for (const match of decoded.matchAll(/<meta\b[^>]*\bcontent=["']([^"']+)["'][^>]*>/gi)) {
        if (/^(\/|https?:\/\/)/.test(match[1])) checkUrl(file, match[1]);
      }
      for (const match of decoded.matchAll(/\b(?:srcset|imagesrcset)\s*=\s*["']([^"']+)["']/gi)) {
        if (!match[1].startsWith("data:")) for (const entry of match[1].split(",")) checkUrl(file, entry.trim().split(/\s+/)[0]);
      }
    }
    for (const match of decoded.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi)) checkUrl(file, match[1] ?? match[2] ?? match[3]);
    for (const match of decoded.matchAll(/@import\s+["']([^"']+)["']/gi)) checkUrl(file, match[1]);
    // Resource literals in client bundles; logical router paths are not resource URLs.
    if (/\.js$/i.test(file)) {
      for (const match of decoded.matchAll(/["'`](\/[^\s"'`]*\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|css|mp4)(?:\?[^"'`\s]*)?)["'`]/gi)) checkUrl(file, match[1]);
    }
  }
  for (const { file, raw, target } of references) {
    if (!await exists(target)) fail(file, `Zieldatei fehlt: ${raw}`);
    else if ((await stat(target)).isDirectory() && !await exists(path.join(target, "index.html"))) fail(file, `Route ohne index.html: ${raw}`);
  }
  // Source pages include historical routes even when they are absent from navigation.
  const pages = (await files(path.join(project, "src/app"))).filter((file) => /[/\\]page\.[jt]sx?$/.test(file));
  for (const file of pages) {
    const route = path.relative(path.join(project, "src/app"), path.dirname(file)).split(path.sep).filter((part) => !/^\(.*\)$/.test(part)).join("/");
    if (route.includes("[")) throw new Error(`Dynamische Route ${route}: explizite Export-Routenprüfung ergänzen.`);
    const target = path.join(directory, route, "index.html");
    if (!await exists(target)) fail(target, "Echte Routendatei fehlt");
    else console.log(`Route OK: out/${route ? `${route}/` : ""}index.html`);
  }
  if (errors.size) {
    console.error(`Exportprüfung FEHLGESCHLAGEN (${errors.size}):\n${[...errors].join("\n")}`);
    throw new Error("Export wird nicht freigegeben.");
  }
  console.log(`Exportprüfung OK: ${exported.length} Dateien, ${pages.length} Routen, Basispfad ${prefix}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await validateExport();
