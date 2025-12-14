---
title: 团队
aside: false
editLink: false
---

<TeamCard />

<CardGrid>
    <LinkCard title="作者" href="https://github.com/lzy98276">
        <div class="card-content">
            <img src="/avatar/lzy.jpg" alt="lzy" width="80" />
            <div class="text-content">
                <p class="name rainbow-name" id="rainbow-name">黎泽懿 Aionflux</p>
                <p class="role">设计 & 创意 & 策划 & 维护 & 文档 & 测试</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://github.com/chenjintang-shrimp">
        <div class="card-content">
            <img src="/avatar/chenjintang.jpg" alt="chenjintang" width="80" />
            <div class="text-content">
                <p class="name">chenjintang</p>
                <p class="role">SecRandomの义父 & 维护</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://github.com/QiKeZhiCao">
        <div class="card-content">
            <img src="/avatar/qgzc.png" alt="qgzc" width="80" />
            <div class="text-content">
                <p class="name">弃稞之草</p>
                <p class="role">创意 & 维护</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://github.com/Fox-block-offcial">
        <div class="card-content">
            <img src="/avatar/slc.jpg" alt="slc" width="80" />
            <div class="text-content">
                <p class="name">Fox-block</p>
                <p class="role">应用测试</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://github.com/yuanbenxin">
        <div class="card-content">
            <img src="/avatar/bx.jpg" alt="bx" width="80" />
            <div class="text-content">
                <p class="name">本新同学</p>
                <p class="role">响应式前端页面设计及维护 & 文档</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://github.com/LeafS825">
        <div class="card-content">
            <img src="/avatar/yby.jpg" alt="yby" width="80" />
            <div class="text-content">
                <p class="name">叶背影</p>
                <p class="role">创意 & 文档</p>
            </div>
        </div>
    </LinkCard>
    <LinkCard title="贡献者" href="https://www.jursin.top">
        <div class="card-content">
            <img src="/avatar/Jursin.jpg" alt="Jursin" width="80" />
            <div class="text-content">
                <p class="name">Jursin</p>
                <p class="role">响应式前端页面设计及维护 & 文档</p>
            </div>
        </div>
    </LinkCard>
</CardGrid>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let animationId = null;

// 速度控制：每帧色调变化量（越大越快）
const HUE_STEP = 1;

onMounted(() => {
  const el = document.getElementById('rainbow-name');
  if (!el) return;
  
  let hue = 0;
  
  function animate() {
    el.style.color = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + HUE_STEP) % 360;
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.card-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-content img {
  border-radius: 50%;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: 1.3em;
  font-weight: 600;
  margin: 0;
  transition: color 0.08s linear;
}

.rainbow-name {
  color: hsl(0, 100%, 50%);
}

.role {
  font-size: 1em;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
