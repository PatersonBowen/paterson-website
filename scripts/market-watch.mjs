// Market Watch: builds /market-watch (list) and /market-watch/<slug> (one page per update)
// from content/market-watch.js. With no entries it does nothing, so nothing is published.
// Called by scripts/build.js. The preview script in drafts/ calls buildMarketWatch directly.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shell, cta, esc, SITE } from "./page-shell.mjs";
import { ENTRIES } from "../content/market-watch.js";

const here = path.dirname(fileURLToPath(import.meta.url));

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pretty = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
const monthYear = (iso) => {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};
const paras = (v) => (Array.isArray(v) ? v : String(v || "").split(/\n\n+/)).filter(Boolean).map((t) => `<p>${esc(t)}</p>`).join("\n");
const trim = (s, n = 155) => {
  s = String(s).replace(/\s+/g, " ").trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
};

function validate(entries) {
  const slugs = new Set();
  for (const e of entries) {
    const need = ["slug", "title", "date", "market", "type", "summary", "hiringView"];
    for (const k of need) if (!e[k] || (Array.isArray(e[k]) && !e[k].length)) throw new Error(`Market Watch entry "${e.slug || e.title}" is missing "${k}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) throw new Error(`Market Watch slug "${e.slug}" must be lowercase letters, numbers and hyphens`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) throw new Error(`Market Watch entry "${e.slug}" date must be YYYY-MM-DD`);
    if (slugs.has(e.slug)) throw new Error(`Duplicate Market Watch slug "${e.slug}"`);
    slugs.add(e.slug);
    for (const p of e.projects || []) {
      if (!p.name || !p.sourceUrl || !/^https?:\/\//.test(p.sourceUrl)) throw new Error(`Market Watch "${e.slug}": every project needs a name and a public sourceUrl`);
    }
  }
}

const FILTER_JS = `(function(){
var cards=[].slice.call(document.querySelectorAll('.card[data-market]')),box=document.getElementById('chips');if(!box)return;
var state={market:'all',type:'all'};
function apply(){cards.forEach(function(c){var ok=(state.market==='all'||c.dataset.market===state.market)&&(state.type==='all'||c.dataset.type===state.type);c.hidden=!ok});
[].forEach.call(box.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(state[b.dataset.group]===b.dataset.value))});
var n=cards.filter(function(c){return !c.hidden}).length;var e=document.getElementById('none');if(e)e.hidden=n>0}
box.addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b)return;state[b.dataset.group]=b.dataset.value;apply()});
apply()})();`;

export function buildMarketWatch(outDir, entries = ENTRIES, opts = {}) {
  if (!entries.length) return { count: 0 };
  validate(entries);
  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const sample = !!opts.sample;
  const banner = sample ? '<div class="draft">SAMPLE LAYOUT — placeholder text only. Not published and not real content.</div>\n' : "";
  const common = { seed: 41, marketLink: true, banner, published: sorted[sorted.length - 1].date };
  fs.mkdirSync(path.join(outDir, "market-watch"), { recursive: true });

  // ---------------- list page
  const markets = [...new Set(sorted.map((e) => e.market))];
  const types = [...new Set(sorted.map((e) => e.type))];
  const chip = (group, value, label, pressed) => `<button type="button" data-group="${group}" data-value="${esc(value)}" aria-pressed="${pressed}">${esc(label)}</button>`;
  const chips =
    markets.length + types.length > 2
      ? `<div class="chips" id="chips" role="group" aria-label="Filter updates">${chip("market", "all", "All Markets", true)}${markets.map((m) => chip("market", m, m, false)).join("")}${chip("type", "all", "All Types", true)}${types.map((t) => chip("type", t, t, false)).join("")}</div>`
      : "";
  const card = (e) =>
    `<a class="card" href="/market-watch/${e.slug}" data-market="${esc(e.market)}" data-type="${esc(e.type)}"><div class="tags"><span>${esc(pretty(e.date))}</span><span>${esc(e.market)}</span><span>${esc(e.type)}</span></div><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p></a>`;
  const listBody = `
<p>Market Watch follows notable construction and real estate projects across the US. Each update covers what is being built and what it means for hiring: which roles, which firms and what comes next.</p>
${chips}
<div class="cards">
${sorted.map(card).join("\n")}
</div>
<p class="empty" id="none" hidden>No updates match those filters.</p>
${cta}
<script>${FILTER_JS}</script>
`;
  const listUrl = SITE + "/market-watch";
  const list = shell({
    ...common,
    path: "/market-watch",
    title: "Market Watch: Construction & Real Estate Updates | Paterson",
    description: "Notable construction and real estate projects across the US, and what they mean for hiring.",
    eyebrow: "Market Watch",
    h1: 'What\'s being built,<br>and who builds it<span class="dot">.</span>',
    wideH1: true,
    lede: "Notable construction and real estate projects across the US, and what they mean for hiring.",
    meta: `Updated ${monthYear(sorted[0].date)}`,
    ogType: "website",
    toc: [],
    body: listBody,
    ld: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Market Watch", url: listUrl, description: "Notable construction and real estate projects across the US, and what they mean for hiring.", publisher: { "@type": "Organization", name: "Paterson", url: SITE + "/" } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Market Watch", item: listUrl } ] },
    ],
  });
  fs.writeFileSync(path.join(outDir, "market-watch.html"), list);

  // ---------------- one page per update
  for (const e of sorted) {
    const url = `${SITE}/market-watch/${e.slug}`;
    const projects = (e.projects || []).length
      ? `<h2 id="projects">Notable Projects</h2>
<div class="projects">
${e.projects.map((p) => `<div class="project"><h3>${esc(p.name)}</h3>${p.location ? `<p class="where">${esc(p.location)}</p>` : ""}${p.detail ? `<p>${esc(p.detail)}</p>` : ""}<p class="src">Source: <a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.sourceName || p.sourceUrl)}</a></p></div>`).join("\n")}
</div>`
      : "";
    const others = sorted.filter((o) => o.slug !== e.slug).slice(0, 3);
    const more = others.length ? `<h2 id="more">More From Market Watch</h2>\n<div class="cards">\n${others.map(card).join("\n")}\n</div>\n<p><a href="/market-watch">See all updates</a></p>` : `<p><a href="/market-watch">See all Market Watch updates</a></p>`;
    const body = `
${e.intro ? paras(e.intro) : ""}
${projects}
<h2 id="hiring">What It Means for Hiring</h2>
${paras(e.hiringView)}
${e.linkedinUrl ? `<p class="note">First shared on <a href="${esc(e.linkedinUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>` : ""}
${more}
${cta}
`;
    const toc = [];
    if ((e.projects || []).length) toc.push(["projects", "Notable Projects"]);
    toc.push(["hiring", "What It Means for Hiring"]);
    if (others.length) toc.push(["more", "More Updates"]);
    const page = shell({
      ...common,
      path: `/market-watch/${e.slug}`,
      title: `${e.title} | Paterson`,
      description: trim(e.summary),
      eyebrow: `Market Watch · ${e.market}`,
      h1: esc(e.title) + '<span class="dot">.</span>',
      lede: esc(e.summary),
      meta: `${pretty(e.date)} · ${e.type}`,
      published: e.date,
      toc,
      body,
      ld: [
        { "@context": "https://schema.org", "@type": "Article", headline: e.title, description: trim(e.summary), mainEntityOfPage: url, datePublished: e.date, dateModified: e.updated || e.date,
          author: { "@type": "Organization", name: "Paterson", url: SITE + "/" },
          publisher: { "@type": "Organization", name: "Paterson", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/favicon-512.png" } },
          image: SITE + "/og-image.png" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "Market Watch", item: listUrl },
          { "@type": "ListItem", position: 3, name: e.title, item: url } ] },
      ],
    });
    fs.writeFileSync(path.join(outDir, "market-watch", `${e.slug}.html`), page);
  }
  return { count: sorted.length };
}

// Normal build: write into public/ (does nothing while content/market-watch.js is empty).
if (!process.env.MARKET_WATCH_NO_AUTORUN) {
  const res = buildMarketWatch(path.join(here, "..", "public"));
  if (res.count) console.log(`Market Watch: ${res.count} update(s) published`);
}
