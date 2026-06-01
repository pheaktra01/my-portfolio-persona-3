<script setup lang="ts">
import { ref, onMounted } from 'vue'
import videoSrc from '../assets/videos/mylivewallpapers.com-Makoto-Yuki-Persona-3.mp4'
import musicSrc from '../assets/musics/Color-Your-Night.mp3'

const videoRef = ref<HTMLVideoElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
const isMuted = ref(true)

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
 	// Always allow the video to autoplay muted (improves UX)
	v.muted = false
	v.loop = true
	try {
		// Respect stored mute preference
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
		// audible autoplay blocked — nothing else can be done programmatically
		// the audio will not play until the user interacts with the page
	}
}

function resumePlaybackAfterGesture() {
  const v = videoRef.value
  const a = audioRef.value
  if (a) { a.muted = false; a.play().catch(() => {}) }
  if (v) { v.muted = true; v.play().catch(() => {}) } // keep video muted or adjust as needed
  localStorage.setItem('audioAllowed', '1')
}

onMounted(() => {
  // Try autoplay as before
  tryAutoplay()

  // If user previously allowed audio, listen for the next user gesture and resume
  if (localStorage.getItem('audioAllowed') === '1') {
    document.addEventListener('pointerdown', () => {
      resumePlaybackAfterGesture()
    }, { once: true })
  } else {
    // attach a one-time gesture to remember user's choice if they interact
    document.addEventListener('pointerdown', () => {
      resumePlaybackAfterGesture()
    }, { once: true })
  }
})

</script>

<template>
	<div class="video-wrapper">
		<video
			ref="videoRef"
			:src="videoSrc"
			playsinline
			autoplay
			loop
			muted
			class="video-bg"
		></video>

		<audio ref="audioRef" :src="musicSrc" preload="auto" class="audio-hidden"></audio>

		<button class="mute-btn" @click="toggleMute">{{ isMuted ? '🔇' : '🔊' }}</button>

		<div class="page-content">
			<!-- Your page content goes here; it's layered over the background video -->
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
