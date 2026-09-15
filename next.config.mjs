/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export: erzeugt echtes HTML pro Route (bestes SEO, laeuft auf jedem Webspace).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Keine automatisch erzeugten Agent-Dateien im Projektordner
  agentRules: false,
};

export default nextConfig;
