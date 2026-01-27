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
    fallback: '请尝试关闭代理工具后重试，或尝试直接访问以下链接下载：',
    retry: '重试',
    latest: '最新版本',
    released: '发布于',
    download: '下载 Windows 版本',
    noAssets: '当前平台暂无可用下载文件',
    source: '下载源:',
    other: '其他文件',
    changelog: '更新日志',
    win10: '适用于 Windows 10 及以上版本 (x64)',
    legacyWin7: 'Windows 旧版(支持 Windows 7)',
    legacyWin32: 'Windows 旧版(x86)',
    linux: '下载 Linux 版本 (amd64)',
    win64: 'Windows (x64) 便携版',
    portable: '.zip',
    setup: '安装包',
    moreDownloads: '更多下载',
    version: '版本',
    size: '大小',
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
      github: 'GitHub',
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
    legacyWin7: 'Windows 7 x64 (Legacy)',
    legacyWin32: '32-bit (Legacy)',
    linux: 'Linux (amd64)',
    win64: 'Windows (x64)',
    portable: 'Portable',
    setup: 'Installer',
    moreDownloads: 'More Downloads',
    version: 'Version',
    size: 'Size',
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

const moreDownloadsRef = ref<HTMLElement | null>(null)
const sourceDropdownRef = ref<HTMLElement | null>(null)
const channelDropdownRef = ref<HTMLElement | null>(null)
const isMoreDownloadsOpen = ref(false)

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
const legacyRelease = ref<any>(null)
const metadata = ref<{ release: string, beta: string, alpha: string } | null>(null)
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')
const selectedDownloadSource = ref('ghfast')
const selectedChannel = ref<string>('release')

const isSourceDropdownOpen = ref(false)
const isChannelDropdownOpen = ref(false)

const toggleChannelDropdown = () => {
  const newState = !isChannelDropdownOpen.value
  isChannelDropdownOpen.value = newState
  if (newState) {
    isSourceDropdownOpen.value = false
    isMoreDownloadsOpen.value = false
  }
}

const toggleSourceDropdown = () => {
  const newState = !isSourceDropdownOpen.value
  isSourceDropdownOpen.value = newState
  if (newState) {
    isChannelDropdownOpen.value = false
    isMoreDownloadsOpen.value = false
  }
}

const toggleMoreDownloads = () => {
  const newState = !isMoreDownloadsOpen.value
  isMoreDownloadsOpen.value = newState
  if (newState) {
    isChannelDropdownOpen.value = false
    isSourceDropdownOpen.value = false
  }
}

// 国际化支持的计算属性定义
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
  
  // 如果有元数据，尝试匹配所选通道的版本
  if (metadata.value) {
    const targetVersion = metadata.value[selectedChannel.value as 'release' | 'beta' | 'alpha']
    if (targetVersion) {
      const match = allReleases.value.find(r => r.tag_name === targetVersion)
      if (match) return match
    }
  }

  // 如果元数据缺失或未找到匹配项的后备逻辑
  if (selectedChannel.value === 'release') {
    return allReleases.value.find((r: any) => !r.prerelease && !r.draft)
  } else {
    // 对于 beta/alpha，如果未找到特定版本，则仅获取最新的一个（包括预发布版本）
    return allReleases.value[0]
  }
})

// 处理发布说明：移除图片，隐藏感谢说明
const processedReleaseNotes = ref('')
const isNotesLoading = ref(false)

watch(currentRelease, async (newRelease) => {
  if (!newRelease?.body) {
    processedReleaseNotes.value = ''
    return
  }
  
  // 推迟繁重处理以允许 UI 更新（如关闭下拉菜单）优先发生
  isNotesLoading.value = true
  
  // 使用 setTimeout 推入下一个 tick/任务
  setTimeout(async () => {
    const body = newRelease.body
    let content = body
    
    // 截断标记 (正则表达式)
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
      // 后备分隔符
      const separators = [
        '---',
        '## what\'s changed',
        '## changes',
        '## 下载链接',
        '**国内下载**',
        '| 平台/打包方式 |'
      ]
      
      // 后备方案使用小写正文进行字符串匹配
      const lowerBody = body.toLowerCase()
      for (const sep of separators) {
        const idx = lowerBody.lastIndexOf(sep)
        if (idx !== -1 && idx > body.length / 2) {
          content = body.substring(0, idx).trim()
          break
        }
      }
    }
    
    // 移除页脚链接
    content = content.replace(/##\s*new contributors[\s\S]*$/, '')
    
    // 移除图片 (HTML 和 Markdown)
    content = content.replace(/<img[^>]*>/g, '')
    content = content.replace(/!\[.*?\]\(.*?\)/g, '')
  
    processedReleaseNotes.value = await marked(content)
    isNotesLoading.value = false
  }, 10)
}, { immediate: true })

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}

const formatSize = (size: number) => {
  return (size / 1024 / 1024).toFixed(1) + ' MB'
}

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

// 解析资源信息
const getAssetInfo = (asset: any) => {
  if (asset.customLabel) {
    return { platform: asset.customLabel, type: t.value.portable, icon: '/icon/Windows7.svg' }
  }

  const name = asset.name.toLowerCase()
  let platform = ''
  let type = ''
  let icon = ''

  if (name.includes('win') || name.endsWith('.exe') || name.endsWith('.msi')) {
    platform = t.value.win64
    icon = '/icon/Windows11.svg'
    if (name.endsWith('.zip')) type = t.value.portable
    else type = t.value.setup
  } else if (name.includes('linux') || name.endsWith('.deb') || name.endsWith('.rpm') || name.endsWith('.appimage') || name.endsWith('.tar.gz')) {
    platform = t.value.linux
    icon = '/icon/Linux.svg'
    const ext = name.split('.').pop()
    type = ext ? `.${ext}` : ''
  }

  return { platform, type, icon }
}

const availableAssets = computed(() => {
  if (!currentRelease.value?.assets) return []
  
  const assets = currentRelease.value.assets.filter((asset: any) => {
    const name = asset.name.toLowerCase()
    
    // 过滤掉非安装程序文件
    if (name.endsWith('.yml') || name.endsWith('.blockmap') || name.endsWith('.json')) return false
    
    // 仅限 x64/amd64
    if (!name.includes('x64') && !name.includes('win_x64') && !name.includes('amd64')) return false

    return true
  })

  // 排序：Setup (.exe) 优先，然后是 Windows zip，然后是 Linux
  return assets.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    
    const isExeA = nameA.endsWith('.exe')
    const isExeB = nameB.endsWith('.exe')
    
    if (isExeA && !isExeB) return -1
    if (!isExeA && isExeB) return 1
    
    return 0
  })
})

const primaryAsset = computed(() => {
  return availableAssets.value.find((a: any) => a.name.toLowerCase().endsWith('.exe')) || availableAssets.value[0]
})

const legacyAssets = computed(() => {
  const win7Data = legacyRelease.value?.assets?.find((a: any) => a.name.includes('x64-dir.zip'))
  const win32Data = legacyRelease.value?.assets?.find((a: any) => a.name.includes('x86-dir.zip'))

  return [
    {
      id: 'legacy-win7',
      name: 'SecRandom-Windows-v1.2.3.2-x64-dir.zip',
      browser_download_url: win7Data?.browser_download_url || 'https://github.com/SECTL/SecRandom/releases/download/v1.2.3.2/SecRandom-Windows-v1.2.3.2-x64-dir.zip',
      size: win7Data?.size || 0,
      customLabel: t.value.legacyWin7,
      version: 'v1.2.3.2',
      isLegacy: true
    },
    {
      id: 'legacy-win32',
      name: 'SecRandom-Windows-v1.2.3.2-x86-dir.zip',
      browser_download_url: win32Data?.browser_download_url || 'https://github.com/SECTL/SecRandom/releases/download/v1.2.3.2/SecRandom-Windows-v1.2.3.2-x86-dir.zip',
      size: win32Data?.size || 0,
      customLabel: t.value.legacyWin32,
      version: 'v1.2.3.2',
      isLegacy: true
    }
  ]
})

const moreAssets = computed(() => {
  let assets = []
  if (!primaryAsset.value) {
    assets = availableAssets.value
  } else {
    assets = availableAssets.value.filter((a: any) => a.name !== primaryAsset.value.name)
  }
  return [...assets, ...legacyAssets.value]
})

const fetchMetadata = async () => {
  try {
    // 从 ghfast 镜像获取元数据
    const response = await fetch('https://ghfast.top/https://raw.githubusercontent.com/SECTL/SecRandom/master/metadata.yaml')
    if (response.ok) {
      const text = await response.text()
      // 对 "latest" 部分进行简单的正则解析
      // 预期格式:
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

const fetchLegacyRelease = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/SECTL/SecRandom/releases/tags/v1.2.3.2')
    if (response.ok) {
      legacyRelease.value = await response.json()
    }
  } catch (e) {
    console.error('Failed to fetch legacy release:', e)
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
  if (moreDownloadsRef.value && !moreDownloadsRef.value.contains(target)) {
    isMoreDownloadsOpen.value = false
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
  fetchLegacyRelease()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="download-page">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1 class="title">{{ t.title }}</h1>
        <p class="subtitle">{{ t.subtitle }}</p>
        
        <div class="download-area">
          <div class="main-actions">
            <div v-if="primaryAsset" class="primary-meta">
              <span class="meta-version">{{ currentRelease?.tag_name }}</span>
              <span class="meta-sep">/</span>
              <span class="meta-size">{{ formatSize(primaryAsset.size) }}</span>
            </div>
            <a 
              v-if="primaryAsset"
              :href="getDownloadUrl(primaryAsset)" 
              class="primary-download-btn"
              target="_blank"
            >
              <span class="btn-text">{{ t.download }}</span>
              <span class="btn-sub">{{ t.win10 }}</span>
            </a>

            <div class="settings-row">
              <!-- Channel Selector -->
              <div class="setting-item" ref="channelDropdownRef">
                <div class="dropdown-trigger" @click.stop="toggleChannelDropdown">
                  {{ channels.find(c => c.id === selectedChannel)?.name }}
                  <span class="arrow">▼</span>
                </div>
                
                <div class="setting-dropdown" v-if="isChannelDropdownOpen">
                  <div 
                    v-for="c in channels" 
                    :key="c.id"
                    class="setting-option"
                    :class="{ active: selectedChannel === c.id }"
                    @click="handleChannelChange(c.id)"
                  >
                    {{ c.name }}
                  </div>
                </div>
              </div>

              <!-- Download Source Selector -->
              <div class="setting-item" ref="sourceDropdownRef">
                <div class="dropdown-trigger" @click.stop="toggleSourceDropdown">
                  {{ downloadSources.find(s => s.id === selectedDownloadSource)?.name }}
                  <span class="arrow">▼</span>
                </div>
                
                <div class="setting-dropdown" v-if="isSourceDropdownOpen">
                  <div 
                    v-for="source in downloadSources" 
                    :key="source.id"
                    class="setting-option"
                    :class="{ active: selectedDownloadSource === source.id }"
                    @click="handleSourceChange(source.id)"
                  >
                    {{ source.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="more-downloads" ref="moreDownloadsRef" v-show="moreAssets.length > 0">
            <button class="more-btn" @click.stop="toggleMoreDownloads">
              {{ t.moreDownloads }} <span class="arrow" :class="{ open: isMoreDownloadsOpen }">▼</span>
            </button>
            
            <div class="dropdown-menu more-menu" v-if="isMoreDownloadsOpen">
              <a 
                v-for="asset in moreAssets" 
                :key="asset.id"
                :href="getDownloadUrl(asset)"
                class="dropdown-item download-item"
                target="_blank"
              >
                <img :src="getAssetInfo(asset).icon" class="item-icon">
                <div class="item-info">
                  <div class="item-name">
                    {{ getAssetInfo(asset).platform }} 
                    <span class="item-type">{{ getAssetInfo(asset).type }}</span>
                  </div>
                  <div class="item-meta">
                    <span>{{ t.version }}: {{ asset.version || currentRelease?.tag_name }}</span>
                    <span class="separator" v-if="asset.size">|</span>
                    <span v-if="asset.size">{{ t.size }}: {{ (asset.size / 1024 / 1024).toFixed(1) }} MB</span>
                  </div>
                </div>
              </a>
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
        <!-- Release Notes (Full Width) -->
        <div class="release-notes card full-width">
          <div class="release-header">
            <h3>{{ t.changelog }}</h3>
            <div class="release-meta">
              <span class="version-tag">{{ currentRelease?.tag_name }}</span>
              <span class="date">{{ t.released }} {{ formatDate(currentRelease?.published_at) }}</span>
            </div>
          </div>
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
  padding: 60px 20px;
  text-align: center;
  position: relative;
}

.banner-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .banner {
    padding: 100px 20px;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 40px;
  color: var(--vp-c-text-2);
}

/* Download Area */
.download-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.main-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.primary-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.meta-sep {
  opacity: 0.4;
  font-size: 0.8em;
}

.primary-download-btn {
  background-color: #4484BC;
  color: white;
  padding: 8px 40px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;
  box-shadow: 0 4px 12px rgba(47, 123, 211, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-text {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.4;
}

.btn-sub {
  font-size: 0.75rem;
  font-weight: normal;
  opacity: 0.9;
  line-height: 1.2;
}

.primary-download-btn:hover {
  background-color: #327CBE;
  color: white !important;
  text-decoration: none;
}

.more-downloads {
  position: relative;
}

.more-btn {
  background: transparent;
  color: var(--vp-c-text-1);
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.9;
}

.more-btn:hover {
  opacity: 1;
  text-decoration: underline;
}

.more-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background: var(--vp-c-bg-elv);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  width: 300px;
  text-align: left;
  z-index: 100;
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
  border: 1px solid var(--vp-c-divider);
}

.download-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background 0.2s;
  border-bottom: 1px solid var(--vp-c-divider);
}

.download-item:last-child {
  border-bottom: none;
}

.download-item:hover {
  background-color: var(--vp-c-bg-soft);
}

.item-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 2px;
}

.item-type {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.item-meta {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.separator {
  margin: 0 4px;
  color: var(--vp-c-divider);
}

/* Settings Row */
.settings-row {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}

.setting-item {
  position: relative;
}

.dropdown-trigger {
  background: var(--vp-c-bg-soft);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: background 0.2s;
  color: var(--vp-c-text-1);
}

.dropdown-trigger:hover {
  background: var(--vp-c-bg-mute);
}

.setting-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  background: var(--vp-c-bg-elv);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  min-width: 120px;
  z-index: 90;
  padding: 4px;
  color: var(--vp-c-text-1);
  text-align: left;
  border: 1px solid var(--vp-c-divider);
}

.setting-option {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
}

.setting-option:hover {
  background: var(--vp-c-bg-soft);
}

.setting-option.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

/* Main Content */
.main-content {
  max-width: 900px;
  margin: -40px auto 40px;
  padding: 0 20px;
  position: relative;
  z-index: 3;
}

.content-grid {
  display: block;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
}

.release-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 15px;
}

.release-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.release-meta {
  display: flex;
  gap: 15px;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.version-tag {
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

/* Loading & Error States */
.loading-state, .error-state {
  text-align: center;
  padding: 60px 0;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--vp-c-brand);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Fallback Options */
.fallback-options {
  margin: 20px 0;
}

.fallback-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.fallback-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  transition: background 0.2s;
}

.fallback-btn:hover {
  background: var(--vp-c-bg-soft);
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
