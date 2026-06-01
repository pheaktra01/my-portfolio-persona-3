<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import desktopVideoSrc from '../assets/videos/mylivewallpapers.com-Makoto-Yuki-Persona-3.mp4'
import mobileVideoSrc from '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4'
import musicSrc from '../assets/musics/Color-Your-Night.mp3'

const videoRef = ref<HTMLVideoElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
const isMuted = ref(true)

// Track whether viewport is considered "mobile". We only load/play the video on mobile
const isMobile = ref<boolean>(false)

function updateIsMobile() {
	try {
		isMobile.value = window.matchMedia('(max-width: 767px)').matches
	} catch (e) {
		isMobile.value = false
	}
}

function setMutedState(muted: boolean) {
	const a = audioRef.value
	if (a) {
		a.muted = muted
		if (!muted) a.play().catch(() => {})
	}
	isMuted.value = muted
	localStorage.setItem('audioMuted', muted ? '1' : '0')
}

function toggleMute() {
	setMutedState(!isMuted.value)
}

async function tryAutoplay() {
	const v = videoRef.value
	const a = audioRef.value
	if (!v) return
	v.muted = false
	v.loop = true
	try {
		const stored = localStorage.getItem('audioMuted')
		const prefMuted = stored === '1'
		if (a) {
			a.muted = prefMuted
			a.loop = true
			if (!prefMuted) await a.play()
		}
		await v.play()
		isMuted.value = prefMuted
	} catch (e) {
		// autoplay blocked
	}
}

function resumePlaybackAfterGesture() {
	const v = videoRef.value
	const a = audioRef.value
	if (a) { a.muted = false; a.play().catch(() => {}) }
	if (v) { v.muted = true; v.play().catch(() => {}) }
	localStorage.setItem('audioAllowed', '1')
}

let mq: MediaQueryList | null = null

onMounted(() => {
	updateIsMobile()
	try {
		mq = window.matchMedia('(max-width: 767px)')
		const handler = (ev: MediaQueryListEvent) => { isMobile.value = ev.matches }
		if (mq.addEventListener) mq.addEventListener('change', handler)
		else if (mq.addListener) mq.addListener(handler)

		tryAutoplay()

		document.addEventListener('pointerdown', () => {
			resumePlaybackAfterGesture()
		}, { once: true })
	} catch (e) {
		// ignore
	}
})

onUnmounted(() => {
	if (mq) {
		try { if (mq.removeEventListener) mq.removeEventListener('change', () => {}) } catch {}
	}
})

// Menu state
const menuItems = ['SKILLS','PROJECTS','STACK','PROFILE','EXPERIENCE','TIMELINE','SOCIAL LINK','CALENDAR','RESUME']
const hoveredIndex = ref<number | null>(null)

function setHover(i: number) { hoveredIndex.value = i }
function clearHover() { hoveredIndex.value = null }

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
		></video>

		<audio ref="audioRef" :src="musicSrc" preload="auto" class="audio-hidden"></audio>

		<button
			class="mute-btn"
			@click="toggleMute"
			:aria-label="isMuted ? 'Unmute audio' : 'Mute audio'"
			title="Toggle mute"
		>
			<template v-if="isMuted">
				<!-- Muted icon (speaker with X) -->
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M11 5L6 9H3v6h3l5 4V5z" />
					<path d="M16 9l4 4M20 9l-4 4" />
				</svg>
			</template>
			<template v-else>
				<!-- Unmuted icon (speaker with waves) -->
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M11 5L6 9H3v6h3l5 4V5z" />
					<path d="M15 9a4 4 0 010 6" />
					<path d="M17.5 7a7 7 0 010 10" />
				</svg>
			</template>
		</button>

		<div class="menu-container">
			<ul class="menu-list">
				<li v-for="(item, i) in menuItems" :key="item">
					<button
						class="persona-btn"
						:class="{ 'is-active': hoveredIndex === i }"
						@mouseenter="setHover(i)"
						@mouseleave="clearHover"
					>
						<div class="btn-bg-slash"></div>
						<span class="text-layer shadow-text" :data-text="item">{{ item }}</span>
						<span class="text-layer main-text" :data-text="item">{{ item }}</span>
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
</style>
