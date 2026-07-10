// Shared helper — not a route (Vercel ignores api/ subfolders starting with "_").
// Sends one email via Resend's HTTP API using the paterson_website_RESEND key.

const FROM_ADDRESS = "nelson@patersoncompany.com";
const TO_ADDRESS = "nelson@patersoncompany.com";

export async function sendResendEmail({ subject, text, html, replyTo, attachments }) {
  const apiKey = process.env.paterson_website_RESEND;
  if (!apiKey) {
    throw new Error("Missing paterson_website_RESEND env var");
  }

  const payload = {
    from: FROM_ADDRESS,
    to: [TO_ADDRESS],
    subject,
    text,
  };
  if (html) payload.html = html;
  if (replyTo) payload.reply_to = replyTo;
  if (attachments && attachments.length) payload.attachments = attachments;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Resend request failed (${resp.status}): ${detail}`);
  }

  return resp.json();
}

// Escapes plain-text field values before dropping them into an HTML email body.
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// Normalizes a { filename, content, contentType } upload (content is a base64
// data URL or bare base64 string) into the shape Resend's attachments API expects.
export function toAttachment(file) {
  if (!file || !file.content) return null;
  const base64 = String(file.content).replace(/^data:[^;]+;base64,/, "");
  return {
    filename: file.filename || "attachment",
    content: base64,
  };
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
