import fs from 'fs'
import path from 'path'

export const getBulletinList = (bulletinDir: string) => {
  if (!fs.existsSync(bulletinDir)) return []
  
  const files = fs.readdirSync(bulletinDir).filter(f => f.endsWith('.md') && !f.toLowerCase().includes('index'))
  
  const bulletins = files.map(file => {
    const filePath = path.join(bulletinDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const stat = fs.statSync(filePath)
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const frontmatter: any = {}
    
    if (match) {
      match[1].split(/\r?\n/).forEach(line => {
        const parts = line.split(':')
        if (parts.length >= 2) {
            const key = parts[0].trim()
            const val = parts.slice(1).join(':').trim()
            // Basic value cleanup (remove quotes if present)
            frontmatter[key] = val.replace(/^['"](.*)['"]$/, '$1')
        }
      })
    }
    
    // Handle 'pin'
    let pin = 0
    if (frontmatter.pin === 'super') pin = 2
    else if (frontmatter.pin === 'true' || frontmatter.pin === true) pin = 1
    
    // Extract excerpt if not in frontmatter
    let excerpt = frontmatter.excerpt
    if (!excerpt) {
        // Remove frontmatter
        const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
        // Find first paragraph or non-empty line
        const lines = body.split(/\r?\n/)
        for (const line of lines) {
            const cleanLine = line.trim()
            if (cleanLine && !cleanLine.startsWith('#') && !cleanLine.startsWith('![')) {
                excerpt = cleanLine
                break
            }
        }
    }

    // Determine if this is an English bulletin based on the path
    const isEnglishPath = bulletinDir.includes('/en/') || bulletinDir.includes('\\en\\');
    
    return {
      id: file.replace('.md', ''),
      title: frontmatter.title || file.replace('.md', ''),
      createTime: frontmatter.createTime || '',
      pin,
      content: excerpt || (isEnglishPath ? 'Click for details' : '点击查看详情'),
      mtime: stat.mtimeMs, // Add mtime for version tracking
      isEnglish: isEnglishPath
    }
  })
  
  // Sort: Super Pinned > Pinned > Date DESC
  bulletins.sort((a, b) => {
    if (a.pin !== b.pin) return b.pin - a.pin
    return b.createTime.localeCompare(a.createTime)
  })
  
  // Return top 3 formatted for Plume
  const result = bulletins.slice(0, 3).map(b => {
    // Determine icon based on pin status
    let icon = '🔔' // Default icon
    if (b.pin === 2) icon = '📢' // Super pinned
    else if (b.pin === 1) icon = '📌'  // Pinned
    
    const key = `${b.id}-${b.mtime}`
    // console.log(`Generated bulletin: ${b.title}, Key: ${key}`) // Debug log

    return {
      id: b.id,
      title: b.title,
      content: b.content,
      link: b.isEnglish ? `/en/bulletin/${b.id}.html` : `/bulletin/${b.id}.html`,
      icon,
      key // Unique key for read status
    }
  })

  return result
}
