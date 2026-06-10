<template>
  <button
    class="p3r-back-anchor"
    :class="{ 'is-leaving': leaving, 'is-hovered': hovered }"
    @click="goBack"
    @pointerenter="onBackHover"
    @pointerleave="onBackLeave"
  >
    <!-- JAGGED VELOCITY HOVER ACCENT PLATE -->
    <div class="back-shard-plate">
      <div class="shard-glitch-line"></div>
    </div>

    <!-- DOUBLE-LAYERED HIGH-CONTRAST TYPOGRAPHY FRAME -->
    <div class="back-text-frame">
      <span class="text-layer shadow-layer">RETURN // BACK</span>
      <span class="text-layer main-layer">RETURN // BACK</span>
    </div>

    <!-- PERIPHERAL HUD METADATA DECORATOR -->
    <span class="back-telemetry-tag">SYS_ESC_00</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { playHover, playClick } from '../utils/sound'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(false)
const leaving = ref(false)
const hovered = ref(false)

const emit = defineEmits(['finished'])

function goBack() {
  playClick()
  leaving.value = true

  setTimeout(() => {
    router.push('/')
  }, 500)
  
  emit('finished')
}

function onBackHover() {
  hovered.value = true
  playHover(isMobile.value)
}

function onBackLeave() {
  hovered.value = false
}
</script>

<style scoped>
/* ================= PERSONA 3 RELOAD BACK ANCHOR ================= */
.p3r-back-anchor {
  all: unset;
  position: fixed;
  top: 30px;
  left: 4%;
  z-index: 9999;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 8px 32px 8px 16px;
  box-sizing: border-box;
  overflow: visible;

  /* Entry animation matching index initialization */
  opacity: 0;
  animation: p3rBackAnchorIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.1s;
}

@keyframes p3rBackAnchorIn {
  from {
    opacity: 0;
    transform: translateX(-40px) skewX(-8deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-8deg);
  }
}

/* HIGH-VELOCITY JAGGED SHARD ACCENT BACKGROUND */
.back-shard-plate {
  position: absolute;
  inset: 0;
  background: #ff0055; /* Core P3R Accent Magenta */
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
  
  /* Hidden by default, snaps open from left on hover */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -6px 6px 0px #040814;
}

.shard-glitch-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #00d2ff; /* Electric blue edge highlight */
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* TYPOGRAPHY FRAMING STRUCTURE */
.back-text-frame {
  position: relative;
  height: 2rem;
  display: flex;
  align-items: center;
}

.text-layer {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  display: block;
  transition: color 0.18s ease, transform 0.18s ease;
}

/* Layer A: Velvet Midnight Shadow Offset */
.text-layer.shadow-layer {
  color: #040814;
  z-index: 2;
  transform: skewX(-4deg) translate(3px, 2px);
}

/* Layer B: Main High-Contrast Foreground Core */
.text-layer.main-layer {
  color: #a6f2ff; /* Signature Ice Blue */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  transform: skewX(-4deg);
}

/* PERIPHERAL TECH META LABELS */
.back-telemetry-tag {
  position: absolute;
  right: -8px;
  top: -2px;
  font-family: monospace;
  font-size: 0.55rem;
  font-weight: bold;
  color: rgba(0, 210, 255, 0.4);
  letter-spacing: 1px;
  z-index: 4;
  transform: skewX(4deg);
  transition: color 0.2s ease;
}

/* ================= HOVER REACTION ARCHITECTURE ================= */
.p3r-back-anchor.is-hovered {
  transform: scale(1.05) skewX(-8deg);
}

.p3r-back-anchor.is-hovered .back-shard-plate {
  transform: scaleX(1);
}

.p3r-back-anchor.is-hovered .shard-glitch-line {
  opacity: 1;
}

.p3r-back-anchor.is-hovered .text-layer.main-layer {
  color: #ffffff;
  transform: skewX(-8deg) translate(-4px, -2px);
  text-shadow: 2px 2px 0px #040814;
}

.p3r-back-anchor.is-hovered .text-layer.shadow-layer {
  color: #000000;
  transform: skewX(-8deg) translate(2px, 1px);
}

.p3r-back-anchor.is-hovered .back-telemetry-tag {
  color: #ffffff;
}

/* ================= TRANSITION OUTRO JOLT ================= */
.p3r-back-anchor.is-leaving {
  animation: p3rBackAnchorExit 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes p3rBackAnchorExit {
  to {
    opacity: 0;
    transform: translateX(-60px) skewX(-12deg) scale(0.9);
    filter: blur(4px);
  }
}

/* ================= PORTABLE MOBILE MATRIX BREAKPOINTS ================= */
@media (max-width: 767px) {
  .p3r-back-anchor {
    top: 15px;
    left: 15px;
    padding: 6px 20px 6px 12px;
  }

  .back-shard-plate {
    transform: scaleX(1); /* Keep the background block rendered natively for readability */
    background: linear-gradient(90deg, #0d1730 0%, #ff0055 100%);
    clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
  }

  .text-layer {
    font-size: 1.15rem;
  }

  .text-layer.main-layer {
    color: #ffffff;
  }

  .back-text-frame {
    height: 1.4rem;
  }

  .back-telemetry-tag {
    display: none; /* Cull micro tracking layouts to maximize screen space */
  }
}
</style>