import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  sourceDir: "src",
  base: "/",

  lang: "zh-CN",
  title: "SecRandom",
  description: "",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
