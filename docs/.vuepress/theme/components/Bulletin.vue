<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
    
    // Handle sticky
    let sticky = 0
    if (typeof frontmatter.sticky === 'number') sticky = frontmatter.sticky
    else if (frontmatter.sticky === 'true' || frontmatter.sticky === true) sticky = 1
    
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
      createTime: frontmatter.createTime || ''
    })
  }
  
  items.sort((a, b) => {
    if (a.pin !== b.pin) return b.pin - a.pin
    return (b.createTime || '').localeCompare(a.createTime || '')
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
})
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
          <div class="notification-title">{{ isEnglish ? 'New Bulletin' : '新公告' }}</div>
          <div class="notification-message">{{ unreadBulletins[0].title || (isEnglish ? `You have ${unreadBulletins.length} unread bulletin(s)` : `您有 ${unreadBulletins.length} 条未读公告`) }}</div>
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
</style>
