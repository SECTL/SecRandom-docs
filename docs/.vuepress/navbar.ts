/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  {
    text: '指南',
    icon: 'mi:book',
    link: '/doc/guide/start',
  },
  {
    text: '常见问题',
    icon: 'mingcute:question-line',
    link: '/faq/',
  },
  { text: '下载', icon: 'ic:outline-download', link: '/download' },
  { text: '捐赠', icon: 'ic:outline-attach-money', link: '/donate' },
  { text: '友链', icon: 'ic:round-people', link: '/friends' },
])
