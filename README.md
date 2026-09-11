# TOFU Public Docs

Public documentation site for **Together.fun (TOFU)** — the gamified social trading platform. Replaces the old GitBook site at [docs.together.fun](https://docs.together.fun).

Built with [Astro Starlight](https://starlight.astro.build/). Dark-only theme matching the TOFU brand (green `#14F195` on near-black).

## Local development

```powershell
pnpm install
pnpm dev        # http://localhost:3100
```

Or just right-click `start-local.ps1` → *Run with PowerShell*.

```powershell
pnpm build      # static build into dist/
pnpm preview    # serve the production build locally
```

## Layout

```
src/content/docs/            All pages (index.mdx + tofu-docs/ + arcade/)
src/assets/                  Images referenced by pages (brand / screenshots / backgrounds)
src/styles/theme.css         TOFU theme (palette from HANDOVER.md §5)
astro.config.mjs             Starlight config: sidebar, logo, plugins, port 3100
assets/                      Unused source material library (brand art, shot list)
archive/                     Old GitBook site snapshot + restructure design
HANDOVER.md                  ★ Project handover doc — read this first (Chinese)
```

Content conventions, terminology, and fact-source rules live in `.cursor/rules/tofu-docs.mdc`. Deployment target: Cloudflare (not wired up yet).
