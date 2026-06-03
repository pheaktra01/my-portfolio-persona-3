<template>
    <div v-if="show" class="intro-slash"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, 700) // match animation duration
})
</script>

<style scoped>
/* ===== INTRO SLASH ===== */
.intro-slash {
  position: fixed;
  left: -120%;
  top: 0;

  width: 120%;
  height: 100vh;

  background: #ff2e63;

  transform: skewX(-20deg);

  z-index: 9999;

  animation: slashEnter 0.7s ease-out forwards;
  pointer-events: none;
}

@keyframes slashEnter {
  from {
    left: -120%;
  }

  to {
    left: 120%;
  }
}

/* ===== TRANSITION SLASH ===== */
.transition-slash {
  position: fixed;
  top: 0;
  left: -150%;

  width: 150%;
  height: 100vh;

  background: #ff2e63;

  transform: skewX(-25deg);

  z-index: 9999;

  pointer-events: none;
}

.transition-slash.active {
  animation: slashExit 0.7s ease forwards;
}

@keyframes slashExit {
  from {
    left: -150%;
  }

  to {
    left: 150%;
  }
}

/* ================= RESPONSIVE FIX ================= */

/* TABLET */
@media (max-width: 1024px) {
  .intro-slash {
    transform: skewX(-18deg);
  }

  .transition-slash {
    transform: skewX(-20deg);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .intro-slash {
    transform: skewX(-12deg);
    width: 140%;
  }

  .transition-slash {
    transform: skewX(-15deg);
    width: 160%;
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .intro-slash {
    transform: skewX(-10deg);
    width: 160%;
  }

  .transition-slash {
    transform: skewX(-12deg);
    width: 180%;
  }
}
</style>