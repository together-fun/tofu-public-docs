/**
 * Flicker check: navigate across pages and record (a) whether the Inter font
 * was already available at first render (no FOUT) and (b) cumulative
 * layout-shift score per page load. CLS ≈ 0 + font ready = no visible jump.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3100';
const routes = [
  '/',
  '/dex/introduction/',
  '/dex/markets/',
  '/dex/portfolio/',
  '/dex/your-identity/',
  '/dex/getting-started-connect/',
  '/tofu-docs/the-problem/',
  '/tofu-docs/the-team/',
  '/dex/introduction/',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1728, height: 1000 } });
const page = await ctx.newPage();

// Instrument every document before any of its scripts run.
await page.addInitScript(() => {
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
  // Font availability as early as possible (before stylesheets settle counts
  // as "ready at first paint" for our purposes).
  window.__fontAtStart = document.fonts ? document.fonts.check('1rem Inter') : null;
});

// Warm run first (cold cache), then measure warm navigations like a user
// clicking through the sidebar.
for (let round = 0; round < 2; round++) {
  if (round === 1) console.log('--- warm navigations ---');
  for (const r of routes) {
    await page.goto(BASE + r, { waitUntil: 'networkidle' });
    const res = await page.evaluate(() => ({
      cls: Math.round(window.__cls * 10000) / 10000,
      fontAtStart: window.__fontAtStart,
      fontNow: document.fonts.check('1rem Inter') && document.fonts.check('700 1rem Inter'),
    }));
    if (round === 1)
      console.log(
        `${r.padEnd(32)} CLS=${res.cls}  Inter@start=${res.fontAtStart}  Inter loaded=${res.fontNow}`,
      );
  }
}
await browser.close();
console.log('flicker check done');
