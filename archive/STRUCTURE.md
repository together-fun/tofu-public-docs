# GitBook 改版结构（2026-09）

> 目标：聚焦交易平台（社交化 + 游戏化），RugPad 降级为 Season 1 回顾，
> Trading Arcade 从占位扩成全功能板块。
> 现有内容存档：`docs/gitbook/archive/llms-full.txt`（改版前全站快照）。

三个板块 = 三个独立 GitBook space（file host 前缀可辨）：

| 板块 | Space 素材前缀 | 处理 |
|---|---|---|
| TOFU Docs | `SuuBptX8e0IplA0w4o1P` | 重写：交易平台优先，RugPad 压成一页回顾 |
| Rugpad Guides | `6fG2KrPO0eiQGbKh4sWM` | 整体下线/隐藏（游戏即将停服）|
| TOFU Trading Arcade | `UirTy3OM4DvMBrVax6Zb` | 从 2 页占位扩成 ~16 页全功能文档 |

## Space 1: TOFU Docs（新页面树）

```
Welcome to TOFU                       tofu-docs/welcome.md        （重写）
Why TOFU
├─ The Problem                        tofu-docs/the-problem.md    （微调保留）
├─ The Solution                       tofu-docs/the-solution.md   （改写：平台已上线口径）
└─ Landscape                          tofu-docs/landscape.md      （保留）
The Tofu Arcade (Platform Overview)   tofu-docs/arcade-overview.md（新：五大支柱总览→链接 Arcade space）
Season 1: RugPad Royale (Recap)       tofu-docs/rugpad-recap.md   （新：原 Phase 1 五页压缩成一页）
Roadmap                               tofu-docs/roadmap.md        （更新）
The Team                              tofu-docs/the-team.md       （保留）
```

## Space 2: TOFU Trading Arcade（新页面树）

```
Introduction                          arcade/introduction.md
Getting Started
├─ Connect & Enable Trading           arcade/getting-started-connect.md
└─ Deposit & Withdraw                 arcade/getting-started-funds.md
Trading
├─ Trading Interface                  arcade/trading-interface.md
├─ Markets: Spot, Perps & Outcomes    arcade/markets.md
└─ Portfolio & History                arcade/portfolio.md
Social Layer
├─ Live Chat & Token Rooms            arcade/chat.md
├─ Danmaku                            arcade/danmaku.md
├─ Gifts & Red Envelopes              arcade/gifts.md
└─ Live Streaming                     arcade/streaming.md
Identity & Progression
├─ XP & Levels                        arcade/xp-levels.md
├─ Avatars & Cosmetics                arcade/cosmetics.md
├─ Achievements                       arcade/achievements.md
└─ Token Cabal                        arcade/token-cabal.md
Trading Drops (Blind Boxes)           arcade/trading-drops.md
Store                                 arcade/store.md
Leaderboard & Rekt Graveyard          arcade/leaderboard.md
Clans                                 arcade/clans.md
Referral                              arcade/referral.md
```

## 图片占位约定

稿内 `<!-- IMG: 描述 -->` = 待补截图/素材位。截图阶段本地起 dev server 逐页截，
存 `docs/gitbook/new/assets/`，推送时经 GitBook API `insert_files` 上传。

## 待用户决策

- 链口径：旧文档写 "built on Solana"（RugPad 时期）；交易平台实际构建在 Hyperliquid 上。
  新稿采用 "powered by Hyperliquid" 口径，Solana 仅保留在 RugPad 回顾页。**需用户确认。**
- Rugpad Guides space 是隐藏（unpublish）还是删除：推荐先 unpublish 保留内容。
