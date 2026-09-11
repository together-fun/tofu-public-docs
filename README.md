# TOFU Public Docs

Together.fun (TOFU) 对外公开文档站 —— 替代原 GitBook（docs.together.fun）的自建文档项目。

- **GitHub**: https://github.com/together-fun/tofu-public-docs
- **目标域名**: docs.together.fun（待建站完成后从 GitBook 切 DNS 到 Cloudflare）
- **技术方向**: Astro Starlight 静态站 + Cloudflare 部署（见 `HANDOVER.md` 构建参考）

## 目录结构

```
content/tofu-docs/   TOFU Docs 板块稿件（7 页：Welcome / Why TOFU / Arcade 总览 / Season1 回顾 / Roadmap / Team）
content/arcade/      TOFU Trading Arcade 板块稿件（19 页：交易 / 聊天弹幕 / 装扮等级 / 盲盒 / 工会等）
assets/screenshots/  产品界面截图（配图用，持续补充，见 assets/SHOT_LIST.md）
assets/brand/        品牌素材（Tofu 角色插画 / banner / logo，含旧 GitBook 站全部图片）
archive/             旧 GitBook 站全文存档 + 改版结构设计（历史参考）
HANDOVER.md          ★ 知识移交文档：来龙去脉、风格还原参数、构建与部署参考（先读这个）
.cursor/rules/       本仓库 AI 规则（品牌口径、事实源、写作约定）
```

## 关联仓库（事实源）

| 项目 | 本地路径 | GitHub |
|---|---|---|
| 前端（功能事实源） | `D:\TOFU_website` | https://github.com/MonsterYaoYao/TOFU_website_trade |
| 后端（只读参考） | `D:\TOFU_backend` | https://github.com/guoqianghao9/amzdex（分支 `codex/packages-submodule`）|

文档描述的功能必须与产品实际一致 —— 拿不准时去读前端/后端代码，不要凭空编。
