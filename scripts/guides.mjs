// Long-form guide pages (/how-we-work, /guides/...). Static HTML, written into public/
// by scripts/build.js. Edit the copy below, then deploy. Page paths and dates are also
// listed in GUIDE_PAGES in scripts/seo-routes.js (used by the sitemap).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "..", "public");
fs.mkdirSync(path.join(out, "guides"), { recursive: true });

import { shell, cta } from "./page-shell.mjs";
import { ENTRIES } from "../content/market-watch.js";

// Footer shows a Market Watch link only once there is at least one published update.
const marketLink = ENTRIES.length > 0;

/* ------------------------------------------------------------------ PAGE 1 */
const how = shell({
  marketLink,
  path: "/how-we-work", seed: 31, wideH1: true,
  title: "How We Work: Contingent Construction Recruitment | Paterson",
  ldName: "How Paterson works: contingent construction and real estate recruitment",
  description:
    "Paterson is a contingent construction and real estate recruiter: you pay only when a hire starts. See how a search runs across the US.",
  eyebrow: "How we work",
  h1: "Finding the right people,<br>for your opportunity<span class=\"dot\">.</span>",
  lede:
    "Paterson places leaders and specialists across construction and real estate. Our work is contingent, so you pay only for results. No hire, no fee.",
  meta: "Updated October 2026",
  published: "2026-10-19",
  toc: [
    ["short", "The Basics"],
    ["contingent", "How Contingent Recruitment Works"],
    ["ads", "Why Job Ads Fall Short"],
    ["search", "How A Search Runs"],
    ["candidates", "For Candidates"],
    ["when-ads", "When Advertising Is Appropriate"],
    ["sources", "Sources"],
  ],
  body: `
<h2 id="short">The Basics</h2>
<ul>
<li><b>Paid on results.</b> Our fee is payable only when a candidate we introduce starts with you. Until then, you pay nothing.</li>
<li><b>Direct search.</b> The strongest project managers, superintendents and development leads are rarely looking for work. We identify them and approach them directly across the US, or introduce candidates from our network of pre-screened professionals, rather than waiting for applications.</li>
<li><b>A considered shortlist.</b> You receive a small number of assessed candidates, each presented with our written reasoning, rather than a stack of resumes.</li>
</ul>

<h2 id="contingent">How Contingent Recruitment Works</h2>
<p>There are three common ways to fill a senior construction or real estate role. They differ in who carries the burden of the search, the pool of candidates you can access, and who carries the risk.</p>
<div class="tbl"><table>
<thead><tr><th></th><th>Job ad</th><th>Contingent search</th><th>Retained search</th></tr></thead>
<tbody>
<tr><td><b>Who finds candidates</b></td><td>Candidates respond to you</td><td>The recruiter identifies and approaches candidates</td><td>The recruiter identifies and approaches candidates</td></tr>
<tr><td><b>When you pay</b></td><td>Upfront, for the listing, regardless of outcome</td><td>Only when a hire starts</td><td>In stages, including before a hire is made</td></tr>
<tr><td><b>Who screens</b></td><td>Your team</td><td>The recruiter</td><td>The recruiter</td></tr>
<tr><td><b>Best suited to</b></td><td>High-volume and early-career roles</td><td>Specific senior and mid-senior roles where the quality of the hire matters</td><td>Exclusive, confidential searches at executive level</td></tr>
</tbody></table></div>
<p>Our fee is a percentage of the hire's first-year base salary, agreed in writing before work begins. We invoice only after the hire has started. Every placement is also backed by a replacement guarantee. If the hire leaves, or is let go for performance, within the guarantee window, we run a replacement search at no extra cost. Conditions apply and are set out in our terms of business.</p>

<h2 id="ads">Why Job Ads Fall Short for Senior Construction Hires</h2>
<p>A job ad is cheap to place and looks like progress. For a senior or specialist role, it usually brings volume rather than fit.</p>

<h3>1. The Strongest Candidates Are Not Searching</h3>
<p>Senior project executives, superintendents and development leads are busy delivering their current projects. They aren't browsing listings. A job ad only reaches people who are actively looking. Reaching everyone else takes a direct, informed approach.</p>

<h3>2. Advertising Attracts Availability, Not Suitability</h3>
<p>Some active candidates are excellent. Many are simply available. Every application still has to be reviewed, and that time comes from the people running your projects.</p>

<h3>3. A Resume Does Not Show What Matters in Construction</h3>
<p>A title such as "Senior Project Manager" can describe someone who delivered a $300M residential tower in Manhattan or someone who managed fit-outs. What separates them is project scale, delivery method, client type, market and reporting line. That only emerges in conversation.</p>

<h3>4. A Public Listing Is Not Confidential</h3>
<p>Replacing an underperformer, covering a departure or staffing a pursuit before it's announced all call for discretion. A public listing is visible to clients, competitors and your own team.</p>

<h3>5. Your Ad Competes With Every Other Ad</h3>
<p>The most sought-after candidates are approached all the time. A generic ad rarely beats a considered conversation with someone who understands their work and can explain why a specific role is worth a move.</p>

<h3>The Numbers Behind It</h3>
<div class="stats">
<div><b>92%</b><span>of construction firms report difficulty hiring for open positions.</span><small>AGC and NCCER, 2025 Workforce Survey</small></div>
<div><b>57%</b><span>say the candidates available lack the skills or qualifications required.</span><small>AGC and NCCER, 2025 Workforce Survey</small></div>
<div><b>244</b><span>applications for the average job posting, up from 116 in 2022.</span><small>Greenhouse, The Hire Standard (March 2026)</small></div>
</div>
<p class="note">The AGC and NCCER survey covers all construction positions, not only senior roles, and the Greenhouse figure covers all industries. Both are cited as context for current hiring conditions, not as measures of senior construction roles specifically.</p>

<div class="callout"><p><b>The cost of delay.</b> An unfilled lead project manager or superintendent position can cost more each week than the fee for filling it. The real comparison isn't a job ad versus a recruiter on price. It's which route puts the right person in the seat soonest.</p></div>

<h2 id="search">How A Construction And Real Estate Search Runs</h2>
<p>We recruit for three types of employer: general contractors, owner's representatives and developers. Roles range from project manager and superintendent to project executive and development director. Every search follows the same four steps.</p>
<ol class="steps">
<li><div><b>Map the market</b>We define the role with you: scale, delivery type, reporting line, must-haves and comp band. You approve the target list of firms and titles before we approach anyone.</div></li>
<li><div><b>Approach discreetly</b>We contact the right people directly, including those who aren't on the market, and draw on our network of pre-screened professionals. Every conversation is confidential by default, on both sides.</div></li>
<li><div><b>Shortlist with reasoning</b>We assess each candidate on what they have delivered, why they would move and where the risk sits. You receive three to five candidates, each with written reasoning and suggested questions for the interview.</div></li>
<li><div><b>Close and onboard</b>We support the offer, any counter-offer and the notice period, and stay involved until the hire is at their new desk.</div></li>
</ol>
<p>If the brief or the pay is unlikely to land the hire in the current market, we say so early.</p>

<h2 id="candidates">For Construction And Real Estate Candidates</h2>
<p>Candidates never pay a fee, and no details are shared with a client without your consent. We discuss the role and the client with you, and give candid feedback at each stage. Where nothing live is suitable, we can still advise on where your title and compensation sit in the current market. You can <a href="/candidates">send us your details in confidence</a>, see our <a href="/jobs">live roles</a>, or read our <a href="/guides/construction-careers-nyc">guide to construction careers and New York pay</a>.</p>

<h2 id="when-ads">When Advertising Is Appropriate</h2>
<p>Job ads have their place. They work well for high-volume and early-career hiring, for roles backed by a strong employer brand, and where there is time to screen applicants. If that describes your situation, we'll say so. For senior and specialist construction and real estate roles, a direct search is typically faster and produces stronger candidates. If you're hiring, <a href="/clients">tell us about the role</a>.</p>
${cta}
<h2 id="sources">Sources</h2>
<ul class="src">
<li>Associated General Contractors of America and NCCER, 2025 Workforce Survey: 92% of firms reported difficulty hiring for open positions; 57% cited a lack of skills and qualifications among available candidates.</li>
<li>Greenhouse, The Hire Standard (March 2026): average of 244 applications per job in 2025, up from 116 in 2022, across more than 6,000 companies and 640 million applications.</li>
</ul>
`,
});

/* ------------------------------------------------------------------ PAGE 2 */
const guide = shell({
  marketLink,
  path: "/guides/construction-careers-nyc", seed: 37,
  title: "Construction Career Paths & NYC Salaries (2026) | Paterson",
  ldName: "Construction careers in New York: career paths and salaries (2026)",
  description:
    "Construction careers in New York: how graduates start, the ladder from field engineer to project executive, and what each role pays in 2026.",
  eyebrow: "Guide",
  h1: "A Graduate's Guide to Construction in New York<span class=\"dot\">.</span>",
  lede:
    "This guide covers how graduates start a construction career in New York, how the ladder runs from field engineer to project executive, and what each stage typically pays in 2026. It draws on official wage data and published graduate programs.",
  meta: "Updated October 2026",
  published: "2026-10-19",
  toc: [
    ["map", "The Industry Map"],
    ["start", "Where Graduates Start"],
    ["ladder", "The Career Ladder"],
    ["pay", "NYC Salaries (2026)"],
    ["paths", "Four Example Paths"],
    ["accelerate", "What Accelerates A Career"],
    ["switch", "Changing Sides"],
    ["sources", "Sources And Method"],
  ],
  body: `
<p>Construction gives graduates responsibility early. Within a few years, a graduate can be running part of a nine-figure project, and pay in New York rises quickly with project size. The industry can be hard to read from the outside, because one building involves several employers, each hiring for different roles. This guide explains who hires whom, how careers progress and what each stage pays.</p>

<h2 id="map">The Construction Industry Map: Who Hires Whom</h2>
<p>Almost every large New York project involves three kinds of employer. Where you start shapes your first few years, although the boundaries between them aren't fixed.</p>
<div class="tbl"><table>
<thead><tr><th>Side</th><th>Role in the project</th><th>Typical entry roles</th></tr></thead>
<tbody>
<tr><td><b>Contractor side</b><br>(general contractors and construction managers)</td><td>Build the project: schedule, cost, subcontractors, safety and delivery on site.</td><td>Field engineer, project engineer, engineering assistant, assistant superintendent, estimator</td></tr>
<tr><td><b>Owner and developer side</b></td><td>Fund and own the project. Decide what is built, on what budget and by when.</td><td>Analyst, assistant project manager, development associate, asset management associate</td></tr>
<tr><td><b>Owner's representative</b><br>(project management firms)</td><td>Act as the owner's expert advisor: oversee budget, schedule and the contractor.</td><td>Assistant project manager, project coordinator, cost or schedule analyst</td></tr>
</tbody></table></div>
<p class="note">Design firms (architects and engineers) and specialty trade contractors are the other major employers. This guide focuses on the three sides above, which are the ones Paterson recruits for.</p>

<h2 id="start">Where Construction Graduates Start</h2>
<p>The Bureau of Labor Statistics lists a bachelor's degree in construction, engineering, business or a related field as the typical route to a construction manager role. Internships and co-op programs provide the experience employers look for. New managers typically work under an experienced manager for up to a year, and some firms run training programs lasting several years.</p>
<p>Large contractors recruit new graduates directly into structured entry-level roles. Recent examples:</p>
<ul>
<li><b>Turner Construction</b> recruits new graduates and interns as field engineers and engineering assistants across the US. This includes a New York City engineering assistant program for summer and fall 2026. Qualifying degrees include civil, mechanical, electrical and construction management.</li>
<li><b>Gilbane Building Company</b> runs "Building Dynamic Builders", which hires entry-level Field Engineer I staff and provides both engineering and superintendent-side experience, with advancement paths built in.</li>
<li><b>Skanska USA</b> hires new-graduate Field Engineer I roles and runs a co-op program with tracks in engineering, field engineering, cost, safety and estimating.</li>
</ul>
<p>The title varies: field engineer, project engineer or engineering assistant. The work is similar. It covers layout, documentation, submittals, requests for information and safety, plus support for the superintendent and project manager. It's where graduates learn how a building is put together.</p>

<h2 id="ladder">The Career Ladder: Office Track And Field Track</h2>
<p>On the contractor side, the path splits after the first couple of years. The office track runs through project management. The field track runs through the superintendent roles. Neither is better; people move between them, and both can reach the top of a firm.</p>
<div class="tbl"><table>
<thead><tr><th>Stage</th><th>Office track</th><th>Field track</th><th class="num">Typical time in role</th></tr></thead>
<tbody>
<tr><td>1</td><td>Engineering assistant / field engineer</td><td>Same entry role</td><td class="num">1–3 years</td></tr>
<tr><td>2</td><td>Project engineer</td><td>Assistant superintendent</td><td class="num">2–4 years</td></tr>
<tr><td>3</td><td>Assistant project manager</td><td>Superintendent</td><td class="num">2–4 years</td></tr>
<tr><td>4</td><td>Project manager</td><td>Senior superintendent</td><td class="num">3–6 years</td></tr>
<tr><td>5</td><td>Senior project manager</td><td>General superintendent</td><td class="num">3–6 years</td></tr>
<tr><td>6</td><td>Project executive / vice president</td><td>Director of field operations</td><td class="num">Senior leadership</td></tr>
</tbody></table></div>
<p class="note">Time in role is a general guide. It varies considerably by firm, project size and individual, and strong performers on large projects often progress faster.</p>

<h2 id="pay">Construction Salaries in New York (2026)</h2>
<p>Pay in New York runs well above the national figure. The national median for construction managers was $114,990 in May 2025. In the New York metro area, the median for the same occupation was $158,000. Two tables follow: measured wages from official data, and Paterson's estimates by career stage.</p>

<h3>Measured: Official Wages, New York Metro Area, May 2025</h3>
<div class="tbl"><table>
<thead><tr><th>Occupation</th><th class="num">Lower 25%</th><th class="num">Median</th><th class="num">Upper 25%</th><th class="num">Top 10%</th></tr></thead>
<tbody>
<tr><td>Construction managers</td><td class="num">$118,630</td><td class="num">$158,000</td><td class="num">$202,280</td><td class="num">$250,520</td></tr>
<tr><td>Civil engineers</td><td class="num">$88,710</td><td class="num">$107,330</td><td class="num">$143,310</td><td class="num">$176,400</td></tr>
<tr><td>Construction supervisors (first-line)</td><td class="num">$81,180</td><td class="num">$103,990</td><td class="num">$131,670</td><td class="num">$154,540</td></tr>
<tr><td>Cost estimators</td><td class="num">$62,020</td><td class="num">$82,380</td><td class="num">$113,610</td><td class="num">$150,690</td></tr>
</tbody></table></div>
<p class="note">Source: U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, New York-Newark-Jersey City metro area, May 2025. Annual wages. "Lower 25%" and "Upper 25%" are the 25th and 75th percentiles; "Top 10%" is the 90th percentile.</p>

<h3>Estimated: Base Salary by Stage, New York, 2026</h3>
<div class="tbl"><table>
<thead><tr><th>Stage (contractor side)</th><th class="num">Estimated base salary</th><th>Basis</th></tr></thead>
<tbody>
<tr><td>Engineering assistant / field engineer (new graduate)</td><td class="num">$70,000 – $90,000</td><td>Early-career project engineer salary data for New York (about $80,000 average, Payscale 2026); graduate field engineer pay at large contractors</td></tr>
<tr><td>Project engineer</td><td class="num">$85,000 – $115,000</td><td>Salary survey data for New York; between the BLS civil engineer lower quartile and median</td></tr>
<tr><td>Assistant project manager / assistant superintendent</td><td class="num">$100,000 – $140,000</td><td>Between project engineer and project manager bands</td></tr>
<tr><td>Project manager / superintendent</td><td class="num">$130,000 – $190,000</td><td>BLS construction manager lower to upper quartile, consistent with salary survey figures</td></tr>
<tr><td>Senior project manager / general superintendent</td><td class="num">$170,000 – $230,000</td><td>BLS upper quartile to top decile for construction managers</td></tr>
<tr><td>Project executive and above</td><td class="num">$220,000 +</td><td>Top decile and beyond; bonus and equity often form a substantial part of total pay</td></tr>
</tbody></table></div>
<p class="note">These are estimates of base salary and exclude bonus, overtime, equity and benefits. The bands are drawn from the official data above and published salary surveys, and are not offers or guarantees. Individual pay depends on the firm, project size, union status and track record. On the developer side, a finance-side associate role at a large New York developer was recently advertised at $90,000–$110,000.</p>
<div class="callout"><p><b>Reading the numbers.</b> Pay doesn't rise in a straight line. The largest steps come when a professional takes responsibility for a project's budget and schedule, which is the move to project manager or superintendent. They come again when that person owns several projects or a profit and loss account.</p></div>

<h2 id="paths">Four Example Construction Career Paths</h2>
<p>Careers rarely follow the chart exactly. These four composite examples show common routes. They're illustrative profiles built from the programs and data above, not named individuals.</p>

<h3>Path A: The Project Management Route (Contractor Side)</h3>
<p>A civil engineering graduate joins a large New York general contractor as an engineering assistant. After about two years as a project engineer on a high-rise, they become an assistant project manager, and a project manager on a mid-size project by year six or seven. By year ten or eleven, they're a senior project manager running a nine-figure project. The step that mattered most was joining a large, complex project early.</p>

<h3>Path B: The Field Route</h3>
<p>A construction management graduate starts as a field engineer and moves to assistant superintendent, learning sequencing, safety and trade coordination. They become a superintendent running the structure and envelope of a tower. Strong superintendents in New York are scarce and well paid, and many reach general superintendent without moving to the office side.</p>

<h3>Path C: Contractor to Developer</h3>
<p>A project manager with several large projects behind them moves to a developer's construction or development team. The move brings client-side responsibility for budget and design decisions, often with a bonus tied to project outcomes. Contractor-side experience is valuable here because the developer needs someone who understands how the contractor works.</p>

<h3>Path D: Contractor to Owner's Representative</h3>
<p>A project engineer or assistant project manager joins an owner's representative firm early. They oversee several projects at once, work directly with owners and develop cost and risk management skills. Exposure to many project types can lead to senior owner's representative or client-side roles faster than the single-project view of a contractor.</p>

<h2 id="accelerate">What Accelerates A Construction Career</h2>
<ul>
<li><b>Project quality over title.</b> Two years on a complex, high-profile project teaches more than four on routine work, and it's visible on a resume.</li>
<li><b>Visible ownership.</b> A subcontractor buyout, a closeout or a schedule recovery demonstrates responsibility.</li>
<li><b>Site experience.</b> Office-track professionals who have spent time in the field are trusted more.</li>
<li><b>Credentials that fit the path.</b> PMP and CCM for project management, a PE license for engineering tracks, OSHA 30 and New York site safety training for field roles, and LEED AP where sustainability matters. None is mandatory, but each strengthens a profile.</li>
<li><b>A track record others can vouch for.</b> Senior roles are often filled through people who already know your work. Professionals who deliver well and stay in contact with colleagues, subcontractors and clients are approached first.</li>
</ul>

<h2 id="switch">Changing Sides: Contractor, Developer And Owner's Representative</h2>
<p>Moving between contractor, developer and owner's representative roles is common in the first ten years, and pay can change meaningfully as a result. The strongest moment to move is after delivering at least one full project from start to finish, because that is the experience the other side wants to see.</p>
<p>If you're weighing a move, <a href="/candidates">speak to us in confidence</a> or browse our <a href="/jobs">live roles</a>. If you're hiring for these roles, <a href="/clients">brief us on the position</a> or read <a href="/how-we-work">how we work</a>.</p>
${cta}

<h2 id="sources">Sources And Method</h2>
<ul class="src">
<li>U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025: New York-Newark-Jersey City metro area wage estimates for Construction Managers (SOC 11-9021), Civil Engineers (17-2051), First-Line Supervisors of Construction Trades and Extraction Workers (47-1011) and Cost Estimators (13-1051).</li>
<li>U.S. Bureau of Labor Statistics, Occupational Outlook Handbook: Construction Managers (2025 median pay of $114,990; bachelor's degree typical; employment projected to grow 9% from 2025 to 2035).</li>
<li>Published entry-level programs and postings from Turner Construction, Gilbane Building Company and Skanska USA, 2026.</li>
<li>Published salary survey data for New York project engineer and project manager roles (Payscale, Salary.com), 2026.</li>
</ul>
<p class="note">Estimated bands are Paterson's own synthesis and will be reviewed as new data is published. Wage data is the most recent available at the time of writing.</p>
`,
});

fs.writeFileSync(path.join(out, "how-we-work.html"), how);
fs.writeFileSync(path.join(out, "guides", "construction-careers-nyc.html"), guide);
console.log("wrote", fs.readdirSync(out), fs.readdirSync(path.join(out, "guides")));
