# Paterson & Co — Website

Single Vercel project: `index.html` (the static site) plus `api/` (serverless
functions for live Airtable data and the site's 4 forms, sent via Resend).
Both are deployed together from this repo root, so the site and its API
share one origin — no cross-origin config needed.

## Structure

- `index.html` — the full site, self-contained (no build step). This is a
  compiled/bundled export from the design tool — don't hand-edit it, changes
  are overwritten on the next export. For content/design changes, edit the
  source design file and re-export.
- `api/` — Vercel serverless functions:
  - `api/jobs.js`, `api/team.js` — read live job/team data from Airtable
  - `api/contact.js`, `api/client.js`, `api/join.js`, `api/candidate.js` — send
    the site's 4 forms as email via Resend
  - `api/_lib/resend.js` — shared Resend helper (not a route)

## SEO build (runs on every Vercel deploy)

`vercel.json` runs `node scripts/build.js`, which writes the deployable site to `public/`
(git-ignored). It reads `index.html` and, for each route, adds that page's own title,
description, canonical, robots, Open Graph tags, JSON-LD and a crawler-readable body
(h1, summary, real links). It also patches the bundle bootstrap so those head tags survive
the document swap (otherwise the rendered page has no title or description).

- Page metadata lives in **`scripts/seo-routes.js`** — edit titles/descriptions there.
  `index: false` = noindex and left out of the sitemap (currently /termsofbusiness). The testimonials page and homepage carousel were removed
  (placeholder quotes); re-add real ones only with permission.
- Long-form guides (`/how-we-work`, `/guides/construction-careers-nyc`) are static pages written
  by **`scripts/guides.mjs`** during the build (edit the copy there). Add a new guide's path to
  `GUIDE_PAGES` in `scripts/seo-routes.js` so it appears in the sitemap, and link it from the footer.
- `/sitemap.xml` is `api/sitemap.js` (static pages + guides + live Airtable roles). `robots.txt` and
  `llms.txt` are copied as-is.
- The build is idempotent, so a fresh export from the design tool is fixed up on deploy.
  The click-through `href`s and `updateSeo` (title changes while browsing) are hand-patches in
  the template and must be re-applied after a re-export.
- Run `node scripts/build.js` locally to preview `public/`.

## Deploy (Vercel)

1. Import this repo into a Vercel project. Root Directory should be the repo
   root (default) — Vercel auto-detects `api/` as serverless functions and
   serves `index.html` as the static site, both from one deployment.
2. In Project Settings → Environment Variables, add:
   - `AIRTABLE_BASE_ID` — from airtable.com/developers/web/api (`appXXXXXXXXXXXXXX`)
   - `AIRTABLE_TOKEN` — a Personal Access Token from airtable.com/create/tokens,
     scope `data.records:read`, access limited to this one base
   - `paterson_website_RESEND` — a Resend API key with sending access. Keep
     this exact name — the code reads `process.env.paterson_website_RESEND`.
3. Also add the same three values locally to a `.env.local` file at the repo
   root (gitignored) if developing/testing locally.
4. In Project Settings → Domains, add `patersoncompany.com` (and `www`) and
   point DNS at it per Vercel's instructions.
5. Deploy. `index.html`'s `airtableProxyUrl` prop should be left **empty** —
   the frontend already falls back to same-origin relative paths
   (`/api/jobs`, `/api/contact`, etc.), which works automatically once the
   site and API share one Vercel deployment.

Airtable endpoints only return rows where `Status` = `Live`.

## Jobs table field for long-form descriptions

The Jobs table's `Summary` field is the short, one-line teaser shown on job
cards. Add a separate **`Full Description`** column (long text) for the
fuller write-up shown on a role's detail page — the proxy reads it and falls
back to `Summary` if left blank, so it's optional per row.

## Form emails (Resend)

Each form endpoint is a plain JSON POST, sends via Resend, and delivers to
`nelson@patersoncompany.com` (from the same verified address).

| Endpoint | Body |
|---|---|
| `/api/contact` | `{ name, email, subject, message }` |
| `/api/client` | `{ company, contactName, email, phone, roleTitle, market, sector, details }` |
| `/api/join` | `{ name, email, phone, role, message, resume? }` |
| `/api/candidate` | `{ name, email, title, market, phone, role?, notes, cv?, projectList? }` |

`resume`, `cv`, and `projectList` are each `{ filename, contentType, content }`
where `content` is the file read client-side as a base64 data URL — not a
multipart upload. Keep resumes/CVs under a few MB: Vercel's default
serverless request-body limit is 4.5MB, and base64 adds ~33% overhead on top
of the raw file size.

### Preventing duplicate submissions

None of the 4 submit buttons disable themselves while a request is in
flight, so clicking Submit more than once before the first request finishes
fires a completely separate submission each time — duplicate emails, same
attachment. Each submit handler in the design tool's source should guard
against this with an early return, right after `e.preventDefault();`:

```js
submitContact = (e) => {
  e.preventDefault();
  if (this.state.contactStatus === "sending") return;
  // ...rest of the handler unchanged
};

submitClient = (e) => {
  e.preventDefault();
  if (this.state.clientStatus === "sending") return;
  // ...rest of the handler unchanged
};

submitJoinDesk = (e) => {
  e.preventDefault();
  if (this.state.joinDeskStatus === "sending") return;
  // ...rest of the handler unchanged
};

submitCandidate = (e) => {
  e.preventDefault();
  if (this.state.candidateStatus === "sending") return;
  // ...rest of the handler unchanged
};
```
