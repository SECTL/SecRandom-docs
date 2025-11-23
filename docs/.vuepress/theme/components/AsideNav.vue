<script setup lang="ts">
import { computed } from 'vue'
import { VPLink } from 'vuepress-theme-plume/client'
import { useRouteLocale, useRoute } from 'vuepress/client'

interface Locale {
  star: string
  issue: string
  share: string
  copied: string
}

const locales: Record<string, Locale> = {
  '/': { 
    star: '在 GitHub 上 Star', 
    issue: '遇到问题',
    share: '分享此页面',
    copied: '链接已复制！'
  },
}

const lang = useRouteLocale()
const route = useRoute()
const locale = computed(() => locales[lang.value])

const copyPageLink = () => {
  const url = window.location.origin + route.path
  navigator.clipboard.writeText(url)
    .then(() => {
      alert(locale.value.copied)
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}
</script>

<template>
  <div class="aside-nav-wrapper">
    <VPLink class="link" no-icon href="https://github.com/SECTL/SecRandom">
      <span class="vpi-github-star" />
      <span class="link-text">{{ locale.star }}</span>
      <span class="vpi-arrow-right" />
    </VPLink>
    <VPLink class="link" no-icon href="https://github.com/SECTL/SecRandom/issues/new/choose">
      <span class="vpi-github-issue" />
      <span class="link-text">{{ locale.issue }}</span>
      <span class="vpi-arrow-right" />
    </VPLink>
    <a class="link" href="#" @click.prevent="copyPageLink">
      <span class="vpi-share" />
      <span class="link-text">{{ locale.share }}</span>
      <span class="vpi-arrow-right" />
    </a>
  </div>
</template>

<style scoped>
.aside-nav-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin: 16px 16px 0;
  border-top: solid 1px var(--vp-c-divider);
}

.aside-nav-wrapper .link {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: color var(--vp-t-color);
}

.aside-nav-wrapper .link:hover {
  color: var(--vp-c-brand-1);
}

.aside-nav-wrapper .link .link-text {
  flex: 1 2;
  font-size: 12px;
}

.vpi-github-star {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m12 1.5l3.1 6.3l6.9 1l-5 4.8l1.2 6.9l-6.2-3.2l-6.2 3.2L7 13.6L2 8.8l6.9-1z'/%3E%3C/svg%3E");
}

.vpi-github-issue {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' d='M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3'/%3E%3Cpath fill='%23000' d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0'/%3E%3C/svg%3E");
}

.vpi-share {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' d='M13 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-3 1a3 3 0 1 1 .917 2.16l-4.94 2.47a3 3 0 0 1 0 .74l4.94 2.47a3 3 0 1 1-.895 1.789l-4.94-2.47a3 3 0 1 1 0-4.319l4.94-2.47A3 3 0 0 1 10 3M3 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2'/%3E%3C/svg%3E");
}
</style>