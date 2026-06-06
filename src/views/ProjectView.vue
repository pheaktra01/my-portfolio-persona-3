<template>
  <div class="project-page">

    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/project.jpg"
      preload="metadata"
    ></video>
    
    <!-- DARK OVERLAY -->
    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <!-- LEFT PANEL -->
    <div class="panel" ref="panelRef">

      <!-- HEADER -->
      <header class="top">
        <div class="status">PROJECT FILES</div>
        <h1>PROJECTS</h1>
        <p class="subtitle">PERSONA ARCHIVE</p>
      </header>

      <!-- PROJECT LIST -->
      <div class="grid">

        <div
          v-for="(p, i) in projects"
          :key="p.title"
          class="card"
          @mouseenter="active = i"
          @mouseleave="active = null"
          :class="{ active: active === i }"
        >
          <div class="slash"></div>

          <div class="content">
            <h2>{{ p.title }}</h2>
            <p>{{ p.desc }}</p>

            <div class="tags">
              <span v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>

            <button class="open-btn">VIEW</button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  setVideo(videos.project)
})

onBeforeUnmount(() => {
  clearVideo()
})

// onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
// })

const active = ref<number | null>(null)

const projects = [
  {
    title: 'Anime Streaming App',
    desc: 'Vue + NestJS full-stack streaming platform.',
    tags: ['Vue', 'NestJS', 'MongoDB']
  },
  {
    title: 'Diabetes Tracker',
    desc: 'Health monitoring app with analytics dashboard.',
    tags: ['Flutter', 'Firebase']
  },
  {
    title: 'Portfolio System',
    desc: 'Persona-style interactive portfolio UI.',
    tags: ['Vue', 'CSS', 'Animation']
  }
]
</script>

<style scoped>

/* PAGE */
.project-page {
  padding-top: 20px;
  overflow: hidden;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
  height: 100%;
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
  pointer-events: none;
}

/* LEFT PANEL */
.panel {
  position: fixed;
  left: 0;
  top: 60px;
  width: 42%;
  height: calc(100vh - 60px);
  padding: 40px;
  overflow-y: auto;
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

/* GRID */
.grid {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 30px;
}

/* CARD */
.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 18px;
  transform: skewX(-6deg);
  overflow: hidden;
  transition: 0.2s;
}

/* Persona red slash */
.slash {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

/* hover effect */
.card:hover {
  transform: skewX(-6deg) translateX(10px);
  border-color: #ff2e63;
}

/* text */
.content h2 {
  margin: 0;
  font-size: 1.5rem;
}

.content p {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* tags */
.tags {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tags span {
  background: #ff2e63;
  padding: 4px 8px;
  font-size: 0.7rem;
  transform: skewX(-10deg);
}

/* button */
.open-btn {
  margin-top: 10px;
  background: transparent;
  border: 1px solid #ff2e63;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
}

.open-btn:hover {
  background: #ff2e63;
}

/* scrollbar hide */
.panel::-webkit-scrollbar {
  display: none;
}

.btn-bg-slash {
  position: absolute;
  inset: 0;
  background: #ff4a73;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  z-index: 1;
}

.text-layer {
  position: relative;
  z-index: 2;
}

.text-layer.shadow {
  position: absolute;
  color: black;
  transform: translate(3px, 2px) skewX(-10deg);
}

.text-layer.main {
  color: #61e1ff;
}

/* ===== Animation ===== */
.panel {
  animation: panelEnter 0.55s ease-out forwards;
}

@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateX(-80px);
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

.card {
  opacity: 0;
  animation: cardEnter 0.4s ease-out forwards;
}

/* stagger like Persona menu */
.card:nth-child(1) { animation-delay: 0.25s; }
.card:nth-child(2) { animation-delay: 0.35s; }
.card:nth-child(3) { animation-delay: 0.45s; }
.card:nth-child(4) { animation-delay: 0.55s; }
.card:nth-child(5) { animation-delay: 0.65s; }

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(-60px) skewX(-6deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-6deg);
  }
}

.card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: skewX(-6deg) translateX(10px) scale(1.02);
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  .project-page {
    padding: 10px;
  }

  .panel {
    width: 90%;
    left: 50%;
    top: 60px;

    height: calc(100vh - 40px);
    padding: 20px;

    transform: translateX(-50%) translateY(-10px);

    /* override desktop animation conflict */
    animation: panelEnterMobile 0.55s ease-out forwards;
  }

  @keyframes panelEnterMobile {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .top h1 {
    font-size: 2.6rem;
  }

  .grid {
    gap: 12px;
  }

  .card {
    padding: 14px;
  }

  .content h2 {
    font-size: 1.2rem;
  }

  .tags span {
    font-size: 0.65rem;
  }

  .open-btn {
    width: 100%;
  }
}
</style>