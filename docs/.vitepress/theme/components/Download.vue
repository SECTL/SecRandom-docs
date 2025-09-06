<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

const deviceDropdownRef = ref<HTMLElement | null>(null)
const sourceDropdownRef = ref<HTMLElement | null>(null)

interface DeviceType {
  id: string
  name: string
  icon: string
  description: string
  patterns: string[]
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

const latestRelease = ref<any>(null)
const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const parsedBody = ref('')
const selectedDeviceType = ref('stable')
const selectedDownloadSource = ref('github')
const isDeviceDropdownOpen = ref(false)
const isSourceDropdownOpen = ref(false)

// 设备类型定义（版本类型）
const baseDeviceTypes: DeviceType[] = [
  { 
    id: 'stable', 
    name: '正式版', 
    icon: '🚀', 
    description: '稳定版本，推荐日常使用',
    patterns: ['stable', 'release']
  },
  { 
    id: 'beta', 
    name: '测试版', 
    icon: '🚧', 
    description: '测试版本，包含最新功能',
    patterns: ['beta', 'test', 'preview']
  }
]

// 下载源定义
const downloadSources: DownloadSource[] = [
  { id: 'github', name: 'GitHub 源', icon: '/svg/github.svg', description: '官方发布渠道', speed: '海外较快' },
  { id: 'ghfast', name: 'GitHub 第三方镜像源', icon: '/svg/github.svg', description: 'ghfast.top 加速', speed: '国内较快' },
  { id: 'ghproxy', name: 'GitHub 第三方镜像源', icon: '/svg/github.svg', description: 'gh-proxy.com 加速', speed: '国内较快' },
  { id: 'cloud123', name: '123云盘源', icon: '/123pan.png', description: '云盘下载页面', speed: '不限速', contributor: { name: 'lzy98276', url: 'https://github.com/lzy98276' } },
  { id: 'cloudreve', name: 'Cloudreve分流', icon: '/Cloudreve.png', description: 'Lotus大佬提供的分流', speed: '稳定快速', contributor: { name: 'Lotus', url: 'https://github.com/SummerLotus520/' } }
]

// 动态设备类型
const dynamicDeviceTypes = computed(() => {
  return baseDeviceTypes
})

// 当前显示的版本信息
const currentRelease = computed(() => {
  if (!latestRelease.value) return null
  return latestRelease.value[selectedDeviceType.value]
})

// 当前显示的文件列表
const currentFiles = computed(() => {
  return currentRelease.value?.assets || []
})

// 版本切换处理
function handleVersionChange(version: string) {
  selectedDeviceType.value = version
  isDeviceDropdownOpen.value = false
  console.log(`切换到${version === 'stable' ? '正式版' : '测试版'}`)
}

// 处理发布说明，提取Full Changelog前的内容并以Markdown格式展示
const processedReleaseNotes = computed(() => {
  if (!currentRelease.value?.body) return ''
  
  const body = currentRelease.value.body
  const changelogIndex = body.toLowerCase().indexOf('full changelog:')
  
  let content = body
  if (changelogIndex !== -1) {
    content = body.substring(0, changelogIndex).trim()
  } else {
    // 如果没有找到Full Changelog，尝试查找其他分隔符
    const separators = [
      '---',
      '## 下载链接',
      '**国内下载**',
      '**国内 下载链接**',
      '| 平台/打包方式 |',
      '**SHA256 校验值**'
    ]
    
    for (const separator of separators) {
      const index = body.indexOf(separator)
      if (index !== -1) {
        content = body.substring(0, index).trim()
        break
      }
    }
  }
  
  // 使用marked解析Markdown格式
  return marked(content)
})

// 获取下载链接
function getDownloadUrl(asset: any): string {
  switch (selectedDownloadSource.value) {
    case 'github':
      return asset.browser_download_url
    case 'ghfast':
      return `https://ghfast.top/${asset.browser_download_url.replace('https://github.com/', '')}`
    case 'ghproxy':
      return `https://gh-proxy.com/${asset.browser_download_url.replace('https://github.com/', '')}`
    case 'cloud123':
      return 'https://www.123684.com/s/9529jv-U4Fxh'
    case 'cloudreve':
      return 'https://cloud.lotusshared.cn/s/A9QCA'
    default:
      return asset.browser_download_url
  }
}

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 获取文件图标
function getFileIcon(fileName: string): string {
  const name = fileName.toLowerCase()
  if (name.includes('.exe')) return '🪟'
  if (name.includes('.msi')) return '🪟'
  if (name.includes('stable') || name.includes('release')) return '✅'
  if (name.includes('beta') || name.includes('test')) return '🧪'
  if (name.includes('.zip') || name.includes('.tar.gz')) return '📦'
  return '📄'
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (deviceDropdownRef.value && !deviceDropdownRef.value.contains(target)) {
    isDeviceDropdownOpen.value = false
  }
  if (sourceDropdownRef.value && !sourceDropdownRef.value.contains(target)) {
    isSourceDropdownOpen.value = false
  }
}

onMounted(async () => {
  // 添加全局点击事件监听
  document.addEventListener('click', handleClickOutside)
  
  // 自动获取SecRandom发布信息
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ''
  
  try {
    console.log('正在获取GitHub发布信息...')
    // 调用GitHub API获取SecRandom的所有发布信息
    const response = await fetch('https://api.github.com/repos/SECTL/SecRandom/releases')
    
    if (!response.ok) {
      throw new Error(`GitHub API请求失败: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('获取到的发布信息:', data)
    
    // 按版本类型分组处理发布信息
    const releasesByType = {
      stable: [] as any[],
      beta: [] as any[]
    }
    
    data.forEach((release: any) => {
      const tagName = release.tag_name.toLowerCase()
      
      // 判断版本类型
      const isBeta = tagName.includes('beta') || tagName.includes('test') || 
                    tagName.includes('alpha') || tagName.includes('rc')
      
      const versionType = isBeta ? 'beta' : 'stable'
      
      // 过滤Windows相关文件
      const windowsAssets = release.assets.filter((asset: any) => {
        const name = asset.name.toLowerCase()
        return name.includes('windows') && (name.includes('.zip') || name.includes('.exe') || name.includes('.msi'))
      })
      
      if (windowsAssets.length > 0) {
        releasesByType[versionType].push({
          tag_name: release.tag_name,
          published_at: release.published_at,
          body: release.body || `# ${release.tag_name}\n\n暂无发布说明。`,
          assets: windowsAssets,
          type: versionType
        })
      }
    })
    
    // 按发布时间排序，获取最新版本
    const latestStable = releasesByType.stable
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())[0]
    
    const latestBeta = releasesByType.beta
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())[0]
    
    // 存储分组后的发布信息
    latestRelease.value = {
      stable: latestStable,
      beta: latestBeta,
      all: data
    }
    
    console.log('最新正式版本:', latestStable)
    console.log('最新测试版本:', latestBeta)
    
    // 输出调试信息
    if (releasesByType.stable.length > 0) {
      console.log('正式版本:', releasesByType.stable.map(r => ({ tag: r.tag_name, date: r.published_at })))
    }
    if (releasesByType.beta.length > 0) {
      console.log('测试版本:', releasesByType.beta.map(r => ({ tag: r.tag_name, date: r.published_at })))
    }
    
  } catch (error) {
    console.error('获取发布信息失败:', error)
    hasError.value = true
    errorMessage.value = '加载失败，请稍后重试或检查网络连接'
  } finally {
    isLoading.value = false
  }
})
</script>

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

<template>
  <div class="download-container" @click.stop>
    <div class="download-header">
      <h1>下载 SecRandom</h1>
      <p class="subtitle">选择适合您需求的版本（仅支持Windows）</p>
    </div>

    <!-- 设备类型选择器 -->
    <div class="filter-section">
      <div class="filter-group">
        <label>版本类型：</label>
        <div class="dropdown" :class="{ open: isDeviceDropdownOpen }" ref="deviceDropdownRef">
          <button @click="isDeviceDropdownOpen = !isDeviceDropdownOpen" class="dropdown-button">
            {{ dynamicDeviceTypes.find(t => t.id === selectedDeviceType)?.name }}
            <span class="arrow">▼</span>
          </button>
          <div class="dropdown-menu">
            <div v-for="type in dynamicDeviceTypes" :key="type.id" class="dropdown-item"
              @click="handleVersionChange(type.id)">
              <span class="icon">{{ type.icon }}</span>
              <div class="item-content">
                <div class="item-name">{{ type.name }}</div>
                <div class="item-description">{{ type.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <label>下载源：</label>
        <div class="dropdown" :class="{ open: isSourceDropdownOpen }" ref="sourceDropdownRef">
          <button @click="isSourceDropdownOpen = !isSourceDropdownOpen" class="dropdown-button">
            {{ downloadSources.find(s => s.id === selectedDownloadSource)?.name }}
            <span class="arrow">▼</span>
          </button>
          <div class="dropdown-menu">
            <div v-for="source in downloadSources" :key="source.id" class="dropdown-item"
              @click="selectedDownloadSource = source.id; isSourceDropdownOpen = false">
              <img :src="source.icon" class="source-icon" alt="Icon for {{ source.name }}"> <!-- 添加图标显示 -->
              <div class="item-content">
                <div class="item-name">{{ source.name }}</div>
                <div class="item-description">{{ source.description }} · {{ source.speed }}</div>
                <div v-if="source.contributor" class="contributor">
                  由 <a :href="source.contributor.url" target="_blank">{{ source.contributor.name }}</a> 提供
                  <span v-if="source.id === 'cloudreve'"> · 欢迎进入 <a href="https://qm.qq.com/q/d4Dd9EOvcI"
                      target="_blank">QQ群</a> 了解更多</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在加载下载信息...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="hasError" class="error">
      <p>{{ errorMessage }}</p>
      <button @click="onMounted" class="retry-button">重试</button>

    </div>

    <!-- 文件列表 -->
    <div v-else-if="currentRelease" class="file-list">
      <div class="release-info">
        <h3>{{ currentRelease.tag_name }}</h3>
        <p class="release-date">发布于 {{ new Date(currentRelease.published_at).toLocaleDateString() }}</p>
        <p class="version-type">
          {{ selectedDeviceType === 'stable' ? '正式版本' : '测试版本' }}
        </p>
        <p class="version-description">
          {{ selectedDeviceType === 'stable' ? '稳定可靠，适合日常使用' : '包含最新功能，可能存在不稳定因素' }}
        </p>
      </div>

      <div v-if="currentFiles.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <p class="empty-text">
          暂无{{ selectedDeviceType === 'stable' ? '正式版' : '测试版' }}文件
        </p>
        <p class="empty-subtext">
          请切换版本类型或稍后再试
        </p>
      </div>

      <div v-else class="files">
        <div v-for="file in currentFiles" :key="file.name" class="file-item">
          <div class="file-info">
            <span class="file-icon">{{ getFileIcon(file.name) }}</span>
            <div class="file-details">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
            </div>
          </div>
          <a :href="getDownloadUrl(file)" class="download-button" target="_blank"
            v-if="selectedDownloadSource !== 'cloud123' && selectedDownloadSource !== 'cloudreve'">
            下载
          </a>
          <a :href="getDownloadUrl(file)" class="download-button" target="_blank"
            v-else-if="selectedDownloadSource === 'cloud123'">
            前往下载页面
          </a>
          <a :href="getDownloadUrl(file)" class="download-button" target="_blank"
            v-else-if="selectedDownloadSource === 'cloudreve'">
            前往分流页面
          </a>
        </div>
      </div>

      <div v-if="currentRelease?.body" class="release-notes">
        <div v-html="processedReleaseNotes"></div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">暂无可用版本</p>
      <p class="empty-subtext">请检查网络连接或稍后再试</p>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  padding: 2rem 0rem;
}

.download-header {
  text-align: center;
  margin-bottom: 3rem;
}

.download-header h1 {
  font-size: 2.5rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.filter-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 250px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.7rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.dropdown-button:hover {
  border-color: var(--vp-c-brand-1);
}

.arrow {
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.dropdown.open .arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: none;
}

.dropdown.open .dropdown-menu {
  display: block;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-item:hover {
  background: var(--vp-c-brand-soft);
}

.source-icon {
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
}

.icon {
  font-size: 1.2rem;
}

.item-content {
  flex: 1;
}

.item-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.item-description {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.contributor {
  font-size: 0.75rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--vp-c-text-2);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.empty-subtext {
  font-size: 0.9rem;
  opacity: 0.8;
}

.contributor a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.contributor a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-border);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-danger-1);
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.file-list {
  background: var(--vp-c-bg-soft);
  border-radius: 0.7rem;
  padding: 2.0rem 2.0rem;
  width: 100%;
  box-sizing: border-box;
}

.release-info {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.release-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand-1);
}

.release-date {
  color: var(--vp-c-text-2);
  margin: 0;
}

.version-type {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.version-description {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  font-style: italic;
}

.files {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0.7rem;
  transition: all 0.2s;
}

.file-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-icon {
  font-size: 1.5rem;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.download-button {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 0.7rem;
  transition: background 0.2s;
}

.download-button:hover {
  background: var(--vp-c-brand-2);
}

.release-notes {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-border);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 100%;
}

.release-notes :deep(h1) {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.release-notes :deep(h2) {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem 0;
  color: var(--vp-c-text-1);
}

.release-notes :deep(h3) {
  font-size: 1.25rem;
  margin: 1.25rem 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.release-notes :deep(p) {
  margin-bottom: 0.75rem;
}

.release-notes :deep(ul) {
  margin: 0.5rem 0 1rem 2rem;
}

.release-notes :deep(li) {
  margin-bottom: 0.25rem;
}

.release-notes :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.release-notes :deep(pre) {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .download-container {
    padding: 1.5rem 1rem;
  }
  
  .file-list {
    padding: 1.5rem 1.5rem;
  }
  
  .filter-section {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .filter-group {
    min-width: 100%;
  }
  
  .file-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .download-button {
    width: 100%;
    text-align: center;
  }
  
  .release-notes :deep(h1) {
    font-size: 1.5rem;
  }
  
  .release-notes :deep(h2) {
    font-size: 1.25rem;
  }
  
  .release-notes :deep(h3) {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .download-container {
    padding: 1rem 0.5rem;
  }
  
  .file-list {
    padding: 1rem 1rem;
  }
}
</style>