<template>
  <div class="team-page">
    <!-- 桌面版内容 -->
    <div class="desktop-view">
      <div class="content-container">
        <h6 class="intro-text">👋 你好，我们是</h6>
        <h1 class="team-name">SecRandom开发团队：</h1>
        <div class="typing-container">
          <h2 class="typing-text">
            <span ref="typingText"></span>
            <span class="cursor" ref="cursor"></span>
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
        <router-link to="/" class="back-button">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamPage',
  mounted() {
    // 创建背景装饰元素
    const decor = document.createElement('div');
    decor.className = 'background-decor';
    this.$el.appendChild(decor);
    
    // 确保光标可见
    if (this.$refs.cursor) {
      this.$refs.cursor.style.display = 'inline-block';
    }
    
    // 启动打字效果
    this.startTypingEffect();
  },
  methods: {
    startTypingEffect() {
      const texts = [
        "黎泽懿 Aionflux(设计&创意&策划&维护&文档&测试)",
        "弃稞之草(创意&维护)",
        "system-linux-cmb(应用测试)",
        "本新同学(响应式前端页面设计及维护&文档)"
      ];
      
      const element = this.$refs.typingText;
      if (!element) return;
      
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      let pauseTime = 2000;
      
      const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
          // 删除字符
          element.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          // 添加字符
          element.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
          // 完成输入，等待后开始删除
          isDeleting = true;
          typingSpeed = 50;
          setTimeout(type, pauseTime);
        } else if (isDeleting && charIndex === 0) {
          // 完成删除，切换到下一个文本
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typingSpeed = 100;
          setTimeout(type, 500);
        } else {
          // 继续输入/删除
          setTimeout(type, typingSpeed);
        }
      };
      
      // 开始打字效果
      type();
    }
  }
}
</script>

<style scoped>
.team-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #0a192f 0%, #1a365d 100%);
  z-index: 10000;
  overflow: hidden;
}

/* 背景装饰 */
.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(35, 136, 246, 0.1) 0%, transparent 70%);
  z-index: -1;
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
}

.typing-text {
  font-size: 25px;
  color: #6ecbf5;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 30px;
  background-color: #2388F6;
  margin-left: 5px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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

/* 响应式设计 */
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
</style>