<template>
    <button
        class="back-btn"
        @click="goBack"
        @pointerenter="onBackHover"
        >
        <div class="btn-bg-slash"></div>

        <span class="text-layer shadow">BACK</span>
        <span class="text-layer main">BACK</span>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { playHover, playClick } from '../utils/sound'
import { useRouter } from 'vue-router'

const router = useRouter()

const isMobile = ref(false)

const leaving = ref(false)

function goBack() {
  playClick()
  

  leaving.value = true

  setTimeout(() => {
    router.push('/')
  }, 500)
  
  emit('finished')
}

function onBackHover() {
  playHover(isMobile.value)
}

const emit = defineEmits(['finished'])
</script>

<style scoped>
/* ================= PERSONA BACK BUTTON ================= */
.back-btn {
  position: fixed;
  top: 20px;
  left: 40px;
  z-index: 9999;

  background: transparent;
  border: none;
  cursor: pointer;

  padding: 10px 18px;

  font-family: 'Impact', 'Arial Black', sans-serif;
  font-style: italic;
  letter-spacing: 2px;
  font-size: 24px;

  transform: skewX(-10deg);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.15s ease;
}

/* hover like Persona menu */
.back-btn:hover {
  transform: skewX(-10deg) scale(1.08);
}

/* slash background (same style as home buttons) */
.btn-bg-slash {
  position: absolute;
  inset: 0;
  background: #ff4a73;
  z-index: 1;

  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  transform: scaleX(1);
}

/* text layers */
.text-layer {
  position: relative;
  z-index: 2;
  display: inline-block;
}

/* shadow */
.text-layer.shadow {
  position: absolute;
  color: black;
  transform: translate(3px, 2px) skewX(-10deg);
}

/* main */
.text-layer.main {
  color: #61e1ff;
  transform: skewX(-10deg);
}

/* hover animation (Persona feel) */
.back-btn:hover .text-layer.main {
  color: white;
  transform: skewX(-12deg) translate(-2px, -2px);
}

.back-btn:hover .text-layer.shadow {
  transform: skewX(-12deg) translate(4px, 3px);
}

.back-btn {
  animation: backIn 0.4s ease-out;
}

@keyframes backIn {
  from { opacity: 0; transform: translateX(-20px) skewX(-10deg); }
  to { opacity: 1; transform: translateX(0) skewX(-10deg); }
} 
</style>