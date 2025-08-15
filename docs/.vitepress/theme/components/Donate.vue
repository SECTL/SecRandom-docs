<template>
  <div class="title">
      <h1>捐赠</h1>
  </div>

  <div class="donate-container">
    <h1>支持我，温暖继续</h1>
    <p>每一份捐赠都是动力，让我们一起创造更美好的内容！</p>

    <div class="qrcode-container">
      <div class="qrcode-wrapper">
        <img class="qrcode" src="/wechat.png" alt="微信捐赠">
        <div class="tip">微信扫码捐赠</div>
      </div>
      <div class="qrcode-wrapper">
        <img class="qrcode" src="/alipay.png" alt="支付宝捐赠">
        <div class="tip">支付宝扫码捐赠</div>
      </div>
    </div>

    <p class="thanks">感谢你的支持！❤️</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // ===============================
  // 🔥终极暴力禁用 Medium-Zoom，多重保险
  // ===============================
  const killMediumZoom = () => {
    // 1. 销毁已有实例
    if (window.mediumZoom) {
      window.mediumZoom.detach()
      window.mediumZoom = null
    }

    // 2. 全局覆盖 mediumZoom
    Object.defineProperty(window, 'mediumZoom', {
      get() { return () => {} },
      set() {},
    })

    // 3. 替换所有图片节点，移除残留事件
    document.querySelectorAll('img').forEach(img => {
      const clone = img.cloneNode(true)
      img.replaceWith(clone)
    })
  }

  // 4. 延迟多次执行，覆盖任何初始化
  setTimeout(killMediumZoom, 50)
  setTimeout(killMediumZoom, 300)
  setTimeout(killMediumZoom, 1000)

  // ===============================
  // 🔹自定义点击放大逻辑
  // ===============================
  const wrappers = document.querySelectorAll('.qrcode-wrapper')
  wrappers.forEach(wrapper => {
    wrapper.style.cursor = 'pointer'
    wrapper.addEventListener('click', e => {
      e.stopPropagation() // 阻止任何冒泡，确保 Medium-Zoom 不触发

      const img = wrapper.querySelector('img')
      const overlay = document.createElement('div')
      overlay.className = 'modal-overlay'

      const modal = document.createElement('div')
      modal.className = 'modal-card'

      // 统一尺寸，保证视觉一致
      const size = 320
      modal.innerHTML = `
        <img src="${img.src}" style="width:${size}px;height:${size}px;object-fit:contain;">
        <div class="modal-title">SecRandom团队再次感谢您的支持</div>
        <div class="modal-subtitle">点击周围空白关闭</div>
      `

      overlay.appendChild(modal)
      document.body.appendChild(overlay)

      overlay.addEventListener('click', ev => {
        if (ev.target === overlay) document.body.removeChild(overlay)
      })
    })
  })
})
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
}

.title h1 {
  font-size: 2.5rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0rem;
}

.donate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vp-c-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px 60px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  position: relative;
  z-index: 10;
  margin: 40px 0;
}

h1 {
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 20px 0;
  text-align: center;
}

p {
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 30px 0;
}

.thanks {
  margin-top: 25px;
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
}

.qrcode-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--vp-c-bg-alt);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qrcode-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
}

.qrcode {
  width: 250px;
  height: 250px;
  border-radius: 16px;
  margin-bottom: 10px;
  object-fit: cover;
}

.tip {
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
}

@media(max-width:768px) {
  .donate-container {
    padding: 30px 20px;
  }

  .qrcode-container {
    gap: 20px;
  }

  .qrcode {
    width: 110px;
    height: 110px;
  }
}
</style>

<style>
.modal-overlay {
  position: fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,0.45);
  z-index:9999;
}

.modal-card {
  background:var(--vp-c-bg,#fff);
  border-radius:20px;
  padding:16px;
  box-shadow:0 20px 60px rgba(0,0,0,0.25);
  max-width:90vw;
  max-height:90vh;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.modal-card img {
  display: block;
  border-radius: 12px;
}

.modal-title {
  margin-top: 12px;
  font-weight: 600;
  text-align: center;
}

.modal-subtitle {
  margin-top: 6px;
  font-size: 12px;
  opacity: .7;
  text-align: center;
}
</style>
