<template>
  <div class="timeline-page">

    <!-- BACKGROUND (optional video) -->
    <video
      class="bg-video"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
      preload="none"
    ></video>

    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <!-- LEFT PANEL -->
    <div class="panel">

      <!-- HEADER -->
      <header class="top">
        <div class="status">SYSTEM LOG</div>
        <h1>TIMELINE</h1>
        <p class="subtitle">DEVELOPMENT JOURNEY</p>
      </header>

      <!-- TIMELINE -->
      <div class="timeline">

        <div
          v-for="(t, i) in items"
          :key="i"
          class="item"
        >
          <div class="dot"></div>

          <div class="content">
            <div class="year">{{ t.year }}</div>
            <h2>{{ t.title }}</h2>
            <p>{{ t.desc }}</p>

            <div class="tags">
              <span v-for="tag in t.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import videoSrc from '../assets/videos/persona-p3-timeline.mp4'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'

onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

  videoSrc.value = new URL(
    '../assets/videos/persona-p3-skill.mp4',
    import.meta.url
  ).href

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
})

const items = ref([
  {
    year: '2024',
    title: 'Started Web Development',
    desc: 'Learned HTML, CSS, JavaScript fundamentals.',
    tags: ['HTML', 'CSS', 'JS']
  },
  {
    year: '2025',
    title: 'Vue + Backend Journey',
    desc: 'Built full-stack apps using Vue, NestJS, MongoDB.',
    tags: ['Vue', 'NestJS', 'MongoDB']
  },
  {
    year: '2026',
    title: 'Portfolio System',
    desc: 'Created Persona-style interactive UI portfolio.',
    tags: ['Vue', 'UI/UX', 'Animation']
  }
])
</script>

<style scoped>

/* PAGE */
.timeline-page {
  height: 100vh;
  overflow: hidden;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
}

/* BACKGROUND VIDEO */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* DARK OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
}

/* LEFT PANEL */
.panel {
  position: fixed;
  left: 0;
  top: 60px;
  width: 42%;
  height: 100vh;
  padding: 40px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;
}

/* HEADER */
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
  opacity: 0.7;
}

/* TIMELINE */
.timeline {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
}

/* vertical line */
.timeline::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 0;
  width: 2px;
  height: 100%;
  background: #ff2e63;
  opacity: 0.5;
}

.item {
  display: flex;
  gap: 18px;
  position: relative;
  padding-left: 20px;
}

/* dot */
.dot {
  width: 12px;
  height: 12px;
  background: #ff2e63;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

/* content card */
.content {
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 14px;
  transform: skewX(-6deg);
  width: 100%;
}

/* year */
.year {
  color: #ff2e63;
  font-weight: bold;
  font-size: 0.9rem;
}

/* tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tags span {
  background: #ff2e63;
  padding: 4px 8px;
  font-size: 0.7rem;
  transform: skewX(-10deg);
}

/* ===== ANIMATION ===== */
.panel {
  animation: panelEnter 0.6s ease-out forwards;
}

@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateX(-90px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.top {
  opacity: 0;
  animation: headerEnter 0.5s ease-out forwards;
  animation-delay: 0.15s;
}

@keyframes headerEnter {
  from {
    opacity: 0;
    transform: translateX(-40px) skewX(-10deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-10deg);
  }
}

.timeline::before {
  transform: scaleY(0);
  transform-origin: top;
  animation: lineDraw 0.7s ease forwards;
  animation-delay: 0.25s;
}

@keyframes lineDraw {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

.item {
  opacity: 0;
  animation: itemEnter 0.45s ease forwards;
}

/* stagger like memory unlock */
.item:nth-child(1) { animation-delay: 0.3s; }
.item:nth-child(2) { animation-delay: 0.4s; }
.item:nth-child(3) { animation-delay: 0.5s; }
.item:nth-child(4) { animation-delay: 0.6s; }

@keyframes itemEnter {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.dot {
  animation: dotPulse 1.5s ease-in-out infinite;
}

@keyframes dotPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 46, 99, 0);
  }
  50% {
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(255, 46, 99, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 46, 99, 0);
  }
}
</style>