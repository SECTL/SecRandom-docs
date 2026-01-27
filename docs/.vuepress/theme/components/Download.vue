<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const isZh = computed(() => !route.path.startsWith('/en/'))

const i18n = {
  zh: {
    title: '下载 SecRandom',
    subtitle: '让课堂点名更高效透明',
    loading: '正在获取最新版本信息...',
    errorTitle: '无法获取版本信息',
    errorDesc: '可能是由于网络原因无法连接到 GitHub API。',
    fallback: '您可以尝试直接访问以下链接下载：',
    retry: '重试',
    latest: '最新版本',
    released: '发布于',
    download: '立即下载',
    noAssets: '当前平台暂无可用下载文件',
    source: '下载源:',
    other: '其他文件',
    changelog: '更新日志',
    win10: '适用于 Windows 10 及以上版本 (x64)',
    linux: '适用于 Debian/Ubuntu 等 (amd64)',
    unsupported: '暂不支持',
    ghfastDesc: '推荐国内用户使用',
    ghproxyDesc: '备用镜像源',
    githubDesc: '原始链接',
    cloud123Desc: '不限速',
    cloud123Btn: '123云盘 (推荐)',
    ghBtn: 'GitHub Releases',
    channel: '版本通道:',
    channels: {
      release: '正式版 (Release)',
      beta: '测试版 (Beta)',
      alpha: '开发版 (Alpha)'
    },
    speeds: {
      veryFast: '极快',
      fast: '快',
      slow: '慢'
    },
    sourceNames: {
      ghfast: 'GitHub 镜像 (ghfast)',
      ghproxy: 'GitHub 镜像 (ghproxy)',
      github: 'GitHub 官方',
      cloud123: '123云盘'
    }
  },
  en: {
    title: 'Download SecRandom',
    subtitle: 'Efficient and transparent classroom roll call',
    loading: 'Fetching latest release...',
    errorTitle: 'Failed to fetch release info',
    errorDesc: 'Unable to connect to GitHub API due to network issues.',
    fallback: 'You can try downloading directly from:',
    retry: 'Retry',
    latest: 'Latest Version',
    released: 'Released on',
    download: 'Download Now',
    noAssets: 'No assets available for this platform',
    source: 'Mirror:',
    other: 'Other Assets',
    changelog: 'Changelog',
    win10: 'For Windows 10 or later (x64)',
    linux: 'For Debian/Ubuntu etc. (amd64)',
    unsupported: 'Not supported',
    ghfastDesc: 'Recommended for China',
    ghproxyDesc: 'Alternative mirror',
    githubDesc: 'Original link',
    cloud123Desc: 'Unlimited speed',
    cloud123Btn: '123 Pan (Recommended)',
    ghBtn: 'GitHub Releases',
    channel: 'Channel:',
    channels: {
      release: 'Release',
      beta: 'Beta',
      alpha: 'Alpha'
    },
    speeds: {
      veryFast: 'Very Fast',
      fast: 'Fast',
      slow: 'Slow'
    },
    sourceNames: {
      ghfast: 'GitHub Mirror (ghfast)',
      ghproxy: 'GitHub Mirror (ghproxy)',
      github: 'GitHub Official',
      cloud123: '123 Pan'
    }
  }
}

const t = computed(() => isZh.value ? i18n.zh : i18n.en)

const deviceDropdownRef = ref<HTMLElement | null>(null)
const sourceDropdownRef = ref<HTMLElement | null>(null)
const channelDropdownRef = ref<HTMLElement | null>(null)

interface DeviceType {
  id: string
  name: string
  icon: string
  description: string
  disabled?: boolean
  disabledReason?: string
}

interface DownloadSource {
  id: string
  name: string
  icon: string
  description: string
  speed: string
  contributor?: {
    name: string
    url: string
  }
}

interface ChannelType {
  id: string
  name: string
  key: 'release' | 'beta' | 'alpha'
}

const allReleases = ref<any[]>([])
const metadata = ref<{ release: string, beta: string, alpha: string } | null>(null)
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')
const selectedPlatform = ref('win10')
const selectedDownloadSource = ref('ghfast')
const selectedChannel = ref<string>('release')

const isDeviceDropdownOpen = ref(false)
const isSourceDropdownOpen = ref(false)
const isChannelDropdownOpen = ref(false)

// Computed definitions for I18n support
const platforms = computed<DeviceType[]>(() => [
  { 
    id: 'win10', 
    name: 'Windows 10/11', 
    icon: '/icon/Windows11.svg', 
    description: t.value.win10
  },
  { 
    id: 'linux', 
    name: 'Linux', 
    icon: '/icon/Linux.svg', 
    description: t.value.linux
  },
  { 
    id: 'win7', 
    name: 'Windows 7', 
    icon: '/icon/Windows7.svg', 
    description: t.value.unsupported,
    disabled: true,
    disabledReason: t.value.unsupported
  },
  { 
    id: 'macos', 
    name: 'macOS', 
    icon: '/icon/macOS.png', 
    description: t.value.unsupported,
    disabled: true,
    disabledReason: t.value.unsupported
  }
])

const downloadSources = computed<DownloadSource[]>(() => [
  { id: 'ghfast', name: t.value.sourceNames.ghfast, icon: '/icon/github.svg', description: t.value.ghfastDesc, speed: t.value.speeds.veryFast },
  { id: 'ghproxy', name: t.value.sourceNames.ghproxy, icon: '/icon/github.svg', description: t.value.ghproxyDesc, speed: t.value.speeds.fast },
  { id: 'github', name: t.value.sourceNames.github, icon: '/icon/github.svg', description: t.value.githubDesc, speed: t.value.speeds.slow },
  { id: 'cloud123', name: t.value.sourceNames.cloud123, icon: '/icon/123pan.png', description: t.value.cloud123Desc, speed: t.value.speeds.fast, contributor: { name: 'lzy98276', url: 'https://github.com/lzy98276' } }
])

const channels = computed<ChannelType[]>(() => [
  { id: 'release', name: t.value.channels.release, key: 'release' },
  { id: 'beta', name: t.value.channels.beta, key: 'beta' },
  { id: 'alpha', name: t.value.channels.alpha, key: 'alpha' }
])

const currentRelease = computed(() => {
  if (!allReleases.value.length) return null
  
  // If we have metadata, try to match the version for the selected channel
  if (metadata.value) {
    const targetVersion = metadata.value[selectedChannel.value as 'release' | 'beta' | 'alpha']
    if (targetVersion) {
      const match = allReleases.value.find(r => r.tag_name === targetVersion)
      if (match) return match
    }
  }

  // Fallback logic if metadata is missing or no match found
  if (selectedChannel.value === 'release') {
    return allReleases.value.find((r: any) => !r.prerelease && !r.draft)
  } else {
    // For beta/alpha, just take the latest one including prereleases if specific version not found
    return allReleases.value[0]
  }
})

// Process release notes: remove images, hide thank you note
const processedReleaseNotes = ref('')
const isNotesLoading = ref(false)

watch(currentRelease, async (newRelease) => {
  if (!newRelease?.body) {
    processedReleaseNotes.value = ''
    return
  }
  
  // Defer heavy processing to allow UI updates (like closing dropdowns) to happen first
  isNotesLoading.value = true
  
  // Use setTimeout to push to next tick/task
  setTimeout(async () => {
    const body = newRelease.body
    let content = body
    
    // Cut-off markers (Regex)
    const cutOffPatterns = [
      /full\s+changelog:/i,
      /💝\s*感谢所有贡献者为\s*SecRandom\s*项目付出的努力！/
    ]
    
    let cutOffIndex = -1
    
    for (const pattern of cutOffPatterns) {
      const match = body.match(pattern)
      if (match && match.index !== undefined) {
        if (cutOffIndex === -1 || match.index < cutOffIndex) {
          cutOffIndex = match.index
        }
      }
    }
    
    if (cutOffIndex !== -1) {
      content = body.substring(0, cutOffIndex).trim()
    } else {
      // Fallback separators
      const separators = [
        '---',
        '## what\'s changed',
        '## changes',
        '## 下载链接',
        '**国内下载**',
        '| 平台/打包方式 |'
      ]
      
      // Fallback uses string matching on lowercase body
      const lowerBody = body.toLowerCase()
      for (const sep of separators) {
        const idx = lowerBody.lastIndexOf(sep)
        if (idx !== -1 && idx > body.length / 2) {
          content = body.substring(0, idx).trim()
          break
        }
      }
    }
    
    // Remove footer links
    content = content.replace(/##\s*new contributors[\s\S]*$/, '')
    
    // Remove images (HTML and Markdown)
    content = content.replace(/<img[^>]*>/g, '')
    content = content.replace(/!\[.*?\]\(.*?\)/g, '')
  
    processedReleaseNotes.value = await marked(content)
    isNotesLoading.value = false
  }, 10)
}, { immediate: true })

const getDownloadUrl = (asset: any) => {
  if (!asset?.browser_download_url) return '#'
  
  const url = asset.browser_download_url
  const source = selectedDownloadSource.value
  
  switch (source) {
    case 'ghfast':
      return `https://ghfast.top/${url}`
    case 'ghproxy':
      return `https://gh-proxy.com/${url}`
    case 'cloud123':
      return 'https://www.123684.com/s/9529jv-U4Fxh'
    default:
      return url
  }
}

const filteredAssets = computed(() => {
  if (!currentRelease.value?.assets) return []
  
  const assets = currentRelease.value.assets.filter((asset: any) => {
    const name = asset.name.toLowerCase()
    
    // Filter out non-installer files
    if (name.endsWith('.yml') || name.endsWith('.blockmap') || name.endsWith('.json')) return false
    
    // Only x64/amd64
    if (!name.includes('x64') && !name.includes('win_x64') && !name.includes('amd64')) return false

    // Platform filtering
    if (selectedPlatform.value === 'win10') {
      return name.endsWith('.exe') || name.endsWith('.msi') || name.endsWith('.zip')
    }
    
    if (selectedPlatform.value === 'linux') {
      return name.endsWith('.deb') || name.endsWith('.rpm') || name.endsWith('.AppImage') || name.endsWith('.tar.gz')
    }
    
    return false
  })

  // Sort: Setup (.exe) first
  return assets.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    
    const isSetupA = nameA.includes('setup') && nameA.endsWith('.exe')
    const isSetupB = nameB.includes('setup') && nameB.endsWith('.exe')
    
    if (isSetupA && !isSetupB) return -1
    if (!isSetupA && isSetupB) return 1
    
    return 0
  })
})

const fetchMetadata = async () => {
  try {
    // Fetch metadata from ghfast mirror
    const response = await fetch('https://ghfast.top/https://raw.githubusercontent.com/SECTL/SecRandom/master/metadata.yaml')
    if (response.ok) {
      const text = await response.text()
      // Simple regex parsing for "latest" section
      // Expected format:
      // latest: 
      //    release: v2.2.6 
      //    beta: v2.2.6 
      //    alpha: v2.2.6 
      
      const releaseMatch = text.match(/release:\s*(v[\d.]+)/)
      const betaMatch = text.match(/beta:\s*(v[\d.]+)/)
      const alphaMatch = text.match(/alpha:\s*(v[\d.]+)/)
      
      if (releaseMatch || betaMatch || alphaMatch) {
        metadata.value = {
          release: releaseMatch ? releaseMatch[1] : '',
          beta: betaMatch ? betaMatch[1] : '',
          alpha: alphaMatch ? alphaMatch[1] : ''
        }
      }
    }
  } catch (e) {
    console.error('Failed to fetch metadata:', e)
  }
}

const fetchReleases = async () => {
  try {
    isLoading.value = true
    const response = await fetch('https://api.github.com/repos/SECTL/SecRandom/releases')
    if (!response.ok) throw new Error('Failed to fetch releases')
    
    allReleases.value = await response.json()
    await fetchMetadata()
    
  } catch (e: any) {
    console.error('Fetch error:', e)
    hasError.value = true
    errorMessage.value = e.message
  } finally {
    isLoading.value = false
  }
}

function handlePlatformChange(id: string) {
  const platform = platforms.value.find(p => p.id === id)
  if (platform?.disabled) return
  
  selectedPlatform.value = id
  isDeviceDropdownOpen.value = false
}

function handleSourceChange(id: string) {
  selectedDownloadSource.value = id
  isSourceDropdownOpen.value = false
}

function handleChannelChange(id: string) {
  selectedChannel.value = id
  isChannelDropdownOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (deviceDropdownRef.value && !deviceDropdownRef.value.contains(target)) {
    isDeviceDropdownOpen.value = false
  }
  if (sourceDropdownRef.value && !sourceDropdownRef.value.contains(target)) {
    isSourceDropdownOpen.value = false
  }
  if (channelDropdownRef.value && !channelDropdownRef.value.contains(target)) {
    isChannelDropdownOpen.value = false
  }
}

onMounted(() => {
  fetchReleases()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="download-page">
    <!-- Top Banner -->
    <div class="banner">
      <div class="banner-content">
        <h1 class="title">{{ t.title }}</h1>
        <p class="subtitle">{{ t.subtitle }}</p>
        
        <div class="platform-selector" ref="deviceDropdownRef">
          <button class="selector-btn" @click.stop="isDeviceDropdownOpen = !isDeviceDropdownOpen">
            <img :src="platforms.find(p => p.id === selectedPlatform)?.icon" class="platform-icon">
            <span class="text">{{ platforms.find(p => p.id === selectedPlatform)?.name }}</span>
            <span class="arrow" :class="{ open: isDeviceDropdownOpen }">▼</span>
          </button>
          
          <div class="dropdown-menu" v-if="isDeviceDropdownOpen">
            <div 
              v-for="p in platforms" 
              :key="p.id"
              class="dropdown-item"
              :class="{ active: selectedPlatform === p.id, disabled: p.disabled }"
              @click="handlePlatformChange(p.id)"
            >
              <img :src="p.icon" class="item-icon">
              <div class="item-info">
                <div class="item-name">
                  {{ p.name }}
                  <span v-if="p.disabled" class="tag-disabled">{{ p.disabledReason }}</span>
                </div>
                <div class="item-desc">{{ p.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t.loading }}</p>
      </div>

      <div v-else-if="hasError" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>{{ t.errorTitle }}</h3>
        <p class="error-desc">{{ t.errorDesc }}</p>
        <p class="error-detail">{{ errorMessage }}</p>
        
        <div class="fallback-options">
          <p>{{ t.fallback }}</p>
          <div class="fallback-buttons">
            <a href="https://www.123684.com/s/9529jv-U4Fxh" target="_blank" class="fallback-btn cloud123">
              <span class="btn-icon-sm">☁️</span> 
              <span class="btn-text">{{ t.cloud123Btn }}</span>
            </a>
            <a href="https://github.com/SECTL/SecRandom/releases" target="_blank" class="fallback-btn github">
              <span class="btn-icon-sm">🐙</span>
              <span class="btn-text">{{ t.ghBtn }}</span>
            </a>
          </div>
        </div>
        
        <button @click="fetchReleases" class="retry-btn">{{ t.retry }}</button>
      </div>

      <div v-else class="content-grid">
        <!-- Left: Release Info -->
        <div class="release-info card">
          <div class="card-header">
            <h2>{{ t.latest }}</h2>
            <div class="version-tag">{{ currentRelease?.tag_name }}</div>
          </div>
          
          <div class="release-meta">
            <span>📅 {{ t.released }} {{ new Date(currentRelease?.published_at).toLocaleDateString() }}</span>
          </div>

          <!-- Channel Selector -->
          <div class="channel-selector" ref="channelDropdownRef">
            <span class="label">{{ t.channel }}</span>
            <div class="dropdown-trigger" @click.stop="isChannelDropdownOpen = !isChannelDropdownOpen">
              {{ channels.find(c => c.id === selectedChannel)?.name }}
              <span class="arrow">▼</span>
            </div>
            
            <div class="source-dropdown" v-if="isChannelDropdownOpen">
              <div 
                v-for="c in channels" 
                :key="c.id"
                class="source-item"
                :class="{ active: selectedChannel === c.id }"
                @click="handleChannelChange(c.id)"
              >
                <div class="source-info">
                  <div class="source-name">{{ c.name }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="download-actions">
            <div class="primary-action">
              <a 
                v-if="filteredAssets[0]"
                :href="getDownloadUrl(filteredAssets[0])" 
                class="download-btn primary"
                target="_blank"
              >
                <span class="btn-icon">⬇️</span>
                <div class="btn-content">
                  <span class="btn-title">{{ t.download }}</span>
                  <span class="btn-subtitle">{{ (filteredAssets[0].size / 1024 / 1024).toFixed(1) }} MB | {{ filteredAssets[0].name }}</span>
                </div>
              </a>
              <div v-else class="no-assets">
                {{ t.noAssets }}
              </div>
            </div>

            <!-- Download Source Selector -->
            <div class="source-selector" ref="sourceDropdownRef">
              <span class="label">{{ t.source }}</span>
              <div class="dropdown-trigger" @click.stop="isSourceDropdownOpen = !isSourceDropdownOpen">
                <img :src="downloadSources.find(s => s.id === selectedDownloadSource)?.icon" class="source-icon-sm">
                {{ downloadSources.find(s => s.id === selectedDownloadSource)?.name }}
                <span class="arrow">▼</span>
              </div>
              
              <div class="source-dropdown" v-if="isSourceDropdownOpen">
                <div 
                  v-for="source in downloadSources" 
                  :key="source.id"
                  class="source-item"
                  :class="{ active: selectedDownloadSource === source.id }"
                  @click="handleSourceChange(source.id)"
                >
                  <img :src="source.icon" class="source-icon">
                  <div class="source-info">
                    <div class="source-name">{{ source.name }}</div>
                    <div class="source-meta">
                      <span class="speed-tag">{{ source.speed }}</span>
                      <span v-if="source.contributor" class="contributor">
                        by <a :href="source.contributor.url" target="_blank" @click.stop>{{ source.contributor.name }}</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Other Assets -->
          <div class="other-assets" v-if="filteredAssets.length > 1">
            <h3>{{ t.other }}</h3>
            <div class="asset-list">
              <a 
                v-for="asset in filteredAssets.slice(1)" 
                :key="asset.id"
                :href="getDownloadUrl(asset)"
                class="asset-link"
                target="_blank"
              >
                <span class="file-icon">📦</span>
                <span class="file-name">{{ asset.name }}</span>
                <span class="file-size">{{ (asset.size / 1024 / 1024).toFixed(1) }} MB</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Release Notes -->
        <div class="release-notes card">
          <h3>{{ t.changelog }}</h3>
          <div class="markdown-body" v-html="processedReleaseNotes"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-page {
  min-height: 80vh;
  background: var(--vp-c-bg-alt);
}

.banner {
  background: url('/images/banner.png') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 60px 20px;
  text-align: center;
}

@media (min-width: 768px) {
  .banner {
    padding: 120px 20px;
  }
}

@media (min-width: 960px) {
  .banner {
    padding: 200px 20px;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.platform-selector {
  position: relative;
  display: inline-block;
  min-width: 200px;
}

.selector-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-content: space-between;
}

.selector-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.platform-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: 300px;
  margin-top: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 100;
  overflow: hidden;
  text-align: left;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--vp-c-text-1);
}

.dropdown-item:hover:not(.disabled) {
  background: var(--vp-c-bg-soft);
}

.dropdown-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.dropdown-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--vp-c-bg-alt);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag-disabled {
  font-size: 10px;
  background: var(--vp-c-text-3);
  color: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
}

.item-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.main-content {
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 20px 40px;
  position: relative;
  z-index: 1;
}

.content-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid var(--vp-c-divider);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.version-tag {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}

.release-meta {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--vp-c-brand-1);
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.download-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 24px;
}

.btn-content {
  display: flex;
  flex-direction: column;
}

.btn-title {
  font-weight: bold;
  font-size: 18px;
  color: white;
}

.btn-subtitle {
  font-size: 12px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.9);
}

.channel-selector {
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 12px;
}

.source-selector {
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: bold;
  color: var(--vp-c-text-1);
  flex: 1;
}

.source-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-top: 8px;
  z-index: 50;
  overflow: hidden;
}

.source-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
}

.source-item:last-child {
  border-bottom: none;
}

.source-item:hover {
  background: var(--vp-c-bg-soft);
}

.source-item.active {
  background: var(--vp-c-brand-soft);
}

.source-icon {
  width: 24px;
  height: 24px;
}

.source-icon-sm {
  width: 16px;
  height: 16px;
}

.source-info {
  flex: 1;
}

.source-name {
  font-weight: bold;
  font-size: 13px;
}

.source-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.speed-tag {
  color: var(--vp-c-brand-1);
}

.asset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.asset-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
}
</style>
