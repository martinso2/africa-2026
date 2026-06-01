import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

function walkAssets(dir, urlPrefix) {
  if (!fs.existsSync(dir)) return [];

  const urls = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;

    const filePath = path.join(dir, entry.name);
    const url = `${urlPrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      urls.push(...walkAssets(filePath, url));
      continue;
    }

    if (entry.name.endsWith(".gitkeep")) continue;
    urls.push(url);
  }

  return urls;
}

const assets = [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/safari.ico",
  "/safari.png",
  ...walkAssets(path.join(publicDir, "images"), "/images"),
  ...walkAssets(path.join(publicDir, "video"), "/video"),
];

const manifest = {
  version: 2,
  generatedAt: new Date().toISOString(),
  assets: [...new Set(assets)].sort(),
};

const outPath = path.join(publicDir, "precache-manifest.json");
fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Wrote ${manifest.assets.length} URLs to public/precache-manifest.json`);
