/**
 * Measure navbar search box vs "On this page" TOC alignment at several
 * viewport widths, so the search box can be pinned to the TOC column.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3100';
const browser = await chromium.launch();

for (const width of [1280, 1440, 1728, 1920]) {
  const ctx = await browser.newContext({ viewport: { width, height: 1000 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/dex/introduction/', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), right: Math.round(b.right), w: Math.round(b.width) };
    };
    return {
      searchBtn: r(document.querySelector('site-search button')),
      searchWrap: r(document.querySelector('div.header > div:nth-child(2)')),
      tocPanel: r(document.querySelector('.right-sidebar-panel')),
      tocHeading: r(document.querySelector('.right-sidebar-panel h2')),
      tocLinks: r(document.querySelector('.right-sidebar-panel nav ul')),
      rightSidebar: r(document.querySelector('.right-sidebar')),
      content: r(document.querySelector('.sl-markdown-content')),
    };
  });
  console.log(`--- viewport ${width}px ---`);
  for (const [k, v] of Object.entries(data)) {
    console.log(`${k.padEnd(13)} ${v ? `x=${v.x} right=${v.right} w=${v.w}` : 'n/a'}`);
  }
  await ctx.close();
}
await browser.close();
