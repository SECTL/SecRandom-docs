---
title: 贡献指南
createTime: 2025/12/20 18:56:17
---
# 📖 SecRandom 贡献指南

SecRandom 欢迎**任何人**向我们的仓库提交代码。您可以帮助我们做很多工作，包括但不限于：

- 提交补丁来修复bug
- 添加新功能
- 优化现有的功能
- 优化代码的性能
- 完善文档与翻译
- 更多......

通过阅读本指南，您将会了解为 SecRandom 贡献代码的各个流程。您还会了解使用 commit 信息进行二进制构建的方式。现在就开始吧！

## 🚀 快速开始1

在向 SecRandom 项目贡献代码之前，请确保您已完成以下准备工作：

> [!NOTE]
> 除了使用命令行，您还可以使用 GitHub Desktop 或您 IDE 中的内置功能/插件进行操作。

1. **Fork 项目**

    - 访问 [SecRandom GitHub 仓库](https://github.com/SECTL/SecRandom)
    - 点击右上角的 "Fork" 按钮创建您自己的仓库副本

2. **克隆仓库**

> [!WARNING]
> 确保在这一步之前，您已经将终端的工作目录切换到您想保存/修改 SecRandom 源代码的地方。

    ```bash
    git clone https://github.com/您的用户名/SecRandom.git
    cd SecRandom
    ```

3. **添加上游仓库**

    ```bash
    git remote add upstream https://github.com/SECTL/SecRandom.git
    ```

4. **安装虚拟环境** (可选)

> [!TIP]
> 若您不需要运行代码以测试效果，您可以跳过这个部分。

    SecRandom 使用 `uv` 管理虚拟环境。您需要先获取它再执行以下命令。您可以在 [uv官方文档](https://docs.astral.sh/uv/getting-started/) 中获取关于 `uv` 的信息。

    ```bash
    uv venv
    uv sync
    ```

    随后您可以这样运行代码（在虚拟环境中）：

    ```bash
    uv run ./main.py
    ```

## 📤 提交您的贡献

1. **创建分支**

    ```bash
    git checkout -b feature/功能名称
    ```

2. **进行修改**

    - 编写您的代码
    - 添加必要的注释（请使用中文）
    - 确保遵循项目代码规范

3. **提交更改**

    ```bash
    git add .
    git commit -m "描述您的更改内容"
    ```

4. **同步上游更改**

    ```bash
    git fetch upstream
    git rebase upstream/master
    ```

5. **推送并创建拉取请求 (Pull request, PR)**

    ```bash
    git push origin feature/您的功能名称
    ```

    - 访问您的 GitHub Fork 仓库
    - 点击 "Compare & pull request" (比较/拉取请求) 按钮
    - 填写 PR 描述并提交

## 📋 贡献指南

### 代码规范

- 使用中文编写代码注释，别忘记撰写 Docstring
- 遵循 PEP8 倡导的风格指南，若有意异议可以查看现有的代码
- 确保导入所有您已使用的类/函数/变量，不要使用 `from module import *`
- 验证第三方 UI 组件与其他库中的类/函数/变量是否存在

> [!TIP]
> 您可以使用 **PyRight**， **Ruff** 等工具检查代码是否有缺陷/代码是否符合规范。

### 提交 (commit) 信息规范

- 使用清晰、简洁的提交信息
- 以 fix, feat 等约定俗成的单词开头
- 避免过于简单的描述（如："修复bug"）

> [!TIP]
> 我们推荐使用[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)撰写提交信息。

### PR 要求

- PR 标题应简洁明了地描述更改内容（若只有一个提交，也可以直接使用这个提交的标题）
- 提供详细的更改说明，包括：
    - 新增/修改/删除的功能
    - 新增/修改版本/删除的依赖库 和 更改 Python 版本
    - 其他破坏性更改也请一并告知
- 确保所有测试通过
- 确保您修改的代码至少在您的计算机上运行正常
- 关联相关的 Issue（如有）

### 最后一步......

当 SecRandom 的维护者审查了您的 PR，确保没有任何问题之后，就会将您的所贡献的代码合并到主分支。

现在我们 **恭喜您成为 SecRandom 贡献者的一员！**

如果您的 PR 没有通过，也没有关系。请仔细阅读我们的维护者给出的建议并且继续努力，早有一日，您会成为 SecRandom 贡献者的一员。加油😃👍！

## 📖 Actions 构建工作流

若您需要测试自动构建的二进制程序，您可以阅读以下文字来获取更多信息。

### 🚀 GitHub Actions 统一构建工作流使用指南

SecRandom 项目使用统一的 GitHub Actions 工作流进行构建和发布，配置文件位于 `.github/workflows/build-unified.yml`。该工作流支持多种触发方式和配置选项。

#### 通过提交消息触发特定构建

您可以通过在 git commit 消息中包含特定关键词来触发不同的构建行为：

1. **触发打包构建**
   - 在 commit 消息中包含 `打包` 关键词
   - 例如：`git commit -m "新增功能 打包"`

2. **指定构建平台**
   - `win` - Windows 平台
   - `linux` - Linux 平台
   - `all` - 所有平台
   - 例如：`git commit -m "修复bug 打包 linux"`

3. **触发所有平台构建**
   - 创建符合版本号规范的 tag（格式：`v数字.数字.数字.数字`）
   - 例如：`git tag v1.2.3.4 && git push origin v1.2.3.4`

#### 构建参数关键词说明

提交消息中可以包含以下关键词来控制构建行为：

| 关键词 | 含义 | 示例 |
|--------|------|------|
| `打包` | 通用打包触发 | `git commit -m "新增功能 打包"` |
| `win` | Windows 平台 | `git commit -m "修复UI 打包 win"` |
| `linux` | Linux 平台 | `git commit -m "优化性能 打包 linux"` |
| `all` | 所有平台 | `git commit -m "大更新 打包 all"` |

**组合使用示例：**

- `git commit -m "优化性能 打包 pi"` - 使用 PyInstaller 构建 Windows 平台
- `git commit -m "修复bug 打包 pi"` - 使用 PyInstaller 构建 Linux 平台
