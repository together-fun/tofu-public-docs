/**
 * Derive the HD (2x) screenshot crops from the picked burst frame.
 * All rects are in CSS px on the 1920×1080 layout; the source frame is
 * deviceScaleFactor 2, so every value is doubled for pixel coordinates.
 * Same regions as the 1x generation (perp-market reference: top chrome
 * 105px, chat column 385px).
 *
 * Usage: node scripts/crop-hd.mjs <frame.png>
 * Output: .preview-check/hd/crops/*.png
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = process.argv[2] ?? '.preview-check/hd/full-02.png';
const OUT = '.preview-check/hd/crops/';
mkdirSync(OUT, { recursive: true });

// name → CSS-px rect { left, top, width, height }
const crops = {
  'dex-chat-panel-hd.png': { left: 8, top: 112, width: 370, height: 560 },
  'dex-danmaku-hd.png': { left: 384, top: 100, width: 860, height: 600 },
  'dex-order-form-hd.png': { left: 1544, top: 106, width: 372, height: 672 },
  'dex-perp-market-hd.png': { left: 385, top: 105, width: 1535, height: 975 },
};

for (const [name, r] of Object.entries(crops)) {
  await sharp(SRC)
    .extract({ left: r.left * 2, top: r.top * 2, width: r.width * 2, height: r.height * 2 })
    .png()
    .toFile(OUT + name);
  console.log(name, `${r.width * 2}x${r.height * 2}`);
}
