<template>
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
    el.addEventListener('click', ()=>{
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-card';
    modal.innerHTML = `
      <img src="${el.querySelector('img').src}" alt="二维码">
      <div class="modal-title">SecRandom团队再次感谢您的支持</div>
      <div class="modal-subtitle">点击周围空白关闭</div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // 点击空白关闭
    overlay.addEventListener('click', (e)=>{
      if(e.target===overlay){
        document.body.removeChild(overlay);
      }
    });
  });
});
</script>

<style scoped>
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
  font-size: 0.9rem;
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
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qrcode-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
}

.qrcode {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  margin-bottom: 10px;
  object-fit: cover;
}

.tip {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .donate-container { padding: 30px 20px; }
  .qrcode-container { gap: 20px; }
  .qrcode { width: 110px; height: 110px; }
}
</style>
