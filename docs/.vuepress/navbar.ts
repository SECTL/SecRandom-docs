import { defineNavbarConfig } from 'vuepress-theme-plume'

const zhNavbar = defineNavbarConfig([
  {
    text: '文档',
    icon: 'mi:book',
    items: [
      { text: '指南', icon: 'ep:guide', link: '/doc/guide/start' },
      { text: '设置', icon: 'garden:gear-stroke-16', link: '/doc/settings/basic' },
    ],
  },
  { text: '下载', icon: 'ic:outline-download', link: '/download' },
  { text: '开发', icon: 'lucide:code-2', link: '/dev/' },
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
    ],
  },
  { text: 'Download', icon: 'ic:outline-download', link: '/en/download' },
  { text: 'Development', icon: 'lucide:code-2', link: '/en/dev/' },
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
