<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouteLocale } from 'vuepress/client'

type DownloadSourceId = 'github.com' | 'ghproxy.sectl.top' | 'wget.la'
type ChannelId = 'stable' | 'beta' | 'alpha'

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
const isAssetDropdownOpen = ref(false)
const selectedChannel = ref<ChannelId>('stable')

const zhDownloadSources: DownloadSource[] = [
  { id: 'github.com', description: 'GitHub 官方源', icon: '/icon/github-dark.png' },
  { id: 'ghproxy.sectl.top', description: 'GitHub 镜像源', icon: '/icon/github-dark.png' },
  { id: 'wget.la', description: 'GitHub 镜像源', icon: '/icon/github-dark.png' }
]

const enDownloadSources: DownloadSource[] = [
  { id: 'github.com', description: 'GitHub', icon: '/icon/github-dark.png' }
]

const lang = useRouteLocale()
const isEnglish = computed(() => lang.value === '/en/')

const downloadSources = computed(() => (isEnglish.value ? enDownloadSources : zhDownloadSources))

function isGithubSource(sourceId: DownloadSourceId) {
  return sourceId === 'github.com' || sourceId === 'ghproxy.sectl.top' || sourceId === 'wget.la'
}

function detectOS(): 'windows' | 'macos' | 'linux' | 'unknown' {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
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

function detectChannel(tagName: string): ChannelId {
  const lower = tagName.toLowerCase()
  if (lower.includes('alpha')) return 'alpha'
  if (lower.includes('beta')) return 'beta'
  return 'stable'
}

const channelReleases = computed(() => {
  return releases.value.filter((r: any) => detectChannel(r.tag_name) === selectedChannel.value)
})

const currentRelease = computed(() => {
  return channelReleases.value.length ? channelReleases.value[0] : null
})

// Filtered assets: exclude sha256 and source code
const filteredAssets = computed(() => {
  if (!currentRelease.value?.assets) return []
  return currentRelease.value.assets.filter((asset: any) => {
    const name = String(asset.name || '').toLowerCase()
    if (name.includes('sha256')) return false
    if (name.includes('source code')) return false
    return true
  })
})

const recommendedAsset = computed(() => {
  const assets = filteredAssets.value
  if (!assets.length) return null

  const os = detectOS()
  const findMatch = (keywords: string[]) =>
    assets.find((a: any) => {
      const n = String(a.name || '').toLowerCase()
      return keywords.some(k => n.includes(k))
    })

  if (os === 'windows') return findMatch(['.exe', '.msi']) || assets[0]
  if (os === 'macos') return findMatch(['.dmg', '.pkg']) || assets[0]
  if (os === 'linux') return findMatch(['.deb', '.rpm', '.appimage']) || assets[0]
  return assets[0]
})

const otherAssets = computed(() => {
  if (!recommendedAsset.value) return filteredAssets.value
  return filteredAssets.value.filter((a: any) => a.id !== recommendedAsset.value!.id)
})

function getFileIcon(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.includes('.exe') || lower.includes('.msi')) return 'logos:microsoft-windows'
  if (lower.includes('.dmg') || lower.includes('.pkg')) return 'logos:apple'
  if (lower.includes('.deb') || lower.includes('.rpm') || lower.includes('.appimage')) return 'logos:linux-tux'
  if (lower.includes('.apk')) return 'logos:android-icon'
  return 'octicon:package-16'
}

function getFileArch(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.includes('x64') || lower.includes('x86_64') || lower.includes('amd64')) return 'x64'
  if (lower.includes('arm64') || lower.includes('aarch64')) return 'arm64'
  if (lower.includes('x86') || lower.includes('i386') || lower.includes('i686')) return 'x86'
  return ''
}

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
    noAssetsTitle: '暂无下载文件',
    noAssetsDesc: '请稍后重试或更换下载源',
    downloadNow: '立即下载',
    heroTitle: 'SecRandom',
    heroSubtitle: '一个易用的点名/抽奖软件，专为教育场景设计，让课堂点名更高效透明！',
    changelogTitle: '更新日志',
    channelStable: '正式版',
    channelBeta: 'Beta',
    channelAlpha: 'Alpha',
    historyDownload: '历史版本下载',
    versionLabel: '版本通道'
  },
  '/en/': {
    unableFetch: 'Unable to fetch release info',
    retry: 'Retry',
    fetchingRelease: 'Fetching release info...',
    downloadSourceLabel: 'Download Source',
    noAssetsTitle: 'No files available',
    noAssetsDesc: 'Please try again later or switch the download source',
    downloadNow: 'Download',
    heroTitle: 'SecRandom',
    heroSubtitle: 'An easy-to-use roll call/lottery tool designed for education, making classroom attendance more efficient and transparent!',
    changelogTitle: 'Changelog',
    channelStable: 'Stable',
    channelBeta: 'Beta',
    channelAlpha: 'Alpha',
    historyDownload: 'Release History',
    versionLabel: 'Channel'
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

function renderMarkdown(text: string): string {
  if (!text) return '—'

  // Remove images (markdown syntax and HTML img tags)
  let html = text
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/<img\s[^>]*\/?>/gi, '')

  // Escape HTML
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Tables - process before other inline formatting
  html = html.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/gm, (match, headerRow, separatorRow, bodyRows) => {
    const parseCells = (row: string) =>
      row.split('|').filter((cell: string) => cell.trim() !== '').map((cell: string) => cell.trim())

    const headers = parseCells(headerRow)
    const rows = bodyRows.trim().split('\n').map((row: string) => parseCells(row))

    let table = '<table><thead><tr>'
    headers.forEach((h: string) => { table += `<th>${h}</th>` })
    table += '</tr></thead><tbody>'
    rows.forEach((cells: string[]) => {
      table += '<tr>'
      cells.forEach((c: string) => { table += `<td>${c}</td>` })
      table += '</tr>'
    })
    table += '</tbody></table>'
    return table
  })

  // Process block-level elements first
  html = html
    // Horizontal rules (---, ***, ___)
    .replace(/^[-*_]{3,}\s*$/gm, '<hr>')
    // Blockquotes (> text) - match &gt; since HTML is already escaped
    .replace(/^&gt;\s?(.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^&gt;\s*$/gm, '<blockquote><br></blockquote>')
    // Merge consecutive blockquotes
    .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
    // Headers
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Unordered lists
    .replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Split into paragraphs by double newlines
  const paragraphs = html.split(/\n\n+/)
  html = paragraphs.map(para => {
    const trimmed = para.trim()
    if (!trimmed) return ''
    // Don't wrap if already a block element
    if (/^<(h[1-6]|ul|ol|li|blockquote|table|thead|tbody|tr|th|td|hr|div)/.test(trimmed)) {
      return trimmed
    }
    // Replace single newlines with <br> and wrap in <p>
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
  }).join('')

  // Inline formatting (applied after paragraph wrapping)
  html = html
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  return html
}

// Close dropdown when clicking outside
function closeDropdowns(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.asset-dropdown-wrapper')) {
    isAssetDropdownOpen.value = false
  }
  if (!target.closest('.source-dropdown')) {
    isSourceDropdownOpen.value = false
  }
}

// Reset channel on channel switch
watch(selectedChannel, () => {
  // currentRelease is computed from channelReleases, so it auto-updates
})

onMounted(() => {
  fetchLatestRelease()
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <div class="download-container">
    <!-- Error State -->
    <div v-if="hasError" class="error">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <h3>{{ locale.unableFetch }}</h3>
        <p>{{ errorMessage }}</p>
        <button class="retry-btn" @click="fetchLatestRelease()">{{ locale.retry }}</button>
      </div>
    </div>

    <template v-else>
      <!-- Section A: Hero -->
      <section class="hero-section">
        <img src="/logo.png" alt="logo" class="logo">
        <h1 class="hero-title">{{ locale.heroTitle }}</h1>
        <p class="hero-subtitle">{{ locale.heroSubtitle }}</p>
      </section>

      <!-- Section B: Split Download Button -->
      <section class="download-btn-section">
        <div v-if="isLoading" class="loading-inline centered">
          <div class="loading-spinner small"></div>
          <span>{{ locale.fetchingRelease }}</span>
        </div>

        <template v-else-if="recommendedAsset">
          <div class="split-download-btn">
            <a
              :href="getDownloadUrl(recommendedAsset)"
              class="main-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="lucide:download" />
              <span>{{ locale.downloadNow }}</span>
            </a>
            <div class="asset-dropdown-wrapper">
              <button
                class="dropdown-trigger"
                @mousedown.prevent="isAssetDropdownOpen = !isAssetDropdownOpen"
              >
                <Icon name="lucide:chevron-down" />
              </button>
              <div
                class="dropdown-menu asset-dropdown-menu"
                :class="{ 'is-open': isAssetDropdownOpen }"
                @mousedown.prevent
              >
                <a
                  v-for="asset in otherAssets"
                  :key="asset.id"
                  :href="getDownloadUrl(asset)"
                  class="dropdown-item asset-dropdown-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="isAssetDropdownOpen = false"
                >
                  <Icon :name="getFileIcon(asset.name)" class="asset-icon" />
                  <span class="asset-item-info">
                    <span class="asset-item-name">{{ asset.name }}</span>
                    <span class="asset-item-meta">
                      <span v-if="getFileArch(asset.name)" class="asset-item-arch">{{ getFileArch(asset.name) }}</span>
                      <span class="asset-item-size">{{ formatFileSize(asset.size) }}</span>
                    </span>
                  </span>
                </a>
                <div v-if="!otherAssets.length" class="dropdown-item empty">
                  <span>{{ locale.noAssetsTitle }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="download-meta">
            <span class="meta-tag" v-if="currentRelease">
              <Icon name="octicon:tag-16" size="0.9em" />
              {{ currentRelease.tag_name }}
            </span>
            <span class="meta-size">{{ formatFileSize(recommendedAsset.size) }}</span>
          </div>
        </template>
      </section>

      <!-- Section C: Options Row -->
      <section class="options-row">
        <div class="option-group">
          <label class="option-label">{{ locale.downloadSourceLabel }}</label>
          <div class="dropdown source-dropdown" :class="{ 'is-open': isSourceDropdownOpen }">
            <button class="source-trigger" @mousedown.prevent="isSourceDropdownOpen = !isSourceDropdownOpen">
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
                <span class="source-name">{{ currentDownloadSource.id }}</span>
              </span>
              <Icon v-if="isSourceDropdownOpen" name="lucide:chevron-up" class="dropdown-arrow" />
              <Icon v-else name="lucide:chevron-down" class="dropdown-arrow" />
            </button>

            <div class="dropdown-menu" @mousedown.prevent>
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

        <div class="option-group">
          <label class="option-label">{{ locale.versionLabel }}</label>
          <div class="channel-tabs">
            <button
              class="channel-tab"
              :class="{ active: selectedChannel === 'stable' }"
              @click="selectedChannel = 'stable'"
            >{{ locale.channelStable }}</button>
            <button
              class="channel-tab"
              :class="{ active: selectedChannel === 'beta' }"
              @click="selectedChannel = 'beta'"
            >{{ locale.channelBeta }}</button>
            <button
              class="channel-tab"
              :class="{ active: selectedChannel === 'alpha' }"
              @click="selectedChannel = 'alpha'"
            >{{ locale.channelAlpha }}</button>
          </div>
        </div>
      </section>

      <!-- Section D: History Download -->
      <div class="history-link">
        <a href="https://stk.sectl.cn/SecRandom" target="_blank" rel="noopener noreferrer">
          {{ locale.historyDownload }}
        </a>
      </div>

      <!-- Section E: Changelog -->
      <section class="changelog-section" v-if="currentRelease">
        <div class="section-header">
          <h2>{{ locale.changelogTitle }}</h2>
          <span class="version-badge">{{ currentRelease.tag_name }}</span>
        </div>
        <div class="changelog-body markdown-body" v-html="renderMarkdown(currentRelease.body)"></div>
      </section>

      <!-- No assets state -->
      <div v-if="!isLoading && !filteredAssets.length" class="no-assets">
        <div class="no-assets-content">
          <h4>{{ locale.noAssetsTitle }}</h4>
          <p>{{ locale.noAssetsDesc }}</p>
        </div>
      </div>
    </template>

    <Content class="vp-doc plume-content" vp-content />
  </div>
</template>

<style scoped>
.download-container {
  max-width: 800px;
  margin: 36px auto;
  padding: 12px;
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

/* Loading */
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

.loading-inline.centered {
  justify-content: center;
  padding: 20px 0;
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

/* Error */
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

/* Section A: Hero */
.hero-section {
  text-align: center;
  padding: 20px 0 32px;
}

.logo {
  width: 180px;
  height: 180px;
  display: block;
  margin: 0 auto;
}

.hero-title {
  margin: 24px 0 8px;
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Section B: Split Download Button */
.download-btn-section {
  text-align: center;
  padding: 8px 0 24px;
}

.split-download-btn {
  display: inline-flex;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.split-download-btn .main-btn {
  padding: 14px 32px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px 0 0 12px;
  transition: background 0.2s;
}

.split-download-btn .main-btn:hover {
  background: var(--vp-c-brand-2);
  color: white;
}

.asset-dropdown-wrapper {
  position: relative;
  display: flex;
}

.split-download-btn .dropdown-trigger {
  padding: 14px 16px;
  background: var(--vp-c-brand-2);
  color: white;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
}

.split-download-btn .dropdown-trigger:hover {
  background: var(--vp-c-brand-1);
}

.asset-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.asset-item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.asset-item-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.asset-item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.asset-item-arch {
  padding: 1px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.asset-item-size {
  color: var(--vp-c-text-3);
}

.download-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 20px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.85rem;
}

.meta-size {
  color: var(--vp-c-text-3);
}

/* Section C: Options Row */
.options-row {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  padding: 8px 0 16px;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

/* Source dropdown (reused pattern) */
.source-dropdown {
  position: relative;
}

.source-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.source-trigger:hover,
.source-dropdown.is-open .source-trigger {
  border-color: var(--vp-c-brand-1);
}

.source-dropdown.is-open .source-trigger {
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.dropdown-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.source-icon {
  width: 20px;
  height: 20px;
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
  line-height: 1.4;
}

.source-desc {
  font-size: 0.7rem;
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
  min-width: 100%;
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

.source-dropdown.is-open .dropdown-menu {
  opacity: 1;
  transform: translateY(4px);
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
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: var(--vp-c-default-soft);
}

.dropdown-item.is-selected {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* Asset Dropdown - must come after .dropdown-menu to override min-width */
.asset-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 280px;
  max-width: 420px;
  max-height: 320px;
  overflow-x: hidden;
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
  box-sizing: border-box;
}

.asset-dropdown-menu.is-open {
  opacity: 1;
  transform: translateY(4px);
  pointer-events: auto;
}

.asset-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.15s;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.asset-dropdown-item:hover {
  background-color: var(--vp-c-default-soft);
}

.asset-dropdown-item.empty {
  color: var(--vp-c-text-3);
  justify-content: center;
  cursor: default;
}

/* Channel Tabs */
.channel-tabs {
  display: flex;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
  border: 1px solid var(--vp-c-border);
}

.channel-tab {
  padding: 6px 14px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  font-weight: 500;
}

.channel-tab:hover {
  color: var(--vp-c-text-1);
}

.channel-tab.active {
  background: var(--vp-c-brand-1);
  color: white;
}

/* Section D: History Link */
.history-link {
  display: block;
  text-align: center;
  margin: 16px 0;
}

.history-link a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.history-link a:hover {
  color: var(--vp-c-brand-1);
}

/* Section E: Changelog */
.changelog-section {
  margin: 24px 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.section-header h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.version-badge {
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.changelog-body {
  padding: 12px 16px;
}

.markdown-body {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  word-break: break-word;
}

.markdown-body :deep(h2) {
  margin: 1.2em 0 0.6em;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.3em;
}

.markdown-body :deep(h3) {
  margin: 1em 0 0.5em;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(h4) {
  margin: 0.8em 0 0.4em;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(p) {
  margin: 0.25em 0;
  line-height: 1.5;
}

.markdown-body :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(em) {
  font-style: italic;
}

.markdown-body :deep(code) {
  padding: 2px 6px;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  font-family: "Monaspace Neon", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 0.85em;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(ul) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-body :deep(li) {
  margin: 0.3em 0;
  list-style-type: disc;
}

.markdown-body :deep(li::marker) {
  color: var(--vp-c-brand-1);
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid var(--vp-c-divider);
  margin: 1.5em 0;
}

.markdown-body :deep(blockquote) {
  margin: 0.8em 0;
  padding: 0.6em 1em;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
  border-radius: 0 8px 8px 0;
  color: var(--vp-c-text-2);
}

.markdown-body :deep(blockquote p) {
  margin: 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.8em 0;
  font-size: 0.875rem;
  overflow-x: auto;
  display: block;
}

.markdown-body :deep(thead) {
  background: var(--vp-c-bg-mute);
}

.markdown-body :deep(th) {
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.markdown-body :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.markdown-body :deep(tbody tr:hover) {
  background: var(--vp-c-bg-soft);
}

/* No assets */
.no-assets {
  padding: 40px 20px;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-border);
  border-radius: 12px;
  text-align: center;
  margin: 24px 0;
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

.no-assets-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

/* Responsive */
@media (max-width: 640px) {
  .download-container {
    padding: 16px;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .split-download-btn {
    width: 100%;
  }

  .split-download-btn .main-btn {
    flex: 1;
    justify-content: center;
    padding: 14px 20px;
    font-size: 1rem;
  }

  .asset-dropdown-menu {
    min-width: 260px;
    right: -60px;
  }

  .options-row {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .option-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    width: 100%;
    max-width: 300px;
  }

  .channel-tabs {
    width: 100%;
  }

  .channel-tab {
    flex: 1;
    text-align: center;
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
