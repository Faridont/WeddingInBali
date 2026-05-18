import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "..", "public", "images");
const files = ["ninja-bride.png", "ninja-groom.png"];

/** Светлая «шахматка» редактора (без реального альфа в PNG). */
function isCheckerboard(r, g, b) {
  const lum = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return lum >= 238 && chroma <= 14;
}

function floodClearCheckerboard(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isCheckerboard(pixels[i], pixels[i + 1], pixels[i + 2])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const i = idx * 4;
    pixels[i + 3] = 0;

    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }
}

async function processFile(file) {
  const filePath = path.join(imagesDir, file);
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  floodClearCheckerboard(pixels, info.width, info.height);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9 })
    .toFile(filePath);

  const meta = await sharp(filePath).metadata();
  console.log("OK:", file, `${meta.width}x${meta.height}`, "alpha:", meta.hasAlpha);
}

for (const file of files) {
  await processFile(file);
}
