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

  <a href="https://afdian.com/a/lzy0983" target="_blank" class="donate-btn">
    <button class="afdian-button">💝 点击进入爱发电支持</button>
  </a>

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

.donate-btn {
  margin: 30px 0;
  text-decoration: none;
}

.afdian-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 1.1rem;
  border-radius: 28px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.afdian-button:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
  opacity: 0.95;
}

.afdian-button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .donate-container {
    padding: 30px 20px;
  }
  
  .afdian-button {
    padding: 12px 32px;
    font-size: 1rem;
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
