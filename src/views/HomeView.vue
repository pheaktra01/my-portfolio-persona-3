<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import desktopVideoSrc from '../assets/videos/mylivewallpapers.com-Makoto-Yuki-Persona-3.mp4'
import mobileVideoSrc from '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4'

import hoverSoundUrl from '../assets/sounds/hover.wav'
import clickSoundUrl from '../assets/sounds/click.wav'

import IntroSlash from '../components/IntroSlash.vue'

// add vide ref
const videoRef = ref<HTMLVideoElement | null>(null)

/* ================= ROUTER ================= */
const router = useRouter()

const routes = [
  '/skills',
  '/projects',
  '/stack',
  '/profile',
  '/experience',
  '/timeline',
  '/social-links',
  '/calendar',
  '/resume'
]

/* ================= MOBILE CHECK ================= */
const isMobile = ref(false)

function updateIsMobile() {
  try {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
  } catch {
    isMobile.value = false
  }
}

/* ================= MENU ================= */
const menuItems = [
  'SKILLS','PROJECTS','STACK','PROFILE',
  'EXPERIENCE','TIMELINE','SOCIAL LINK',
  'CALENDAR','RESUME'
]

const hoveredIndex = ref<number | null>(null)

/* ================= HOVER SOUND ================= */
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

/* ================= CLICK SOUND ================= */
const clickAudio = new Audio(clickSoundUrl)
clickAudio.volume = 0.6
clickAudio.preload = 'auto'

function playClickSound() {
  clickAudio.currentTime = 0
  clickAudio.play().catch(() => {})
}

/* ================= MENU INTERACTIONS ================= */
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

function handleClick(i: number) {
  playClickSound()

  if (isMobile.value) {
    setHover(i)
    setTimeout(() => clearHover(), 2000)
  }

  router.push(routes[i])
}

/* ================= INIT ================= */
onMounted(() => {
  updateIsMobile()

  const v = videoRef.value
  if (v) {
    v.muted = true        // MUST be real runtime mute
    v.loop = true

    const playVideo = async () => {
      try {
        await v.play()
      } catch (e) {
        console.log('Autoplay blocked, waiting for interaction')
      }
    }

    playVideo()
  }
})
</script>

<template>
	<div class="video-wrapper">
		<!-- Desktop uses the main (first) video; mobile uses the MOBILE (second) video -->
		<video
			v-if="!isMobile"
			ref="videoRef"
			:src="desktopVideoSrc"
			playsinline
			autoplay
			loop
			muted
			class="video-bg"
			preload="none"
		></video>

		<video
			v-else
			ref="videoRef"
			:src="mobileVideoSrc"
			playsinline
			autoplay
			loop
			muted
			class="video-bg"
			preload="none"
		></video>

		<IntroSlash />

		<div class="menu-container">
			<ul class="menu-list">
				<li v-for="(item, i) in menuItems" :key="item">
					<button
						class="persona-btn"
						:data-index="i"
						:class="{ 'is-active': hoveredIndex === i }"
						@click="handleClick(i)"
						@pointerdown="onPress(i)"
						@pointerup="onRelease"
						@pointercancel="onRelease"
					>
						<div class="btn-bg-slash"></div>
						<span class="text-layer shadow-text" :data-text="item" @pointerenter="setHover(i)" @pointerleave="clearHover">{{ item }}</span>
						<span class="text-layer main-text" :data-text="item" @pointerenter="setHover(i)" @pointerleave="clearHover">{{ item }}</span>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

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
/* Removed legacy .menu/.menu-btn styles — using .menu-container and .persona-btn now */
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

/* Container styling just for presentation */
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

.menu-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 0; /* remove extra gap between items */
}
.menu-list li + li { margin-top: -1.0rem } /* overlap items to tighten spacing */

/* Base Button Styling */
.persona-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
	padding: 6px 20px;
	font-family: 'Impact', 'Arial Black', sans-serif;
	font-size: 3.8rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	white-space: nowrap;
}

/* Subtle pop/scale effect when active */
.persona-btn:hover {
  transform: scale(1.05) rotate(-2deg);
}

/* --- THE BACKGROUND SLASH --- */
.btn-bg-slash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ff4a73; /* Persona bright pink/red */
  z-index: 1;
  
  /* Creates the sharp jagged banner look */
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  
  /* Hidden by default, scale from center-left */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}

/* --- TEXT LAYERS --- */
.text-layer {
  position: relative;
  transition: all 0.2s ease-in-out;
  display: inline-block;
	white-space: nowrap;
}

/* The Black Offset Text (Default State) */
.text-layer.shadow-text {
  color: #000000;
  z-index: 2;
  transform: translateX(4px) translateY(2px) skewX(-10deg);
}

/* The Light Blue Text (Default State) */
.text-layer.main-text {
  color: #61e1ff; /* Ice blue from your image */
  position: absolute;
  z-index: 3;
  transform: skewX(-10deg);
  /* Cutout look mix-blend-mode if needed, but solid color works best here */
}


/* --- HOVER / ACTIVE STATES --- */

/* 1. Reveal Background Slash */
.persona-btn.is-active .btn-bg-slash {
  transform: scaleX(1);
}

/* 2. Shift the Main Front Text to White */
.persona-btn.is-active .text-layer.main-text {
  color: #ffffff;
  transform: skewX(-15deg) translate(-4px, -2px);
}

/* 3. Shift the Shadow Text to Black/Strong Contrast against Pink */
.persona-btn.is-active .text-layer.shadow-text {
  color: #000000;
  transform: skewX(-15deg) translate(2px, 2px) scale(1.02);
}

/* Mobile adjustments: smaller buttons, tighter spacing, no heavy transforms */
@media (max-width: 767px) {
	.persona-btn {
		font-size: 2.2rem;
		padding: 4px 12px;
		letter-spacing: 1px;
	}

	.menu-container {
		transform: translate(-50%, -50%) rotate(-2deg) skewX(-4deg);
	}

	.menu-list li + li { margin-top: -0.6rem }

	/* reduce the background slash prominence on small screens */
	.btn-bg-slash {
		clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
	}
}
</style>
