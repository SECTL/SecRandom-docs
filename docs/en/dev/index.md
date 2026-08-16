---
title: Development Docs
createTime: 2026/08/14
---

# ::lucide:code-2:: Development Docs

Welcome to the SecRandom development documentation. Here you'll find the technical details for developing SecRandom plugins, using the automation interfaces, and contributing code to the repository.

SecRandom uses the following tech stack. You should have a basic understanding of these when developing for SecRandom or writing companion tools:

- Built on [.NET 10](https://learn.microsoft.com/en-us/dotnet/core/introduction) using [C#](https://learn.microsoft.com/en-us/dotnet/csharp/) as the programming language.
- Uses [Avalonia](https://avaloniaui.net/) as the UI framework with the [FluentAvalonia](https://github.com/amwx/FluentAvalonia) theme.
- Uses [Microsoft.Extensions.Hosting](https://learn.microsoft.com/en-us/dotnet/core/extensions/generic-host) as the dependency injection (IoC) container.

**Resources you may find useful during development:**

- This development documentation;
- [SecRandom source code](https://github.com/SECTL/SecRandom): the source is very helpful when developing plugins and improves your understanding of the API;
- [FluentAvalonia docs](https://amwx.github.io/FluentAvaloniaDocs/) and [source code](https://github.com/amwx/FluentAvalonia): useful when customizing the theme.

If you intend to contribute code to the SecRandom repository, please read the [Contribution Guide](/en/dev/contribute) first.

## ::lucide:sparkles:: What Can I Do?

You can extend SecRandom to varying degrees in the following ways.

- **: You can easily extend the application with SecRandom plugins, such as registering custom settings pages or main pages, registering floating-window buttons, and running fair draws through the controlled draw interface. Finished plugins can be shared with other users through the [plugin market](/en/dev/plugins/publishing).
- **: You can use the [IPC & URL Protocol](/en/dev/ipc_url) to query SecRandom data (such as lists and history) and trigger operations such as windows and draws from other processes.
- **Modify SecRandom itself:** If the methods above don't meet your needs, you can modify SecRandom itself for deeper customization. You can also open a Pull Request to the [SecRandom repository](https://github.com/SECTL/SecRandom) to merge your changes into the main branch.

## ::lucide:book-open:: Table of Contents

- [Set Up a Plugin Environment](/en/dev/get-started): Prepare the .NET environment and reference the plugin SDK.
- [Plugins](/en/dev/plugins/): What plugins are and how to start writing one.
- [IPC & URL Protocol](/en/dev/ipc_url): The automation interface for external processes.
- [Contribution Guide](/en/dev/contribute): How to contribute code to the SecRandom repository.
