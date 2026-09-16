/** Verify HD screenshots + danmaku cards in the built preview (DPR 2). */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3100';
const OUT = '.preview-check/verify-hd/';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'en-US',
});
const page = await ctx.newPage();

// Trading interface: inline hero image.
await page.goto(BASE + '/dex/trading-interface/', { waitUntil: 'networkidle' });
const hero = page.locator('img[alt="The TOFU trading interface on desktop"]');
await hero.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await hero.screenshot({ path: OUT + 'trade-inline.png' });

// Zoomed view: click to open the image-zoom overlay.
await hero.click();
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + 'trade-zoomed.png' });
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// Chat page: token rooms split section.
await page.goto(BASE + '/dex/chat/', { waitUntil: 'networkidle' });
const chatImg = page.locator('.split-media img');
await chatImg.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator('.split-media').screenshot({ path: OUT + 'chat-split.png' });
await chatImg.click();
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + 'chat-zoomed.png' });
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// Danmaku page: style cards row (desktop) + mobile fallback.
await page.goto(BASE + '/dex/danmaku/', { waitUntil: 'networkidle' });
await page.locator('.danmaku-cards').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator('.danmaku-cards').screenshot({ path: OUT + 'danmaku-cards.png' });
await ctx.close();

const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  locale: 'en-US',
});
const mpage = await mctx.newPage();
await mpage.goto(BASE + '/dex/danmaku/', { waitUntil: 'networkidle' });
await mpage.locator('.danmaku-cards').scrollIntoViewIfNeeded();
await mpage.waitForTimeout(500);
await mpage.locator('.danmaku-cards').screenshot({ path: OUT + 'danmaku-cards-mobile.png' });

await browser.close();
console.log('verify-hd done');
