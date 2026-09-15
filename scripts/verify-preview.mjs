/**
 * Preview-site layout verification: shoot key pages and print the "On this
 * page" panel's bounding-box X so we can prove the TOC no longer jumps
 * horizontally between long and short pages.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3100';
const OUT = '.preview-check/verify/';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['introduction', '/dex/introduction/'],
  ['funds', '/dex/getting-started-funds/'],
  ['chat', '/dex/chat/'],
  ['cosmetics', '/dex/cosmetics/'],
  ['drops', '/dex/trading-drops/'],
  ['team', '/tofu-docs/the-team/'],
  ['clans-short', '/dex/clans/'],
  ['danmaku', '/dex/danmaku/'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1728, height: 1000 }, locale: 'en-US' });
const page = await ctx.newPage();
for (const [name, path] of pages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const toc = page.locator('.right-sidebar-panel').first();
  let x = 'n/a';
  try {
    const box = await toc.boundingBox();
    if (box) x = Math.round(box.x);
  } catch {}
  const main = await page.locator('.sl-markdown-content').first().boundingBox();
  console.log(
    `${name.padEnd(12)} TOC x=${x}  content x=${main ? Math.round(main.x) : '?'} w=${main ? Math.round(main.width) : '?'}`,
  );
  await page.screenshot({ path: `${OUT}${name}.png` });
}
await browser.close();
console.log('verify shots done');
