<template>
  <div class="journey-page p3r-theme">
    <div class="bg-layer-container">

      <!-- Poster -->
      <img
        class="bg-poster"
        src="../assets/images/timeline.jpg"
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
      <div class="screen-scan-overlay"></div>
      <div class="ambient-ticker">
        SYS_TRACK_LOGS // TIMELINE_SEQUENCE_INITIALIZED
      </div>

    </div>

    <!-- FLOATING P3R GEOMETRIC SHARDS -->
    <div class="p3r-shard shard-1"></div>
    <div class="p3r-shard shard-2"></div>

    <BackBtn />
    <IntroSlash />

    <div class="panel" :class="{ enter: pageReady }">
      
      <!-- P3R SKEWED HEADER -->
      <header class="top-header">
        <div class="status-pill">
          <span class="pill-icon">◆</span>
          <span>S.E.E.S. ARCHIVE // ACADEMIC & ENGINEERING EVOLUTION</span>
        </div>
        <div class="title-frame">
          <h1 class="main-title" data-text="JOURNEY">JOURNEY</h1>
          <span class="jp-title">旅路・軌跡</span>
        </div>
        <p class="subtitle">// ACADEMIC_MILESTONES & ENGINEERING_CHRONICLES</p>
      </header>

      <!-- P3R TIMELINE TRACK -->
      <div class="p3r-timeline-track">
        
        <!-- ILLUMINATED TACTICAL CENTRAL SPINE -->
        <div class="central-spine-line">
          <div 
            v-for="(item, i) in combinedLogs" 
            :key="item.title" 
            class="spine-node" 
            :class="{ active: activeIndex === i }"
            :style="{ top: `calc(${i * 200 + 60}px)` }"
          >
            <span class="node-glyph">◆</span>
          </div>
        </div>

        <!-- CHRONO MILESTONE CARDS -->
        <div
          v-for="(item, i) in combinedLogs"
          :key="i"
          class="p3r-timeline-item"
          :class="{ 'is-active': activeIndex === i }"
          @pointerenter="onCardHover(i)"
          @click="onCardClick(item)"
          :style="{ '--i': i }"
        >
          <!-- CHRONO DATE & PHASE SECTOR -->
          <div class="chrono-stamp-sector">
            <div class="date-corner-bracket"></div>
            <span class="stamp-phase">{{ item.phaseCode }}</span>
            <span class="stamp-txt">{{ item.date }}</span>
            <span class="stamp-sub-jp">{{ item.jp }}</span>
            <div class="stamp-status-pill" :class="item.statusType">
              <span class="status-dot"></span>
              <span>{{ item.status }}</span>
            </div>
          </div>

          <!-- SHARD CARD WRAPPER -->
          <div class="p3r-log-plate">
            <div class="plate-base-bg"></div>
            <div class="plate-accent-slash"></div>
            <div class="plate-left-stripe"></div>
            <div class="corner-cross cross-tl"></div>
            <div class="corner-cross cross-br"></div>

            <div class="plate-content-body">
              <div class="log-meta-row">
                <span class="log-phase-tag">{{ item.phaseTitle }}</span>
                <span class="institution-tag">
                  <span class="tag-arrow">▶</span> {{ item.institution }}
                </span>
              </div>

              <h2 class="log-heading">{{ item.title }}</h2>
              <p class="log-paragraph">
                <span class="desc-prompt">></span> {{ item.desc }}
              </p>

              <div v-if="item.tags && item.tags.length" class="matrix-tag-row">
                <span v-for="tag in item.tags.slice(0, 6)" :key="tag" class="matrix-tag-pill">
                  {{ tag }}
                </span>
                <span v-if="item.tags.length > 6" class="matrix-tag-pill more">
                  +{{ item.tags.length - 6 }} MORE
                </span>
              </div>

              <!-- FOOTER PROMPT -->
              <div class="plate-hud-index">
                <span class="hud-prompt">▲ TAP FOR CHRONICLE DOSSIER</span>
                <span class="hud-log-id">// REG_00{{ i + 1 }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- TARTARUS ACADEMIC CHRONICLE MODAL -->
    <Transition name="p3r-modal">
      <div 
        class="modal-backdrop" 
        v-if="isModalOpen" 
        @click.self="closeModal"
      >
        <div class="p3r-modal-window">
          <button class="p3r-close-anchor" @click="onClickClose" @pointerenter="onHover">
            <span>CLOSE ▲</span>
          </button>

          <div class="modal-dossier-layout" v-if="selectedLog">
            <header class="modal-dossier-header">
              <div class="dossier-pill-row">
                <span class="modal-file-pill">ACADEMIC_RECORD // {{ selectedLog.phaseCode }}</span>
                <span class="modal-status-pill" :class="selectedLog.statusType">
                  {{ selectedLog.status }}
                </span>
                <span class="modal-date-pill">{{ selectedLog.date }}</span>
              </div>
              <h2 class="modal-op-title">{{ selectedLog.title }}</h2>
              <div class="modal-division">
                <span class="div-lbl">INSTITUTION //</span>
                <span class="div-val">{{ selectedLog.institution }}</span>
                <span class="div-sub-jp">({{ selectedLog.jp }})</span>
              </div>
            </header>

            <!-- NARRATIVE SUMMARY -->
            <div class="modal-overview-box">
              <h3 class="achieve-title">◆ ACADEMIC OVERVIEW</h3>
              <p class="modal-narrative">{{ selectedLog.desc }}</p>
            </div>

            <!-- KEY DELIVERABLES & COMPETENCIES -->
            <div class="modal-achievements-block">
              <h3 class="achieve-title">◆ CORE DISCIPLINES & ACCOMPLISHMENTS</h3>
              <ul class="achieve-list">
                <li v-for="(h, hIdx) in selectedLog.highlights" :key="hIdx" class="achieve-item">
                  <span class="achieve-bullet">▶</span>
                  <span class="achieve-txt">{{ h }}</span>
                </li>
              </ul>
            </div>

            <!-- CURRICULUM SUBJECTS -->
            <div v-if="selectedLog.tags && selectedLog.tags.length" class="modal-tech-block">
              <h3 class="achieve-title">◆ CURRICULUM & SUBJECT MATRIX</h3>
              <div class="modal-tag-cloud">
                <span v-for="t in selectedLog.tags" :key="t" class="matrix-tag-pill large">
                  {{ t }}
                </span>
              </div>
            </div>

            <footer class="modal-footer">
              <span class="footer-telemetry">SYS_RECORD_LOG // VERIFIED BY ITC CSE FACULTY</span>
            </footer>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager'
import { playClick, playSwitchToggle, playHover } from '../utils/sound'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

const videoLoaded = ref(false)
const pageReady = ref(false)
const activeIndex = ref<number>(0)
const isModalOpen = ref(false)
const selectedLog = ref<any>(null)

interface JourneyLog {
  id: string
  phaseCode: string
  phaseTitle: string
  jp: string
  date: string
  title: string
  institution: string
  status: string
  statusType: 'active' | 'cleared'
  desc: string
  highlights: string[]
  tags: string[]
}

const combinedLogs = ref<JourneyLog[]>([
  {
    id: '01',
    phaseCode: 'PHASE 01',
    phaseTitle: 'PHASE 01 // AWAKENING',
    jp: '高校卒業・入学',
    date: '2022',
    title: 'Finish High School & ITC Enrollment',
    institution: 'Institute of Technology of Cambodia (ITC)',
    status: 'COMPLETED // 修了',
    statusType: 'cleared',
    desc: 'Completed secondary education with distinction and passed evaluation to enroll in the Computer Science and Engineering program at ITC.',
    highlights: [
      'Graduated secondary high school education with strong marks in mathematics and scientific reasoning.',
      'Successfully admitted into the Institute of Technology of Cambodia (ITC) Computer Science and Engineering department.',
      'Commenced foundational studies in computational theory, structured problem-solving, and algorithmic thought.'
    ],
    tags: ['Mathematics', 'Physics', 'Computing Logic', 'Algorithm Fundamentals', 'Scientific Method']
  },
  {
    id: '02',
    phaseCode: 'PHASE 02',
    phaseTitle: 'PHASE 02 // FOUNDATION',
    jp: '基礎工学課程',
    date: '2022 - 2024',
    title: 'Study Year 1 & 2 at ITC (General Engineering)',
    institution: 'Foundation Year Department // ITC',
    status: 'COMPLETED // 修了',
    statusType: 'cleared',
    desc: 'Completed two years of intensive general engineering and scientific foundations covering calculus, thermodynamics, statistics, and programming paradigms.',
    highlights: [
      'Mastered differential and integral calculus, linear algebra matrices, and engineering physics.',
      'Developed strong algorithmic foundations with C and structured programming paradigms.',
      'Built discipline in statistical analysis, engineering design diagrams, and thermodynamics.'
    ],
    tags: ['Design', 'Calculus', 'Thermodynamics', 'Programming Fundamentals', 'Statistics', 'Linear Algebra', 'Physics']
  },
  {
    id: '03',
    phaseCode: 'PHASE 03',
    phaseTitle: 'PHASE 03 // SPECIALIZATION',
    jp: '情報工学専門課程',
    date: '2024 - 2025',
    title: 'Study Year 3 at ITC (Core Computer Science)',
    institution: 'Department of CSE // ITC',
    status: 'COMPLETED // 修了',
    statusType: 'cleared',
    desc: 'Immersed in core computer science disciplines including data structures, algorithmic complexity, object-oriented design, assembly, and operating systems.',
    highlights: [
      'Designed and analyzed complex data structures, search/sort algorithms, and recursive algorithms in Java and C/C++.',
      'Studied low-level computer architecture, assembly instructions, memory registers, and CPU scheduling in Operating Systems.',
      'Engineered relational database schemas with SQL and developed modern web applications.'
    ],
    tags: ['Java', 'C / C++', 'OOP', 'Data Structures', 'Algorithms', 'Database', 'Assembly', 'Web Design', 'Computer Architecture', 'Operating Systems']
  },
  {
    id: '04',
    phaseCode: 'PHASE 04',
    phaseTitle: 'PHASE 04 // ADVANCED SYSTEMS',
    jp: '最終学年・クラウド',
    date: '2025 - 2026',
    title: 'Study Year 4 at ITC (Cloud & Distributed Systems)',
    institution: 'Department of CSE // ITC',
    status: 'CURRENT STAGE // 進行中',
    statusType: 'active',
    desc: 'Advanced specialization in containerization, cloud computing, continuous deployment pipelines, cross-platform mobile apps, and distributed networks.',
    highlights: [
      'Architecting and deploying containerized microservice architectures using Docker, Kubernetes, and automated CI/CD pipelines.',
      'Developing cross-platform mobile solutions using Flutter & Dart with offline storage and REST client integrations.',
      'Configuring enterprise network infrastructure, Nginx reverse proxies, advanced database clustering, and telecommunications.'
    ],
    tags: ['Cloud Computing', 'DevOps', 'Mobile App Development', 'Internet Programming', 'Advanced Database', 'System Administration', 'Network Design', 'Telecommunications', 'HCI']
  }
])

function onCardHover(i: number) {
  if (activeIndex.value !== i) {
    activeIndex.value = i
    playSwitchToggle()
  }
}

function onCardClick(item: JourneyLog) {
  selectedLog.value = item
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

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  const isMobile = window.innerWidth <= 868

  if (!isMobile) {
    setVideo(videos.journey)
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
/* ================= GLOBAL DESIGN PALETTE ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-void: #03060f;
  --p3r-slate-card: #0c1428;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-gold: #ffee00;
  --p3r-impact-font: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-impact-font);
  color: var(--p3r-pure-white);
  overflow: hidden;
  position: relative;
  background-color: var(--p3r-void);
}

/* ================= BACKGROUND & ATMOSPHERE ================= */
.bg-layer-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
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

.screen-scan-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0, 210, 255, 0.02) 3px,
    rgba(0, 210, 255, 0.02) 4px
  );
  z-index: 3;
}

.ambient-ticker {
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
  font-style: italic;
  font-weight: 900;
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
  width: 48%;
  max-width: 780px;
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
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-pill {
  background: var(--p3r-pure-white);
  color: var(--p3r-void);
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

.pill-icon {
  color: var(--p3r-magenta);
}

.title-frame {
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

/* ================= CHRONO RECORD TRACK ================= */
.p3r-timeline-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-left: 20px;
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
  background: var(--p3r-void);
  border-radius: 50%;
}

.spine-node.active {
  color: var(--p3r-magenta);
  transform: scale(1.3);
  text-shadow: 0 0 10px var(--p3r-magenta);
}

/* TIMELINE ITEM */
.p3r-timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  opacity: 0;
  transform: skewX(-6deg);
  animation: p3rPlateEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
  cursor: pointer;
}

@keyframes p3rPlateEnter {
  from { opacity: 0; transform: translateX(-30px) skewX(-6deg); }
  to { opacity: 1; transform: translateX(0) skewX(-6deg); }
}

/* CHRONO DATE BADGE */
.chrono-stamp-sector {
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
  gap: 3px;
}

.date-corner-bracket {
  position: absolute;
  right: 0; top: 0; bottom: 0; width: 3px;
  background: var(--p3r-magenta);
}

.stamp-phase {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-cyan);
  font-weight: 900;
  letter-spacing: 0.5px;
}

.stamp-txt {
  font-family: var(--p3r-impact-font);
  font-size: 1.05rem;
  font-weight: 900;
  font-style: italic;
  color: var(--p3r-pure-white);
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.stamp-sub-jp {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

.stamp-status-pill {
  font-family: monospace;
  font-size: 0.58rem;
  padding: 1px 5px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 900;
  white-space: nowrap;
  margin-top: 2px;
}

.stamp-status-pill.active {
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  color: #00ff88;
}

.stamp-status-pill.cleared {
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid var(--p3r-cyan);
  color: var(--p3r-cyan);
}

.status-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: currentColor;
}

/* SHARD CARD BODY */
.p3r-log-plate {
  position: relative;
  flex-grow: 1;
  min-width: 0;
  padding: 16px 22px;
  z-index: 2;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.plate-base-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(6, 12, 25, 0.96) 0%, rgba(13, 23, 46, 0.96) 100%);
  border: 2px solid rgba(0, 210, 255, 0.4);
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.95), 0 0 16px rgba(0, 210, 255, 0.12);
  z-index: 1;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
}

.plate-left-stripe {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 5px;
  background: var(--p3r-cyan);
  z-index: 3;
  transition: background 0.25s;
}

.plate-accent-slash {
  position: absolute;
  top: 0; bottom: 0; right: 0; width: 0;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.12), rgba(255, 0, 85, 0.22));
  z-index: 2;
  clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
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

.p3r-timeline-item:hover .p3r-log-plate,
.p3r-timeline-item.is-active .p3r-log-plate {
  transform: translateX(10px);
}

.p3r-timeline-item:hover .plate-base-bg,
.p3r-timeline-item.is-active .plate-base-bg {
  border-color: var(--p3r-cyan);
  box-shadow: -8px 8px 0px var(--p3r-magenta), 0 0 18px rgba(0, 210, 255, 0.35);
  background: rgba(10, 24, 55, 0.98);
}

.p3r-timeline-item:hover .plate-left-stripe,
.p3r-timeline-item.is-active .plate-left-stripe {
  background: var(--p3r-magenta);
}

.p3r-timeline-item:hover .plate-accent-slash,
.p3r-timeline-item.is-active .plate-accent-slash {
  width: 35%;
}

.p3r-timeline-item:hover .corner-cross,
.p3r-timeline-item.is-active .corner-cross {
  opacity: 1;
}

.p3r-timeline-item:hover .stamp-txt {
  color: var(--p3r-cyan);
}

/* CONTENT BODY */
.plate-content-body {
  position: relative;
  z-index: 4;
}

.log-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 3px;
}

.log-phase-tag {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-magenta);
  font-weight: 900;
  letter-spacing: 1px;
}

.institution-tag {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: bold;
  color: var(--p3r-cyan);
}

.tag-arrow {
  color: var(--p3r-magenta);
  font-size: 0.65rem;
}

.log-heading {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: -0.3px;
  font-style: italic;
  color: #ffffff;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
}

.log-paragraph {
  margin: 4px 0 8px 0;
  font-family: sans-serif;
  font-size: 0.76rem;
  line-height: 1.45;
  color: #c4dcf8;
}

.desc-prompt {
  color: var(--p3r-cyan);
  font-weight: bold;
}

.matrix-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 6px;
}

.matrix-tag-pill {
  background: rgba(3, 7, 18, 0.9);
  color: var(--p3r-cyan);
  padding: 2px 7px;
  font-size: 0.64rem;
  font-family: monospace;
  font-weight: bold;
  border: 1px solid rgba(0, 210, 255, 0.3);
  transform: skewX(-6deg);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.matrix-tag-pill.more {
  color: var(--p3r-magenta);
  border-color: var(--p3r-magenta);
}

.p3r-timeline-item:hover .matrix-tag-pill {
  border-color: var(--p3r-cyan);
}

.matrix-tag-pill.large {
  font-size: 0.75rem;
  padding: 4px 10px;
}

.plate-hud-index {
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

.p3r-timeline-item:hover .hud-log-id {
  color: var(--p3r-magenta);
}

/* ================= TARTARUS CHRONICLE MODAL ================= */
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
  background: var(--p3r-void);
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
  font-family: var(--p3r-impact-font);
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
  font-family: var(--p3r-impact-font);
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
  align-items: baseline;
  flex-wrap: wrap;
}

.div-lbl { color: var(--p3r-cyan); }
.div-val { color: #ffffff; font-weight: bold; }
.div-sub-jp { color: var(--p3r-gold); }

.modal-overview-box {
  background: rgba(3, 7, 18, 0.85);
  border-left: 3px solid var(--p3r-cyan);
  padding: 10px 14px;
}

.modal-narrative {
  font-family: sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #d8eaff;
  margin: 6px 0 0 0;
}

/* ACHIEVEMENTS & CURRICULUM */
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
  .panel { width: 58%; }
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
  .title-frame { flex-direction: column; gap: 2px; }

  .p3r-timeline-track { padding-left: 0; gap: 16px; }
  .central-spine-line { display: none; }
  
  .p3r-timeline-item { 
    flex-direction: column; 
    gap: 6px; 
    transform: none !important; 
  }
  .p3r-timeline-item:hover .p3r-log-plate { transform: translateX(5px) !important; }
  
  .chrono-stamp-sector { 
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