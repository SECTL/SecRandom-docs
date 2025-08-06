<template>
  <div class="bilibili-video-card">
    <div class="video-wrapper">
        <iframe
        :src="`https://player.bilibili.com/player.html?isOutside=true&bvid=${bvid}&p=1&high_quality=1&danmaku=0&autoplay=0&loop=0`"
        frameborder="no"
        allowfullscreen
        ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BilibiliVideo',
  props: {
    bvid: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.bilibili-video-card {
  margin: 2rem auto;
  border: 2px solid #eee;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  background: #fafbfc;
  overflow: hidden;
}
.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>