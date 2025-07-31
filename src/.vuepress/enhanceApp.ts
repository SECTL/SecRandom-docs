import { defineEnhance } from "@vuepress/client";
import { createVNode, render, onMounted } from "vue";
import GlobalHint from "./components/GlobalHint.vue";
import { useRouter } from "vue-router";

// 星野提示：这个文件负责全局提示组件的挂载，让它在所有页面显示

export default defineEnhance(({ app }) => {
  // 注册全局组件
  app.component("GlobalHint", GlobalHint);

  // 创建一个函数来挂载提示组件
  const mountHintComponent = () => {
    // 确保在浏览器环境中运行
    if (typeof window === 'undefined') return;
    
    // 检查是否已添加提示组件，如果已存在则先移除
    const existingHint = document.querySelector(".hint-container");
    if (existingHint) {
      existingHint.remove();
    }
    
    // 尝试多种容器选择器，确保在不同页面结构下都能找到容器
    const contentContainer = document.querySelector(".content-container") || 
                             document.querySelector(".theme-hope-content") || 
                             document.querySelector(".theme-hope-page-content") || 
                             document.querySelector("main");
                              
    if (contentContainer) {
      // 创建组件实例
      const vnode = createVNode(GlobalHint);
      // 渲染组件到临时容器
      const tempContainer = document.createElement('div');
      render(vnode, tempContainer);
      // 将生成的DOM元素移到容器的最前面
      if (vnode.el) {
        contentContainer.insertBefore(vnode.el, contentContainer.firstChild);
      }
    } else {
      console.warn('星野警告：未找到合适的容器来挂载全局提示组件');
    }
  };

  // 在应用挂载后执行初始挂载
  app.mixin({
    mounted() {
      // 延迟一点执行，确保DOM已经完全渲染
      setTimeout(mountHintComponent, 100);
    },
  });

  // 使用路由钩子确保在路由切换后也能正确显示
  const router = useRouter();
  router.afterEach(() => {
    // 延迟一点执行，确保DOM已经完全更新
    setTimeout(mountHintComponent, 100);
  });

  // 初始挂载（针对非SPA模式）
  if (typeof window !== 'undefined') {
    mountHintComponent();
  }
});

// 白露小贴士 ✨: 这个改进版本使用了多种容器选择器和路由钩子，
// 确保全局提示组件在各种情况下都能正确显示在页面顶部