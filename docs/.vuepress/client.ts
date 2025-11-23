import { defineClientConfig } from 'vuepress/client'
import Layout from './theme/components/Layout.vue'
import Donate from './theme/components/Donate.vue'
import Download from './theme/components/Download.vue'
``
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // app.component('Swiper', Swiper) // you should install `swiper`
    app.component('Donate', Donate)
    app.component('Download', Download)
  },
  layouts: {
    Layout,
  },
})