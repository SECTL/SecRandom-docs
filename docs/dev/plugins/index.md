---
title: 插件
createTime: 2026/08/14
---

# ::lucide:puzzle:: 插件

插件可以在不修改 SecRandom 应用本体的情况下扩展其功能，例如注册自定义设置页与主页面、注册浮窗按钮、通过受控抽奖接口执行公平抽取等。制作好的插件可以通过[插件市场](/dev/plugins/publishing)与其他用户共享。

::: warning 插件为桌面端功能
宿主只加载桌面端插件；移动端（Android / iOS）不加载动态插件。
:::

## ::lucide:rocket:: 开始编写插件

- [配置插件开发环境](/dev/get-started)：准备开发环境并引用插件 SDK。
- [开始编写插件](/dev/plugins/create-project)：创建项目、了解插件结构并配置清单文件。
- [插件基础知识](/dev/plugins/basics)：加载流程、apiVersion 规则、页面注册与本地化、配置用法。
- [插件入口类](/dev/plugins/plugin-base)：`PluginBase` 入口与生命周期。
- [能力面](/dev/plugins/capabilities)：宿主向插件暴露的稳定契约。
- [插件依赖](/dev/plugins/dependency)：宿主提供依赖、外部包依赖与版本冲突。
- [发布插件](/dev/plugins/publishing)：打包 `.srpx` 并上架插件市场。

## ::lucide:store:: 插件市场

应用内置的插件市场从 [SECTL/SecRandom-PluginIndex](https://github.com/SECTL/SecRandom-PluginIndex) 加载官方索引：

- 索引 `index.json` 与其 Ed25519 签名 `index.json.sig` 由索引仓库的 workflow 在每次 push 与 nightly 生成，发布到固定 release tag `generated`。
- 客户端镜像优先、GitHub 直连兜底下载，先验证整个索引的签名，再校验每个插件包的 SHA-256，安装前还会按 `dependencies` 做拓扑排序解析依赖。

如果您想要以开发插件的形式为 SecRandom 生态做出贡献，[发布插件](/dev/plugins/publishing)一节介绍了完整的投稿流程。
