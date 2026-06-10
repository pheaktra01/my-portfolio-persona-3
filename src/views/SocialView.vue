<template>
  <div class="social-page p3r-theme">
    <!-- BACKGROUND VIDEO & AMBIENT UI FILTERS (Bypassed touch block using pointer-events) -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/social.jpg"
      preload="metadata"
    ></video>

    <div class="overlay"></div>
    <div class="hud-scanline-matrix"></div>
    <div class="background-velvet-ribbon">SYS_VAL_NETWORK_LINK_ESTABLISHED</div>

    <BackBtn />
    <IntroSlash />

    <!-- RE-ARCHITECTED HUD PANEL -->
    <div class="panel">
      
      <header class="top-header">
        <div class="status-tag"><span>COMM_OVERLINK_LOG</span></div>
        <div class="title-skew-container">
          <h1 class="main-title" data-text="SOCIAL LINK">SOCIAL LINK</h1>
        </div>
        <p class="subtitle">// CONNECTED_ARCHETYPE_NETWORKS</p>
      </header>

      <!-- P3R AGGRESSIVE LINK LIST -->
      <div class="p3r-link-stack">

        <a
          v-for="(link, i) in links"
          :key="link.name"
          :href="link.url"
          target="_blank"
          class="p3r-social-card"
          :style="{ '--i': i }"
        >
          <!-- Dynamic High-Contrast Geometric Underlays -->
          <div class="card-base-plate"></div>
          <div class="card-accent-slash"></div>

          <div class="card-body-layout">
            
            <!-- LEFT: ARCANA DESIGNATION STAMP -->
            <div class="arcana-badge-sector">
              <div class="arcana-icon-bracket">✦</div>
              <div class="arcana-text">{{ link.arcana }}</div>
            </div>

            <!-- CENTER: METADATA DOSSIER -->
            <div class="network-profile-sector">
              <h2 class="network-title">{{ link.name }}</h2>
              <p class="network-desc">{{ link.description }}</p>
            </div>

            <!-- RIGHT: MAX/RANK BADGE RIBBON -->
            <div class="rank-indicator-sector" :class="{ 'is-max': link.rank === 'MAX' }">
              <span class="rank-label">LINK RANK</span>
              <span class="rank-value">{{ link.rank }}</span>
            </div>

          </div>

          <!-- Decorative Telemetry Blueprint Accents -->
          <div class="card-hud-identifier">LINK_SYS_N°0{{ i + 1 }}</div>
        </a>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  setVideo(videos.social)
})

onBeforeUnmount(() => {
  clearVideo()
})

const links = [
  {
    arcana: 'MAGICIAN',
    name: 'GitHub',
    rank: 'MAX',
    description: 'Source code repositories and open-source project frameworks.',
    url: 'https://github.com/pheaktra01'
  },
  {
    arcana: 'PRIESTESS',
    name: 'LinkedIn',
    rank: '08',
    description: 'Professional engineering profile and industry network connections.',
    url: 'https://www.linkedin.com/in/loeng-pheaktra-2b9578413/'
  },
  {
    arcana: 'CHARIOT',
    name: 'Facebook',
    rank: '10',
    description: 'Personal updates, announcements, and direct community communication.',
    url: 'https://web.facebook.com/loeng.pheaktra'
  },
  {
    arcana: 'STAR',
    name: 'Discord',
    rank: '07',
    description: 'Gaming channels, real-time audio telemetry, and developer servers.',
    url: 'https://discord.com/users/yagami12629'
  }
]
</script>

<style scoped>
/* ================= SYSTEM ARCHITECTURE SETUP ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-velvet-void: #040815;
  --p3r-deep-blue: #0f1934;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-impact-font: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-impact-font);
  color: var(--p3r-pure-white);
  overflow: hidden; /* Lock root canvas context */
  position: relative;
  background-color: var(--p3r-velvet-void);
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-video, .overlay, .hud-scanline-matrix, .background-velvet-ribbon {
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

.hud-scanline-matrix {
  background: linear-gradient(rgba(0, 210, 255, 0.01) 50%, rgba(0, 0, 0, 0.2) 50%);
  background-size: 100% 4px;
  z-index: 2;
}

.background-velvet-ribbon {
  top: 20%; right: -10%;
  width: auto; height: auto;
  font-size: 6.5rem;
  color: rgba(0, 210, 255, 0.02);
  transform: rotate(-14deg);
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
  width: 45%;
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
  scrollbar-width: none; /* Clears track layout in Firefox */
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
  from { opacity: 0; transform: translateX(-100px) skewX(-3deg); }
  to { opacity: 1; transform: translateX(0) skewX(-3deg); }
}

/* MENU HEADER DESIGNATION */
.top-header {
  margin-bottom: 35px;
  transform: skewX(-8deg);
}

.status-tag {
  background: var(--p3r-pure-white);
  color: var(--p3r-velvet-void);
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

/* ================= P3R AGGRESSIVE SOCIAL CARDS ================= */
.p3r-link-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p3r-social-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--p3r-pure-white);
  min-height: 90px;
  z-index: 2;
  transform: translateX(-50px) skewX(-12deg);
  opacity: 0;
  animation: p3rCardFlyIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
}

@keyframes p3rCardFlyIn {
  to { opacity: 1; transform: translateX(0) skewX(-12deg); }
}

.card-base-plate {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #060c1b 0%, #0e1831 100%);
  border: 3px solid var(--p3r-pure-white);
  box-shadow: -8px 8px 0px var(--p3r-deep-blue);
  z-index: 1;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.card-accent-slash {
  position: absolute;
  top: 0; bottom: 0; left: 0; width: 0;
  background: var(--p3r-cyan);
  z-index: 2;
  clip-path: polygon(0 0, 100% 0, 78% 100%, 0 100%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.18;
}

.p3r-social-card:hover {
  transform: translateX(20px) scale(1.02) skewX(-12deg);
}
.p3r-social-card:hover .card-base-plate {
  border-color: var(--p3r-cyan);
  box-shadow: -14px 14px 0px var(--p3r-magenta);
}
.p3r-social-card:hover .card-accent-slash {
  width: 40%;
}

.card-body-layout {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  padding: 16px 25px;
  gap: 25px;
  transform: skewX(12deg);
}

.arcana-badge-sector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 75px;
  border-right: 1px dashed rgba(255, 255, 255, 0.2);
  padding-right: 15px;
}

.arcana-icon-bracket {
  color: var(--p3r-magenta);
  font-size: 1rem;
  line-height: 1;
  transition: transform 0.3s ease;
}
.p3r-social-card:hover .arcana-icon-bracket {
  color: var(--p3r-cyan);
  transform: rotate(180deg) scale(1.2);
}

.arcana-text {
  font-size: 0.78rem;
  letter-spacing: 1px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}
.p3r-social-card:hover .arcana-text {
  color: var(--p3r-cyan);
}

.network-profile-sector {
  flex-grow: 1;
}

.network-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.network-desc {
  margin: 4px 0 0 0;
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.75);
}

.rank-indicator-sector {
  background: var(--p3r-deep-blue);
  border-left: 3px solid var(--p3r-pure-white);
  padding: 6px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  transition: all 0.2s ease;
}

.rank-label {
  font-size: 0.58rem;
  letter-spacing: 1px;
  opacity: 0.6;
  font-weight: bold;
}

.rank-value {
  font-size: 1.4rem;
  line-height: 1;
  font-weight: 900;
  font-style: italic;
  color: var(--p3r-cyan);
}

.rank-indicator-sector.is-max {
  background: var(--p3r-magenta);
  border-left-color: var(--p3r-pure-white);
}
.rank-indicator-sector.is-max .rank-value {
  color: var(--p3r-pure-white);
  text-shadow: 2px 2px 0px rgba(0,0,0,0.3);
}

.p3r-social-card:hover .rank-indicator-sector {
  background: var(--p3r-pure-white);
  border-left-color: var(--p3r-cyan);
}
.p3r-social-card:hover .rank-label { color: var(--p3r-velvet-void); opacity: 0.8; }
.p3r-social-card:hover .rank-value { color: var(--p3r-magenta); }

.card-hud-identifier {
  position: absolute;
  bottom: 4px; left: 125px;
  font-family: monospace;
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.08);
  z-index: 3;
  transform: skewX(12deg);
}
.p3r-social-card:hover .card-hud-identifier {
  color: var(--p3r-cyan);
}

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

/* ================= ADAPTIVE RESPONSIVENESS ================= */
@media (max-width: 1150px) {
  .panel { width: 55%; }
  .main-title { font-size: 4.4rem; }
}

@media (max-width: 768px) {
  .p3r-theme { 
    overflow: hidden; /* Locks out ambient layout structural fracturing */
  }
  
  .panel {
    width: 90% !important; 
    left: 5% !important; 
    top: 5% !important;
    height: 90vh !important; /* Locks structural panel context into a precise scrolling window */
    padding: 20px 15px !important; 
    overflow-y: scroll !important;
    transform: none !important;
    animation: p3rMobilePanelIn 0.5s ease-out forwards;
  }

  @keyframes p3rMobilePanelIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .main-title { font-size: 3rem; }
  .p3r-link-stack { gap: 14px; }
  
  .p3r-social-card { transform: none !important; }
  .p3r-social-card:hover { transform: translateX(5px) !important; }
  
  .card-base-plate { transform: none; }
  .card-accent-slash { display: none; }
  
  .card-body-layout { flex-direction: column; align-items: stretch; padding: 16px; gap: 12px; transform: none; }
  
  .arcana-badge-sector { border-right: none; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-right: 0; padding-bottom: 8px; flex-direction: row; justify-content: space-between; min-width: unset; }
  .arcana-text { margin-top: 0; }
  
  .network-title { font-size: 1.25rem; }
  .network-desc { font-size: 0.8rem; }
  
  .rank-indicator-sector { border-left: none; border-top: 3px solid var(--p3r-pure-white); flex-direction: row; justify-content: space-between; min-width: unset; padding: 6px 12px; }
  .rank-value { font-size: 1.1rem; }
  
  .card-hud-identifier { display: none; }
}
</style>