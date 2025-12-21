---
pageLayout: page
title: 落魄小龙在线要饭
---

<style>
.fancy-begging-bg {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 80px 0;
  overflow: hidden;
}
.fancy-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
}
.fancy-begging-bg > *:not(.fancy-bg-video) {
  position: relative;
  z-index: 1;
}
.fancy-title {
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ffea00, #ff00cc, #00ffe7, #ffea00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-text 3s linear infinite;
  text-shadow: 0 0 20px #fff, 0 0 40px #ff00cc;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  padding: 0.5em 0;
  overflow: visible;
  box-sizing: content-box;
}
@keyframes rainbow-text {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.fancy-desc {
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 10px #ff00cc, 0 0 20px #00ffe7;
  margin-bottom: 2rem;
  filter: blur(0.5px);
}
.fancy-btn {
  font-size: 2rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 2rem;
  background: linear-gradient(90deg, #ff00cc, #ffea00, #00ffe7, #ff00cc);
  background-size: 300% 300%;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 20px #ff00cc, 0 0 40px #00ffe7;
  animation: btn-glow 2s linear infinite;
  transition: transform 0.2s;
}
.fancy-btn:hover {
  transform: scale(1.1) rotate(-2deg);
  filter: blur(0.5px);
}
@keyframes btn-glow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.fancy-emoji {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px #ffea00);
  animation: emoji-bounce 1.2s infinite alternate;
}
@keyframes emoji-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px) scale(1.2); }
}
</style>

<div class="fancy-begging-bg">
  <video class="fancy-bg-video" src="/donate-fancy/qznz.mp4" autoplay loop muted playsinline></video>
  <div class="fancy-title">落魄小龙在线要饭</div>
  <div class="fancy-emoji">🐉💸🥺</div>
  <div class="fancy-desc" style="margin-bottom:1.5rem;">小龙最近实在太穷了，饭都快吃不起了！</div>
  <div class="fancy-desc">请好心人打赏一口饭钱，让小龙重拾生活的希望！</div>
  <a href="https://afdian.com/a/lzy0983" class="fancy-btn">立即打赏</a>
  <div class="fancy-desc" style="font-size:1.2rem;margin-top:2rem;filter:blur(1px);">（您的每一分善意，都是小龙前进的动力！）</div>
</div>
