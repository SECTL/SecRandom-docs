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
    avatar: 'https://s1.aigei.com/src/img/png/99/9905f63f0ac84e208384244c5b23ee53.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:WNG863ZQ7bUeD3BN9YoTrvL2vRc=',
    name: 'system-linux-cmb',
    title: '应用测试'
  },
  {
    avatar: 'https://www.github.com/yuanbenxin.png',
    name: '本新同学',
    title: '响应式前端页面设计及维护&文档',
    links: [
      { icon: 'github', link: 'https://github.com/yuanbenxin' },
      { icon: 'qq', link: 'https://tool.gljlw.com/qq/?qq=3256651295' }
    ]
  }
]
</script>

<VPTeamMembers size="medium" :members="members" />