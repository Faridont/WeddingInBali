import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "scripts", "audio-src");
const publicMp3 = path.join(root, "public", "audio", "blue-bird.mp3");
const backupSrc = path.join(srcDir, "blue-bird.original.mp3");

if (!ffmpegPath) {
  console.error("ffmpeg-static binary not found");
  process.exit(1);
}

fs.mkdirSync(srcDir, { recursive: true });

if (!fs.existsSync(backupSrc) && fs.existsSync(publicMp3)) {
  fs.copyFileSync(publicMp3, backupSrc);
  console.log("Backed up original to", backupSrc);
}

const input = fs.existsSync(backupSrc) ? backupSrc : publicMp3;
if (!fs.existsSync(input)) {
  console.error("No input mp3 found:", input);
  process.exit(1);
}

const tmpOut = path.join(root, "public", "audio", "blue-bird.optimized.mp3");

const args = [
  "-y",
  "-i",
  input,
  "-t",
  "75",
  "-ac",
  "1",
  "-b:a",
  "96k",
  "-af",
  "afade=t=in:st=0:d=0.5,afade=t=out:st=72:d=3",
  tmpOut,
];

await new Promise((resolve, reject) => {
  const proc = spawn(ffmpegPath, args, { stdio: "inherit" });
  proc.on("error", reject);
  proc.on("close", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`ffmpeg exited with code ${code}`));
  });
});

fs.renameSync(tmpOut, publicMp3);
const kb = Math.round(fs.statSync(publicMp3).size / 1024);
console.log(`Wrote ${publicMp3} (${kb} KB)`);
