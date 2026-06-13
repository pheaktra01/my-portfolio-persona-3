<template>
  <div class="project-page p3r-theme">
    <!-- Background Video Layer (Touch inputs disabled via pointer-events) -->
    <div class="bg-layer">
      <img class="bg-poster" src="../assets/images/stack.jpg" />
      <video
        class="bg-video"
        :src="currentVideo"
        autoplay
        loop
        muted
        playsinline
        @loadeddata="onVideoReady"
      />
    </div>
    
    <div class="overlay"></div>
    <div class="moving-watermark">P3R_ARCHIVE_DATA // TYPE_PROJECT</div>

    <BackBtn />
    <IntroSlash />

    <!-- The Interactive Scrollable Panel -->
    <div class="panel" ref="panelRef">
      <header class="top-header">
        <div class="status-badge"><span>DATABASE OVERLINK</span></div>
        <div class="title-container">
          <h1 class="main-title" data-text="PROJECTS">PROJECTS</h1>
        </div>
        <p class="subtitle">// ARCHIVE_FILE_CONSTRUCTS</p>
      </header>

      <div class="grid">
        <div
          v-for="(p, i) in projects"
          :key="p.title"
          class="p3r-list-card"
          @mouseenter="active = i"
          @mouseleave="active = null"
          @pointerenter="onToggle"
          @click="onClickCard(i)"
          :class="{ 'is-active': active === i }"
          :style="{ '--i': i }"
        >
          <div class="card-bg-base"></div>
          <div class="card-bg-accent"></div>
          
          <div class="corner-cross"></div>

          <div class="card-body">
            <div class="card-index">0{{ i + 1 }}</div>
            <div class="card-text-block">
              <h2 class="project-title">{{ p.title }}</h2>
              <p class="project-summary">{{ p.shortDesc }}</p>
              
              <div class="tag-ribbons">
                <span v-for="t in p.tags" :key="t" class="inline-tag">{{ t }}</span>
              </div>
            </div>
            
            <div class="action-arrow">
              <span class="arrow-shape">▶</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Portal Overlay -->
    <Transition name="p3r-modal">
      <div class="modal-backdrop" v-if="isPreviewOpen" @click.self="closePreview">
        
        <div class="p3r-modal-window">
          <button class="p3r-close-anchor" @click="onClickClose" @pointerenter="onHover">
            <span>CLOSE ▲</span>
          </button>

          <div class="modal-layout-grid" v-if="selectedProject">
            
            <div class="modal-viewport-pane">
              <div class="cinematic-deck">
                <div class="scanlines"></div>
                <div class="deck-frame-decorator"></div>
                <div class="preview-wrap">
                  <img 
                    :src="selectedProject.image" 
                    :alt="selectedProject.title" 
                    class="screenshot-asset" 
                  />
                </div>
                <div class="hud-watermark">SYS_LINK // PREVIEW_FEED_LIVE</div>
              </div>
            </div>

            <div class="modal-dossier-pane">
              <header class="dossier-header">
                <div class="file-pill">TARGET_DOSSIER</div>
                <h2 class="dossier-title">{{ selectedProject.title }}</h2>
                <div class="dossier-tags">
                  <span v-for="t in selectedProject.tags" :key="t" class="dossier-tag-item">{{ t }}</span>
                </div>
              </header>

              <div class="dossier-body">
                <h3 class="section-indicator">◆ SYSTEM OVERVIEW</h3>
                <p class="dossier-desc">{{ selectedProject.longDesc }}</p>
              </div>

              <footer class="dossier-footer">
                <button class="p3r-action-btn" @click="onClickLaunchProject(selectedProject.url)" @pointerenter="onHover">
                  <span class="btn-skew-fill"></span>
                  <span class="btn-inner-content">
                    <span class="btn-txt">LAUNCH INTERFACE</span>
                    <span class="btn-ico">▼</span>
                  </span>
                </button>
              </footer>
            </div>

          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'
import { playSwitchToggle, playClick, playHover } from '../utils/sound.ts'
import tovreanPreview from '../assets/images/tovrean-preview.png'
import doOrtPreview from '../assets/images/doOrt-preview.png'
import persona3Preview from '../assets/images/persona3-preview.png'

const { setVideo, clearVideo, currentVideo } = useVideoManager()
const hovered = ref(false)

const videoReady = ref(false)

function onVideoReady(e: Event) {
  videoReady.value = true
  const video = e.target as HTMLVideoElement
  video.classList.add('ready')
}

function onToggle(){
  hovered.value = true
  playSwitchToggle()
}

function onClickCard(i: number) {
  playClick()
  openPreview(i)
}

function onClickClose(){
  closePreview()
  playClick()
}

function onClickLaunchProject(url: string) {
  launchProject(url)
  playClick()
}

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

onMounted(() => {
  setVideo(videos.stack)
})

onBeforeUnmount(() => {
  clearVideo()
})

const active = ref<number | null>(null)
const selectedIndex = ref<number | null>(null)
const isPreviewOpen = ref<boolean>(false)

const projects = [
  {
    title: 'Tovrean E-commerce School Supply',
    shortDesc: 'Production platform core infrastructure.',
    longDesc: 'A live interactive web application showcasing structural layout sections, crisp high-fidelity asset rendering pipelines, fully responsive interactive navigation mechanics, and modular UI cards.',
    tags: ['Vue 3', 'TypeScript', 'Spring-Boot', 'MongoDB'],
    url: 'https://tovrean.loengpheaktra.xyz/',
    image: tovreanPreview
  },
  {
    title: 'DoOrt C2C E-commerce Material Exchange',
    shortDesc: 'Vue + NestJS full-stack streaming platform.',
    longDesc: 'A high-performance video deployment architecture featuring modular playback pipelines, continuous memory caching via Redis, and structural cluster layouts built inside NestJS backend layers.',
    tags: ['Vue', 'NestJS', 'MongoDB'],
    url: 'https://material-exchange-platform.pages.dev',
    image: doOrtPreview
  },
  {
    title: 'Persona 3 Reload Portfolio',
    shortDesc: 'Health monitoring app with analytics dashboard.',
    longDesc: 'Biometric processing utility capable of charting critical dynamic glucose curves, setting telemetry triggers, and syncing state records seamlessly over encrypted firestore cloud channels.',
    tags: ['Vue.js', 'TypeScript'],
    url: 'https://www.loengpheaktra.xyz/',
    image: persona3Preview
  }
]

const selectedProject = computed(() => {
  return selectedIndex.value !== null ? projects[selectedIndex.value] : null
})

const openPreview = (index: number) => {
  selectedIndex.value = index
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
}

const launchProject = (url: string) => {
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    alert('System interface target link is currently offline!')
  }
}
</script>

<style scoped>
/* ================= GLOBAL DESIGN PILLARS ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-deep-navy: #090e1a;
  --p3r-shadow-blue: #131f3d;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-font-family: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-font-family);
  color: var(--p3r-pure-white);
  overflow: hidden; /* Lock the viewport boundaries securely */
  position: relative;
}

/* HIGH-INTEGRITY VISUAL LAYER HANDLING */
.bg-video, .overlay, .moving-watermark {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Allows user gestures to pass instantly onto the panel layer */
}

.bg-video {
  object-fit: cover;
  z-index: 0;
}

.overlay {
  z-index: 1;
}

.moving-watermark {
  top: 15%;
  right: -5%;
  width: auto; height: auto;
  z-index: 1;
  font-size: 7rem;
  color: rgba(0, 208, 255, 0.37);
  transform: rotate(-12deg);
  white-space: nowrap;
  user-select: none;
  font-style: italic;
  font-weight: 900;
}

/* ================= CONTAINER PANEL (MOBILE SCROLL RULES) ================= */
.panel {
  position: fixed;
  left: 4%;
  top: 8%;
  width: 44%;
  height: 84vh;
  padding: 20px 40px 40px 10px;
  
  /* FORCE NATIVE GESTURE CAPTURE MECHANICS */
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  pointer-events: auto !important;

  z-index: 10;
  box-sizing: border-box;
  scrollbar-width: none; /* Firefox invisible track toggle */
}

/* Chrome, Safari, and Modern Edge scroll track hidden layout formulas */
.panel::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
}
.panel::-webkit-scrollbar-thumb {
  background: transparent !important;
}

/* HEADER HUD MECHANICS */
.top-header {
  margin-bottom: 40px;
  transform: skewX(-5deg);
}

.status-badge {
  background: var(--p3r-pure-white);
  color: #03060f;
  display: inline-block;
  padding: 3px 14px;
  font-size: 0.75rem;
  letter-spacing: 3px;
  font-weight: 900;
  transform: skewX(-12deg);
  margin-bottom: 8px;
}

.main-title {
  font-size: 5.5rem;
  margin: 0;
  line-height: 0.85;
  color: var(--p3r-pure-white);
  text-shadow: 4px 4px 0px var(--p3r-cyan);
  font-style: italic;
}

.subtitle {
  margin: 10px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--p3r-cyan);
  letter-spacing: 2px;
}

/* ================= SKURVED ITERATION LIST ================= */
.grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 20px;
}

.p3r-list-card {
  position: relative;
  height: 110px;
  cursor: pointer;
  transform: skewX(-12deg);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: cardFlyIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes cardFlyIn {
  from { opacity: 0; transform: translateX(-100px) skewX(-12deg); }
  to { opacity: 1; transform: translateX(0) skewX(-12deg); }
}

.card-bg-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #070c17 0%, #10192e 100%);
  border: 3px solid var(--p3r-pure-white);
  box-shadow: -6px 6px 0px var(--p3r-shadow-blue);
  z-index: 1;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-bg-accent {
  position: absolute;
  top: 0; right: 0; bottom: 0; width: 0;
  background: var(--p3r-cyan);
  z-index: 2;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
}

.corner-cross {
  position: absolute;
  left: -8px; top: -8px; width: 16px; height: 16px;
  border-left: 2px solid var(--p3r-cyan);
  border-top: 2px solid var(--p3r-cyan);
  z-index: 5;
  opacity: 0;
  transition: opacity 0.2s;
}

.p3r-list-card:hover,
.p3r-list-card.is-active {
  transform: translateX(25px) skewX(-12deg) scale(1.02);
}

.p3r-list-card:hover .card-bg-base,
.p3r-list-card.is-active .card-bg-base {
  border-color: var(--p3r-cyan);
  box-shadow: -14px 14px 0px var(--p3r-magenta);
}

.p3r-list-card:hover .card-bg-accent,
.p3r-list-card.is-active .card-bg-accent {
  width: 35%;
}

.p3r-list-card:hover .corner-cross,
.p3r-list-card.is-active .corner-cross {
  opacity: 1;
}

.card-body {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
  z-index: 4;
}

.card-index {
  font-size: 2.5rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.15);
  margin-right: 25px;
  font-weight: 900;
  transition: color 0.2s;
  transform: skewX(6deg);
}
.p3r-list-card:hover .card-index { color: var(--p3r-cyan); }

.card-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: skewX(12deg);
}

.project-title {
  margin: 0;
  font-size: 1.4rem;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-transform: uppercase;
}

.project-summary {
  margin: 3px 0 6px 0;
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
}

.tag-ribbons { display: flex; gap: 5px; }
.inline-tag {
  background: var(--p3r-shadow-blue);
  color: var(--p3r-cyan);
  font-size: 0.65rem;
  padding: 2px 6px;
  font-family: sans-serif;
  font-weight: bold;
}
.p3r-list-card:hover .inline-tag {
  background: var(--p3r-pure-white);
  color: var(--p3r-deep-navy);
}

.action-arrow {
  margin-left: auto;
  z-index: 5;
  transform: skewX(12deg);
}
.arrow-shape {
  font-size: 1.2rem;
  color: var(--p3r-pure-white);
  transition: transform 0.25s, color 0.25s;
}
.p3r-list-card:hover .arrow-shape {
  color: var(--p3r-deep-navy);
  transform: scale(1.3) translateX(5px);
}

/* ================= SLICED PORAL MODAL VIEWPORTS ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(3, 6, 15, 0.88);
  backdrop-filter: blur(14px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.p3r-modal-window {
  position: relative;
  width: 960px;
  background: var(--p3r-deep-navy);
  border: 4px solid var(--p3r-pure-white);
  box-shadow: -22px 22px 0px var(--p3r-cyan);
  transform: rotate(-1.5deg);
}

.p3r-close-anchor {
  position: absolute;
  top: -44px; right: -4px;
  background: var(--p3r-magenta);
  border: 4px solid var(--p3r-pure-white);
  border-bottom: none;
  color: var(--p3r-pure-white);
  font-family: var(--p3r-font-family);
  font-size: 0.95rem;
  padding: 6px 26px;
  cursor: pointer;
  transform: skewX(-12deg);
  transition: background 0.15s, color 0.15s;
}
.p3r-close-anchor:hover {
  background: var(--p3r-pure-white);
  color: var(--p3r-deep-navy);
}

.modal-layout-grid {
  padding: 40px;
  display: flex;
  gap: 40px;
}

.modal-viewport-pane {
  flex: 1.3;
  display: flex;
  flex-direction: column;
}

.cinematic-deck {
  background: #02040a;
  width: 100%;
  height: 350px;
  position: relative;
  border: 3px solid var(--p3r-cyan);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
}

.scanlines {
  position: absolute; inset: 0;
  background-size: 100% 4px;
  z-index: 3; pointer-events: none;
}

.preview-wrap {
  width: 90%;
  height: 85%;
  border: 2px solid var(--p3r-pure-white);
  background: #090e1a;
  transform: rotate(1.5deg);
  overflow: hidden;
  z-index: 2;
}

.screenshot-asset {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.hud-watermark {
  position: absolute;
  top: 10px; left: 10px;
  background: var(--p3r-deep-navy);
  color: var(--p3r-cyan);
  font-family: monospace;
  font-size: 0.65rem;
  padding: 3px 8px;
  border: 1px solid var(--p3r-cyan);
  letter-spacing: 1px;
  z-index: 4;
}

.modal-dossier-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.file-pill {
  background: var(--p3r-pure-white);
  color: var(--p3r-deep-navy);
  display: inline-block;
  padding: 2px 12px;
  font-size: 0.8rem;
  transform: skewX(-10deg);
  font-weight: bold;
}

.dossier-title {
  font-size: 2.6rem;
  margin: 8px 0;
  line-height: 1.05;
  color: var(--p3r-pure-white);
  text-shadow: 2px 2px 0px var(--p3r-magenta);
}

.dossier-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 15px; }
.dossier-tag-item {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--p3r-cyan);
  font-weight: bold;
}

.section-indicator {
  color: var(--p3r-magenta);
  font-size: 1.1rem;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.dossier-desc {
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.dossier-footer { text-align: right; margin-top: 20px; }

.p3r-action-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 14px 35px;
  cursor: pointer;
  display: inline-block;
}

.btn-skew-fill {
  position: absolute; inset: 0;
  background: var(--p3r-magenta);
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
  z-index: 1;
  transition: background 0.2s, transform 0.2s;
}

.btn-inner-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--p3r-pure-white);
}

.p3r-action-btn:hover .btn-skew-fill {
  background: var(--p3r-cyan);
  transform: scaleX(1.04);
}
.p3r-action-btn:hover .btn-inner-content {
  color: var(--p3r-deep-navy);
}

.p3r-action-btn .btn-txt { font-family: var(--p3r-font-family); font-size: 1.2rem; letter-spacing: 1px; }
.p3r-action-btn .btn-ico { font-size: 0.8rem; transform: rotate(-90deg); transition: transform 0.2s; }
.p3r-action-btn:hover .btn-ico { transform: rotate(0deg); }

.p3r-modal-enter-active, .p3r-modal-leave-active { transition: opacity 0.25s ease; }
.p3r-modal-enter-active .p3r-modal-window { animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.p3r-modal-leave-active .p3r-modal-window { animation: p3rSlashIn 0.2s ease reverse forwards; }
.p3r-modal-enter-from, .p3r-modal-leave-to { opacity: 0; }

@keyframes p3rSlashIn {
  0% { transform: scale(0.88) rotate(-5deg) translateY(40px); opacity: 0; }
  100% { transform: scale(1) rotate(-1.5deg) translateY(0); opacity: 1; }
}

/* ================= ADAPTIVE SCREEN BREAKPOINTS (768PX/868PX INLINE CODES) ================= */
@media (max-width: 1150px) {
  .panel { width: 55%; }
}

@media (max-width: 868px) {
  .p3r-theme {
    overflow: hidden; /* Main viewport stays totally locked */
  }

  .panel {
    width: 90% !important;
    left: 5% !important;
    top: 6% !important;
    height: 88vh !important; /* Forces bounding layout structure on mobile screens */
    padding: 20px 15px !important;
    overflow-y: scroll !important;
  }

  .grid {
    padding-left: 0;
    gap: 15px;
  }

  .p3r-list-card {
    height: auto;
    padding: 15px 0;
    transform: none !important; /* Drops hardware skew matrix locks to prevent unresponsiveness */
  }

  .p3r-list-card:hover,
  .p3r-list-card.is-active {
    transform: translateX(5px) !important;
  }

  .card-bg-base { transform: none; }
  .card-bg-accent { display: none; }
  .card-body { padding: 0 15px; }
  .card-text-block { transform: none; }
  .action-arrow { display: none; }

  /* OVERLAY HANDLING FOR TARGET DOSSIERS */
  .modal-backdrop {
    overflow-y: auto;
    align-items: flex-start;
    padding: 60px 10px 20px 10px;
  }

  .main-title { font-size: 3rem; }

  .p3r-modal-window {
    width: 100%;
    transform: none !important;
    margin-bottom: 20px;
  }

  .modal-layout-grid {
    flex-direction: column;
    padding: 25px 15px;
    gap: 20px;
  }

  .cinematic-deck {
    height: 220px;
  }
  
  .p3r-close-anchor {
    top: -42px; right: -4px;
    transform: none;
  }
}

/* ============= Background Poster =============== */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.bg-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 0;
}

.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.bg-video.ready {
  opacity: 1;
}

.bg-poster.hidden {
  opacity: 0;
}
</style>