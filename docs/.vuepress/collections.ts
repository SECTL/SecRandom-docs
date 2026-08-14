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
      { text: '可验证抽取', link: 'verification' },
      { text: '更多设置', link: 'other' },
    ] },
    { text: '资源', icon: 'carbon:document', prefix: 'resources', items: [
      { text: '贡献指南', link: 'contribute' },
      { text: 'IPC & URL 协议', link: 'ipc_url' },
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
      { text: 'Linkage', link: 'link' },
      { text: 'Verifiable Drawing', link: 'verification' },
      { text: 'More Settings', link: 'other' },
    ] },
    { text: 'Resources', icon: 'carbon:document', prefix: 'resources', items: [
      { text: 'Contribute', link: 'contribute' },
      { text: 'IPC & URL Protocol', link: 'ipc_url' },
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

export const zhcollections = defineCollections([Doc, Faq]);
export const encollections = defineCollections([EnDoc, EnFaq]);
