---
layout: doc
---

# 📋 版本历史

<ArticleMetadata />

> 🔄 **追踪SecRandom的每一次进步**
> 
> 这里记录了SecRandom从诞生至今的所有版本更新，包括新功能、问题修复和性能优化。版本信息自动从GitHub获取，确保内容的实时性和准确性。

<div id="loading-status" class="loading-status">
  <div class="loading-spinner"></div>
  <p>正在从GitHub获取版本信息...</p>
  <p class="loading-timer">已等待: <span id="loading-time">0</span> 秒</p>
</div>

<div id="github-releases" class="github-releases" style="display: none;">
  <!-- 版本信息将通过JavaScript动态插入 -->
</div>

<div id="error-status" class="error-status" style="display: none;">
  <p>获取版本信息失败，请稍后再试或检查网络连接。</p>
  <button onclick="fetchGitHubReleases()">重试</button>
</div>

<div id="refresh-container" class="refresh-container" style="display: none;">
  <button onclick="refreshGitHubReleases()" class="refresh-button">
    <span class="refresh-icon">🔄</span> 刷新版本信息
  </button>
</div>

<script>
/**
 * 全局状态管理
 */
const ChangelogState = {
  loadingTimer: null,
  isInitialized: false,
  retryCount: 0,
  maxRetries: 3
}

/**
 * DOM元素缓存
 */
const Elements = {
  loadingStatus: null,
  githubReleases: null,
  errorStatus: null,
  refreshContainer: null,
  loadingTime: null,
  refreshButton: null,
  refreshIcon: null
}

/**
 * 初始化DOM元素引用
 */
function initializeElements() {
  Elements.loadingStatus = document.getElementById('loading-status')
  Elements.githubReleases = document.getElementById('github-releases')
  Elements.errorStatus = document.getElementById('error-status')
  Elements.refreshContainer = document.getElementById('refresh-container')
  Elements.loadingTime = document.getElementById('loading-time')
  Elements.refreshButton = document.querySelector('.refresh-button')
  Elements.refreshIcon = document.querySelector('.refresh-icon')
  
  // 验证关键元素是否存在
  if (!Elements.loadingStatus || !Elements.githubReleases || !Elements.errorStatus) {
    console.error('关键DOM元素缺失，页面可能无法正常工作')
    return false
  }
  
  return true
}

/**
 * 获取GitHub Releases数据 - 修复DOM元素问题
 */
async function fetchGitHubReleases() {
  console.log('🚀 开始获取GitHub Releases数据...')
  
  // 等待DOM完全加载
  await new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve)
    } else {
      resolve()
    }
  })
  
  try {
    // 查找DOM元素，支持VitePress环境
    const loadingEl = document.getElementById('loading-status') || 
                     document.querySelector('.loading-status') ||
                     document.querySelector('[id="loading-status"]')
    
    const releasesEl = document.getElementById('github-releases') || 
                       document.querySelector('.github-releases') ||
                       document.querySelector('[id="github-releases"]')
    
    const errorEl = document.getElementById('error-status') || 
                    document.querySelector('.error-status') ||
                    document.querySelector('[id="error-status"]')
    
    // 创建缺失的元素
    const container = document.querySelector('.vp-doc') || document.body
    
    if (!loadingEl) {
      const loadingDiv = document.createElement('div')
      loadingDiv.id = 'loading-status'
      loadingDiv.className = 'loading-status'
      loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>正在从GitHub获取版本信息...</p>
        <p class="loading-timer">已等待: <span id="loading-time">0</span> 秒</p>
      `
      container.appendChild(loadingDiv)
    }
    
    if (!releasesEl) {
      const releasesDiv = document.createElement('div')
      releasesDiv.id = 'github-releases'
      releasesDiv.className = 'github-releases'
      container.appendChild(releasesDiv)
    }
    
    if (!errorEl) {
      const errorDiv = document.createElement('div')
      errorDiv.id = 'error-status'
      errorDiv.className = 'error-status'
      errorDiv.style.display = 'none'
      errorDiv.innerHTML = `
        <p>获取版本信息失败，请稍后再试或检查网络连接。</p>
        <button onclick="fetchGitHubReleases()">重试</button>
      `
      container.appendChild(errorDiv)
    }
    
    // 重新获取元素引用
    const finalLoadingEl = document.getElementById('loading-status')
    const finalReleasesEl = document.getElementById('github-releases')
    const finalErrorEl = document.getElementById('error-status')
    
    // 显示加载状态
    if (finalLoadingEl) finalLoadingEl.style.display = 'block'
    if (finalReleasesEl) finalReleasesEl.style.display = 'none'
    if (finalErrorEl) finalErrorEl.style.display = 'none'
    
    // 启动计时器
    startLoadingTimer()
    
    // 添加更短的超时控制（10秒）
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      console.warn('⏰ 请求超时（10秒），中止请求')
    }, 10000)
    
    // 发起请求 - 使用更简单的fetch
    console.log('🌐 正在请求GitHub API...')
    const response = await fetch('https://api.github.com/repos/SECTL/SecRandom/releases', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SecRandom-Changelog'
      }
    })
    
    clearTimeout(timeoutId)
    
    console.log('📡 响应状态:', response.status, response.statusText)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const releases = await response.json()
    console.log('✅ 成功获取', releases.length, '个版本')
    
    // 立即显示版本信息
    if (releases.length === 0) {
      releasesEl.innerHTML = '<div class="empty-releases"><p>暂无版本信息</p></div>'
    } else {
      const releasesHTML = generateSimpleReleasesHTML(releases)
      releasesEl.innerHTML = releasesHTML
    }
    
    loadingEl.style.display = 'none'
    releasesEl.style.display = 'block'
    
    // 显示刷新按钮
    const refreshBtn = document.getElementById('refresh-container') || 
                      document.querySelector('.refresh-container')
    if (refreshBtn) {
      refreshBtn.style.display = 'block'
    }
    
  } catch (error) {
    console.error('❌ 请求失败:', error)
    
    let errorMessage = '获取版本信息失败'
    
    if (error.name === 'AbortError') {
      errorMessage = '请求超时，请检查网络连接'
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = '网络连接失败，请检查网络设置'
    } else if (error.message.includes('HTTP 403')) {
      errorMessage = 'API访问受限'
    } else if (error.message.includes('HTTP 404')) {
      errorMessage = '仓库不存在'
    } else {
      errorMessage = error.message || '未知错误'
    }
    
    // 显示错误
    const loadingEl = document.getElementById('loading-status') || 
                     document.querySelector('.loading-status')
    const errorEl = document.getElementById('error-status') || 
                   document.querySelector('.error-status')
    
    if (loadingEl) loadingEl.style.display = 'none'
    if (errorEl) {
      errorEl.style.display = 'block'
      const p = errorEl.querySelector('p')
      if (p) p.textContent = errorMessage
    }
  } finally {
    stopLoadingTimer()
  }
}

/**
 * 显示加载状态
 */
function showLoadingState() {
  if (!Elements.loadingStatus || !Elements.githubReleases || !Elements.errorStatus) {
    return
  }
  
  Elements.loadingStatus.style.display = 'block'
  Elements.githubReleases.style.display = 'none'
  Elements.errorStatus.style.display = 'none'
  
  // 重置计时器显示
  if (Elements.loadingTime) {
    Elements.loadingTime.textContent = '0'
  }
  
  // 移除之前的警告信息
  removeWarningMessage()
}

/**
 * 显示错误状态
 */
function showError(message) {
  if (!Elements.loadingStatus || !Elements.githubReleases || !Elements.errorStatus) {
    return
  }
  
  Elements.loadingStatus.style.display = 'none'
  Elements.githubReleases.style.display = 'none'
  Elements.errorStatus.style.display = 'block'
  
  const errorParagraph = Elements.errorStatus.querySelector('p')
  if (errorParagraph) {
    errorParagraph.textContent = message
  }
}

/**
 * 显示版本信息
 */
function showReleases() {
  if (!Elements.loadingStatus || !Elements.githubReleases) {
    return
  }
  
  Elements.loadingStatus.style.display = 'none'
  Elements.githubReleases.style.display = 'block'
  
  // 显示刷新按钮
  if (Elements.refreshContainer) {
    Elements.refreshContainer.style.display = 'block'
  }
}

/**
 * 处理并显示版本数据
 */
async function displayReleases(releases) {
  if (!Elements.githubReleases) {
    return
  }
  
  if (!releases || releases.length === 0) {
    Elements.githubReleases.innerHTML = '<div class="empty-releases"><p>暂无版本信息</p></div>'
    showReleases()
    return
  }
  
  try {
    // 生成版本信息HTML
    const releasesHTML = generateReleasesHTML(releases)
    Elements.githubReleases.innerHTML = releasesHTML
    
    showReleases()
    console.log('✅ 版本信息显示成功')
    
  } catch (error) {
    console.error('❌ 生成版本信息HTML失败:', error)
    showError('版本信息处理失败，请刷新页面重试')
  }
}

/**
 * 生成版本信息HTML
 */
function generateReleasesHTML(releases) {
  let html = '<div class="version-markdown">'
  
  releases.forEach((release, index) => {
    const isLatest = index === 0
    const isBeta = release.tag_name.includes('beta') || release.tag_name.includes('alpha')
    const versionType = isBeta ? '测试版' : '稳定版'
    const latestBadge = isLatest ? '<span class="latest-badge">[最新]</span>' : ''
    
    // 解析发布日期
    const publishDate = new Date(release.published_at).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    // 解析更新日志
    const changelog = release.body ? parseChangelog(release.body) : ['暂无更新日志']
    
    html += `
      <div class="release-item">
        <h3>${release.tag_name} ${latestBadge}</h3>
        <div class="release-meta">
          <p><strong>发布日期：</strong>${publishDate}</p>
          <p><strong>版本类型：</strong>${versionType}</p>
        </div>
        <div class="release-changelog">
          <h4>📝 更新日志</h4>
          <div class="markdown-content">
            ${renderMarkdown(release.body || '暂无更新日志')}
          </div>
        </div>
        <div class="release-links">
          <h4>🔗 相关链接</h4>
          <ul>
            <li><a href="${release.html_url}" target="_blank" rel="noopener noreferrer">GitHub Tag</a></li>
            ${release.assets && release.assets.length > 0 
              ? `<li><a href="${release.assets[0].browser_download_url}" target="_blank" rel="noopener noreferrer">下载 ${release.tag_name}</a></li>` 
              : ''}
          </ul>
        </div>
      </div>
      ${index < releases.length - 1 ? '<hr class="release-divider">' : ''}
    `
  })
  
  html += '</div>'
  return html
}

/**
 * 处理发布说明，去除后半部分特定内容并以Markdown样式显示
 */
function processReleaseNotes(body, isFull = false, truncatedLength = 200) {
  if (!body) return '<p>暂无更新说明</p>'
  
  if (isFull) {
    // 显示完整内容
    return renderMarkdown(body.trim())
  }
  
  // 查找各种分隔符
  const separators = [
    'full changelog:',  // GitHub标准格式
    'full changelog',   // 无冒号版本
    '---',              // 分隔线
    '## 下载',          // 中文下载标题
    '**下载**',         // 加粗下载
    '### 下载',         // 三级标题下载
    '**下载链接**',     // 下载链接
    '| 平台',           // 平台表格
    '**sha256**',       // 校验值
    '**sha256 校验**',  // 校验值中文
    '**国内下载**',     // 国内下载
    '**国内 下载链接**' // 国内下载链接
  ]
  
  let content = body.toLowerCase()
  let originalContent = body
  
  for (const separator of separators) {
    const index = content.indexOf(separator.toLowerCase())
    if (index !== -1) {
      originalContent = body.substring(0, index).trim()
      break
    }
  }
  
  // 简洁版本，限制长度
  if (originalContent.length > truncatedLength) {
    return {
      truncated: renderMarkdown(originalContent.substring(0, truncatedLength).trim() + '...'),
      full: renderMarkdown(originalContent.trim()),
      hasMore: true
    }
  }
  
  return {
    truncated: renderMarkdown(originalContent.trim()),
    full: renderMarkdown(originalContent.trim()),
    hasMore: false
  }
}

/**
 * 简单Markdown渲染器
 */
function renderMarkdown(text) {
  if (!text) return ''
  
  return text
    // 标题
    .replace(/^### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^## (.*$)/gim, '<h3>$1</h3>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // 代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 列表
    .replace(/^\s*-\s+(.*)$/gim, '<li>$1</li>')
    .replace(/^\s*\*\s+(.*)$/gim, '<li>$1</li>')
    .replace(/^\s*\+\s+(.*)$/gim, '<li>$1</li>')
    // 将连续列表项包装在ul中
    .replace(/(<li>.*<\/li>)(\s*<li>.*<\/li>)*/g, '<ul>$&</ul>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // 换行
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // 包装段落
    .replace(/^(<[^>]+>.*<\/[^>]+>|<[^>]+\/>)$/g, '$1')
    .replace(/^([^<].*[^>])$/g, '<p>$1</p>')
    .replace(/<p><p>/g, '<p>')
    .replace(/<\/p><\/p>/g, '</p>')
}

/**
 * 生成简化版本信息HTML（用于快速显示）
 */
function generateSimpleReleasesHTML(releases) {
  let html = '<div class="version-markdown">'
  
  releases.forEach((release, index) => {
    const isLatest = index === 0
    const isBeta = release.tag_name.includes('beta') || release.tag_name.includes('alpha')
    const versionType = isBeta ? '测试版' : '稳定版'
    const latestBadge = isLatest ? '<span class="latest-badge">[最新]</span>' : ''
    const anchorId = release.tag_name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    
    // 解析发布日期
    const publishDate = new Date(release.published_at).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    
    // 处理发布说明
    const notesData = processReleaseNotes(release.body)
    
    html += `
      <div class="release-item" id="${anchorId}">
        <h3 id="version-${anchorId}">${release.tag_name} ${latestBadge}</h3>
        <div class="release-meta">
          <p><strong>发布日期：</strong>${publishDate}</p>
          <p><strong>版本类型：</strong>${versionType}</p>
        </div>
        <div class="release-changelog">
          <h4>📝 更新日志</h4>
          <div class="markdown-content release-body" id="release-body-${index}">
            <div id="release-truncated-${index}">${notesData.truncated}</div>
            <div id="release-full-${index}" style="display: none;">${notesData.full}</div>
          </div>
        </div>
        ${notesData.hasMore ? `
          <button class="expand-btn" id="expand-btn-${index}" onclick="toggleReleaseDetails(${index})">
            展开
          </button>
        ` : ''}
      </div>
      ${index < releases.length - 1 ? '<hr class="release-divider">' : ''}
    `
  })
  
  html += '</div>'
  return html
}

/**
 * HTML转义函数
 */
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * 解析更新日志
 */
function parseChangelog(body) {
  if (!body || typeof body !== 'string') {
    return ['暂无更新日志']
  }
  
  const lines = body.split('\n')
  const changelog = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // 跳过标题行
    if (trimmed && !trimmed.startsWith('#')) {
      // 移除Markdown链接格式，保留纯文本
      const regex = /\[([^\]]+)\]\([^)]+\)/g
      const cleanLine = trimmed.replace(regex, '$1')
      
      // 处理列表项
      if (cleanLine.startsWith('-') || cleanLine.startsWith('*')) {
        const item = cleanLine.substring(1).trim()
        if (item) {
          changelog.push(item)
        }
      } else if (cleanLine) {
        changelog.push(cleanLine)
      }
    }
  }
  
  return changelog.length > 0 ? changelog : ['暂无更新日志']
}

/**
 * 刷新GitHub版本信息
 */
async function refreshGitHubReleases() {
  console.log('🔄 用户手动刷新版本信息')
  
  if (!ChangelogState.isInitialized) {
    if (!initializeElements()) {
      return
    }
    ChangelogState.isInitialized = true
  }
  
  // 更新刷新按钮状态
  if (Elements.refreshButton && Elements.refreshIcon) {
    Elements.refreshButton.disabled = true
    Elements.refreshIcon.style.animation = 'spin 1s linear infinite'
    Elements.refreshButton.innerHTML = '<span class="refresh-icon">🔄</span> 正在刷新...'
  }
  
  try {
    await fetchGitHubReleases()
    console.log('✅ 刷新成功')
  } catch (error) {
    console.error('❌ 刷新失败:', error)
  } finally {
    // 恢复刷新按钮状态
    if (Elements.refreshButton && Elements.refreshIcon) {
      setTimeout(() => {
        Elements.refreshButton.disabled = false
        Elements.refreshIcon.style.animation = ''
        Elements.refreshButton.innerHTML = '<span class="refresh-icon">🔄</span> 刷新版本信息'
      }, 1000)
    }
  }
}

/**
 * 启动加载计时器 - 修复元素问题
 */
function startLoadingTimer() {
  console.log('⏱️ 启动加载计时器...')

  // 停止现有计时器
  stopLoadingTimer()

  let seconds = 0

  const updateTimer = () => {
    const timeElement = document.getElementById('loading-time') || 
                       document.querySelector('#loading-time')
    
    if (timeElement) {
      timeElement.textContent = seconds
    } else {
      console.log('计时器:', seconds, '秒')
    }
    
    // 每10秒输出一次调试信息
    if (seconds % 10 === 0) {
      console.log(`⏱️ 已等待 ${seconds} 秒`)
    }
    
    // 超过60秒显示警告
    if (seconds >= 60) {
      showWarningMessage()
    }
    
    // 超过120秒显示更严重的警告
    if (seconds >= 120) {
      showCriticalWarning()
    }
    
    seconds++
  }
  
  // 立即更新一次
  updateTimer()
  
  // 启动定时器
  ChangelogState.loadingTimer = setInterval(updateTimer, 1000)
  console.log('✅ 计时器启动成功，ID:', ChangelogState.loadingTimer)
}

/**
 * 切换发布详情显示/隐藏
 */
window.toggleReleaseDetails = function(index) {
  const truncated = document.getElementById(`release-truncated-${index}`)
  const full = document.getElementById(`release-full-${index}`)
  const btn = document.getElementById(`expand-btn-${index}`)
  
  if (!truncated || !full || !btn) return
  
  if (full.style.display === 'none') {
    // 展开：隐藏截断内容，显示完整内容
    truncated.style.display = 'none'
    full.style.display = 'block'
    btn.textContent = '收起'
  } else {
    // 收起：显示截断内容，隐藏完整内容
    truncated.style.display = 'block'
    full.style.display = 'none'
    btn.textContent = '展开详情'
  }
}

/**
 * 停止加载计时器
 */
function stopLoadingTimer() {
  console.log('⏹️ 停止加载计时器...')
  
  if (ChangelogState.loadingTimer) {
    console.log('🗑️ 清除计时器ID:', ChangelogState.loadingTimer)
    clearInterval(ChangelogState.loadingTimer)
    ChangelogState.loadingTimer = null
    console.log('✅ 计时器已停止')
  } else {
    console.log('ℹ️ 没有活动的计时器需要停止')
  }
}

/**
 * 显示警告信息
 */
function showWarningMessage() {
  if (!Elements.loadingStatus) {
    return
  }
  
  // 检查是否已存在警告
  const existingWarning = Elements.loadingStatus.querySelector('.loading-warning')
  if (existingWarning) {
    return
  }
  
  const warning = document.createElement('p')
  warning.className = 'loading-warning'
  warning.textContent = '加载时间较长，请检查网络连接...'
  Elements.loadingStatus.appendChild(warning)
  
  console.log('⚠️ 显示加载警告信息')
}

/**
 * 显示严重警告
 */
function showCriticalWarning() {
  if (!Elements.loadingStatus) {
    return
  }
  
  // 检查是否已存在严重警告
  const existingCriticalWarning = Elements.loadingStatus.querySelector('.loading-critical-warning')
  if (existingCriticalWarning) {
    return
  }
  
  const criticalWarning = document.createElement('p')
  criticalWarning.className = 'loading-critical-warning'
  criticalWarning.textContent = '加载时间过长，建议刷新页面或检查网络设置。'
  Elements.loadingStatus.appendChild(criticalWarning)
  
  console.log('🚨 显示严重加载警告')
}

/**
 * 移除警告信息
 */
function removeWarningMessage() {
  if (!Elements.loadingStatus) {
    return
  }
  
  const warnings = Elements.loadingStatus.querySelectorAll('.loading-warning, .loading-critical-warning')
  warnings.forEach(warning => warning.remove())
}

// 立即启动 - 修复VitePress环境问题
(function() {
  console.log('🔥 启动changelog加载器...')
  
  const startChangelog = async () => {
    try {
      await fetchGitHubReleases()
    } catch (error) {
      console.error('changelog启动失败:', error)
    }
  }
  
  // 等待VitePress渲染完成
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startChangelog)
    } else {
      // 使用setTimeout确保在VitePress渲染后执行
      setTimeout(startChangelog, 100)
    }
  }
})()

/**
 * 页面卸载时清理资源
 */
window.addEventListener('beforeunload', () => {
  stopLoadingTimer()
  console.log('🧹 页面卸载，清理资源完成')
})
</script>

<style>
/* 加载状态样式 */
.loading-status {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  background: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  margin: 2rem 0;
  border: 1px solid var(--vp-c-divider);
}

.loading-spinner {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 4px solid var(--vp-c-text-3);
  border-radius: 50%;
  border-top-color: var(--vp-c-brand-1);
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.loading-status p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.loading-timer {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin-top: 1rem;
  font-weight: 600;
}

.loading-timer #loading-time {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 1.1rem;
}

.loading-warning {
  color: var(--vp-c-warning-1);
  font-size: 0.95rem;
  margin-top: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: var(--vp-c-warning-soft);
  border-radius: 0.5rem;
  border-left: 4px solid var(--vp-c-warning-1);
}

.loading-critical-warning {
  color: var(--vp-c-danger-1);
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  background: var(--vp-c-danger-soft);
  border-radius: 0.5rem;
  border-left: 4px solid var(--vp-c-danger-1);
}

/* 版本信息容器 */
.github-releases {
  margin-top: 2rem;
}

/* 空状态 */
.empty-releases {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

/* 版本项目样式 */
.release-item {
  background: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.release-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.release-item h3 {
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.latest-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.release-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--vp-c-divider);
}

.release-meta p {
  margin: 0;
  font-size: 0.95rem;
}

.release-meta strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.release-changelog,
.release-links {
  margin-bottom: 1.5rem;
}

.release-changelog h4,
.release-links h4 {
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.release-changelog ul,
.release-links ul {
  padding-left: 1.5rem;
  margin: 0;
}

.release-changelog li,
.release-links li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.release-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.release-links a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.release-divider {
  border: none;
  height: 1px;
  background: var(--vp-c-divider);
  margin: 2rem 0;
}

/* 展开/收起相关样式 */
.expand-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.expand-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.release-body.collapsed {
  max-height: 120px;
  overflow: hidden;
  position: relative;
}

.release-body.collapsed::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, var(--vp-c-bg-soft));
}

.release-body.expanded {
  max-height: none;
}

/* 错误状态样式 */
.error-status {
  background: var(--vp-c-danger-soft);
  border: 2px solid var(--vp-c-danger-1);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-danger-1);
  margin: 2rem 0;
}

.error-status p {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.error-status button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-status button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 刷新按钮容器 */
.refresh-container {
  text-align: center;
  margin: 2rem 0;
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.refresh-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.refresh-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.refresh-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.refresh-icon {
  font-size: 1.3rem;
  display: inline-block;
}

/* 动画效果 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .loading-status {
    padding: 2rem 1rem;
  }
  
  .release-item {
    padding: 1.5rem;
  }
  
  .release-meta {
    grid-template-columns: 1fr;
  }
  
  .refresh-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .loading-status {
    padding: 1.5rem 1rem;
  }
  
  .release-item {
    padding: 1rem;
  }
  
  .release-item h3 {
    font-size: 1.3rem;
  }
  
  .refresh-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

.markdown-content {
  line-height: 1.5;
}

.markdown-content h2 {
  font-size: 1.4em;
  margin: 0.8em 0 0.4em 0;
  color: var(--vp-c-brand-1);
}

.markdown-content h3 {
  font-size: 1.2em;
  margin: 0.6em 0 0.3em 0;
  color: var(--vp-c-text-1);
}

.markdown-content h4 {
  font-size: 1.1em;
  margin: 0.5em 0 0.2em 0;
  color: var(--vp-c-text-1);
}

.markdown-content p {
  margin: 0.3em 0;
}

.markdown-content ul {
  margin: 0.3em 0;
  padding-left: 1.5em;
}

.markdown-content li {
  margin: 0.15em 0;
}

.markdown-content code {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content strong {
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
}

.markdown-content a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}
</style>