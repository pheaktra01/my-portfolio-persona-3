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

      <div class="overlay"></div>
      <div class="hud-grid-overlay"></div>
      <div class="bg-watermark-strip">P3R_MISSION_LOG_SEQUENCE_2026</div>
    </div>

    <BackBtn />
    <IntroSlash />

    <div class="panel">
      <header class="top-header">
        <div class="status-ribbon"><span>SYS_RECORD_LOG</span></div>
        <div class="title-container">
          <h1 class="main-title" data-text="EXPERIENCE">EXPERIENCE</h1>
        </div>
        <p class="subtitle">// ENCRYPTED_HISTORY_DATA_FILE</p>
      </header>

      <div class="timeline-container">
        <div class="central-spine-line"></div>
        <div
          v-for="(e, i) in experience"
          :key="e.title"
          class="p3r-shard-card"
          @pointerenter="onCardHover"
          @click="onCardClick"
          :style="{ '--i': i }"
        >
          <div class="shard-date-badge">
            <div class="date-corner-bracket"></div>
            <span class="date-text">{{ e.date }}</span>
          </div>
          <div class="shard-wrapper">
            <div class="shard-bg-dark"></div>
            <div class="shard-bg-cyan"></div>
            <div class="shard-inner-content">
              <header class="shard-content-header">
                <h2 class="role-title">{{ e.title }}</h2>
                <p class="company-sub-link">{{ e.company }}</p>
              </header>
              <p class="shard-desc-body">{{ e.desc }}</p>
              <div class="tag-matrix-group">
                <span v-for="t in e.tags" :key="t" class="p3r-matrix-tag">{{ t }}</span>
              </div>
            </div>
            <div class="shard-hud-index">LOG_#0{{ i + 1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from "../composables/useVideoManager.ts"
import { playSwitchToggle, playClick } from '../utils/sound.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

import { ref } from 'vue'

const videoLoaded = ref(false)

function onCardHover() {
  playSwitchToggle()
}

function onCardClick() {
  playClick()
}

onMounted(() => {
  setVideo(videos.skill)
})

onBeforeUnmount(() => {
  clearVideo()
})

const experience = [
  {
    title: 'Full-Stack Developer',
    company: 'AniSuki Platform (Personal Project)',
    date: '2025 - Present',
    desc: 'Engineered a modular anime streaming platform interface. Built a component-driven architecture for media delivery, optimized layouts for performance, and integrated asynchronous media management layers.',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'API Integration']
  },
  {
    title: 'Backend Systems Developer',
    company: 'Full-Stack Application Suite (Learning Project)',
    date: '2025',
    desc: 'Architected robust REST APIs and secure authentication systems using a microservice-ready framework. Managed structural datastores, database modeling, and optimized server-side query flows.',
    tags: ['NestJS', 'MongoDB', 'REST APIs', 'Node.js']
  },
  {
    title: 'Distributed Systems Programmer',
    company: 'Multiplayer Matchmaking Engine (Academic Project)',
    date: '2025',
    desc: 'Designed and implemented a distributed concurrent matchmaking system for a multiplayer turn-based engine using remote method invocations. Built custom automated socket listeners handling concurrent state updates.',
    tags: ['Java RMI', 'Swing UI', 'Concurrency', 'Networking']
  },
  {
    title: 'Systems & UI Prototyper',
    company: 'Automata Logic & Mobile Development (Practice)',
    date: '2024 - 2025',
    desc: 'Created a structural finite automata management system layout engine. Additionally developed responsive multi-platform layout cards focusing on adaptive state transformations and strict responsive criteria.',
    tags: ['Flutter', 'Dart', 'Automata Theory', 'UI/UX']
  }
]
</script>

<style scoped>
/* ================= GLOBAL SYSTEMS CONFIG ================= */
.p3r-theme {
  --p3r-cyan: #00d2ff;
  --p3r-navy-void: #040814;
  --p3r-dark-slate: #0d162d;
  --p3r-magenta: #ff0055;
  --p3r-pure-white: #ffffff;
  --p3r-font: 'Impact', 'Arial Black', sans-serif;
  
  min-height: 100vh;
  height: 100vh;
  font-family: var(--p3r-font);
  color: var(--p3r-pure-white);
  overflow: hidden; /* Lock viewport shifting */
  position: relative;
  background-color: var(--p3r-navy-void);
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-video, .overlay, .hud-grid-overlay, .bg-watermark-strip {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Passes touches straight to the timeline grid */
}

.bg-video {
  object-fit: cover;
  z-index: 0;
  opacity: 0.8;
}

/* HIGH-INTEGRITY VISUAL LAYER INTERACTION FLAGS */
.bg-poster,
.bg-video,
.overlay,
.hud-grid-overlay,
.bg-watermark-strip {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* ================= BACKGROUND POSTER ================= */
.bg-poster {
  object-fit: cover;
  z-index: 0;
}

/* ================= VIDEO ================= */
.bg-video {
  object-fit: cover;
  z-index: 1;

  /* Hidden before loaded */
  opacity: 0;

  /* Smooth fade in */
  transition: opacity 0.8s ease;
}

/* Show video after loaded */
.bg-video.loaded {
  opacity: 1;
}

/* ================= OVERLAY ================= */
.overlay {
  z-index: 2;
}

/* ================= GRID ================= */
.hud-grid-overlay {
  background-image:
    linear-gradient(rgba(0, 208, 255, 0.219) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 208, 255, 0.219) 1px, transparent 1px);

  background-size: 40px 40px;
  z-index: 3;
}

/* ================= WATERMARK ================= */
.bg-watermark-strip {
  top: auto;
  left: -2%;
  bottom: 8%;

  width: auto;
  height: auto;

  font-size: 6rem;
  color: rgba(0, 210, 255, 0.02);

  transform: rotate(-7deg);

  white-space: nowrap;
  user-select: none;

  z-index: 1;

  font-weight: 900;
  font-style: italic;
}

/* ================= CONTAINER ================= */
.bg-layer-container {
  position: fixed;
  inset: 0;

  z-index: 0;
  pointer-events: none;

  will-change: transform;
  backface-visibility: hidden;
}

/* Simplified background elements to act as children of the container */
.bg-video, .overlay, .hud-grid-overlay, .bg-watermark-strip {
  position: absolute; /* Changed from fixed to absolute */
  inset: 0;
  width: 100%;
  height: 100%;
}

.bg-video {
  object-fit: cover;
  opacity: 0.8;
}

/* Ensure these sit correctly above the video within the layer container */
.overlay { z-index: 1; }
.hud-grid-overlay { z-index: 2; }
.bg-watermark-strip { z-index: 0; }

/* Keep the content panel separated */
.panel {
  position: relative;
  z-index: 10; /* Ensures content is always above the .bg-layer-container */
}

/* ================= THE OVERSIZED INTERFACE PANEL ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 8%;
  width: 48%;
  height: 84vh;
  padding: 20px;
  
  /* FORCE NATIVE GESTURE CAPTURE MECHANICS */
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  pointer-events: auto !important;

  z-index: 2;
  box-sizing: border-box;
  opacity: 0;
  animation: p3rPanelFlyIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  scrollbar-width: none; /* Firefox clear-track rules */
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

@keyframes p3rPanelFlyIn {
  from { opacity: 0; transform: translateX(-120px) skewX(-2deg); }
  to { opacity: 1; transform: translateX(0) skewX(-2deg); }
}

/* HEADER CONFIG */
.top-header {
  margin-bottom: 40px;
  transform: skewX(-6deg);
}

.status-ribbon {
  background: var(--p3r-pure-white);
  color: var(--p3r-navy-void);
  display: inline-block;
  padding: 3px 14px;
  font-size: 0.75rem;
  letter-spacing: 3px;
  font-weight: 900;
  transform: skewX(-15deg);
  margin-bottom: 8px;
}

.main-title {
  font-size: 5.2rem;
  margin: 0;
  line-height: 0.85;
  font-style: italic;
  color: var(--p3r-pure-white);
  text-shadow: 4px 4px 0px var(--p3r-cyan);
}

.subtitle {
  margin: 10px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--p3r-cyan);
  letter-spacing: 2px;
}

/* ================= THE P3R SKEWED SHARD TIMELINE ================= */
.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 20px;
  margin-top: 20px;
}

.central-spine-line {
  position: absolute;
  left: 110px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--p3r-cyan) 0%, rgba(0, 210, 255, 0.1) 100%);
  z-index: 0;
}

.p3r-shard-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 30px;
  opacity: 0;
  transform: translateX(-50px) skewX(-10deg);
  animation: p3rShardFlyIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.12s);
}

@keyframes p3rShardFlyIn {
  to {
    opacity: 1;
    transform: translateX(0) skewX(-10deg);
  }
}

.shard-date-badge {
  position: relative;
  width: 95px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 12px;
  margin-top: 14px;
  transform: skewX(10deg);
}

.date-corner-bracket {
  position: absolute;
  right: 0; top: 0; bottom: 0; width: 4px;
  background: var(--p3r-magenta);
}

.date-text {
  font-family: var(--p3r-font);
  font-size: 1rem;
  font-style: italic;
  font-weight: 900;
  color: var(--p3r-pure-white);
  letter-spacing: -0.5px;
}

.shard-wrapper {
  position: relative;
  flex-grow: 1;
  min-height: 120px;
  padding: 22px 30px;
  z-index: 2;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.shard-bg-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #070e1d 0%, #0e1a35 100%);
  border: 3px solid var(--p3r-pure-white);
  box-shadow: -8px 8px 0px var(--p3r-dark-slate);
  z-index: 1;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.shard-bg-cyan {
  position: absolute;
  top: 0; bottom: 0; left: 0; width: 0;
  background: var(--p3r-cyan);
  z-index: 2;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.15;
}

.p3r-shard-card:hover .shard-wrapper {
  transform: translateX(15px) scale(1.01);
}
.p3r-shard-card:hover .shard-bg-dark {
  border-color: var(--p3r-cyan);
  box-shadow: -14px 14px 0px var(--p3r-magenta);
}
.p3r-shard-card:hover .shard-bg-cyan {
  width: 45%;
}
.p3r-shard-card:hover .date-text {
  color: var(--p3r-cyan);
}

.shard-inner-content {
  position: relative;
  z-index: 4;
  transform: skewX(10deg);
}

.shard-content-header {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
  padding-bottom: 6px;
  margin-bottom: 10px;
}

.role-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.company-sub-link {
  margin: 2px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--p3r-cyan);
}

.shard-desc-body {
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 14px 0;
}

.tag-matrix-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.p3r-matrix-tag {
  background: var(--p3r-dark-slate);
  color: var(--p3r-pure-white);
  border-left: 2px solid var(--p3r-cyan);
  padding: 3px 8px;
  font-size: 0.7rem;
  font-family: sans-serif;
  font-weight: bold;
}
.p3r-shard-card:hover .p3r-matrix-tag {
  background: var(--p3r-pure-white);
  color: var(--p3r-navy-void);
}

.shard-hud-index {
  position: absolute;
  bottom: 6px; right: 12px;
  font-family: monospace;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.15);
  z-index: 3;
  transform: skewX(10deg);
  font-weight: bold;
}
.p3r-shard-card:hover .shard-hud-index {
  color: var(--p3r-cyan);
}

.p3r-theme::after {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 210, 255, 0.05) 50%, transparent 100%);
  animation: p3rScanlineVelocity 4s linear infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes p3rScanlineVelocity {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* ================= ADAPTIVE RESPONSIVENESS ================= */
@media (max-width: 1150px) {
  .panel { width: 58%; }
  .main-title { font-size: 4.2rem; }
}

@media (max-width: 768px) {
  .p3r-theme { 
    overflow: hidden; /* Prevent background layer from jumping */
  }

  .panel {
    width: 90% !important; 
    left: 5% !important; 
    top: 5% !important;
    height: 90vh !important; /* Retain container tracking boundaries */
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
  .timeline-container { padding-left: 0; gap: 20px; }
  .central-spine-line { display: none; }
  
  .p3r-shard-card { flex-direction: column; gap: 8px; transform: none !important; }
  .p3r-shard-card:hover .shard-wrapper { transform: translateX(5px) !important; }
  
  .shard-date-badge { width: auto; text-align: left; padding-right: 0; margin-top: 0; transform: none; }
  .date-corner-bracket { left: 0; right: auto; width: 3px; }
  .date-text { padding-left: 10px; font-size: 0.9rem; }
  
  .shard-wrapper { width: 100%; box-sizing: border-box; padding: 16px; transform: none; }
  .shard-bg-dark { transform: none; }
  .shard-bg-cyan { display: none; }
  .shard-inner-content { transform: none; }
  .shard-hud-index { display: none; }
}
</style>