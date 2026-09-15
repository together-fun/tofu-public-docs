/**
 * Hero shot: avatars need ~10s to load (cold cache) while the danmaku demo
 * plays only during the first ~10s — so warm the cache first, then reload:
 * avatars render instantly from cache and the danmaku demo replays.
 * Output: .preview-check/hero/full-XX.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;
const OUT = '.preview-check/hero/';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
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
console.log('hero burst done');
await browser.close();
