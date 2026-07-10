# Paterson & Co — Website

Static single-page site (`index.html`) plus an optional Airtable-backed data proxy.

## Structure

- `index.html` — the full site, self-contained (no build step, no other files needed). Open directly or deploy as-is to any static host (GitHub Pages, Vercel, Netlify, S3, etc).
- `airtable-proxy/` — optional Vercel serverless functions that serve live job/team data from Airtable instead of the built-in placeholder data. See `airtable-proxy/README.md` for deploy steps. Once deployed, point the site at it (see below).

## Deploying `index.html`

**GitHub Pages:**
1. Push this repo to GitHub.
2. Repo Settings → Pages → Deploy from branch → select `main` (or your default branch) and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Any other static host:** just upload `index.html` — it's fully self-contained.

## Connecting live Airtable data (optional)

By default the site shows built-in placeholder jobs and team members. To replace them with live data from Airtable:
1. Deploy `airtable-proxy/` to Vercel (see its README for the two env vars it needs).
2. Open `index.html` in the design tool's Tweaks panel (or edit the `airtableProxyUrl` prop directly in the `<script data-dc-script>` tag's `data-props` JSON) and set it to your deployed proxy's base URL.

## Editing

`index.html` is a compiled/bundled output. For any future content or design changes, edit the source design file and re-export — don't hand-edit this bundle, changes will be overwritten on the next export.
