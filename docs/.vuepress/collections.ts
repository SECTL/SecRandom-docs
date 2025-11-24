/* @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。 */

import { defineCollection, defineCollections } from "vuepress-theme-plume";

const Doc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "文档",
  sidebar: [
    { text: '指南', icon: 'ep:guide', prefix: 'guide', items: 'auto' },
    { text: '核心功能', icon: 'icon-park-outline:spanner', prefix: 'core-functions', items: 'auto' },
    { text: '设置', icon: 'garden:gear-stroke-16', prefix: 'settings', items: 'auto' },
  ],
});

const Faq = defineCollection({
  type: "post",
  dir: "faq",
  title: "常见问题",
  link: "/faq/",
  //   linkPrefix: '/article/', // 相关文章的链接前缀
  //   postList: true, // 是否启用文章列表页
  tags: false, // 是否启用标签页
  archives: false, // 是否启用归档页
  categories: false, // 是否启用分类页
  //   postCover: 'right', // 文章封面位置
  //   pagination: 15, // 每页显示文章数量
});

export default defineCollections([Doc, Faq]);
