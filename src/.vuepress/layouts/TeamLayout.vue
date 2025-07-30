<template>
  <div class="team-layout">
    <TeamPage />
  </div>
</template>

<script>
import TeamPage from '../components/TeamPage.vue'

export default {
  name: 'TeamLayout',
  components: {
    TeamPage
  }
}
</script>

<style>
/* 隐藏所有主题默认元素 */
.navbar,
.sidebar,
.page-meta,
.page-nav,
.footer,
.sidebar-button {
  display: none !important;
}

/* 清除页面默认样式 */
.page {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
}

.theme-container {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 确保页面全屏显示 */
.team-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

/* 确保HTML和body元素全屏 */
html, body, #app {
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
</style>