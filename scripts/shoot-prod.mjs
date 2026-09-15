/**
 * Production-site screenshot helper (playwright).
 *
 * Usage: node scripts/shoot-prod.mjs
 *
 * Rules (see assets/SHOT_LIST.md):
 * - The production navbar carries a yellow STAGING badge (staging data plane).
 *   Every shot MUST hide it first via the injected CSS below, and every final
 *   image must be manually checked for the "STAGING" text before committing.
 * - Use locale en-US, otherwise RainbowKit & friends render in Chinese.
 * - Danmaku demo messages loop over the chart; retry until a shot catches one.
 */
import { chromium } from 'playwright';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;
const OUT = 'assets/raw-shots/';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
const page = await ctx.newPage();

// Full trade page (chart + chat + order book + order form).
await page.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: HIDE_STAGING });
await page.waitForTimeout(12000);
await page.addStyleTag({ content: HIDE_STAGING });
await page.screenshot({ path: OUT + 'trade-page-full.png' });
console.log('trade-page-full done — check it has danmaku + no STAGING');

// Connect modal (RainbowKit), cropped to the dialog card.
await page.getByRole('button', { name: /^connect$/i }).first().click();
await page.waitForTimeout(4000);
const card = page.locator('[data-rk] [role="dialog"] > div > div').first();
const box = await card.boundingBox();
if (box) {
  await page.screenshot({
    path: OUT + 'connect-modal.png',
    clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 },
  });
  console.log('connect-modal done');
}

await browser.close();
