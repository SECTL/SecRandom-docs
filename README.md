 # SecRandom 文档

使用 VitePress 搭建，Netlify 部署

[![Netlify Status](https://api.netlify.com/api/v1/badges/f31b1cc4-0fdf-45fd-96f2-ef92ec108fde/deploy-status)](https://app.netlify.com/projects/secrandom/deploys)

![Alt](https://repobeats.axiom.co/api/embed/09ef1a08c32b802b653bc49cdb2ba79800dac1e6.svg "Repobeats analytics image")

## 快速开始
- 环境要求
  - Node.js 20+
  - npm
- 安装依赖
  ```bash
  npm install
  ```
- 开发模式
  ```bash
  npm run docs:dev
  ```
  开发服务器将运行在 [http://localhost:5173](http://localhost:5173)
- 构建生产版本
  ```bash
  npm run docs:build
  ```
  构建结果将输出到 .vitepress/dist 目录
- 预览生产版本
  ```bash
  npm run docs:preview
  ```
- 内容编写指南
  - 所有文档使用 Markdown 格式编写
  - 在 docs 目录下创建新的 .md 文件即可自动生成对应页面
  - 使用 Frontmatter 配置页面元数据：
  - 在 `/docs/.vitepress/config.mts` 中配置站点

## 贡献指南
- Fork 本项目
- 修改并提交 commit
- 推送到 main 分支或新建 dev 分支
- 创建 Pull Request
- 等待审核后合并