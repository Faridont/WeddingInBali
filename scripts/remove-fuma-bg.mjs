import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public/images/fuma-shuriken.png");
const output = path.join(root, "public/images/fuma-shuriken-transparent.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const isBg =
    (r > 175 && g > 155 && b > 120 && r - b < 55) ||
    (r > 210 && g > 200 && b > 185);
  if (isBg) data[i + 3] = 0;
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log("Wrote", output);
