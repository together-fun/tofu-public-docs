/**
 * Retake all trade-page screenshots under brand-new file names (cache-bust).
 *
 * Why new names: the STAGING regression was traced to same-filename replacement
 * — stale preview servers / browser caches kept serving the old bytes because
 * the URL never changed. New names make stale caches impossible to hit.
 *
 * Usage: node scripts/shoot-retake.mjs
 * Output: .preview-check/retake/full-XX.png (danmaku burst, pick the best),
 *         .preview-check/retake/mobile.png
 * Crops are derived afterwards with sharp (see shoot-retake-crop.mjs).
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;
const OUT = '.preview-check/retake/';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// Desktop: burst of full-page frames — danmaku demo loops across the chart,
// so we grab many moments and hand-pick the one with the most/centered danmaku.
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: HIDE_STAGING });
await page.waitForTimeout(12000);
await page.addStyleTag({ content: HIDE_STAGING });
for (let i = 0; i < 16; i++) {
  await page.screenshot({ path: `${OUT}full-${String(i).padStart(2, '0')}.png` });
  await page.waitForTimeout(1100);
}
console.log('desktop burst done (16 frames)');
await ctx.close();

// Mobile: single frame, 390x844 @2x.
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  locale: 'en-US',
});
const mpage = await mctx.newPage();
await mpage.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await mpage.addStyleTag({ content: HIDE_STAGING });
await mpage.waitForTimeout(12000);
await mpage.addStyleTag({ content: HIDE_STAGING });
await mpage.screenshot({ path: OUT + 'mobile.png' });
console.log('mobile done');

await browser.close();
