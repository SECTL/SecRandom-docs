# 开发团队

<ArticleMetadata />

<TeamCard />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'lzy.jpg',
    name: '黎泽懿 Aionflux',
    title: '设计 & 创意 & 策划 & 维护 & 文档 & 测试',
    links: [
      { icon: 'github', link: 'https://github.com/lzy98276' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3267139343' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/520571577' },
      { icon: 'gmail', link: 'mailto:lzy.12@foxmail.com' }
    ]
  },
  {
    avatar: 'chenjintang.jpg',
    name: 'chenjintang',
    title: '维护',
    links: [
      { icon: 'github', link: 'https://github.com/chenjintang-shrimp' }
    ]
  },
  {
    avatar: 'qgzc.png',
    name: '弃稞之草',
    title: '创意 & 维护',
    links: [
      { icon: 'github', link: 'https://github.com/QiKeZhiCao' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/3493114889112202' }
    ]
  },
  {
    avatar: 'slc.jpg',
    name: 'system-linux-cmb',
    title: '应用测试',
    links: [
      { icon: 'github', link: 'https://github.com/Fox-block-offcial' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3609676428' },
      { icon: 'gmail', link: 'system_linux_cmb@163.com' }
    ]
  },
  {
    avatar: 'bx.jpg',
    name: '本新同学',
    title: '响应式前端页面设计及维护 & 文档',
    links: [
      { icon: 'github', link: 'https://github.com/yuanbenxin' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3256651295' },
      { icon: 'gmail', link: 'yuanbenxin@outlook.com' }
          ]
  },
  {
    avatar: 'yby.jpg',
    name: '叶背影',
    title: '创意 & 文档',
    links: [
      { icon: 'github', link: 'https://github.com/LeafS825' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/1762621716' }
    ]
  },
  {
    avatar: 'Jursin.jpg',
    name: 'Jursin',
    title: '响应式前端页面设计及维护 & 文档',
    links: [
      { icon: 'github', link: 'https://github.com/jursin' }
    ]
  }
]
</script>

<VPTeamMembers size="medium" :members="members" />
