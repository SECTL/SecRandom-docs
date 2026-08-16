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
      { text: '通用设置', icon: 'material-symbols:tune-rounded', items: [
        { text: '基本设置', link: 'general-basic' },
        { text: '安全设置', link: 'security' },
        { text: '备份设置', link: 'backup' },
        { text: '隐私设置', link: 'privacy' },
      ] },
      { text: '个性化', icon: 'material-symbols:palette-rounded', items: [
        { text: '外观设置', link: 'appearance' },
        { text: '悬浮窗设置', link: 'floating-window' },
        { text: '音乐库', link: 'music' },
      ] },
      { text: '名单管理', link: 'listmg' },
      { text: '抽取设置', link: 'pick' },
      { text: '提醒设置', icon: 'material-symbols:notifications-rounded', items: [
        { text: '语音与音乐', link: 'voice' },
        { text: '通知设置', link: 'notification' },
      ] },
      { text: '历史记录', link: 'history' },
      { text: '联动设置', link: 'link' },
{ text: '高级设置', link: 'advanced' },
{ text: '可验证抽取', link: 'verification' },
{ text: '插件设置', link: 'plugins' },
{ text: '其他设置', link: 'other' },
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
      { text: 'General', icon: 'material-symbols:tune-rounded', items: [
        { text: 'Basic', link: 'general-basic' },
        { text: 'Security', link: 'security' },
        { text: 'Backup', link: 'backup' },
        { text: 'Privacy', link: 'privacy' },
      ] },
      { text: 'Personalization', icon: 'material-symbols:palette-rounded', items: [
        { text: 'Appearance', link: 'appearance' },
        { text: 'Floating Window', link: 'floating-window' },
        { text: 'Music Library', link: 'music' },
      ] },
      { text: 'List Management', link: 'listmg' },
      { text: 'Picking Settings', link: 'pick' },
      { text: 'Notifications', icon: 'material-symbols:notifications-rounded', items: [
        { text: 'Voice & Music', link: 'voice' },
        { text: 'Notification Settings', link: 'notification' },
      ] },
      { text: 'History', link: 'history' },
{ text: 'Link Settings', link: 'link' },
{ text: 'Verifiable Drawing', link: 'verification' },
{ text: 'Advanced Settings', link: 'advanced' },
{ text: 'Plugins Settings', link: 'plugins' },
{ text: 'Other Settings', link: 'other' },
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
