<template>
  <div class="social-page p3r-theme">
    <!-- BACKGROUND VIDEO / AMBIENT OCEANIC LAYER -->
    <div class="bg-layer-container">
      <img class="bg-poster" src="../assets/images/social.jpg" alt="background" />
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
      <div class="hud-scanline-matrix"></div>
      <div class="background-velvet-ribbon">SYS_VAL_NETWORK_LINK_ESTABLISHED // S.E.E.S._COMM</div>
    </div>

    <!-- FLOATING P3R GEOMETRIC SHARDS -->
    <div class="p3r-shard shard-1" aria-hidden="true"></div>
    <div class="p3r-shard shard-2" aria-hidden="true"></div>

    <BackBtn />
    <IntroSlash />

    <!-- MAIN INTERACTIVE DATA PANEL -->
    <main class="panel" :class="{ enter: pageReady }">
      <!-- P3R SKEWED HEADER -->
      <header class="top-header">
        <div class="status-tag">
          <span class="status-icon">◆</span>
          <span>COMM_OVERLINK_LOG // S.E.E.S._NETWORK</span>
        </div>
        <div class="title-skew-container">
          <h1 class="main-title" data-text="SOCIAL LINK">SOCIAL LINK</h1>
          <span class="jp-title">コミュニティ</span>
        </div>
        <p class="subtitle">// CONNECTED_ARCHETYPE_NETWORKS & CHANNELS</p>
      </header>

      <!-- P3R TACTICAL CATEGORY FILTER -->
      <nav class="p3r-filter-nav" aria-label="Social Link Categories">
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

      <!-- P3R SOCIAL LINK CARDS -->
      <div class="p3r-link-stack">
        <div
          v-for="(link, i) in filteredLinks"
          :key="link.name"
          class="p3r-social-card"
          :class="{ 'is-active': activeLink?.name === link.name }"
          :style="{ '--i': i }"
          @pointerenter="onCardHover"
          @click="onCardClick(link)"
        >
          <div class="card-base-plate"></div>
          <div class="card-accent-slash"></div>
          <div class="card-highlight-rim"></div>

          <!-- Stencil Top Ribbon -->
          <div class="card-top-strip">
            <span class="strip-stencil">SL_NODE // 00{{ i + 1 }}</span>
            <span class="strip-security" :class="link.type">
              <span class="sec-dot"></span>
              {{ link.type === 'form' ? 'SECURE_CHANNEL' : 'EXT_PROTOCOL' }}
            </span>
          </div>

          <div class="card-body-layout">
            <!-- Arcana Badge Sector -->
            <div class="arcana-badge-sector">
              <div class="arcana-roman">{{ link.tarotNum || '0' }}</div>
              <div class="arcana-icon-bracket">✦</div>
              <div class="arcana-text">{{ link.arcana }}</div>
              <div class="arcana-subjp">{{ link.arcanaJp }}</div>
            </div>

            <!-- Profile Info Sector -->
            <div class="network-profile-sector">
              <div class="network-meta-row">
                <h2 class="network-title">{{ link.name }}</h2>
                <span class="network-alias">{{ link.alias }}</span>
              </div>
              <p class="network-desc">{{ link.description }}</p>
              
              <!-- Mini telemetry specs -->
              <div class="network-telemetry">
                <span class="tele-item">
                  <span class="tele-k">AFFINITY:</span>
                  <span class="tele-v">{{ link.affinity }}</span>
                </span>
                <span class="tele-divider">/</span>
                <span class="tele-item">
                  <span class="tele-k">RESPONSE:</span>
                  <span class="tele-v">{{ link.responseTime }}</span>
                </span>
              </div>
            </div>

            <!-- Rank Indicator Sector -->
            <div class="rank-indicator-sector" :class="{ 'is-max': link.rank === 'MAX' }">
              <span class="rank-label">LINK RANK</span>
              <span class="rank-value">{{ link.rank }}</span>
              <span class="rank-badge">{{ link.rank === 'MAX' ? 'MAX COMPLETED' : 'ENGAGED' }}</span>
            </div>

            <!-- Action Arrow Indicator -->
            <div class="card-action-cue" aria-hidden="true">
              <span class="cue-bracket">[</span>
              <span class="cue-icon">▶</span>
              <span class="cue-bracket">]</span>
            </div>
          </div>

          <div class="card-hud-identifier">SYS_LINK_UID // 0x{{ (i + 1) * 37 }}F9</div>
        </div>
      </div>
    </main>

    <!-- TARTARUS TRANSMISSION / LINK DOSSIER MODAL -->
    <Transition name="p3r-modal">
      <div class="modal-backdrop" v-if="isModalOpen" @click.self="onClickClose">
        <div class="p3r-modal-window">
          <button class="p3r-close-anchor" @click="onClickClose" @pointerenter="onHover">
            CLOSE ▲ ESC
          </button>

          <!-- MODAL HEADER -->
          <header class="modal-header-strip">
            <div class="modal-tarot-tag">
              <span class="tarot-num">{{ activeLink?.tarotNum }}</span>
              <span class="tarot-name">TAROT ARCANA // {{ activeLink?.arcana }}</span>
            </div>
            <div class="modal-header-main">
              <h2 class="dossier-title">{{ activeLink?.name }}</h2>
              <span class="dossier-sub">{{ activeLink?.alias }}</span>
            </div>
          </header>

          <div class="modal-inner-grid">
            <!-- Left Info Pane -->
            <div class="modal-info-pane">
              <div class="dossier-sec-heading">
                <span class="sec-dot">◆</span>
                <span>COMMUNICATION TELEMETRY</span>
              </div>
              <div class="dossier-telemetry-box">
                <div class="tele-row">
                  <span class="k">NETWORK STATUS</span>
                  <span class="v" :class="{ 'neon-green': activeLink?.rank === 'MAX' }">
                    {{ activeLink?.rank === 'MAX' ? 'MAX BOND [RESONANCE]' : 'SYNCHRONIZED' }}
                  </span>
                </div>
                <div class="tele-row">
                  <span class="k">PROTOCOL TYPE</span>
                  <span class="v">{{ activeLink?.type === 'form' ? 'DIRECT TRANSMISSION (SMTP)' : 'EXTERNAL URI LINK' }}</span>
                </div>
                <div class="tele-row">
                  <span class="k">AFFINITY ATTUNEMENT</span>
                  <span class="v highlight">{{ activeLink?.affinity }}</span>
                </div>
                <div class="tele-row">
                  <span class="k">ESTIMATED LATENCY</span>
                  <span class="v">{{ activeLink?.responseTime }}</span>
                </div>
              </div>

              <div class="dossier-sec-heading mt-4">
                <span class="sec-dot">◆</span>
                <span>CHANNEL DESCRIPTION</span>
              </div>
              <p class="dossier-desc">{{ activeLink?.description }}</p>

              <div class="sees-clearance-stamp">
                <div class="stamp-box">
                  <span class="stamp-icon">★</span>
                  <span>S.E.E.S. AUTHENTICATED COMM CHANNEL</span>
                </div>
              </div>
            </div>

            <!-- Right Interactive Pane (Form or External Link) -->
            <div class="modal-action-pane">
              <div v-if="activeLink?.type === 'form'" class="transmission-form">
                <div class="dossier-sec-heading">
                  <span class="sec-dot">◆</span>
                  <span>DIRECT TRANSMISSION PROTOCOL</span>
                </div>

                <div class="input-field-wrap">
                  <label class="p3r-input-label">SENDER DESIGNATION // NAME</label>
                  <input
                    type="text"
                    v-model="formData.name"
                    placeholder="Enter your name / callsign..."
                    class="p3r-input"
                    required
                  />
                </div>

                <div class="input-field-wrap">
                  <label class="p3r-input-label">COMMUNICATION FREQUENCY // EMAIL</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    placeholder="name@domain.com"
                    class="p3r-input"
                    required
                  />
                </div>

                <div class="input-field-wrap">
                  <label class="p3r-input-label">TRANSMISSION HEADER // SUBJECT</label>
                  <input
                    type="text"
                    v-model="formData.subject"
                    placeholder="Project Inquiry / Cooperation..."
                    class="p3r-input"
                    required
                  />
                </div>

                <div class="input-field-wrap">
                  <label class="p3r-input-label">PAYLOAD DATA // MESSAGE BODY</label>
                  <textarea
                    v-model="formData.message"
                    placeholder="Type transmission details here..."
                    class="p3r-input p3r-textarea"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button
                  class="p3r-action-btn"
                  @click="onClickSend"
                  @pointerenter="onHover"
                  :disabled="isSending || !formData.name || !formData.email || !formData.subject || !formData.message"
                >
                  <span class="btn-text">{{ isSending ? 'TRANSMITTING PACKETS...' : 'SEND TRANSMISSION ▶' }}</span>
                  <span class="btn-glitch"></span>
                </button>
              </div>

              <div v-else class="external-redirect-pane">
                <div class="dossier-sec-heading">
                  <span class="sec-dot">◆</span>
                  <span>EXTERNAL PROTOCOL GATEWAY</span>
                </div>
                <div class="gateway-preview-box">
                  <div class="gateway-icon">🌐</div>
                  <div class="gateway-meta">
                    <span class="gateway-label">TARGET INTERFACE:</span>
                    <span class="gateway-url">{{ activeLink?.url }}</span>
                  </div>
                </div>
                <p class="gateway-note">
                  Redirecting to external authenticated endpoint. A new cryptographic browser tab will initialize.
                </p>
                <button
                  class="p3r-action-btn external-btn"
                  @click="onClickLink(activeLink?.url)"
                  @pointerenter="onHover"
                >
                  <span class="btn-text">OPEN INTERFACE ↗</span>
                  <span class="btn-glitch"></span>
                </button>
              </div>
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
import { playClick, playSwitchToggle, playHover } from '../utils/sound.ts'
import emailjs from '@emailjs/browser'

const { setVideo, clearVideo, currentVideo } = useVideoManager()
const videoLoaded = ref(false)
const pageReady = ref(false)
const isModalOpen = ref(false)
const activeLink = ref<any>(null)
const isSending = ref(false)
const activeCategory = ref('ALL')

const categories = [
  { id: 'ALL', name: 'ALL LINKS', jp: '全て' },
  { id: 'DIRECT', name: 'DIRECT COMM', jp: '直接通信' },
  { id: 'CODE', name: 'DEVELOPMENT', jp: '開発技術' },
  { id: 'NETWORK', name: 'NETWORKS', jp: '社会網' }
]

const links = [
  {
    arcana: 'FOOL',
    tarotNum: '0',
    arcanaJp: '愚者',
    name: 'Direct Transmission',
    alias: 'LOENG PHEAKTRA // INBOX',
    category: 'DIRECT',
    type: 'form',
    rank: 'MAX',
    affinity: 'High Resonance',
    responseTime: '< 24 Hours',
    description: 'Direct end-to-end encrypted dispatch channel for contracts, collaborations, and engineering proposals.'
  },
  {
    arcana: 'MAGICIAN',
    tarotNum: 'I',
    arcanaJp: '魔術師',
    name: 'GitHub',
    alias: 'REPOSITORIES // @pheaktra01',
    category: 'CODE',
    type: 'link',
    url: 'https://github.com/pheaktra01',
    rank: 'MAX',
    affinity: 'DevOps & Systems',
    responseTime: 'Active Daily',
    description: 'Source code repositories, automated CI/CD pipeline infrastructure, and open-source project constructs.'
  },
  {
    arcana: 'PRIESTESS',
    tarotNum: 'II',
    arcanaJp: '女教皇',
    name: 'LinkedIn',
    alias: 'PROFESSIONAL NETWORK // PHEAKTRA',
    category: 'NETWORK',
    type: 'link',
    url: 'https://www.linkedin.com/in/loeng-pheaktra-2b9578413/',
    rank: '08',
    affinity: 'Enterprise & Career',
    responseTime: '< 48 Hours',
    description: 'Professional engineering network, enterprise credentials, and industry career milestones.'
  },
  {
    arcana: 'CHARIOT',
    tarotNum: 'VII',
    arcanaJp: '戦車',
    name: 'Facebook',
    alias: 'SOCIAL CONNECTION // PHEAKTRA',
    category: 'NETWORK',
    type: 'link',
    url: 'https://web.facebook.com/loeng.pheaktra',
    rank: '10',
    affinity: 'Community & Updates',
    responseTime: '< 12 Hours',
    description: 'Personal social updates, technological community sharing, and informal student developer outreach.'
  }
]

const filteredLinks = computed(() => {
  if (activeCategory.value === 'ALL') return links
  return links.filter(l => l.category === activeCategory.value)
})

function getCategoryCount(catId: string) {
  if (catId === 'ALL') return links.length
  return links.filter(l => l.category === catId).length
}

function setCategory(catId: string) {
  playSwitchToggle()
  activeCategory.value = catId
}

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sendTransmission = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
    alert('SYSTEM WARNING: All fields are required for transmission.')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    alert('SYSTEM WARNING: Invalid email address format.')
    return
  }

  if (isSending.value) return
  isSending.value = true

  try {
    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message
    }

    await emailjs.send(
      'service_yso6hxi',
      'template_kk5gn3a',
      templateParams,
      'YkW3h24fwb0oRjEt_'
    )

    alert('TRANSMISSION SUCCESSFUL: S.E.E.S. Data link established.')
    formData.value = { name: '', email: '', subject: '', message: '' }
    isModalOpen.value = false
  } catch (error) {
    console.error('Transmission Failed:', error)
    alert('SYSTEM ERROR: Transmission failed.')
  } finally {
    isSending.value = false
  }
}

function onCardHover() {
  playHover(false)
}

function onTabHover() {
  playHover(false)
}

function onCardClick(link: any) {
  playClick()
  activeLink.value = link
  isModalOpen.value = true
}

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function onClickClose() {
  playClick()
  isModalOpen.value = false
}

function onClickSend() {
  playClick()
  sendTransmission()
}

function onClickLink(url: string) {
  playClick()
  window.open(url, '_blank')
  isModalOpen.value = false
}

onMounted(() => {
  setVideo(videos.social)
  setTimeout(() => {
    pageReady.value = true
  }, 100)
})

onBeforeUnmount(() => clearVideo())
</script>

<style scoped>
/* ================= SYSTEM ARCHITECTURE SETUP ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-velvet-void: #030712;
  --p3r-deep-blue: #091226;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-lime: #00ff88;
  --p3r-font-family: 'Impact', 'Arial Black', sans-serif;

  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-font-family);
  color: var(--p3r-pure-white);
  overflow: hidden;
  position: relative;
  background-color: var(--p3r-velvet-void);
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
.hud-scanline-matrix,
.background-velvet-ribbon {
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

.hud-scanline-matrix {
  background: linear-gradient(
    rgba(0, 210, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 3;
}

/* Persona 3 Oceanic Ambient Bubbles */
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

/* Ambient Background Ribbon */
.background-velvet-ribbon {
  top: 18%;
  right: -8%;
  width: auto;
  height: auto;
  font-size: 6.5rem;
  color: rgba(0, 210, 255, 0.03);
  transform: rotate(-12deg);
  white-space: nowrap;
  user-select: none;
  z-index: 1;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 6px;
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
  top: 12%;
  right: 15%;
  clip-path: polygon(25% 0%, 100% 15%, 85% 100%, 0% 80%);
  animation: p3rFloatShard 9s ease-in-out infinite alternate;
}

.shard-2 {
  width: 140px;
  height: 140px;
  bottom: 15%;
  right: 28%;
  clip-path: polygon(0 0, 100% 30%, 70% 100%, 15% 90%);
  animation: p3rFloatShard 12s ease-in-out infinite alternate-reverse;
}

@keyframes p3rFloatShard {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-25px) rotate(8deg); }
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
  transform: translate3d(-40px, 0, 0) skewX(-3deg);
  z-index: 3;
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
  height: 0px !important;
  display: none;
}

/* ================= HEADER DESIGNATION ================= */
.top-header {
  margin-bottom: 22px;
  transform: skewX(-5deg);
}

.status-tag {
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

.status-icon {
  color: var(--p3r-magenta);
  font-size: 0.75rem;
}

.title-skew-container {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.main-title {
  font-size: 5.2rem;
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

/* ================= CATEGORY FILTER TABS ================= */
.p3r-filter-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  transform: skewX(-8deg);
}

.filter-btn {
  background: rgba(9, 18, 38, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 14px;
  font-family: var(--p3r-font-family);
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.filter-btn:hover {
  border-color: var(--p3r-cyan);
  color: var(--p3r-pure-white);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--p3r-cyan);
  border-color: var(--p3r-pure-white);
  color: #030712;
  box-shadow: -4px 4px 0px var(--p3r-magenta);
}

.filter-btn.active .filter-sub {
  color: rgba(3, 7, 18, 0.7);
}

.filter-count {
  font-size: 0.75rem;
  opacity: 0.8;
  font-family: monospace;
}

.filter-sub {
  font-size: 0.65rem;
  opacity: 0.6;
}

/* ================= P3R AGGRESSIVE SOCIAL CARDS ================= */
.p3r-link-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 6px 4px;
}

.p3r-social-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--p3r-pure-white);
  min-height: 105px;
  z-index: 2;
  cursor: pointer;
  transform: skewX(-8deg);
  opacity: 0;
  animation: p3rCardFlyIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
  box-sizing: border-box;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes p3rCardFlyIn {
  from { opacity: 0; transform: translateX(-30px) skewX(-8deg); }
  to { opacity: 1; transform: translateX(0) skewX(-8deg); }
}

.card-base-plate {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, #050b18 0%, #0d1730 100%);
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: -8px 8px 0px rgba(0, 0, 0, 0.8);
  z-index: 1;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
}

.card-accent-slash {
  position: absolute;
  top: 0; bottom: 0; left: 0; width: 0;
  background: var(--p3r-cyan);
  z-index: 2;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.2;
}

.card-highlight-rim {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 5px;
  background: var(--p3r-cyan);
  z-index: 3;
  transition: width 0.25s, background 0.25s;
}

.p3r-social-card:hover,
.p3r-social-card.is-active {
  transform: translateX(12px) skewX(-8deg);
}

.p3r-social-card:hover .card-base-plate,
.p3r-social-card.is-active .card-base-plate {
  border-color: var(--p3r-cyan);
  background: linear-gradient(110deg, #081126 0%, #122247 100%);
  box-shadow: -12px 12px 0px var(--p3r-magenta), 0 0 25px rgba(0, 210, 255, 0.25);
}

.p3r-social-card:hover .card-accent-slash,
.p3r-social-card.is-active .card-accent-slash {
  width: 48%;
}

.p3r-social-card:hover .card-highlight-rim,
.p3r-social-card.is-active .card-highlight-rim {
  width: 8px;
  background: var(--p3r-magenta);
}

/* Card Top Strip */
.card-top-strip {
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
  padding: 0 8px;
  transform: skewX(8deg);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
}

.strip-stencil {
  font-family: monospace;
  font-size: 0.62rem;
  letter-spacing: 2px;
  color: var(--p3r-cyan);
  font-weight: bold;
}

.strip-security {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: monospace;
  font-size: 0.58rem;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
}

.strip-security .sec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--p3r-cyan);
  box-shadow: 0 0 6px var(--p3r-cyan);
}

.strip-security.form .sec-dot {
  background: var(--p3r-lime);
  box-shadow: 0 0 6px var(--p3r-lime);
}

/* Card Body Layout */
.card-body-layout {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  padding: 24px 20px 14px 20px;
  gap: 20px;
  transform: skewX(8deg);
}

/* Arcana Sector */
.arcana-badge-sector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  border-right: 1px dashed rgba(255, 255, 255, 0.2);
  padding-right: 15px;
  position: relative;
}

.arcana-roman {
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  font-weight: bold;
}

.arcana-icon-bracket {
  color: var(--p3r-magenta);
  font-size: 1.1rem;
  line-height: 1;
  margin: 2px 0;
  transition: transform 0.3s ease, color 0.3s ease;
}

.p3r-social-card:hover .arcana-icon-bracket,
.p3r-social-card.is-active .arcana-icon-bracket {
  color: var(--p3r-cyan);
  transform: rotate(180deg) scale(1.2);
}

.arcana-text {
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}

.p3r-social-card:hover .arcana-text,
.p3r-social-card.is-active .arcana-text {
  color: var(--p3r-cyan);
}

.arcana-subjp {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: normal;
  letter-spacing: 1px;
}

/* Network Profile Sector */
.network-profile-sector {
  flex-grow: 1;
}

.network-meta-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.network-title {
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: var(--p3r-pure-white);
  transition: color 0.2s;
}

.p3r-social-card:hover .network-title,
.p3r-social-card.is-active .network-title {
  color: var(--p3r-cyan);
}

.network-alias {
  font-family: monospace;
  font-size: 0.68rem;
  color: rgba(0, 210, 255, 0.8);
  letter-spacing: 1px;
}

.network-desc {
  margin: 4px 0 8px 0;
  font-family: Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.78);
}

.network-telemetry {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
  font-size: 0.66rem;
}

.tele-item {
  display: inline-flex;
  gap: 4px;
}

.tele-k {
  color: rgba(255, 255, 255, 0.45);
}

.tele-v {
  color: var(--p3r-cyan);
  font-weight: bold;
}

.tele-divider {
  color: rgba(255, 255, 255, 0.2);
}

/* Rank Indicator Sector */
.rank-indicator-sector {
  background: rgba(3, 7, 18, 0.85);
  border-left: 3px solid var(--p3r-pure-white);
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 75px;
  transition: all 0.25s ease;
  transform: skewX(-4deg);
}

.rank-label {
  font-size: 0.58rem;
  letter-spacing: 1.5px;
  opacity: 0.6;
  font-weight: bold;
}

.rank-value {
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 900;
  font-style: italic;
  color: var(--p3r-cyan);
}

.rank-badge {
  font-size: 0.5rem;
  letter-spacing: 0.5px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.rank-indicator-sector.is-max {
  background: var(--p3r-magenta);
  border-left-color: var(--p3r-pure-white);
}

.rank-indicator-sector.is-max .rank-value {
  color: var(--p3r-pure-white);
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4);
}

.p3r-social-card:hover .rank-indicator-sector {
  background: var(--p3r-pure-white);
  border-left-color: var(--p3r-cyan);
}

.p3r-social-card:hover .rank-label {
  color: var(--p3r-velvet-void);
  opacity: 0.9;
}

.p3r-social-card:hover .rank-value {
  color: var(--p3r-magenta);
}

.p3r-social-card:hover .rank-badge {
  color: var(--p3r-velvet-void);
}

/* Action Cue */
.card-action-cue {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s, transform 0.2s;
}

.p3r-social-card:hover .card-action-cue,
.p3r-social-card.is-active .card-action-cue {
  color: var(--p3r-cyan);
  transform: translateX(4px);
}

.card-hud-identifier {
  position: absolute;
  bottom: 2px;
  right: 20px;
  font-family: monospace;
  font-size: 0.56rem;
  color: rgba(255, 255, 255, 0.15);
  z-index: 3;
  transform: skewX(8deg);
  letter-spacing: 1px;
}

.p3r-social-card:hover .card-hud-identifier {
  color: var(--p3r-cyan);
}

/* Scanline Sweep FX */
.p3r-theme::after {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 210, 255, 0.04) 50%, transparent);
  animation: p3rScanlineLoop 5s linear infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes p3rScanlineLoop {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* ================= SLICED TARTARUS MODAL ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(3, 7, 18, 0.9);
  backdrop-filter: blur(14px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.p3r-modal-window {
  position: relative;
  width: 820px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--p3r-deep-blue);
  border: 4px solid var(--p3r-pure-white);
  box-shadow: -20px 20px 0px var(--p3r-cyan), 0 0 35px rgba(0, 210, 255, 0.35);
  transform: rotate(-1.2deg);
  padding: 35px 40px;
  box-sizing: border-box;
}

.p3r-close-anchor {
  position: absolute;
  top: -44px;
  right: -4px;
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

/* Modal Header */
.modal-header-strip {
  border-bottom: 2px solid var(--p3r-cyan);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.modal-tarot-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--p3r-cyan);
  color: #030712;
  padding: 2px 10px;
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 2px;
  transform: skewX(-10deg);
  margin-bottom: 8px;
}

.tarot-num {
  color: var(--p3r-magenta);
}

.modal-header-main {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.dossier-title {
  font-size: 2.8rem;
  margin: 0;
  line-height: 1;
  color: var(--p3r-pure-white);
  text-shadow: 3px 3px 0px var(--p3r-magenta);
  transform: skewX(-6deg);
}

.dossier-sub {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--p3r-cyan);
  letter-spacing: 1.5px;
}

/* Modal Grid */
.modal-inner-grid {
  display: flex;
  gap: 32px;
}

.modal-info-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.modal-action-pane {
  flex: 1.2;
}

.dossier-sec-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  letter-spacing: 2px;
  color: var(--p3r-cyan);
  font-family: monospace;
  font-weight: 900;
  margin-bottom: 10px;
}

.sec-dot {
  color: var(--p3r-magenta);
}

.mt-4 {
  margin-top: 18px;
}

.dossier-telemetry-box {
  background: #040915;
  border: 1px solid rgba(0, 210, 255, 0.3);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tele-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
  font-size: 0.75rem;
}

.tele-row .k {
  color: rgba(255, 255, 255, 0.5);
}

.tele-row .v {
  color: var(--p3r-pure-white);
  font-weight: bold;
}

.tele-row .v.highlight {
  color: var(--p3r-cyan);
}

.tele-row .v.neon-green {
  color: var(--p3r-lime);
}

.dossier-desc {
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.sees-clearance-stamp {
  margin-top: auto;
  padding-top: 20px;
}

.stamp-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px dashed var(--p3r-magenta);
  color: var(--p3r-magenta);
  padding: 4px 12px;
  font-family: monospace;
  font-size: 0.65rem;
  letter-spacing: 1px;
}

/* Forms & Inputs */
.transmission-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-field-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.p3r-input-label {
  font-family: monospace;
  font-size: 0.64rem;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.6);
}

.p3r-input {
  width: 100%;
  background: #030712;
  border: 2px solid rgba(0, 210, 255, 0.5);
  padding: 10px 14px;
  color: var(--p3r-pure-white);
  font-family: monospace;
  font-size: 0.85rem;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.p3r-input:focus {
  outline: none;
  border-color: var(--p3r-cyan);
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.3);
}

.p3r-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Action Buttons */
.p3r-action-btn {
  position: relative;
  background: var(--p3r-magenta);
  border: none;
  padding: 14px 28px;
  cursor: pointer;
  width: 100%;
  font-family: var(--p3r-font-family);
  font-size: 1.15rem;
  color: var(--p3r-pure-white);
  clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  letter-spacing: 1.5px;
  margin-top: 6px;
}

.p3r-action-btn:hover:not(:disabled) {
  background: var(--p3r-cyan);
  color: #030712;
  transform: scaleX(1.02);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.5);
}

.p3r-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

/* External Link Gateway */
.external-redirect-pane {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gateway-preview-box {
  background: #030712;
  border: 2px solid var(--p3r-cyan);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.gateway-icon {
  font-size: 2.2rem;
}

.gateway-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gateway-label {
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.gateway-url {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--p3r-cyan);
  word-break: break-all;
}

.gateway-note {
  font-family: Arial, sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
}

.external-btn {
  background: var(--p3r-cyan);
  color: #030712;
}

.external-btn:hover {
  background: var(--p3r-magenta) !important;
  color: var(--p3r-pure-white) !important;
}

/* Modal Animations */
.p3r-modal-enter-active,
.p3r-modal-leave-active {
  transition: opacity 0.25s ease;
}

.p3r-modal-enter-active .p3r-modal-window {
  animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.p3r-modal-leave-active .p3r-modal-window {
  animation: p3rSlashIn 0.2s ease reverse forwards;
}

.p3r-modal-enter-from,
.p3r-modal-leave-to {
  opacity: 0;
}

@keyframes p3rSlashIn {
  0% { transform: scale(0.88) rotate(-5deg) translateY(40px); opacity: 0; }
  100% { transform: scale(1) rotate(-1.2deg) translateY(0); opacity: 1; }
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

  .p3r-social-card {
    transform: none !important;
  }

  .p3r-social-card:hover,
  .p3r-social-card.is-active {
    transform: translateX(4px) !important;
  }

  .card-top-strip {
    transform: none;
  }

  .card-body-layout {
    flex-direction: column;
    align-items: stretch;
    padding: 24px 14px 14px 14px;
    gap: 14px;
    transform: none;
  }

  .arcana-badge-sector {
    border-right: none;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
    padding-right: 0;
    padding-bottom: 8px;
    flex-direction: row;
    justify-content: space-between;
    min-width: unset;
  }

  .network-title {
    font-size: 1.3rem;
  }

  .network-desc {
    font-size: 0.8rem;
  }

  .rank-indicator-sector {
    border-left: none;
    border-top: 3px solid var(--p3r-pure-white);
    flex-direction: row;
    justify-content: space-between;
    min-width: unset;
    padding: 6px 12px;
    transform: none;
  }

  .rank-value {
    font-size: 1.2rem;
  }

  .card-action-cue {
    display: none;
  }

  .card-hud-identifier {
    display: none;
  }

  .modal-inner-grid {
    flex-direction: column;
    gap: 20px;
  }

  .p3r-modal-window {
    width: 92%;
    padding: 24px 20px;
    transform: none !important;
  }

  .dossier-title {
    font-size: 2rem;
  }
}
</style>