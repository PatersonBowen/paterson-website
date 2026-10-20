// Shared page design for the long-form pages (guides, Market Watch): banner, side list, footer.
// Imported by scripts/guides.mjs and scripts/market-watch.mjs.
export const SITE = "https://www.patersoncompany.com";
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const CSS = `
:root{--ink:#1a1a1a;--mute:#5c5c5c;--line:#e4e4e2;--soft:#f4f4f2;--accent:#ff4a1c}
*{box-sizing:border-box}
body{margin:0;background:#fff;color:var(--ink);font-family:'Inter',ui-sans-serif,system-ui,sans-serif;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}
h1,h2,h3{font-family:'Space Grotesk',sans-serif;letter-spacing:-.02em;line-height:1.12;margin:0}
header{position:sticky;top:0;z-index:5;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border-bottom:1px solid var(--line)}
.bar{max-width:1152px;margin:0 auto;padding:16px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 18px}
.logo{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;letter-spacing:-.02em;text-decoration:none}
.logo span,.dot{color:var(--accent)}
nav{display:flex;flex-wrap:wrap;gap:6px 18px}
nav a{font-size:11.5px;text-decoration:none;color:var(--ink);white-space:nowrap}
nav a:hover{color:var(--accent)}
.draft{background:#fff4ec;border-bottom:1px solid #ffd2b8;color:#8a3b12;font-size:13px;text-align:center;padding:8px 16px}
.banner{position:relative;overflow:hidden;background:#1a1a1a;color:#fff}
.banner .ticks,.foot-ticks{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none}
.hero{position:relative;max-width:1152px;margin:0 auto;padding:88px 24px 64px;box-sizing:border-box}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--accent);margin:0}
h1{font-size:clamp(32px,6vh,68px);font-weight:700;margin-top:20px;max-width:16ch;color:#fff}
h1.wide{max-width:none;font-size:clamp(22px,min(6vh,6.2vw),68px)}
h1.entry{font-size:clamp(22px,min(4.6vh,4.4vw),52px)}
.lede{margin-top:20px;max-width:640px;font-size:clamp(15px,2.2vh,18px);color:rgba(255,255,255,.7)}
.meta{margin-top:18px;font-size:12px;color:#9a9a9a}
.sky{display:block;width:100%;height:64px;position:relative;z-index:2}
.menu{display:none;width:40px;height:40px;border:1px solid var(--line);border-radius:2px;background:#fff;cursor:pointer;padding:0;flex-direction:column;justify-content:center;gap:5px;align-items:center}
.menu i{display:block;height:1.5px;width:18px;background:var(--ink)}
@media(max-width:760px){.menu{display:flex}nav{display:none;width:100%;flex-direction:column;gap:0;border-top:1px solid var(--line);margin:0 -24px;width:calc(100% + 48px)}nav.open{display:flex}nav a{padding:14px 24px;font-size:13px;border-bottom:1px solid var(--line)}}
footer{position:relative;overflow:hidden}
.foot{position:relative}
.wrap{max-width:1152px;margin:0 auto;padding:56px 24px 72px;display:grid;grid-template-columns:minmax(0,1fr);gap:48px}
@media(min-width:960px){.wrap{grid-template-columns:230px minmax(0,720px);gap:64px;align-items:start}}
.toc{position:sticky;top:84px;font-size:13px;display:none}
@media(min-width:960px){.toc{display:block}}
.toc p{margin:0 0 10px;font-size:11.5px;color:var(--accent)}
.toc a{display:block;padding:5px 0;color:var(--mute);text-decoration:none;border-left:2px solid var(--line);padding-left:12px}
.toc a:hover{color:var(--ink);border-color:var(--accent)}
article h2{font-size:clamp(24px,3vw,32px);margin-top:56px}
article>:first-child{margin-top:0}
article h3{font-size:19px;margin-top:30px}
article a{color:#c93509;font-weight:500;text-decoration:none;transition:color .15s ease}
article a:hover{opacity:.8}
.cta a,.cta a:hover{color:inherit;font-weight:inherit}
article p{margin:14px 0 0}
article ul,article ol{margin:14px 0 0;padding-left:22px}
article li{margin:8px 0}
.callout{margin-top:24px;border:1px solid var(--line);border-left:3px solid var(--accent);background:var(--soft);padding:18px 20px;border-radius:2px}
.callout p:first-child{margin-top:0}
.tbl{margin-top:22px;overflow-x:auto;border:1px solid var(--line);border-radius:2px}
table{border-collapse:collapse;width:100%;font-size:14.5px;min-width:560px}
th,td{padding:11px 14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
th{background:var(--soft);font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:500}
tr:last-child td{border-bottom:0}
td.num,th.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.note{font-size:13px;color:var(--mute);margin-top:10px}
.steps{list-style:none;padding:0;counter-reset:s}
.steps li{counter-increment:s;display:grid;grid-template-columns:44px 1fr;gap:6px 14px;padding:16px 0;border-top:1px solid var(--line);margin:0}
.steps li::before{content:counter(s,decimal-leading-zero);font-family:'JetBrains Mono',monospace;color:#c93509;font-size:13px;padding-top:3px}
.steps b{display:block;font-family:'Space Grotesk',sans-serif;font-size:18px}
.cta{margin-top:56px;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.cta a{display:block;text-decoration:none;border:1px solid var(--line);border-radius:2px;padding:20px 22px;transition:border-color .15s}
.cta a:hover{border-color:var(--accent)}
.cta small{display:block;font-size:11.5px;color:var(--accent);margin-bottom:6px}
.cta strong{font-family:'Space Grotesk',sans-serif;font-size:19px;font-weight:600}
.cta span{display:block;margin-top:6px;font-size:14px;color:var(--mute)}
.src{font-size:13.5px;color:var(--mute)}
.stats{margin-top:18px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}
.stats div{border:1px solid var(--line);border-top:3px solid var(--accent);background:var(--soft);padding:16px 16px 14px;border-radius:2px}
.stats b{display:block;font-family:'Space Grotesk',sans-serif;font-size:38px;line-height:1;letter-spacing:-.02em}
.stats span{display:block;margin-top:8px;font-size:14.5px;line-height:1.45}
.stats small{display:block;margin-top:10px;font-size:11.5px;color:var(--mute);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.06em}
.src li{margin:6px 0}
.wrap.notoc{grid-template-columns:minmax(0,1fr)}
.wrap.notoc article{max-width:880px}
.cards{display:grid;gap:16px;margin-top:26px}
.card{display:block;text-decoration:none;color:inherit;border:1px solid var(--line);border-radius:2px;padding:22px 24px;transition:border-color .15s}
.card:hover{border-color:var(--accent)}
.card[hidden]{display:none}
.card .tags{display:flex;flex-wrap:wrap;gap:6px 14px;font-family:'JetBrains Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:#c93509}
.card .tags span:last-child{color:var(--mute)}
.card h3{margin-top:10px;font-size:22px}
.card p{margin:8px 0 0;color:var(--mute);font-size:15px}
article a.card{color:inherit;font-weight:inherit}
.projects{display:grid;gap:14px;margin-top:20px}
.project{border:1px solid var(--line);border-left:3px solid var(--accent);background:var(--soft);padding:16px 20px;border-radius:2px}
.project h3{margin:0;font-size:19px}
.project .where{margin:4px 0 0;font-family:'JetBrains Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--mute)}
.project p{margin:10px 0 0}
.project .src{margin-top:10px;font-size:13px}
.empty{margin-top:26px;color:var(--mute)}
.li-link{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:0 0 24px;padding:12px 16px;border:1px solid var(--line);border-left:3px solid var(--accent);background:var(--soft);border-radius:2px;font-size:14.5px}
.li-link span{font-family:'JetBrains Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--mute)}
.carousel{margin:0 0 26px;max-width:560px}
.car-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;border:1px solid var(--line);border-radius:2px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.car-track::-webkit-scrollbar{display:none}
.car-track:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.car-slide{flex:0 0 100%;margin:0;scroll-snap-align:start}
.car-slide img{display:block;width:100%;height:auto}
.car-ui{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px}
.car-btn{font-family:'JetBrains Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;background:#fff;color:var(--ink);border:1px solid var(--line);border-radius:2px;padding:8px 14px;cursor:pointer;transition:border-color .15s,color .15s}
.car-btn:hover{border-color:var(--accent);color:var(--accent)}
.car-btn:disabled{opacity:.35;cursor:default;border-color:var(--line);color:var(--ink)}
.car-count{font-size:12px;color:var(--mute)}
.toc a.toc-back{display:block;margin:0 0 26px;padding:11px 14px;border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:2px;background:#fff;color:var(--ink);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;transition:border-color .15s,color .15s}
.toc a.toc-back:hover,.toc a.toc-back:focus-visible{color:var(--accent);border-color:var(--accent)}
.back{display:none;margin:0 0 22px;font-size:12px;letter-spacing:.12em;color:#9a9a9a;text-decoration:none;transition:color .15s}
.back:hover,.back:focus-visible{color:var(--accent)}
@media(max-width:959px){.back{display:inline-block}}
.hero-img{margin:0 0 26px}
.hero-img img{display:block;width:100%;max-width:520px;height:auto;border:1px solid var(--line);border-radius:2px}
.hero-img figcaption{margin-top:8px;font-size:12px;color:var(--mute)}
.card.has-img{display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:start}
.card.has-img[hidden]{display:none}
.card img{display:block;width:120px;height:120px;object-fit:cover;border-radius:2px}
@media(max-width:560px){.card.has-img{grid-template-columns:84px 1fr;gap:14px}.card img{width:84px;height:84px}}
.facts{display:grid;gap:0;margin:0 0 8px;border:1px solid var(--line);border-radius:2px;background:var(--soft)}
.facts div{display:grid;grid-template-columns:150px 1fr;gap:6px 16px;padding:11px 16px;border-bottom:1px solid var(--line)}
.facts div:last-child{border-bottom:0}
.facts dt{font-family:'JetBrains Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--mute);padding-top:3px}
.facts dd{margin:0}
@media(max-width:560px){.facts div{grid-template-columns:1fr}}
footer{background:var(--ink);color:#fff}
.foot{max-width:1152px;margin:0 auto;padding:48px 24px 32px}
.foot .logo{color:#fff;font-size:28px}
.foot p{font-size:12px;color:#9a9a9a;margin:10px 0 0}
.foot .links{margin-top:28px;display:flex;flex-wrap:wrap;gap:8px 22px;font-size:13px}
.foot .links a{color:rgba(255,255,255,.75);text-decoration:none}
.foot .links a:hover{color:var(--accent)}
.legal a{display:inline-block;padding:10px 0}
.legal{margin-top:28px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1);font-size:11.5px;color:#9a9a9a;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
`;

const BANNER_JS = `(function(){
var NS="http://www.w3.org/2000/svg",reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function sky(svg){var W=window.innerWidth,H=64,seed=+svg.dataset.seed||7;svg.setAttribute("viewBox","0 0 "+W+" "+H);
 function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
 var r=[],x=0;while(x<W){var w=Math.round(18*.7+rnd()*46),h=Math.round(18+rnd()*40);r.push({x:x,y:H-h,w:Math.max(w-3,1),h:h});x+=w}
 var a=r.length-1-Math.min(6+Math.floor(rnd()*7),r.length-1);
 r.forEach(function(b,i){var e=document.createElementNS(NS,"rect");e.setAttribute("x",b.x);e.setAttribute("y",b.y);e.setAttribute("width",b.w);e.setAttribute("height",b.h);e.setAttribute("fill",i===a?"#ff4a1c":"#9a9a9a");svg.appendChild(e)})}
function ticks(svg,host){var sp=34,rc=host.getBoundingClientRect(),W=Math.round(rc.width),H=Math.round(rc.height);if(W<2||H<2)return;
 svg.setAttribute("viewBox","0 0 "+W+" "+H);svg.innerHTML="";var cols=Math.floor(W/sp),rows=Math.floor(H/sp),ox=(W-cols*sp)/2+sp/2,oy=(H-rows*sp)/2+sp/2,t=[];
 for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var cx=ox+c*sp,cy=oy+r*sp,l=document.createElementNS(NS,"line");l.setAttribute("x1",-5.5);l.setAttribute("x2",5.5);l.setAttribute("y1",0);l.setAttribute("y2",0);l.setAttribute("stroke","#5C5C5C");l.setAttribute("stroke-width",".75");l.setAttribute("stroke-opacity",".6");
  var g=document.createElementNS(NS,"g");g.setAttribute("transform","translate("+cx+","+cy+") rotate("+Math.random()*360+")");g.appendChild(l);svg.appendChild(g);t.push({g:g,l:l,cx:cx,cy:cy})}
 if(reduce)return;var px=-999,py=-999,tx=0,ty=0,inside=false,ph=Math.random()*6.283;
 host.addEventListener("mousemove",function(e){var b=svg.getBoundingClientRect();inside=true;tx=(e.clientX-b.left)/b.width*W;ty=(e.clientY-b.top)/b.height*H});
 host.addEventListener("mouseleave",function(){inside=false});
 function loop(ms){var s=ms/1000,ax=W/2+Math.sin(s+ph)*W*.3+Math.sin(s*.53+ph*1.7)*W*.16,ay=H/2+Math.cos(s*.8+ph*1.3)*H*.3+Math.cos(s*.61+ph*.6)*H*.16;
  var gx=inside?tx:ax,gy=inside?ty:ay,k=inside?.22:.05;px+=(gx-px)*k;py+=(gy-py)*k;
  t.forEach(function(n){var dx=px-n.cx,dy=py-n.cy,d=Math.sqrt(dx*dx+dy*dy),inf=Math.max(0,1-d/180);n.g.setAttribute("transform","translate("+n.cx+","+n.cy+") rotate("+Math.atan2(dy,dx)*180/Math.PI+")");n.l.setAttribute("stroke",inf>.05?"#FF4A1C":"#5C5C5C");n.l.setAttribute("stroke-opacity",Math.min(1,.35+inf*.9))});
  requestAnimationFrame(loop)}
 requestAnimationFrame(loop)}
function init(){sky(document.getElementById("sky"));var b=document.querySelector(".banner");ticks(b.querySelector(".ticks"),b);var f=document.querySelector("footer");ticks(f.querySelector(".foot-ticks"),f)}
var m=document.querySelector(".menu"),n=document.getElementById("nav");m.addEventListener("click",function(){var o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(init);else init();
})();`;

export function shell({ path: p, seed = 7, wideH1 = false, ldName, title, description, h1, lede, eyebrow, meta, toc = [], body, schemaType, published, ld: ldOverride, ogType = "article", banner = "", marketLink = false, ogImage = "", backLink = null }) {
  const url = SITE + p;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: ldName || h1.replace(/<[^>]+>/g, ""),
      description,
      mainEntityOfPage: url,
      datePublished: published,
      dateModified: published,
      author: { "@type": "Organization", name: "Paterson", url: SITE + "/" },
      publisher: { "@type": "Organization", name: "Paterson", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/favicon-512.png" } },
      image: SITE + "/og-image.png",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: ldName || h1.replace(/<[^>]+>/g, ""), item: url },
      ],
    },
  ];
  const ldFinal = ldOverride || ld;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="Paterson">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${ogImage || SITE + "/og-image.png"}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ogImage || SITE + "/og-image.png"}">
<link rel="icon" href="/favicon.ico"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
${ldFinal.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n")}
<style>${CSS}</style></head>
<body>
${banner}<header><div class="bar"><a class="logo" href="/">Paterson<span>.</span></a>
<button class="menu" aria-label="Toggle menu" aria-expanded="false"><i></i><i></i></button><nav class="mono" id="nav"><a href="/">Home</a><a href="/jobs">Live Roles</a><a href="/candidates">Candidates</a><a href="/clients">Clients</a><a href="/team">Team</a><a href="/contact">Contact</a></nav></div></header>
<section class="banner"><svg class="ticks" aria-hidden="true"></svg><div class="hero">${backLink ? `<a class="back mono" href="${backLink.href}">&larr; ${esc(backLink.label)}</a>` : ""}<p class="eyebrow mono">/ ${esc(eyebrow)}</p><h1${wideH1 ? ` class="wide${wideH1 === "entry" ? " entry" : ""}"` : ''}>${h1}</h1><p class="lede">${lede}</p><p class="meta mono">${esc(meta)}</p></div><svg class="sky" id="sky" preserveAspectRatio="none" aria-hidden="true" data-seed="${seed}"></svg></section>
<div class="wrap${toc.length ? "" : " notoc"}">${toc.length ? `<aside class="toc">${backLink ? `<a class="toc-back mono" href="${backLink.href}">&larr; ${esc(backLink.label)}</a>` : ""}<p class="mono">/ On this page</p>${toc.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join("")}</aside>` : ""}
<article>${body}</article></div>
<footer><svg class="foot-ticks" aria-hidden="true"></svg><div class="foot"><a class="logo" href="/">Paterson<span>.</span></a><p class="mono">For those who build</p>
<div class="links mono"><a href="/jobs">Live Roles</a><a href="/candidates">Candidates</a><a href="/clients">Clients</a><a href="/team">Team</a><a href="/contact">Contact</a><a href="/how-we-work">How We Work</a><a href="/guides/construction-careers-nyc">Career Guide</a>${marketLink ? '<a href="/market-watch">Market Watch</a>' : ""}</div>
<div class="legal mono"><span>© 2026 Paterson Group L.L.C-FZ</span><span><a href="/terms" style="color:#9a9a9a">Terms &amp; Conditions</a> · <a href="/privacy" style="color:#9a9a9a">Privacy Policy</a> · <a href="/disclaimer" style="color:#9a9a9a">Disclaimer</a></span><span>Across the US</span></div></div></footer>
<script>${BANNER_JS}</script>
</body></html>`;
}

export const cta = `<div class="cta">
<a href="/clients"><small class="mono">/ Hiring</small><strong>Brief us on a role</strong><span>A short call to scope the search. No hire, no fee.</span></a>
<a href="/candidates"><small class="mono">/ Looking</small><strong>Speak to us in confidence</strong><span>No details are shared without your consent.</span></a>
<a href="/jobs"><small class="mono">/ Open now</small><strong>View live roles</strong><span>Current opportunities across the US.</span></a></div>`;
