<template>
  <div class="skill-page">

    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
    />

    <BackBtn />
    <IntroSlash />

    <!-- LEFT PANEL (NEW WRAPPER) -->
    <div class="panel" :class="{ enter: pageReady }">

      <!-- BACKGROUND SLASH LAYER -->
      <div class="bg-slash"></div>

      <!-- HEADER -->
      <header class="top">
        <div class="status">STATUS</div>
        <h1>SKILLS</h1>
        <p class="subtitle">DEVELOPER</p>
      </header>

      <!-- MAIN GRID -->
      <div class="grid">

        <!-- PROFILE -->
        <section class="card profile" :style="{ '--i': 0 }">
          <div class="avatar-wrap">
            <div class="avatar-ring"></div>
            <img src="../assets/images/profile.png" class="avatar" />
          </div>

          <div class="info">
            <h2>YAGAMI DEVILATHAN</h2>
            <p>STUDENT</p>

            <div class="level">
              LEVEL <span>22</span>
            </div>
          </div>
        </section>

        <!-- SKILLS -->
        <section class="card skills" :style="{ '--i': 1 }">
          <div class="title">TECHNICAL SKILLS</div>

          <div v-for="s in skills" :key="s.name" class="skill">
            <div class="row">
              <span>{{ s.name }}</span>
              <span>{{ s.level }}%</span>
            </div>

            <div class="bar">
              <div class="fill" :style="{ width: s.level + '%' }"></div>
            </div>
          </div>
        </section>

        <!-- TAGS -->
        <section class="card tags" :style="{ '--i': 2 }">
          <div class="title">SPECIALIZATION</div>

          <div class="tag-list">
            <span>Vue</span>
            <span>NestJS</span>
            <span>Flutter</span>
            <span>MongoDB</span>
            <span>Docker</span>
            <span>Azure</span>
          </div>
        </section>

        <!-- XP -->
        <section class="card xp" :style="{ '--i': 3 }">
          <div class="title">EXPERIENCE</div>

          <div class="xp-text">168 / 10000 XP</div>

          <div class="xp-bar">
            <div class="xp-fill"></div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import BackBtn from "../components/BackBtn.vue"
import IntroSlash from "../components/IntroSlash.vue"

import { videos } from "../config/videos"
import { useVideoManager } from "../composables/useVideoManager"

const skills = [
  { name: "Vue.js", level: 50 },
  { name: "TypeScript", level: 40 },
  { name: "NestJS", level: 30 },
  { name: "MongoDB", level: 20 },
  { name: "Flutter", level: 10 },
  { name: "Docker", level: 5 }
]

const isMobile = ref(false)
const pageReady = ref(false)

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches

  setVideo(videos.skill)

  requestAnimationFrame(() => {
    pageReady.value = true
  })
})

onBeforeUnmount(() => {
  clearVideo()
})
</script>

<style scoped>
/* ================= BASE ================= */
.skill-page {
  min-height: 100vh;
  color: white;
  font-family: Impact, Arial Black, sans-serif;
  padding: 40px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  overflow-x: hidden;
}

.skill-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
  pointer-events: none;
}

/* ================= BACKGROUND VIDEO ================= */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

/* ================= PANEL ================= */
.panel {
  position: fixed;
  top: 30px;
  left: 0;
  width: 40%;
  height: calc(100vh - 60px);

  padding: 40px;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 10;

  scrollbar-width: none;
  -ms-overflow-style: none;

  /* FIX: DO NOT LOCK VISIBILITY HERE */
  opacity: 1;
  transform: translateX(-40px);
}

.panel::-webkit-scrollbar {
  display: none;
}

/* ================= ENTER ANIMATION ================= */
.panel.enter {
  animation: panelIn 0.6s ease forwards;
}

@keyframes panelIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ================= BACKGROUND SLASH ================= */
.bg-slash {
  position: absolute;
  width: 120%;
  height: 120%;
  transform: skewY(-12deg);
  top: -20%;
  left: -10%;
  opacity: 0.15;
}

/* ================= HEADER ================= */
.top {
  position: relative;
  z-index: 2;
  top: 30px;
  margin-bottom: 40px;

  opacity: 0;
  transform: translateX(-20px);
}

.panel.enter .top {
  animation: headerIn 0.5s ease forwards;
  animation-delay: 0.1s;
}

@keyframes headerIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.status {
  color: #ff2e63;
  letter-spacing: 4px;
  font-weight: 900;
}

.top h1 {
  font-size: 5rem;
  margin: 0;
  color: white;
  transform: skewX(-10deg);
}

.subtitle {
  opacity: 0.7;
}

/* ================= GRID ================= */
.grid {
  display: grid;
  gap: 20px;
}

/* ================= CARD ================= */
.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 20px;
  transform: skewX(-6deg);
  overflow: hidden;

  opacity: 0;
  transform: translateX(-30px) skewX(-6deg);
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

.panel.enter .card {
  animation: cardIn 0.5s ease forwards;
  animation-delay: calc(var(--i) * 0.12s);
}

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateX(0) skewX(-6deg);
  }
}

/* ================= PROFILE ================= */
.profile {
  display: flex;
  align-items: center;
  gap: 25px;
}

.avatar-wrap {
  position: relative;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border: 2px solid #ff2e63;
  animation: spin 10s linear infinite;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.info h2 {
  margin: 0;
  font-size: 2rem;
}

.level {
  margin-top: 10px;
  background: #ff2e63;
  padding: 6px 12px;
  display: inline-block;
  font-weight: 900;
}

/* ================= SKILLS ================= */
.title {
  color: #ff2e63;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.skill {
  margin-bottom: 15px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.bar {
  height: 10px;
  background: #1a1d2e;
  margin-top: 6px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #ff2e63, #ff7a18);
}

/* ================= TAGS ================= */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-list span {
  background: #ff2e63;
  padding: 6px 10px;
  font-size: 0.8rem;
  transform: skewX(-10deg);
}

/* ================= XP ================= */
.xp-text {
  margin-bottom: 10px;
}

.xp-bar {
  height: 10px;
  background: #1a1d2e;
}

.xp-fill {
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, #ff2e63, #ff7a18);
}

/* ================= ANIMATION ================= */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ================= TABLET ================= */
@media (max-width: 1024px) {
  .panel {
    width: 55%;
    padding: 30px;
  }

  .top h1 {
    font-size: 3.8rem;
  }
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .skill-page {
    padding: 15px;
  }

  .panel {
    width: 90%;
    left: 50%;
    top: 30px;

    transform: translateX(-50%) translateY(-10px);
    padding: 20px;

    height: calc(100vh - 40px);
  }

  /* fix animation conflict on mobile */
  .panel.enter {
    animation: panelInMobile 0.6s ease forwards;
  }

  @keyframes panelInMobile {
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .top h1 {
    font-size: 2.8rem;
  }

  .profile {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 90px;
    height: 90px;
  }
}
</style>