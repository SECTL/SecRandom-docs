<template>
  <div class="hint-container warning">
    <p class="hint-container-title">⚠️ 注意</p>
    <p>本页面尚未完善，因此缺少图片描述，部分内容可能存在缺失和谬误，我们将陆续修正。</p>
  </div>
</template>

<script setup lang="ts">
// 星野提示：这个全局提示组件会显示在所有文档页面顶部
</script>

<style scoped>
.hint-container {
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  display: flex;
  flex-direction: column;
}

.hint-container.warning {
  background-color: #fff3cd;
  border-left-color: #ffc107;
}

.hint-container-title {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 8px;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-container p {
  margin: 0;
  color: #856404;
  font-size: 14px;
  line-height: 1.5;
}
</style>

<!-- 白露小贴士 ✨: 提示组件已更新为与用户提供的图片样式一致，添加了警告图标并调整了样式 -->