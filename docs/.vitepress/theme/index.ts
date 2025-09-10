// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import { inBrowser, useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './style/index.css'
import 'virtual:group-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import mediumZoom from 'medium-zoom'
import busuanzi from 'busuanzi.pure.js'
import BilibiliVideo from './components/BilibiliVideo.vue'
import backtotop from './components/backtotop.vue'
import Linkcard from './components/Linkcard.vue'
import ArticleMetadata from './components/ArticleMetadata.vue'
import HomeUnderline from './components/HomeUnderline.vue'
import TeamCard from './components/TeamCard.vue'
import Download from './components/Download.vue'
import Donate from './components/Donate.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用doc-footer-before插槽
      'doc-footer-before': () => h(backtotop),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('BilibiliVideo', BilibiliVideo);
    app.component('Linkcard' , Linkcard);
    app.component('Download' , Download);
    app.component('ArticleMetadata' , ArticleMetadata);
    app.component('HomeUnderline' , HomeUnderline);
    app.component('TeamCard' , TeamCard);
    app.component('Donate' , Donate)
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    // Get frontmatter and route
    const { frontmatter } = useData();
        
    // giscus配置
    giscusTalk({
      repo: 'SECTL/SecRandom-docs', //仓库
      repoId: 'R_kgDOPRYlZg', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOPRYlZs4CvPMD', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  }
} satisfies Theme
