import { defineCollection, defineCollections } from "vuepress-theme-plume";

// 中文
const Doc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "文档",
  meta: { createTime: "long" },
  sidebar: [
    { text: '概览', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: '指南', icon: 'ep:guide', prefix: 'guide', items: [
      { text: '下载与运行', link: 'start' },
      { text: '软件引导流程', link: 'software-guide' },
      { text: '界面介绍', link: 'interface' },
    ] },
    { text: '设置', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: '基本设置', link: 'basic' },
      { text: '名单管理', link: 'listmg' },
      { text: '抽取设置', link: 'pick' },
      { text: '安全设置', link: 'security' },
      { text: '通知设置', link: 'notification' },
      { text: '语音设置', link: 'voice' },
      { text: '历史记录', link: 'history' },
      { text: '联动设置', link: 'link' },
      { text: '高级设置', link: 'advanced' },
      { text: '其他设置', link: 'other' },
      { text: '插件设置', link: 'plugins' },
    ] },
  ],
});

const Dev = defineCollection({
  type: "doc",
  dir: "dev",
  linkPrefix: "/dev",
  title: "开发",
  meta: { createTime: "long" },
  sidebar: [
    { text: '开发文档', icon: 'material-symbols:code-blocks-rounded', link: 'index' },
    { text: '插件', icon: 'lucide:puzzle', link: 'plugins/index', prefix: 'plugins', items: [
      { text: '插件', link: 'index' },
      { text: '配置插件开发环境', link: 'get-started' },
      { text: '开始编写插件', link: 'create-project' },
      { text: '插件基础知识', link: 'basics' },
      { text: '插件入口类', link: 'plugin-base' },
      { text: '能力面', link: 'capabilities' },
      { text: '插件依赖', link: 'dependency' },
      { text: '发布插件', link: 'publishing' },
    ] },
    { text: '交互', icon: 'lucide:cable', items: [
      { text: 'IPC & URL 协议', link: 'ipc_url' },
    ] },
    { text: '贡献', icon: 'lucide:hand-heart', items: [
      { text: '贡献指南', link: 'contribute' },
    ] },
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

// English
const EnDoc = defineCollection({
  type: "doc",
  dir: "doc",
  linkPrefix: "/doc",
  title: "Documentation",
  meta: { createTime: "long" },
  sidebar: [
    { text: 'Overview', icon: 'material-symbols:overview-outline-rounded', link: 'overview' },
    { text: 'Guide', icon: 'ep:guide', prefix: 'guide', items: [
      { text: 'Download & Run', link: 'start' },
      { text: 'Software Guide', link: 'software-guide' },
      { text: 'Interface', link: 'interface' },
    ] },
    { text: 'Settings', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: 'Basic Settings', link: 'basic' },
      { text: 'List Management', link: 'listmg' },
      { text: 'Extraction Settings', link: 'pick' },
      { text: 'Security Settings', link: 'security' },
      { text: 'Notification Settings', link: 'notification' },
      { text: 'Voice Settings', link: 'voice' },
      { text: 'History', link: 'history' },
      { text: 'Link Settings', link: 'link' },
      { text: 'Advanced Settings', link: 'advanced' },
      { text: 'Other Settings', link: 'other' },
      { text: 'Plugins Settings', link: 'plugins' },
    ] },
  ],
});

const EnDev = defineCollection({
  type: "doc",
  dir: "dev",
  linkPrefix: "/dev",
  title: "Development",
  meta: { createTime: "long" },
  sidebar: [
    { text: 'Development Docs', icon: 'material-symbols:code-blocks-rounded', link: 'index' },
    { text: 'Plugins', icon: 'lucide:puzzle', link: 'plugins/index', prefix: 'plugins', items: [
      { text: 'Plugins', link: 'index' },
      { text: 'Set Up a Plugin Environment', link: 'get-started' },
      { text: 'Create a Plugin', link: 'create-project' },
      { text: 'Plugin Basics', link: 'basics' },
      { text: 'Plugin Entry Class', link: 'plugin-base' },
      { text: 'Capabilities', link: 'capabilities' },
      { text: 'Plugin Dependencies', link: 'dependency' },
      { text: 'Publishing', link: 'publishing' },
    ] },
    { text: 'Interop', icon: 'lucide:cable', items: [
      { text: 'IPC & URL Protocol', link: 'ipc_url' },
    ] },
    { text: 'Contribute', icon: 'lucide:hand-heart', items: [
      { text: 'Contribution Guide', link: 'contribute' },
    ] },
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

export const zhcollections = defineCollections([Doc, Dev, Faq]);
export const encollections = defineCollections([EnDoc, EnDev, EnFaq]);
