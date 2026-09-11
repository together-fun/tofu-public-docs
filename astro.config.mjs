// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

// TOFU public docs — replaces the old GitBook site at docs.together.fun.
// Theme parameters are reverse-engineered from the old GitBook site (see HANDOVER.md §5).
export default defineConfig({
  site: 'https://docs.together.fun',
  // Fixed port so it never clashes with the frontend dev server on 3000.
  server: { port: 3100 },
  integrations: [
    starlight({
      title: 'TOFU Docs',
      description:
        'Official documentation for Together.fun (TOFU) — the gamified social trading platform. Together, We Farm Fun.',
      logo: {
        src: './src/assets/brand/tofu_logo_sq.svg',
        alt: 'TOFU logo',
      },
      favicon: '/favicon.png',
      social: [
        { icon: 'x.com', label: 'X (Twitter)', href: 'https://x.com/togetherdotfun' },
        { icon: 'rocket', label: 'Together.fun', href: 'https://together.fun' },
      ],
      customCss: [
        '@fontsource/inter/400.css',
        '@fontsource/inter/500.css',
        '@fontsource/inter/600.css',
        '@fontsource/inter/700.css',
        './src/styles/theme.css',
      ],
      // Dark-only theme (the old GitBook site defaulted to dark).
      components: {
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'TOFU Docs',
          items: [
            { label: 'Welcome to TOFU', link: '/' },
            {
              label: 'Why TOFU',
              items: [
                'tofu-docs/the-problem',
                'tofu-docs/the-solution',
                'tofu-docs/landscape',
              ],
            },
            'tofu-docs/arcade-overview',
            'tofu-docs/rugpad-recap',
            'tofu-docs/roadmap',
            'tofu-docs/the-team',
          ],
        },
        {
          label: 'Trading Arcade',
          items: [
            'arcade/introduction',
            {
              label: 'Getting Started',
              items: [
                'arcade/getting-started-connect',
                'arcade/getting-started-funds',
              ],
            },
            {
              label: 'Trading',
              items: [
                'arcade/trading-interface',
                'arcade/markets',
                'arcade/portfolio',
              ],
            },
            {
              label: 'Social Layer',
              items: [
                'arcade/chat',
                'arcade/danmaku',
                'arcade/gifts',
                { slug: 'arcade/streaming', badge: { text: 'Soon', variant: 'caution' } },
              ],
            },
            {
              label: 'Identity & Progression',
              items: [
                'arcade/xp-levels',
                'arcade/cosmetics',
                'arcade/achievements',
                'arcade/token-cabal',
              ],
            },
            'arcade/trading-drops',
            { slug: 'arcade/store', badge: { text: 'Soon', variant: 'caution' } },
            'arcade/leaderboard',
            { slug: 'arcade/clans', badge: { text: 'Soon', variant: 'caution' } },
            'arcade/referral',
          ],
        },
      ],
      plugins: [starlightLlmsTxt()],
    }),
  ],
});
