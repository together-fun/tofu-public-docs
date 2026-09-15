# 配图截图清单

截图存放目录：`src/assets/screenshots/`（随 Astro 构建优化）。文件名小写 kebab-case，png。

## 通用规范

- **截图基址**：生产站 https://tofu-website-trade.togetherdotfun.workers.dev/
- **窗口宽度 ≥ 1280px**（桌面 shell），推荐 1920×1080 视口；手机截图 390×844 窄视口。
- **主题**：dark。**语言**：英文（playwright 需设 `locale: 'en-US'`，否则 RainbowKit 等弹窗出中文）。
- ⚠️ **STAGING 徽章**：生产站 navbar 自带黄色 STAGING 角标（staging 数据面）。所有截图必须
  先注入 CSS 隐藏再截：`span[title*="STAGING backend"] { display: none !important; }`，
  成图人工确认无 STAGING 字样后才能入库。
- 敏感信息：不想公开余额/PnL 就告诉 AI，入稿时打码。

## A. 已入库 ✅（2026-09-15 全部人工复核，确认无 STAGING 角标）

| 文件名 | 用在哪页 | 状态 |
|---|---|---|
| trade-page-full.png | dex/introduction, dex/trading-interface | ✅ 2026-09-15 生产站重截（带真实弹幕飘过） |
| perp-market.png | dex/markets | ✅ 2026-09-15 由新 trade-page-full 裁切（去顶栏+左聊天） |
| trade-mobile.png | dex/trading-interface | ✅ 2026-09-15 生产站重截（390×844 @2x） |
| chart-danmaku.png | dex/danmaku | ✅ 2026-09-15 新增：图表区裁切，含渐变/白色弹幕划过 |
| trading-order-form.png | dex/trading-interface | ✅ 2026-09-15 新增：右侧下单表单裁切 |
| chatroom-panel.png | dex/chat | ✅ 2026-09-15 新增：左侧聊天面板裁切（头像/等级徽章/Global 标签） |
| connect-modal.png | dex/getting-started-connect | ✅ 2026-09-15 新增：RainbowKit 弹窗本体（英文，element crop） |
| outcome-question.png | dex/markets | ✅ 沿用（World Cup 地球卡片裁切，无顶栏） |
| leaderboard.png | dex/leaderboard | ✅ 沿用（Top3 领奖台，裁去顶栏） |
| gallery-page.png | dex/cosmetics | ✅ 沿用（109 skins 网格，裁去顶栏） |

## B. 需钱包登录态 — 无法无钱包截取（需用户配合）

> 已验证：未连钱包时 Deposit/Withdraw 按钮 = 发起 connect 或置灰；
> **Ghost 模式下资金按钮明确禁用**（前端 `lib/capability`：`case "ghost": disabled: true`），
> 弹窗打不开。需要连好钱包的浏览器手动截（Win+Shift+S），或提供测试钱包环境给 AI 会话。

| 文件名 | 截什么 |
|---|---|
| deposit-dialog.png | Deposit 弹窗（USDC from Arbitrum） |
| withdraw-dialog.png | Withdraw 弹窗 |
| send-dialog.png | Send（EVM transfer）弹窗 |
| enable-trading-dialog.png | Enable Trading 弹窗 |
| portfolio-page.png | Portfolio（余额 banner + PnL 日历） |
| profile-equipped.png | 个人主页（已装备头像框+名牌） |
| warehouse-grid.png | My Warehouse 收藏网格 |
| achievement-page.png | 成就页 |
| blind-box-page.png | 盲盒页（未连钱包是 gate 页 "No wallet, no…"，已验证） |
| blind-box-opening.png | 开盲盒揭晓动画瞬间 |
| level-page.png | 等级页登录态（进度+奖励轨道） |
| cabal-page.png | Token Cabal 页（连钱包后才可见） |
| gift-dialog.png | 礼物弹窗/动画 |
| red-envelope.png | 红包领取弹窗 |
| danmaku-style-selector.png | 弹幕样式选择器 |
| referral-page.png | 推荐页 |

## C. 功能未上线（占位页「TOFU boy is cooking」）— 暂不配截图

Store / Clan（含 treasury）/ Stream（含 PK）/ Rekt Graveyard。
对应文档页已加 🚧 Coming Soon 标注；上线后补图即可。

## D. 复用现有素材（不用截）

- 装扮素材（头像/框/物品）：R2 原图 `https://tofu-assets.together.fun/skins/{avatar|avatar_frame}/<id>/assets/primary.png`
  （头像 384×384 / 框 512×512），2026-09-15 已统一分辨率入库 `src/assets/cosmetics/`，保证点击放大尺寸一致。
- Tofu Man 系列插画、team 图片、RugPad 截图、`banner_realtimechat.webp`（chat 页）—— 来自前端仓库 public/images。
