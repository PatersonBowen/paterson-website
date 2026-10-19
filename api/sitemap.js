// Served at /sitemap.xml (see vercel.json rewrites).
// Static pages come from scripts/seo-routes.js (anything with index: false is
// left out); live roles are read from Airtable so new jobs appear without a deploy.

import { SITE, ROUTES, GUIDE_PAGES } from "../scripts/seo-routes.js";

const JOBS_TABLE = "tblmtcEqt7W8njXOC"; // same Jobs table as api/jobs.js

async function liveJobs() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;
  if (!baseId || !token) return [];
  const out = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(JOBS_TABLE)}`);
    url.searchParams.set("filterByFormula", "{Status}='Live'");
    url.searchParams.set("pageSize", "100");
    url.searchParams.append("fields[]", "Slug");
    url.searchParams.append("fields[]", "Posted At");
    if (offset) url.searchParams.set("offset", offset);
    const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.ok) return out;
    const data = await resp.json();
    for (const r of data.records) {
      const slug = (r.fields.Slug || r.id).toString();
      out.push({ slug, lastmod: (r.fields["Posted At"] || "").toString().slice(0, 10) });
    }
    offset = data.offset;
  } while (offset);
  return out;
}

const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req, res) {
  let jobs = [];
  try {
    jobs = await liveJobs();
  } catch (_) {
    // Fall back to static pages only.
  }
  const urls = ROUTES.filter((r) => r.index !== false).map((r) => ({ loc: SITE + (r.path === "/" ? "/" : r.path) }));
  for (const p of GUIDE_PAGES) urls.push({ loc: SITE + p.path, lastmod: p.lastmod });
  for (const j of jobs) urls.push({ loc: `${SITE}/jobs/${encodeURIComponent(j.slug)}`, lastmod: j.lastmod });

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${xmlEsc(u.loc)}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(u.lastmod || "") ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
      .join("\n") +
    `\n</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(body);
}
