---
title: Contribution Guide
createTime: 2026/08/14 10:00:00
---
# ::lucide:book-open:: SecRandom Contribution Guide

SecRandom welcomes **anyone** to submit code to our repository. You can help us in many ways, including but not limited to:

- Submitting patches to fix bugs
- Adding new features
- Optimizing existing features
- Improving code performance
- Improving documentation and translations
- More......

By reading this guide, you will understand the process of contributing code to SecRandom, including how to trigger binary builds with commit messages. Let's get started!

::: tip Version Notice
This document corresponds to the **v3** (C#/.NET 10 + Avalonia) development flow. The old v2 (Python) flow no longer applies.
:::

## ::lucide:rocket:: Quick Start

Before contributing code to SecRandom, please make sure you have completed the following:

> [!NOTE]
> Besides the command line, you can also use GitHub Desktop or the built-in features/plugins of your IDE.

1. **Fork the project**

    - Visit the [SecRandom GitHub repository](https://github.com/SECTL/SecRandom)
    - Click the "Fork" button in the top right to create your own copy

2. **Clone the repository**

    > [!WARNING]
    > Make sure to switch your terminal working directory to where you want to save/modify the SecRandom source code before this step.

    ```bash
    git clone https://github.com/your-username/SecRandom.git
    cd SecRandom
    ```

3. **Add the upstream repository**

    ```bash
    git remote add upstream https://github.com/SECTL/SecRandom.git
    ```

4. **Prepare the development environment**

    > [!TIP]
    > If you don't need to run the code to test, you can skip this part.

    v3 requires the **.NET 10 SDK** (available from [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/10.0)).

    ```bash
    # Restore dependencies
    dotnet restore SecRandom.sln

    # Build
    dotnet build SecRandom.sln

    # Run the desktop app
    dotnet run --project SecRandom.Desktop
    ```

## ::lucide:upload:: Submit Your Contribution

1. **Create a branch**

    ```bash
    git checkout -b feature/your-feature
    ```

2. **Make changes**

    - Write your code
    - Add necessary comments
    - Follow the project code style

3. **Commit changes**

    ```bash
    git add .
    git commit -m "Describe your changes"
    ```

4. **Sync upstream changes**

    ```bash
    git fetch upstream
    git rebase upstream/master
    ```

5. **Push and create a Pull Request (PR)**

    ```bash
    git push origin feature/your-feature
    ```

    - Visit your GitHub fork
    - Click "Compare & pull request"
    - Fill in the PR description and submit

## ::lucide:clipboard-list:: Contribution Guidelines

### Code Style

- Use clear comments; follow the existing project code style (C# / .NET conventions)
- Follow .NET naming conventions (PascalCase methods/properties, `async` naming suffix, etc.)
- Make sure there are no unused `using` directives
- Verify third-party UI components and other library types exist

> [!TIP]
> You can use `dotnet format` to check code style:
>
> ```bash
> dotnet format SecRandom.sln --verify-no-changes
> ```

### Commit Message Guidelines

- Use clear, concise commit messages
- Start with conventional words like fix, feat, etc.
- Avoid overly simple descriptions (e.g., "fix bug")

> [!TIP]
> We recommend using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

### PR Requirements

- PR title should concisely describe the changes (if there is only one commit, you can use its title)
- Provide detailed change notes, including:
    - Added/modified/removed features
    - Added/modified/removed dependencies and .NET version/TargetFramework changes
    - Other breaking changes (if any)
- Make sure all tests pass
- Make sure your code runs correctly on your machine at least
- Link related Issues (if any)

### Last Step……

Once a SecRandom maintainer reviews your PR and confirms there are no issues, your code will be merged into the main branch.

Now **congratulations, you are a SecRandom contributor!**

If your PR is not accepted, no worries. Read the maintainers' suggestions carefully and keep trying — one day you will become a contributor. Go ::lucide:smile::::lucide:thumbs-up::!

## ::lucide:book-open:: Actions Build Workflow

If you want to test automatically built binaries, read the following for more info.

### ::lucide:rocket:: GitHub Actions Unified Build Workflow

SecRandom uses a unified GitHub Actions workflow for building and publishing, located at `.github/workflows/build_publish.yml`. It uses `dotnet publish` to build desktop apps for Windows / Linux / macOS (x64 / x86 / arm64).

#### Triggering a Release Build

The old v2 supported triggering builds via commit message keywords; v3 release builds are triggered by version tags:

1. **Release build**

   - Create a tag following the version convention (format: `vNumber.Number.Number`, e.g. `v3.0.0-alpha.2`)
   - Example: `git tag v3.0.0-alpha.2 && git push origin v3.0.0-alpha.2`

2. **Manual trigger**

   - On the GitHub Actions page, select the `Build & Publish` workflow
   - Click **Run workflow** and fill in the release tag

#### Artifact Types

The workflow outputs **full** and **light** artifacts:

| Artifact | Description |
|----------|-------------|
| **full** | Self-contained packages with the runtime bundled; no .NET runtime installation needed |
| **light** | Lightweight packages that depend on the system .NET runtime |

Each artifact produces Setup and Portable packages for the target platforms, verifies artifact length and hash, then publishes.
