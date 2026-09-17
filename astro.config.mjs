// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightImageZoom from 'starlight-image-zoom';

// TOFU public docs — replaces the old GitBook site at docs.together.fun.
// Theme parameters are reverse-engineered from the old GitBook site (see HANDOVER.md §5).
export default defineConfig({
  site: 'https://docs.together.fun',
  // Fixed port so it never clashes with the frontend dev server on 3000.
  server: { port: 3100 },
  redirects: {
    '/tofu-docs/dex-overview': '/dex/introduction/',
  },
  integrations: [
    starlight({
      title: 'TOFU Docs',
      description:
        'Official documentation for Together.fun (TOFU) — the social trading platform powered by Hyperliquid. Together, We Farm Fun.',
      logo: {
        src: './src/assets/brand/tofu_logo_sq.svg',
        alt: 'TOFU logo',
        replacesTitle: true,
      },
      favicon: '/favicon.png',
      social: [
        { icon: 'x.com', label: 'X (Twitter)', href: 'https://x.com/togetherdotfun' },
        { icon: 'telegram', label: 'Telegram', href: 'https://t.me/togetherfun' },
      ],
      customCss: ['./src/styles/fonts.css', './src/styles/theme.css'],
      components: {
        // Dark-only theme (the old GitBook site defaulted to dark).
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        // Preloads fonts + logo to stop per-navigation flicker.
        Head: './src/components/Head.astro',
      },
      // Flat two-level sidebar: uppercase group labels + page items (GitBook look).
      sidebar: [
        {
          label: 'TOFU Intro',
          items: [
            { label: 'Welcome to TOFU', link: '/' },
            'tofu-docs/the-problem',
            'tofu-docs/the-solution',
            'tofu-docs/the-team',
          ],
        },
        {
          label: 'TOFU Dex',
          items: [
            'dex/introduction',
            'dex/getting-started-connect',
            'dex/getting-started-funds',
          ],
        },
        {
          label: 'Trading',
          items: ['dex/trading-interface', 'dex/markets', 'dex/portfolio'],
        },
        {
          label: 'Social',
          items: [
            'dex/chat',
            'dex/danmaku',
            'dex/leaderboard',
            { slug: 'dex/clans', badge: { text: 'Soon', variant: 'caution' } },
          ],
        },
        {
          label: 'Progression',
          items: [
            'dex/your-identity',
            'dex/xp-levels',
            'dex/cosmetics',
            'dex/trading-drops',
            'dex/coming-soon',
          ],
        },
        {
          label: 'Legacy',
          items: ['tofu-docs/rugpad-recap'],
        },
      ],
      plugins: [starlightLlmsTxt(), starlightImageZoom()],
    }),
  ],
});
