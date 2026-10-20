// Same deployment as jobs.js — Vercel serverless function.
// Uses the same AIRTABLE_BASE_ID / AIRTABLE_TOKEN env vars, reads from the "Team" table.

// The LinkedIn column can be named a few ways in Airtable ("LinkedIn", "Linkedin", "LinkedIn URL", ...)
// and people paste links in different shapes. Return one clean https LinkedIn URL, or "" if there isn't one.
function pickLinkedIn(fields) {
  const key = Object.keys(fields).find((k) => /linked\s*-?\s*in/i.test(k));
  let v = key ? fields[key] : "";
  if (Array.isArray(v)) v = v[0];
  if (v && typeof v === "object") v = v.url || v.href || v.text || "";
  v = String(v || "").trim().replace(/^<|>$/g, "");
  if (!v) return "";
  if (/^[A-Za-z0-9_%.-]+$/.test(v) && !/\./.test(v)) v = "https://www.linkedin.com/in/" + v; // bare profile name
  else if (/^\/\//.test(v)) v = "https:" + v;
  else if (/^in\//i.test(v)) v = "https://www.linkedin.com/" + v;
  else if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = "https://" + v; // "linkedin.com/in/..." or "www.linkedin.com/..."
  try {
    const u = new URL(v);
    const host = u.hostname.replace(/^www\./, "");
    if (!/^https?:$/.test(u.protocol)) return "";
    if (host !== "linkedin.com" && !host.endsWith(".linkedin.com") && host !== "lnkd.in") return "";
    return u.toString();
  } catch (e) {
    return "";
  }
}

// Display order comes from an "Order" number column in Airtable (1 shows first). People without a
// number come after everyone who has one, A to Z by name.
function pickOrder(fields) {
  const key = Object.keys(fields).find((k) => /^\s*(display\s*)?(order|sort(\s*order)?|rank|position)\s*$/i.test(k));
  if (!key) return null;
  const v = fields[key];
  const n = typeof v === "number" ? v : parseFloat(String(v == null ? "" : v).trim());
  return Number.isFinite(n) ? n : null;
}

function sortMembers(members) {
  return members.sort((a, b) => {
    if (a.order !== null && b.order !== null && a.order !== b.order) return a.order - b.order;
    if (a.order !== null && b.order === null) return -1;
    if (a.order === null && b.order !== null) return 1;
    return (a.name || "").localeCompare(b.name || "");
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=86400");

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
        linkedin: pickLinkedIn(f),
        order: pickOrder(f),
        level: f.Level || "",
        area: f.Area || "",
        photoUrl: photoAttachment ? photoAttachment.url : "",
        initials: initialsOf(f.Name),
      };
    });

    return res.status(200).json({ members: sortMembers(members) });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", detail: String(err) });
  }
}
