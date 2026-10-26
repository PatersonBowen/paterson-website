// Shared helper — not a route (Vercel ignores api/ subfolders starting with "_").
// Keeps bots out of the website forms without a CAPTCHA:
//   1. Every form submission must carry a short-lived signed token (X-Form-Token) that the real
//      pages fetch from /api/form-token. Scripts posting straight to /api/* do not have one.
//   2. Junk made of random letters (the pattern bots use) is dropped silently: no email, no SMS opt-in log.
//
// The token is signed with FORM_TOKEN_SECRET if set, otherwise with a hash of the Resend key,
// so it needs no extra setup.

import crypto from "node:crypto";

const TOKEN_MAX_AGE_MS = 6 * 60 * 60 * 1000;

const signingKey = () =>
  crypto
    .createHash("sha256")
    .update("paterson-form-token:" + (process.env.FORM_TOKEN_SECRET || process.env.paterson_website_RESEND || ""))
    .digest();

export function issueFormToken() {
  const ts = Date.now().toString(36);
  const sig = crypto.createHmac("sha256", signingKey()).update(ts).digest("base64url");
  return `${ts}.${sig}`;
}

export function checkFormToken(token) {
  const [ts, sig] = String(token || "").split(".");
  if (!ts || !sig) return false;
  const expected = crypto.createHmac("sha256", signingKey()).update(ts).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const age = Date.now() - parseInt(ts, 36);
  return age >= 0 && age <= TOKEN_MAX_AGE_MS;
}

// One long run of letters with no spaces and capitals scattered through it, e.g. "NlMECNOaMSoGYBVke".
// Real names, firms and subjects have spaces, or are plain words, or are acronyms.
export function looksRandom(value) {
  const s = String(value || "").trim();
  if (s.length < 10 || /\s/.test(s) || !/^[A-Za-z]+$/.test(s)) return false;
  const isUp = (c) => c >= "A" && c <= "Z";
  let upper = 0;
  let changes = 0;
  for (let i = 0; i < s.length; i++) {
    if (isUp(s[i])) upper++;
    if (i > 0 && isUp(s[i]) !== isUp(s[i - 1])) changes++;
  }
  const ratio = upper / s.length;
  return ratio >= 0.25 && ratio <= 0.75 && changes >= 3;
}

// Gmail ignores dots, so bots use addresses like "u.fot.i.ka.g.oq684@gmail.com" to get unlimited variants.
function heavilyDotted(email) {
  const local = String(email || "").split("@")[0] || "";
  return (local.match(/\./g) || []).length >= 4;
}

// Returns null when the submission looks fine, otherwise how to answer it.
//   { status: 400 }  -> missing or expired token (a real visitor with an old page just refreshes)
//   { status: 200, dropped: true } -> looks like a bot; pretend it worked so it does not adapt
export function screenSubmission(req, { email, texts }) {
  if (!checkFormToken(req.headers["x-form-token"])) {
    return { status: 400, body: { error: "This page has expired. Please refresh it and try again." } };
  }
  const random = (texts || []).filter(looksRandom).length;
  if (random >= 2 || (random >= 1 && heavilyDotted(email))) {
    console.warn("Spam submission dropped", { random, email: String(email || "").slice(0, 3) + "…" });
    return { status: 200, body: { ok: true }, dropped: true };
  }
  return null;
}
