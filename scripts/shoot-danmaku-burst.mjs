/**
 * Long danmaku burst: the demo messages loop with a long period, so shoot a
 * ~40s window starting right after load and hand-pick the frame where several
 * danmaku sit mid-chart. Output: .preview-check/burst2/full-XX.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;
const OUT = '.preview-check/burst2/';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: HIDE_STAGING });
await page.waitForTimeout(3000);
await page.addStyleTag({ content: HIDE_STAGING });
for (let i = 0; i < 45; i++) {
  await page.screenshot({ path: `${OUT}full-${String(i).padStart(2, '0')}.png` });
  await page.waitForTimeout(900);
}
console.log('burst2 done (45 frames over ~40s)');
await browser.close();
