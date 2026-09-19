<template>
  <div class="video-wrapper">

    <!-- INTRO VIDEO -->
    <video
      v-if="!isMobile"
      ref="introVideoRef"
      :class="['video-bg', { hidden: introFinished }]"
      :src="videos.homeIntro"
      playsinline
      autoplay
      muted
      preload="auto"
      @ended="onIntroEnded"
    ></video>

    <!-- LOOP VIDEO -->
    <video
      v-if="!isMobile"
      ref="loopVideoRef"
      :class="['video-bg', 'loop-video', { visible: introFinished }]"
      :src="videos.homeLoop"
      playsinline
      muted
      loop
      preload="metadata"
    ></video>

    <!-- MOBILE -->
    <video
      v-else
      class="video-bg"
      :src="videos.mobile"
      autoplay
      muted
      loop
      playsinline
    ></video>


    <!-- FLOATING UNDERWATER AMBIENT BUBBLES -->
    <div class="ambient-bubbles" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="bubble" :style="{ '--bi': n }"></span>
    </div>

    <!-- SHOW ONLY AFTER LOOP VIDEO STARTS -->
    <div
      class="menu-container"
      :class="{ 'menu-visible': showMenu }"
    >
      <ul class="menu-list">
        <li
          v-for="(item, i) in menuItems"
          :key="item.id"
          class="menu-item"
          :style="{ '--delay': `${i * 80}ms` }"
        >
          <button
            class="persona-btn"
            :data-index="i"
            :class="{
              'is-active': hoveredIndex === i,
              'is-clicked': clickedIndex === i
            }"
            @click="handleClick(i)"
            @pointerdown="onPress(i)"
            @pointerup="onRelease"
            @pointercancel="onRelease"
            @pointerenter="setHover(i)"
            @pointerleave="clearHover"
          >
            <!-- TARGET RETICLE POINTER -->
            <span class="btn-arrow-reticle">▶</span>

            <!-- NUMBER INDEX BADGE -->
            <span class="btn-num-tag">{{ item.id }}</span>

            <!-- VELOCITY SLASH BANNER -->
            <div class="btn-bg-slash"></div>

            <!-- TEXT LAYERS -->
            <div class="btn-text-block">
              <span class="text-layer shadow-text" :data-text="item.title">
                {{ item.title }}
              </span>
              <span class="text-layer main-text" :data-text="item.title">
                {{ item.title }}
              </span>
            </div>

            <!-- JAPANESE SUBTITLE -->
            <span class="btn-jp-sub">{{ item.jp }}</span>
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { playHover, playClick } from '../utils/sound'
import { videos } from '../config/videos'

const introFinished = ref(false)

const introVideoRef = ref<HTMLVideoElement | null>(null)
const loopVideoRef = ref<HTMLVideoElement | null>(null)

const showMenu = ref(false)

const router = useRouter()

const routes = [
  '/profile',
  '/projects',
  '/experience',
  '/journey',
  '/social-links',
  '/resume'
]

const isMobile = ref(false)

function onIntroEnded() {
  const loopVideo = loopVideoRef.value
  if (!loopVideo) return

  introFinished.value = true
  loopVideo.currentTime = 0
  loopVideo.play().catch(() => {})
}

function updateIsMobile() {
  try {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
  } catch {
    isMobile.value = false
  }
}

const menuItems = [
  { id: '01', title: 'PROFILE', jp: 'プロフィール' },
  { id: '02', title: 'PROJECTS', jp: 'プロジェクト' },
  { id: '03', title: 'EXPERIENCE', jp: '経歴' },
  { id: '04', title: 'JOURNEY', jp: '軌跡' },
  { id: '05', title: 'SOCIAL LINK', jp: 'コミュ' },
  { id: '06', title: 'RESUME', jp: '履歴書' }
]

const hoveredIndex = ref<number | null>(null)

function setHover(i: number) {
  if (hoveredIndex.value === i) return
  hoveredIndex.value = i
  playHover(isMobile.value)
}

function clearHover() {
  hoveredIndex.value = null
}

function onPress(i: number) {
  if (!isMobile.value) setHover(i)
}

function onRelease() {
  if (!isMobile.value) {
    setTimeout(() => clearHover(), 220)
  }
}

const clickedIndex = ref<number | null>(null)

function handleClick(i: number) {
  playClick()
  clickedIndex.value = i

  setTimeout(() => {
    clickedIndex.value = null
    router.push(routes[i])
  }, 180)
}

onMounted(() => {
  updateIsMobile()

  // SHOW MENU AFTER 1.5s
  setTimeout(() => {
    showMenu.value = true
  }, 1500)

  // MOBILE
  if (isMobile.value) return

  // DESKTOP
  const introVideo = introVideoRef.value

  if (introVideo) {
    introVideo.play().catch(() => {
      console.log('Autoplay blocked')
    })
  }
})
</script>

<style scoped>
.video-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}
.video-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    pointer-events: none;
}
.desktop-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg,#0b1020 0%, #1b2a44 100%);
}
.page-content {
    position: relative;
    z-index: 10;
    width: 100%;
}
.controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
.hint {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
}

.audio-hidden { display: none; }

.mute-btn {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 30;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.mute-btn svg {
    width: 20px;
    height: 20px;
    color: white;
}

/* =========== FIXED CENTERED MATRIX CONTAINER ============= */
.menu-container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-6deg) skewX(-8deg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
}

.menu-container {
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;

    position: fixed;
    left: 50%;
    top: 50%;
    transform:
      translate(-50%, -50%)
      rotate(-6deg)
      skewX(-8deg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
}

.menu-container.menu-visible {
    opacity: 1;
    pointer-events: auto;
}

.menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
}
.menu-list li + li { margin-top: -1.0rem }

/* =========== CORE STYLIZED BUTTON ADJUSTMENTS ============= */
.persona-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 30px 8px 24px;
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 3.8rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -1px;
  text-transform: uppercase;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  will-change: transform;
  backface-visibility: hidden;
  gap: 12px;
}

.persona-btn:hover {
  transform: scale(1.04) translate(-6px, -2px);
}

/* --- TARGET RETICLE POINTER --- */
.btn-arrow-reticle {
  color: #00d2ff;
  font-size: 1.8rem;
  opacity: 0;
  transform: translateX(-15px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  text-shadow: 0 0 10px #00d2ff, 0 0 20px #00d2ff;
  z-index: 10;
}

.persona-btn:hover .btn-arrow-reticle,
.persona-btn.is-active .btn-arrow-reticle {
  opacity: 1;
  transform: translateX(0);
}

/* --- NUMBER INDEX BADGE --- */
.btn-num-tag {
  font-family: monospace;
  font-size: 1.15rem;
  font-weight: 900;
  font-style: normal;
  letter-spacing: 1px;
  color: #00d2ff;
  background: rgba(4, 8, 20, 0.85);
  border: 1px solid rgba(0, 210, 255, 0.5);
  padding: 3px 8px;
  transform: skewX(-10deg);
  box-shadow: -2px 2px 0px #040814;
  transition: all 0.2s ease;
  z-index: 5;
  pointer-events: none;
}

.persona-btn:hover .btn-num-tag,
.persona-btn.is-active .btn-num-tag {
  background: #00d2ff;
  color: #040814;
  border-color: #ffffff;
  box-shadow: -3px 3px 0px #040814;
}

/* --- TEXT BLOCK --- */
.btn-text-block {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* --- JAPANESE SUBTITLE --- */
.btn-jp-sub {
  font-family: 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif;
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(0, 210, 255, 0.6);
  transform: skewX(-8deg);
  transition: all 0.2s ease;
  z-index: 5;
  pointer-events: none;
}

.persona-btn:hover .btn-jp-sub,
.persona-btn.is-active .btn-jp-sub {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 210, 255, 0.9), 2px 2px 0px #040814;
}

/* --- JAGGED VELOCITY HOVER BANNER COLOR BLOCK --- */
.btn-bg-slash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ff0055; /* Pure P3R primary magenta */
  z-index: 1;
  clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -8px 8px 0px rgba(4, 8, 20, 0.9);
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
}

.persona-btn:hover .btn-bg-slash,
.persona-btn.is-active .btn-bg-slash {
  transform: scaleX(1);
}

/* --- TYPOGRAPHY INTERFACE LAYERS --- */
.text-layer {
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform;
  backface-visibility: hidden;
}

/* Deep Velvet Midnight Drop Shadow Text State */
.text-layer.shadow-text {
  color: #040814;
  z-index: 2;
  transform: translateX(4px) translateY(3px) skewX(-10deg);
  -webkit-text-stroke: 1px #040814;
}

/* Ice Blue Resting State Foreground */
.text-layer.main-text {
  color: #a6f2ff;
  position: absolute;
  z-index: 3;
  transform: skewX(-10deg);
}

/* --- INTERACTIVE ACTION STATES --- */
.persona-btn:hover .text-layer.main-text,
.persona-btn.is-active .text-layer.main-text {
  color: #ffffff;
  transform: skewX(-14deg) translate(-6px, -4px);
  text-shadow: 2px 2px 0px #040814;
}

.persona-btn:hover .text-layer.shadow-text,
.persona-btn.is-active .text-layer.shadow-text {
  color: #000000;
  transform: skewX(-14deg) translate(3px, 2px);
}

/* ================= AMBIENT FLOATING BUBBLES ================= */
.ambient-bubbles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -40px;
  left: calc(var(--bi) * 8.3%);
  width: calc(6px + (var(--bi) * 2px));
  height: calc(6px + (var(--bi) * 2px));
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 210, 255, 0.2) 60%, transparent 100%);
  border: 1px solid rgba(0, 210, 255, 0.4);
  border-radius: 50%;
  animation: floatBubble calc(6s + var(--bi) * 0.8s) infinite linear;
  animation-delay: calc(var(--bi) * 0.5s);
  filter: drop-shadow(0 0 6px rgba(0, 210, 255, 0.4));
}

@keyframes floatBubble {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(calc((var(--bi) % 2 == 0 ? 30px : -30px))); opacity: 0; }
}

/* ================= ADAPTIVE LAYOUT MATRIX ================= */
@media (max-width: 767px) {
    .persona-btn {
        font-size: 2.4rem;
        padding: 6px 16px;
        letter-spacing: 0px;
    }

    .menu-container {
        transform: translate(-50%, -50%) rotate(-2deg) skewX(-4deg);
    }

    .menu-list li + li { margin-top: -0.6rem }

    .btn-bg-slash {
        clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
    }
}

/* ================= P3R CLICK IMPACT TRIGGERS ================= */
.persona-btn.is-clicked {
  animation: btnImpact 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes btnImpact {
  0%   { transform: scale(1); }
  40%  { transform: scale(0.94) translateX(6px); }
  100% { transform: scale(1.04); }
}

.persona-btn.is-clicked .btn-bg-slash {
  transform: scaleX(1);
  background: #00d2ff; /* Secondary Blue Flash impact thread */
  filter: brightness(1.2);
}

.persona-btn.is-clicked .text-layer.main-text {
  animation: textJolt 0.18s ease-in-out;
}

@keyframes textJolt {
  0%   { transform: skewX(-14deg) translate(-6px, -4px); }
  50%  { transform: skewX(-18deg) translate(-10px, -6px); }
  100% { transform: skewX(-14deg) translate(-6px, -4px); }
}

/* ============ VIdeo BAckground ================ */
.video-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    z-index: -1;
    pointer-events: none;

    opacity: 1;
    transition: opacity 0s ease;
}

/* INTRO HIDES */
.video-bg.hidden {
    opacity: 0;
}

/* LOOP STARTS INVISIBLE */
.loop-video {
    opacity: 0;
}

/* LOOP FADES IN */
.loop-video.visible {
    opacity: 1;
}

/* ===== BTN ===== */
/* Update this block in your style section */
.menu-item {
  opacity: 0;
  /* Start slightly shifted to the left */
  transform: translateX(-100px) skewX(-12deg); 
  transition: none; /* Disable standard transition to favor keyframe control */
}

.menu-visible .menu-item {
  animation: p3rEntry 0.6s cubic-bezier(0.15, 0.9, 0.25, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes p3rEntry {
  0% {
    opacity: 0;
    transform: translateX(-100px) skewX(-12deg);
  }
  60% {
    opacity: 1;
    transform: translateX(10px) skewX(-12deg); /* Overshoot */
  }
  100% {
    opacity: 1;
    transform: translateX(0) skewX(-8deg); /* Lock in */
  }
}

.menu-container {
  opacity: 0;
  transition: opacity 0.2s ease; /* Faster fade */
}

.menu-container.menu-visible {
  opacity: 1;
}

.menu-visible {
  animation: containerFlash 0.4s ease-out;
}

@keyframes containerFlash {
  0% { filter: brightness(3) contrast(1.5); }
  100% { filter: brightness(1) contrast(1); }
}
</style>