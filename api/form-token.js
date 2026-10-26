// Hands the website's forms a short-lived signed token. See _lib/spam.js.

import { issueFormToken } from "./_lib/spam.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  return res.status(200).json({ token: issueFormToken() });
}
