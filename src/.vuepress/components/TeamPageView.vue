<template>
  <div class="team-page-view">
    <TeamPage />
  </div>
</template>

<script>
import TeamPage from './TeamPage.vue'

export default {
  components: {
    TeamPage
  },
  mounted() {
    // 隐藏主题元素
    this.hideThemeElements();
  },
  methods: {
    hideThemeElements() {
      const elementsToHide = [
        '.navbar',
        '.sidebar',
        '.page-meta',
        '.page-nav',
        '.footer',
        '.sidebar-button'
      ];
      
      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = 'none');
      });
      
      const page = document.querySelector('.page');
      if (page) {
        page.style.padding = '0';
        page.style.margin = '0';
        page.style.background = 'transparent';
      }
      
      const themeContainer = document.querySelector('.theme-container');
      if (themeContainer) {
        themeContainer.style.background = 'transparent';
      }
      
      // 确保全屏
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
    }
  }
}
</script>

<style>
.team-page-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
</style>