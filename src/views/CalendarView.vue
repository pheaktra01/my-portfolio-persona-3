<template>
  <div class="calendar-page">

    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/calendar.jpg"
      preload="metadata"
    ></video>

    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <div class="panel">

      <header class="top">
        <div class="status">DATE RECORD</div>
        <h1>CALENDAR</h1>
        <p class="subtitle">IMPORTANT EVENTS</p>
      </header>

      <div class="calendar-grid">

        <div
          v-for="(event, i) in events"
          :key="event.date"
          class="day-card"
          :style="{ animationDelay: i * 0.08 + 's' }"
        >
          <div class="date">
            {{ event.date }}
          </div>

          <div class="content">
            <h2>{{ event.title }}</h2>
            <p>{{ event.description }}</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'

import { useVideoManager } from "../composables/useVideoManager.ts"

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  setVideo(videos.calendar)
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

const events = [
  {
    date: '2024-09',
    title: 'Started Vue.js',
    description: 'Began learning Vue and component architecture.'
  },
  {
    date: '2025-01',
    title: 'NestJS Project',
    description: 'Built first full-stack application.'
  },
  {
    date: '2025-05',
    title: 'Automata Theory Project',
    description: 'Created finite automata management system.'
  },
  {
    date: '2025-06',
    title: 'AniSuki Development',
    description: 'Started anime streaming platform.'
  },
  {
    date: '2026-06',
    title: 'Persona Portfolio',
    description: 'Released Persona 3 themed portfolio.'
  }
]
</script>

<style scoped>

.calendar-page {
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
  height: calc(100vh - 60px);

  padding: 40px 40px 120px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;

  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* ================= SCROLL FIX ================= */
.panel {
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 120px;

  box-sizing: border-box;

  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.panel::-webkit-scrollbar {
  display: none;
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

.calendar-grid {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.day-card {
  background: #0d0f1a;
  border: 2px solid #1a1d2e;

  transform: skewX(-6deg);

  display: flex;
  overflow: hidden;

  transition: .2s;
}

.day-card:hover {
  border-color: #ff2e63;
  transform: skewX(-6deg) translateX(10px);
}

.date {
  background: #ff2e63;

  min-width: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: .9rem;
  font-weight: bold;
}

.content {
  padding: 16px;
}

.content h2 {
  margin: 0;
  font-size: 1.2rem;
}

.content p {
  margin-top: 8px;
  opacity: .8;
  font-size: .9rem;
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

.day-card {
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

.day-card:hover {
  border-color: #ff2e63;
  transform: skewX(-6deg) translateX(12px) scale(1.01);
  transition: 0.15s ease;
}

.day-card::after {
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

.day-card:hover::after {
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

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  .calendar-page {
    overflow: hidden;
  }

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

    animation: panelEnterMobile 0.5s ease-out forwards;
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

  /* HEADER */
  .top h1 {
    font-size: 2.5rem;
  }

  .status {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  /* GRID */
  .calendar-grid {
    gap: 12px;
  }

  /* CARD */
  .day-card {
    flex-direction: column;
  }

  .date {
    width: 100%;
    min-width: unset;
    padding: 8px;
    font-size: 0.8rem;
  }

  .content {
    padding: 12px;
  }

  .content h2 {
    font-size: 1rem;
  }

  .content p {
    font-size: 0.8rem;
  }

  /* hover fix for touch devices */
  .day-card:hover {
    transform: skewX(-6deg);
  }
}
</style>