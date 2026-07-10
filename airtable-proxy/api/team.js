// Same deployment as jobs.js — Vercel serverless function.
// Uses the same AIRTABLE_BASE_ID / AIRTABLE_TOKEN env vars, reads from the "Team" table.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;
  const table = "tblV2ojEfb5xzRv9a"; // Team table

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

    const initialsOf = (name) =>
      (name || "").split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");

    const members = records.map((r) => {
      const f = r.fields;
      const photoAttachment = Array.isArray(f.Photo) && f.Photo.length ? f.Photo[0] : null;
      return {
        id: r.id,
        name: f.Name || "",
        role: f.Role || "",
        bio: f.Bio || "",
        phone: f.Phone || "",
        email: f.Email || "",
        linkedin: f.LinkedIn || "",
        level: f.Level || "",
        area: f.Area || "",
        photoUrl: photoAttachment ? photoAttachment.url : "",
        initials: initialsOf(f.Name),
      };
    });

    return res.status(200).json({ members });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", detail: String(err) });
  }
}
