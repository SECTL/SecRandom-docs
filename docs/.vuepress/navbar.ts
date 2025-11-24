/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  {
    text: '文档',
    icon: 'mi:book',
    items: [
      { text: '指南', icon: 'ep:guide', link: '/doc/guide/start' },
      { text: '核心功能', icon: 'icon-park-outline:spanner', link: '/doc/core-functions/person-extraction' },
      { text: '设置', icon: 'garden:gear-stroke-16', link: '/doc/settings/basic' },
    ],
  },
  {
    text: '常见问题',
    icon: 'mingcute:question-line',
    link: '/faq/',
  },
  { text: '团队', icon: 'ic:round-people', link: '/team' },
  { text: '捐赠', icon: 'ic:outline-attach-money', link: '/donate' },
  { text: '友链', icon: 'ic:round-link', link: '/friends' },
])
