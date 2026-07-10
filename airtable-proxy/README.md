# Airtable proxy — deploy instructions

This is a tiny Vercel project with serverless functions that (a) read your
Airtable base server-side, so your Personal Access Token never reaches the
browser, and (b) send the site's 4 forms as email via Resend, so your Resend
API key never reaches the browser either.

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

Same function bodies work almost as-is on:
- **Cloudflare Workers** (wrap the handler in `export default { fetch(req) {...} }`, swap `req.query`/`res.json` for `Response`)
- **Netlify Functions** (same shape as Vercel, folder is `netlify/functions/`)

## Form emails (Resend)

Four endpoints replace the site's old Formspree integration. Each is a plain
JSON POST, sends via Resend, and delivers to `nelson@patersoncompany.com`
(from the same verified address). Set one more env var alongside the
Airtable ones:

- `paterson_website_RESEND` — a Resend API key with sending access. Keep this
  exact name — the code reads `process.env.paterson_website_RESEND`, not
  `RESEND_API_KEY`.

| Endpoint | Replaces (Formspree ID) | Body |
|---|---|---|
| `/api/contact` | `mpqgvzek` | `{ name, email, subject, message }` |
| `/api/client` | `mwvdgkjj` | `{ company, contactName, email, phone, roleTitle, market, sector, details }` |
| `/api/join` | `mgojgebp` | `{ name, email, phone, role, message, resume? }` |
| `/api/candidate` | `xojogqzk` | `{ name, email, title, market, phone, role?, notes, cv?, projectList? }` |

`resume`, `cv`, and `projectList` are each `{ filename, contentType, content }`
where `content` is the file read client-side as a base64 data URL (see
snippets below) — not a multipart upload. Keep resumes/CVs under a few MB:
Vercel's default serverless request-body limit is 4.5MB, and base64 adds
~33% overhead on top of the raw file size.

### Frontend wiring (paste into the design tool's source, not into index.html)

`index.html` is a generated bundle — hand-edits are lost on the next export.
These snippets replace the 4 `fetch("https://formspree.io/f/...")` calls with
calls to the endpoints above, reusing the same `airtableProxyUrl` prop as the
base URL (same Vercel deployment serves both).

Add once, alongside the other class methods:

```js
fileToDataUrl = (file) =>
  new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () =>
      resolve({ filename: file.name, contentType: file.type, content: reader.result });
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
```

Replace `submitContact`:

```js
submitContact = (e) => {
  e.preventDefault();
  const s = this.state;
  this.setState({ contactStatus: "sending" });
  const base = (this.props.airtableProxyUrl || "").replace(/\/$/, "");
  fetch(base + "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: s.contactName,
      email: s.contactEmail,
      subject: s.contactSubject,
      message: s.contactMessage,
    }),
  })
    .then((r) => {
      this.setState({ contactStatus: r.ok ? "done" : "error" });
      if (r.ok) {
        clearTimeout(this._contactResetTimer);
        this._contactResetTimer = setTimeout(() => {
          this.setState({ contactStatus: "idle", contactName: "", contactEmail: "", contactSubject: "", contactMessage: "" });
        }, 5000);
      }
    })
    .catch(() => this.setState({ contactStatus: "error" }));
};
```

Replace `submitClient`:

```js
submitClient = (e) => {
  e.preventDefault();
  const s = this.state;
  this.setState({ clientStatus: "sending" });
  const base = (this.props.airtableProxyUrl || "").replace(/\/$/, "");
  fetch(base + "/api/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company: s.clientCompany,
      contactName: s.clientContactName,
      email: s.clientEmail,
      phone: s.clientPhone,
      roleTitle: s.clientRoleTitle,
      market: s.clientMarket,
      sector: s.clientSector,
      details: s.clientDetails,
    }),
  })
    .then((r) => this.setState({ clientStatus: r.ok ? "done" : "error" }))
    .catch(() => this.setState({ clientStatus: "error" }));
};
```

Replace `submitJoinDesk`:

```js
submitJoinDesk = (e) => {
  e.preventDefault();
  const s = this.state;
  this.setState({ joinDeskStatus: "sending" });
  const base = (this.props.airtableProxyUrl || "").replace(/\/$/, "");
  this.fileToDataUrl(this._joinCvFile).then((resume) => {
    fetch(base + "/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: s.joinName,
        email: s.joinEmail,
        phone: s.joinPhone,
        role: s.joinRole,
        message: s.joinMessage,
        resume,
      }),
    })
      .then((r) => this.setState({ joinDeskStatus: r.ok ? "done" : "error" }))
      .catch(() => this.setState({ joinDeskStatus: "error" }));
  });
};
```

Replace `submitCandidate`:

```js
submitCandidate = (e) => {
  e.preventDefault();
  const s = this.state;
  this.setState({ candidateStatus: "sending" });
  const base = (this.props.airtableProxyUrl || "").replace(/\/$/, "");
  Promise.all([
    this.fileToDataUrl(this._candCvFile),
    this.fileToDataUrl(this._candProjectFile),
  ]).then(([cv, projectList]) => {
    fetch(base + "/api/candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: s.candName,
        email: s.candEmail,
        title: s.candTitle,
        market: s.candMarket,
        phone: s.candPhone,
        role: this.state.role,
        notes: s.candNotes,
        cv,
        projectList,
      }),
    })
      .then((r) => this.setState({ candidateStatus: r.ok ? "done" : "error" }))
      .catch(() => this.setState({ candidateStatus: "error" }));
  });
};
```
