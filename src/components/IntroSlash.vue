<template>
  <div v-if="show" class="p3-container">
    <div class="slash-layer primary"></div>
    <div class="slash-layer secondary"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, 700)
})
</script>

<style scoped>
.p3-container {
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
  background-color: #f7e600; /* Iconic P3 Yellow */
  animation: p3-slash 0.6s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  left: -150%;
}

.secondary {
  background-color: #000;
  animation: p3-slash 0.7s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  left: -160%; /* Slightly offset to create a "border" effect */
  mix-blend-mode: multiply;
}

@keyframes p3-slash {
  0% { left: -150%; }
  100% { left: 100%; }
}
</style>