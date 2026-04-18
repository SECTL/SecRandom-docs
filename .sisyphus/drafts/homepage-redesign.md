# Draft: Homepage Redesign

## Requirements (confirmed)
- 重新制作文档站主页（"为这个文档站重新制作一个主页"）
- 先给出可行建议（"你有什么好的建议吗"）
- 参考当前页面预览风格，并突出核心认知："不只是点名软件"
- 先给出纯文本预览草案（"用纯文本拼一个看看"）
- 功能介绍需参照项目本体 `J:\git file\SecRandom`，并调整为更合理表述
- 主页预览中去掉“常见问题”区块

## Technical Decisions
- 先基于仓库现状与主题能力做研究，再给出可落地方向
- 主页首要目标：产品导向（优先让新用户快速理解价值并开始使用）
- 首屏文案策略从功能名词转向价值表达：用“课堂组织与互动效率平台”替代单一“随机点名工具”印象
- “不只是点名软件”的优先证据方向：互动体验优先
- 视觉风格：极简克制（延续当前留白与轻量布局）
- 功能文案口径以本体仓库可证据能力为准，按“课堂互动体验”组织，不做泛化营销表述
- 首页区块调整：移除 FAQ 模块，主路径聚焦“价值认知 → 功能证明 → 上手转化 → 社区信任”

## Research Findings
- 现有首页入口为 `docs/index.md` 与 `docs/en/index.md`，采用 Plume 的首页 frontmatter（`doc-hero` + `features`）
- 未发现自定义 `Home.vue`；当前首页主要是 Markdown 驱动，主题级配置位于 `docs/.vuepress/config.ts` 与 `docs/.vuepress/plume.config.ts`
- 已有可复用设计资产：`docs/.vuepress/theme/styles/custom.css`（首页 hero 样式变量）、`docs/.vuepress/theme/components/TeamCard.vue`（品牌化卡片风格）
- 信息架构核心路径清晰：概览（overview）→ 入门（guide/start）→ 首次引导（guide/software-guide）→ 设置（settings/basic）→ IPC/URL 资源（resources/ipc_url）→ FAQ
- 官方建议首页采用 `pageLayout: home`（优先于旧 `home: true`），并按 `hero/doc-hero`、`features`、`custom` 组合扩展；公告建议用 bulletin
- 已启动针对项目本体仓库的并行探索任务：提取真实功能边界、场景证据与术语口径（结果待回收）
- 项目本体验证能力：点名/抽奖双主流程、公平抽取策略、名单管理、历史记录、悬浮窗与快速抽取、人脸抽取、语音播报、备份恢复、安全验证、URL/IPC
- 过度承诺风险：避免“严格证明公平”“AI身份识别”“全平台全场景兼容”“云端SaaS”等表述

## Open Questions
- 纯文本预览是否作为后续执行版文案基线

## Scope Boundaries
- INCLUDE: 主页信息架构、内容模块建议、实现方向建议
- EXCLUDE: 直接修改源码与主题实现
