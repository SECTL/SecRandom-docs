<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouteLocale } from 'vuepress/client'

type DownloadSourceId = 'github.com' | 'ghproxy.sectl.top' | 'gh.llkk.cc' | 'wget.la'

interface DownloadSource {
  id: DownloadSourceId
  description: string
  icon?: string
}

const releases = ref<any[]>([])
const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const selectedDownloadSource = ref<DownloadSourceId>('ghproxy.sectl.top')
const isSourceDropdownOpen = ref(false)
const copiedShaAssetId = ref<number | null>(null)
let copiedShaTimer: number | undefined

const zhDownloadSources: DownloadSource[] = [
  { id: 'github.com', description: 'GitHub 官方源', icon: '/icon/github-dark.png' },
  { id: 'ghproxy.sectl.top', description: 'GitHub 镜像源', icon: '/icon/github-dark.png' },
  { id: 'gh.llkk.cc', description: 'GitHub 镜像源', icon: '/icon/github-dark.png' },
  { id: 'wget.la', description: 'GitHub 镜像源', icon: '/icon/github-dark.png' }
]

const enDownloadSources: DownloadSource[] = [
  { id: 'github.com', description: 'GitHub', icon: '/icon/github-dark.png' }
]

const lang = useRouteLocale()
const isEnglish = computed(() => lang.value === '/en/')

const downloadSources = computed(() => (isEnglish.value ? enDownloadSources : zhDownloadSources))

function isGithubSource(sourceId: DownloadSourceId) {
  return sourceId === 'github.com' || sourceId === 'ghproxy.sectl.top' || sourceId === 'gh.llkk.cc' || sourceId === 'wget.la'
}

async function fetchLatestRelease() {
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ''

  try {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`https://api.github.com/repos/SECTL/SecRandom/releases?per_page=20`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'secrandom/1.0'
      },
      signal: controller.signal
    })

    window.clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('releases 列表为空')
    }

    releases.value = data
  } catch (error) {
    console.error('获取最新版本失败:', error)
    hasError.value = true
    errorMessage.value = '无法获取版本信息，请检查网络连接或稍后重试'
  } finally {
    isLoading.value = false
  }
}

function getDownloadUrl(asset: any): string {
  const baseUrl = asset.browser_download_url
  if (selectedDownloadSource.value === 'github.com') {
    return baseUrl
  }
  return `https://${selectedDownloadSource.value}/${asset.browser_download_url}`
}

function getAssetSha256(asset: any): string {
  const digest = String(asset?.digest || '')
  if (!digest) return '未提供'
  return digest.replace(/^sha256:/i, '')
}

async function copyAssetSha256(asset: any) {
  const sha256 = getAssetSha256(asset)
  if (!sha256 || sha256 === '未提供') return

  const text = `sha256:${sha256}`

  await navigator.clipboard.writeText(text)

  copiedShaAssetId.value = asset.id
  if (copiedShaTimer) {
    window.clearTimeout(copiedShaTimer)
  }
  copiedShaTimer = window.setTimeout(() => {
    copiedShaAssetId.value = null
  }, 2000)
}

const currentRelease = computed(() => {
  return releases.value.length ? releases.value[0] : null
})

// 显示除 sha256.txt 与 Source code 外的所有 assets
const filteredAssets = computed(() => {
  if (!currentRelease.value?.assets) return []
  return currentRelease.value.assets.filter((asset: any) => {
    const name = String(asset.name || '').toLowerCase()
    if (name.includes('sha256')) return false
    if (name.includes('source code')) return false
    return true
  })
})

const currentDownloadSource = computed(() => {
  return (downloadSources.value || []).find(source => source.id === selectedDownloadSource.value) || (downloadSources.value || [])[0]
})

const dateLocale = computed(() => (isEnglish.value ? 'en-US' : 'zh-CN'))

const locales: Record<string, any> = {
  '/': {
    unableFetch: '无法获取版本信息',
    retry: '重新加载',
    fetchingRelease: '正在获取版本信息...',
    downloadSourceLabel: '下载源',
    assetsTitle: '文件列表',
    loadingAssets: '正在加载文件列表...',
    downloadsSuffix: ' 次下载',
    noAssetsTitle: '暂无下载文件',
    noAssetsDesc: '请稍后重试或更换下载源',
    downloadNow: '立即下载',
    viewReleaseHistory: '查看历史版本'
  },
  '/en/': {
    unableFetch: 'Unable to fetch release info',
    retry: 'Retry',
    fetchingRelease: 'Fetching release info...',
    downloadSourceLabel: 'Download Source',
    assetsTitle: 'Files',
    loadingAssets: 'Loading file list...',
    downloadsSuffix: ' downloads',
    noAssetsTitle: 'No files available',
    noAssetsDesc: 'Please try again later or switch the download source',
    downloadNow: 'Download',
    viewReleaseHistory: 'View release history'
  }
}

const locale = computed(() => locales[lang.value] || locales['/'])

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleSourceDropdownBlur = () => setTimeout(() => isSourceDropdownOpen.value = false, 200)

onMounted(() => {
  fetchLatestRelease()
})
</script>

<template>
  <div class="download-container">
    <div v-if="hasError" class="error">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <h3>{{ locale.unableFetch }}</h3>
        <p>{{ errorMessage }}</p>
        <button class="retry-btn" @click="fetchLatestRelease()">{{ locale.retry }}</button>
      </div>
    </div>

    <div class="release-info">
      <!-- 版本信息头部 -->
      <div class="release-header">
          <img src="/logo.png" alt="logo" class="logo">
        <div class="release-title-row">
          <template v-if="isLoading">
            <div class="loading-inline">
              <div class="loading-spinner small"></div>
              <span>{{ locale.fetchingRelease }}</span>
            </div>
          </template>
          <template v-else>
            <Icon name="octicon:tag-16" size="1.5em" />
            <span class="release-name">{{ currentRelease ? currentRelease.name : '—' }}</span>
            <span class="release-date">{{ currentRelease ? new Date(currentRelease.published_at).toLocaleDateString(dateLocale) : '' }}</span>
          </template>
        </div>
      </div>

      <div class="download-selector">
        <div class="selector-controls">
            <div class="dropdown-container">
              <label class="dropdown-label">{{ locale.downloadSourceLabel }}</label>
              <div class="dropdown" :class="{ 'is-open': isSourceDropdownOpen }">
                <button class="dropdown-trigger" @click="isSourceDropdownOpen = !isSourceDropdownOpen"
                  @blur="handleSourceDropdownBlur">
                  <span class="dropdown-content">
                    <template v-if="currentDownloadSource.icon">
                      <img
                        v-if="isGithubSource(currentDownloadSource.id)"
                        src="/icon/github-dark.png"
                        class="source-icon github-light"
                      />
                      <img
                        v-if="isGithubSource(currentDownloadSource.id)"
                        src="/icon/github-light.png"
                        class="source-icon github-dark"
                      />
                      <img
                        v-else
                        :src="currentDownloadSource.icon"
                        class="source-icon"
                      />
                    </template>
                    <span class="source-info">
                      <span class="source-name">{{ currentDownloadSource.id }}</span>
                      <span class="source-desc">{{ currentDownloadSource.description }}</span>
                    </span>
                  </span>
                  <Icon v-if="isSourceDropdownOpen" name="lucide:chevron-up" class="dropdown-arrow" />
                  <Icon v-else name="lucide:chevron-down" class="dropdown-arrow" />
                </button>

                <div class="dropdown-menu">
                  <button v-for="source in downloadSources" :key="source.id" class="dropdown-item" :class="{
                    'is-selected': selectedDownloadSource === source.id
                  }" @click="selectedDownloadSource = source.id; isSourceDropdownOpen = false">
                    <template v-if="source.icon">
                      <img
                        v-if="isGithubSource(source.id)"
                        src="/icon/github-dark.png"
                        class="source-icon github-light"
                      />
                      <img
                        v-if="isGithubSource(source.id)"
                        src="/icon/github-light.png"
                        class="source-icon github-dark"
                      />
                      <img
                        v-else
                        :src="source.icon"
                        class="source-icon"
                      />
                    </template>
                    <span class="source-info">
                      <span class="source-name">{{ source.id }}</span>
                      <span class="source-desc">{{ source.description }}</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- 下载文件列表 -->
      <div class="download-section">
        <h2 style="font-weight: bold;">{{ locale.assetsTitle }}</h2>

        <div v-if="isLoading" class="assets-list">
          <div class="loading-inline">
            <div class="loading-spinner small"></div>
            <span>{{ locale.loadingAssets }}</span>
          </div>
        </div>

        <div v-else-if="filteredAssets && filteredAssets.length > 0" class="assets-list">
          <div v-for="asset in filteredAssets" :key="asset.id" class="asset-item">
            <div class="asset-info">
              <div class="asset-header">
                <Icon name="octicon:package-16" />
                <h4 class="asset-name">{{ asset.name }}</h4>
              </div>
              <div class="asset-meta">
                <span class="download-count">{{ asset.download_count.toLocaleString() }}{{ locale.downloadsSuffix }}</span>
                  <span class="asset-size">{{ formatFileSize(asset.size) }}</span>
                  <span class="asset-sha-wrapper">
                    <span class="asset-sha" :title="`${getAssetSha256(asset)}`">sha256:{{ getAssetSha256(asset) }}</span>
                    <button type="button" class="sha-copy-button" @click="copyAssetSha256(asset)">
                      <Icon v-if="copiedShaAssetId === asset.id" name="octicon:check-16" color="#1a7f37" />
                      <Icon v-else name="octicon:copy-16" />
                    </button>
                  </span>
              </div>
            </div>

            <div class="download-action">
              <a :href="getDownloadUrl(asset)" class="download-btn primary-btn" target="_blank"
                rel="noopener noreferrer">
                <Icon name="lucide:download" />
                <span class="btn-text">{{ locale.downloadNow }}</span>
              </a>
            </div>
          </div>
        </div>

        <div v-else class="no-assets">
            <div class="no-assets-content">
              <h4>{{ locale.noAssetsTitle }}</h4>
              <p>{{ locale.noAssetsDesc }}</p>
            </div>
        </div>

        <div class="view-release-history">
          <a href="https://github.com/SECTL/SecRandom/releases" target="_blank" rel="noopener noreferrer">
            {{ locale.viewReleaseHistory }}
          </a>
        </div>
      </div>
    </div>
    <Content class="vp-doc plume-content" vp-content />
  </div>
</template>

<style scoped>
.download-container {
  max-width: 1100px;
  margin: 36px auto;
  padding: 12px;
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

/* 加载状态 */
.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-spinner.small {
  width: 18px;
  height: 18px;
  border-width: 2px;
  margin-bottom: 0;
}

.loading-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-2);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p {
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 错误状态 */
.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.error-content p {
  color: var(--vp-c-text-2);
  margin: 0;
}

.error-icon {
  font-size: 3rem;
  color: var(--vp-c-danger-1);
}

.error-content h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.retry-btn {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background: var(--vp-c-brand-2);
}

/* 版本信息头部 */
.release-header {
  text-align: center;
}

.logo {
  width: 180px;
  height: 180px;
  display: block;
  margin: 0 auto;
}

.release-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 36px auto;
}

.release-name {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.release-date {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.875rem;
  background: #83d0da50;
  color: var(--vp-c-text-1);
}

/* 下载选择器 */
.download-selector {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
}

.selector-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.dropdown-container {
  position: relative;
}

.dropdown-label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.dropdown {
  position: relative;
}

.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-trigger:hover,
.dropdown.is-open .dropdown-trigger {
  border-color: var(--vp-c-brand-1);
}

.dropdown.is-open .dropdown-trigger {
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.dropdown-content {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.source-icon {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
}

[data-theme="dark"] img:where(.github-light, .light) {
  display: none;
}

[data-theme="light"] img:where(.github-dark, .dark) {
  display: none;
}

.source-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.source-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.source-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.2;
}

.dropdown-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 320px;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  z-index: 50;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.2s ease;
}

.dropdown.is-open .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 12px;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--vp-c-default-soft);
}

.dropdown-item.is-selected {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* 下载文件列表 */
.download-section {
  margin-bottom: 24px;
}

.assets-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
}

.asset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.asset-item:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-2);
}

.asset-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.asset-header {
  display: flex;
  align-items: center;
  gap: 4px;
}

.asset-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.asset-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.download-count,
.asset-size {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.asset-sha-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 1 auto;
  min-width: 0;
}

.asset-sha {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  font-family: "Monaspace Neon", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sha-copy-button:hover {
  color: var(--vp-c-brand-1);
}

.download-action {
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex-shrink: 0;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 8px 16px;
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white);
  text-decoration: none;
  border-radius: 10px;
  box-shadow: var(--vp-shadow-2);
  transition: all 0.2s ease;
}

.download-btn:hover {
  background: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-3);
  color: var(--vp-c-white);
}

.btn-text {
  font-size: 0.875rem;
  font-weight: bold;
}

/* 无文件状态 */
.no-assets {
  padding: 40px 20px;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-border);
  border-radius: 12px;
  text-align: center;
}

.no-assets-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.no-assets-content h4 {
  margin: 0;
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.view-release-history {
  margin-top: 16px;
  text-align: center;
}

.view-release-history a:hover {
  color: var(--vp-c-brand-1);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .download-container {
    padding: 16px;
  }

  .release-header {
    padding: 20px;
  }

  .release-name {
    font-size: 1.25rem;
  }

  .release-title-row {
    gap: 4px;
  }

  .download-selector {
    padding: 20px;
  }

  .selector-controls {
    grid-template-columns: 1fr;
  }

  .asset-item {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .asset-header {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .asset-meta {
    flex-wrap: wrap;
    gap: 4px;
  }

  .asset-sha-wrapper {
    max-width: 100%;
  }

  .download-action {
    margin-left: 0;
  }

  .download-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>