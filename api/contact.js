// Replaces the Formspree endpoint (mpqgvzek) behind the site's Contact form.
// Expects JSON: { name, email, subject, message }

import { sendResendEmail, escapeHtml, setCors } from "./_lib/resend.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }

  try {
    await sendResendEmail({
      subject: `Website Contact — ${subject || name || "New Message"}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ""}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject || "")}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email", detail: String(err) });
  }
}
