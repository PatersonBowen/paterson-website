// Replaces the Formspree endpoint (mgojgebp) behind the site's "Join Paterson" form.
// Expects JSON: { name, email, phone, role, message, resume?: { filename, contentType, content } }
// `resume.content` is the file as a base64 data URL (read client-side via FileReader).

import { sendResendEmail, escapeHtml, setCors, toAttachment } from "./_lib/resend.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, role, message, resume } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields: name, email" });
  }

  const attachment = toAttachment(resume);

  try {
    await sendResendEmail({
      subject: `Join Paterson — ${name || "Candidate"}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ""}\nCurrent Role: ${role || ""}\n\n${message || ""}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone || "")}</p>
<p><strong>Current Role:</strong> ${escapeHtml(role || "")}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message || "").replace(/\n/g, "<br>")}</p>`,
      attachments: attachment ? [attachment] : undefined,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email", detail: String(err) });
  }
}
