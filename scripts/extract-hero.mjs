/**
 * Cuts the first-screen artwork out of the hero concept. Text and panels are rebuilt as HTML.
 * Run: node scripts/extract-hero.mjs [path-to-concept.png]
 */
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const concept = process.argv[2] ?? join(root, "public/images/UI/Neon Cybersecurity Hacker Portfolio Interface.png");
const out = join(root, "public/images/art");
const SCALE = 2;

async function cut(box, hide = []) {
  const [left, top, width, height] = box;
  const image = await sharp(concept)
    .extract({ left, top, width, height })
    .resize(width * SCALE, height * SCALE, { kernel: "lanczos3" })
    .sharpen({ sigma: 1.1, m1: 0.4, m2: 1.4 })
    .toBuffer();
  const rects = hide
    .map(([x, y, w, h]) => `<rect x="${(x - left) * SCALE}" y="${(y - top) * SCALE}" width="${w * SCALE}" height="${h * SCALE}" fill="#020403" filter="url(#b)"/>`)
    .join("");
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * SCALE}" height="${height * SCALE}"><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12"/></filter>${rects}</svg>`;
  return sharp(image).composite([{ input: Buffer.from(cover) }]).toBuffer();
}

/** Turns black into transparency, for glowing line art. */
async function glow(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const peak = Math.max(data[i], data[i + 1], data[i + 2]);
    const alpha = Math.max(0, peak - 14) / 241;
    if (peak > 0) for (let c = 0; c < 3; c++) data[i + c] = Math.min(255, Math.round((data[i + c] * 255) / peak));
    data[i + 3] = Math.round(alpha * 255);
  }
  return sharp(data, { raw: info });
}

// Areas hidden: the name, the status panel and the ornament above the quote.
const scene = await cut([690, 86, 958, 668], [[660, 235, 152, 105], [1268, 78, 400, 242], [1292, 692, 380, 80], [640, 335, 100, 40], [640, 375, 92, 110]]);
await sharp(scene).webp({ quality: 80 }).toFile(join(out, "operator.webp"));
await (await glow(await cut([328, 722, 262, 160]))).webp({ quality: 82 }).toFile(join(out, "world-map.webp"));
await (await glow(await cut([46, 13, 62, 72]))).webp({ quality: 90 }).toFile(join(out, "shield.webp"));
