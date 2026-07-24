// Shared helper — not a route (Vercel ignores api/ subfolders starting with "_").
// Writes a durable SMS opt-in record to Airtable for A2P/10DLC compliance audit trail.
//
// Requires AIRTABLE_TOKEN to carry the data.records:write scope on this base.
// The token currently used for jobs.js/team.js is read-only (data.records:read) —
// widen its scope in the Airtable Developer Hub, or the write below will fail with 403/404.
//
// The table itself ("SMS Opt-Ins" by default) must be created manually in Airtable
// with fields: Name, Email, Phone, Source, Consent Text, IP Address (all single line /
// long text), plus optionally a "Submitted At" field of type "Created time" for visibility.

const SMS_OPT_INS_TABLE = process.env.AIRTABLE_SMS_TABLE || "SMS Opt-Ins";

const CONSENT_TEXT =
  "I consent to receive SMS text messages from Paterson about my job application, interview scheduling, and search updates. Consent is not a condition of any service. Msg and data rates may apply. Message frequency varies. Reply HELP to get support. Reply STOP to opt out.";

export async function logSmsOptIn({ name, email, phone, source, ip }) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;
  if (!baseId || !token) {
    throw new Error("Missing AIRTABLE_BASE_ID or AIRTABLE_TOKEN env vars");
  }

  const resp = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(SMS_OPT_INS_TABLE)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Name: name || "",
        Email: email || "",
        Phone: phone || "",
        Source: source || "",
        "Consent Text": CONSENT_TEXT,
        "IP Address": ip || "",
      },
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Airtable write failed (${resp.status}): ${detail}`);
  }
  return resp.json();
}
