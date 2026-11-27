/**
 * Writes public/cv/Horn-Vanhong-CV.pdf from the site data (Node 22.18+ and Google Chrome required).
 * Run: npm run cv
 * Optional: CV_SITE_URL=https://your-portfolio.com npm run cv   — adds a portfolio link to the header.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { certificates } from "../src/data/certificates.ts";
import { education } from "../src/data/education.ts";
import { experience } from "../src/data/experience.ts";
import { profile } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";
import { languages } from "../src/data/languages.ts";
import { references } from "../src/data/references.ts";
import { skillCategories } from "../src/data/skills.ts";
import { en } from "../src/i18n/en.ts";

const root = join(import.meta.dirname, "..");
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const site = process.env.CV_SITE_URL?.replace(/\/$/, "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const month = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** Drops EXIF/XMP/Photoshop metadata (camera, GPS) from a JPEG, keeping the image data. */
function stripJpegMetadata(buf: Buffer): Buffer {
  const parts: Buffer[] = [buf.subarray(0, 2)];
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    if (marker === 0xda) { parts.push(buf.subarray(i)); break; } // Start of scan: rest is image data.
    const len = buf.readUInt16BE(i + 2);
    const keep = !(marker >= 0xe1 && marker <= 0xef) && marker !== 0xfe; // APP1–APP15 and comments go.
    if (keep) parts.push(buf.subarray(i, i + 2 + len));
    i += 2 + len;
  }
  return Buffer.concat(parts);
}

const dir = mkdtempSync(join(tmpdir(), "cv-"));
try {
  // Downscale the photo so the PDF stays small, then strip its metadata.
  const small = join(dir, "photo.jpg");
  execFileSync("sips", ["-Z", "480", "-s", "formatOptions", "85", join(root, "public/cv/vanhong_cv_profile.jpg"), "--out", small], { stdio: "ignore" });
  const photo = `data:image/jpeg;base64,${stripJpegMetadata(readFileSync(small)).toString("base64")}`;

  const icon = (d: string) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const icons = {
    pin: icon("M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"),
    mail: icon("M3 5h18v14H3zm2 2v.5l7 4.5 7-4.5V7zm14 2.8-7 4.5-7-4.5V17h14z"),
    web: icon("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15 15 0 0 0-1.3-3.9A8 8 0 0 1 18.9 8zM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16 16 0 0 0 0 4zm.8 2h3a15 15 0 0 0 1.3 3.9A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.3-3.9A15 15 0 0 0 8.1 8zM12 20c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4zm2.3-6H9.7a14 14 0 0 1 0-4h4.6a14 14 0 0 1 0 4zm.3 5.9a15 15 0 0 0 1.3-3.9h3a8 8 0 0 1-4.3 3.9zm1.7-5.9a16 16 0 0 0 0-4h3.4a8 8 0 0 1 0 4z"),
    gh: icon("M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"),
    in: icon("M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"),
  };
  const link = (href: string, text: string, ic: string) => `<a href="${esc(href)}">${ic}<span>${esc(text)}</span></a>`;
  const contacts = [
    `<span>${icons.pin}<span>${esc(profile.location.en)}</span></span>`,
    link(`mailto:${profile.email}`, profile.email, icons.mail),
    site && !site.includes("localhost") ? link(site, bare(site), icons.web) : null,
    profile.social.github ? link(profile.social.github, bare(profile.social.github), icons.gh) : null,
    profile.social.linkedin ? link(profile.social.linkedin, "linkedin.com/in/horn-vanhong", icons.in) : null,
  ].filter(Boolean).join("");

  const entry = (e: (typeof experience)[number]) => `
    <div class="item">
      <div class="row"><h3>${esc(e.org)}</h3>${e.period ? `<span class="date">${esc(e.period.en)}</span>` : ""}</div>
      <p class="role">${esc(e.title.en)}</p>
      ${e.points.length ? `<ul>${e.points.map((p) => `<li>${esc(p.en)}</li>`).join("")}</ul>` : ""}
    </div>`;

  const project = (p: (typeof projects)[number]) => `
    <div class="item">
      <div class="row"><h3>${esc(p.title)}</h3><span class="date">${esc(p.category.en)}</span></div>
      <p>${esc(p.description.en)}</p>
      ${p.highlights.length ? `<p class="hl"><b>Key features:</b> ${esc(p.highlights.map((h) => h.en).join(" · "))}</p>` : ""}
      <p class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</p>
    </div>`;

  // Awards and completions, newest first; participation-only entries are left out.
  const certs = certificates
    .filter((c) => c.kind !== "participation")
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .map((c) => `<li><b>${esc(c.title)}</b>${c.kind === "award" ? ' <em class="award">Award</em>' : ""}<br><span>${esc(c.issuer)} · ${month(c.date)}</span></li>`)
    .join("");

  const referenceCards = references
    .map((r) => {
      const contact = [
        r.email ? link(`mailto:${r.email}`, r.email, icons.mail) : null,
        r.phone ? `<span>${esc(r.phone)}</span>` : null,
      ].filter(Boolean);
      return `<div class="ref">
        ${r.name ? `<h3>${esc(r.name)}</h3>` : ""}
        ${r.title ? `<p class="role">${esc(r.title)}</p>` : ""}
        ${r.org ? `<p>${esc(r.org)}</p>` : ""}
        ${r.relationship ? `<p class="rel">${esc(r.relationship)}</p>` : ""}
        <p class="ref-contact">${contact.length ? contact.join("") : "Contact details available upon request"}</p>
      </div>`;
    })
    .join("");

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(profile.name)} – CV</title><style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  :root { --ink: #0f172a; --dim: #475569; --accent: #0e7490; --soft: #ecf7fa; --line: #cbd5e1; --side: #0f1e36; }
  html, body { margin: 0; }
  body { font: 9.4pt/1.45 "Helvetica Neue", Helvetica, Arial, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  svg { width: 9pt; height: 9pt; fill: currentColor; flex: none; }
  .page { display: grid; grid-template-columns: 62mm 1fr; min-height: 297mm; }

  /* Sidebar */
  aside { background: var(--side); color: #dbe4f0; padding: 12mm 7mm 10mm; }
  /* Repeats the dark sidebar behind page 2 when content flows over. */
  aside::before { content: ""; position: fixed; top: 0; bottom: 0; left: 0; width: 62mm; background: var(--side); z-index: -1; }
  .photo { width: 34mm; height: 41mm; margin: 0 auto 5mm; border-radius: 4mm; overflow: hidden; border: 1.2mm solid #22d3ee; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block; }
  aside h2 { color: #67e8f9; font-size: 8.4pt; letter-spacing: 1.6pt; text-transform: uppercase; margin: 5.5mm 0 2.5mm; padding-bottom: 1.5mm; border-bottom: 0.3mm solid #2b3f5e; }
  /* Every icon sits in the same square box, centred on its text line, so icons and text line up in two straight columns. */
  .contact a, .contact > span { display: grid; grid-template-columns: 4.2mm 1fr; column-gap: 2.2mm; align-items: center; min-height: 4.6mm; margin-bottom: 2mm; font-size: 8.3pt; line-height: 1.25; word-break: break-word; }
  .contact svg { width: 3.4mm; height: 3.4mm; justify-self: center; color: #67e8f9; }
  .skill { margin-bottom: 2.4mm; }
  .skill h3 { font-size: 8.3pt; margin: 0 0 1.2mm; color: #fff; }
  .tags { display: flex; flex-wrap: wrap; gap: 1.1mm; }
  .lang { display: grid; grid-template-columns: 1fr auto; align-items: center; row-gap: 0.8mm; margin-bottom: 2.4mm; font-size: 8.3pt; }
  .lang b { color: #fff; }
  .lang span { color: #94a3b8; font-size: 7.6pt; }
  .lang i { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1mm; }
  .lang u, .lang s { height: 1.1mm; border-radius: 1mm; background: #67e8f9; }
  .lang s { background: #2b3f5e; }
  .tags span { font-size: 7.4pt; padding: 0.5mm 1.8mm; border-radius: 3mm; background: #1c3152; color: #e2e8f0; }

  /* Main column */
  main { padding: 13mm 12mm 12mm 10mm; }
  header h1 { font-size: 27pt; line-height: 1.05; margin: 0; letter-spacing: -0.5pt; }
  header .title { color: var(--accent); font-weight: 700; font-size: 11pt; margin: 1.5mm 0 0; letter-spacing: 0.3pt; }
  .summary { margin: 4mm 0 0; color: var(--dim); }
  main h2 { display: flex; align-items: center; gap: 2.5mm; font-size: 10pt; letter-spacing: 1.4pt; text-transform: uppercase; color: var(--accent); margin: 6mm 0 3mm; break-after: avoid; }
  main h2::after { content: ""; flex: 1; height: 0.3mm; background: var(--line); }
  /* Page 2 starts here, with the same top spacing as page 1. */
  .next { break-before: page; padding-top: 13mm; }
  .next > h2:first-child { margin-top: 0; }
  .item { margin-bottom: 3.6mm; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
  h3 { font-size: 10.2pt; margin: 0; }
  .date { font-size: 8pt; color: var(--dim); white-space: nowrap; }
  .role { color: var(--accent); font-weight: 600; margin: 0.4mm 0 1mm; }
  p { margin: 0.5mm 0; }
  ul { margin: 0.8mm 0 0; padding-left: 4mm; columns: 2; column-gap: 6mm; }
  li { margin-bottom: 0.4mm; }
  .hl { color: var(--dim); }
  .stack { display: flex; flex-wrap: wrap; gap: 1.1mm; margin-top: 1.4mm; }
  .stack span { font-size: 7.6pt; padding: 0.4mm 1.8mm; border-radius: 1mm; background: var(--soft); color: var(--accent); font-weight: 600; }
  .certs { list-style: none; padding: 0; margin: 0; columns: 2; column-gap: 6mm; }
  .certs li { margin-bottom: 2.2mm; break-inside: avoid; line-height: 1.3; }
  .certs span { color: var(--dim); font-size: 8pt; }
  .refs { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm 6mm; }
  .ref { break-inside: avoid; padding: 2.6mm 3.2mm; border-left: 0.8mm solid var(--accent); background: var(--soft); border-radius: 0 1.5mm 1.5mm 0; }
  .ref .role { margin: 0.4mm 0 0.3mm; }
  .ref .rel { color: var(--dim); font-size: 8pt; }
  .ref-contact { display: flex; flex-direction: column; gap: 0.6mm; margin-top: 1.2mm; font-size: 8pt; color: var(--dim); font-style: italic; }
  .ref-contact a, .ref-contact span { display: flex; gap: 1.5mm; align-items: center; font-style: normal; color: var(--ink); }
  .award { font-style: normal; font-size: 7pt; font-weight: 700; color: #8a5a00; background: #fff1cf; padding: 0.2mm 1.4mm; border-radius: 1mm; }
  </style></head><body><div class="page">
  <aside>
    <div class="photo"><img src="${photo}" alt="${esc(profile.name)}"></div>
    <h2>Contact</h2>
    <div class="contact">${contacts}</div>
    <h2>Skills</h2>
    ${skillCategories.map((c) => `<div class="skill"><h3>${esc(c.title.en)}</h3><div class="tags">${c.skills.map((s) => `<span>${esc(s.replace("Retrieval-Augmented Generation (RAG)", "RAG"))}</span>`).join("")}</div></div>`).join("")}
    <h2>Languages</h2>
    <div class="langs">${languages.map((l) => `<div class="lang"><b>${esc(l.name)}</b><span>${esc(l.level)}</span><i aria-label="${l.dots} of 5">${"<u></u>".repeat(l.dots)}${"<s></s>".repeat(5 - l.dots)}</i></div>`).join("")}</div>
  </aside>
  <main>
    <header>
      <h1>${esc(profile.name)}</h1>
      <p class="title">Cybersecurity Student &amp; Software Developer</p>
      <p class="summary">${esc(en.about.paragraphs.join(" ").replace(/^I'm Horn Vanhong, a/, "A"))}</p>
    </header>
    <h2>Experience</h2>${experience.map(entry).join("")}
    <h2>Projects</h2>${projects.map(project).join("")}
    <section class="next">
      <h2>Education &amp; Training</h2>${education.map(entry).join("")}
      <h2>Certifications &amp; Awards</h2><ul class="certs">${certs}</ul>
      ${references.length ? `<h2>References</h2><div class="refs">${referenceCards}</div>` : ""}
    </section>
  </main>
  </div></body></html>`;

  const file = join(dir, "cv.html");
  writeFileSync(file, html);
  execFileSync(
    chrome,
    ["--headless", "--disable-gpu", `--user-data-dir=${join(dir, "profile")}`, "--no-pdf-header-footer", `--print-to-pdf=${join(root, "public/cv/Horn-Vanhong-CV.pdf")}`, pathToFileURL(file).href],
    { stdio: "ignore", timeout: 60_000 },
  );
} finally {
  rmSync(dir, { recursive: true, force: true, maxRetries: 5 });
}
