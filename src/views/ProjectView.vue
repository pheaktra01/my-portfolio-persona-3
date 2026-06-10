<template>
  <div class="project-page">
    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/project.jpg"
      preload="metadata"
    ></video>
    
    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <!-- MAIN PANEL LIST -->
    <div class="panel" ref="panelRef">
      <header class="top">
        <div class="status">PROJECT FILES</div>
        <h1>PROJECTS</h1>
        <p class="subtitle">PERSONA ARCHIVE</p>
      </header>

      <div class="grid">
        <div
          v-for="(p, i) in projects"
          :key="p.title"
          class="card"
          @mouseenter="active = i"
          @mouseleave="active = null"
          @click="openPreview(i)"
          :class="{ active: active === i }"
        >
          <div class="slash"></div>

          <div class="content">
            <h2>{{ p.title }}</h2>
            <p>{{ p.shortDesc }}</p>

            <div class="tags">
              <span v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>

            <button class="open-btn">PREVIEW</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PERSONA-STYLE INTERACTIVE MODAL OVERLAY -->
    <Transition name="persona-modal">
      <div class="modal-overlay" v-if="isPreviewOpen" @click.self="closePreview">
        
        <!-- Expanded Width Window Shell for Real Visual Screen Real Estate -->
        <div class="modal-window">
          <!-- Flush-aligned Close Corner Slice -->
          <button class="close-slice" @click="closePreview">CLOSE</button>

          <div class="modal-content" v-if="selectedProject">
            
            <!-- LEFT COLUMN: CINEMATIC WEBSITE CAPTURE DISPLAY -->
            <div class="modal-left-deck">
              <div class="display-deck">
                <div class="scanlines"></div>
                <div class="deck-inner has-preview">
                  <img 
                    :src="selectedProject.image" 
                    :alt="selectedProject.title" 
                    class="site-screenshot" 
                  />
                  <div class="hud-frame-label">SYS_LINK // ACTIVE_DISPLAY</div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: ALIGNED DATA STRIP -->
            <div class="modal-right-info">
              <header class="modal-header">
                <div class="meta-tag">TARGET_FILE</div>
                <h2>{{ selectedProject.title }}</h2>
                <div class="tags-row">
                  <span v-for="t in selectedProject.tags" :key="t" class="info-tag">{{ t }}</span>
                </div>
              </header>

              <div class="modal-body">
                <h3>SYSTEM OVERVIEW</h3>
                <p>{{ selectedProject.longDesc }}</p>
              </div>

              <!-- Footer Launch Button -->
              <footer class="modal-footer">
                <button class="launch-btn" @click="launchProject(selectedProject.url)">
                  <span class="btn-skew-bg"></span>
                  <span class="btn-text">LAUNCH INTERFACE</span>
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

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  setVideo(videos.project)
})

onBeforeUnmount(() => {
  clearVideo()
})

const active = ref<number | null>(null)
const selectedIndex = ref<number | null>(null)
const isPreviewOpen = ref<boolean>(false)

// PROJECTS DATA MATRIX
const projects = [
  {
    title: 'Tovrean E-commerce School Supply',
    shortDesc: 'Production platform core infrastructure.',
    longDesc: 'A live interactive web application showcasing structural layout sections, crisp high-fidelity asset rendering pipelines, fully responsive interactive navigation mechanics, and modular UI cards.',
    tags: ['Vue 3', 'TypeScript', 'Spring-Boot', 'MongoDB'],
    url: 'https://tovrean.loengpheaktra.xyz/',
    image: 'src/assets/images/tovrean-preview.png'
  },
  {
    title: 'DoOrt C2C E-commerce Material Exchange',
    shortDesc: 'Vue + NestJS full-stack streaming platform.',
    longDesc: 'A high-performance video deployment architecture featuring modular playback pipelines, continuous memory caching via Redis, and structural cluster layouts built inside NestJS backend layers.',
    tags: ['Vue', 'NestJS', 'MongoDB'],
    url: 'https://material-exchange-platform.pages.dev',
    image: 'src/assets/images/doOrt-preview.png'
  },
  {
    title: 'Persona 3 Reload Portfolio',
    shortDesc: 'Health monitoring app with analytics dashboard.',
    longDesc: 'Biometric processing utility capable of charting critical dynamic glucose curves, setting telemetry triggers, and syncing state records seamlessly over encrypted firestore cloud channels.',
    tags: ['Vue.js', 'TypeScript'],
    url: 'https://www.loengpheaktra.xyz/',
    image: 'src/assets/images/persona3-preview.png'
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
/* PAGE BASE CONFIG */
.project-page {
  padding-top: 20px;
  overflow: hidden;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
  height: 100%;
}

.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.2);
}

/* ORIGINAL LIST PANEL CONTAINER */
.panel {
  position: fixed;
  left: 0;
  top: 60px;
  width: 42%;
  height: calc(100vh - 60px);
  padding: 40px;
  overflow-y: auto;
  z-index: 2;
}

.panel::-webkit-scrollbar { display: none; }

.top h1 { font-size: 4.5rem; margin: 0; transform: skewX(-10deg); }
.status { color: #ff2e63; letter-spacing: 4px; }
.subtitle { opacity: 0.7; }

.grid { display: flex; flex-direction: column; gap: 18px; margin-top: 30px; }

.card {
  position: relative;
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 18px;
  transform: skewX(-6deg);
  overflow: hidden;
  transition: 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
}

.slash { position: absolute; left: 0; top: 0; width: 6px; height: 100%; background: #ff2e63; }

.card:hover, .card.active {
  transform: skewX(-6deg) translateX(15px) scale(1.02);
  border-color: #ff2e63;
}

.content h2 { margin: 0; font-size: 1.5rem; }
.content p { font-size: 0.9rem; opacity: 0.8; font-family: Arial, sans-serif; margin: 6px 0; }

.tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.tags span { background: #ff2e63; padding: 4px 8px; font-size: 0.7rem; transform: skewX(-10deg); }

.open-btn {
  margin-top: 12px; background: transparent; border: 1px solid #ff2e63;
  color: white; padding: 6px 16px; cursor: pointer; font-family: Impact; letter-spacing: 1px;
}
.card:hover .open-btn { background: #ff2e63; }

/* ================= THE REENGINEERED HIGH VISIBILITY POPUP MODAL ================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 5, 10, 0.88);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Widen container to 920px to host a generous side-by-side split screen view */
.modal-window {
  position: relative;
  width: 920px;
  max-width: 92%;
  transform: rotate(-1deg);
  filter: drop-shadow(16px 16px 0px #ff2e63);
}

/* Structural White Layer Geometric Angles */
.modal-window::before {
  content: '';
  position: absolute;
  inset: -5px;
  background-color: #fff;
  z-index: 1;
  clip-path: polygon(0 8%, 2% 0, 96% 0, 100% 8%, 100% 92%, 98% 100%, 4% 100%, 0 92%);
}

/* Core Dark Mask Layer */
.modal-window::after {
  content: '';
  position: absolute;
  inset: 0px;
  background-color: #0b0d17;
  z-index: 2;
  clip-path: polygon(0 8%, 2% 0, 96% 0, 100% 8%, 100% 92%, 98% 100%, 4% 100%, 0 92%);
}

/* Aligned Close tag sitting on top of the cut outline corner */
.close-slice {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff2e63;
  border: none;
  color: white;
  font-family: Impact;
  padding: 14px 28px 11px 28px;
  cursor: pointer;
  z-index: 10;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
  transition: background 0.15s, color 0.15s;
  font-size: 1rem;
  letter-spacing: 1px;
}
.close-slice:hover {
  background: #fff;
  color: #000;
}

/* CSS Grid Flex Split Layout for Visuals + Info Panels */
.modal-content {
  position: relative;
  color: white;
  z-index: 5;
  padding: 35px;
  display: flex;
  gap: 30px;
  align-items: stretch;
}

/* LEFT WINDOW: MASSIVE LIVE SITE PREVIEW DOCK */
.modal-left-deck {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.display-deck {
  background: #000;
  width: 100%;
  height: 340px; 
  position: relative;
  overflow-y: auto; 
  border: 3px solid #fff;
  outline: 2px solid #000;
  transform: rotate(-0.5deg);
}

.display-deck::-webkit-scrollbar {
  display: none;
}

.scanlines {
  position: absolute; inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 2; pointer-events: none;
}

.deck-inner.has-preview {
  width: 100%;
  height: 100%;
  padding: 0;
  background: #040509;
}

/* Upgraded Site Image rendering styles */
.site-screenshot {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  object-position: center; 
  display: block;
  opacity: 0.95;
}

/* Custom HUD Label Bar */
.hud-frame-label {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #000;
  color: #61e1ff;
  font-family: monospace;
  font-size: 0.7rem;
  padding: 3px 8px;
  z-index: 3;
  letter-spacing: 1px;
  border: 1px solid #61e1ff;
}

/* RIGHT WINDOW: TEXT METADATA CORE BLOCK */
.modal-right-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
}

.modal-header .meta-tag {
  background: #fff;
  color: #000;
  display: inline-block;
  font-family: Impact;
  padding: 3px 12px;
  font-size: 0.85rem;
  transform: skewX(-10deg);
  font-weight: bold;
}

.modal-header h2 {
  font-family: Impact;
  font-size: 2.5rem;
  margin: 10px 0 5px 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
  color: #61e1ff; 
  text-transform: uppercase;
  transform: skewX(-4deg);
}

.tags-row {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
}
.info-tag {
  font-family: monospace;
  font-size: 0.75rem;
  color: #ff2e63;
  font-weight: bold;
}

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
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
}

/* Skewed UI Launch Action Button */
.modal-footer { 
  text-align: right; 
  margin-top: 20px;
}
.launch-btn {
  position: relative; background: transparent; border: none;
  padding: 15px 45px; cursor: pointer; display: inline-block;
}
.btn-skew-bg {
  position: absolute; inset: 0; background: #ff2e63;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  z-index: 1; transition: background 0.15s;
}
.btn-text {
  position: relative; z-index: 2; font-family: Impact;
  font-size: 1.3rem; color: white; letter-spacing: 1.5px;
}
.launch-btn:hover .btn-skew-bg { background: #61e1ff; }
.launch-btn:hover .btn-text { color: #000; }

/* ================= VUE MOUNT TRANSITIONS ================= */
.persona-modal-enter-active,
.persona-modal-leave-active {
  transition: opacity 0.22s ease;
}

.persona-modal-enter-active .modal-window {
  animation: slash-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.persona-modal-leave-active .modal-window {
  animation: slash-in 0.18s ease reverse forwards;
}

.persona-modal-enter-from,
.persona-modal-leave-to {
  opacity: 0;
}

@keyframes slash-in {
  0% {
    transform: scale(0.85) rotate(-6deg) translateY(30px);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(-1deg) translateY(0);
    opacity: 1;
  }
}

/* ANIMATION ENTRANCE SEQUENCING */
.panel { animation: panelEnter 0.55s ease-out forwards; }
@keyframes panelEnter {
  from { opacity: 0; transform: translateX(-80px); }
  to { opacity: 1; transform: translateX(0); }
}
.card:nth-child(1) { animation-delay: 0.25s; }
.card:nth-child(2) { animation-delay: 0.35s; }
.card:nth-child(3) { animation-delay: 0.45s; }

/* ================= MOBILE RESPONSIVE ADAPTATION ================= */
@media (max-width: 868px) {
  .panel { width: 90%; left: 50%; transform: translateX(-50%); padding: 20px; }
  .top h1 { font-size: 2.8rem; }
  
  .modal-window { width: 95%; max-width: 480px; filter: drop-shadow(8px 8px 0px #ff2e63); }
  .modal-window::before, .modal-window::after { clip-path: none; border-radius: 0; }
  
  .modal-content { flex-direction: column; padding: 40px 20px 20px 20px; gap: 15px; }
  .display-deck { height: 200px; border-width: 2px; }
  
  .modal-header h2 { font-size: 2rem; }
  .close-slice { top: 0; right: 0; clip-path: none; padding: 10px 20px; }
  .launch-btn { width: 100%; text-align: center; }
  .btn-skew-bg { clip-path: none; }
}
</style>