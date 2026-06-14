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
      preload="auto"
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


    <!-- SHOW ONLY AFTER LOOP VIDEO STARTS -->
    <div
      class="menu-container"
      :class="{ 'menu-visible': showMenu }"
    >
      <ul class="menu-list">
        <li
          v-for="(item, i) in menuItems"
          :key="item"
          class="menu-item"
          :style="{ '--delay': `${i * 90}ms` }"
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
          >
            <div class="btn-bg-slash"></div>

            <span
              class="text-layer shadow-text"
              :data-text="item"
              @pointerenter="setHover(i)"
              @pointerleave="clearHover"
            >
              {{ item }}
            </span>

            <span
              class="text-layer main-text"
              :data-text="item"
              @pointerenter="setHover(i)"
              @pointerleave="clearHover"
            >
              {{ item }}
            </span>
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import hoverSoundUrl from '../assets/sounds/hover.wav'
import clickSoundUrl from '../assets/sounds/click.wav'

import { videos } from '../config/videos'

const introFinished = ref(false)

const introVideoRef = ref<HTMLVideoElement | null>(null)
const loopVideoRef = ref<HTMLVideoElement | null>(null)

const currentVideo = ref('')
const showMenu = ref(false)

const videoRef = ref<HTMLVideoElement | null>(null)
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
  'PROFILE','PROJECTS',
  'EXPERIENCE','JOURNEY','SOCIAL LINK',
  'RESUME'
]

const hoveredIndex = ref<number | null>(null)
let lastHoverPlay = 0
const HOVER_THROTTLE_MS = 150

const hoverAudio = new Audio(hoverSoundUrl)
hoverAudio.volume = 0.35
hoverAudio.preload = 'auto'

function playHoverSound() {
  if (isMobile.value) return
  const now = Date.now()
  if (now - lastHoverPlay < HOVER_THROTTLE_MS) return

  lastHoverPlay = now
  hoverAudio.pause()
  hoverAudio.currentTime = 0
  hoverAudio.play().catch(() => {})
}

const clickAudio = new Audio(clickSoundUrl)
clickAudio.volume = 0.6
clickAudio.preload = 'auto'

function playClickSound() {
  clickAudio.currentTime = 0
  clickAudio.play().catch(() => {})
}

function setHover(i: number) {
  if (hoveredIndex.value === i) return
  hoveredIndex.value = i
  playHoverSound()
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
  playClickSound()
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
  padding: 8px 35px;
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 4.2rem; /* Enhanced visibility threshold */
  font-style: italic;
  font-weight: 900;
  letter-spacing: -1px; /* Tighter typography grouping */
  text-transform: uppercase;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.persona-btn:hover {
  transform: scale(1.04) translate(-4px, -2px);
}

/* --- JAGGED VELOCITY HOVER BANNER COLOR BLOCK --- */
.btn-bg-slash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ff0055; /* Swapped to the pure P3R primary magenta */
  z-index: 1;
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -8px 8px 0px rgba(4, 8, 20, 0.9);
}

/* --- TYPOGRAPHY INTERFACE LAYERS --- */
.text-layer {
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
  white-space: nowrap;
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

.persona-btn.is-active .btn-bg-slash {
  transform: scaleX(1);
}

/* Shift Text Layer to High Contrast Pure White */
.persona-btn.is-active .text-layer.main-text {
  color: #ffffff;
  transform: skewX(-14deg) translate(-6px, -4px);
  text-shadow: 2px 2px 0px #040814;
}

.persona-btn.is-active .text-layer.shadow-text {
  color: #000000;
  transform: skewX(-14deg) translate(3px, 2px);
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