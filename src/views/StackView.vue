<template>
  <div class="stack-page">

    <BackBtn />
    <IntroSlash />
    <div v-if="showSlash" class="page-slash-enter"></div>

    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/stack.jpg"
      preload="metadata"
    ></video>

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- LEFT PANEL -->
    <div class="panel">

      <!-- FIXED HEADER -->
      <header class="top">
        <div class="status">SYSTEM STATUS</div>
        <h1>STACK</h1>
        <p class="subtitle">DEVELOPMENT LOADOUT</p>
      </header>

      <!-- SCROLL AREA ONLY -->
      <div class="scroll-area">

        <div class="grid">
          <div
            v-for="item in stack"
            :key="item.name"
            class="card"
          >
            <div class="slash"></div>

            <div class="content">
              <h2>{{ item.name }}</h2>
              <p>{{ item.desc }}</p>

              <div class="bar">
                <div class="fill" :style="{ width: item.level + '%' }"></div>
              </div>

              <span class="percent">{{ item.level }}%</span>
            </div>
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
  setVideo(videos.stack)
})

onBeforeUnmount(() => {
  clearVideo()
})

// onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

  // videoSrc.value = new URL(
  //   '../assets/videos/persona-p3-stack.mp4',
  //   import.meta.url
  // ).href

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
// })

const stack = [
  { name: 'Vue.js', desc: 'Frontend framework', level: 80 },
  { name: 'TypeScript', desc: 'Type-safe JavaScript', level: 70 },
  { name: 'NestJS', desc: 'Backend API framework', level: 60 },
  { name: 'MongoDB', desc: 'NoSQL database system', level: 55 },
  { name: 'Flutter', desc: 'Mobile UI toolkit', level: 40 },
  { name: 'Docker', desc: 'Containerization system', level: 35 },
  { name: 'Azure', desc: 'Cloud deployment platform', level: 30 }
]

const showSlash = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSlash.value = false
  }, 650)
})
</script>

<style scoped>

/* PAGE */
.stack-page {
  height: 100vh;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
  overflow: hidden;
}

/* VIDEO */
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

/* PANEL */
.panel {
  position: fixed;
  left: 0;
  top: 60px;

  width: 42%;
  height: calc(100vh - 60px);

  padding: 40px;
  padding-bottom: 120px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;

  box-sizing: border-box;

  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.panel::-webkit-scrollbar {
  display: none;
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
  gap: 16px;
  margin-top: 30px;
}

* {
  box-sizing: border-box;
}

/* CARD */
.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 16px;
  transform: skewX(-6deg);
  overflow: hidden;
  transition: 0.2s ease;
}

/* SLASH */
.slash {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

/* hover */
.card:hover {
  transform: skewX(-6deg) translateX(8px);
  border-color: #ff2e63;
}

/* content */
.content h2 {
  margin: 0;
  font-size: 1.4rem;
}

.content p {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* progress bar */
.bar {
  height: 8px;
  background: #1a1d2e;
  margin-top: 10px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #ff2e63, #ff7a18);
}

/* percent */
.percent {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
  margin-top: 6px;
}

/* scrollbar hidden */
.panel::-webkit-scrollbar {
  display: none;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  .panel {
    width: 90%;
    left: 50%;
    top: 60px;

    height: calc(100vh - 80px);

    padding: 20px;
    padding-bottom: 120px;

    overflow-y: auto;
    overflow-x: hidden;

    transform: translateX(-50%);

    box-sizing: border-box;

    -webkit-overflow-scrolling: touch;
  }

  /* header scaling */
  .top h1 {
    font-size: 2.6rem;
  }

  .status {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  /* cards spacing */
  .grid {
    gap: 12px;
  }

  .card {
    padding: 14px;
  }

  .content h2 {
    font-size: 1.2rem;
  }

  .content p {
    font-size: 0.8rem;
  }

  .percent {
    font-size: 0.75rem;
  }
}
</style>