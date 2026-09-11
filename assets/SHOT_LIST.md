# GitBook 配图截图清单

存放目录：`docs/gitbook/new/assets/`，文件名按下表（小写 kebab-case，png）。

## 通用规范

- **窗口宽度 ≥ 1280px**（桌面 shell），推荐 1920×1080 视口。
- **主题**：classic-dark。**语言**：英文。
- 手机截图：390×844 窄视口。
- 环境注意：本地 dev = **staging** 后端（导航栏有 STAGING 角标、测试数据）。终稿建议换生产站基址重截（流程相同），或用户确认 staging 图可用。
- 敏感信息：不想公开余额/PnL 就告诉 AI，入稿时打码。

## A. AI 自动截 — 已完成 ✅

| 文件名 | 状态 |
|---|---|
| trade-page-full.png | ✅ 效果佳（图表+聊天+订单簿+下单同框）|
| perp-market.png | ✅ |
| trade-mobile.png | ✅ |
| outcome-question.png | ✅ World Cup 页（staging 赔率显示 "-%"，生产重截更佳）|
| leaderboard.png | ✅ Top3 领奖台 |
| gallery-page.png | ✅ 106 skins 网格 |

## A2. AI 待截（需脚本点击/裁切，下一批）

| 文件名 | 说明 |
|---|---|
| connect-modal.png | 需脚本点击 Connect 按钮弹出 RainbowKit |
| trading-order-form.png | 从 trade-page-full 裁切下单表单区 |
| chatroom-panel.png | 从 trade 页裁切聊天面板（⚠️ staging 聊天室几乎没消息，建议生产站截或用户先发几条）|
| chart-danmaku.png | 需要房间有活跃弹幕（staging 无；生产站或用户手动触发后截）|

## B. 用户手动截（钱包登录态）

> 日常浏览器打开本地 dev（localhost:3000）或线上站，连好钱包，Win+Shift+S 截图存本目录。
> 用等级/装扮最全的账号。

| 文件名 | 截什么 |
|---|---|
| enable-trading-dialog.png | Enable Trading 弹窗 |
| deposit-dialog.png | Deposit 弹窗 |
| withdraw-dialog.png | Withdraw 弹窗 |
| portfolio-page.png | Portfolio（余额 banner + PnL 日历）|
| profile-equipped.png | 个人主页（已装备头像框+名牌）|
| warehouse-grid.png | My Warehouse 收藏网格 |
| achievement-page.png | 成就页 |
| blind-box-page.png | 盲盒页（连钱包后才可见）|
| blind-box-opening.png | 开盲盒揭晓动画瞬间 |
| level-page.png | 等级页登录态（进度+奖励轨道）|
| cabal-page.png | Token Cabal 页（连钱包后才可见）|
| gift-dialog.png | 礼物弹窗/动画 |
| red-envelope.png | 红包领取弹窗 |
| danmaku-style-selector.png | 弹幕样式选择器 |
| referral-page.png | 推荐页 |

## C. 功能未上线（占位页「TOFU boy is cooking」）— 暂不配截图

Store / Clan（含 treasury）/ Stream（含 PK）/ Rekt Graveyard。
对应文档页已加 🚧 Coming Soon 标注；上线后补图即可。

## D. 复用现有素材（不用截）

Tofu Man 系列插画、team 图片、RugPad 截图 —— 沿用现有 GitBook 上传件。
