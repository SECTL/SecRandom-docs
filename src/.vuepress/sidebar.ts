import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
//    "",////删掉行前两个//和本句前后的////，可以添加一个回到主页的按钮，原理未知////
   // "portfolio",//封印了一个博客主页，我们已在team.md完美复刻它
    {
      text: "总览",
      icon: "/assets/icon/overview.png",
      prefix: "Overview/",
      children: "structure",
    },
    {
      text: "首次使用",
      icon: "/assets/icon/overview.png",
      prefix: "docs-FirstUse/",
      children: "structure",
    },
    {
      text: "核心功能",
      icon: "/assets/icon/star.png",
      prefix: "docs-CoreFunctions/",
      children: "structure",
    },
    {
      text: "进阶使用",
      icon: "/assets/icon/settings.png",
      prefix: "docs-AdvancedSettings/",
      children: "structure",
    },
        {
      text: "开发资源",
      icon: "/assets/icon/source-code.png",
      prefix: "docs-Dev/",
      children: "structure",
    },
        {
      text: "关于我们",
      icon: "/assets/icon/support.png",
      link: "/docs-AboutUs/team.md"
    },
  ],
});
