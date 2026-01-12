import { defineThemeConfig } from 'vuepress-theme-plume'
import { zhNavbar, enNavbar } from './navbar'
import { zhcollections, encollections } from './collections'

const currentYear = new Date().getFullYear()
export default defineThemeConfig({
  logo: '/logo.png',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/SECTL/SecRandom-docs' },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"/><path fill="currentColor" d="M15.08 4.21s-.71-.4-1.4-.2L2.32 7.23 5.34 1.84s.44-.88 2.15-.84l9.49.02-1.82 3.24-.08-.05Zm3.76-2.18l-1.93 3.44s.48.45.62.97l1.69 6.6-6.52 2.02 2.35-3.83-.73-2.89s-.38-1.14-1.5-1.01c-.02 0-.04 0-.05 0-1.16.18-11.89 3.23-11.89 3.23 0 0-.84.24-.88 1.1 0 0-.02.93.53 1.78l4.76 8.35 1.75-3.12s-.55-.51-.61-.77l-1.92-7.01 6.45-1.88s.35-.18.49.13l-2.81 3.6.96 3.22s.42.71 1.4.71l12.39-3.47s.82-.16.59-1.43c0 0 .04-.47-.35-1.25l-4.77-8.51Z"/><path fill="var(--icon-secondary, currentColor)" d="M8.7 19.69s.66.29 1.09.27l11.97-3.36-2.75 4.9s-.67 1.37-2.26 1.37l-9.9.14 1.85-3.31Z"/></g></svg>',
        name: 'STCN'
        },
      link: 'https://forum.smart-teach.cn/t/secrandom'
    },
    { icon: 'bilibili', link: 'https://space.bilibili.com/520571577/lists/5553789' },
    { icon: 'qq', link: 'https://qm.qq.com/q/PCqYgev4Em' }
  ],
  navbarSocialInclude: ['github', 'STCN', 'bilibili', 'qq'],
  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: { 
    license: {
      name: 'CC BY-NC-SA 4.0',
      url: 'https://github.com/SECTL/SecRandom-docs/blob/main/LICENSE'
    },
    author: {
      name: 'SECTL',
      url: 'https://github.com/SECTL'
    },
    creation: 'original'
  },

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'circle-clip',  // 配置深色模式切换过渡动画类型
  },

  locales: {
    '/': {
      navbar: zhNavbar,
      collections: zhcollections,
      footer: {
        message: '由 <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a> 驱动',
        copyright: `© 2025-${currentYear} 版权所有 <a href="https://github.com/SECTL">SECTL</a> | 采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议<img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/by.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg">`,
      },
    },
    '/en/': {
      navbar: enNavbar,
      collections: encollections,
      footer: {
        message: 'Powered by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
        copyright: `© 2025-${currentYear} by <a href="https://github.com/SECTL">SECTL</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/by.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"><img class="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg">`,
      },
    },
  },
})
