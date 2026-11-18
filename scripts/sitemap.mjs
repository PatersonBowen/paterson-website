// Build step: writes public/sitemap.xml.
// Static pages come from scripts/seo-routes.js (anything with index: false is left out). Live roles come
// from public/data/jobs.json, which scripts/data-snapshot.mjs wrote from Airtable earlier in the same build,
// so the sitemap no longer calls Airtable on every request.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, ROUTES, GUIDE_PAGES } from "./seo-routes.js";
import { ENTRIES } from "../content/market-watch.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public");

let jobs = [];
try {
  jobs = (JSON.parse(fs.readFileSync(path.join(outDir, "data", "jobs.json"), "utf8")).jobs || []).map((j) => ({
    slug: String(j.slug || j.id),
    lastmod: String(j.postedAt || "").slice(0, 10),
  }));
} catch (_) {
  // Static pages only.
}

const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urls = ROUTES.filter((r) => r.index !== false).map((r) => ({ loc: SITE + (r.path === "/" ? "/" : r.path) }));
for (const p of GUIDE_PAGES) urls.push({ loc: SITE + p.path, lastmod: p.lastmod });
if (ENTRIES.length) {
  urls.push({ loc: SITE + "/market-watch", lastmod: ENTRIES.map((e) => e.updated || e.date).sort().pop() });
  for (const e of ENTRIES) urls.push({ loc: `${SITE}/market-watch/${e.slug}`, lastmod: e.updated || e.date });
}
for (const j of jobs) urls.push({ loc: `${SITE}/jobs/${encodeURIComponent(j.slug)}`, lastmod: j.lastmod });

const body =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((u) => `  <url><loc>${xmlEsc(u.loc)}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(u.lastmod || "") ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
    .join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), body);
console.log(`Sitemap: ${urls.length} URLs -> public/sitemap.xml`);
