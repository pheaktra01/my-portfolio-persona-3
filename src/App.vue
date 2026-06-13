<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAudioStore } from './stores/audio'
import Albums from './components/Albums.vue'
import { useVideoManager } from "./composables/useVideoManager"

const audioStore = useAudioStore()

onMounted(() => {
  audioStore.init(
    new URL('', import.meta.url).href
  )

  audioStore.play()
})

const { currentVideo } = useVideoManager()

const currentVideoSrc = computed(() => currentVideo.value)
</script>

<template>
  <video :src="currentVideoSrc" class="bg-video" />

  <router-view />

  <Albums />
</template>

<style setup>

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
  overflow: hidden;
}
</style>