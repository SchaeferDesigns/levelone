/** Values are set inside scripts/build-vorschau.mjs, never by shell assignment. */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const siteOrigin = isPreview
  ? "https://schaeferdesigns.de"
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.levelonegoeggingen.de";

/** Public assets and plain HTML URLs need the prefix; next/link adds it itself. */
export function assetPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith(`${basePath}/`)
    ? `${basePath}${path}`
    : path;
}

export function metadataUrl(path: string) {
  return new URL(assetPath(path), siteOrigin).toString();
}
