<template>
  <div class="skill-page">

    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/skill.jpg"
      preload="metadata"
    />

    <BackBtn />
    <IntroSlash />

    <div class="panel" :class="{ enter: pageReady }">

      <div class="bg-slash"></div>

      <header class="top">
        <div class="status">STATUS</div>
        <h1>SKILLS</h1>
        <p class="subtitle">DEVELOPER</p>
      </header>

      <div class="grid">

        <section 
          class="card profile clickable" 
          :style="{ '--i': 0 }"
          @click="openProfileModal"
        >
          <div class="avatar-wrap">
            <div class="avatar-ring"></div>
            <img src="../assets/images/e20220993.png" class="avatar" />
          </div>

          <div class="info">
            <h2>LOENG PHEAKTRA</h2>
            <p>DEVOPS ENGINEER</p>

            <div class="level">
              LEVEL <span>22</span>
            </div>
            <div class="click-tip">SYS_LINK // TAP_TO_VIEW</div>
          </div>
        </section>

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

        <section class="card tags" :style="{ '--i': 2 }">
          <div class="title">SPECIALIZATION</div>

          <div class="tag-list">
            <span>Linux Ubuntu</span>
            <span>Jenkins</span>
            <span>Nginx</span>
            <span>Kubernetes</span>
            <span>Docker Container</span>
            <span>Cloud AWS</span>
            <span>Springboot</span>
            <span>Nest Js</span>
            <span>Vue Js</span>
            <span>Reverse Proxy</span>
            <span>Load Balancing</span>
            <span>Ansible</span>
            <span>Git/GitHub</span>
          </div>
        </section>

        <section class="card xp" :style="{ '--i': 3 }">
          <div class="title">EXPERIENCE</div>

          <div class="xp-text">168 / 10000 XP</div>

          <div class="xp-bar">
            <div class="xp-fill"></div>
          </div>
        </section>

      </div>
    </div>

    <Transition name="persona-modal">
      <div class="modal-overlay" v-if="isProfileOpen" @click.self="closeProfileModal">
        <div class="modal-window">
          <button class="close-slice" @click="closeProfileModal">CLOSE</button>

          <div class="modal-content">
            <div class="modal-left-deck">
              <div class="display-deck">
                <div class="scanlines"></div>
                <div class="deck-inner-avatar">
                  <img src="../assets/images/e20220993.png" class="modal-avatar" />
                  <div class="hud-frame-label">ID_FILE // CORE_AVATAR</div>
                </div>
              </div>
            </div>

            <div class="modal-right-info">
              <header class="modal-header">
                <div class="meta-tag">OPERATOR_PROFILE</div>
                <h2>LOENG PHEAKTRA</h2>
                <div class="tags-row">
                  <span class="info-tag">@loengpheaktra</span>
                  <span class="info-tag">// ACTIVE</span>
                </div>
              </header>

              <div class="modal-body">
                <h3>CORE DESCRIPTION</h3>
                <p>
                  A meticulous DevOps Engineer specializing in building robust multi-container delivery pipelines, secure reverse proxies, automation playbooks, and fluid user interfaces. Dedicated to optimizing high-availability architecture metrics.
                </p>
              </div>

              <footer class="modal-footer">
                <div class="footer-badge">SYS_STATUS_OK</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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
const isProfileOpen = ref(false)

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

const openProfileModal = () => {
  isProfileOpen.value = true
}

const closeProfileModal = () => {
  isProfileOpen.value = false
}
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
  z-index: -1;
  pointer-events: none;
}

/* ================= BACKGROUND VIDEO ================= */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
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

  opacity: 0;
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
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s, background-color 0.2s;
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

/* INTERACTIVE ACTION STYLING */
.card.clickable {
  cursor: pointer;
}
.card.clickable:hover {
  transform: translateX(10px) skewX(-6deg) scale(1.02);
  border-color: #ff2e63;
  background: #121526;
}

/* ================= PROFILE ================= */
.profile {
  display: flex;
  align-items: center;
  gap: 25px;
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
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
  object-fit: cover;
  display: block;
}

.info h2 {
  margin: 0;
  font-size: 2rem;
}

.level {
  margin-top: 6px;
  background: #ff2e63;
  padding: 4px 12px;
  display: inline-block;
  font-weight: 900;
}

.click-tip {
  margin-top: 8px;
  font-family: monospace;
  font-size: 0.7rem;
  color: #61e1ff;
  letter-spacing: 1px;
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

/* ================= MODAL PROFILE STYLING OVERLAY ================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 5, 10, 0.9);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal-window {
  position: relative;
  width: 820px;
  max-width: 100%;
  transform: rotate(-0.5deg);
  filter: drop-shadow(12px 12px 0px #ff2e63);
}

.modal-window::before {
  content: '';
  position: absolute;
  inset: -4px;
  background-color: #fff;
  z-index: 1;
  clip-path: polygon(0 8%, 2% 0, 96% 0, 100% 8%, 100% 92%, 98% 100%, 4% 100%, 0 92%);
}
.modal-window::after {
  content: '';
  position: absolute;
  inset: 0px;
  background-color: #0b0d17;
  z-index: 2;
  clip-path: polygon(0 8%, 2% 0, 96% 0, 100% 8%, 100% 92%, 98% 100%, 4% 100%, 0 92%);
}

.close-slice {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff2e63;
  border: none;
  color: white;
  font-family: Impact;
  padding: 12px 24px 10px 24px;
  cursor: pointer;
  z-index: 10;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
  transition: background 0.15s, color 0.15s;
  font-size: 0.9rem;
  letter-spacing: 1px;
}
.close-slice:hover { background: #fff; color: #000; }

.modal-content {
  position: relative;
  color: white;
  z-index: 5;
  padding: 40px;
  display: flex;
  gap: 30px;
}

.modal-left-deck {
  flex: 0.8;
  min-width: 0;
}

.display-deck {
  background: #040509;
  width: 100%;
  height: 240px;
  position: relative;
  border: 3px solid #fff;
  outline: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deck-inner-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0c0f1d;
}

.modal-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid #ff2e63;
  object-fit: cover;
}

.hud-frame-label {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #000;
  color: #61e1ff;
  font-family: monospace;
  font-size: 0.65rem;
  padding: 3px 8px;
  z-index: 3;
  letter-spacing: 1px;
  border: 1px solid #61e1ff;
}

.modal-right-info {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.modal-header .meta-tag {
  background: #fff;
  color: #000;
  display: inline-block;
  font-family: Impact;
  padding: 2px 10px;
  font-size: 0.8rem;
  transform: skewX(-10deg);
  font-weight: bold;
}

.modal-header h2 {
  font-family: Impact;
  font-size: 2.5rem;
  margin: 8px 0 4px 0;
  line-height: 1.1;
  color: #61e1ff;
  transform: skewX(-4deg);
}

.tags-row { display: flex; gap: 8px; margin-bottom: 15px; }
.info-tag { font-family: monospace; font-size: 0.75rem; color: #ff2e63; font-weight: bold; }

.modal-body h3 {
  font-family: Impact;
  color: #ff2e63;
  font-size: 1.1rem;
  margin: 0 0 6px 0;
  letter-spacing: 1px;
}
.modal-body p {
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.85;
  margin: 0;
}

.modal-footer {
  margin-top: 20px;
}
.footer-badge {
  display: inline-block;
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(97, 225, 255, 0.15);
  color: #61e1ff;
  padding: 4px 12px;
  border: 1px dashed #61e1ff;
}

/* ================= TRANSITIONS ================= */
.persona-modal-enter-active, .persona-modal-leave-active { transition: opacity 0.22s ease; }
.persona-modal-enter-active .modal-window { animation: slash-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.persona-modal-leave-active .modal-window { animation: slash-in 0.18s ease reverse forwards; }
.persona-modal-enter-from, .persona-modal-leave-to { opacity: 0; }

@keyframes slash-in {
  0% { transform: scale(0.9) rotate(-4deg) translateY(20px); opacity: 0; }
  100% { transform: scale(1) rotate(-0.5deg) translateY(0); opacity: 1; }
}

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
    width: 95%;
    left: 50%;
    top: 30px;
    transform: translateX(-50%) translateY(-10px);
    padding: 20px;
    height: calc(100vh - 40px);
  }

  .panel.enter {
    animation: panelInMobile 0.6s ease forwards;
  }

  @keyframes panelInMobile {
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .top h1 { font-size: 2.8rem; }
  .profile { flex-direction: column; text-align: center; }
  .profile:hover { transform: scale(1.02) skewX(-6deg); }
  .avatar { width: 90px; height: 90px; }

  /* Modal Mobile Changes */
  .modal-window::before, .modal-window::after { clip-path: none; }
  .modal-content { flex-direction: column; padding: 35px 20px 20px 20px; gap: 20px; }
  .close-slice { top: 0; right: 0; clip-path: none; padding: 10px 16px; }
  .display-deck { height: 180px; }
  .modal-avatar { width: 110px; height: 110px; }
  .modal-header h2 { font-size: 1.8rem; }
}
</style>