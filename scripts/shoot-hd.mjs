/**
 * HD retake of the trade-page screenshots at deviceScaleFactor 2.
 *
 * Why: the previous captures were 1x (370–1920px wide). Displayed in the
 * ~768px reading column they lack physical pixels on DPR ≥ 1.5 screens, and
 * click-to-zoom blows them up well past their native size — hence the blur.
 * A 2x capture doubles the real pixels (3840×2160 full frame) so both the
 * inline view and the zoomed view stay sharp.
 *
 * Same choreography as shoot-hero.mjs: warm the cache 15s (avatars are slow
 * on cold cache), reload (danmaku demo replays), then burst frames and
 * hand-pick the one with centered danmaku. Crops are derived with sharp.
 *
 * Usage: node scripts/shoot-hd.mjs
 * Output: .preview-check/hd/full-XX.png (3840×2160)
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;
const OUT = '.preview-check/hd/';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  locale: 'en-US',
});
const page = await ctx.newPage();

// Warm-up pass: let avatars and chart fully load once.
await page.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(15000);

// Second pass: cached avatars + fresh danmaku demo.
await page.reload({ waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: HIDE_STAGING });
await page.waitForTimeout(2500);
await page.addStyleTag({ content: HIDE_STAGING });
for (let i = 0; i < 14; i++) {
  await page.screenshot({ path: `${OUT}full-${String(i).padStart(2, '0')}.png` });
  await page.waitForTimeout(800);
}
console.log('hd burst done');
await browser.close();
