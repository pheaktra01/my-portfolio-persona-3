<template>
  <div class="journey-page p3r-theme">
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/timeline.jpg"
      preload="metadata"
    ></video>

    <div class="overlay"></div>
    <div class="screen-scan-overlay"></div>
    <div class="ambient-ticker">SYS_TRACK_LOGS // TIMELINE_SEQUENCE_INITIALIZED</div>

    <BackBtn />
    <IntroSlash />

    <div class="panel">
      
      <header class="top-header">
        <div class="status-pill"><span>CORE_MEM_BANK</span></div>
        <div class="title-frame">
          <h1 class="main-title" data-text="JOURNEY">JOURNEY</h1>
        </div>
        <p class="subtitle">// DEVELOPMENT_LOGS & RECORDED_EVENTS</p>
      </header>

      <div class="p3r-timeline-track">
        
        <div
          v-for="(item, i) in combinedLogs"
          :key="i"
          class="p3r-timeline-item"
          :style="{ '--i': i }"
        >
          <div class="node-anchor-zone">
            <div class="p3r-pulse-core"></div>
            <div class="node-tech-connector"></div>
          </div>

          <div class="p3r-log-plate">
            <div class="plate-base-bg"></div>
            <div class="plate-accent-slash"></div>

            <div class="chrono-stamp-sector">
              <span class="stamp-txt">{{ item.date }}</span>
              <div class="stamp-sub-bar"></div>
            </div>

            <div class="plate-content-body">
              <h2 class="log-heading">{{ item.title }}</h2>
              <p class="log-paragraph">{{ item.desc }}</p>

              <div v-if="item.tags && item.tags.length" class="matrix-tag-row">
                <span v-for="tag in item.tags" :key="tag" class="matrix-tag-pill">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="plate-hud-index">// REG_00{{ i + 1 }}</div>
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
  setVideo(videos.timeline)
})

onBeforeUnmount(() => {
  clearVideo()
})

const combinedLogs = ref([
  {
    date: '2024-09',
    title: 'Started Web Development',
    desc: 'Learned HTML, CSS, JavaScript fundamentals and modern layouts.',
    tags: ['HTML', 'CSS', 'JS']
  },
  {
    date: '2025-01',
    title: 'NestJS Framework Implementation',
    desc: 'Built first structural full-stack application connecting APIs to datastores.',
    tags: ['NestJS', 'MongoDB', 'Backend']
  },
  {
    date: '2025-05',
    title: 'Automata Theory System Engine',
    desc: 'Created dynamic abstract finite automata management layout engines.',
    tags: ['Automata', 'Vue', 'CS Core']
  },
  {
    date: '2025-06',
    title: 'AniSuki Streaming Architecture',
    desc: 'Initiated open design modular anime streaming distribution media interfaces.',
    tags: ['Vue', 'API Integration', 'UX']
  },
  {
    date: '2026-06',
    title: 'Persona UI System Portfolio',
    desc: 'Released advanced custom Persona 3 inspired hyper-stylized portfolio application layer.',
    tags: ['Vue 3', 'TypeScript', 'Animation']
  }
])
</script>

<style scoped>
/* ================= GLOBAL DESIGN PALETTE ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-void: #03060f;
  --p3r-slate-card: #0c1428;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-impact-font: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-impact-font);
  color: var(--p3r-pure-white);
  overflow: hidden; /* Prevent base layout structural breaking */
  position: relative;
  background-color: var(--p3r-void);
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-video, .overlay, .screen-scan-overlay, .ambient-ticker {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Passes touches straight to the scroll pane */
}

.bg-video {
  object-fit: cover;
  z-index: 0;
  opacity: 0.38;
}

.overlay {
  z-index: 1;
}

.screen-scan-overlay {
  background: linear-gradient(rgba(0, 210, 255, 0.015) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 2;
}

.ambient-ticker {
  top: 25%; right: -8%;
  width: auto; height: auto;
  font-size: 6.5rem;
  color: rgba(0, 210, 255, 0.02);
  transform: rotate(-15deg);
  white-space: nowrap;
  user-select: none;
  z-index: 0;
  font-style: italic;
  font-weight: 900;
}

/* ================= DESKTOP VIEWPORT LAYOUT ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 8%;
  width: 46%;
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
  scrollbar-width: none; /* Firefox track clear rules */
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
  from { opacity: 0; transform: translateX(-100px) skewX(-2deg); }
  to { opacity: 1; transform: translateX(0) skewX(-2deg); }
}

/* INTERFACE HEADER DECORATION */
.top-header {
  margin-bottom: 35px;
  transform: skewX(-8deg);
}

.status-pill {
  background: var(--p3r-pure-white);
  color: var(--p3r-void);
  display: inline-block;
  padding: 2px 14px;
  font-size: 0.75rem;
  letter-spacing: 4px;
  font-weight: 900;
  transform: skewX(-10deg);
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

/* ================= CHRONO RECORD TRACK ================= */
.p3r-timeline-track {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  padding-left: 20px;
}

.p3r-timeline-track::before {
  content: "";
  position: absolute;
  left: 28px;
  top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--p3r-magenta) 0%, rgba(255,0,85,0.05) 100%);
  z-index: 1;
}

.p3r-timeline-item {
  display: flex;
  gap: 25px;
  position: relative;
  opacity: 0;
  transform: translateX(-60px) skewX(-10deg);
  animation: p3rPlateEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes p3rPlateEnter {
  to { opacity: 1; transform: translateX(0) skewX(-10deg); }
}

.node-anchor-zone {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.p3r-pulse-core {
  width: 14px;
  height: 14px;
  background: var(--p3r-pure-white);
  border: 3px solid var(--p3r-magenta);
  margin-top: 36px;
  transform: rotate(45deg);
  transition: background 0.25s, transform 0.25s;
}

.node-tech-connector {
  position: absolute;
  left: 14px; top: 42px;
  width: 15px; height: 2px;
  background: var(--p3r-magenta);
}

.p3r-timeline-item:hover .p3r-pulse-core {
  background: var(--p3r-cyan);
  transform: rotate(135deg) scale(1.2);
}

.p3r-log-plate {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100px;
  z-index: 2;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.plate-base-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #060c19 0%, #0d172e 100%);
  border: 3px solid var(--p3r-pure-white);
  box-shadow: -8px 8px 0px var(--p3r-slate-card);
  z-index: 1;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.plate-accent-slash {
  position: absolute;
  top: 0; bottom: 0; right: 0; width: 0;
  background: var(--p3r-cyan);
  z-index: 2;
  clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 100%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.15;
}

.p3r-timeline-item:hover .p3r-log-plate {
  transform: translateX(20px) scale(1.01);
}
.p3r-timeline-item:hover .plate-base-bg {
  border-color: var(--p3r-cyan);
  box-shadow: -14px 14px 0px var(--p3r-magenta);
}
.p3r-timeline-item:hover .plate-accent-slash {
  width: 25%;
}

.chrono-stamp-sector {
  position: relative;
  background: var(--p3r-magenta);
  min-width: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
  transition: background-color 0.25s;
}
.p3r-timeline-item:hover .chrono-stamp-sector {
  background-color: var(--p3r-cyan);
}

.stamp-txt {
  font-size: 1.1rem;
  font-weight: 900;
  font-style: italic;
  color: var(--p3r-pure-white);
  letter-spacing: -0.5px;
  transform: skewX(10deg);
}
.p3r-timeline-item:hover .stamp-txt {
  color: var(--p3r-void);
}

.plate-content-body {
  padding: 18px 25px;
  width: 100%;
  position: relative;
  z-index: 4;
  transform: skewX(10deg);
}

.log-heading {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.log-paragraph {
  margin: 5px 0 0 0;
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
}

.matrix-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.matrix-tag-pill {
  background: var(--p3r-slate-card);
  color: var(--p3r-cyan);
  padding: 2px 8px;
  font-size: 0.68rem;
  font-family: sans-serif;
  font-weight: bold;
  border: 1px solid rgba(0, 210, 255, 0.2);
}
.p3r-timeline-item:hover .matrix-tag-pill {
  background: var(--p3r-pure-white);
  color: var(--p3r-void);
  border-color: var(--p3r-pure-white);
}

.plate-hud-index {
  position: absolute;
  top: 6px; right: 12px;
  font-family: monospace;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.1);
  z-index: 3;
  transform: skewX(10deg);
}
.p3r-timeline-item:hover .plate-hud-index {
  color: var(--p3r-cyan);
}

.p3r-theme::after {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(255, 0, 85, 0.04) 50%, transparent);
  animation: p3rScanVelocity 4.5s linear infinite;
  pointer-events: none;
  z-index: 6;
}

@keyframes p3rScanVelocity {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* ================= ADAPTIVE RESPONSIVENESS ================= */
@media (max-width: 1150px) {
  .panel { width: 56%; }
  .main-title { font-size: 4.4rem; }
}

@media (max-width: 768px) {
  .p3r-theme { 
    overflow: hidden; /* Fix layout shifting on viewport changes */
  }
  
  .panel {
    width: 90% !important; 
    left: 5% !important; 
    top: 5% !important;
    height: 90vh !important; /* Fixed inner window constraint for scrolling accuracy */
    padding: 20px 15px !important; 
    overflow-y: scroll !important;
    transform: none !important;
    animation: p3rMobilePanel 0.5s ease-out forwards;
  }

  @keyframes p3rMobilePanel {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .main-title { font-size: 3rem; }
  .p3r-timeline-track { padding-left: 0; gap: 16px; }
  .p3r-timeline-track::before { display: none; }
  
  .p3r-timeline-item { flex-direction: column; gap: 6px; transform: none !important; }
  .p3r-timeline-item:hover .p3r-log-plate { transform: translateX(5px) !important; }
  .node-anchor-zone { display: none; }
  
  .p3r-log-plate { flex-direction: column; width: 100%; transform: none; }
  .plate-base-bg { transform: none; }
  .plate-accent-slash { display: none; }
  
  .chrono-stamp-sector {
    width: 100%; min-width: unset; padding: 8px 15px;
    clip-path: none; justify-content: center; align-items: flex-start;
  }
  .stamp-txt { transform: none; font-size: 0.9rem; }
  
  .plate-content-body { padding: 15px; transform: none; }
  .log-heading { font-size: 1.15rem; }
  .log-paragraph { font-size: 0.8rem; }
  .plate-hud-index { display: none; }
}
</style>