# 开发团队

<ArticleMetadata />

<TeamCard />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/lzy98276.png',
    name: '黎泽懿 Aionflux',
    title: '设计&创意&策划&维护&文档&测试',
    links: [
      { icon: 'github', link: 'https://github.com/lzy98276' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3267139343' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/520571577' },
      { icon: 'maildotru', link: 'mailto:lzy.12@foxmail.com' }
    ]
  },
  {
    avatar: 'https://www.github.com/QiKeZhiCao.png',
    name: '弃稞之草',
    title: '创意&维护',
    links: [
      { icon: 'github', link: 'https://github.com/QiKeZhiCao' }
    ]
  },
  {
    avatar: 'slc.jpg',
    name: 'system-linux-cmb',
    title: '应用测试',
    links: [
      { icon: 'github', link: 'https://github.com/Fox-block-offcial' }
    ]
  },
  {
    avatar: 'https://www.github.com/yuanbenxin.png',
    name: '本新同学',
    title: '响应式前端页面设计及维护&文档',
    links: [
      { icon: 'github', link: 'https://github.com/yuanbenxin' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3256651295' },
      { icon: 'maildotru', link: 'yuanbenxin@outlook.com' }
          ]
  },
  {
    avatar: 'yby.jpg',
    name: '叶背影',
    title: '文档',
    links: [
      { icon: 'github', link: 'https://github.com/zhangjianjian7' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/1762621716' }
    ]
  },
  {
    avatar: 'https://www.github.com/jursin.png',
    name: 'Jursin',
    title: '前端页面设计&文档',
    links: [
      { icon: 'github', link: 'https://github.com/jursin' }
    ]
  }
]
</script>

<VPTeamMembers size="medium" :members="members" />