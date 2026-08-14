---
title: 开发文档
createTime: 2026/08/14
---

# ::lucide:code-2:: 开发文档

欢迎来到 SecRandom 开发文档。这里包含为 SecRandom 开发插件、使用自动化接口以及向仓库贡献代码的技术细节。

SecRandom 使用了如下技术栈。在参与 SecRandom 开发或为 SecRandom 编写配套工具时，最好对以下内容有基本的了解：

- 本项目基于 [.NET 10](https://learn.microsoft.com/zh-cn/dotnet/core/introduction) 开发，使用 [C#](https://learn.microsoft.com/zh-cn/dotnet/csharp/) 作为编程语言。
- 本项目使用 [Avalonia](https://avaloniaui.net/) 作为 UI 框架，并使用 [FluentAvalonia](https://github.com/amwx/FluentAvalonia) 主题。
- 本项目使用 [Microsoft.Extensions.Hosting](https://learn.microsoft.com/zh-cn/dotnet/core/extensions/generic-host) 作为依赖注入（IoC）容器。

**开发时可以参考以下资源：**

- 本开发文档；
- [SecRandom 源代码](https://github.com/SECTL/SecRandom)：SecRandom 源码在开发插件时很有参考价值，可以增加对 API 的理解；
- [FluentAvalonia 文档](https://amwx.github.io/FluentAvaloniaDocs/) 与[源代码](https://github.com/amwx/FluentAvalonia)：这些资源在进行主题自定义时很有用。

如果您打算向 SecRandom 仓库贡献代码，请先阅读 [贡献指南](/dev/contribute)。

## ::lucide:sparkles:: 我可以做什么

您可以通过以下方法来不同程度地扩展 SecRandom 的功能。

- **：** 您可以通过 SecRandom 插件，轻松地扩展应用的功能，例如注册自定义设置页或主页面、注册浮窗按钮、通过受控抽奖接口执行公平抽取等。制作好的插件可以通过[插件市场](/dev/plugins/publishing)与其他用户共享。
- **：** 您可以通过 [IPC 与 URL 协议](/dev/ipc_url)，从其它进程查询 SecRandom 的数据（如名单、历史记录）以及触发窗口、抽取等操作。
- **修改 SecRandom 本体：** 如果上面的方法不能满足您的需求，您也可以通过修改 SecRandom 本体来实现更高程度的自定义。您也可以向 [SecRandom 代码仓库](https://github.com/SECTL/SecRandom)发起 Pull Request，将您的更改合并到主分支上。

## ::lucide:book-open:: 目录

- [配置插件开发环境](/dev/get-started)：准备 .NET 环境并引用插件 SDK。
- [插件](/dev/plugins/)：插件是什么，以及如何开始编写插件。
- [IPC & URL 协议](/dev/ipc_url)：供外部进程调用的自动化接口。
- [贡献指南](/dev/contribute)：如何向 SecRandom 仓库提交代码。
