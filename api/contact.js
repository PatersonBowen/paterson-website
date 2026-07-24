// Replaces the Formspree endpoint (mpqgvzek) behind the site's Contact form.
// Expects JSON: { name, email, subject, message, phone, smsConsent }

import { sendResendEmail, escapeHtml, setCors } from "./_lib/resend.js";
import { logSmsOptIn } from "./_lib/airtable.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message, phone, smsConsent } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }
  if (smsConsent && !phone) {
    return res.status(400).json({ error: "Phone number is required when SMS consent is given" });
  }

  try {
    await sendResendEmail({
      subject: `Website Contact — ${subject || name || "New Message"}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ""}\nSMS Consent: ${smsConsent ? "Yes" : "No"}\nSubject: ${subject || ""}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone || "")}</p>
<p><strong>SMS Consent:</strong> ${smsConsent ? "Yes" : "No"}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject || "")}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    if (smsConsent && phone) {
      logSmsOptIn({
        name,
        email,
        phone,
        source: "Contact form (patersoncompany.com/contact)",
        ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
      }).catch((err) => console.error("SMS opt-in log failed:", err));
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email", detail: String(err) });
  }
}
