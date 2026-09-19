<script setup lang="ts">
import { onMounted } from 'vue'
import { useAudioStore } from './stores/audio'
import Albums from './components/Albums.vue'
import P3RHud from './components/P3RHud.vue'

const audioStore = useAudioStore()

onMounted(() => {
  audioStore.play()
})
</script>

<template>
  <!-- GLOBAL P3R CALENDAR / MOON PHASE HUD -->
  <P3RHud />

  <router-view v-slot="{ Component }">
    <transition name="p3r-page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <Albums />
</template>

<style>
/* Smooth page transition */
.p3r-page-enter-active,
.p3r-page-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.p3r-page-enter-from,
.p3r-page-leave-to {
  opacity: 0;
}

/* Authentic Persona 3 Reload Custom Reticle Cursors */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background: #030712;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpolygon points='2,2 2,18 7,13 11,22 14,20 10,12 17,12' fill='%2300d2ff' stroke='%23040814' stroke-width='1.5'/%3E%3C/svg%3E"), auto;
}

button, a, .clickable, .persona-btn, .p3r-list-card, .p3r-shard-card, .p3r-social-card, .p3r-status-card {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpolygon points='2,2 2,18 7,13 11,22 14,20 10,12 17,12' fill='%23ff0055' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E"), pointer !important;
}

#app {
  width: 100%;
  height: 100%;
}
</style>