<template>
  <div class="team-card">
    <div class="content-container">
      <h6 class="intro-text">{{ introText }}</h6>
      <h1 class="team-name">SecRandom<br/>{{ teamNameText }}</h1>
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
  name: 'TeamCard',
  props: {
    lang: {
      type: String,
      default: 'zh-CN',
      validator: (value) => ['zh-CN', 'en'].includes(value)
    }
  },
  computed: {
    introText() {
      return this.lang === 'en' ? '👋 Hello, we are' : '👋 你好，我们是';
    },
    teamNameText() {
      return this.lang === 'en' ? 'Development Team:' : '开发团队：';
    },
    teamMembers() {
      if (this.lang === 'en') {
        return [
          "lzy98276 (Design & Creativity & Planning & Maintenance & Documentation & Testing)",
          "chenjintang (Maintenance)",
          "QiKeZhiCao (Creativity & Maintenance)",
          "Fox-block (Application Testing)",
          "yuanbenxin (Responsive Frontend Page Design & Maintenance & Documentation)",
          "LeafS825 (Creativity & Documentation)",
          "Jursin (Responsive Frontend Page Design & Maintenance & Documentation)",
          "lrs2187 (ClassIsland integration and plugin development)",
          "yaqwq (Logging Function)"
        ];
      } else {
        return [
          "黎泽懿 Aionflux(设计&创意&策划&维护&文档&测试)",
          "chenjintang(SecRandomの义父 & 维护)",
          "弃稞之草(创意&维护)",
          "Fox-block(应用测试)",
          "本新同学(响应式前端页面设计及维护&文档)",
          "叶背影(创意&文档)",
          "Jursin(响应式前端页面设计及维护&文档)",
          "lrs2187(Classlsland 联动部分与插件制作)",
          "我是小鸭头(一个人类，love 日志)"
        ];
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.setupTypingEffect('typing-text', 'cursor', this.teamMembers);
      this.startRainbowColorAnimation('typing-text');
    }
  },
  beforeUnmount() {
    if (this._rainbowInterval) clearInterval(this._rainbowInterval);
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
    },
    startRainbowColorAnimation(elId) {
      const el = document.getElementById(elId);
      if (!el) return;
      let hue = 0;
      this._rainbowInterval = setInterval(() => {
        el.style.color = `hsl(${hue}, 85%, 45%)`;
        hue = (hue + 2) % 360;
      },60);
    }
  }
}
</script>

<style scoped>
.team-card {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  padding: 60px 0 30px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.content-container {
  position: relative;
  text-align: left;
  padding: 40px;
  border-radius: 8px;
  min-width: 1000px;
  border: 1px solid var(--vp-c-brand-2);
  backdrop-filter: blur(5px);
  margin: 0 auto;
  background: var(--vp-c-bg-soft);
}

.intro-text {
  color: var(--vp-c-brand);
  font-size: 28px;
  margin-bottom: 10px;
}

.team-name {
  font-size: 58px;
  margin-bottom: 0;
  font-weight: 700;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
}

.typing-container {
  min-height: 60px;
  min-width: 40ch;
  overflow: hidden;
}

.typing-text {
  font-size: 28px;
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
