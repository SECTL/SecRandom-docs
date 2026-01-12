/* @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。 */

import { defineCollection, defineCollections } from "vuepress-theme-plume";


// 中文文档
const Doc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "文档",
  meta: { createTime: "long" },
  sidebar: [
    { text: '概览', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: '指南', icon: 'ep:guide', prefix: 'guide', items: 'auto' },
    { text: '核心功能', icon: 'icon-park-outline:spanner', prefix: 'core-functions', items: 'auto' },
    { text: '设置', icon: 'garden:gear-stroke-16', prefix: 'settings', items: 'auto' },
    { text: '资源', icon: 'carbon:document', prefix: 'resources', items: 'auto' },
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
  meta: { createTime: "long" },
});

// English docs
const EnDoc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "Documentation",
  meta: { createTime: "long" },
  sidebar: [
    { text: 'Overview', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: 'Guide', icon: 'ep:guide', prefix: 'guide', items: 'auto' },
    { text: 'Core Functions', icon: 'icon-park-outline:spanner', prefix: 'core-functions', items: 'auto' },
    { text: 'Settings', icon: 'garden:gear-stroke-16', prefix: 'settings', items: 'auto' },
    { text: 'Resources', icon: 'carbon:document', prefix: 'resources', items: 'auto' },
  ],
});

const EnFaq = defineCollection({
  type: "post",
  dir: "faq",
  title: "FAQ",
  link: "/faq/",
  tags: false,
  archives: false,
  categories: false,
  meta: { createTime: "long" },
});

export const zhcollections = defineCollections([Doc, Faq]);
export const encollections = defineCollections([EnDoc, EnFaq]);