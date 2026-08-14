---
title: contribute
createTime: 2025/12/20 18:56:17
---
# ::lucide:book-open:: SecRandom Contribution Guide

SecRandom welcomes **anyone** to submit code to our repository. You can help us with many things, including but not limited to:

- Submitting patches to fix bugs
- Adding new features
- Optimizing existing features
- Optimizing code performance
- Improving documentation and translations
- And more...

By reading this guide, you will understand the various processes for contributing code to SecRandom. You will also learn how to use commit messages for binary builds. Let's get started now!

## ::lucide:rocket:: Quick Start

Before contributing code to the SecRandom project, please make sure you have completed the following preparations:

> [!NOTE]
> Besides using the command line, you can also use GitHub Desktop or built-in features/plugins in your IDE.

1. **Fork the Project**

    - Visit the [SecRandom GitHub Repository](https://github.com/SECTL/SecRandom)
    - Click the "Fork" button in the upper right corner to create your own copy of the repository

2. **Clone the Repository**

    > [!WARNING]
    > Make sure that before this step, you have switched the terminal's working directory to where you want to save/modify the SecRandom source code.

    ```bash
    git clone https://github.com/your-username/SecRandom.git
    cd SecRandom
    ```

3. **Add Upstream Repository**

    ```bash
    git remote add upstream https://github.com/SECTL/SecRandom.git
    ```

4. **Install Virtual Environment** (Optional)

    > [!TIP]
    > If you do not need to run the code to test the effects, you can skip this section.

    SecRandom uses `uv` to manage virtual environments. You need to get it first before executing the following commands. You can get information about `uv` in the [uv official documentation](https://docs.astral.sh/uv/getting-started/).

    ```bash
    uv venv
    uv sync
    ```

    Then you can run the code like this (in the virtual environment):

    ```bash
    uv run ./main.py
    ```

## ::lucide:upload:: Submit Your Contribution

1. **Create a Branch**

    ```bash
    git checkout -b feature/feature-name
    ```

2. **Make Changes**

    - Write your code
    - Add necessary comments (please use Chinese if possible, or English)
    - Ensure compliance with project code standards

3. **Commit Changes**

    ```bash
    git add .
    git commit -m "Describe your changes"
    ```

4. **Sync Upstream Changes**

    ```bash
    git fetch upstream
    git rebase upstream/master
    ```

5. **Push and Create Pull Request (PR)**

    ```bash
    git push origin feature/your-feature-name
    ```

    - Visit your GitHub Fork repository
    - Click the "Compare & pull request" button
    - Fill in the PR description and submit

## ::lucide:clipboard-list:: Contribution Guidelines

### Code Standards

- Use comments in code, don't forget to write Docstrings
- Follow the style guide advocated by PEP8, check existing code if there are objections
- Ensure importing all classes/functions/variables you used, do not use `from module import *`
- Verify the existence of third-party UI components and classes/functions/variables in other libraries

> [!TIP]
> You can use tools like **PyRight**, **Ruff** to check if the code has defects/complies with standards.

### Commit Message Standards

- Use clear, concise commit messages
- Start with conventional words like fix, feat, etc.
- Avoid overly simple descriptions (e.g., "fix bug")

> [!TIP]
> We recommend using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to write commit messages.

### PR Requirements

- PR title should clearly describe the changes (if there is only one commit, you can also directly use the title of this commit)
- Provide detailed change description, including:
    - Added/Modified/Deleted features
    - Added/Modified version/Deleted dependency libraries and Python version changes
    - Please also inform about other breaking changes
- Ensure all tests pass
- Ensure your modified code runs normally at least on your computer
- Link related Issues (if any)

### The Last Step...

When SecRandom maintainers have reviewed your PR and ensured there are no issues, your contributed code will be merged into the main branch.

Now we **congratulate you on becoming a member of SecRandom contributors!**

If your PR is not passed, it doesn't matter. Please carefully read the suggestions given by our maintainers and continue to work hard. One day, you will become a member of SecRandom contributors. Keep it up ::lucide:smile::::lucide:thumbs-up::!

## ::lucide:book-open:: Actions Build Workflow

If you need to test the automatically built binary program, you can read the following text to get more information.

### ::lucide:rocket:: GitHub Actions Unified Build Workflow Guide

The SecRandom project uses a unified GitHub Actions workflow for building and releasing, with the configuration file located at `.github/workflows/build-unified.yml`. This workflow supports multiple triggering methods and configuration options.

#### Trigger Specific Builds via Commit Messages

You can trigger different build behaviors by including specific keywords in the git commit message:

1. **Trigger Package Build**
   - Include the `打包` (Package) keyword in the commit message
   - Example: `git commit -m "Add feature 打包"`

2. **Specify Build Platform**
   - `win` - Windows platform
   - `linux` - Linux platform
   - `all` - All platforms
   - Example: `git commit -m "Fix bug 打包 linux"`

3. **Trigger All Platform Builds**
   - Create a tag that conforms to the version number specification (Format: `vNumber.Number.Number.Number`)
   - Example: `git tag v1.2.3.4 && git push origin v1.2.3.4`

#### Build Parameter Keywords Description

Commit messages can include the following keywords to control build behavior:

| Keyword | Meaning | Example |
|---------|---------|---------|
| `打包` | General packaging trigger | `git commit -m "Add feature 打包"` |
| `win` | Windows platform | `git commit -m "Fix UI 打包 win"` |
| `linux` | Linux platform | `git commit -m "Optimize performance 打包 linux"` |
| `all` | All platforms | `git commit -m "Major update 打包 all"` |

**Combination Usage Examples:**

- `git commit -m "Optimize performance 打包 pi"` - Use PyInstaller to build for Windows platform
- `git commit -m "Fix bug 打包 pi"` - Use PyInstaller to build for Linux platform
