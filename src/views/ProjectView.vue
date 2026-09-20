<template>
  <div class="project-page p3r-theme">
    <BackBtn />
    <IntroSlash />

    <!-- BACKGROUND VIDEO / AMBIENT OCEANIC LAYER -->
    <div class="bg-layer">
      <img class="bg-poster" src="../assets/images/stack.jpg" alt="Background poster" />
      <video
        class="bg-video"
        :src="currentVideo"
        autoplay
        loop
        muted
        playsinline
        @loadeddata="onVideoReady"
      />
      <!-- Persona 3 Underwater Ambient Bubbles -->
      <div class="ambient-bubbles" aria-hidden="true">
        <span v-for="n in 14" :key="n" class="bubble" :style="{ '--bi': n }"></span>
      </div>
    </div>
    
    <div class="overlay"></div>
    <div class="hud-scanlines"></div>
    <div class="moving-watermark">P3R_ARCHIVE_DATA // TARTARUS_LOGS</div>

    <!-- MAIN INTERACTIVE ARCHIVE PANEL -->
    <main class="panel" :class="{ enter: pageReady }" ref="panelRef">
      
      <!-- P3R SKEWED HEADER -->
      <header class="top-header">
        <div class="status-badge">
          <span class="badge-icon">◆</span>
          <span>VELVET ARCHIVES // SYSTEM DATABASE LOADOUT</span>
        </div>
        <div class="title-container">
          <h1 class="main-title" data-text="PROJECTS">PROJECTS</h1>
          <span class="jp-title">アーカイブ</span>
        </div>
        <p class="subtitle">// S.E.E.S._MISSION_ARCHIVE_CONSTRUCTS</p>
      </header>

      <!-- P3R TACTICAL CATEGORY FILTER -->
      <nav class="p3r-filter-nav" aria-label="Project Categories">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="filter-btn"
          :class="{ active: activeCategory === cat.id }"
          @click="setCategory(cat.id)"
          @pointerenter="onTabHover"
        >
          <span class="filter-lbl">{{ cat.name }}</span>
          <span class="filter-count">[{{ getCategoryCount(cat.id) }}]</span>
          <span class="filter-sub">{{ cat.jp }}</span>
        </button>
      </nav>

      <!-- SKEWED PROJECT CARDS LIST -->
      <div class="grid">
        <div
          v-for="(p, i) in filteredProjects"
          :key="p.title"
          class="p3r-list-card"
          :class="{ 'is-active': activeIndex === i }"
          :style="{ '--i': i }"
          @pointerenter="onCardHover(i)"
          @click="handleCardClick(i)"
        >
          <!-- STYLIZED CARD BASE & ACCENTS -->
          <div class="card-bg-base"></div>
          <div class="card-bg-accent"></div>
          <div class="card-left-stripe"></div>
          <div class="corner-cross cross-tl"></div>
          <div class="corner-cross cross-br"></div>

          <div class="card-body">
            <!-- P3R STYLIZED NUMBER BLOCK -->
            <div class="card-index-col">
              <span class="card-index-sub">NO.</span>
              <span class="card-index">{{ p.id }}</span>
              <div class="card-index-bar"></div>
            </div>

            <!-- PROJECT CONTENT BLOCK -->
            <div class="card-text-block">
              <div class="card-meta-row">
                <div class="card-arcana-pill">
                  <span class="arcana-icon">✦</span>
                  <span class="arcana-txt">{{ p.arcanaShort }}</span>
                </div>
                <div class="clearance-wrap">
                  <span class="clearance-pill">{{ p.clearance }}</span>
                </div>
              </div>

              <h2 class="project-title">{{ p.title }}</h2>
              <p class="project-summary">{{ p.shortDesc }}</p>

              <!-- P3R MINI PARAMETER GAUGE -->
              <div class="card-gauge-row">
                <span class="gauge-name">{{ p.stat.label }}</span>
                <div class="gauge-track">
                  <div class="gauge-bar" :style="{ width: p.stat.value + '%' }">
                    <div class="gauge-glare"></div>
                  </div>
                </div>
                <span class="gauge-number">{{ p.stat.value }}%</span>
              </div>
              
              <div class="tag-ribbons">
                <span v-for="t in p.tags.slice(0, 5)" :key="t" class="inline-tag">{{ t }}</span>
                <span v-if="p.tags.length > 5" class="inline-tag more">+{{ p.tags.length - 5 }}</span>
              </div>
            </div>
            
            <!-- RETICLE TARGET ARROW -->
            <div class="action-arrow">
              <span class="arrow-target-bracket">[</span>
              <span class="arrow-shape">▶</span>
              <span class="arrow-target-bracket">]</span>
            </div>
          </div>
        </div>
      </div>

    </main>

    <!-- FULL TARTARUS DEEP DOSSIER MODAL -->
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
                <div class="hud-watermark">SYS_LINK // {{ selectedProject.host }}</div>
              </div>
              <div class="modal-telemetry-row">
                <span class="telemetry-box">STATUS: LIVE IN PRODUCTION</span>
                <span class="telemetry-box">CLEARANCE: RANK S</span>
              </div>
            </div>

            <div class="modal-dossier-pane">
              <header class="dossier-header">
                <div class="file-pill">TARGET_DOSSIER // {{ selectedProject.arcana }}</div>
                <h2 class="dossier-title">{{ selectedProject.title }}</h2>
                <div class="dossier-tags">
                  <span v-for="t in selectedProject.tags" :key="t" class="dossier-tag-item">#{{ t }}</span>
                </div>
              </header>

              <div class="dossier-body">
                <h3 class="section-indicator">◆ SYSTEM ARCHITECTURE OVERVIEW</h3>
                <p class="dossier-desc">{{ selectedProject.longDesc }}</p>

                <div class="modal-specs-box">
                  <div class="m-spec"><span class="k">PLATFORM:</span> <span class="v">{{ selectedProject.specs.role }}</span></div>
                  <div class="m-spec"><span class="k">HOST:</span> <span class="v cyan">{{ selectedProject.specs.runtime }}</span></div>
                  <div class="m-spec"><span class="k">PIPELINE:</span> <span class="v">{{ selectedProject.specs.pipeline }}</span></div>
                  <div class="m-spec"><span class="k">STORAGE:</span> <span class="v">{{ selectedProject.specs.storage }}</span></div>
                </div>
              </div>

              <footer class="dossier-footer">
                <button class="p3r-action-btn" @click="onClickLaunchProject(selectedProject.url)" @pointerenter="onHover">
                  <span class="btn-skew-fill"></span>
                  <span class="btn-inner-content">
                    <span class="btn-txt">LAUNCH LIVE INTERFACE</span>
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
import { useVideoManager } from '../composables/useVideoManager'
import { playSwitchToggle, playClick, playHover } from '../utils/sound'
import tovreanPreview from '../assets/images/tovrean-preview.png'
import doOrtPreview from '../assets/images/doOrt-preview.png'
import persona3Preview from '../assets/images/persona3-preview.png'
import anisukiPreview from '../assets/images/anisuki-preview.png'
import { videos } from '../config/videos'

const {
  setVideo,
  clearVideo,
  currentVideo
} = useVideoManager()

const videoReady = ref(false)
const pageReady = ref(false)
const activeIndex = ref<number>(0)
const selectedIndex = ref<number | null>(null)
const isPreviewOpen = ref<boolean>(false)
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'ALL ARCHIVES', jp: '全記録' },
  { id: 'fullstack', name: 'FULL-STACK', jp: 'フルスタック' },
  { id: 'devops', name: 'DEVOPS & CLOUD', jp: 'インフラ' },
  { id: 'frontend', name: 'FRONTEND & UI', jp: 'フロント' },
]

interface Project {
  id: string
  title: string
  category: string
  arcana: string
  arcanaShort: string
  clearance: string
  host: string
  shortDesc: string
  longDesc: string
  tags: string[]
  url: string
  image: string
  specs: {
    role: string
    runtime: string
    pipeline: string
    storage: string
  }
  stat: {
    label: string
    value: number
  }
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Tovrean E-commerce School Supply',
    category: 'fullstack',
    arcana: 'ARCANA I : THE MAGICIAN 魔術師',
    arcanaShort: 'I // MAGICIAN 魔術師',
    clearance: 'RANK S // DEPLOYED',
    host: 'AWS EC2 / NGINX / DOCKER',
    shortDesc: 'Modern school supplies shopping platform built with Vue 3 and Spring Boot.',
    longDesc: 'A comprehensive full-stack e-commerce web platform engineered for students and parents. Features a responsive modern frontend, role-based authentication, Spring Boot Maven REST services, MongoDB Atlas persistence, and an automated CI/CD pipeline powered by GitHub Actions, Docker containers, and Nginx reverse proxying on AWS EC2.',
    tags: ['Vue 3', 'TypeScript', 'Spring Boot', 'MongoDB Atlas', 'AWS EC2', 'GitHub Actions', 'Docker', 'Nginx', 'Tailwind CSS'],
    url: 'https://tovrean.loengpheaktra.xyz/',
    image: tovreanPreview,
    specs: {
      role: 'Full-Stack E-Commerce Platform',
      runtime: 'AWS EC2 (Ubuntu 22.04 LTS)',
      pipeline: 'GitHub Actions → Docker Registry',
      storage: 'MongoDB Atlas Cloud'
    },
    stat: {
      label: 'FULL-STACK COMPLEXITY',
      value: 95
    }
  },
  {
    id: '02',
    title: 'DoOrt C2C Material Exchange Platform',
    category: 'fullstack',
    arcana: 'ARCANA IV : THE EMPEROR 皇帝',
    arcanaShort: 'IV // EMPEROR 皇帝',
    clearance: 'RANK S // DEPLOYED',
    host: 'CLOUDFLARE / RENDER',
    shortDesc: 'Vue 3 + NestJS full-stack peer-to-peer material streaming platform.',
    longDesc: 'A decentralized peer-to-peer exchange ecosystem allowing community members to list, discover, and trade recyclable materials in real time. Features robust NestJS microservices, MongoDB transaction handling, secure containerized Docker builds, and edge routing via Cloudflare Pages and Render.',
    tags: ['Vue 3', 'NestJS', 'MongoDB', 'Docker', 'TypeScript', 'Cloudflare Pages', 'Render', 'REST API'],
    url: 'https://material-exchange-platform.pages.dev',
    image: doOrtPreview,
    specs: {
      role: 'C2C Material Streaming Ecosystem',
      runtime: 'Cloudflare Pages & Render Containers',
      pipeline: 'Automated Git Deploy Hook',
      storage: 'MongoDB Document Clusters'
    },
    stat: {
      label: 'BACKEND ARCHITECTURE',
      value: 92
    }
  },
  {
    id: '03',
    title: 'Persona 3 Reload Portfolio System',
    category: 'devops',
    arcana: 'ARCANA 0 : THE FOOL 愚者',
    arcanaShort: '0 // THE FOOL 愚者',
    clearance: 'RANK S // DEPLOYED',
    host: 'AWS EC2 / JENKINS / ANSIBLE',
    shortDesc: 'Immersive portfolio system engineered with Persona 3 Reload aesthetic & audio.',
    longDesc: 'A high-concept personal portfolio application meticulously modeled after Persona 3 Reload’s iconic UI philosophy. Integrates custom audio hooks, animated polygon shards, dynamic video layer management, and automated deployment pipelines utilizing Docker, Jenkins, Ansible, and Nginx on AWS EC2.',
    tags: ['Vue 3', 'TypeScript', 'CSS Shards', 'Docker', 'Jenkins', 'Ansible', 'AWS EC2', 'Nginx', 'Pinia'],
    url: 'https://www.loengpheaktra.me/',
    image: persona3Preview,
    specs: {
      role: 'Persona 3 Tactical Interface System',
      runtime: 'AWS EC2 / Nginx Reverse Proxy',
      pipeline: 'Jenkins CI/CD & Ansible Playbooks',
      storage: 'Pinia Local State & Cloudflare R2'
    },
    stat: {
      label: 'DEVOPS & UI AESTHETICS',
      value: 98
    }
  },
  {
    id: '04',
    title: 'AniSuki Anime Streaming Portal',
    category: 'frontend',
    arcana: 'ARCANA XVII : THE STAR 星',
    arcanaShort: 'XVII // THE STAR 星',
    clearance: 'RANK A // LIVE',
    host: 'NETLIFY HOSTING',
    shortDesc: 'High-speed anime streaming interface with personalized catalog navigation.',
    longDesc: 'A sleek, lightweight web streaming platform crafted with modern semantic HTML5, high-performance CSS animations, and vanilla JavaScript. Provides instant catalog search, responsive video players, and smooth category transitions.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Netlify', 'Media Player'],
    url: 'https://anisuki.netlify.app/home',
    image: anisukiPreview,
    specs: {
      role: 'Media Streaming & UI Experience',
      runtime: 'Netlify Edge CDN Distribution',
      pipeline: 'Continuous Git Push Pipeline',
      storage: 'Client-Side Web Storage'
    },
    stat: {
      label: 'FRONTEND PERFORMANCE',
      value: 88
    }
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

const selectedProject = computed(() => {
  return selectedIndex.value !== null ? filteredProjects.value[selectedIndex.value] : null
})

function getCategoryCount(catId: string): number {
  if (catId === 'all') return projects.length
  return projects.filter(p => p.category === catId).length
}

function onVideoReady(e: Event) {
  videoReady.value = true
  const video = e.target as HTMLVideoElement
  video.classList.add('ready')
}

function setCategory(catId: string) {
  if (activeCategory.value === catId) return
  activeCategory.value = catId
  activeIndex.value = 0
  playSwitchToggle()
}

function onCardHover(i: number) {
  if (activeIndex.value !== i) {
    activeIndex.value = i
    playSwitchToggle()
  }
}

function handleCardClick(i: number) {
  activeIndex.value = i
  playClick()
  openPreview(i)
}

function openPreview(index: number) {
  selectedIndex.value = index
  isPreviewOpen.value = true
}

function closePreview() {
  isPreviewOpen.value = false
}

function onClickClose() {
  closePreview()
  playClick()
}

function onClickLaunchProject(url: string) {
  playClick()
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    alert('System interface target link is currently offline!')
  }
}

function onTabHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') closePreview()
}

onMounted(() => {
  setVideo(videos.project)
  window.addEventListener('keydown', handleEsc)
  requestAnimationFrame(() => {
    pageReady.value = true
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
  clearVideo()
})
</script>

<style scoped>
/* ================= GLOBAL DESIGN PILLARS ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-deep-navy: #030712;
  --p3r-card-bg: rgba(6, 14, 32, 0.94);
  --p3r-shadow-blue: #0f1c3f;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-gold: #ffee00;
  --p3r-font-family: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-font-family);
  color: var(--p3r-pure-white);
  overflow: hidden;
  position: relative;
  background-color: var(--p3r-deep-navy);
}

/* ================= BACKGROUND & ATMOSPHERE ================= */
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
  transition: opacity 0.8s ease;
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
  transition: opacity 1.2s ease;
}

.bg-video.ready {
  opacity: 0.75;
}

/* Persona 3 Underwater Ambient Bubbles */
.ambient-bubbles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.bubble {
  position: absolute;
  bottom: -40px;
  left: calc(var(--bi) * 7.1%);
  width: calc(6px + (var(--bi) % 4) * 4px);
  height: calc(6px + (var(--bi) % 4) * 4px);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(0, 210, 255, 0.4) 60%, rgba(0, 210, 255, 0.1));
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
  animation: floatUp calc(8s + (var(--bi) % 5) * 2s) infinite ease-in;
  animation-delay: calc(var(--bi) * 0.6s);
  opacity: 0.65;
}

@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  15% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
}

.overlay, .hud-scanlines, .moving-watermark {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.overlay {
  background: radial-gradient(circle at 75% 40%, rgba(0, 210, 255, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.85) 100%);
}

.hud-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0, 210, 255, 0.02) 3px,
    rgba(0, 210, 255, 0.02) 4px
  );
}

.moving-watermark {
  top: auto; left: auto;
  bottom: -40px; right: -20px;
  width: auto; height: auto;
  font-size: 8.5rem;
  color: rgba(0, 210, 255, 0.035);
  transform: rotate(-6deg);
  white-space: nowrap;
  user-select: none;
  font-style: italic;
  font-weight: 900;
}

/* ================= CENTRAL DATA PANEL VIEWPORT ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 7%;
  width: 48%;
  max-width: 780px;
  height: 86vh;
  padding: 10px 25px 50px 10px;
  
  /* FORCE NATIVE GESTURE CAPTURE MECHANICS */
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  pointer-events: auto !important;
  will-change: scroll-position;
  transform: translate3d(0, 0, 0) skewX(-3deg);

  z-index: 10;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  scrollbar-width: none;
}

.panel.enter {
  opacity: 1;
  transform: translate3d(0, 0, 0) skewX(-3deg);
}

.panel::-webkit-scrollbar {
  width: 0px !important;
  background: transparent !important;
}

/* HEADER */
.top-header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-badge {
  background: var(--p3r-pure-white);
  color: #03060f;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 14px;
  font-size: 0.72rem;
  letter-spacing: 2px;
  font-weight: 900;
  transform: skewX(-10deg);
  margin-bottom: 8px;
  box-shadow: -3px 3px 0px var(--p3r-magenta);
}

.badge-icon {
  color: var(--p3r-magenta);
}

.title-container {
  display: flex;
  align-items: baseline;
  gap: 14px;
  transform: skewX(-4deg);
}

.main-title {
  font-size: clamp(2.8rem, 4.8vw, 4.2rem);
  margin: 0;
  line-height: 0.9;
  font-style: italic;
  color: var(--p3r-pure-white);
  text-shadow: 4px 4px 0px var(--p3r-cyan), -2px -2px 0px var(--p3r-magenta);
  letter-spacing: -1px;
}

.jp-title {
  font-size: 1.35rem;
  color: var(--p3r-cyan);
  font-weight: 900;
  letter-spacing: 3px;
  opacity: 0.85;
}

.subtitle {
  margin: 6px 0 0 0;
  font-family: monospace;
  font-size: 0.76rem;
  color: var(--p3r-cyan);
  letter-spacing: 1.5px;
}

/* ================= CATEGORY FILTER NAV ================= */
.p3r-filter-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.filter-btn {
  background: rgba(6, 14, 32, 0.85);
  border: 2px solid rgba(0, 210, 255, 0.35);
  color: var(--p3r-pure-white);
  font-family: var(--p3r-font-family);
  font-size: 0.8rem;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transform: skewX(-8deg);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -3px 3px 0px rgba(0, 0, 0, 0.8);
}

.filter-btn:hover {
  border-color: var(--p3r-cyan);
  background: rgba(12, 28, 64, 0.95);
  transform: skewX(-8deg) translateY(-2px);
  box-shadow: -4px 4px 0px var(--p3r-magenta);
}

.filter-btn.active {
  background: var(--p3r-cyan);
  color: #03060f;
  border-color: var(--p3r-pure-white);
  box-shadow: -5px 5px 0px var(--p3r-magenta);
  transform: skewX(-8deg) translateY(-2px);
}

.filter-lbl {
  font-weight: 900;
  letter-spacing: 1px;
}

.filter-count {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 900;
  opacity: 0.8;
}

.filter-sub {
  font-size: 0.65rem;
  opacity: 0.85;
}

/* ================= SKURVED LIST CARDS ================= */
.grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
}

.p3r-list-card {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transform: skewX(-6deg);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: cardFlyIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
  padding: 12px 14px;
}

@keyframes cardFlyIn {
  from { opacity: 0; transform: translateX(-30px) skewX(-6deg); }
  to { opacity: 1; transform: translateX(0) skewX(-6deg); }
}

.card-bg-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(6, 14, 32, 0.96) 0%, rgba(12, 24, 52, 0.96) 100%);
  border: 2px solid rgba(0, 210, 255, 0.4);
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.95), 0 0 16px rgba(0, 210, 255, 0.12);
  z-index: 1;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
}

.card-left-stripe {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 5px;
  background: var(--p3r-cyan);
  z-index: 3;
  transition: background 0.25s;
}

.card-bg-accent {
  position: absolute;
  top: 0; right: 0; bottom: 0; width: 0;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.12), rgba(255, 0, 85, 0.22));
  z-index: 2;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
}

.corner-cross {
  position: absolute;
  width: 12px; height: 12px;
  border-color: var(--p3r-cyan);
  z-index: 5;
  opacity: 0;
  transition: opacity 0.2s;
}
.cross-tl { left: -5px; top: -5px; border-left: 2px solid; border-top: 2px solid; }
.cross-br { right: -5px; bottom: -5px; border-right: 2px solid; border-bottom: 2px solid; }

.p3r-list-card:hover,
.p3r-list-card.is-active {
  transform: translateX(10px) skewX(-6deg);
}

.p3r-list-card:hover .card-bg-base,
.p3r-list-card.is-active .card-bg-base {
  border-color: var(--p3r-cyan);
  box-shadow: -8px 8px 0px var(--p3r-magenta), 0 0 18px rgba(0, 210, 255, 0.35);
  background: rgba(10, 24, 55, 0.98);
}

.p3r-list-card:hover .card-left-stripe,
.p3r-list-card.is-active .card-left-stripe {
  background: var(--p3r-magenta);
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
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 4;
  width: 100%;
  box-sizing: border-box;
}

/* COMPACT NUMBER BLOCK */
.card-index-col {
  width: 52px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(3, 7, 18, 0.8);
  border: 1px solid rgba(0, 210, 255, 0.3);
  padding: 6px 4px;
  transform: skewX(-4deg);
  transition: all 0.2s;
}

.card-index-sub {
  font-family: monospace;
  font-size: 0.55rem;
  color: var(--p3r-magenta);
  font-weight: 900;
  letter-spacing: 1px;
}

.card-index {
  font-size: 1.85rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 900;
  line-height: 1;
  transition: color 0.2s;
}

.card-index-bar {
  width: 70%;
  height: 2px;
  background: var(--p3r-cyan);
  margin-top: 3px;
  opacity: 0.5;
}

.p3r-list-card:hover .card-index-col,
.p3r-list-card.is-active .card-index-col {
  background: var(--p3r-cyan);
  border-color: #ffffff;
}

.p3r-list-card:hover .card-index,
.p3r-list-card.is-active .card-index {
  color: #03060f;
}

.p3r-list-card:hover .card-index-sub,
.p3r-list-card.is-active .card-index-sub {
  color: var(--p3r-magenta);
}

/* CONTENT BLOCK */
.card-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: 3px;
}

.card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.card-arcana-pill {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-magenta);
  background: rgba(255, 0, 85, 0.12);
  border: 1px solid var(--p3r-magenta);
  padding: 1px 7px;
  transform: skewX(-6deg);
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.arcana-icon {
  color: var(--p3r-gold);
  font-size: 0.7rem;
}

.clearance-pill {
  font-family: monospace;
  font-size: 0.62rem;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  color: #00ff88;
  padding: 1px 6px;
  font-weight: 900;
  transform: skewX(-6deg);
  white-space: nowrap;
}

.project-title {
  margin: 0;
  font-size: 1.15rem;
  letter-spacing: -0.2px;
  line-height: 1.15;
  text-transform: uppercase;
  font-style: italic;
  color: #ffffff;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
  word-break: break-word;
}

.project-summary {
  margin: 2px 0 3px 0;
  font-family: sans-serif;
  font-size: 0.74rem;
  color: #c4dcf8;
  line-height: 1.35;
}

/* MINI PARAMETER GAUGE */
.card-gauge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 2px 0 5px 0;
}

.gauge-name {
  font-family: monospace;
  font-size: 0.6rem;
  color: var(--p3r-cyan);
  font-weight: 900;
  letter-spacing: 0.5px;
}

.gauge-track {
  width: 100px;
  height: 5px;
  background: rgba(3, 7, 18, 0.9);
  border: 1px solid rgba(0, 210, 255, 0.4);
  position: relative;
  overflow: hidden;
}

.gauge-bar {
  height: 100%;
  background: repeating-linear-gradient(90deg, #00d2ff 0px, #00d2ff 5px, #041224 5px, #041224 6px);
  position: relative;
  box-shadow: 0 0 6px var(--p3r-cyan);
}

.gauge-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 80%);
}

.gauge-number {
  font-family: monospace;
  font-size: 0.65rem;
  font-weight: 900;
  color: #ffffff;
}

.tag-ribbons { 
  display: flex;
  gap: 5px; 
  flex-wrap: wrap;
}

.inline-tag {
  background: rgba(3, 7, 18, 0.9);
  color: var(--p3r-cyan);
  font-size: 0.64rem;
  padding: 2px 6px;
  font-family: monospace;
  font-weight: bold;
  border: 1px solid rgba(0, 210, 255, 0.3);
  transform: skewX(-6deg);
  white-space: nowrap;
}

.inline-tag.more {
  color: var(--p3r-magenta);
  border-color: var(--p3r-magenta);
}

.p3r-list-card:hover .inline-tag,
.p3r-list-card.is-active .inline-tag {
  border-color: var(--p3r-cyan);
}

.action-arrow {
  margin-left: auto;
  flex-shrink: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 2px;
}

.arrow-target-bracket {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--p3r-magenta);
  opacity: 0;
  transition: opacity 0.2s;
}

.arrow-shape {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.35);
  transition: transform 0.25s, color 0.25s;
}

.p3r-list-card:hover .arrow-target-bracket,
.p3r-list-card.is-active .arrow-target-bracket {
  opacity: 1;
}

.p3r-list-card:hover .arrow-shape,
.p3r-list-card.is-active .arrow-shape {
  color: var(--p3r-cyan);
  transform: scale(1.2) translateX(2px);
}

/* ================= SLICED MODAL VIEWPORTS ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(14px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.p3r-modal-window {
  position: relative;
  width: 1020px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--p3r-deep-navy);
  border: 4px solid var(--p3r-pure-white);
  box-shadow: -20px 20px 0px var(--p3r-cyan), 0 0 35px rgba(0, 210, 255, 0.35);
  transform: rotate(-1.5deg);
}

.p3r-close-anchor {
  position: absolute;
  top: -44px; right: -4px;
  background: var(--p3r-magenta);
  border: 3px solid var(--p3r-pure-white);
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
  color: #03060f;
}

.modal-layout-grid {
  padding: 36px;
  display: flex;
  gap: 36px;
}

.modal-viewport-pane {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cinematic-deck {
  background: #02040a;
  width: 100%;
  aspect-ratio: 16 / 10;
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
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.3) 2px,
    rgba(0, 0, 0, 0.3) 4px
  );
  z-index: 3; pointer-events: none;
}

.preview-wrap {
  width: 92%;
  height: 88%;
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

.modal-telemetry-row {
  display: flex;
  gap: 8px;
}

.telemetry-box {
  background: rgba(3, 7, 18, 0.9);
  border-left: 3px solid var(--p3r-magenta);
  color: var(--p3r-cyan);
  font-family: monospace;
  font-size: 0.68rem;
  padding: 4px 8px;
  flex: 1;
}

.modal-dossier-pane {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.file-pill {
  background: var(--p3r-pure-white);
  color: #03060f;
  display: inline-block;
  padding: 3px 12px;
  font-size: 0.75rem;
  transform: skewX(-10deg);
  font-weight: bold;
}

.dossier-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin: 8px 0;
  line-height: 1.05;
  color: var(--p3r-pure-white);
  text-shadow: 2px 2px 0px var(--p3r-magenta);
  font-style: italic;
}

.dossier-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 15px; }
.dossier-tag-item {
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--p3r-cyan);
  font-weight: bold;
}

.section-indicator {
  color: var(--p3r-magenta);
  font-size: 1rem;
  margin: 0 0 6px 0;
  letter-spacing: 1px;
  font-style: italic;
}

.dossier-desc {
  font-family: sans-serif;
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255,255,255,0.88);
  margin: 0 0 10px 0;
}

.modal-specs-box {
  background: rgba(3, 7, 18, 0.9);
  border-left: 3px solid var(--p3r-cyan);
  padding: 8px 10px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m-spec {
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.72rem;
}
.m-spec .k { color: rgba(255, 255, 255, 0.6); }
.m-spec .v { color: #ffffff; font-weight: bold; }
.m-spec .v.cyan { color: var(--p3r-cyan); }

.dossier-footer { text-align: right; margin-top: 15px; }

.p3r-action-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 12px 30px;
  cursor: pointer;
  display: inline-block;
}

.btn-inner-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--p3r-pure-white);
}

.btn-skew-fill {
  position: absolute; inset: 0;
  background: var(--p3r-magenta);
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
  z-index: 1;
  transition: background 0.2s, transform 0.2s;
}

.p3r-action-btn:hover .btn-skew-fill {
  background: var(--p3r-cyan);
  transform: scaleX(1.04);
}
.p3r-action-btn:hover .btn-inner-content {
  color: #03060f;
}

.p3r-action-btn .btn-txt { font-family: var(--p3r-font-family); font-size: 1.1rem; letter-spacing: 1px; }
.p3r-action-btn .btn-ico { font-size: 0.8rem; transform: rotate(-90deg); transition: transform 0.2s; }
.p3r-action-btn:hover .btn-ico { transform: rotate(0deg); }

/* ================= MODAL TRANSITIONS ================= */
.p3r-modal-enter-active, .p3r-modal-leave-active { transition: opacity 0.25s ease; }
.p3r-modal-enter-active .p3r-modal-window { animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.p3r-modal-leave-active .p3r-modal-window { animation: p3rSlashIn 0.2s ease reverse forwards; }
.p3r-modal-enter-from, .p3r-modal-leave-to { opacity: 0; }

@keyframes p3rSlashIn {
  0% { transform: scale(0.88) rotate(-5deg) translateY(40px); opacity: 0; }
  100% { transform: scale(1) rotate(-1.5deg) translateY(0); opacity: 1; }
}

/* ================= RESPONSIVE VIEWPORTS ================= */
@media (max-width: 1024px) {
  .panel {
    width: 60%;
    left: 4%;
  }
}

@media (max-width: 868px) {
  .p3r-theme {
    overflow: hidden;
  }

  .panel {
    width: 90% !important;
    left: 5% !important;
    top: 6% !important;
    height: 88vh !important;
    padding: 20px 15px !important;
    transform: none !important;
  }

  .grid {
    gap: 12px;
  }

  .p3r-list-card {
    transform: none !important;
  }

  .p3r-list-card:hover,
  .p3r-list-card.is-active {
    transform: translateX(5px) !important;
  }

  .modal-layout-grid {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  .p3r-close-anchor {
    top: -40px; right: 0;
    transform: none;
  }
}

@media (max-width: 500px) {
  .main-title {
    font-size: 2.6rem;
  }
  .title-container {
    flex-direction: column;
    gap: 2px;
  }
  .filter-btn {
    font-size: 0.74rem;
    padding: 5px 10px;
  }
}
</style>