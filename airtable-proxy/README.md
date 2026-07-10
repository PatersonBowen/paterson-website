# Airtable proxy — deploy instructions

This is a tiny Vercel project with two serverless functions that read your
Airtable base server-side, so your Personal Access Token never reaches the
browser.

## Deploy (Vercel)

1. Create a new GitHub repo (or a new folder) containing just this
   `airtable-proxy/` folder's contents at the repo root (`api/jobs.js`,
   `api/team.js`).
2. Go to vercel.com → New Project → import that repo. No build config needed
   — Vercel auto-detects the `api/` folder as serverless functions.
3. In Project Settings → Environment Variables, add:
   - `AIRTABLE_BASE_ID` — from airtable.com/developers/web/api (looks like `appXXXXXXXXXXXXXX`)
   - `AIRTABLE_TOKEN` — a Personal Access Token from airtable.com/create/tokens,
     scope `data.records:read`, access limited to this one base
4. Deploy. You'll get a URL like `https://your-project.vercel.app`.
5. Your two endpoints are:
   - `https://your-project.vercel.app/api/jobs` → `{ jobs: [...] }`
   - `https://your-project.vercel.app/api/team` → `{ members: [...] }`

Both only return rows where `Status` = `Live`.

## Jobs table field for long-form descriptions

The Jobs table's `Summary` field is the short, one-line teaser shown on job
cards. Add a separate **`Full Description`** column (long text) for the
fuller write-up shown on a role's detail page — the proxy reads it and falls
back to `Summary` if left blank, so it's optional per row.

## Give the URL back

Once deployed, send the base URL (e.g. `https://your-project.vercel.app`)
back and the site will be pointed at these endpoints, replacing the
placeholder job/team listings with live Airtable data.

## Alternatives to Vercel

Same two function bodies work almost as-is on:
- **Cloudflare Workers** (wrap the handler in `export default { fetch(req) {...} }`, swap `req.query`/`res.json` for `Response`)
- **Netlify Functions** (same shape as Vercel, folder is `netlify/functions/`)
