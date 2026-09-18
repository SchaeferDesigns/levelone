import { createServer } from "node:http";
import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateExport } from "./verify-export.mjs";

const project = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const root = path.join(project, "probe");
const target = path.join(root, "demo", "levelone");
await validateExport();
// Only replace the generated copy inside this project's probe directory.
if (!target.startsWith(`${project}${path.sep}`) || !target.startsWith(`${root}${path.sep}`)) throw new Error("Ungültiges Probe-Verzeichnis");
await rm(target, { recursive: true, force: true });
await mkdir(path.dirname(target), { recursive: true });
await cp(path.join(project, "out"), target, { recursive: true });
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".woff2": "font/woff2" };

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== root) throw new Error("Pfad außerhalb probe");
    if ((await stat(file)).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(301, { Location: `${url.pathname}/${url.search}` });
        res.end();
        console.log(`301 ${req.url} -> ${url.pathname}/`);
        return;
      }
      file = path.join(file, "index.html");
    }
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
    console.log(`200 ${req.url}`);
  } catch {
    // No SPA fallback and no rewrite to the home page.
    res.writeHead(404);
    res.end("Not found");
    console.log(`404 ${req.url}`);
  }
}).listen(4173, "127.0.0.1", () => console.log("Statischer Server: http://127.0.0.1:4173/demo/levelone/ (Root: probe/, kein SPA-Fallback)"));
