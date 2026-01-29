---
pageLayout: page
title: Donate
---

<div class="title">
  <h1>Donate</h1>
</div>
<div class="donate-container">
  <p>Your donation helps us continue developing and improving SecRandom.</p>

  <a href="https://afdian.com/a/lzy0983" target="_blank" class="donate-btn afdian-button">Donate on Afdian
  </a>

  <p class="thanks">Thanks for your support!❤️</p>
</div>

<style scoped>
.title {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 15px;
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
</style>