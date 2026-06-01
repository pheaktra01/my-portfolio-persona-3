<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
	if (!isMobile.value) return
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

</script>

<template>
	<div class="video-wrapper">
		<!-- Video only mounted/loaded on mobile to save bandwidth on larger screens -->
		<video
			v-if="isMobile"
			ref="videoRef"
			:src="mobileVideoSrc"
			playsinline
			autoplay
			loop
			muted
			class="video-bg"
		></video>

		<!-- Desktop fallback: simple static background (gradient) — replace with an image if you add one -->
		<div v-else class="desktop-bg"></div>

		<audio v-if="isMobile" ref="audioRef" :src="musicSrc" preload="auto" class="audio-hidden"></audio>

		<button class="mute-btn" @click="toggleMute" v-if="isMobile">{{ isMuted ? '🔇' : '🔊' }}</button>

		<div class="page-content">
			<slot />
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
</style>
