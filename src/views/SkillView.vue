<template>
  <div class="skill-page">

    <!-- BACKGROUND VIDEO -->
    <video
      v-if="!isMobile"
      class="bg-video"
      :src="desktopVideoSrc"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <video
      v-else
      class="bg-video"
      :src="mobileVideoSrc"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- LEFT PANEL (NEW WRAPPER) -->
    <div class="panel">

      <button
        class="back-btn"
        @click="goBack"
        @pointerenter="onBackHover"
      >
        <div class="btn-bg-slash"></div>

        <span class="text-layer shadow">BACK</span>
        <span class="text-layer main">BACK</span>
      </button>

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
        <section class="card profile">
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
        <section class="card skills">
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
        <section class="card tags">
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
        <section class="card xp">
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
const skills = [
  { name: 'Vue.js', level: 50 },
  { name: 'TypeScript', level: 40 },
  { name: 'NestJS', level: 30 },
  { name: 'MongoDB', level: 20 },
  { name: 'Flutter', level: 10 },
  { name: 'Docker', level: 5 }
]

import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { playHover, playClick } from '../utils/sound'
import desktopVideoSrc from '../assets/videos/makoto-yuki-persona-3-reload-1-moewalls-com.mp4'
import mobileVideoSrc from '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4'

const router = useRouter()

const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

function goBack() {
  playClick()
  router.push('/')
}

function onBackHover() {
  playHover(isMobile.value)
}
</script>

<style scoped>

/* ================= LEFT HALF PANEL ================= */
.panel {
  position: fixed;
  top: 0;
  left: 0;

  width: 40%;
  height: 100vh;

  padding: 40px;
  box-sizing: border-box; /* 👈 IMPORTANT */

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 10;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* hide scrollbar (Chrome, Edge, Safari) */
.panel::-webkit-scrollbar {
  display: none;
}



/* ================= BASE ================= */
.skill-page {
  min-height: 100vh;
  background: #070a12;
  color: white;
  font-family: Impact, Arial Black, sans-serif;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.skill-page {
  overflow-x: hidden;
}

/* make sure UI is above video */
.skill-page {
  position: relative;
  z-index: 1;
}

.skill-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;

  pointer-events: none;
}

/* ================= BACKGROUND ================= */
.bg-slash {
  position: absolute;
  width: 120%;
  height: 120%;
  background: linear-gradient(120deg, #ff2e63 0%, transparent 60%);
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

/* ================= CARD (PERSONA STYLE) ================= */
.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 20px;
  transform: skewX(-6deg);
  overflow: hidden;
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

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .top h1 {
    font-size: 2.8rem;
  }

  .profile {
    flex-direction: column;
    text-align: center;
  }

  .card {
    transform: none;
  }
}

/* ================= PERSONA BACK BUTTON ================= */
.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 50;

  background: transparent;
  border: none;
  cursor: pointer;

  padding: 10px 18px;

  font-family: 'Impact', 'Arial Black', sans-serif;
  font-style: italic;
  letter-spacing: 2px;

  transform: skewX(-10deg);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.15s ease;
}

/* hover like Persona menu */
.back-btn:hover {
  transform: skewX(-10deg) scale(1.08);
}

/* slash background (same style as home buttons) */
.btn-bg-slash {
  position: absolute;
  inset: 0;
  background: #ff4a73;
  z-index: 1;

  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  transform: scaleX(1);
}

/* text layers */
.text-layer {
  position: relative;
  z-index: 2;
  display: inline-block;
}

/* shadow */
.text-layer.shadow {
  position: absolute;
  color: black;
  transform: translate(3px, 2px) skewX(-10deg);
}

/* main */
.text-layer.main {
  color: #61e1ff;
  transform: skewX(-10deg);
}

/* hover animation (Persona feel) */
.back-btn:hover .text-layer.main {
  color: white;
  transform: skewX(-12deg) translate(-2px, -2px);
}

.back-btn:hover .text-layer.shadow {
  transform: skewX(-12deg) translate(4px, 3px);
}

/* ===== FULLSCREEN VIDEO BACKGROUND ===== */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  z-index: 0;
  pointer-events: none;
}
</style>