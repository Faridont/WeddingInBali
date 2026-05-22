import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const appDir = path.join(root, "app");

const sharinganWebp = path.join(imagesDir, "sharingan-icon.webp");

const jobs = [
  {
    src: path.join(imagesDir, "ninja-bride.png"),
    out: path.join(imagesDir, "ninja-bride.webp"),
    width: 720,
    height: 971,
    format: "webp",
    quality: 80,
  },
  {
    src: path.join(imagesDir, "ninja-groom.png"),
    out: path.join(imagesDir, "ninja-groom.webp"),
    width: 720,
    height: 897,
    format: "webp",
    quality: 80,
  },
  {
    src: path.join(imagesDir, "sharingan-icon.png"),
    out: sharinganWebp,
    width: 128,
    height: 128,
    format: "webp",
    quality: 85,
  },
  {
    src: path.join(imagesDir, "rasengan-icon-src.png"),
    out: path.join(imagesDir, "rasengan-icon.webp"),
    width: 256,
    height: 256,
    format: "webp",
    quality: 80,
    ensureTransparent: true,
  },
];

/** Исходник без альфы (JPEG/чёрный фон) → RGBA с порогом по яркости. */
async function sharpWithTransparentBackground(src, threshold = 28) {
  const meta = await sharp(src).metadata();
  if (meta.hasAlpha) {
    return sharp(src);
  }

  const { data, info } = await sharp(src)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  const rgba = Buffer.alloc(px * 4);

  for (let i = 0; i < px; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    const lum = Math.max(r, g, b);
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = lum <= threshold ? 0 : 255;
  }

  return sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

const faviconJobs = [
  {
    src: sharinganWebp,
    out: path.join(appDir, "icon.png"),
    width: 64,
    height: 64,
    format: "png",
    quality: 90,
  },
  {
    src: sharinganWebp,
    out: path.join(appDir, "apple-icon.png"),
    width: 180,
    height: 180,
    format: "png",
    quality: 90,
  },
];

async function processJob(job) {
  const { src, out, width, height, format, quality, ensureTransparent } = job;

  if (!fs.existsSync(src)) {
    console.warn("Skip (missing):", path.relative(root, src));
    return;
  }

  if (fs.existsSync(out)) {
    const srcMtime = fs.statSync(src).mtimeMs;
    const outMtime = fs.statSync(out).mtimeMs;
    if (outMtime >= srcMtime) {
      console.log("Up to date:", path.relative(root, out));
      return;
    }
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });

  let input = ensureTransparent
    ? await sharpWithTransparentBackground(src)
    : sharp(src);

  let pipeline = input.resize(width, height, {
    fit: "inside",
    withoutEnlargement: true,
  });

  if (format === "webp") {
    pipeline = pipeline.webp({ quality, alphaQuality: 90 });
  } else {
    pipeline = pipeline.png({ quality });
  }

  await pipeline.toFile(out);

  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`Wrote ${path.relative(root, out)} (${kb} KB)`);
}

for (const job of jobs) {
  await processJob(job);
}

for (const job of faviconJobs) {
  await processJob(job);
}
