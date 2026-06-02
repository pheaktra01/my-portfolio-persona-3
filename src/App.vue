<script setup lang="ts">
import { onMounted } from 'vue'
import { useAudioStore } from './stores/audio'
import musicSrc from './assets/musics/Color-Your-Night.mp3'

const audio = useAudioStore()

onMounted(() => {
  audio.init(musicSrc)
})
</script>

<template>
  <router-view />

  <!-- GLOBAL Persona-style mute button -->
  <button class="mute-btn persona-mute" @click="audio.toggleMute">
    <span v-if="audio.muted">
      <!-- Muted icon -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M11 5L6 9H3v6h3l5 4V5z" />
        <path d="M16 9l4 4M20 9l-4 4" />
      </svg>
    </span>

    <span v-else>
      <!-- Unmuted icon -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M11 5L6 9H3v6h3l5 4V5z" />
        <path d="M15 9a4 4 0 010 6" />
        <path d="M17.5 7a7 7 0 010 10" />
      </svg>
    </span>
  </button>
</template>

<style setup>
.mute-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 999;

  width: 44px;
  height: 44px;

  border: none;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.6);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: transform 0.15s ease, background 0.2s ease;
}

/* Persona-style hover */
.mute-btn:hover {
  transform: scale(1.1) rotate(-3deg);
  background: rgba(0, 212, 255, 0.25);
}

.mute-btn svg {
  width: 20px;
  height: 20px;
  color: white;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}
</style>