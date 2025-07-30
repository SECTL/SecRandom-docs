---
layout: false
title: 关于SecRandom 开发团队
---
<!--定稿，千辛万苦肝出来的，改之前给我备份，搞丢了把你扇死，听见了吗本新-->
<div id="team-page">
  <!-- 桌面版内容 -->
  <div class="desktop-view">
    <div class="content-container">
      <h6 class="intro-text">👋 你好，我们是</h6>
      <h1 class="team-name">SecRandom开发团队：</h1>
      <div class="typing-container">
        <h2 class="typing-text">
          <span id="typing-text"></span>
          <span class="cursor" id="cursor"></span>
        </h2>
      </div>
    </div>
  </div>

  <!-- 移动设备提示 -->
  <div class="mobile-view">
    <div class="incompatible-message">
      <div class="warning-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L1 21h22L12 1zm0 4l7.53 13H4.47L12 5zm1 10h-2v2h2v-2zm0-4h-2v4h2v-4z"/>
        </svg>
      </div>
      <h2>不兼容的设备</h2>
      <p>本页面专为桌面设备设计，请使用电脑访问以获得最佳体验</p>
      <p>或者尝试横屏使用您的设备</p>
      <a href="/" class="back-button">返回首页</a>
    </div>
  </div>
</div>

<style>
/* === 基础样式重置 === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

/* === 隐藏所有主题元素 === */
/* 导航栏 */
.navbar,
/* 侧边栏 */
.sidebar,
/* 页面元信息 */
.page-meta,
/* 页面导航 */
.page-nav,
/* 页脚 */
.footer,
/* 侧边栏按钮 */
.sidebar-button,
/* 其他可能出现的主题元素 */
.theme-hope-content,
.vp-sidebar,
.vp-navbar {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* === 清除主题默认样式 === */
.theme-container {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  min-height: 100vh !important;
}

.page {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  min-height: 100vh !important;
}

#app {
  background: transparent !important;
}

/* === 团队页面核心样式 === */
#team-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;

  /* 改为纯色背景，去掉原来的渐变 */
  background: #DEE9F5;
  overflow: hidden;
  z-index: 10000;
}

/* 伪元素绘制左上角超出屏幕的白色大圆 */
#team-page::before {
  content: '';
  position: absolute;

  /* 977px / 1920px ≈ 50.9vw，圆形用同样的宽高保证正圆 */
  width: 50.9vw;
  height: 50.9vw;
  border-radius: 50%;

  /* 放到左上角，向上和向左各溢出一点（≈25.45vw） */
  top: -11.825vw;
  left: -11.825vw;

  background: #ffffff;
  z-index: -1;   /* 确保在文本和内容容器之下 */
}

/* 桌面版样式 */
.desktop-view {
  display: block;
  height: 100%;
}

.content-container {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: left;
  padding: 40px;
  border-radius: 15px;
  background: rgba(10, 25, 47, 0.85);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  min-width: 500px;
  border: 1px solid rgba(35, 136, 246, 0.3);
  backdrop-filter: blur(5px);
  z-index: 100;
}

.intro-text {
  font-size: 28px;
  color: #2388F6;
  margin-bottom: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.9;
}

.team-name {
  font-size: 72px;
  color: #ffffff;
  margin-bottom: 40px;
  font-weight: 700;
  text-shadow: 0 0 15px rgba(35, 136, 246, 0.7);
  line-height: 1.1;
  background: linear-gradient(to right, #2388F6, #6ecbf5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing-container {
  border-top: 1px solid rgba(35, 136, 246, 0.3);
  padding-top: 20px;
  min-height: 60px;
  /* —— 新增：固定宽度，避免文字增删时布局抖动 —— */
  min-width: 40ch;
  overflow: hidden;
}

.typing-text {
  font-size: 25px;
  color: #66ccff;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.cursor {
  display: inline-block;
  width: 2px;
  /* 用 em 而不是 px，让光标高度跟随字体更协调 */
  height: 1.2em;
  background-color: #2388F6;
  margin-left: 5px;
  /* —— 用 steps 动画，闪烁时不重绘文字 —— */
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

/* 移动设备提示样式 */
.mobile-view {
  display: none;
  text-align: center;
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(10, 25, 47, 0.95);
  border-radius: 15px;
  border: 2px solid #ff6b6b;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 100;
}

.incompatible-message h2 {
  font-size: 32px;
  color: #ff6b6b;
  margin: 20px 0;
}

.incompatible-message p {
  font-size: 18px;
  color: #a0c4e4;
  line-height: 1.6;
  margin: 10px 0;
}

.warning-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  color: #ff6b6b;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 25px;
  background: rgba(35, 136, 246, 0.3);
  color: #fff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #2388F6;
}

.back-button:hover {
  background: rgba(35, 136, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* === 响应式设计 === */
@media (max-width: 1024px) {
  .content-container {
    left: 55%;
    max-width: 90%;
  }
}

@media (max-width: 768px), (orientation: portrait) {
  .desktop-view {
    display: none;
  }
  
  .mobile-view {
    display: block;
    margin-top: 150px;
  }
}

@media (max-width: 480px) {
  .mobile-view {
    padding: 20px;
    margin: 20px;
  }
  
  .incompatible-message h2 {
    font-size: 24px;
  }
  
  .incompatible-message p {
    font-size: 16px;
  }
  
  .warning-icon {
    width: 60px;
    height: 60px;
  }
}

/* === 强制全屏覆盖 === */
html, body, #app, .theme-container, .page {
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: transparent !important;
}

/* 确保没有滚动条 */
body {
  overflow: hidden !important;
}
</style>

<script>
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
(function() {
  // 打字机循环文本
  const texts = [
    "黎泽懿 Aionflux(设计&创意&策划&维护&文档&测试)",
    "弃稞之草(创意&维护)",
    "system-linux-cmb(应用测试)",
    "本新同学(响应式前端页面设计及维护&文档)"
  ];
  const TYPING_SPEED  = 100;
  const DELETING_SPEED= 50;
  const PAUSE_AFTER   = 2000;
  const NEXT_DELAY    = 500;

  let textIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let initialized = false;

  function initTeamPage() {
    if (initialized) return;
    initialized = true;
    console.log("团队页面初始化开始");

    // 装饰元素（保留你原来的逻辑）
    const decor = document.createElement('div');
    decor.className = 'background-decor';
    const container = document.getElementById('team-page') || document.body;
    container.appendChild(decor);

    // 隐藏主题元素（保留你的多重保险）
    const themeEls = [
      '.navbar','.sidebar','.page-meta','.page-nav',
      '.footer','.sidebar-button','.vp-sidebar',
      '.vp-navbar','.theme-hope-content'
    ];
    themeEls.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.cssText = 'display:none!important;visibility:hidden!important;';
      });
    });

    // 打字机元素
    const typingEl = document.getElementById('typing-text');
    const cursorEl = document.getElementById('cursor');
    if (!typingEl || !cursorEl) {
      console.error('无法找到 typing-text 或 cursor 元素');
      return;
    }
    cursorEl.style.display = 'inline-block';

    // 打字机核心逻辑
    function tick() {
      const full = texts[textIndex];
      if (!isDeleting) {
        // 增加字符
        typingEl.textContent = full.substring(0, ++charIndex);
        if (charIndex === full.length) {
          isDeleting = true;
          return setTimeout(tick, PAUSE_AFTER);
        }
        setTimeout(tick, TYPING_SPEED);
      } else {
        // 删除字符
        typingEl.textContent = full.substring(0, --charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          return setTimeout(tick, NEXT_DELAY);
        }
        setTimeout(tick, DELETING_SPEED);
      }
    }

    console.log("启动打字机效果");
    tick();
    console.log("团队页面初始化完成");
  }

  // DOMContentLoaded 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamPage);
  } else {
    setTimeout(initTeamPage, 50);
  }
  // 额外保险
  window.addEventListener('load',    initTeamPage);
  setTimeout(initTeamPage, 5000);
})();
}
</script>
