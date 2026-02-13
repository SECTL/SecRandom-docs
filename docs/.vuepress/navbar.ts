/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

const zhNavbar = defineNavbarConfig([
  {
    text: '文档',
    icon: 'mi:book',
    items: [
      { text: '指南', icon: 'ep:guide', link: '/doc/guide/start' },
      { text: '设置', icon: 'garden:gear-stroke-16', link: '/doc/settings/basic' },
      { text: '资源', icon: 'carbon:document', link: '/doc/resources/contribute' },
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

const enNavbar = defineNavbarConfig([
  {
    text: 'Documentation',
    icon: 'mi:book',
    items: [
      { text: 'Guide', icon: 'ep:guide', link: '/en/doc/guide/start' },
      { text: 'Settings', icon: 'garden:gear-stroke-16', link: '/en/doc/settings/basic' },
      { text: 'Resources', icon: 'carbon:document', link: '/en/doc/resources/contribute' },
    ],
  },
  {
    text: 'FAQ',
    icon: 'mingcute:question-line',
    link: '/en/faq/',
  },
  { text: 'Team', icon: 'ic:round-people', link: '/en/team' },
  { text: 'Donate', icon: 'ic:outline-attach-money', link: '/en/donate' },
  { text: 'Friends', icon: 'ic:round-link', link: '/en/friends' },
])

export { zhNavbar, enNavbar }
