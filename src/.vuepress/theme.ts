import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // 星野提示：开发环境不需要设置 hostname，会自动使用本地地址
  // hostname: "https://SecRandom-docs.github.io",

  author: {
    name: "黎泽懿",
    url: "https://github.com/lzy98276",
  },

  logo: "/logo.png",

  repo: "SECTL/SecRandom",

  docsDir: "src",

  // 导航栏
  navbar: [
    { // 星野添加：主页链接
      text: "主页",
      link: "/",
      icon: "/logo.png",
    },
    {
      text: "总览",
      link: "/Overview/",
      icon: "/assets/icon/overview.png",
    },    
    {
      text: "首次使用",
      link: "/docs-FirstUse/",
      icon: "/assets/icon/overview.png",
    },

    {
      text: "名单管理",
      link: "/docs-CoreFunctions/",
      icon: "/assets/icon/star.png",
    },

    {
      text: "进阶使用",
      link: "/docs-AdvancedSettings/",
      icon: "/assets/icon/settings.png",
    },

    {
      text: "开发资源",
      link: "/docs-Dev/",
      icon: "/assets/icon/source-code.png",
    },

    {
      text: "关于我们",
      link: "/docs-AboutUs/team.md",
      icon: "/assets/icon/about.png",
    },



  ],

  // 侧边栏
  sidebar,

  // 页脚
  footer: "使用 <a href='https://theme-hope.vuejs.press/zh/'target='_blank'>VuePress Theme Hope</a> 主题 | MIT 协议",
  // 星野提示：已移除 Icons8.com 引用，所有图标已替换为本地图标
  displayFooter: true,

  //Copyright信息
  copyright: "Copyright © 2025-至今  SECTL",

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234",
      },
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // math: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    slimsearch: {
      // 插件选项
    },
    // 或 slimsearch: true,

    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    //comment: {
      //provider: "Giscus",
      //repo: "vuepress-theme-hope/giscus-discussions",
      //repoId: "R_kgDOG_Pt2A",
      //category: "Announcements",
      //categoryId: "DIC_kwDOG_Pt2M4COD69",
    //},

    components: {
      components: ["Badge", "VPCard", "GlobalHint"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
