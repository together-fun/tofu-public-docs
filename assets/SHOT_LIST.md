# 配图截图清单

截图存放目录：`src/assets/screenshots/`（随 Astro 构建优化）。文件名小写 kebab-case，png。

## 通用规范

- **截图基址**：生产站 https://tofu-website-trade.togetherdotfun.workers.dev/
- **窗口宽度 ≥ 1280px**（桌面 shell），推荐 1920×1080 视口；手机截图 390×844 窄视口。
- **主题**：dark。**语言**：英文（playwright 需设 `locale: 'en-US'`，否则 RainbowKit 等弹窗出中文）。
- ⚠️ **STAGING 徽章**：生产站 navbar 自带黄色 STAGING 角标（staging 数据面）。所有截图必须
  先注入 CSS 隐藏再截：`span[title*="STAGING backend"] { display: none !important; }`，
  成图人工确认无 STAGING 字样后才能入库。
- ⚠️ **换图必须换新文件名**（与前端 R2 纪律一致，禁止同名覆盖）：2026-09-15 复盘确认，
  此前"截图已换但用户仍看到 STAGING"的根因是同名覆盖 + 交付链缓存（长驻 `pnpm preview`
  进程 + 浏览器缓存 + dist/.astro 旧产物），源文件其实早已干净。新文件名让旧缓存必然失效。
- 截图技巧：聊天头像冷缓存要 ~10s 才加载，而弹幕 demo 只在加载后前 ~10s 播放一轮——
  先加载 15s 预热缓存再 reload，头像秒出、弹幕重播，连拍挑帧（见 scripts/shoot-hero.mjs）。
- 敏感信息：不想公开余额/PnL 就告诉 AI，入稿时打码。

## A. 已入库 ✅（2026-09-16 第三轮：交易页系列改 2x 重截，`-hd` 新文件名）

> ⚠️ **桌面截图必须 `deviceScaleFactor: 2`**（见 scripts/shoot-hd.mjs + crop-hd.mjs）。
> 2026-09-16 复盘：此前桌面截图是 1x 捕获（如聊天面板仅 370×560 物理像素），正文列 ~768px
> CSS 显示时在 DPR≥1.5 屏幕上像素不足、点击放大更糊——Astro 管线并不降宽（产物=源尺寸），
> 根因在源图分辨率。2x 重截后正常视图与 zoom 均清晰。

| 文件名 | 用在哪页 | 状态 |
|---|---|---|
| dex-trade-full-hd.png | dex/introduction, dex/trading-interface | ✅ 2026-09-16 @2x 重截（3840×2160，头像已加载 + 双弹幕居中） |
| dex-perp-market-hd.png | dex/markets | ✅ 由 dex-trade-full-hd 裁切（去顶栏+左聊天，3070×1950） |
| dex-trade-mobile.png | dex/trading-interface | ✅ 2026-09-15 重截（390×844 @2x，含弹幕，本就是 2x 无需重截） |
| dex-danmaku-hd.png | dex/danmaku | ✅ 图表区裁切（1720×1200），渐变+白色双弹幕居中 |
| dex-order-form-hd.png | dex/trading-interface | ✅ 右侧下单表单裁切（744×1344） |
| dex-chat-panel-hd.png | dex/chat | ✅ 聊天面板紧裁（740×1120，左图右文布局用，无邻窗残边） |
| connect-modal.png | dex/getting-started-connect | ✅ 沿用（RainbowKit 弹窗 element crop，复核无 STAGING） |
| prediction-markets.png | dex/markets（Outcome Markets） | ✅ 2026-09-15 用户提供（Prediction Markets 卡片墙） |
| leaderboard.png | dex/leaderboard | ✅ 沿用（Top3 领奖台，裁去顶栏） |
| gallery-page.png | dex/cosmetics | ✅ 沿用（109 skins 网格，裁去顶栏） |
| modal-deposit.png | dex/getting-started-funds | ✅ 2026-09-15 用户提供（钱包登录态弹窗） |
| modal-withdraw.png | dex/getting-started-funds | ✅ 同上 |
| modal-transfer.png | dex/getting-started-funds | ✅ 同上（Perps↔Spot） |
| modal-send.png | dex/getting-started-funds | ✅ 同上（Send on HyperCore，MAX 余额为真实测试值，可公开） |
| modal-evm-transfer.png | dex/getting-started-funds | ✅ 同上（Spot↔HyperEVM） |
| pipeline-sign-in.png | dex/getting-started-connect | ✅ 2026-11-02 用户提供（新三步流水线窗停在第 2 步 Sign in；替代旧 RainbowKit→直接 Enable 的叙事） |
| enable-trading-session.png | dex/getting-started-connect | ✅ 2026-11-02 用户提供（新版 Enable Trading 四节点 stepper，停在第 4 步 Session；替代已删除的 enable-trading-dialog.png） |
| achievement-hero-hd.webp | dex/achievements（首图） | ✅ 2026-11-02 本地 dev（localhost:3000，staging 后端）@2x 截 `/achievement` 首屏，裁去导航栏+跑马灯、隐藏 Next dev 角标；未登录态（Featured = Genesis 500 Tofu Chefs 真实活动） |
| achievement-detail-genesis.png | dex/achievements | ✅ 同上，Featured 详情弹窗 element crop（任务 3 条 + 奖励 tile + 0/500 席位） |
| markets-overview.png | dex/markets（首图） | ✅ 2026-09-15 用户提供（Outcome/Perps/Spot tab + 热力图 + Top Volume + 行情表） |
| profile-trading-calendar.png | dex/portfolio（首图） | ✅ 2026-09-15 用户提供（Trading Calendar + Account Performance，余额经用户同意公开） |
| profile-warehouse.png | dex/your-identity（首图） | ✅ 2026-09-15 用户提供（MonsterDegen profile + My Warehouse 头像仓库） |

## B. 需钱包登录态 — 无法无钱包截取（需用户配合）

> 已验证：未连钱包时 Deposit/Withdraw 按钮 = 发起 connect 或置灰；
> **Ghost 模式下资金按钮明确禁用**（前端 `lib/capability`：`case "ghost": disabled: true`），
> 弹窗打不开。需要连好钱包的浏览器手动截（Win+Shift+S），或提供测试钱包环境给 AI 会话。

| 文件名 | 截什么 |
|---|---|
| profile-equipped.png | 个人主页（已装备头像框+名牌） |
| achievement-page-signed-in.png | 成就页登录态（Growth Route 进度线填充 + 可领取 pack 的 Claim 按钮 + 列表进度条）；未登录版已入库，见 A 表 |
| achievement-unlocked-reveal.png | Epic/Legendary 成就完成的全屏 Achievement Unlocked 揭晓 |
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

- 聊天等级徽章 12 张：R2 `https://tofu-web-assets.together.fun/chatlevel/{0..11}.png`（300×100，左半留白给数字），
  2026-11-02 全量入库 `src/assets/chatlevel/`；docs 用 `.lvl-badge` 叠数字（复刻前端 ChatLevelBadge：
  padding 8%/54%、字号 0.44×高）。旧 `src/assets/cosmetics/chatlevel-*.png` 已删。
- 装扮素材（头像/框/物品）：R2 原图 `https://tofu-assets.together.fun/skins/{avatar|avatar_frame}/<id>/assets/primary.png`
  （头像 384×384 / 框 512×512），2026-09-15 已统一分辨率入库 `src/assets/cosmetics/`，保证点击放大尺寸一致。
- Tofu Man 系列插画、team 图片、RugPad 截图、`banner_realtimechat.webp`（chat 页）—— 来自前端仓库 public/images。
- `trading-crew-night.webp`（tofu-docs/the-problem 首图）—— 由 `D:\TOFU_website_main\public\images\hero-bg.webp`
  整幅入画（2560×1429 → 1600 宽），整屋人开黑，不再裁左下角。
- `tofu-rocket-ride.png`（dex/coming-soon 首图）—— 旧 GitBook Gamified Execution 页的骑火箭 Tofu Man，
  源文件为留存的 `assets/brand/tofu-rocket-gitbook.png`（1024×1024），2026-09-15 以新名入库 `src/assets/brand/`。
  注意：与 the-team 页的 `mascot-rocket.webp`（三个 Tofu 坐金色火箭）不是同一张，两页无重复。
- `tofu-market-checkout.png`（dex/getting-started-funds banner）—— 旧 GitBook Collective Action 页的
  超市收银台 Tofu 图（1897×1081），2026-09-15 从 GitBook 原图 URL 下载，留存 `assets/brand/` 并入库 `src/assets/brand/`。
