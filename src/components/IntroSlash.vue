<template>
    <div class="intro-slash"></div>
</template>

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

  z-index: 999;

  animation: slashEnter .7s ease-out forwards;
}

@keyframes slashEnter {
  from {
    left: -120%;
  }

  to {
    left: 120%;
  }
}

/* transition slash */
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
  animation: slashExit .10s ease forwards;
}

@keyframes slashExit {
  from {
    left: -150%;
  }

  to {
    left: 150%;
  }
}
</style>