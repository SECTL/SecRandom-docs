import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  title: "SecRandom",
  description: "SecRandom 文档站",
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    // 导航栏配置
    nav: [
      { text: '🏠 总览', link: '/overview' },
      { text: '📚 指南',
        items: [
          { text: '💻 下载与运行', link: '/guide/start' },
          { text: '🔍 界面介绍', link: '/guide/interface' },          
          { text: '📝 基本操作指南', link: '/guide/basic' }
        ]
      },
      { text: '🔧 核心功能',
        items: [
          { text: '🤝 抽人配置', link: '/core-functions/person-extraction' },
          { text: '🎁 抽奖配置', link: '/core-functions/prize-extraction' },
          { text: '⚖️ 动态权重', link: '/core-functions/dynamic-weight' },
          { text: '📜 历史记录', link: '/core-functions/history' }
        ]
      },
      { text: '⚙️ 设置',
        items: [
          { text: '🔑 基本设置', link: '/settings/basic' },
          { text: '🔒 高级设置', link: '/settings/advanced' }
          ]
      },
      { text: '🛠️ 故障排除', link: '/trouble' },
      { text: '👥 团队', link: '/team' }
    ],

    // 侧边栏配置
    sidebar: [
      { text: '🏠 总览', link: '/overview' },
      { text: '📚 指南',
        collapsed: true,
        items: [
          { text: '💻 下载与运行', link: '/guide/start' },
          { text: '🔍 界面介绍', link: '/guide/interface' },          
          { text: '📝 基本操作指南', link: '/guide/basic' }
        ]
      },
      { text: '🔧 核心功能',
        collapsed: true,
        items: [
          { text: '🤝 抽人配置', link: '/core-functions/person-extraction' },
          { text: '🎁 抽奖配置', link: '/core-functions/prize-extraction' },
          { text: '⚖️ 动态权重', link: '/core-functions/dynamic-weight' },
          { text: '📜 历史记录', link: '/core-functions/history' }
        ]
      },
      { text: '⚙️ 设置',
        collapsed: true,
        items: [
          { text: '🔑 基本设置', link: '/settings/basic' },
          { text: '🔒 高级设置', link: '/settings/advanced' }
          ]
      },
      { text: '🛠️ 故障排除', link: '/trouble' },
      { text: '👥 团队', link: '/team' }
    ],


    search: {
    provider: "local",
    options: {
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档",
        },
        modal: {
          noResultsText: "没有找到结果",
          resetButtonTitle: "清除搜索条件",
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭",
          },
        },
      },
    },
  },

    // 社交链接
    socialLinks: [
      { 
        icon: 'qq',
        link: 'https://qm.qq.com/q/PCqYgev4Em',
        ariaLabel: 'QQ 群'
      },      
      { 
        icon: 'bilibili',
        link: 'https://space.bilibili.com/520571577/lists/5553789',
        ariaLabel: 'bilibili 合集'
      },
      { 
        icon: 'github',
        link: 'https://github.com/SECTL/SecRandom-docs',
        ariaLabel: 'GitHub 文档仓库'
      }
    ],
    
    footer: {
      message: '本文档以 MIT 许可协议授权',
      copyright: 'Copyright 2025 © SECTL'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    editLink: {
      pattern: 'https://github.com/SECTL/SecRandom/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  },
  
  cleanUrls: true,

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    config(md) { 
      md.use(groupIconMdPlugin) //代码组图标
      md.use((md) => {
        const defaultRender = md.render
        md.render = (...args) => {
          const [content, env] = args
          const currentLang = env?.localeIndex || 'root'
          const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          if (currentLang === 'root') {
            defaultContent = defaultContent.replace(/提醒/g, '提醒')
              .replace(/建议/g, '建议')
              .replace(/重要/g, '重要')
              .replace(/警告/g, '警告')
              .replace(/注意/g, '注意')
          }
          // 返回渲染的内容
          return defaultContent
        }

        // 获取原始的 fence 渲染规则
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            // 只渲染图片，不再渲染为代码块
            return `<div class="rendered-md">${md.render(token.content)}</div>`;
          }

          // 其他代码块按默认规则渲染（如 java, js 等）
          return defaultFence(tokens, idx, options, env, self);
        };
      })
    },
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    lineNumbers: true
  },

  vite: {
    plugins: [
      groupIconVitePlugin({ 
        customIcon: {
          ts: 'logos:typescript',
          js: 'logos:javascript',
          md: 'logos:markdown',
          css: 'logos:css-3',
        },
      })
    ],
  }
})