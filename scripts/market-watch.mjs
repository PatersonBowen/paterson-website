// Market Watch: builds /market-watch (list) and /market-watch/<slug> (one page per update)
// from content/market-watch.js. With no entries it does nothing, so nothing is published.
// Called by scripts/build.js. The preview script in drafts/ calls buildMarketWatch directly.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shell, cta, esc, SITE } from "./page-shell.mjs";
import { ENTRIES } from "../content/market-watch.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(here, "..", "content", "market-watch", "images");

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

const coverOf = (e) => e.image || (e.carousel && e.carousel.images && e.carousel.images[0]) || "";

const CAROUSEL_JS = `(function(){
[].forEach.call(document.querySelectorAll('.carousel'),function(c){
var t=c.querySelector('.car-track'),n=t.children.length,cnt=c.querySelector('.car-count'),prev=c.querySelector('[data-dir="-1"]'),next=c.querySelector('[data-dir="1"]');
function w(){return t.clientWidth||1}
function idx(){return Math.max(0,Math.min(n-1,Math.round(t.scrollLeft/w())))}
function ui(){var i=idx();cnt.textContent=(i+1)+' / '+n;prev.disabled=i===0;next.disabled=i===n-1}
var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(d){t.scrollTo({left:(idx()+d)*w(),behavior:calm?'auto':'smooth'})}
prev.addEventListener('click',function(){go(-1)});next.addEventListener('click',function(){go(1)});
t.addEventListener('scroll',ui,{passive:true});
t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
window.addEventListener('resize',function(){t.scrollLeft=idx()*w();ui()});window.addEventListener('load',ui);ui()})})();`;

const carouselHtml = (e) => {
  const c = e.carousel, n = c.images.length;
  const slides = c.images.map((f, i) => `<figure class="car-slide"><img src="/market-watch/images/${esc(f)}" alt="${esc(c.alts[i])}" width="1100" height="1100"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></figure>`).join("");
  return `<section class="carousel" aria-roledescription="carousel" aria-label="${esc(c.label || "Slides from the LinkedIn post")}"><div class="car-track" tabindex="0">${slides}</div><div class="car-ui"><button type="button" class="car-btn" data-dir="-1" aria-label="Previous slide">&larr; Prev</button><span class="car-count mono" aria-live="polite">1 / ${n}</span><button type="button" class="car-btn" data-dir="1" aria-label="Next slide">Next &rarr;</button></div><script>${CAROUSEL_JS}</script></section>`;
};

function validate(entries) {
  const slugs = new Set();
  for (const e of entries) {
    const need = ["slug", "title", "date", "market", "type", "summary", "hiringView"];
    for (const k of need) if (!e[k] || (Array.isArray(e[k]) && !e[k].length)) throw new Error(`Market Watch entry "${e.slug || e.title}" is missing "${k}"`);
    if (!/^[^:]+:\s+\S/.test(e.title)) throw new Error(`Market Watch title "${e.title}" must follow the format "Series: Project or topic", for example "Behind the Build: 80 Clarkson, West Village, New York"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) throw new Error(`Market Watch slug "${e.slug}" must be lowercase letters, numbers and hyphens`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) throw new Error(`Market Watch entry "${e.slug}" date must be YYYY-MM-DD`);
    if (slugs.has(e.slug)) throw new Error(`Duplicate Market Watch slug "${e.slug}"`);
    slugs.add(e.slug);
    if (e.image && !fs.existsSync(path.join(IMG_DIR, e.image))) throw new Error(`Market Watch "${e.slug}": image file "${e.image}" not found in content/market-watch/images/`);
    if (e.image && !e.imageAlt) throw new Error(`Market Watch "${e.slug}": an image needs imageAlt text`);
    if (e.carousel) {
      const c = e.carousel;
      if (!Array.isArray(c.images) || c.images.length < 2) throw new Error(`Market Watch "${e.slug}": a carousel needs at least two images`);
      if (!Array.isArray(c.alts) || c.alts.length !== c.images.length) throw new Error(`Market Watch "${e.slug}": a carousel needs one alt text per image`);
      for (const f of c.images) if (!fs.existsSync(path.join(IMG_DIR, f))) throw new Error(`Market Watch "${e.slug}": carousel image "${f}" not found in content/market-watch/images/`);
    }
    for (const s of e.sources || []) {
      if (!s.name || !/^https?:\/\//.test(s.url || "")) throw new Error(`Market Watch "${e.slug}": every source needs a name and an http(s) url`);
    }
    for (const p of e.projects || []) {
      if (!p.name || !p.sourceUrl || !/^https?:\/\//.test(p.sourceUrl)) throw new Error(`Market Watch "${e.slug}": every project needs a name and a public sourceUrl`);
    }
  }
}

export function buildMarketWatch(outDir, entries = ENTRIES, opts = {}) {
  if (!entries.length) return { count: 0 };
  validate(entries);
  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const sample = !!opts.sample;
  const banner = opts.banner
    ? `<div class="draft">${esc(opts.banner)}</div>\n`
    : sample
      ? '<div class="draft">SAMPLE LAYOUT — placeholder text only. Not published and not real content.</div>\n'
      : "";
  const common = { seed: 41, marketLink: true, banner, published: sorted[sorted.length - 1].date };
  fs.mkdirSync(path.join(outDir, "market-watch"), { recursive: true });
  if (fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(path.join(outDir, "market-watch", "images"), { recursive: true });
    for (const f of fs.readdirSync(IMG_DIR)) fs.copyFileSync(path.join(IMG_DIR, f), path.join(outDir, "market-watch", "images", f));
  }

  // ---------------- list page
  const card = (e) =>
    `<a class="card${coverOf(e) ? " has-img" : ""}" href="/market-watch/${e.slug}" data-market="${esc(e.market)}" data-type="${esc(e.type)}">${coverOf(e) ? `<img src="/market-watch/images/${esc(coverOf(e))}" alt="" width="120" height="120" loading="lazy">` : ""}<div class="cbody"><div class="tags"><span>${esc(pretty(e.date))}</span><span>${esc(e.market)}</span><span>${esc(e.type)}</span></div><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p></div></a>`;
  const listBody = `
<p>Market Watch follows notable construction and real estate projects across the US. Each update covers what is being built and what it means for hiring: which roles, which firms and what comes next.</p>
<div class="cards">
${sorted.map(card).join("\n")}
</div>
${cta}
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
    const factsHtml = (e.facts || []).length ? `<dl class="facts">${e.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : "";
    const statsHtml = (e.stats || []).length ? `<div class="stats">${e.stats.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span><small>${esc(s.source)}</small></div>`).join("")}</div>` : "";
    const teamHtml = (e.team || []).length ? `<h2 id="team">The Team Behind the Build</h2>\n<div class="tbl"><table><tbody>${e.team.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join("")}</tbody></table></div>` : "";
    const sourcesHtml = (e.sources || []).length ? `<h2 id="sources">Sources</h2>\n<ul class="src">${e.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a></li>`).join("")}</ul>` : "";
    const imgUrl = coverOf(e) ? `${SITE}/market-watch/images/${coverOf(e)}` : "";
    const figure = e.carousel ? carouselHtml(e) : e.image ? `<figure class="hero-img"><img src="/market-watch/images/${esc(e.image)}" alt="${esc(e.imageAlt)}" width="800" height="800" fetchpriority="high">${e.imageCredit ? `<figcaption>${esc(e.imageCredit)}</figcaption>` : ""}</figure>` : "";
    const liLink = e.linkedinUrl ? `<p class="li-link"><span>First shared on LinkedIn</span><a href="${esc(e.linkedinUrl)}" target="_blank" rel="noopener noreferrer">View the original post</a></p>` : "";
    const body = `
${figure}
${liLink}
${factsHtml}
${e.intro ? paras(e.intro) : ""}
${statsHtml}
${projects}
${teamHtml}
<h2 id="hiring">${esc(e.hiringHeading || "What It Means for Hiring")}</h2>
${paras(e.hiringView)}
${sourcesHtml}
${more}
${cta}
`;
    const toc = [];
    if ((e.projects || []).length) toc.push(["projects", "Notable Projects"]);
    if ((e.team || []).length) toc.push(["team", "The Team"]);
    toc.push(["hiring", e.hiringHeading || "What It Means for Hiring"]);
    if ((e.sources || []).length) toc.push(["sources", "Sources"]);
    if (others.length) toc.push(["more", "More Updates"]);
    const page = shell({
      ...common,
      path: `/market-watch/${e.slug}`,
      backLink: { href: "/market-watch", label: "All Market Watch" },
      ogImage: imgUrl,
      title: e.title.length + 11 <= 60 ? `${e.title} | Paterson` : e.title,
      description: trim(e.summary),
      eyebrow: `Market Watch · ${e.market}`,
      h1: (() => { const m = e.title.match(/^([^:]+:)\s+(.+)$/); return `${esc(m[1])}<br>${esc(m[2])}<span class="dot">.</span>`; })(),
      wideH1: "entry",
      lede: esc(e.summary),
      meta: `${pretty(e.date)} · ${e.type}`,
      published: e.date,
      toc,
      body,
      ld: [
        { "@context": "https://schema.org", "@type": "Article", headline: e.title, description: trim(e.summary), mainEntityOfPage: url, datePublished: e.date, dateModified: e.updated || e.date, ...(e.linkedinUrl ? { sameAs: [e.linkedinUrl] } : {}),
          author: { "@type": "Organization", name: "Paterson", url: SITE + "/" },
          publisher: { "@type": "Organization", name: "Paterson", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/favicon-512.png" } },
          image: imgUrl || SITE + "/og-image.png" },
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
