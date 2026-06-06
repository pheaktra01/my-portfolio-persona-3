<template>
  <div class="profile-page">

    <!-- BACKGROUND VIDEO -->
    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/profile.jpg"
      preload="metadata"
    ></video>

    <!-- DARK OVERLAY -->
    <div class="overlay"></div>

    <BackBtn />
    <IntroSlash />

    <!-- PANEL -->
    <div class="panel">

      <!-- HEADER -->
      <header class="top">
        <div class="status">PERSONAL DATA</div>
        <h1>PROFILE</h1>
        <p class="subtitle">USER STATUS FILE</p>
      </header>

      <!-- PROFILE CARD -->
      <section class="card hero">

        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <img src="../assets/images/e20220993.png" class="avatar" />
        </div>

        <div class="info">
          <h2>YAGAMI DEVILATHAN</h2>
          <p class="role">STUDENT / DEVELOPER</p>

          <div class="level">
            LEVEL <span>22</span>
          </div>
        </div>

      </section>

      <!-- INFO GRID -->
      <div class="grid">

        <div class="card">
          <h3>ABOUT</h3>
          <p>
            Passionate developer focused on Vue, NestJS, and mobile development.
            Building Persona-style UI systems and modern web apps.
          </p>
        </div>

        <div class="card">
          <h3>LOCATION</h3>
          <p>Phnom Penh, Cambodia</p>
        </div>

        <div class="card">
          <h3>STATUS</h3>
          <p>Active Developer</p>
        </div>

        <div class="card">
          <h3>FOCUS</h3>
          <p>Frontend UI / Backend API / Game-like UI systems</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

onMounted(() => {
  setVideo(videos.profile)
})

onBeforeUnmount(() => {
  clearVideo()
})

onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
})
</script>

<style scoped>

/* PAGE */
.profile-page {
  height: 100vh;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
  overflow: hidden;
}

/* BACKGROUND VIDEO */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
}

/* PANEL */
.panel {
  position: fixed;
  left: 0;
  top: 60px;

  width: 42%;
  height: calc(100vh - 60px);

  padding: 40px;
  padding-bottom: 120px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;

  box-sizing: border-box;

  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.panel::-webkit-scrollbar {
  display: none;
}

/* HEADER */
.top h1 {
  font-size: 4.5rem;
  margin: 0;
  transform: skewX(-10deg);
}

.status {
  color: #ff2e63;
  letter-spacing: 4px;
}

.subtitle {
  opacity: 0.7;
}

/* HERO CARD */
.hero {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

/* AVATAR */
.avatar-wrap {
  position: relative;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border: 2px solid #ff2e63;
  animation: spin 10s linear infinite;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

/* INFO */
.info h2 {
  margin: 0;
  font-size: 1.8rem;
}

.role {
  opacity: 0.8;
}

.level {
  margin-top: 10px;
  background: #ff2e63;
  padding: 6px 12px;
  display: inline-block;
  font-weight: bold;
}

/* GRID */
.grid {
  margin-top: 20px;
  display: grid;
  gap: 16px;
}

/* CARD */
.card {
  background: #0d0f1a;
  border: 2px solid #1a1d2e;
  padding: 16px;
  transform: skewX(-6deg);
  position: relative;
  overflow: hidden;
}

/* red slash */
.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #ff2e63;
}

/* TEXT */
.card h3 {
  margin: 0 0 8px 0;
  color: #ff2e63;
}

.card p {
  font-size: 0.9rem;
  opacity: 0.85;
}

/* ===== ANIMATION ===== */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.panel {
  animation: panelEnter 0.6s ease-out forwards;
}

@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateX(-80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.top {
  opacity: 0;
  animation: headerEnter 0.5s ease-out forwards;
  animation-delay: 0.15s;
}

@keyframes headerEnter {
  from {
    opacity: 0;
    transform: translateX(-40px) skewX(-10deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-10deg);
  }
}

.hero {
  opacity: 0;
  animation: heroEnter 0.55s ease-out forwards;
  animation-delay: 0.25s;
}

@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card {
  opacity: 0;
  animation: cardEnter 0.4s ease-out forwards;
}

/* stagger timing */
.grid .card:nth-child(1) { animation-delay: 0.35s; }
.grid .card:nth-child(2) { animation-delay: 0.45s; }
.grid .card:nth-child(3) { animation-delay: 0.55s; }
.grid .card:nth-child(4) { animation-delay: 0.65s; }

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(-50px) skewX(-6deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-6deg);
  }
}

.card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: skewX(-6deg) translateX(6px) scale(1.01);
  border-color: #ff2e63;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  .profile-page {
    overflow: auto;
  }

  .panel {
    width: 90%;
    left: 50%;
    top: 60px;

    height: calc(100vh - 80px);

    padding: 20px;
    padding-bottom: 120px;

    overflow-y: auto;
    overflow-x: hidden;

    transform: translateX(-50%);

    box-sizing: border-box;

    -webkit-overflow-scrolling: touch;

    animation: panelEnterMobile 0.6s ease-out forwards;
  }

  @keyframes panelEnterMobile {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* HEADER */
  .top h1 {
    font-size: 2.7rem;
  }

  .status {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  /* HERO */
  .hero {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .avatar {
    width: 90px;
    height: 90px;
  }

  .info h2 {
    font-size: 1.3rem;
  }

  .role {
    font-size: 0.85rem;
  }

  .level {
    font-size: 0.8rem;
  }

  /* GRID */
  .grid {
    gap: 12px;
  }

  .card {
    padding: 14px;
  }

  .card h3 {
    font-size: 1rem;
  }

  .card p {
    font-size: 0.8rem;
  }
}
</style>