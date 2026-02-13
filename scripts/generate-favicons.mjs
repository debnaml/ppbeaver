#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const appDir = path.join(projectRoot, "src", "app");
const logoPath = path.join(publicDir, "logo.svg");
const faviconSvgPath = path.join(publicDir, "favicon.svg");

const outputs = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

const squareBackground = { r: 0, g: 0, b: 0, alpha: 0 };

const ensureSquare = async (buffer, size) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  if (metadata.width === size && metadata.height === size) {
    return buffer;
  }

  return image
    .resize(size, size, {
      fit: "contain",
      background: squareBackground,
    })
    .png()
    .toBuffer();
};

const renderSvg = async (svgSource, size) => {
  const resvg = new Resvg(svgSource, {
    fitTo: {
      mode: "width",
      value: size,
    },
    background: "rgba(0,0,0,0)",
  });

  const rendered = resvg.render();
  const pngBuffer = rendered.asPng();
  return ensureSquare(pngBuffer, size);
};

const main = async () => {
  const svgExists = await fs
    .access(logoPath)
    .then(() => true)
    .catch(() => false);

  if (!svgExists) {
    throw new Error(`Missing logo source at ${logoPath}`);
  }

  const svgSource = await fs.readFile(logoPath);

  await fs.copyFile(logoPath, faviconSvgPath);

  const bufferMap = new Map();

  for (const output of outputs) {
    const buffer = await renderSvg(svgSource, output.size);
    bufferMap.set(output.size, buffer);
    await fs.writeFile(path.join(publicDir, output.name), buffer);
  }

  const icoSizes = [16, 32];
  const icoBuffers = icoSizes.map((size) => {
    const buffer = bufferMap.get(size);
    if (!buffer) {
      throw new Error(`Missing buffer for favicon size ${size}`);
    }
    return buffer;
  });

  const ico = await pngToIco(icoBuffers);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), ico);
  await fs.writeFile(path.join(appDir, "favicon.ico"), ico);

  console.log("Favicons generated successfully.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
