/**
 * Writes public/cv/Horn-Vanhong-CV.pdf from the site data (Node 22.18+ and Google Chrome required).
 * Run: npm run cv   — this OVERWRITES the PDF, so skip it once a hand-made CV is in place.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { education } from "../src/data/education.ts";
import { experience } from "../src/data/experience.ts";
import { profile } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";
import { skillCategories } from "../src/data/skills.ts";
import { en } from "../src/i18n/en.ts";

const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const entry = (e: (typeof experience)[number]) =>
  `<div class="e"><h3>${esc(e.org)}</h3><p class="r">${esc(e.title.en)}${e.period ? ` | ${esc(e.period.en)}` : ""}</p>${
    e.points.length ? `<p>${esc(e.points.map((p) => p.en).join("; "))}.</p>` : ""
  }</div>`;
const contacts = [profile.location.en, profile.email, profile.social.github, profile.social.linkedin].filter((c) => c !== null);

const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${esc(profile.name)} - CV</title><style>
@page{size:A4;margin:15mm 17mm}body{font:10.2pt/1.42 Helvetica,Arial,sans-serif;color:#15201a;margin:0}
h1{font-size:25pt;margin:0;letter-spacing:-.5pt}h2{font-size:10.5pt;color:#04693c;border-bottom:1px solid #b9d3c5;margin:13pt 0 6pt;padding-bottom:3pt}
h3{font-size:10.8pt;margin:0}p{margin:1pt 0}.r{color:#04693c}.e{margin-bottom:6.5pt;break-inside:avoid}</style>
<h1>${esc(profile.name)}</h1><p class="r">Cybersecurity Student / Software Developer</p><p>${esc(contacts.join(" | "))}</p>
<h2>Profile</h2><p>${esc(en.about.paragraphs.slice(1).join(" "))}</p>
<h2>Experience</h2>${experience.map(entry).join("")}
<h2>Education and training</h2>${education.map(entry).join("")}
<h2>Projects</h2>${projects.map((p) => `<div class="e"><h3>${esc(p.title)}</h3><p>${esc(p.description.en)}</p><p class="r">${esc(p.stack.join(", "))}</p></div>`).join("")}
<h2>Skills</h2>${skillCategories.map((c) => `<p><b>${esc(c.title.en)}:</b> ${esc(c.skills.join(", "))}</p>`).join("")}</html>`;

const dir = mkdtempSync(join(tmpdir(), "cv-"));
try {
  const file = join(dir, "cv.html");
  writeFileSync(file, html);
  execFileSync(
    chrome,
    ["--headless", "--disable-gpu", `--user-data-dir=${join(dir, "profile")}`, "--no-pdf-header-footer", `--print-to-pdf=${join(import.meta.dirname, "../public/cv/Horn-Vanhong-CV.pdf")}`, pathToFileURL(file).href],
    { stdio: "ignore", timeout: 60_000 },
  );
} finally {
  rmSync(dir, { recursive: true, force: true, maxRetries: 5 });
}
