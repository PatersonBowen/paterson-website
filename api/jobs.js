// Deploy this folder to Vercel (or copy the logic into a Cloudflare Worker / Netlify Function).
// Env vars needed (set in Vercel Project Settings → Environment Variables):
//   AIRTABLE_BASE_ID   e.g. appXXXXXXXXXXXXXX
//   AIRTABLE_TOKEN     Personal Access Token, scope data.records:read, access limited to this base
//
// This keeps the token server-side only — it never reaches the browser.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;
  const table = "tblmtcEqt7W8njXOC"; // Jobs table

  if (!baseId || !token) {
    return res.status(500).json({ error: "Missing AIRTABLE_BASE_ID or AIRTABLE_TOKEN env vars" });
  }

  try {
    const records = [];
    let offset;
    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`);
      url.searchParams.set("filterByFormula", "{Status}='Live'");
      url.searchParams.set("pageSize", "100");
      if (offset) url.searchParams.set("offset", offset);

      const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!resp.ok) {
        const text = await resp.text();
        return res.status(resp.status).json({ error: "Airtable request failed", detail: text });
      }
      const data = await resp.json();
      records.push(...data.records);
      offset = data.offset;
    } while (offset);

    const splitLines = (val) => (val || "").split("\n").map((s) => s.trim()).filter(Boolean);

    const jobs = records.map((r) => {
      const f = r.fields;
      return {
        id: r.id,
        title: f.Title || "",
        company: f.Company || "",
        location: f.Location || "",
        sector: f.Sector || "",
        market: f.Market || "",
        employmentType: f["Employment Type"] || "",
        scale: f.Scale || "",
        salaryMin: typeof f["Salary Min"] === "number" ? f["Salary Min"] : null,
        salaryMax: typeof f["Salary Max"] === "number" ? f["Salary Max"] : null,
        postedAt: f["Posted At"] || null,
        summary: f.Summary || "",
        fullDescription: f["Full Description"] || f.Summary || "",
        description: splitLines(f.Description),
        requirements: splitLines(f.Requirements),
        slug: f.Slug || r.id,
      };
    });

    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", detail: String(err) });
  }
}
