---
title: 贡献指南
createTime: 2026/08/14 10:00:00
---
# ::lucide:book-open:: SecRandom 贡献指南

SecRandom 欢迎**任何人**向我们的仓库提交代码。你可以帮助我们做很多工作，包括但不限于：

- 提交补丁来修复 bug
- 添加新功能
- 优化现有的功能
- 优化代码的性能
- 完善文档与翻译
- 更多......

通过阅读本指南，你将会了解为 SecRandom 贡献代码的各个流程。你还会了解使用 commit 信息进行二进制构建的方式。现在就开始吧！

::: tip 版本提示
本文档对应 **v3**（C#/.NET 10 + Avalonia）开发流程。旧版 v2（Python）的贡献流程已不适用。
:::

## ::lucide:rocket:: 快速开始

在向 SecRandom 项目贡献代码之前，请确保你已完成以下准备工作：

> [!NOTE]
> 除了使用命令行，你还可以使用 GitHub Desktop 或你 IDE 中的内置功能/插件进行操作。

1. **Fork 项目**

    - 访问 [SecRandom GitHub 仓库](https://github.com/SECTL/SecRandom)
    - 点击右上角的 "Fork" 按钮创建你自己的仓库副本

2. **克隆仓库**

    > [!WARNING]
    > 确保在这一步之前，你已经将终端的工作目录切换到你想保存/修改 SecRandom 源代码的地方。

    ```bash
    git clone https://github.com/你的用户名/SecRandom.git
    cd SecRandom
    ```

3. **添加上游仓库**

    ```bash
    git remote add upstream https://github.com/SECTL/SecRandom.git
    ```

4. **准备开发环境**

    > [!TIP]
    > 若你不需要运行代码以测试效果，你可以跳过这个部分。

    v3 需要安装 **.NET 10 SDK**（可从 [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/10.0) 获取）。

    ```bash
    # 还原依赖
    dotnet restore SecRandom.sln

    # 构建
    dotnet build SecRandom.sln

    # 运行桌面端
    dotnet run --project SecRandom.Desktop
    ```

## ::lucide:upload:: 提交你的贡献

1. **创建分支**

    ```bash
    git checkout -b feature/功能名称
    ```

2. **进行修改**

    - 编写你的代码
    - 添加必要的注释（请使用中文）
    - 确保遵循项目代码规范

3. **提交更改**

    ```bash
    git add .
    git commit -m "描述你的更改内容"
    ```

4. **同步上游更改**

    ```bash
    git fetch upstream
    git rebase upstream/master
    ```

5. **推送并创建拉取请求 (Pull request, PR)**

    ```bash
    git push origin feature/你的功能名称
    ```

    - 访问你的 GitHub Fork 仓库
    - 点击 "Compare & pull request" (比较/拉取请求) 按钮
    - 填写 PR 描述并提交

## ::lucide:clipboard-list:: 贡献指南

### 代码规范

- 使用中文编写代码注释，遵循项目现有代码风格（C# / .NET 惯例）
- 遵循 .NET 官方的命名规范（PascalCase 方法/属性、`async` 命名后缀等）
- 确保没有未使用的 `using` 指令
- 验证第三方 UI 组件与其他库中的类/函数/变量是否存在

> [!TIP]
> 你可以使用 `dotnet format` 检查代码风格是否符合规范：
>
> ```bash
> dotnet format SecRandom.sln --verify-no-changes
> ```

### 提交 (commit) 信息规范

- 使用清晰、简洁的提交信息
- 以 fix, feat 等约定俗成的单词开头
- 避免过于简单的描述（如："修复bug"）

> [!TIP]
> 我们推荐使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 撰写提交信息。

### PR 要求

- PR 标题应简洁明了地描述更改内容（若只有一个提交，也可以直接使用这个提交的标题）
- 提供详细的更改说明，包括：
    - 新增/修改/删除的功能
    - 新增/修改版本/删除的依赖库 和 更改 .NET 版本/TargetFramework
    - 其他破坏性更改（如果存在）
- 确保所有测试通过
- 确保你修改的代码至少在你的计算机上运行正常
- 关联相关的 Issue（如有）

### 最后一步……

当 SecRandom 的维护者审查了你的 PR，确保没有任何问题之后，就会将你所贡献的代码合并到主分支。

现在我们 **恭喜你成为 SecRandom 贡献者的一员！**

如果你的 PR 没有通过，也没有关系。请仔细阅读我们的维护者给出的建议并且继续努力，总有一日，你会成为 SecRandom 贡献者的一员。加油::lucide:smile::::lucide:thumbs-up::！

## ::lucide:book-open:: Actions 构建工作流

若你需要测试自动构建的二进制程序，你可以阅读以下文字来获取更多信息。

### ::lucide:rocket:: GitHub Actions 统一构建工作流使用指南

SecRandom 项目使用统一的 GitHub Actions 工作流进行构建和发布，配置文件位于 `.github/workflows/build_publish.yml`。该工作流使用 `dotnet publish` 为 Windows / Linux / macOS 构建桌面端（x64 / x86 / arm64）。

#### 通过提交消息触发特定构建

旧版 v2 支持通过 commit 消息关键词触发构建；v3 的发布构建通过版本标签（tag）触发：

1. **发布构建**

   - 创建符合版本号规范的 tag（格式：`v数字.数字.数字`，例如 `v3.0.0-alpha.2`）
   - 例如：`git tag v3.0.0-alpha.2 && git push origin v3.0.0-alpha.2`

2. **手动触发**

   - 在 GitHub Actions 页面选择 `Build & Publish` 工作流
   - 点击 **Run workflow** 并填写发布标签

#### 构建产物说明

工作流输出 **完整版（full）** 与 **轻量版（light）** 两类产物：

| 产物 | 说明 |
|------|------|
| **full** | 自包含完整运行时的安装/便携包，无需安装 .NET 运行时 |
| **light** | 依赖系统 .NET 运行时的轻量包 |

每个产物会生成对应平台的安装包（Setup）与便携包（Portable），并校验制品长度与哈希后发布。
