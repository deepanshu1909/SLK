#!/usr/bin/env node
/**
 * Publish Client_LPGen/output/*.html → Client_LPGen/sites/{slug}/index.html
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "Client_LPGen/output");
const sitesDir = path.join(root, "Client_LPGen/sites");
const manifestPath = path.join(root, "Client_LPGen/deployed-pages.json");
const SITE_ORIGIN = "https://zarklo.com";
const SKIP = new Set(["example-demo", "your-brand"]);

function titleFromHtml(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].split("|")[0].trim() : "Client";
}

function descriptionFromHtml(html) {
  const m = html.match(/<meta name="description" content="([^"]+)"/i);
  return m ? m[1] : "";
}

function canonicalFromHtml(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)"/i);
  return m ? m[1] : "";
}

fs.mkdirSync(sitesDir, { recursive: true });
const entries = [];

for (const file of fs.readdirSync(outputDir).filter((f) => f.endsWith(".html"))) {
  const slug = file.replace(/\.html$/, "");
  if (SKIP.has(slug)) continue;

  const html = fs.readFileSync(path.join(outputDir, file), "utf-8");
  const destDir = path.join(sitesDir, slug);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(path.join(outputDir, file), path.join(destDir, "index.html"));

  entries.push({
    slug,
    businessName: titleFromHtml(html),
    tagline: descriptionFromHtml(html),
    category: "Local Business",
    websiteUrl: canonicalFromHtml(html),
    instagramUrl: "",
    liveUrl: `${SITE_ORIGIN}/${slug}`,
    generatedAt: new Date().toISOString(),
  });

  console.log(`✓ Client_LPGen/sites/${slug}/`);
  console.log(`  local  → http://localhost:5173/${slug}`);
  console.log(`  live   → ${SITE_ORIGIN}/${slug}`);
}

entries.sort((a, b) => a.businessName.localeCompare(b.businessName));
fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + "\n");
console.log(`\n${entries.length} pages in Client_LPGen/sites/ — git push to deploy on zarklo.com`);
