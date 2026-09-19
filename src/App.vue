<script setup lang="ts">
import { onMounted } from 'vue'
import { useAudioStore } from './stores/audio'
import Albums from './components/Albums.vue'

const audioStore = useAudioStore()

onMounted(() => {
  // Only initialize audio store if needed
  audioStore.play()
})
</script>

<template>
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

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background: #030712;
}

#app {
  width: 100%;
  height: 100%;
}
</style>