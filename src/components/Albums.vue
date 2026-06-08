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
      </div>
    </div>

    <!-- Panel relies exclusively on standard mouse/pointer click handling -->
    <Transition name="fade-slide">
      <div v-if="isExpanded" class="song-list-panel">
        <div class="panel-header">
          <h4>Persona 3 Reload Megamix</h4>
          <button 
            v-if="selectedSong !== null" 
            @click.stop="togglePlay" 
            class="control-btn"
            :class="{ 'is-playing': isPlaying }"
          >
            {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
          </button>
        </div>
        
        <ul class="song-list">
          <li 
            v-for="song in songs" 
            :key="song.id"
            :class="{ active: selectedSong === song.id }" 
            @click.stop="selectSong(song.id)"
          >
            <span class="track-num">0{{ song.id }}</span>
            <span class="track-title">{{ song.title }}</span>
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

const currentCorner = ref('top-right')
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

const songs = [
  { id: 1, title: 'Color Your Night', src: new URL('', import.meta.url).href },
  { id: 2, title: 'Memory Of You', src: new URL('', import.meta.url).href },
  { id: 3, title: 'Full Moon Full Life', src: new URL('', import.meta.url).href }
]

// const songs = [
//   { id: 1, title: 'Color Your Night', src: new URL('../assets/musics/Color-Your-Night.mp3', import.meta.url).href },
//   { id: 2, title: 'Memory Of You', src: new URL('../assets/musics/Beneath-The-Mask.mp3', import.meta.url).href },
//   { id: 3, title: 'Full Moon Full Life', src: new URL('../assets/musics/Full-Moon-Full-Life.mp3', import.meta.url).href }
// ]

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
.album-widget {
  position: fixed;   
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 999;
  touch-action: none;
  user-select: none;
  transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              right 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              top 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.2s ease;
}

.album-widget.is-dragging {
  transition: none;
}

.album-widget.top-right, .album-widget.bottom-right { align-items: flex-end; }
.album-widget.top-left, .album-widget.bottom-left { align-items: flex-start; }
.album-widget.bottom-left, .album-widget.bottom-right { flex-direction: column-reverse; }

.album-container {
  --size: clamp(120px, 15vw, 200px); 
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}
.album-container:active { cursor: grabbing; }

.album-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none; /* Let pointer events pass directly down to album-container */
}
.album-cover img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px; }
.album-cover.active-cover { transform: scale(1.04); }

.vinyl-disc {
  position: absolute;
  width: 96%;
  height: 96%;
  z-index: 1;
  opacity: 0;
  transform: scale(0.95) translateX(0);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}
.vinyl-disc.show { opacity: 1; }

/* Clean transform alignments that won't distort underlying panels */
.top-right .vinyl-disc.slide-out, .bottom-right .vinyl-disc.slide-out {
  transform: scale(1) translateX(-45%);
}
.top-left .vinyl-disc.slide-out, .bottom-left .vinyl-disc.slide-out {
  transform: scale(1) translateX(45%);
}

.rotating-disc { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; animation: spin 8s linear infinite; }
.paused-rotation .rotating-disc { animation-play-state: paused; }

.song-list-panel {
  background: linear-gradient(180deg, rgba(10, 12, 18, 0.98), rgba(5, 6, 10, 0.98));
  border: 1px solid rgba(0, 170, 255, 0.35);
  width: clamp(240px, 22vw, 300px); 
  padding: 1rem;
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.1) inset, 0 18px 60px rgba(0, 0, 0, 0.7);
  color: #d7e6ff;
  pointer-events: auto; /* Explicitly guarantee click operations map cleanly */
  z-index: 10;
}

.top-right .song-list-panel { transform-origin: top right; clip-path: polygon(0 0, 92% 0, 100% 10%, 100% 100%, 8% 100%, 0 90%); }
.top-left .song-list-panel { transform-origin: top left; clip-path: polygon(8% 0, 100% 0, 100% 90%, 92% 100%, 0 100%, 0 10%); }
.bottom-right .song-list-panel { transform-origin: bottom right; clip-path: polygon(0 10%, 8% 0, 100% 0, 100% 90%, 92% 100%, 0 100%); }
.bottom-left .song-list-panel { transform-origin: bottom left; clip-path: polygon(0 0, 92% 0, 100% 10%, 100% 100%, 8% 100%, 0 90%); }

.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(0, 170, 255, 0.15); }
.panel-header h4 { margin: 0; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(0, 200, 255, 0.85); font-weight: 700; }

.control-btn { background: transparent; border: 1px solid rgba(0, 200, 255, 0.4); color: rgba(0, 200, 255, 0.9); padding: 4px 10px; font-size: 0.7rem; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s ease; border-radius: 2px; }
.control-btn:hover { background: rgba(0, 200, 255, 0.1); box-shadow: 0 0 12px rgba(0, 200, 255, 0.25); }
.control-btn.is-playing { border-color: rgba(255, 60, 60, 0.6); color: rgba(255, 80, 80, 0.9); }

.song-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
.song-list li { position: relative; display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem; cursor: pointer; color: rgba(210, 230, 255, 0.7); border-left: 2px solid transparent; transition: all 0.15s ease; }
.song-list li:hover { background: rgba(0, 180, 255, 0.1); color: #eaf4ff; transform: translateX(4px); }
.song-list li.active { background: linear-gradient(90deg, rgba(0, 180, 255, 0.2), transparent); color: #ffffff; border-left: 2px solid #00c8ff; text-shadow: 0 0 8px rgba(0, 200, 255, 0.4); animation: personaFlicker 2.5s infinite; }

.track-num { font-size: 0.7rem; opacity: 0.5; width: 1.2rem; color: rgba(0, 200, 255, 0.6); font-weight: bold; }
.track-title { font-size: 0.85rem; letter-spacing: 0.3px; }

/* Smooth fade transistion details */
.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px) scale(0.95); }

@keyframes personaFlicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.92; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>