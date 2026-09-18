import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { finishExport } from "./finish-export.mjs";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
// Set in Node, so Git Bash/MSYS cannot convert /demo/levelone to a Windows path.
process.env.NEXT_PUBLIC_BASE_PATH = "/demo/levelone";
process.env.NEXT_PUBLIC_PREVIEW = "true";
process.env.NEXT_PUBLIC_SITE_URL = "https://schaeferdesigns.de";
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: process.env,
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
await finishExport(true);
