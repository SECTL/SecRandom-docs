import { defineCollection, defineCollections } from "vuepress-theme-plume";

/**
 * 侧边栏约定（中英必须逐项对齐，只有文字不同）：
 * - doc 集合：`概览` → `指南` → `集控` → `设置`（设置下再分 6 组）
 * - 设置分组顺序：基础配置 → 名单与抽取 → 个性化 → 提醒 → 数据与安全 → 高级与扩展
 * - 每个分组都带同名 icon，组内条目全部是二级，不再出现「半截分组」。
 */
const SETTINGS_GROUPS = {
  basic: { zh: '基础配置', en: 'Basics', icon: 'material-symbols:tune-rounded' },
  lists: { zh: '名单与抽取', en: 'Lists & Drawing', icon: 'material-symbols:format-list-bulleted-rounded' },
  personal: { zh: '个性化', en: 'Personalization', icon: 'material-symbols:palette-rounded' },
  alerts: { zh: '提醒', en: 'Notifications', icon: 'material-symbols:notifications-rounded' },
  data: { zh: '数据与安全', en: 'Data & Security', icon: 'material-symbols:shield-outline-rounded' },
  advanced: { zh: '高级与扩展', en: 'Advanced', icon: 'material-symbols:extension-outline-rounded' },
} as const;

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
    { text: '集控', icon: 'lucide:gauge', prefix: 'control', items: [
      { text: '集控概览', link: 'index' },
      { text: '控制台', link: 'console' },
      { text: '远程操作与设备', link: 'remote' },
      { text: '安全与常见问题', link: 'security' },
      { text: '自部署', link: 'self-host' },
    ] },
    { text: '设置', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: SETTINGS_GROUPS.basic.zh, icon: SETTINGS_GROUPS.basic.icon, items: [
        { text: '基本设置', link: 'general-basic' },
        { text: '其他设置', link: 'other' },
      ] },
      { text: SETTINGS_GROUPS.lists.zh, icon: SETTINGS_GROUPS.lists.icon, items: [
        { text: '名单管理', link: 'listmg' },
        { text: '抽取设置', link: 'pick' },
        { text: '历史记录', link: 'history' },
        { text: '可验证抽取', link: 'verification' },
      ] },
      { text: SETTINGS_GROUPS.personal.zh, icon: SETTINGS_GROUPS.personal.icon, items: [
        { text: '外观设置', link: 'appearance' },
        { text: '悬浮窗设置', link: 'floating-window' },
        { text: '音乐库', link: 'music' },
      ] },
      { text: SETTINGS_GROUPS.alerts.zh, icon: SETTINGS_GROUPS.alerts.icon, items: [
        { text: '语音与音乐', link: 'voice' },
        { text: '通知设置', link: 'notification' },
      ] },
      { text: SETTINGS_GROUPS.data.zh, icon: SETTINGS_GROUPS.data.icon, items: [
        { text: '安全设置', link: 'security' },
        { text: '备份设置', link: 'backup' },
        { text: '隐私设置', link: 'privacy' },
        { text: '联动设置', link: 'link' },
      ] },
      { text: SETTINGS_GROUPS.advanced.zh, icon: SETTINGS_GROUPS.advanced.icon, items: [
        { text: '插件设置', link: 'plugins' },
      ] },
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
      { text: 'API 版本与兼容性', link: 'api-versioning' },
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
    { text: 'Control', icon: 'lucide:gauge', prefix: 'control', items: [
      { text: 'Overview', link: 'index' },
      { text: 'Console', link: 'console' },
      { text: 'Remote Operations & Devices', link: 'remote' },
      { text: 'Security & FAQ', link: 'security' },
      { text: 'Self-Hosting', link: 'self-host' },
    ] },
    { text: 'Settings', icon: 'garden:gear-stroke-16', prefix: 'settings', items: [
      { text: SETTINGS_GROUPS.basic.en, icon: SETTINGS_GROUPS.basic.icon, items: [
        { text: 'Basic', link: 'general-basic' },
        { text: 'Other', link: 'other' },
      ] },
      { text: SETTINGS_GROUPS.lists.en, icon: SETTINGS_GROUPS.lists.icon, items: [
        { text: 'List Management', link: 'listmg' },
        { text: 'Drawing Settings', link: 'pick' },
        { text: 'History', link: 'history' },
        { text: 'Verifiable Drawing', link: 'verification' },
      ] },
      { text: SETTINGS_GROUPS.personal.en, icon: SETTINGS_GROUPS.personal.icon, items: [
        { text: 'Appearance', link: 'appearance' },
        { text: 'Floating Window', link: 'floating-window' },
        { text: 'Music Library', link: 'music' },
      ] },
      { text: SETTINGS_GROUPS.alerts.en, icon: SETTINGS_GROUPS.alerts.icon, items: [
        { text: 'Voice & Music', link: 'voice' },
        { text: 'Notification Settings', link: 'notification' },
      ] },
      { text: SETTINGS_GROUPS.data.en, icon: SETTINGS_GROUPS.data.icon, items: [
        { text: 'Security', link: 'security' },
        { text: 'Backup', link: 'backup' },
        { text: 'Privacy', link: 'privacy' },
        { text: 'Link Settings', link: 'link' },
      ] },
      { text: SETTINGS_GROUPS.advanced.en, icon: SETTINGS_GROUPS.advanced.icon, items: [
        { text: 'Plugins Settings', link: 'plugins' },
      ] },
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
      { text: 'API Versions & Compatibility', link: 'api-versioning' },
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
