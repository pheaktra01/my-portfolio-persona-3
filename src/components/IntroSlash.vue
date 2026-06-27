<template>
  <div class="page-wrapper">
    <!-- Your main website content goes here -->
    <slot />

    <!-- Transition overlay -->
    <Transition name="fade">
      <div v-if="show" class="p3r-container">
        <div class="slash-layer secondary"></div>
        <div class="slash-layer primary"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  // Wait for the animation to finish before removing the overlay
  setTimeout(() => {
    show.value = false
  }, 1200) // Match this to your CSS duration
})
</script>

<style scoped>
.p3r-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none; /* Allows clicking through if needed */
  overflow: hidden;
}

.slash-layer {
  position: absolute;
  top: -10vh;
  height: 120vh;
  width: 150vw;
  transform: skewX(-20deg);
  will-change: transform;
}

.primary {
  background-color: #00f2ff;
  /* Animates across the screen */
  animation: p3r-slash 1.2s cubic-bezier(0.86, 0, 0.07, 1) forwards;
}

.secondary {
  background-color: #050505;
  /* Slightly delayed to create the "closing" effect */
  animation: p3r-slash 1.2s cubic-bezier(0.86, 0, 0.07, 1) 0.1s forwards;
}

@keyframes p3r-slash {
  0% { transform: skewX(-20deg) translateX(-150vw); }
  /* Ending at 100vw ensures it completely clears the screen to the right */
  100% { transform: skewX(-20deg) translateX(150vw); }
}

/* The fade out makes the transition look elegant */
.fade-leave-active { 
  transition: opacity 0.5s ease; 
}
.fade-leave-to { 
  opacity: 0; 
}
</style>