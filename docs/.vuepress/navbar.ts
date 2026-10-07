import { defineNavbarConfig } from 'vuepress-theme-plume'

/**
 * 顶部导航栏保持「8 个平级入口」的扁平结构，
 * 顺序与用户的心智模型一致：先读指南 → 再配置 → 再集控 → 开发 →
 * 查常见问题 → 下载 → 了解团队 → 捐赠。
 *
 * 中英文两个 locale 的入口数量、顺序、icon 必须逐项对齐，
 * 只允许文字与链接前缀（/en/）不同。
 */
const zhNavbar = defineNavbarConfig([
  { text: '指南', icon: 'ep:guide', link: '/doc/guide/start' },
  { text: '设置', icon: 'garden:gear-stroke-16', link: '/doc/settings/general-basic' },
  { text: '集控', icon: 'lucide:gauge', link: '/doc/control/' },
  { text: '开发', icon: 'lucide:code-2', link: '/dev/' },
  { text: '常见问题', icon: 'mingcute:question-line', link: '/faq/' },
  { text: '下载', icon: 'ic:outline-download', link: '/download' },
  {
    text: '团队',
    icon: 'ic:round-people',
    items: [
      { text: '团队', icon: 'ic:round-people', link: '/team' },
      { text: '友情链接', icon: 'lucide:link', link: '/friends' },
    ],
  },
  { text: '捐赠', icon: 'ic:outline-attach-money', link: '/donate' },
])

const enNavbar = defineNavbarConfig([
  { text: 'Guide', icon: 'ep:guide', link: '/en/doc/guide/start' },
  { text: 'Settings', icon: 'garden:gear-stroke-16', link: '/en/doc/settings/general-basic' },
  { text: 'Control', icon: 'lucide:gauge', link: '/en/doc/control/' },
  { text: 'Development', icon: 'lucide:code-2', link: '/en/dev/' },
  { text: 'FAQ', icon: 'mingcute:question-line', link: '/en/faq/' },
  { text: 'Download', icon: 'ic:outline-download', link: '/en/download' },
  {
    text: 'Team',
    icon: 'ic:round-people',
    items: [
      { text: 'Team', icon: 'ic:round-people', link: '/en/team' },
      { text: 'Friends', icon: 'lucide:link', link: '/en/friends' },
    ],
  },
  { text: 'Donate', icon: 'ic:outline-attach-money', link: '/en/donate' },
])

export { zhNavbar, enNavbar }
