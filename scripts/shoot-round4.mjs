/** Round-4 visual verification shots of every page touched in this pass. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3100';
const OUT = '.preview-check/round4/';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['problem', '/tofu-docs/the-problem/'],
  ['team', '/tofu-docs/the-team/'],
  ['connect', '/dex/getting-started-connect/'],
  ['markets', '/dex/markets/'],
  ['portfolio', '/dex/portfolio/'],
  ['identity', '/dex/your-identity/'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1728, height: 1200 }, locale: 'en-US' });
const page = await ctx.newPage();
for (const [name, path] of pages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}${name}.png` });
}
// Header + TOC alignment proof: crop the right side of the intro page.
await page.goto(BASE + '/dex/introduction/', { waitUntil: 'networkidle' });
await page.screenshot({ path: `${OUT}align.png`, clip: { x: 1150, y: 0, width: 578, height: 420 } });
await browser.close();
console.log('round4 shots done');
