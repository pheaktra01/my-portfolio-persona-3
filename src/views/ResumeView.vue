<template>
  <div class="resume-page p3r-theme">
    <!-- ATMOSPHERIC BACKGROUND VIDEO & CORE TELEMETRY FILTERS (Bypassed touch block using pointer-events) -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/resume.jpg"
      preload="metadata"
    ></video>

    <div class="overlay"></div>
    <div class="screen-interlace-grid"></div>
    <div class="ambient-stat-ticker">PLAYER_STATUS_DOSSIER // DATA_ANALYSIS_MODE</div>

    <IntroSlash />
    <BackBtn />

    <!-- RE-ARCHITECTED STATUS PANEL -->
    <div class="panel" ref="panelRef">
      
      <header class="top-header">
        <div class="status-badge"><span>PERSONAL_DATA_BANK</span></div>
        <div class="title-skew-frame">
          <h1 class="main-title" data-text="RESUME">RESUME</h1>
        </div>
        <p class="subtitle">// S-LINK_MEMBER_INFORMATION_ANALYSIS</p>
      </header>

      <!-- SECTOR: SKEWED GRID SYSTEM -->
      <div class="p3r-stat-grid">

        <!-- CARD 1: IDENTITY FILE -->
        <section class="p3r-status-card" style="--i: 1">
          <div class="card-bg-mesh"></div>
          <div class="card-header-ribbon">IDENTITY DOSSIER</div>
          <div class="card-inner-content">
            <div class="stat-data-row">
              <span class="stat-field-label">NAME</span>
              <span class="stat-field-val highlight-cyan">YAGAMI DEVILATHAN</span>
            </div>
            <div class="stat-data-row">
              <span class="stat-field-label">ROLE</span>
              <span class="stat-field-val">FULL STACK DEVELOPER</span>
            </div>
            <div class="stat-data-row">
              <span class="stat-field-label">LEVEL</span>
              <span class="stat-field-val level-badge">22</span>
            </div>
          </div>
          <div class="card-hud-sub-index">// REG_ID_01</div>
        </section>

        <!-- CARD 2: EDUCATION FILE -->
        <section class="p3r-status-card" style="--i: 2">
          <div class="card-bg-mesh"></div>
          <div class="card-header-ribbon">EDUCATION ACADEMY</div>
          <div class="card-inner-content">
            <div class="education-block">
              <h3 class="edu-major-title">Computer Science</h3>
              <p class="edu-degree-subtitle">University Student / Software Architecture Branch</p>
            </div>
          </div>
          <div class="card-hud-sub-index">// REG_EDU_02</div>
        </section>

        <!-- CARD 3: COMBAT MATRIX SKILLS -->
        <section class="p3r-status-card" style="--i: 3">
          <div class="card-bg-mesh"></div>
          <div class="card-header-ribbon">MAIN SKILLS ATTRIBUTES</div>
          <div class="card-inner-content">
            <div class="p3r-matrix-tags">
              <span class="skill-shard">Vue</span>
              <span class="skill-shard">NestJS</span>
              <span class="skill-shard">Flutter</span>
              <span class="skill-shard">MongoDB</span>
              <span class="skill-shard">Docker</span>
              <span class="skill-shard">Azure</span>
            </div>
          </div>
          <div class="card-hud-sub-index">// SKL_ATTRIB_03</div>
        </section>

        <!-- CARD 4: DOCUMENT DOWNLOAD INTERFACES -->
        <section class="p3r-status-card action-card-plate" style="--i: 4">
          <div class="card-bg-mesh"></div>
          <div class="card-header-ribbon">DOCUMENT ARCHIVE</div>
          <div class="card-inner-content download-sector-layout">
            
            <button class="p3r-action-btn" @click="downloadCV">
              <span class="btn-skew-stabilizer">DOWNLOAD CV</span>
              <div class="btn-hologram-shifter"></div>
            </button>

            <a :href="cvFile" target="_blank" class="p3r-action-btn view-variant">
              <span class="btn-skew-stabilizer">VIEW CV</span>
              <div class="btn-hologram-shifter"></div>
            </a>

          </div>
          <div class="card-hud-sub-index">// DOC_STORAGE_04</div>
          <div v-if="slashActive" class="transition-slash"></div>
        </section>

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
import cvFile from "../assets/files/LoengPheaktra_DevOps_CV.pdf"

const { setVideo, clearVideo, currentVideo } = useVideoManager()

const slashActive = ref(false)

const downloadCV = () => {
  slashActive.value = true

  setTimeout(() => {
    const link = document.createElement("a")
    link.href = cvFile
    link.download = "Yagami-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    slashActive.value = false
  }, 450)
}

onMounted(() => {
  setVideo(videos.resume)
})

onBeforeUnmount(() => {
  clearVideo()
})
</script>

<style scoped>
/* ================= THEME CORE MODULES ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-velvet-dark: #040816;
  --p3r-deep-blue: #0e1732;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-impact: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-impact);
  color: var(--p3r-pure-white);
  overflow: hidden; /* Lock master layout from shifting context */
  position: relative;
  background-color: var(--p3r-velvet-dark);
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-video, .overlay, .screen-interlace-grid, .ambient-stat-ticker {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Safely passes tap/drag interactions down to scroll layers */
}

.bg-video {
  object-fit: cover;
  z-index: 0;
  opacity: 0.35;
}

.overlay {
  z-index: 1;
}

.screen-interlace-grid {
  background: linear-gradient(rgba(0, 210, 255, 0.012) 50%, rgba(0, 0, 0, 0.22) 50%);
  background-size: 100% 4px;
  z-index: 2;
}

.ambient-stat-ticker {
  bottom: 15%; right: -5%;
  width: auto; height: auto;
  font-size: 6rem;
  color: rgba(0, 210, 255, 0.015);
  transform: rotate(-12deg);
  white-space: nowrap;
  user-select: none;
  z-index: 0;
  font-weight: 900;
  font-style: italic;
}

/* ================= CENTRAL DATA PANEL VIEWPORT ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 8%;
  width: 44%;
  height: 84vh;
  padding: 20px 30px 60px 10px;
  
  /* FORCE NATIVE GESTURE CAPTURE MECHANICS */
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  pointer-events: auto !important;

  z-index: 3;
  box-sizing: border-box;
  opacity: 0;
  animation: p3rPanelEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  scrollbar-width: none; /* Firefox clear rule */
}

/* Chrome, Safari, Edge invisible track configuration rules */
.panel::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
}
.panel::-webkit-scrollbar-thumb {
  background: transparent !important;
}

@keyframes p3rPanelEnter {
  from { opacity: 0; transform: translateX(-120px) skewX(-2.5deg); }
  to { opacity: 1; transform: translateX(0) skewX(-2.5deg); }
}

/* MENU OVERLINK HEADER */
.top-header {
  margin-bottom: 30px;
  transform: skewX(-8deg);
}

.status-badge {
  background: var(--p3r-pure-white);
  color: var(--p3r-velvet-dark);
  display: inline-block;
  padding: 2px 14px;
  font-size: 0.75rem;
  letter-spacing: 4px;
  font-weight: 900;
  transform: skewX(-12deg);
  margin-bottom: 6px;
}

.main-title {
  font-size: 5.4rem;
  margin: 0;
  line-height: 0.85;
  font-style: italic;
  text-shadow: 4px 4px 0px var(--p3r-cyan);
}

.subtitle {
  margin: 8px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--p3r-cyan);
  letter-spacing: 2px;
}

/* ================= THE STYLIZED ATTRIBUTE CARDS ================= */
.p3r-stat-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p3r-status-card {
  position: relative;
  background: linear-gradient(90deg, #050a1a 0%, #0d1730 100%);
  border: 3px solid var(--p3r-pure-white);
  box-shadow: -8px 8px 0px var(--p3r-deep-blue);
  padding: 20px;
  transform: translateX(-60px) skewX(-10deg);
  opacity: 0;
  z-index: 2;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  animation: p3rCardFlyIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
}

@keyframes p3rCardFlyIn {
  to { opacity: 1; transform: translateX(0) skewX(-10deg); }
}

.p3r-status-card:hover {
  transform: translateX(18px) scale(1.015) skewX(-10deg);
  border-color: var(--p3r-cyan);
  box-shadow: -14px 14px 0px var(--p3r-magenta);
}

.card-bg-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: radial-gradient(var(--p3r-pure-white) 1px, transparent 0);
  background-size: 8px 8px;
  z-index: 1;
}

.card-header-ribbon {
  color: var(--p3r-magenta);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 15px;
  position: relative;
  z-index: 3;
  transform: skewX(10deg);
}
.p3r-status-card:hover .card-header-ribbon {
  color: var(--p3r-cyan);
}

.card-inner-content {
  position: relative;
  z-index: 3;
  transform: skewX(10deg);
}

.stat-data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  padding: 6px 0;
}

.stat-field-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
}

.stat-field-val {
  font-size: 1.15rem;
  font-weight: 900;
  text-transform: uppercase;
}
.stat-field-val.highlight-cyan {
  color: var(--p3r-cyan);
  text-shadow: 2px 2px 0px rgba(0,0,0,0.4);
}

.level-badge {
  background: var(--p3r-magenta);
  color: var(--p3r-pure-white);
  padding: 2px 10px;
  font-style: italic;
  font-size: 1.2rem;
  clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
}
.p3r-status-card:hover .level-badge {
  background: var(--p3r-cyan);
  color: var(--p3r-velvet-dark);
}

.edu-major-title {
  margin: 0;
  font-size: 1.4rem;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}
.edu-degree-subtitle {
  margin: 4px 0 0 0;
  font-family: Arial, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
}

.p3r-matrix-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-shard {
  background: var(--p3r-deep-blue);
  color: var(--p3r-cyan);
  padding: 4px 12px;
  font-size: 0.78rem;
  font-weight: bold;
  border: 1px solid rgba(0, 210, 255, 0.25);
  transform: skewX(-8deg);
  transition: all 0.2s ease;
}
.p3r-status-card:hover .skill-shard {
  background: var(--p3r-pure-white);
  color: var(--p3r-velvet-dark);
  border-color: var(--p3r-pure-white);
}

/* ================= ACTION / DOWNLOAD BUTTON DESIGNS ================= */
.download-sector-layout {
  display: flex;
  gap: 14px;
}

.p3r-action-btn {
  all: unset;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 45px;
  background: transparent;
  border: 3px solid var(--p3r-magenta);
  color: var(--p3r-pure-white);
  font-family: var(--p3r-impact);
  font-size: 0.95rem;
  letter-spacing: 1px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.p3r-action-btn.view-variant {
  border-color: var(--p3r-pure-white);
}

.btn-skew-stabilizer {
  position: relative;
  z-index: 4;
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
  bottom: 5px; right: 15px;
  font-family: monospace;
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.08);
  z-index: 3;
  transform: skewX(10deg);
}
.p3r-status-card:hover .card-hud-sub-index {
  color: var(--p3r-cyan);
}

.transition-slash {
  position: fixed;
  top: 0; left: -130%;
  width: 130%; height: 100vh;
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
  .panel { width: 55%; }
  .main-title { font-size: 4.4rem; }
}

@media (max-width: 768px) {
  .p3r-theme { 
    overflow: hidden; /* Prevent background elements from drifting on touch */
  }
  
  .panel {
    width: 90% !important; 
    left: 5% !important; 
    top: 5% !important;
    height: 90vh !important; /* Fixed bounds box allows safe touch container momentum */
    padding: 20px 15px !important; 
    overflow-y: scroll !important;
    transform: none !important;
    animation: p3rMobilePanelIn 0.5s ease-out forwards;
  }

  @keyframes p3rMobilePanelIn {
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .main-title { font-size: 3rem; }
  .p3r-stat-grid { gap: 14px; }
  
  .p3r-status-card { transform: none !important; padding: 16px; }
  .p3r-status-card:hover { transform: translateY(-3px) !important; }
  
  .card-inner-content { transform: none; }
  .card-header-ribbon { transform: none; font-size: 0.78rem; }
  
  .stat-data-row { flex-direction: column; align-items: flex-start; gap: 4px; }
  .stat-field-val { font-size: 1.05rem; }
  .level-badge { transform: none; margin-top: 4px; font-size: 1rem; clip-path: none; }
  
  .edu-major-title { font-size: 1.15rem; }
  .edu-degree-subtitle { font-size: 0.8rem; }
  
  .download-sector-layout { flex-direction: column; gap: 10px; }
  .p3r-action-btn { width: 100%; height: 42px; }
  
  .card-hud-sub-index { display: none; }
}
</style>