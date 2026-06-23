<template>
  <div v-if="show" class="p3r-container">
    <div class="slash-layer primary"></div>
    <div class="slash-layer secondary"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  // Extended to 1.5s to match the animation duration
  setTimeout(() => {
    show.value = false
  }, 1500)
})
</script>

<style scoped>
.p3r-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.slash-layer {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 150vw;
  transform: skewX(-20deg);
}

.primary {
  background-color: #00f2ff; 
  /* 1.5s duration */
  animation: p3r-slash 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  left: -150%;
}

.secondary {
  background-color: #050505;
  /* 1.8s duration to trail slightly behind the primary */
  animation: p3r-slash 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  left: -160%; 
  z-index: -1;
}

@keyframes p3r-slash {
  0% { left: -150%; }
  100% { left: 100%; }
}
</style>