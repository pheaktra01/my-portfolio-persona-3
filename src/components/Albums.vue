<template>
  <div 
    class="album-widget" 
    ref="widgetRef"
    :style="widgetStyle"
    :class="[currentCorner, { 'is-dragging': isDragging }]"
  >

    <div 
      class="album-container" 
      @pointerdown="startDrag"
      @click="handleContainerClick"
    >
      <div 
        class="vinyl-disc" 
        :class="{ 
          'show': discsReady,
          'slide-out': isDiscSlidOut, 
          'paused-rotation': !isPlaying 
        }"
      >
        <img :src="currentDiscAsset" alt="Active Vinyl Disc" class="rotating-disc" />
      </div>

      <div class="album-cover" :class="{ 'active-cover': isExpanded }">
        <img src="../assets/images/albume.png" alt="Album Cover" />
        <div class="album-cover-border"></div>
      </div>
    </div>

    <!-- Panel relies exclusively on standard mouse/pointer click handling -->
    <Transition name="fade-slide">
      <div v-if="isExpanded" class="song-list-panel">
        <div class="panel-header">
          <div class="header-banner">
            <span class="header-sub">SOUNDTRACK TRACKER //</span>
            <h4>P3R MEGAMIX</h4>
          </div>
          <button 
            v-if="selectedSong !== null" 
            @click.stop="togglePlay" 
            class="control-btn"
            :class="{ 'is-playing': isPlaying }"
          >
            {{ isPlaying ? 'PAUSE //' : 'PLAY //' }}
          </button>
        </div>
        
        <ul class="song-list">
          <li 
            v-for="song in songs" 
            :key="song.id"
            :class="{ active: selectedSong === song.id }" 
            @click.stop="selectSong(song.id)"
          >
            <!-- ASYMMETRICAL SELECTION BACKGROUND PLATE -->
            <div class="item-bg-slash"></div>

            <span class="track-num">0{{ song.id }}</span>
            <div class="text-frame">
              <span class="track-title shadow-text" :data-text="song.title">{{ song.title }}</span>
              <span class="track-title main-text" :data-text="song.title">{{ song.title }}</span>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { playClick } from '../utils/sound'
import { useAudioStore } from '../stores/audio'
import disc1 from '../assets/images/disc.png'
import disc2 from '../assets/images/disc1.png'
import disc3 from '../assets/images/disc2.png'

const audioStore = useAudioStore()

const isExpanded = ref(false)
const selectedSong = ref(null)
const widgetRef = ref(null)
const discsReady = ref(false)
const isSwapping = ref(false)

const currentCorner = ref('bottom-right') 
const isDragging = ref(false)
const position = ref({ x: 0, y: 0 })
const useRawPosition = ref(false)

let dragStartX = 0
let dragStartY = 0
let hasMovedSignificantDistance = false

const isPlaying = computed(() => audioStore.isPlaying)
const isDiscSlidOut = computed(() => isPlaying.value && !isSwapping.value)

const currentDiscAsset = computed(() => {
  if (selectedSong.value === 2) return disc2
  if (selectedSong.value === 3) return disc3
  return disc1
})

// const songs = [
//   { id: 1, title: 'Color Your Night', src: new URL('../assets/musics/Color-Your-Night.mp3', import.meta.url).href },
//   { id: 2, title: 'Memory Of You', src: new URL('../assets/musics/Memory_Of_You.mp3', import.meta.url).href },
//   { id: 3, title: 'Full Moon Full Life', src: new URL('../assets/musics/Full-Moon-Full-Life.mp3', import.meta.url).href }
// ]

const songs = [
  { id: 1, title: 'Color Your Night', src: new URL('', import.meta.url).href },
  { id: 2, title: 'Memory Of You', src: new URL('', import.meta.url).href },
  { id: 3, title: 'Full Moon Full Life', src: new URL('', import.meta.url).href }
]

const widgetStyle = computed(() => {
  if (useRawPosition.value) {
    return {
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      right: 'auto',
      bottom: 'auto'
    }
  }
  
  switch (currentCorner.value) {
    case 'top-left':     return { left: '1.25rem', top: '1.25rem', right: 'auto', bottom: 'auto' }
    case 'bottom-left':  return { left: '1.25rem', bottom: '1.25rem', right: 'auto', top: 'auto' }
    case 'bottom-right': return { right: '1.25rem', bottom: '1.25rem', left: 'auto', top: 'auto' }
    case 'top-right':
    default:             return { right: '1.25rem', top: '1.25rem', left: 'auto', bottom: 'auto' }
  }
})

const startDrag = (event) => {
  if (event.target.closest('.song-list-panel')) return

  isDragging.value = true
  hasMovedSignificantDistance = false
  useRawPosition.value = true

  const rect = widgetRef.value.getBoundingClientRect()
  dragStartX = event.clientX - rect.left
  dragStartY = event.clientY - rect.top
  position.value = { x: rect.left, y: rect.top }

  window.addEventListener('pointermove', handleDrag)
  window.addEventListener('pointerup', stopDrag)
  
  event.currentTarget.setPointerCapture(event.pointerId)
}

const handleDrag = (event) => {
  if (!isDragging.value) return
  
  let newX = event.clientX - dragStartX
  let newY = event.clientY - dragStartY

  const padding = 20
  newX = Math.max(padding, Math.min(window.innerWidth - widgetRef.value.offsetWidth - padding, newX))
  newY = Math.max(padding, Math.min(window.innerHeight - widgetRef.value.offsetHeight - padding, newY))

  if (Math.abs(newX - position.value.x) > 5 || Math.abs(newY - position.value.y) > 5) {
    hasMovedSignificantDistance = true
  }

  position.value = { x: newX, y: newY }
}

const stopDrag = (event) => {
  if (!isDragging.value) return
  isDragging.value = false
  useRawPosition.value = false

  window.removeEventListener('pointermove', handleDrag)
  window.removeEventListener('pointerup', stopDrag)
  
  try {
    event.target.releasePointerCapture(event.pointerId)
  } catch (e) {}

  const centerX = position.value.x + widgetRef.value.offsetWidth / 2
  const centerY = position.value.y + widgetRef.value.offsetHeight / 2
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  const isLeft = centerX < screenW / 2
  const isTop = centerY < screenH / 2

  if (isTop && isLeft) currentCorner.value = 'top-left'
  else if (isTop && !isLeft) currentCorner.value = 'top-right'
  else if (!isTop && isLeft) currentCorner.value = 'bottom-left'
  else if (!isTop && !isLeft) currentCorner.value = 'bottom-right'
}

const handleContainerClick = (e) => {
  if (hasMovedSignificantDistance) return
  toggleExpand()
}

const preloadImages = () => {
  ;[disc1, disc2, disc3].forEach(src => {
    const img = new Image()
    img.src = src
  })
}

onMounted(() => {
  preloadImages()
  document.addEventListener('click', handleClickOutside)
  selectedSong.value = 1
  audioStore.init(songs[0].src)
  audioStore.pause() 
  requestAnimationFrame(() => { discsReady.value = true })
})

const toggleExpand = () => {
  playClick()
  isExpanded.value = !isExpanded.value
}

const selectSong = (id) => {
  playClick()
  const song = songs.find(s => s.id === id)
  if (!song) return
  
  if (selectedSong.value === id) { 
    togglePlay()
    return 
  }

  if (isDiscSlidOut.value) {
    isSwapping.value = true
    audioStore.pause()
    setTimeout(() => {
      audioStore.changeSong(song.src)
      selectedSong.value = id
      if (!audioStore.muted) audioStore.play()
      isSwapping.value = false
    }, 350)
  } else {
    audioStore.changeSong(song.src)
    selectedSong.value = id
    if (!audioStore.muted) audioStore.play()
  }
}

const togglePlay = () => {
  if (!selectedSong.value) return
  playClick()
  audioStore.isPlaying ? audioStore.pause() : audioStore.play()
}

const handleClickOutside = (event) => {
  if (!widgetRef.value || widgetRef.value.contains(event.target)) return
  isExpanded.value = false
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ================= GLOBAL MATRIX CONTAINER ================= */
.album-widget {
  position: fixed;   
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  z-index: 999;
  touch-action: none;
  user-select: none;
  transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              right 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              top 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.album-widget.is-dragging {
  transition: none;
}

.album-widget.top-right, .album-widget.bottom-right { align-items: flex-end; }
.album-widget.top-left, .album-widget.bottom-left { align-items: flex-start; }
.album-widget.bottom-left, .album-widget.bottom-right { flex-direction: column-reverse; }

.album-container {
  --size: clamp(120px, 15vw, 180px); 
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}
.album-container:active { cursor: grabbing; }

/* ================= COMPONENT MECHANICAL ASSETS ================= */
.album-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4; 
  box-shadow: -8px 8px 0px rgba(4, 8, 20, 0.9);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.album-cover img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display: block; 
}
.album-cover-border {
  position: absolute;
  inset: 0;
  border: 2px solid #040814;
  pointer-events: none;
}
.album-cover.active-cover { 
  transform: scale(1.04) rotate(-3deg); 
}

.vinyl-disc {
  position: absolute;
  width: 96%;
  height: 96%;
  z-index: 1;
  opacity: 0;
  transform: scale(0.9) translateX(0);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.vinyl-disc.show { opacity: 1; }

.top-right .vinyl-disc.slide-out, .bottom-right .vinyl-disc.slide-out {
  transform: scale(1) translateX(-50%) rotate(-12deg);
}
.top-left .vinyl-disc.slide-out, .bottom-left .vinyl-disc.slide-out {
  transform: scale(1) translateX(50%) rotate(12deg);
}

.rotating-disc { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; animation: spin 8s linear infinite; }
.paused-rotation .rotating-disc { animation-play-state: paused; }

/* ================= THE STYLIZED P3R PLAYLIST PANEL ================= */
.song-list-panel {
  background: #040814;
  border: 2px solid #040814;
  width: clamp(260px, 24vw, 320px); 
  padding: 1.25rem 1rem;
  box-shadow: -10px 10px 0px rgba(4, 8, 20, 0.4);
  color: #a6f2ff;
  pointer-events: auto;
  z-index: 10;
  transform: rotate(-1deg);
}

/* Iconic Sharp Persona Slice Clips */
.top-right .song-list-panel { transform-origin: top right; clip-path: polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%); }
.top-left .song-list-panel { transform-origin: top left; clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 88%); }
.bottom-right .song-list-panel { transform-origin: bottom right; clip-path: polygon(0 0, 94% 0, 100% 12%, 100% 100%, 0 100%); }
.bottom-left .song-list-panel { transform-origin: bottom left; clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%); }

.panel-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-end; 
  margin-bottom: 1rem; 
  padding-bottom: 0.6rem; 
  border-bottom: 2px solid rgba(166, 242, 255, 0.2); 
}
.header-banner {
  display: flex;
  flex-direction: column;
}
.header-sub {
  font-family: monospace;
  font-size: 0.55rem;
  color: rgba(166, 242, 255, 0.4);
  letter-spacing: 1px;
}
.panel-header h4 { 
  margin: 0; 
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 1.2rem; 
  font-style: italic;
  letter-spacing: 0px; 
  text-transform: uppercase; 
  color: #ffffff; 
  font-weight: 900; 
}

/* ================= HIGH LEVEL CONTROL PUNCH BUTTONS ================= */
.control-btn { 
  background: transparent; 
  border: 2px solid #a6f2ff; 
  color: #a6f2ff; 
  padding: 4px 12px; 
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-style: italic;
  font-size: 0.8rem; 
  cursor: pointer; 
  text-transform: uppercase; 
  letter-spacing: 1px; 
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1); 
  transform: skewX(-8deg);
}
.control-btn:hover { 
  background: #a6f2ff; 
  color: #040814;
  transform: skewX(-8deg) scale(1.05);
}
.control-btn.is-playing { 
  border-color: #ff0055; 
  color: #ff0055; 
}
.control-btn.is-playing:hover {
  background: #ff0055;
  color: #ffffff;
}

/* ================= TRACK ITEM FRAMEWORK LISTS ================= */
.song-list { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
  display: flex; 
  flex-direction: column; 
  gap: 4px; 
}

.song-list li { 
  position: relative; 
  display: flex; 
  align-items: center; 
  gap: 0.85rem; 
  padding: 0.5rem 0.75rem; 
  cursor: pointer; 
  overflow: hidden;
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Alternating Staggered Offset Base Rules */
.song-list li:nth-child(even) {
  transform: translateX(-4px);
}

.song-list li:hover { 
  transform: translateX(4px) skewX(-4deg); 
}

/* THE BACKGROUND SHARD SPLIT PLATE FOR SELECTION ACTIVE STATES */
.item-bg-slash {
  position: absolute;
  inset: 0;
  background: #ff0055; /* Pure P3R Magenta */
  z-index: 1;
  clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.track-num { 
  position: relative;
  font-family: 'Impact', sans-serif;
  font-size: 1.1rem; 
  font-style: italic;
  z-index: 3;
  color: rgba(166, 242, 255, 0.4); 
  font-weight: bold; 
  transition: color 0.15s ease;
}

.text-frame {
  position: relative;
  height: 1.4rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.track-title { 
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 1.15rem; 
  font-style: italic;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0.5px;
  display: block;
  transition: color 0.18s ease, transform 0.18s ease;
}

.track-title.shadow-text {
  color: #040814;
  z-index: 2;
  transform: translate(2px, 1px);
  opacity: 0; /* Only visible when backdropped by the crimson slash banner */
}

.track-title.main-text {
  color: #a6f2ff;
  position: absolute;
  top: 0; left: 0;
  z-index: 3;
}

/* Active Track Layout Triggers */
.song-list li.active {
  transform: translateX(8px) skewX(-6deg);
}

.song-list li.active .item-bg-slash {
  transform: scaleX(1);
}

.song-list li.active .track-num {
  color: #ffffff;
}

.song-list li.active .track-title.shadow-text {
  opacity: 1;
}

.song-list li.active .track-title.main-text {
  color: #ffffff;
  transform: translate(-2px, -1px);
}

/* Smooth fade transition parameters */
.fade-slide-enter-active, .fade-slide-leave-active { 
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); 
}
.fade-slide-enter-from, .fade-slide-leave-to { 
  opacity: 0; 
  transform: translateY(10px) scale(0.95); 
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>