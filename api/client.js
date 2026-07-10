// Replaces the Formspree endpoint (mwvdgkjj) behind the site's "New Role Submission" client form.
// Expects JSON: { company, contactName, email, phone, roleTitle, market, sector, details }

import { sendResendEmail, escapeHtml, setCors } from "./_lib/resend.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { company, contactName, email, phone, roleTitle, market, sector, details } = req.body || {};
  if (!details || !email) {
    return res.status(400).json({ error: "Missing required fields: email, details" });
  }

  try {
    await sendResendEmail({
      subject: `New Role Submission — ${roleTitle || "Untitled Role"} (${company || "Unknown Company"})`,
      replyTo: email,
      text: `Company: ${company || ""}\nContact Name: ${contactName || ""}\nEmail: ${email}\nPhone: ${phone || ""}\nRole Title: ${roleTitle || ""}\nMarket: ${market || ""}\nSector: ${sector || ""}\n\n${details}`,
      html: `<p><strong>Company:</strong> ${escapeHtml(company || "")}</p>
<p><strong>Contact Name:</strong> ${escapeHtml(contactName || "")}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone || "")}</p>
<p><strong>Role Title:</strong> ${escapeHtml(roleTitle || "")}</p>
<p><strong>Market:</strong> ${escapeHtml(market || "")}</p>
<p><strong>Sector:</strong> ${escapeHtml(sector || "")}</p>
<p><strong>Role Details:</strong></p>
<p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email", detail: String(err) });
  }
}
