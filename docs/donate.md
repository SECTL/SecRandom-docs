---
pageLayout: page
title: 捐赠
---

<div class="title">
  <h1>捐赠</h1>
</div>

<div class="donate-container">
  <h1>支持我，温暖继续</h1>
  <p>每一份捐赠都是动力，让我们一起创造更美好的内容！</p>

  <div class="qrcode-container">
    <div class="qrcode-wrapper">
      <img class="qrcode" src="/images/wechat.png" alt="微信捐赠">
      <div class="tip">微信扫码捐赠</div>
    </div>
    <div class="qrcode-wrapper">
      <img class="qrcode" src="/images/alipay.png" alt="支付宝捐赠">
      <div class="tip">支付宝扫码捐赠</div>
    </div>
  </div>

  <p class="thanks">感谢你的支持！❤️</p>
</div>

<style scoped>
.title {
  text-align: center;
  padding-top: 60px;
}

.title h1 {
  font-size: 2.5rem;
  color: var(--vp-c-brand-1);
  padding: 0;
}

.donate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vp-c-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  position: relative;
  z-index: 10;
}

h1, p, .tip, .thanks {
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  padding: 0.5rem 0;
}

p {
  margin: 0 0 30px 0;
}

.thanks {
  margin-top: 25px;
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

@media (max-width: 768px) {
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

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
}

.modal-card {
  background: var(--vp-c-bg, #fff);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  opacity: 0.7;
  text-align: center;
}
</style>
