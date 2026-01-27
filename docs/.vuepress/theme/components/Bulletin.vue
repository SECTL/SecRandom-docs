<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useThemeData } from 'vuepress-theme-plume/client'
import { useRouter } from 'vuepress/client'

interface BulletinItem {
  id: string
  title?: string
  content: string
  contentType?: 'markdown' | 'text'
  layout?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  link?: string
  icon?: string
  key?: string
}

const theme = useThemeData()
const router = useRouter()
const showNotification = ref(false)
const readBulletinIds = ref<Set<string>>(new Set())

// 根据当前路径判断语言环境来决定加载哪个目录的公告
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
const isEnglish = currentPath.startsWith('/en/');

let rawBulletins;
if (isEnglish) {
  rawBulletins = import.meta.glob('../../../en/bulletin/*.md', { query: '?raw', import: 'default', eager: true });
} else {
  rawBulletins = import.meta.glob('../../../bulletin/*.md', { query: '?raw', import: 'default', eager: true });
}

const simpleHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

const getBulletinsFromFiles = (): BulletinItem[] => {
  const items: any[] = []
  
  for (const path in rawBulletins) {
    const filename = path.split('/').pop() || ''
    if (!filename.endsWith('.md') || filename.toLowerCase().includes('index')) continue
    
    const id = filename.replace('.md', '')
    const content = rawBulletins[path] as string
    
    // Parse frontmatter
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const frontmatter: any = {}
    if (match) {
      match[1].split(/\r?\n/).forEach(line => {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0].trim()
          const val = parts.slice(1).join(':').trim()
          frontmatter[key] = val.replace(/^['"](.*)['"]$/, '$1')
        }
      })
    }
    
    // Handle 'sticky' (VuePress theme field)
    let sticky = 0
    if (typeof frontmatter.sticky === 'number') {
      sticky = frontmatter.sticky
    } else if (frontmatter.sticky === 'true' || frontmatter.sticky === true) {
      sticky = 1
    }
    
    // Excerpt
    let excerpt = frontmatter.excerpt
    if (!excerpt) {
        const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
        const lines = body.split(/\r?\n/)
        for (const line of lines) {
            const cleanLine = line.trim()
            if (cleanLine && !cleanLine.startsWith('#') && !cleanLine.startsWith('![')) {
                excerpt = cleanLine
                break
            }
        }
    }
    
    // Icon
    let icon = '🔔'
    if (sticky >= 10) icon = '📢'  // High priority sticky
    else if (sticky >= 1) icon = '📌'  // Normal sticky
    
    const hash = simpleHash(content)
    const key = `${id}-${hash}`
    
    items.push({
      id,
      title: frontmatter.title || id,
      content: excerpt || (isEnglish ? 'Click for details' : '点击查看详情'),
      link: isEnglish ? `/en/bulletin/${id}.html` : `/bulletin/${id}.html`,
      icon,
      key,
      sticky,
      createTime: frontmatter.createTime || '',
      layout: frontmatter.layout || 'bottom-right'
    })
  }
  
  items.sort((a, b) => {
    // 只按sticky值降序排序（sticky值越大越靠前）
    return (b.sticky || 0) - (a.sticky || 0)
  })
  
  return items.slice(0, 3) as BulletinItem[]
}

const bulletins = computed<BulletinItem[]>(() => {
  const fileItems = getBulletinsFromFiles()
  if (fileItems.length > 0) return fileItems

  const config = theme.value.bulletin
  if (!config) return []
  
  if (Array.isArray(config)) {
    return config as BulletinItem[]
  }

  // Handle wrapped list (custom)
  if (config && typeof config === 'object' && 'items' in config && Array.isArray((config as any).items)) {
    return (config as any).items as BulletinItem[]
  }
  
  return [config as BulletinItem]
})

const unreadBulletins = computed(() => {
  return bulletins.value.filter(b => {
    const key = b.key || b.id
    return !readBulletinIds.value.has(key)
  })
})

const hasUnread = computed(() => unreadBulletins.value.length > 0)

const markAsRead = (key: string) => {
  readBulletinIds.value.add(key)
  saveReadBulletins()
}

const saveReadBulletins = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('plume:read-bulletins', JSON.stringify([...readBulletinIds.value]))
  }
}

const loadReadBulletins = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('plume:read-bulletins')
    if (saved) {
      try {
        readBulletinIds.value = new Set(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load read bulletins:', e)
      }
    }
  }
}

// Watch for changes in hasUnread to automatically show/hide notification
watch(hasUnread, (val) => {
  showNotification.value = val
})

// Watch for route changes to add pinned indicators when navigating to bulletin pages
watch(() => router.currentRoute.value.path, async (newPath) => {
  if (newPath.includes('/bulletin')) {
    // 等待DOM更新后添加置顶标签
    await nextTick()
    setTimeout(addPinnedIndicators, 500)
  }
}, { immediate: true })

const closeNotification = () => {
  // Mark the current displayed bulletin as read when closed
  if (unreadBulletins.value.length > 0) {
    const item = unreadBulletins.value[0]
    markAsRead(item.key || item.id)
  }
  // No need to manually set showNotification = false
  // The watcher will handle it if list becomes empty
}

const jumpToBulletinPage = () => {
  const item = unreadBulletins.value[0]
  
  if (item) {
    markAsRead(item.key || item.id)
  }

  if (item?.link) {
    router.push(item.link)
  } else {
    router.push('/bulletin/')
  }
}

onMounted(() => {
  loadReadBulletins()
  // Immediate check in case watcher didn't trigger (though it should if we add immediate: true, 
  // but let's just rely on reactive state or manual init)
  showNotification.value = hasUnread.value
  
  // Add pinned indicators to the bulletin list on pages that show bulletin lists
  setTimeout(addPinnedIndicators, 1000) // Wait for content to load
})

// Function to add pinned indicators to bulletin list items
const addPinnedIndicators = () => {
  if (typeof document === 'undefined') return
  
  // Look for bulletin list items
  const bulletinItems = document.querySelectorAll('.vp-post-item')
  
  bulletinItems.forEach(item => {
    // Get the link element to extract the bulletin ID
    const linkEl = item.querySelector('a.vp-link')
    if (!linkEl) return
    
    const href = linkEl.getAttribute('href')
    if (!href) return
    
    // Extract bulletin ID from href
    const match = href.match(/\/bulletin\/(.+)\.html$/)
    if (!match) return
    
    const bulletinId = match[1]
    
    // Check if this bulletin is pinned by looking in our bulletin list
    const bulletin = bulletins.value.find(b => b.id === bulletinId)
    
    if (bulletin && (bulletin.sticky >= 1) && !item.querySelector('.pinned-indicator')) {
      // Create pinned indicator element
      const indicator = document.createElement('span')
      indicator.className = `pinned-indicator ${bulletin.sticky >= 10 ? 'super-pinned' : 'normal-pinned'}`
      indicator.innerHTML = bulletin.sticky >= 10 
        ? (isEnglish ? '📢 Super Pinned' : '📢 超级置顶') 
        : (isEnglish ? '📌 Pinned' : '📌 置顶')
      
      // Find the meta element (contains the date)
      const metaEl = item.querySelector('.post-meta')
      if (metaEl) {
        // Insert the indicator after the meta element
        metaEl.parentNode?.insertBefore(indicator, metaEl.nextSibling)
      } else {
        // Fallback: insert at the beginning of the item content
        const contentEl = item.querySelector('.post-item-content')
        if (contentEl) {
          contentEl.insertBefore(indicator, contentEl.firstChild)
        }
      }
      
      // Also add CSS classes to item for visual indication
      item.classList.add('pinned')
      if (bulletin.sticky >= 10) {
        item.classList.add('super-pinned-item')
      } else {
        item.classList.add('pinned-item')
      }
    }
  })
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="showNotification" class="notification" @click="jumpToBulletinPage">
      <div class="notification-content">
        <span class="notification-icon">
          <span v-if="unreadBulletins[0]?.icon" style="font-style: normal;">{{ unreadBulletins[0].icon }}</span>
          <span v-else class="vpi-bell" />
        </span>
        <div class="notification-text">
          <div class="notification-title">
            <span v-if="unreadBulletins[0]?.sticky >= 10" class="pinned-label super-pinned">{{ isEnglish ? '📢 Super Pinned:' : '📢 超级置顶:' }}</span>
            <span v-else-if="unreadBulletins[0]?.sticky >= 1" class="pinned-label normal-pinned">{{ isEnglish ? '📌 Pinned:' : '📌 置顶:' }}</span>
            <span>{{ unreadBulletins[0].title || (isEnglish ? `You have ${unreadBulletins.length} unread bulletin(s)` : `您有 ${unreadBulletins.length} 条未读公告`) }}</span>
          </div>
          <div class="notification-message">{{ unreadBulletins[0].content }}</div>
        </div>
        <button class="notification-close" @click.stop="closeNotification">
          <span class="vpi-close" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: calc(var(--vp-z-index-bulletin) + 1);
  cursor: pointer;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-4);
  max-width: 400px;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.pinned-label {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: normal;
}

.super-pinned {
  background-color: #ff6b6b;
  color: white;
}

.normal-pinned {
  background-color: #ffd93d;
  color: #333;
}

.notification-message {
  font-size: 13px;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.notification-close:hover {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .notification {
    right: 16px;
    bottom: 16px;
    left: 16px;
  }
  
  .notification-content {
    max-width: none;
    width: 100%;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Styles for pinned indicators in bulletin list */
.pinned-indicator {
  font-size: 0.7em;
  padding: 0.25em 0.5em;
  border-radius: 3px;
  font-weight: normal;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  white-space: nowrap;
  display: inline-block;
  border: 1px solid transparent;
}

.pinned-indicator.super-pinned {
  background-color: #ff6b6b;
  color: white;
  border-color: #ff5252;
}

.pinned-indicator.normal-pinned {
  background-color: #ffd93d;
  color: #333;
  border-color: #ffcc00;
}

/* Visual indicators for pinned items in the list */
.vp-post-item.pinned {
  border-left: 3px solid #ffd93d !important; /* Normal pinned */
}

.vp-post-item.super-pinned-item {
  border-left: 3px solid #ff6b6b !important; /* Super pinned */
}
</style>
