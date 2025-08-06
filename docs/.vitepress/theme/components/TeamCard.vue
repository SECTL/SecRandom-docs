<template>
  <div class="team-card">
    <div class="content-container">
      <h6 class="intro-text">👋 你好，我们是</h6>
      <h1 class="team-name">SecRandom<br/>开发团队：</h1>
      <div class="typing-container">
        <h2 class="typing-text">
          <span id="typing-text"></span>
          <span class="cursor" id="cursor"></span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const texts = [
        "黎泽懿 Aionflux(设计&创意&策划&维护&文档&测试)",
        "弃稞之草(创意&维护)",
        "system-linux-cmb(应用测试)",
        "本新同学(响应式前端页面设计及维护&文档)"
      ];
      this.setupTypingEffect('typing-text', 'cursor', texts)
    }
  },
  methods: {
    setupTypingEffect(textElId, cursorElId, texts, typingSpeed = 100, deletingSpeed = 50) {
      const PAUSE_AFTER = 2000;
      const NEXT_DELAY = 500;

      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const typingEl = document.getElementById(textElId);
      const cursorEl = document.getElementById(cursorElId);
      
      if (typingEl && cursorEl) {
        cursorEl.style.display = 'inline-block';

        const tick = () => {
          const full = texts[textIndex];
          if (!isDeleting) {
            typingEl.textContent = full.substring(0, ++charIndex);
            if (charIndex === full.length) {
              isDeleting = true;
              setTimeout(tick, PAUSE_AFTER);
            } else {
              setTimeout(tick, typingSpeed);
            }
          } else {
            typingEl.textContent = full.substring(0, --charIndex);
            if (charIndex === 0) {
              isDeleting = false;
              textIndex = (textIndex + 1) % texts.length;
              setTimeout(tick, NEXT_DELAY);
            } else {
              setTimeout(tick, deletingSpeed);
            }
          }
        };

        tick();
      }
    }
  }
}
</script>

<style scoped>
.team-card {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  margin-bottom: 0;
}

.content-container {
  position: relative;
  text-align: left;
  padding: 40px;
  border-radius: 15px;
  max-width: 700px;
  min-width: 500px;
  border: 1px solid rgba(35, 136, 246, 0.3);
  backdrop-filter: blur(5px);
  margin: 0 auto;
  background: var(--vp-c-bg-alt);
}

.intro-text {
  color: var(--vp-c-brand);
  font-size: 24px;
  margin-bottom: 10px;
}

.team-name {
  font-size: 72px;
  margin-bottom: 0;
  font-weight: 700;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
}

.typing-container {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 20px;
  min-height: 60px;
  min-width: 40ch;
  overflow: hidden;
}

.typing-text {
  font-size: 25px;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-1);
  min-height: 40px;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: var(--vp-c-brand);
  margin-left: 5px;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

@media (max-width: 768px) {
  .content-container {
    padding: 25px;
    min-width: auto;
    max-width: 90%;
  }
  
  .team-name {
    font-size: 48px;
    margin-bottom: 0;
  }
  
  .intro-text {
    font-size: 20px;
  }
  
  .typing-text {
    font-size: 18px;
  }
  
  .typing-container {
    min-height: 50px;
    min-width: 30ch;
  }
}

@media (max-width: 480px) {
  .team-name {
    font-size: 36px;
  }
  
  .intro-text {
    font-size: 18px;
  }
  
  .typing-text {
    font-size: 16px;
  }
}
</style>