/**
 * Cuts the section artwork out of the concept board into public/images/art.
 * Run: node scripts/extract-art.mjs [path-to-board.png]
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const board = process.argv[2] ?? join(root, "public/images/UI/cyberpunk-portfolio-ui-mockup.png");
const out = join(root, "public/images/art");
const SCALE = 4;

// box: [left, top, width, height] on the board. hide: areas of mockup lettering to black out, in board pixels.
const crops = {
  hero: { box: [296, 42, 208, 272], hide: [[280, 125, 64, 112], [280, 258, 42, 60]] },
  about: { box: [1290, 715, 234, 240], hide: [[1280, 775, 42, 75]] },
  skills: { box: [822, 62, 194, 246], hide: [] },
  projects: { box: [337, 410, 140, 120], hide: [] },
  experience: { box: [1272, 48, 230, 284], hide: [[1262, 308, 24, 26]] },
  education: { box: [800, 712, 214, 206], hide: [] },
  contact: { box: [374, 712, 128, 150], hide: [[364, 815, 28, 40]] },
};

mkdirSync(out, { recursive: true });
for (const [name, { box, hide }] of Object.entries(crops)) {
  const [left, top, width, height] = box;
  const rects = hide
    .map(([x, y, w, h]) => `<rect x="${(x - left) * SCALE}" y="${(y - top) * SCALE}" width="${w * SCALE}" height="${h * SCALE}" fill="#020403" filter="url(#b)"/>`)
    .join("");
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * SCALE}" height="${height * SCALE}"><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>${rects}</svg>`;
  const enlarged = await sharp(board)
    .extract({ left, top, width, height })
    .resize(width * SCALE, height * SCALE, { kernel: "lanczos3" })
    .sharpen({ sigma: 2.2, m1: 0.6, m2: 2.4 })
    .toBuffer();
  await sharp(enlarged)
    .composite([{ input: Buffer.from(cover) }])
    .webp({ quality: 78 })
    .toFile(join(out, `${name}.webp`));
}
