import { defineClientConfig } from 'vuepress/client'
import Layout from './theme/components/Layout.vue'
import Download from './theme/components/Download.vue'

// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import './theme/styles/custom.css'

// 浏览器语言检测和自动跳转
if (typeof window !== 'undefined') {
  // 只在首次访问根路径时执行
  if (window.location.pathname === '/' && !sessionStorage.getItem('languageDetected')) {
    sessionStorage.setItem('languageDetected', 'true')
    
    // 获取浏览器语言
    const browserLang = navigator.language || navigator.languages?.[0] || 'zh-CN'
    
    // 检查是否支持该语言，目前仅支持中文和英文
    if (browserLang.startsWith('en')) {
      // 英文浏览器跳转到英文界面
      window.location.href = '/en/'
    }
    // 其他语言（包括中文）默认使用中文界面
  }
}

export default defineClientConfig({
  enhance({ app }) {
    // app.component('Swiper', Swiper) // you should install `swiper`
    app.component('Download', Download)
  },
  layouts: {
    Layout,
  },
})