// Build step: writes public/data/team.json and public/data/jobs.json (the files the website reads).
//
// Airtable is read ONLY here, once per deploy, so visitors never trigger Airtable calls and the free
// plan's monthly API quota is no longer used up by traffic or crawlers. To publish a change, edit Airtable
// and redeploy (the Vercel deploy hook does this).
//
//   1. Try Airtable (Status = Live rows). Team photos are downloaded now because Airtable's photo links expire.
//   2. If Airtable fails (quota used up, outage, missing env vars) use the saved copy in content/data/,
//      so the site never ships an empty Team page because of an Airtable problem.
//
// Saved copy: content/data/team.json, content/data/jobs.json and content/data/photos/. Update it whenever
// the team changes materially; it is what shows if Airtable is unreachable at build time.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { airtableConfigured, fetchJobs, fetchTeam } from "./airtable-feeds.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapDir = path.join(root, "content", "data");
const outDir = path.join(root, "public", "data");
const photoDir = path.join(outDir, "photos");

fs.mkdirSync(photoDir, { recursive: true });

const readSnap = (name, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(snapDir, name), "utf8"));
  } catch (e) {
    return fallback;
  }
};

// Saved photos first, so a fallback build still has them.
const snapPhotos = path.join(snapDir, "photos");
if (fs.existsSync(snapPhotos)) {
  for (const f of fs.readdirSync(snapPhotos)) fs.copyFileSync(path.join(snapPhotos, f), path.join(photoDir, f));
}

const EXT = { "image/jpeg": "jpg", "image/jpg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };

async function savePhoto(member, previous) {
  if (!member.photoUrl) return "";
  if (!/^https?:/i.test(member.photoUrl)) return member.photoUrl; // already a local path
  try {
    const resp = await fetch(member.photoUrl);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const type = (resp.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const ext = EXT[type];
    if (!ext) throw new Error("not an image: " + type);
    const buf = Buffer.from(await resp.arrayBuffer());
    const file = `${member.id}.${ext}`;
    fs.writeFileSync(path.join(photoDir, file), buf);
    return `/data/photos/${file}`;
  } catch (e) {
    console.warn(`DATA: photo for ${member.name} not downloaded (${e.message}); using the saved one if there is one`);
    return previous && previous.photoUrl && previous.photoUrl.startsWith("/data/photos/") ? previous.photoUrl : "";
  }
}

const snapTeam = readSnap("team.json", { members: [] }).members || [];
const snapJobs = readSnap("jobs.json", { jobs: [] }).jobs || [];

let team = snapTeam;
let teamSource = "saved copy";
let jobs = snapJobs;
let jobsSource = "saved copy";

if (airtableConfigured()) {
  try {
    const live = await fetchTeam();
    if (!live.length && snapTeam.length) {
      console.warn("DATA: Airtable returned no Live team members; kept the saved team (check Status = Live in Airtable)");
    } else {
      const byId = new Map(snapTeam.map((m) => [m.id, m]));
      for (const m of live) m.photoUrl = await savePhoto(m, byId.get(m.id));
      team = live;
      teamSource = "Airtable";
    }
  } catch (e) {
    console.warn("DATA: team not read from Airtable, using the saved copy. " + e.message);
  }
  try {
    jobs = await fetchJobs();
    jobsSource = "Airtable";
  } catch (e) {
    console.warn("DATA: jobs not read from Airtable, using the saved copy. " + e.message);
  }
} else {
  console.warn("DATA: Airtable env vars not set; using the saved copy");
}

fs.writeFileSync(path.join(outDir, "team.json"), JSON.stringify({ members: team }));
fs.writeFileSync(path.join(outDir, "jobs.json"), JSON.stringify({ jobs }));
console.log(`DATA: team ${team.length} (${teamSource}), jobs ${jobs.length} (${jobsSource})`);
