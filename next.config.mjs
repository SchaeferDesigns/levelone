/** @type {import('next').NextConfig} */

// Bei GitHub Pages unter einer Projektadresse liegt die Seite in einem Unterordner.
// Der Pfad kommt aus der Umgebung, bei eigener Domain bleibt er leer.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Statischer Export: erzeugt echtes HTML pro Route (bestes SEO, laeuft auf jedem Webspace).
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Keine automatisch erzeugten Agent-Dateien im Projektordner
  agentRules: false,
};

export default nextConfig;
