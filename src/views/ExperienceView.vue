<template>
  <div class="exp-page p3r-theme">
    <div class="bg-layer-container">
      <!-- Background image -->
      <img
        class="bg-poster"
        src="../assets/images/skill.jpg"
        alt="background"
      />

      <!-- Video -->
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
      <div class="hud-grid-overlay"></div>
      <div class="bg-watermark-strip">P3R_MISSION_LOG_SEQUENCE_2026</div>
    </div>

    <!-- FLOATING P3R GEOMETRIC SHARDS -->
    <div class="p3r-shard shard-1"></div>
    <div class="p3r-shard shard-2"></div>

    <BackBtn />
    <IntroSlash />

    <div class="panel" :class="{ enter: pageReady }">
      <!-- P3R SKEWED HEADER -->
      <header class="top-header">
        <div class="status-ribbon">
          <span class="ribbon-icon">◆</span>
          <span>S.E.E.S. COMBAT HISTORY // DEPLOYMENT_RECORDS</span>
        </div>
        <div class="title-container">
          <h1 class="main-title" data-text="EXPERIENCE">EXPERIENCE</h1>
          <span class="jp-title">任務履歴</span>
        </div>
        <p class="subtitle">// OPERATIONAL_ARCHIVE_DATA_FILE</p>
      </header>

      <!-- P3R TACTICAL CATEGORY FILTER TABS -->
      <nav class="p3r-filter-nav" aria-label="Experience Categories">
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

      <!-- P3R SHARD TIMELINE -->
      <div class="timeline-container">
        <!-- ILLUMINATED TACTICAL CENTRAL SPINE -->
        <div class="central-spine-line">
          <div 
            v-for="(e, i) in filteredExperience" 
            :key="e.title" 
            class="spine-node" 
            :class="{ active: activeIndex === i }"
            :style="{ top: `calc(${i * 180 + 55}px)` }"
          >
            <span class="node-glyph">◆</span>
          </div>
        </div>

        <!-- TIMELINE SHARD CARDS -->
        <div
          v-for="(e, i) in filteredExperience"
          :key="e.title"
          class="p3r-shard-card"
          :class="{ 'is-active': activeIndex === i }"
          @pointerenter="onCardHover(i)"
          @click="onCardClick(e)"
          :style="{ '--i': i }"
        >
          <!-- DATE & STATUS BADGE -->
          <div class="shard-date-badge">
            <div class="date-corner-bracket"></div>
            <span class="date-text">{{ e.date }}</span>
            <div class="status-pill" :class="e.statusType">
              <span class="status-dot"></span>
              <span>{{ e.status }}</span>
            </div>
          </div>

          <!-- SHARD CARD CONTENT -->
          <div class="shard-wrapper">
            <div class="shard-bg-dark"></div>
            <div class="shard-bg-cyan"></div>
            <div class="shard-accent-stripe"></div>
            <div class="corner-cross cross-tl"></div>
            <div class="corner-cross cross-br"></div>

            <div class="shard-inner-content">
              <header class="shard-content-header">
                <div class="role-meta-row">
                  <span class="op-code">{{ e.opCode }}</span>
                  <span class="company-sub-link">
                    <span class="link-arrow">▶</span> {{ e.company }}
                  </span>
                </div>
                <h2 class="role-title">{{ e.title }}</h2>
              </header>

              <p class="shard-desc-body">
                <span class="desc-prompt">></span> {{ e.desc }}
              </p>

              <div class="tag-matrix-group">
                <span v-for="t in e.tags" :key="t" class="p3r-matrix-tag">{{ t }}</span>
              </div>
            </div>

            <!-- CARD FOOTER PROMPT -->
            <div class="shard-hud-index">
              <span class="hud-prompt">▲ TAP TO INSPECT DOSSIER</span>
              <span class="hud-log-id">LOG_#{{ e.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TARTARUS OPERATION DOSSIER MODAL -->
    <Transition name="p3r-modal">
      <div 
        class="modal-backdrop" 
        v-if="isModalOpen" 
        @click.self="closeModal"
      >
        <div class="p3r-modal-window">
          <button class="p3r-close-anchor" @click="onClickClose" @pointerenter="onTabHover">
            <span>CLOSE ▲</span>
          </button>

          <div class="modal-dossier-layout" v-if="selectedExperience">
            <header class="modal-dossier-header">
              <div class="dossier-pill-row">
                <span class="modal-file-pill">OPERATION_FILE // {{ selectedExperience.opCode }}</span>
                <span class="modal-status-pill" :class="selectedExperience.statusType">
                  {{ selectedExperience.status }}
                </span>
                <span class="modal-date-pill">{{ selectedExperience.date }}</span>
              </div>
              <h2 class="modal-op-title">{{ selectedExperience.title }}</h2>
              <div class="modal-division">
                <span class="div-lbl">TACTICAL ENVIRONMENT //</span>
                <span class="div-val">{{ selectedExperience.company }}</span>
              </div>
            </header>

            <!-- MISSION SPECIFICATIONS -->
            <div class="modal-specs-grid">
              <div class="m-spec-item">
                <span class="s-k">OPERATIONAL TARGET</span>
                <span class="s-v">{{ selectedExperience.specs.target }}</span>
              </div>
              <div class="m-spec-item">
                <span class="s-k">DEPLOYMENT UNIT</span>
                <span class="s-v">{{ selectedExperience.specs.unit }}</span>
              </div>
              <div class="m-spec-item">
                <span class="s-k">SYSTEM ARCHITECTURE</span>
                <span class="s-v cyan">{{ selectedExperience.specs.host }}</span>
              </div>
            </div>

            <!-- CORE ACHIEVEMENTS -->
            <div class="modal-achievements-block">
              <h3 class="achieve-title">◆ MISSION OBJECTIVES & DELIVERABLES</h3>
              <ul class="achieve-list">
                <li v-for="(ach, aIdx) in selectedExperience.achievements" :key="aIdx" class="achieve-item">
                  <span class="achieve-bullet">▶</span>
                  <span class="achieve-txt">{{ ach }}</span>
                </li>
              </ul>
            </div>

            <!-- TECHNOLOGY LOADOUT -->
            <div class="modal-tech-block">
              <h3 class="achieve-title">◆ ARSENAL & TOOLCHAIN MATRIX</h3>
              <div class="modal-tag-cloud">
                <span v-for="t in selectedExperience.tags" :key="t" class="p3r-matrix-tag large">
                  {{ t }}
                </span>
              </div>
            </div>

            <footer class="modal-footer">
              <span class="footer-telemetry">SYS_RECORD_LOG // AUTHENTICATED BY S.E.E.S.</span>
            </footer>
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
import { useVideoManager } from '../composables/useVideoManager'
import { playSwitchToggle, playClick, playHover } from '../utils/sound'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

const videoLoaded = ref(false)
const pageReady = ref(false)
const activeIndex = ref<number>(0)
const isModalOpen = ref(false)
const selectedExperience = ref<any>(null)
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'ALL OPERATIONS', jp: '全履歴' },
  { id: 'devops', name: 'DEVOPS & INFRA', jp: 'インフラ' },
  { id: 'fullstack', name: 'WEB & APIS', jp: 'フルスタック' },
]

interface ExperienceItem {
  id: string
  opCode: string
  title: string
  company: string
  category: 'devops' | 'fullstack'
  date: string
  status: string
  statusType: 'active' | 'cleared'
  desc: string
  achievements: string[]
  tags: string[]
  specs: {
    unit: string
    target: string
    host: string
  }
}

const experience: ExperienceItem[] = [
  {
    id: '01',
    opCode: 'OP_DEPLOY // 001',
    title: 'System Deployment Workflow',
    company: 'DevOps & Infrastructure Lab',
    category: 'devops',
    date: '2026 - Present',
    status: 'ACTIVE 進行中',
    statusType: 'active',
    desc: 'Built and maintained production deployment pipelines using containerized architecture, managing automated build, test, and release flows.',
    achievements: [
      'Architected end-to-end continuous integration and continuous deployment pipelines using GitHub Actions and Docker.',
      'Configured Nginx reverse proxying, SSL/TLS certificates, and automated zero-downtime rolling container restarts on AWS EC2.',
      'Hardened Linux Ubuntu server security with UFW firewall rules, SSH keys, and system monitoring daemons.'
    ],
    tags: ['Docker', 'Nginx', 'CI/CD', 'Linux', 'GitHub Actions', 'AWS EC2'],
    specs: {
      unit: 'Automated Deployment Squad',
      target: 'Zero-Downtime Containerized Releases',
      host: 'AWS EC2 / Ubuntu 22.04 LTS'
    }
  },
  {
    id: '02',
    opCode: 'OP_PERF // 002',
    title: 'Frontend Performance Optimization',
    company: 'Web Systems Development',
    category: 'fullstack',
    date: '2026',
    status: 'CLEARED 達成',
    statusType: 'cleared',
    desc: 'Maximized UI rendering speed and framerates by streamlining video background caching, component lifecycle events, and lazy-loading.',
    achievements: [
      'Engineered smooth cross-route video streaming with composable video managers to eliminate page transition stutter.',
      'Implemented route-level lazy loading and asset preloading, reducing initial bundle sizes by over 40%.',
      'Optimized CSS hardware acceleration and 60fps skew/slice transforms across desktop and mobile viewports.'
    ],
    tags: ['Vue 3', 'TypeScript', 'Performance', 'Lazy Loading', 'GPU Acceleration'],
    specs: {
      unit: 'Frontend Reactive Engineering',
      target: '60 FPS Cinematic Transition Rate',
      host: 'Vite 8 / Edge CDN Hosting'
    }
  },
  {
    id: '03',
    opCode: 'OP_ENV // 003',
    title: 'Development Environment Engineering',
    company: 'Local Virtualization Cluster',
    category: 'devops',
    date: '2026',
    status: 'CLEARED 達成',
    statusType: 'cleared',
    desc: 'Configured local virtual machines and networking environments for simulating multi-node microservice clusters and network routing.',
    achievements: [
      'Provisioned multi-node Linux guests using VMware and Docker Compose to simulate high-availability distributed systems.',
      'Configured local DNS routing, bridge networks, and port forwarding for testing inter-service microservice latency.',
      'Scripted automated provisioning and disaster recovery simulations using Bash scripts.'
    ],
    tags: ['VMware', 'Linux (Ubuntu)', 'Docker Compose', 'Virtual Networking', 'Bash'],
    specs: {
      unit: 'Virtualization & Networking Lab',
      target: 'Multi-Node Cluster Simulation',
      host: 'Local POSIX Virtual Environment'
    }
  },
  {
    id: '04',
    opCode: 'OP_API // 004',
    title: 'Backend API Integration & Security',
    company: 'Full-Stack Enterprise Systems',
    category: 'fullstack',
    date: '2025',
    status: 'CLEARED 達成',
    statusType: 'cleared',
    desc: 'Integrated secure RESTful APIs with frontend clients, handling JWT authentication, structured error schemas, and persistent DB storage.',
    achievements: [
      'Designed RESTful endpoints with Spring Boot and Node.js implementing role-based access control (RBAC).',
      'Engineered error-handling middlewares and unified response envelopes for transparent client-side debugging.',
      'Integrated MongoDB and MySQL database drivers with schema validation, indexes, and connection pooling.'
    ],
    tags: ['REST API', 'Spring Boot', 'Node.js', 'JWT Auth', 'MySQL', 'MongoDB'],
    specs: {
      unit: 'Core Backend Architecture',
      target: 'High-Concurrency REST API Integration',
      host: 'Java Spring Boot / Node.js Engine'
    }
  },
  {
    id: '05',
    opCode: 'OP_DATA // 005',
    title: 'Database Load Balancing & High Availability',
    company: 'Distributed Database Systems',
    category: 'devops',
    date: '2025',
    status: 'CLEARED 達成',
    statusType: 'cleared',
    desc: 'Researched and implemented database load balancing and replica distribution to maintain query throughput and high availability.',
    achievements: [
      'Configured primary-replica database topologies and read/write splitting to balance high-traffic queries.',
      'Analyzed slow query performance with execution plans (EXPLAIN) and added compound indexes.',
      'Implemented automated database health checks, heartbeat pinging, and automated failover triggers.'
    ],
    tags: ['MySQL Clustering', 'Load Balancing', 'High Availability', 'Query Optimization'],
    specs: {
      unit: 'Data Persistence Cluster',
      target: 'Distributed Database Scalability',
      host: 'Distributed MySQL / MongoDB Replica Set'
    }
  }
]

const filteredExperience = computed(() => {
  if (activeCategory.value === 'all') return experience
  return experience.filter(e => e.category === activeCategory.value)
})

function getCategoryCount(catId: string): number {
  if (catId === 'all') return experience.length
  return experience.filter(e => e.category === catId).length
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

function onCardClick(item: ExperienceItem) {
  selectedExperience.value = item
  isModalOpen.value = true
  playClick()
}

function onClickClose() {
  isModalOpen.value = false
  playClick()
}

function closeModal() {
  isModalOpen.value = false
}

function onTabHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  const isMobile = window.innerWidth <= 868
  if (!isMobile) {
    setVideo(videos.skill)
  }

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
/* ================= GLOBAL SYSTEMS CONFIG ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-navy-void: #030712;
  --p3r-dark-slate: #0d162d;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-gold: #ffee00;
  --p3r-font: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-font);
  color: var(--p3r-pure-white);
  overflow: hidden;
  position: relative;
  background-color: var(--p3r-navy-void);
}

/* ================= BACKGROUND & ATMOSPHERE ================= */
.bg-layer-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bg-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  transition: opacity 0.8s ease;
}

.bg-video.loaded {
  opacity: 0.8;
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

.overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(circle at 75% 40%, rgba(0, 210, 255, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, rgba(3, 7, 18, 0.45) 0%, rgba(3, 7, 18, 0.85) 100%);
}

.hud-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 210, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 210, 255, 0.03) 1px, transparent 1px);
  background-size: 35px 35px;
  z-index: 3;
}

.bg-watermark-strip {
  position: absolute;
  left: auto; right: -20px;
  bottom: -30px;
  width: auto; height: auto;
  font-size: 8rem;
  color: rgba(0, 210, 255, 0.035);
  transform: rotate(-6deg);
  white-space: nowrap;
  user-select: none;
  z-index: 1;
  font-weight: 900;
  font-style: italic;
}

/* Floating Persona 3 Shards */
.p3r-shard {
  position: fixed;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.4), rgba(255, 0, 85, 0.25));
  border: 1px solid rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 4;
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.35);
}

.shard-1 {
  top: 8%; right: 8%;
  width: 42px; height: 70px;
  clip-path: polygon(0 0, 100% 25%, 80% 100%, 10% 85%);
  animation: shardFloat 6s ease-in-out infinite alternate;
}

.shard-2 {
  bottom: 16%; right: 12%;
  width: 32px; height: 50px;
  clip-path: polygon(20% 0, 100% 15%, 70% 100%, 0% 80%);
  animation: shardFloat 7s ease-in-out infinite alternate-reverse;
}

@keyframes shardFloat {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-16px) rotate(8deg); }
}

/* ================= CENTRAL DATA PANEL ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 7%;
  width: 50%;
  max-width: 800px;
  height: 86vh;
  padding: 10px 25px 50px 10px;
  
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

.status-ribbon {
  background: var(--p3r-pure-white);
  color: var(--p3r-navy-void);
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

.ribbon-icon {
  color: var(--p3r-magenta);
}

.title-container {
  display: flex;
  align-items: baseline;
  gap: 14px;
  transform: skewX(-4deg);
}

.main-title {
  font-size: clamp(2.8rem, 4.8vw, 4.4rem);
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
  margin-bottom: 18px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.filter-btn {
  background: rgba(6, 14, 32, 0.85);
  border: 2px solid rgba(0, 210, 255, 0.35);
  color: var(--p3r-pure-white);
  font-family: var(--p3r-font);
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

/* ================= THE P3R SKEWED SHARD TIMELINE ================= */
.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-left: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* ILLUMINATED CENTRAL SPINE */
.central-spine-line {
  position: absolute;
  left: 105px;
  top: 15px;
  bottom: 20px;
  width: 3px;
  background: linear-gradient(180deg, var(--p3r-cyan) 0%, rgba(0, 210, 255, 0.3) 70%, rgba(255, 0, 85, 0.2) 100%);
  z-index: 1;
}

.spine-node {
  position: absolute;
  left: -7px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p3r-cyan);
  font-size: 0.75rem;
  transition: all 0.25s ease;
  background: var(--p3r-navy-void);
  border-radius: 50%;
}

.spine-node.active {
  color: var(--p3r-magenta);
  transform: scale(1.3);
  text-shadow: 0 0 10px var(--p3r-magenta);
}

/* SHARD CARD */
.p3r-shard-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  opacity: 0;
  transform: skewX(-6deg);
  animation: p3rShardFlyIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
  cursor: pointer;
}

@keyframes p3rShardFlyIn {
  from { opacity: 0; transform: translateX(-30px) skewX(-6deg); }
  to { opacity: 1; transform: translateX(0) skewX(-6deg); }
}

/* DATE BADGE */
.shard-date-badge {
  position: relative;
  width: 90px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 14px;
  margin-top: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.date-corner-bracket {
  position: absolute;
  right: 0; top: 0; bottom: 0; width: 3px;
  background: var(--p3r-magenta);
}

.date-text {
  font-family: var(--p3r-font);
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 900;
  color: var(--p3r-pure-white);
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.status-pill {
  font-family: monospace;
  font-size: 0.58rem;
  padding: 1px 5px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 900;
  white-space: nowrap;
}

.status-pill.active {
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  color: #00ff88;
}

.status-pill.cleared {
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid var(--p3r-cyan);
  color: var(--p3r-cyan);
}

.status-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: currentColor;
}

/* SHARD WRAPPER */
.shard-wrapper {
  position: relative;
  flex-grow: 1;
  min-width: 0;
  padding: 16px 22px;
  z-index: 2;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.shard-bg-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(7, 14, 29, 0.96) 0%, rgba(14, 26, 53, 0.96) 100%);
  border: 2px solid rgba(0, 210, 255, 0.4);
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.95), 0 0 16px rgba(0, 210, 255, 0.12);
  z-index: 1;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
}

.shard-accent-stripe {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 5px;
  background: var(--p3r-cyan);
  z-index: 3;
  transition: background 0.25s;
}

.shard-bg-cyan {
  position: absolute;
  top: 0; bottom: 0; left: 0; width: 0;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.12), rgba(255, 0, 85, 0.22));
  z-index: 2;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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

.p3r-shard-card:hover .shard-wrapper,
.p3r-shard-card.is-active .shard-wrapper {
  transform: translateX(10px);
}

.p3r-shard-card:hover .shard-bg-dark,
.p3r-shard-card.is-active .shard-bg-dark {
  border-color: var(--p3r-cyan);
  box-shadow: -8px 8px 0px var(--p3r-magenta), 0 0 18px rgba(0, 210, 255, 0.35);
  background: rgba(10, 24, 55, 0.98);
}

.p3r-shard-card:hover .shard-accent-stripe,
.p3r-shard-card.is-active .shard-accent-stripe {
  background: var(--p3r-magenta);
}

.p3r-shard-card:hover .shard-bg-cyan,
.p3r-shard-card.is-active .shard-bg-cyan {
  width: 40%;
}

.p3r-shard-card:hover .corner-cross,
.p3r-shard-card.is-active .corner-cross {
  opacity: 1;
}

.p3r-shard-card:hover .date-text {
  color: var(--p3r-cyan);
}

/* CONTENT INNER */
.shard-inner-content {
  position: relative;
  z-index: 4;
}

.shard-content-header {
  border-bottom: 1px dashed rgba(0, 210, 255, 0.25);
  padding-bottom: 6px;
  margin-bottom: 8px;
}

.role-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 2px;
}

.op-code {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-magenta);
  font-weight: 900;
  letter-spacing: 1px;
}

.company-sub-link {
  margin: 0;
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: bold;
  color: var(--p3r-cyan);
}

.link-arrow {
  color: var(--p3r-magenta);
  font-size: 0.65rem;
}

.role-title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.15;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  font-style: italic;
  color: #ffffff;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
}

.shard-desc-body {
  font-family: sans-serif;
  font-size: 0.76rem;
  line-height: 1.45;
  color: #c4dcf8;
  margin: 0 0 10px 0;
}

.desc-prompt {
  color: var(--p3r-cyan);
  font-weight: bold;
}

.tag-matrix-group {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.p3r-matrix-tag {
  background: rgba(3, 7, 18, 0.9);
  color: var(--p3r-pure-white);
  border: 1px solid rgba(0, 210, 255, 0.3);
  border-left: 2px solid var(--p3r-cyan);
  padding: 2px 7px;
  font-size: 0.65rem;
  font-family: monospace;
  font-weight: bold;
  transform: skewX(-6deg);
  transition: all 0.2s ease;
}

.p3r-shard-card:hover .p3r-matrix-tag {
  background: var(--p3r-cyan);
  color: #03060f;
  border-color: #ffffff;
}

.p3r-matrix-tag.large {
  font-size: 0.75rem;
  padding: 4px 10px;
}

.shard-hud-index {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: monospace;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.hud-prompt {
  color: var(--p3r-cyan);
  opacity: 0.8;
}

.p3r-shard-card:hover .hud-log-id {
  color: var(--p3r-magenta);
}

/* ================= TARTARUS DOSSIER MODAL ================= */
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
  width: 900px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--p3r-navy-void);
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
  font-family: var(--p3r-font);
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

.modal-dossier-layout {
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-dossier-header {
  border-bottom: 2px solid rgba(0, 210, 255, 0.3);
  padding-bottom: 14px;
}

.dossier-pill-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.modal-file-pill {
  background: var(--p3r-pure-white);
  color: #03060f;
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 900;
  padding: 2px 10px;
  transform: skewX(-10deg);
}

.modal-status-pill {
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: 900;
  padding: 2px 8px;
  transform: skewX(-8deg);
}

.modal-status-pill.active {
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  color: #00ff88;
}

.modal-status-pill.cleared {
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid var(--p3r-cyan);
  color: var(--p3r-cyan);
}

.modal-date-pill {
  font-family: var(--p3r-font);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--p3r-gold);
  margin-left: auto;
}

.modal-op-title {
  margin: 6px 0;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-style: italic;
  color: #ffffff;
  text-shadow: 2px 2px 0px var(--p3r-magenta);
}

.modal-division {
  font-family: monospace;
  font-size: 0.8rem;
  display: flex;
  gap: 6px;
}

.div-lbl { color: var(--p3r-cyan); }
.div-val { color: #ffffff; font-weight: bold; }

/* SPECS GRID */
.modal-specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: rgba(3, 7, 18, 0.9);
  border: 1px solid rgba(0, 210, 255, 0.25);
  padding: 12px;
}

.m-spec-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.s-k {
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.s-v {
  font-family: sans-serif;
  font-size: 0.82rem;
  color: #ffffff;
  font-weight: bold;
}

.s-v.cyan { color: var(--p3r-cyan); }

/* ACHIEVEMENTS BLOCK */
.modal-achievements-block, .modal-tech-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.achieve-title {
  margin: 0;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--p3r-magenta);
  letter-spacing: 1px;
}

.achieve-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.achieve-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: rgba(3, 7, 18, 0.8);
  border-left: 3px solid var(--p3r-cyan);
  padding: 8px 12px;
}

.achieve-bullet {
  color: var(--p3r-cyan);
  font-size: 0.75rem;
  margin-top: 2px;
}

.achieve-txt {
  font-family: sans-serif;
  font-size: 0.82rem;
  line-height: 1.45;
  color: #d8eaff;
}

.modal-tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-footer {
  border-top: 1px dashed rgba(0, 210, 255, 0.25);
  padding-top: 10px;
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--p3r-cyan);
  text-align: right;
}

/* ================= MODAL TRANSITIONS ================= */
.p3r-modal-enter-active, .p3r-modal-leave-active { transition: opacity 0.25s ease; }
.p3r-modal-enter-active .p3r-modal-window { animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.p3r-modal-leave-active .p3r-modal-window { animation: p3rSlashIn 0.2s ease reverse forwards; }
.p3r-modal-enter-from, .p3r-modal-leave-to { opacity: 0; }

@keyframes p3rSlashIn {
  0% { transform: scale(0.88) rotate(-5deg) translateY(40px); opacity: 0; }
  100% { transform: scale(1) rotate(-1.5deg) translateY(0); opacity: 1; }
}

/* ================= ADAPTIVE RESPONSIVENESS ================= */
@media (max-width: 1150px) {
  .panel { width: 60%; }
  .main-title { font-size: 4.2rem; }
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
    overflow-y: scroll !important;
    transform: none !important;
  }

  .main-title { font-size: 2.8rem; }
  .title-container { flex-direction: column; gap: 2px; }
  .filter-btn { font-size: 0.74rem; padding: 5px 10px; }

  .timeline-container { padding-left: 0; gap: 16px; }
  .central-spine-line { display: none; }
  
  .p3r-shard-card { 
    flex-direction: column; 
    gap: 6px; 
    transform: none !important; 
  }
  .p3r-shard-card:hover .shard-wrapper { transform: translateX(5px) !important; }
  
  .shard-date-badge { 
    width: auto; 
    text-align: left; 
    padding-right: 0; 
    margin-top: 0; 
    transform: none; 
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .date-corner-bracket { display: none; }
  
  .modal-specs-grid {
    grid-template-columns: 1fr;
  }

  .modal-dossier-layout {
    padding: 20px;
    gap: 16px;
  }

  .p3r-close-anchor {
    top: -40px; right: 0;
    transform: none;
  }
}
</style>