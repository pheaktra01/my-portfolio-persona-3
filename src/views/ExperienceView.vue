<template>
  <div class="exp-page">

    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
      preload="none"
    ></video>

    <BackBtn />
    <IntroSlash />
    <!-- DARK OVERLAY -->
    <div class="overlay"></div>

    <!-- PANEL -->
    <div class="panel">

      <!-- HEADER -->
      <header class="top">
        <div class="status">MISSION LOG</div>
        <h1>EXPERIENCE</h1>
        <p class="subtitle">SYSTEM HISTORY</p>
      </header>

      <!-- TIMELINE -->
      <div class="timeline">

        <div
          v-for="(e, i) in experience"
          :key="e.title"
          class="card"
          :style="{ animationDelay: i * 0.08 + 's' }"
        >

          <div class="line"></div>

          <div class="content">

            <div class="header">
              <h2>{{ e.title }}</h2>
              <span class="date">{{ e.date }}</span>
            </div>

            <p class="company">{{ e.company }}</p>
            <p class="desc">{{ e.desc }}</p>

            <div class="tags">
              <span v-for="t in e.tags" :key="t">{{ t }}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import videoSrc from '../assets/videos/persona-p3-experience.mp4'
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

const experience = [
  {
    title: 'Frontend Developer',
    company: 'Freelance Projects',
    date: '2024 - Present',
    desc: 'Building Vue.js applications with modern UI systems and Persona-style interfaces.',
    tags: ['Vue', 'TypeScript', 'UI Design']
  },
  {
    title: 'Backend Developer',
    company: 'NestJS Learning Projects',
    date: '2023 - 2024',
    desc: 'Developed REST APIs, authentication systems, and database architecture.',
    tags: ['NestJS', 'MongoDB', 'API']
  },
  {
    title: 'Mobile Developer',
    company: 'Flutter Practice',
    date: '2023',
    desc: 'Created simple mobile apps with UI/UX focus and state management.',
    tags: ['Flutter', 'Dart']
  }
]
</script>

<style scoped>

/* PAGE */
.exp-page {
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

/* OVERLAY */
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

  width: 45%;
  height: 100vh;

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

/* TIMELINE */
.timeline {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* CARD */
.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 16px;
  transform: skewX(-6deg);
  overflow: hidden;

  animation: slideIn 0.4s ease forwards;
  opacity: 0;
}

/* red line */
.line {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card h2 {
  margin: 0;
  font-size: 1.3rem;
}

.date {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* TEXT */
.company {
  color: #ff2e63;
  font-size: 0.9rem;
  margin-top: 4px;
}

.desc {
  font-size: 0.85rem;
  opacity: 0.85;
}

/* TAGS */
.tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags span {
  background: #ff2e63;
  padding: 4px 8px;
  font-size: 0.7rem;
  transform: skewX(-10deg);
}

/* ANIMATION */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px) skewX(-6deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-6deg);
  }
}

/* scrollbar hidden */
.panel::-webkit-scrollbar {
  display: none;
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

.timeline {
  opacity: 0;
  animation: timelineEnter 0.4s ease-out forwards;
  animation-delay: 0.2s;
}

@keyframes timelineEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  opacity: 0;
  animation: cardEnter 0.45s ease forwards;
}

/* stagger feel */
.card:nth-child(1) { animation-delay: 0.25s; }
.card:nth-child(2) { animation-delay: 0.35s; }
.card:nth-child(3) { animation-delay: 0.45s; }
.card:nth-child(4) { animation-delay: 0.55s; }
.card:nth-child(5) { animation-delay: 0.65s; }

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

.exp-page::after {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 46, 99, 0.08) 50%,
    transparent 100%
  );

  animation: scanMove 3s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes scanMove {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
</style>