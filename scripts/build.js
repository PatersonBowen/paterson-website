// Build step (runs on Vercel via vercel.json -> buildCommand).
//
// The site is one bundled index.html whose real content only appears after
// JavaScript unpacks it, and the bundler throws away the static <head> when it
// swaps the document. This script makes the site crawlable without touching
// the design export:
//
//   1. Carries the static <head> tags (title, description, canonical, Open
//      Graph, JSON-LD, icons) over the document swap so the *rendered* page
//      keeps them (this is what Google indexes).
//   2. Writes a copy of index.html per route into public/ with that route's
//      own title / description / canonical / robots and a crawler-visible
//      body (h1, summary, real <a href> links).
//   3. Writes 404.html (real 404 status for unknown URLs) and _job.html
//      (shell for /jobs/<slug>).
//
// It is idempotent: it strips any SEO tags already in index.html first, so a
// fresh re-export from the design tool is fixed up automatically on deploy.
//
//   node scripts/build.js                 -> build public/
//   node scripts/build.js --write-source  -> also rewrite ./index.html (home)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, OG_IMAGE, ORG, ROUTES, NOT_FOUND, JOB_SHELL, GUIDE_PAGES } from "./seo-routes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public");
const writeSource = process.argv.includes("--write-source");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

const CARRY = `    // seo: carry crawler-facing <head> tags across the document swap, otherwise
    // the rendered page has no title/description/canonical/structured data.
    const __seoCarry = Array.from(document.head.querySelectorAll('title, meta[name]:not([name="viewport"]), meta[property], link[rel="canonical"], link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="manifest"], script[type="application/ld+json"], script#seo-pages')).map(function (n) { return n.cloneNode(true); });
    document.documentElement.replaceWith(doc.documentElement);
    const dead = Array.from(document.scripts);
    __seoCarry.forEach(function (n) {
      if (n.tagName === 'TITLE') Array.from(document.head.querySelectorAll('title')).forEach(function (t) { t.remove(); });
      document.head.appendChild(n);
    });`;

function patchBootstrap(html) {
  if (html.includes("__seoCarry")) return html;
  const re = /    document\.documentElement\.replaceWith\(doc\.documentElement\);\s*const dead = Array\.from\(document\.scripts\);/;
  if (!re.test(html)) {
    console.warn("WARNING: bootstrap swap code not found; rendered page will not keep its <head> SEO tags.");
    return html;
  }
  return html.replace(re, () => CARRY);
}

function headBlock(meta, route, pagesJson) {
  const url = route.path ? SITE + (route.path === "/" ? "/" : route.path) : null;
  const indexable = meta.index !== false;
  const robots = indexable ? "index,follow,max-image-preview:large" : "noindex,follow";
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<meta name="robots" content="${robots}">`,
  ];
  if (url) lines.push(`<link rel="canonical" href="${url}">`);
  lines.push(
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Paterson">`,
    `<meta property="og:title" content="${esc(route.key === "home" ? "Paterson — For Those Who Build" : meta.title)}">`,
    `<meta property="og:description" content="${esc(route.key === "home" ? "We build the teams that build your skyline." : meta.description)}">`,
    ...(url ? [`<meta property="og:url" content="${url}">`] : []),
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.key === "home" ? "Paterson — For Those Who Build" : meta.title)}">`,
    `<meta name="twitter:description" content="${esc(route.key === "home" ? "We build the teams that build your skyline." : meta.description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`
  );
  const ld = [];
  if (route.key === "home") {
    ld.push(ORG, { "@context": "https://schema.org", "@type": "WebSite", name: "Paterson", url: SITE + "/" });
  } else if (url && indexable) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: route.nav || meta.title, item: url },
      ],
    });
  }
  for (const o of ld) lines.push(`<script type="application/ld+json">${jsonForScript(o)}</script>`);
  lines.push(`<script type="application/json" id="seo-pages">${pagesJson}</script>`);
  return `  <!-- seo:start -->\n  ${lines.join("\n  ")}\n  <!-- seo:end -->\n`;
}

function bodyBlock(meta) {
  const links = ROUTES.filter((r) => r.index !== false)
    .map((r) => `<li><a href="${r.path}">${esc(r.nav)}</a></li>`)
    .join("");
  return (
    `  <!-- seo-body:start -->\n` +
    `  <div id="seo-content" style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0,0,0,0)">` +
    `<h1>${esc(meta.h1)}</h1><p>${esc(meta.body)}</p><nav aria-label="Site"><ul>${links}</ul></nav></div>\n` +
    `  <!-- seo-body:end -->\n`
  );
}

function render(baseHtml, meta, route, pagesJson) {
  const headEnd = baseHtml.indexOf("</head>");
  if (headEnd < 0) throw new Error("No </head> in index.html");
  let head = baseHtml.slice(0, headEnd);
  let rest = baseHtml.slice(headEnd);
  head = head
    .replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->\s*/g, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/g, "")
    .replace(/<meta\s+name="(?:description|robots|twitter:[^"]*)"[^>]*>\s*/g, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/g, "")
    .replace(/<script type="application\/(?:ld\+json|json)"[^>]*>[\s\S]*?<\/script>\s*/g, "");
  let out = head + headBlock(meta, route, pagesJson) + rest;
  const bodyOpen = out.indexOf("<body>");
  if (bodyOpen < 0) throw new Error("No <body> in index.html");
  const after = bodyOpen + "<body>".length;
  let beforeBody = out.slice(0, after);
  let afterBody = out.slice(after).replace(/\s*<!-- seo-body:start -->[\s\S]*?<!-- seo-body:end -->\n?/, "\n");
  return beforeBody + "\n" + bodyBlock(meta) + afterBody.replace(/^\n/, "");
}

function assertBundleIntact(html) {
  for (const type of ["__bundler/template", "__bundler/manifest"]) {
    const marker = 'script type="' + type + '"';
    const start = html.indexOf(marker);
    if (start < 0) throw new Error("Missing " + type);
    const cs = html.indexOf(">", start) + 1;
    const ce = html.indexOf("</script>", cs);
    JSON.parse(html.slice(cs, ce));
  }
}

// ---- main -------------------------------------------------------------
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
assertBundleIntact(source);
const patched = patchBootstrap(source);

const pages = {};
for (const r of ROUTES) pages[r.key] = { path: r.path, title: r.title, description: r.description, index: r.index !== false };
const pagesJson = jsonForScript({ site: SITE, pages, notfound: NOT_FOUND, job: JOB_SHELL });

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const home = ROUTES.find((r) => r.key === "home");
const homeHtml = render(patched, home, home, pagesJson);
assertBundleIntact(homeHtml);
fs.writeFileSync(path.join(outDir, "index.html"), homeHtml);
if (writeSource) fs.writeFileSync(path.join(root, "index.html"), homeHtml);

for (const r of ROUTES) {
  if (r.key === "home") continue;
  fs.writeFileSync(path.join(outDir, r.key + ".html"), render(patched, r, r, pagesJson));
}
fs.writeFileSync(path.join(outDir, "404.html"), render(patched, NOT_FOUND, { key: "notfound" }, pagesJson));
fs.writeFileSync(path.join(outDir, "_job.html"), render(patched, JOB_SHELL, { key: "job" }, pagesJson));

// Static assets served as-is.
for (const f of fs.readdirSync(root)) {
  if (/^favicon.*\.(png|ico)$/.test(f) || f === "og-image.png" || f === "site.webmanifest" || f === "robots.txt" || f === "llms.txt") {
    fs.copyFileSync(path.join(root, f), path.join(outDir, f));
  }
}

// Long-form guide pages (static HTML).
await import("./guides.mjs");

console.log(`SEO build OK: ${ROUTES.length + 2 + GUIDE_PAGES.length} pages + assets -> public/` + (writeSource ? " (index.html rewritten)" : ""));
