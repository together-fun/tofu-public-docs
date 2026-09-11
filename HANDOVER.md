# 知识移交文档（HANDOVER）

> 写给在本仓库工作的 agent / 维护者。本文档记录这个项目的来龙去脉、已完成的工作、
> 视觉还原参数、以及建站与部署的完整参考。**开工前先通读本文。**
> 移交时间：2026-09-11，移交方：TOFU 前端仓库（D:\TOFU_website）的 agent 会话。

## 1. 背景与决策链（为什么会有这个仓库）

1. TOFU 原本用 **GitBook** 托管公开文档（docs.together.fun），分三个 space：
   TOFU Docs（品牌与愿景）/ Rugpad Guides（Season 1 游戏指南）/ TOFU Trading Arcade（占位）。
2. 2026-09 决定改版：**聚焦交易平台**（RugPad 即将下线，压缩成一页回顾），
   Trading Arcade 从 2 页占位扩成 19 页全功能文档。新稿已全部写完（见 §3）。
3. 原计划走 GitBook API 推送，但 **GitBook 14 天试用到期**：自定义域名需 Premium
   （$65/站/月），当前站用的顶部三板块切换（Site Sections）是 Ultimate 功能
   （$249/站/月 ≈ $3000/年）。免费版只能 xxx.gitbook.io 子域、单人。
4. 裁定：**放弃 GitBook，自建静态文档站**。理由：内容全是 Markdown 且由 AI 撰写维护
   （GitBook 最值钱的可视化编辑器用不上）；TOFU 已有 Cloudflare 基础设施与域名，
   静态站托管免费；样式可以做到比 GitBook 更贴 TOFU 品牌。
5. 本仓库即为此新项目：**独立于前端仓库**（依赖隔离、部署解耦、可开放协作）。

## 2. 建站技术方向（建议，可再评估）

- **框架**：[Astro Starlight](https://starlight.astro.build/)（`astro` + `@astrojs/starlight` 两个依赖）。
  选它的理由：纯静态产物、内置暗色主题/侧边导航/右侧 TOC/全文搜索（Pagefind）/移动端适配，
  主题定制走 CSS 变量；Cloudflare 自家 developers.cloudflare.com 就是 Starlight，撑千页规模没问题。
- **部署**：Cloudflare（Workers static assets 或 Pages），连 GitHub 仓库 push 自动构建发布。
  ⚠️ Cloudflare 账号纪律：TOFU 用 togetherdotfun@gmail.com（Account ID `b8140c8a0079e161f4fa0784b63609a4`），
  本机 wrangler 全局登录被 TOFU/USD8 两项目共用，**任何写操作前先 `npx wrangler whoami` 核对账号**。
- **域名**：建成后把 `docs.together.fun` 的 DNS 从 GitBook 切到本站。切换前旧 GitBook 站仍在线，无空窗。
- **llms.txt / *.md 输出**：GitBook 原生提供（archive 里能看到格式），Starlight 有社区插件
  （如 `starlight-llms-txt`）可补齐，建议保留这个能力（对 AI 爬取友好）。
- 顶部「板块切换」（原 GitBook Site Sections：TOFU Docs / Trading Arcade）：Starlight 可用
  sidebar 分组或自定义 header tabs 实现；也可以简化为单侧栏两大分组，自行斟酌。

## 3. 内容现状（content/ 目录）

- 语言：英文；文风：degen-friendly（沿用旧站调性——短句、梗、每页结尾一句斜体 punchline）。
- **content/tofu-docs/**（7 页）：welcome（重写，交易平台优先）、the-problem、the-solution、
  landscape、arcade-overview（五支柱总览）、rugpad-recap（Season 1 一页回顾）、roadmap、the-team。
- **content/arcade/**（19 页）：introduction、getting-started-connect、getting-started-funds、
  trading-interface、markets、portfolio、chat、danmaku、gifts、streaming、xp-levels、cosmetics、
  achievements、token-cabal、trading-drops、store、leaderboard、clans、referral。
- 页面树设计（含 GitBook space 对应关系）见 `archive/STRUCTURE.md`。
- 稿内 `<!-- IMG: ... -->` = 配图占位；`<!-- CARDS: ... -->` = 卡片链接区占位（原 GitBook 卡片布局）。
- **🚧 Coming Soon 标注**：Store / Streaming / Clans / Rekt Graveyard 四个功能截稿时是
  占位页（"TOFU boy is cooking"），文档里已如实标注；功能上线后移除标注并补截图。
- **口径决策（已定）**：交易平台叙事用 "powered by Hyperliquid"；Solana 只出现在
  rugpad-recap（Season 1 历史）。旧站的 "built on Solana" 口径已废弃。

## 4. 配图现状（assets/ 目录）

- `assets/SHOT_LIST.md` = 截图清单与状态（A=已截 6 张 / A2=待截 4 张需脚本点击或裁切 /
  B=需钱包登录态 14 张待用户或有钱包环境的会话截 / C=功能未上线暂不配图）。
- 截图方法：本地起前端 dev server（`D:\TOFU_website` 下 `pnpm --filter @tofu/web dev`，
  连 staging 后端）+ `npx playwright screenshot --viewport-size="1920,1080" --wait-for-timeout=12000 <url> <file>`。
  ⚠️ 已截图带 STAGING 角标与测试数据；终稿建议换生产站域名重截（问用户要地址）。
- `assets/brand/`：旧 GitBook 三个 space 的全部关键图片已下载留存（tofu-girl-inviting、
  tofu-rocket、banner 系列、team 图、RugPad 主图、Hashlock 审计图等），另有前端仓库
  public 里的插画素材（tofuboy 系列、tofurocket、mystery-box、gift-character 等 webp）
  与官方 logo SVG（tofu_logo_circle / tofu_logo_sq）。

## 5. 视觉还原参数（从线上 GitBook 站实测提取，2026-09-11）

新站要「延续旧站观感」，以下是从 docs.together.fun 渲染页直接扒下来的权威参数：

### 5.1 主题基调

- GitBook 主题配置（html class 实录）：`theme-clean tint rounded-corners sidebar-list-pill
  links-default depth-subtle font-Inter dark` —— 即：clean 风格、带色调偏移的中性色、
  圆角、侧栏选中项为药丸形高亮、默认**暗色模式**、字体 **Inter**。
- 布局：左上 logo + 顶部板块 tab；左侧分组导航（组标题全大写小字号）；正文居中约 720px；
  右侧 "On this page" 目录；页面卡片（Jump right in）为圆角卡 + 封面图。

### 5.2 色板（RGB 值为实测，可直接用）

| 角色 | 暗色模式（默认） | 浅色模式 |
|---|---|---|
| 页面底色 tint-1 | `rgb(1 5 2)` ≈ #010502（带绿味近黑） | `rgb(255 255 255)` |
| 面板/侧栏底 tint-2~4 | #050D07 / #131C15 / #19231C | #F9FAFA / #F6F8F7 / #F1F3F1 |
| 边框/分隔 tint-6~8 | #2A342C / #3B463E / #4E5951 | #E3E6E4 / #D6DAD7 / #C9CECB |
| 次要文字 tint-9~11 | #B4C1B7 / #77837A / #B3B8B4 | #7C8880 / #707D75 / #6B706C |
| 正文文字 tint-12 | #FEFFFE | 深灰 #1D1D1D |
| **品牌主色 primary-9** | **`rgb(20 241 149)` = #14F195** | `rgb(0 165 79)` = #00A54F |
| 主色 hover primary-10 | `rgb(0 178 91)` = #00B25B | #009944 |
| 主色淡底 primary-3~5 | #242F28 / #23342A / #243C2D（选中项药丸底） | #EDFCF2 / #E3F9EA / #D9F6E3 |

> 与 TOFU 主产品品牌一致：绿 `#14F195` / 黑 `#030303`（产品）vs #010502（docs 站底色，几乎相同）。
> 浅色模式主色用了加深的 #00A54F 保证对比度——若新站只做暗色可忽略浅色列。

### 5.3 Logo 与图标

- `assets/brand/gitbook-site-logo.png` —— 旧站左上角 logo 原件（TOFU 绿色方块字标）。
- `assets/brand/gitbook-site-icon.png` —— 站点 favicon/icon 原件。
- 矢量版：`assets/brand/tofu_logo_sq.svg` / `tofu_logo_circle.svg`（来自前端仓库，优先用矢量）。

### 5.4 Starlight 映射建议

Starlight 主题即一组 CSS 变量（`--sl-color-accent`、`--sl-color-bg`、`--sl-color-text` 等，
定义深浅两套）。直接映射：accent=`#14F195`（dark）/`#00A54F`(light)、bg=`#010502`、
bg-sidebar=`#050D07`、hairline=`#2A342C`、text=`#FEFFFE`、text-dim=`#B4C1B7`；
字体 Inter（`@fontsource/inter` 或系统栈回退）；侧栏选中态做药丸圆角 + primary-3 淡绿底 +
primary-9 文字，即可高度还原旧站观感。

## 6. 写作与维护约定（详见 .cursor/rules/tofu-docs.mdc）

- **功能事实源**：前端 `D:\TOFU_website`（页面/组件/路由 = 功能真相）+ 后端 `D:\TOFU_backend`
  （只读参考）。文档不许描述产品没有的行为；规划中功能标 🚧 Coming Soon。
- 品牌叙事基准：前端仓库 `.cursor/rules/tofu.mdc`（五大支柱、命名表 HYPE/DUMP/Trading Drops 等），
  已复制一份到本仓库 `.cursor/rules/`。
- 术语：买=HYPE、卖=DUMP、盲盒=Trading Drops、工会=Clan、弹幕=Danmaku、每 token 进度=Token Cabal。

## 7. 待办清单（接手后的路线图）

1. [ ] Starlight 建站骨架 + TOFU 主题（§5 参数）+ 灌入 content/ 全部稿件
2. [ ] 本地预览给用户过稿（用户会中文反馈，文档正文保持英文）
3. [ ] 补齐配图：A2 四张（需 playwright 脚本点击/裁切）+ B 类 14 张钱包态（需用户配合）
   + 视情况用生产站重截带 STAGING 角标的 6 张
4. [ ] 图片占位 `<!-- IMG: ... -->` 替换为真实引用；卡片区 `<!-- CARDS: ... -->` 用组件实现
5. [ ] llms.txt / 页面 .md 输出插件
6. [ ] 部署 Cloudflare（核对账号！§2）+ 用户确认后切 docs.together.fun DNS
7. [ ] 旧 GitBook 账号降回 Free 留档（用户操作）

## 8. 历史存档

- `archive/llms-full.txt` —— 旧 GitBook 站三个 space 全文（改版前快照，2026-09-10）。
  RugPad 详细玩法、旧 Roadmap、团队页原文都在里面，重写时可回查。
- `archive/STRUCTURE.md` —— 改版页面树设计与旧 space 映射。
