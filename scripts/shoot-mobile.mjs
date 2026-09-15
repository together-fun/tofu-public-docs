/** Mobile trade view, 390x844 @2x — plain viewport (no isMobile UA quirks). */
import { chromium } from 'playwright';

const BASE = 'https://tofu-website-trade.togetherdotfun.workers.dev';
const HIDE_STAGING = `span[title*="STAGING backend"] { display: none !important; }`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  locale: 'en-US',
});
const page = await ctx.newPage();
// Warm-up pass so avatars land in the browser cache, then reload for a
// fully-rendered chat panel.
await page.goto(BASE + '/trade', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(15000);
await page.reload({ waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: HIDE_STAGING });
await page.waitForTimeout(3500);
await page.addStyleTag({ content: HIDE_STAGING });
for (let i = 0; i < 6; i++) {
  await page.screenshot({ path: `.preview-check/retake/mobile-${i}.png` });
  await page.waitForTimeout(800);
}
console.log('mobile retake done');
await browser.close();
