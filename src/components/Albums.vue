<template>
  <div class="album-widget" ref="widgetRef">
    <!-- Album and Discs Wrapper -->
    <div class="album-container" @click="toggleExpand">
      <!-- Disc 1 (Track 1) -->
      <div 
        class="vinyl-disc" 
        :class="{ 
          'slide-out': selectedSong === 1 && isPlaying, 
          'paused-rotation': !isPlaying 
        }"
      >
        <img src="../assets/images/disc.png" alt="Vinyl Disc 1" class="rotating-disc" />
      </div>
      
      <!-- Disc 2 (Track 2) -->
      <div 
        class="vinyl-disc1" 
        :class="{ 
          'slide-out': selectedSong === 2 && isPlaying, 
          'paused-rotation': !isPlaying 
        }"
      >
        <img src="../assets/images/disc1.png" alt="Vinyl Disc 2" class="rotating-disc" />
      </div>

      <!-- Disc 3 (Track 3) -->
      <div 
        class="vinyl-disc2" 
        :class="{ 
          'slide-out': selectedSong === 3 && isPlaying, 
          'paused-rotation': !isPlaying 
        }"
      >
        <img src="../assets/images/disc2.png" alt="Vinyl Disc 3" class="rotating-disc" />
      </div>

      <!-- Album Cover -->
      <div class="album-cover" :class="{ 'active-cover': isExpanded }">
        <img src="../assets/images/albume.png" alt="Album Cover" />
      </div>
    </div>

    <!-- Upgraded Song List Menu Transition -->
    <Transition name="fade-slide">
      <div v-if="isExpanded" class="song-list-panel">
        <div class="panel-header">
          <h4>Persona 3 Reload Megamix</h4>
          <button 
            v-if="selectedSong !== null" 
            @click="togglePlay" 
            class="control-btn"
            :class="{ 'is-playing': isPlaying }"
          >
            {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
          </button>
        </div>
        
        <ul class="song-list">
          <li 
            :class="{ active: selectedSong === 1 }" 
            @click="selectSong(1)"
          >
            <span class="track-num">01</span>
            <span class="track-title">Color Your Night</span>
          </li>
          <li 
            :class="{ active: selectedSong === 2 }" 
            @click="selectSong(2)"
          >
            <span class="track-num">02</span>
            <span class="track-title">Memory Of You</span>
          </li>
          <li 
            :class="{ active: selectedSong === 3 }" 
            @click="selectSong(3)"
          >
            <span class="track-num">03</span>
            <span class="track-title">Full Moon Full Life</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { playClick } from '../utils/sound'
import { useAudioStore } from '../stores/audio'

const audioStore = useAudioStore()

const isExpanded = ref(false)
const selectedSong = ref(null)
const isPlaying = ref(false)
const widgetRef = ref(null)

const songs = [
  {
    id: 1,
    title: "Color Your Night",
    src: new URL('../assets/musics/Color-Your-Night.mp3', import.meta.url).href
  },
  {
    id: 2,
    title: "Beneath The Mask",
    src: new URL('../assets/musics/Beneath-The-Mask.mp3', import.meta.url).href
  },
  {
    id: 3,
    title: "Full Moon Full Life",
    src: new URL('../assets/musics/Full-Moon-Full-Life.mp3', import.meta.url).href
  }
]

const toggleExpand = () => {
  playClick()
  isExpanded.value = !isExpanded.value
}

const selectSong = (trackNumber) => {
  playClick()

  const song = songs.find(s => s.id === trackNumber)
  if (!song) return

  // switch song in audio engine
  audioStore.changeSong(song.src)

  selectedSong.value = trackNumber
  isPlaying.value = true

  if (audioStore.muted) return
  audioStore.play()
}

const togglePlay = () => {
  if (!selectedSong.value) return

  playClick()
  isPlaying.value = !isPlaying.value

  if (isPlaying.value) {
    audioStore.play()
  } else {
    audioStore.pause()
  }
}

const handleClickOutside = (event) => {
  if (!widgetRef.value) return
  if (!widgetRef.value.contains(event.target)) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // optional default song
  const first = songs[0]
  selectedSong.value = 1
  isPlaying.value = true

  audioStore.init(first.src)
  audioStore.play()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Main Container Wrapper */
.album-widget {
  position: fixed;   
  top: 20px;
  right: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 20;
}

/* Album Container Bounds */
.album-container {
  --size: 200px;
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Album Cover */
.album-cover {
  position: absolute;
  top: 0;
  left: 30%;
  width: 100%;
  height: 100%;
  z-index: 4; /* Bumped to 4 because we now have 3 discs below it */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.album-cover.active-cover {
  transform: scale(1.04);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Discs Core Setup */
.vinyl-disc, .vinyl-disc1, .vinyl-disc2 {
  position: absolute;
  top: 2%; 
  left: 32%; 
  width: 96%;
  height: 96%;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Stack order underneath the album cover jacket */
.vinyl-disc  { z-index: 1; }
.vinyl-disc1 { z-index: 2; }
.vinyl-disc2 { z-index: 3; }

/* All 3 discs slide out perfectly to the identical position when active */
.vinyl-disc.slide-out,
.vinyl-disc1.slide-out,
.vinyl-disc2.slide-out {
  transform: translateX(-55%);
}

/* Spin Animations */
.rotating-disc {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  animation: spin 8s linear infinite;
}

/* Pauses animation instantly when music stops */
.paused-rotation .rotating-disc {
  animation-play-state: paused;
}

/* --- =================== Song List UI Panel ======================= --- */
.song-list-panel {
  background: linear-gradient(180deg, rgba(10, 12, 18, 0.95), rgba(5, 6, 10, 0.95));
  border: 1px solid rgba(0, 170, 255, 0.25);

  width: 290px;
  padding: 12px;

  box-shadow:
    0 0 0 1px rgba(0, 170, 255, 0.08) inset,
    0 18px 60px rgba(0, 0, 0, 0.6);

  position: relative;

  clip-path: polygon(
    0 0,
    92% 0,
    100% 10%,
    100% 100%,
    8% 100%,
    0 90%
  );

  color: #d7e6ff;
}

/* top header = system bar */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;
  padding-bottom: 8px;

  border-bottom: 1px solid rgba(0, 170, 255, 0.15);
}

.panel-header h4 {
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: rgba(0, 200, 255, 0.85);
  font-weight: 700;
}

/* Persona-style command button */
.control-btn {
  background: transparent;
  border: 1px solid rgba(0, 200, 255, 0.4);

  color: rgba(0, 200, 255, 0.9);

  padding: 4px 10px;
  font-size: 0.7rem;

  cursor: pointer;

  text-transform: uppercase;
  letter-spacing: 1px;

  transition: all 0.2s ease;
}

.control-btn:hover {
  background: rgba(0, 200, 255, 0.1);
  box-shadow: 0 0 12px rgba(0, 200, 255, 0.25);
}

.control-btn.is-playing {
  border-color: rgba(255, 60, 60, 0.6);
  color: rgba(255, 80, 80, 0.9);
}

/* list base */
.song-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* item = SEES-style selectable row */
.song-list li {
  position: relative;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 10px;

  cursor: pointer;

  color: rgba(210, 230, 255, 0.7);

  border-left: 2px solid transparent;

  transition: all 0.15s ease;
}

/* angled highlight strip (Persona feel) */
.song-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  width: 2px;
  background: transparent;
}

/* hover = scanline glow */
.song-list li:hover {
  background: rgba(0, 180, 255, 0.08);
  color: #eaf4ff;
  transform: translateX(4px);
}

/* active = strong UI lock-in */
.song-list li.active {
  background: linear-gradient(
    90deg,
    rgba(0, 180, 255, 0.18),
    transparent
  );

  color: #ffffff;

  border-left: 2px solid #00c8ff;

  text-shadow: 0 0 8px rgba(0, 200, 255, 0.4);
}

/* number style = terminal index */
.track-num {
  font-size: 0.7rem;
  opacity: 0.5;
  width: 26px;
  color: rgba(0, 200, 255, 0.6);
}

/* title = sharper, tech feel */
.track-title {
  font-size: 0.82rem;
  letter-spacing: 0.3px;
}

/* subtle flicker for active (Persona UI vibe) */
.song-list li.active {
  animation: personaFlicker 2.5s infinite;
}

@keyframes personaFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}

/* --- UPGRADED PREMIUM FADE-SLIDE TRANSITION --- */
.fade-slide-enter-active {
  transition: opacity 0.4s ease-out, 
              transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.125);
}

.fade-slide-leave-active {
  transition: opacity 0.25s ease-in, 
              transform 0.25s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

/* --- Consolidated Media Breakpoints --- */
@media (max-width: 768px) {
  .album-widget {
    right: 60px;
    top: 20px;
  }
  .album-container { --size: 150px; }
  .song-list-panel { width: 220px; }
}

@media (max-width: 480px) {
  .album-widget {
    right: 40px;
    top: 20px;
  }
  .album-container { --size: 120px; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>