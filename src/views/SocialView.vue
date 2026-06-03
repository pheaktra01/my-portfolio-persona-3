<template>
  <div class="social-page">

    <video
      class="bg-video"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
    ></video>

    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <div class="panel">

      <header class="top">
        <div class="status">COMMUNICATION LOG</div>
        <h1>SOCIAL LINK</h1>
        <p class="subtitle">CONNECTED NETWORKS</p>
      </header>

      <div class="grid">

        <a
          v-for="(link, i) in links"
          :key="link.name"
          :href="link.url"
          target="_blank"
          class="card"
          :style="{ animationDelay: i * 0.08 + 's' }"
        >
          <div class="slash"></div>

          <div class="content">
            <div class="arcana">{{ link.arcana }}</div>

            <h2>{{ link.name }}</h2>

            <p>{{ link.description }}</p>

            <div class="rank">
              LINK RANK {{ link.rank }}
            </div>
          </div>
        </a>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'

const videoSrc = ref(videos.social)

onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

  // videoSrc.value = new URL(
  //   '../assets/videos/persona-p3-social.mp4',
  //   import.meta.url
  // ).href

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
})

const links = [
  {
    arcana: 'MAGICIAN',
    name: 'GitHub',
    rank: 'MAX',
    description: 'Source code repositories and projects.',
    url: 'https://github.com/pheaktra01'
  },
  {
    arcana: 'PRIESTESS',
    name: 'LinkedIn',
    rank: '08',
    description: 'Professional profile and experience.',
    url: 'https://www.linkedin.com/in/loeng-pheaktra-2b9578413/'
  },
  {
    arcana: 'CHARIOT',
    name: 'Facebook',
    rank: '10',
    description: 'Personal updates and communication.',
    url: 'https://web.facebook.com/loeng.pheaktra'
  },
  {
    arcana: 'STAR',
    name: 'Discord',
    rank: '07',
    description: 'Gaming and development community.',
    url: 'https://discord.com/users/yagami12629'
  }
]
</script>

<style scoped>

.social-page {
  height: 100vh;
  overflow: hidden;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
}

.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: fixed;
  inset: 0;
}

.panel {
  position: fixed;
  left: 0;
  top: 60px;
  width: 42%;
  height: 100vh;
  padding: 40px;
  overflow-y: auto;
  z-index: 2;
}

.top h1 {
  font-size: 4.5rem;
  margin: 0;
  transform: skewX(-10deg);
}

.status {
  color: #ff2e63;
  letter-spacing: 4px;
}

.subtitle {
  opacity: .7;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
}

.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 18px;
  text-decoration: none;
  color: white;

  transform: skewX(-6deg);
  transition: .2s;
}

.card:hover {
  border-color: #ff2e63;
  transform: skewX(-6deg) translateX(10px);
}

.slash {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

.arcana {
  color: #ff2e63;
  letter-spacing: 2px;
  font-size: .8rem;
}

.content h2 {
  margin: 5px 0;
}

.content p {
  opacity: .8;
  font-size: .9rem;
}

.rank {
  margin-top: 10px;
  display: inline-block;
  background: #ff2e63;
  padding: 5px 10px;
  font-size: .75rem;
}

.panel::-webkit-scrollbar {
  display: none;
}

/* ===== ANIMATION ===== */
.panel {
  animation: panelEnter 0.5s ease-out forwards;
  opacity: 0;
}

.top {
  animation: headerEnter 0.5s ease-out forwards;
  animation-delay: 0.15s;
  opacity: 0;
}

@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes headerEnter {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card {
  opacity: 0;
  animation: cardEnter 0.45s ease forwards;
  transform: translateX(-40px) skewX(-6deg);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(-40px) skewX(-6deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-6deg);
  }
}

.card:hover {
  border-color: #ff2e63;
  transform: skewX(-6deg) translateX(12px) scale(1.02);
  transition: 0.15s ease;
}

.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 46, 99, 0.4),
    transparent
  );
  transform: skewX(-20deg);
}

.card:hover::after {
  animation: shine 0.6s ease forwards;
}

@keyframes shine {
  from {
    left: -120%;
  }
  to {
    left: 120%;
  }
}
</style>