<template>
  <div class="calendar-page">

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
import { onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'

const videoSrc = ref('')

onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

  videoSrc.value = new URL(
    '../assets/videos/persona-p3-calendar.mp4',
    import.meta.url
  ).href

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
})

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
  height: 100vh;

  padding: 40px;

  overflow-y: auto;
  overflow-x: hidden;

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
</style>