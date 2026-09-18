import { copyFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { validateExport } from "./verify-export.mjs";

export async function finishExport(preview = false) {
  const output = fileURLToPath(new URL("../out", import.meta.url));
  // Next 16.3's Windows exporter passes backslashes to a helper that only
  // replaces '/'. The browser requests __next.training.__PAGE__.txt, while
  // Windows emits __next.training/__PAGE__.txt. Supply the real requested file.
  for (const entry of await readdir(output, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const source = path.join(entry.parentPath, entry.name);
    const relative = path.relative(output, source);
    const parts = relative.split(path.sep);
    const segmentStart = parts.findIndex((part) => part.startsWith("__next."));
    if (segmentStart < 0 || segmentStart === parts.length - 1) continue;
    const target = path.join(output, ...parts.slice(0, segmentStart), parts.slice(segmentStart).join("."));
    await copyFile(source, target);
  }
  if (preview) {
    for (const name of ["sitemap.xml", "robots.txt", ".htaccess", "rechtstexte"]) {
      // Legal source fragments are already embedded in each exported legal page.
      await rm(new URL(`../out/${name}`, import.meta.url), { recursive: true, force: true });
    }
  }
  await validateExport({ preview, basePath: preview ? "/demo/levelone" : process.env.NEXT_PUBLIC_BASE_PATH || "" });
  console.log(preview
    ? "Gebaut: Vorschau mit Basispfad /demo/levelone/ -> out/"
    : process.env.NEXT_PUBLIC_BASE_PATH
      ? `Gebaut: Export mit Basispfad ${process.env.NEXT_PUBLIC_BASE_PATH}/ -> out/`
      : "Gebaut: Wurzelbau / -> out/");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await finishExport();
}
