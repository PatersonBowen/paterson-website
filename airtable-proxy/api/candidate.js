// Replaces the Formspree endpoint (xojogqzk) behind the site's Candidate CV Submission form.
// Expects JSON: { name, email, title, market, phone, role?, notes,
//                 cv?: { filename, contentType, content }, projectList?: { filename, contentType, content } }
// File fields are base64 data URLs (read client-side via FileReader).

import { sendResendEmail, escapeHtml, setCors, toAttachment } from "./_lib/resend.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, title, market, phone, role, notes, cv, projectList } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields: name, email" });
  }

  const attachments = [toAttachment(cv), toAttachment(projectList)].filter(Boolean);

  try {
    await sendResendEmail({
      subject: `CV Submission — ${name || "Candidate"}${role ? ` (${role})` : ""}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCurrent Title: ${title || ""}\nMarket: ${market || ""}\nPhone: ${phone || ""}\n${role ? `Applying for: ${role}\n` : ""}\n${notes || ""}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Current Title:</strong> ${escapeHtml(title || "")}</p>
<p><strong>Market:</strong> ${escapeHtml(market || "")}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone || "")}</p>
${role ? `<p><strong>Applying for:</strong> ${escapeHtml(role)}</p>` : ""}
<p><strong>What they're looking for:</strong></p>
<p>${escapeHtml(notes || "").replace(/\n/g, "<br>")}</p>`,
      attachments: attachments.length ? attachments : undefined,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email", detail: String(err) });
  }
}
