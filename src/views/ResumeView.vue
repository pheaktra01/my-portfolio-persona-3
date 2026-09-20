<template>
  <div class="resume-page p3r-theme">
    <!-- ATMOSPHERIC BACKGROUND VIDEO & CORE TELEMETRY FILTERS -->
    <div class="bg-layer-container">
      <img class="bg-poster" src="../assets/images/resume.jpg" alt="background" />
      <video
        class="bg-video"
        :class="{ loaded: videoLoaded }"
        :src="currentVideo"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
        @loadeddata="videoLoaded = true"
      ></video>
      <!-- Persona 3 Underwater Ambient Bubbles -->
      <div class="ambient-bubbles" aria-hidden="true">
        <span v-for="n in 14" :key="n" class="bubble" :style="{ '--bi': n }"></span>
      </div>
      <div class="overlay"></div>
      <div class="screen-interlace-grid"></div>
      <div class="ambient-stat-ticker">PLAYER_STATUS_DOSSIER // DATA_ANALYSIS_MODE // S.E.E.S.</div>
    </div>

    <!-- FLOATING P3R GEOMETRIC SHARDS -->
    <div class="p3r-shard shard-1" aria-hidden="true"></div>
    <div class="p3r-shard shard-2" aria-hidden="true"></div>

    <BackBtn />
    <IntroSlash />

    <!-- MAIN INTERACTIVE ARCHIVE PANEL -->
    <main class="panel" :class="{ enter: pageReady }">
      
      <!-- P3R SKEWED HEADER -->
      <header class="top-header">
        <div class="status-badge">
          <span class="badge-icon">◆</span>
          <span>PERSONAL_DATA_BANK // S-LINK_MEMBER_FILE</span>
        </div>
        <div class="title-skew-frame">
          <h1 class="main-title" data-text="RESUME">RESUME</h1>
          <span class="jp-title">履歴書</span>
        </div>
        <p class="subtitle">// S-LINK_MEMBER_INFORMATION_ANALYSIS & CREDENTIALS</p>
      </header>

      <!-- P3R SECTION SWITCHER TABS -->
      <nav class="p3r-tab-nav" aria-label="Resume Sections">
        <button
          v-for="sec in sections"
          :key="sec.id"
          class="tab-btn"
          :class="{ active: activeSection === sec.id }"
          @click="setSection(sec.id)"
          @pointerenter="onTabHover"
        >
          <span class="tab-lbl">{{ sec.name }}</span>
          <span class="tab-sub">{{ sec.jp }}</span>
        </button>
      </nav>

      <!-- SECTOR: SKEWED GRID SYSTEM -->
      <div class="p3r-stat-grid">

        <!-- CARD 1: IDENTITY FILE -->
        <section
          v-show="activeSection === 'ALL' || activeSection === 'IDENTITY'"
          class="p3r-status-card"
          style="--i: 1"
          @pointerenter="onCardHover"
        >
          <div class="card-bg-mesh"></div>
          <div class="card-accent-border"></div>
          <div class="card-header-ribbon">
            <span class="ribbon-glyph">✦</span>
            <span>IDENTITY DOSSIER // 個人情報</span>
          </div>
          
          <div class="card-inner-content">
            <div class="stat-data-row">
              <span class="stat-field-label">NAME // 氏名</span>
              <span class="stat-field-val highlight-cyan">LOENG PHEAKTRA</span>
            </div>
            <div class="stat-data-row">
              <span class="stat-field-label">TACTICAL ROLE</span>
              <span class="stat-field-val">DEVOPS & CLOUD ARCHITECT</span>
            </div>
            <div class="stat-data-row">
              <span class="stat-field-label">ACADEMIC RANK</span>
              <span class="stat-field-val">COMPUTER SCIENCE Y4</span>
            </div>
            <div class="stat-data-row">
              <span class="stat-field-label">CLEARANCE LEVEL</span>
              <div class="level-badge-wrap">
                <span class="level-badge">LV. 04</span>
                <span class="level-sub">ENGAGED</span>
              </div>
            </div>
          </div>
          <div class="card-hud-sub-index">// REG_ID_01 // CLASSIFIED</div>
        </section>

        <!-- CARD 2: EDUCATION FILE -->
        <section
          v-show="activeSection === 'ALL' || activeSection === 'ACADEMY'"
          class="p3r-status-card"
          style="--i: 2"
          @pointerenter="onCardHover"
        >
          <div class="card-bg-mesh"></div>
          <div class="card-accent-border"></div>
          <div class="card-header-ribbon">
            <span class="ribbon-glyph">✦</span>
            <span>EDUCATION ACADEMY // 学歴情報</span>
          </div>
          <div class="card-inner-content">
            <div class="education-block">
              <div class="edu-top-line">
                <h3 class="edu-major-title">Computer Science</h3>
                <span class="edu-badge">I4 SENIOR</span>
              </div>
              <p class="edu-degree-subtitle">Institute of Technology of Cambodia (ITC)</p>
              <div class="edu-telemetry-row">
                <span class="edu-param"><span class="k">FACULTY:</span> GIC Department</span>
                <span class="edu-param"><span class="k">STATUS:</span> In Good Standing</span>
              </div>
            </div>
          </div>
          <div class="card-hud-sub-index">// REG_EDU_02 // ITC_SECTOR</div>
        </section>

        <!-- CARD 3: COMBAT MATRIX SKILLS -->
        <section
          v-show="activeSection === 'ALL' || activeSection === 'SKILLS'"
          class="p3r-status-card"
          style="--i: 3"
          @pointerenter="onCardHover"
        >
          <div class="card-bg-mesh"></div>
          <div class="card-accent-border"></div>
          <div class="card-header-ribbon">
            <span class="ribbon-glyph">✦</span>
            <span>COMBAT MATRIX SKILLS // 技能特性</span>
          </div>
          <div class="card-inner-content">
            <div class="skills-group">
              <span class="group-label">DEVOPS & CLOUD:</span>
              <div class="p3r-matrix-tags">
                <span class="skill-shard">Docker</span>
                <span class="skill-shard">CI/CD Pipelines</span>
                <span class="skill-shard">Linux System Admin</span>
                <span class="skill-shard">Cloud Infrastructure</span>
                <span class="skill-shard">Git Version Control</span>
                <span class="skill-shard">Automation Scripting</span>
              </div>
            </div>

            <div class="skills-group mt-3">
              <span class="group-label">FRAMEWORKS & LANGUAGES:</span>
              <div class="p3r-matrix-tags">
                <span class="skill-shard">Vue.js 3</span>
                <span class="skill-shard">NestJS</span>
                <span class="skill-shard">Flutter</span>
                <span class="skill-shard">TypeScript</span>
                <span class="skill-shard">RESTful APIs</span>
              </div>
            </div>
          </div>
          <div class="card-hud-sub-index">// SKL_ATTRIB_03 // TARTARUS_READY</div>
        </section>

        <!-- CARD 4: DOCUMENT DOWNLOAD INTERFACES -->
        <section
          v-show="activeSection === 'ALL' || activeSection === 'DOCUMENTS'"
          class="p3r-status-card action-card-plate"
          style="--i: 4"
          @pointerenter="onCardHover"
        >
          <div class="card-bg-mesh"></div>
          <div class="card-accent-border"></div>
          <div class="card-header-ribbon">
            <span class="ribbon-glyph">✦</span>
            <span>DOCUMENT ARCHIVE // 認証書交付</span>
          </div>
          <div class="card-inner-content download-sector-layout">
            
            <button class="p3r-action-btn" @click="onClickDownload" @pointerenter="onHover">
              <span class="btn-skew-stabilizer">
                <span class="btn-icon">⬇</span>
                DOWNLOAD CV [PDF]
              </span>
              <div class="btn-hologram-shifter"></div>
            </button>

            <a
              :href="cvFile"
              target="_blank"
              class="p3r-action-btn view-variant"
              @click="onCardClick"
              @pointerenter="onHover"
            >
              <span class="btn-skew-stabilizer">
                <span class="btn-icon">↗</span>
                INSPECT CV ONLINE
              </span>
              <div class="btn-hologram-shifter"></div>
            </a>

          </div>
          <div class="card-hud-sub-index">// DOC_STORAGE_04 // S.E.E.S._ARCHIVE</div>
        </section>

      </div>
    </main>

    <!-- P3R VELOCITY SLASH TRANSITION -->
    <div v-if="slashActive" class="transition-slash"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'
import cvFile from '../assets/files/LoengPheaktra_DevOps_CV.pdf'
import { playClick, playSwitchToggle, playHover } from '../utils/sound.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

const videoLoaded = ref(false)
const pageReady = ref(false)
const slashActive = ref(false)
const activeSection = ref('ALL')

const sections = [
  { id: 'ALL', name: 'ALL DOSSIERS', jp: '全記録' },
  { id: 'IDENTITY', name: 'IDENTITY', jp: '個人情報' },
  { id: 'ACADEMY', name: 'ACADEMY', jp: '学歴' },
  { id: 'SKILLS', name: 'SKILLS', jp: '技能特性' },
  { id: 'DOCUMENTS', name: 'DOCUMENTS', jp: '書類' }
]

function setSection(secId: string) {
  playSwitchToggle()
  activeSection.value = secId
}

function onTabHover() {
  playHover(false)
}

const downloadCV = () => {
  slashActive.value = true

  setTimeout(() => {
    const link = document.createElement('a')
    link.href = cvFile
    link.download = 'Loeng-Pheaktra-DevOps-CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    slashActive.value = false
  }, 450)
}

function onCardHover() {
  playHover(false)
}

function onClickDownload() {
  playClick()
  downloadCV()
}

function onCardClick() {
  playClick()
}

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

onMounted(() => {
  setVideo(videos.resume)
  setTimeout(() => {
    pageReady.value = true
  }, 100)
})

onBeforeUnmount(() => {
  clearVideo()
})
</script>

<style scoped>
/* ================= THEME CORE MODULES ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-velvet-dark: #030712;
  --p3r-deep-blue: #091226;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-lime: #00ff88;
  --p3r-impact: 'Impact', 'Arial Black', sans-serif;

  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-impact);
  color: var(--p3r-pure-white);
  overflow: hidden;
  position: relative;
  background-color: var(--p3r-velvet-dark);
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-layer-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
}

.bg-poster,
.bg-video,
.overlay,
.screen-interlace-grid,
.ambient-stat-ticker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bg-poster {
  object-fit: cover;
  z-index: 0;
}

.bg-video {
  object-fit: cover;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.bg-video.loaded {
  opacity: 1;
}

.overlay {
  z-index: 2;
  background: radial-gradient(circle at 30% 50%, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.85) 100%);
}

.screen-interlace-grid {
  background: linear-gradient(rgba(0, 210, 255, 0.015) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 3;
}

/* Persona 3 Underwater Ambient Bubbles */
.ambient-bubbles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -40px;
  left: calc(var(--bi) * 7.14%);
  width: calc(6px + (var(--bi) % 4) * 4px);
  height: calc(6px + (var(--bi) % 4) * 4px);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.85), rgba(0, 210, 255, 0.4) 60%, transparent 100%);
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.4);
  animation: p3rBubbleRise calc(7s + (var(--bi) % 5) * 2s) infinite ease-in;
  animation-delay: calc(var(--bi) * 0.45s);
  opacity: 0;
}

@keyframes p3rBubbleRise {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  15% { opacity: 0.65; }
  85% { opacity: 0.4; }
  100% { transform: translateY(-105vh) scale(1.2); opacity: 0; }
}

/* FLOATING P3R GEOMETRIC SHARDS */
.p3r-shard {
  position: fixed;
  pointer-events: none;
  z-index: 2;
  border: 1px solid rgba(0, 210, 255, 0.15);
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.06), transparent 70%);
}

.shard-1 {
  width: 220px;
  height: 220px;
  top: 10%;
  right: 18%;
  clip-path: polygon(30% 0%, 100% 20%, 80% 100%, 0% 75%);
  animation: p3rFloatShard 9s ease-in-out infinite alternate;
}

.shard-2 {
  width: 130px;
  height: 130px;
  bottom: 20%;
  right: 25%;
  clip-path: polygon(0 0, 100% 35%, 65% 100%, 10% 85%);
  animation: p3rFloatShard 12s ease-in-out infinite alternate-reverse;
}

@keyframes p3rFloatShard {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-25px) rotate(8deg); }
}

.ambient-stat-ticker {
  bottom: 15%;
  right: -5%;
  width: auto;
  height: auto;
  font-size: 6rem;
  color: rgba(0, 210, 255, 0.02);
  transform: rotate(-12deg);
  white-space: nowrap;
  user-select: none;
  z-index: 0;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 6px;
}

/* ================= CENTRAL DATA PANEL VIEWPORT ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 6%;
  width: 48%;
  max-width: 780px;
  height: 88vh;
  padding: 10px 25px 50px 10px;
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  pointer-events: auto !important;
  transform: translate3d(-40px, 0, 0) skewX(-2.5deg);
  z-index: 3;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  scrollbar-width: none;
}

.panel.enter {
  opacity: 1;
  transform: translate3d(0, 0, 0) skewX(-2.5deg);
}

.panel::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  display: none;
}

/* ================= HEADER DESIGNATION ================= */
.top-header {
  margin-bottom: 20px;
  transform: skewX(-6deg);
}

.status-badge {
  background: var(--p3r-cyan);
  color: #030712;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 14px;
  font-size: 0.72rem;
  letter-spacing: 3px;
  font-weight: 900;
  transform: skewX(-10deg);
  margin-bottom: 8px;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.6);
}

.badge-icon {
  color: var(--p3r-magenta);
}

.title-skew-frame {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.main-title {
  font-size: 5.4rem;
  margin: 0;
  line-height: 0.85;
  font-style: italic;
  text-shadow: 4px 4px 0px var(--p3r-cyan), 8px 8px 0px rgba(0, 0, 0, 0.7);
  letter-spacing: -2px;
}

.jp-title {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 900;
  letter-spacing: 4px;
  font-style: italic;
}

.subtitle {
  margin: 10px 0 0 0;
  font-family: monospace;
  font-size: 0.82rem;
  color: var(--p3r-cyan);
  letter-spacing: 2px;
}

/* ================= TAB SWITCHER ================= */
.p3r-tab-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  transform: skewX(-8deg);
}

.tab-btn {
  background: rgba(9, 18, 38, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 14px;
  font-family: var(--p3r-impact);
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-btn:hover {
  border-color: var(--p3r-cyan);
  color: var(--p3r-pure-white);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: var(--p3r-cyan);
  border-color: var(--p3r-pure-white);
  color: #030712;
  box-shadow: -4px 4px 0px var(--p3r-magenta);
}

.tab-sub {
  font-size: 0.65rem;
  opacity: 0.6;
}

.tab-btn.active .tab-sub {
  color: rgba(3, 7, 18, 0.7);
}

/* ================= THE STYLIZED ATTRIBUTE CARDS ================= */
.p3r-stat-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 6px 4px;
}

.p3r-status-card {
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(110deg, #050b18 0%, #0d1730 100%);
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: -8px 8px 0px rgba(0, 0, 0, 0.8);
  padding: 22px 24px;
  transform: skewX(-8deg);
  opacity: 0;
  z-index: 2;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  animation: p3rCardFlyIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
}

@keyframes p3rCardFlyIn {
  from { opacity: 0; transform: translateX(-30px) skewX(-8deg); }
  to { opacity: 1; transform: translateX(0) skewX(-8deg); }
}

.p3r-status-card:hover {
  transform: translateX(12px) skewX(-8deg);
  border-color: var(--p3r-cyan);
  box-shadow: -12px 12px 0px var(--p3r-magenta), 0 0 25px rgba(0, 210, 255, 0.25);
}

.card-bg-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background-image: radial-gradient(var(--p3r-pure-white) 1px, transparent 0);
  background-size: 8px 8px;
  z-index: 1;
}

.card-accent-border {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 5px;
  background: var(--p3r-cyan);
  z-index: 3;
  transition: width 0.25s, background 0.25s;
}

.p3r-status-card:hover .card-accent-border {
  width: 8px;
  background: var(--p3r-magenta);
}

.card-header-ribbon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--p3r-magenta);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 16px;
  position: relative;
  z-index: 3;
  transform: skewX(8deg);
}

.ribbon-glyph {
  color: var(--p3r-cyan);
  font-size: 0.9rem;
}

.p3r-status-card:hover .card-header-ribbon {
  color: var(--p3r-cyan);
}

.p3r-status-card:hover .ribbon-glyph {
  color: var(--p3r-magenta);
}

.card-inner-content {
  position: relative;
  z-index: 3;
  transform: skewX(8deg);
}

.stat-data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  padding: 8px 0;
}

.stat-field-label {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
}

.stat-field-val {
  font-size: 1.15rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-field-val.highlight-cyan {
  color: var(--p3r-cyan);
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4);
}

.level-badge-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-badge {
  background: var(--p3r-magenta);
  color: var(--p3r-pure-white);
  padding: 3px 12px;
  font-style: italic;
  font-size: 1.15rem;
  clip-path: polygon(12% 0, 100% 0, 88% 100%, 0 100%);
  letter-spacing: 1px;
}

.level-sub {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-lime);
  font-weight: bold;
}

.p3r-status-card:hover .level-badge {
  background: var(--p3r-cyan);
  color: var(--p3r-velvet-dark);
}

/* Education Block */
.education-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edu-top-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.edu-major-title {
  margin: 0;
  font-size: 1.45rem;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: var(--p3r-pure-white);
}

.edu-badge {
  background: var(--p3r-deep-blue);
  color: var(--p3r-cyan);
  border: 1px solid var(--p3r-cyan);
  font-family: monospace;
  font-size: 0.68rem;
  padding: 2px 8px;
  letter-spacing: 1px;
}

.edu-degree-subtitle {
  margin: 2px 0 8px 0;
  font-family: Arial, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.edu-telemetry-row {
  display: flex;
  gap: 16px;
  font-family: monospace;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: 6px;
}

.edu-param .k {
  color: var(--p3r-cyan);
}

/* Skills Matrix */
.skills-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mt-3 {
  margin-top: 12px;
}

.group-label {
  font-family: monospace;
  font-size: 0.65rem;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.p3r-matrix-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-shard {
  background: rgba(9, 18, 38, 0.85);
  color: var(--p3r-cyan);
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: bold;
  border: 1px solid rgba(0, 210, 255, 0.3);
  transform: skewX(-8deg);
  transition: all 0.2s ease;
  font-family: monospace;
}

.p3r-status-card:hover .skill-shard {
  background: var(--p3r-pure-white);
  color: var(--p3r-velvet-dark);
  border-color: var(--p3r-pure-white);
}

/* ================= ACTION / DOWNLOAD BUTTON DESIGNS ================= */
.download-sector-layout {
  display: flex;
  gap: 16px;
}

.p3r-action-btn {
  all: unset;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 48px;
  background: transparent;
  border: 3px solid var(--p3r-magenta);
  color: var(--p3r-pure-white);
  font-family: var(--p3r-impact);
  font-size: 1rem;
  letter-spacing: 1.5px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%);
  transition: border-color 0.2s ease;
}

.p3r-action-btn.view-variant {
  border-color: var(--p3r-cyan);
}

.btn-skew-stabilizer {
  position: relative;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-hologram-shifter {
  position: absolute;
  inset: 0;
  background: var(--p3r-magenta);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}

.p3r-action-btn.view-variant .btn-hologram-shifter {
  background: var(--p3r-cyan);
}

.p3r-action-btn:hover {
  border-color: var(--p3r-pure-white);
}

.p3r-action-btn:hover .btn-hologram-shifter {
  transform: scaleX(1);
}

.p3r-action-btn.view-variant:hover .btn-skew-stabilizer {
  color: var(--p3r-velvet-dark);
}

.card-hud-sub-index {
  position: absolute;
  bottom: 4px;
  right: 18px;
  font-family: monospace;
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.15);
  z-index: 3;
  transform: skewX(8deg);
  letter-spacing: 1px;
}

.p3r-status-card:hover .card-hud-sub-index {
  color: var(--p3r-cyan);
}

.transition-slash {
  position: fixed;
  top: 0;
  left: -130%;
  width: 130%;
  height: 100vh;
  background: var(--p3r-magenta);
  transform: skewX(-22deg);
  z-index: 9999;
  animation: p3rSlashVelocity 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes p3rSlashVelocity {
  to { left: 130%; }
}

.p3r-theme::after {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(255, 0, 85, 0.03) 50%, transparent);
  animation: p3rGlobalScan 4.8s linear infinite;
  pointer-events: none;
  z-index: 6;
}

@keyframes p3rGlobalScan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* ================= ADAPTIVE MOBILE BREAKPOINTS ================= */
@media (max-width: 1150px) {
  .panel { width: 60%; }
  .main-title { font-size: 4.4rem; }
}

@media (max-width: 868px) {
  .p3r-theme {
    overflow: hidden;
  }

  .panel {
    width: 92% !important;
    left: 4% !important;
    top: 5% !important;
    height: 90vh !important;
    padding: 16px 12px !important;
    overflow-y: scroll !important;
    transform: none !important;
  }

  .panel.enter {
    transform: none !important;
  }

  .main-title {
    font-size: 3.2rem;
  }

  .p3r-stat-grid {
    gap: 14px;
  }

  .p3r-status-card {
    transform: none !important;
    padding: 16px;
  }

  .p3r-status-card:hover {
    transform: translateX(4px) !important;
  }

  .card-inner-content {
    transform: none;
  }

  .card-header-ribbon {
    transform: none;
    font-size: 0.78rem;
  }

  .stat-data-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .stat-field-val {
    font-size: 1.05rem;
  }

  .level-badge-wrap {
    margin-top: 4px;
  }

  .edu-major-title {
    font-size: 1.2rem;
  }

  .edu-degree-subtitle {
    font-size: 0.82rem;
  }

  .download-sector-layout {
    flex-direction: column;
    gap: 10px;
  }

  .p3r-action-btn {
    width: 100%;
    height: 44px;
    clip-path: none;
  }

  .card-hud-sub-index {
    display: none;
  }
}
</style>