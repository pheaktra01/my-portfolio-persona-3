<template>
  <div class="resume-page">

    <video
      class="bg-video"
      :src="currentVideo"
      autoplay
      loop
      muted
      playsinline
      poster="../assets/images/resume.jpg"
      preload="metadata"
    ></video>

    <div class="overlay"></div>

    <IntroSlash />
    <BackBtn />

    <div class="panel " ref="panelRef">

      <header class="top">
        <div class="status">PERSONAL DATA</div>
        <h1>RESUME</h1>
        <p class="subtitle">PLAYER INFORMATION</p>
      </header>

      <div class="grid">

        <!-- BASIC INFO -->
        <section class="card">
          <div class="title">IDENTITY</div>

          <div class="row">
            <span>NAME</span>
            <span>YAGAMI DEVILATHAN</span>
          </div>

          <div class="row">
            <span>ROLE</span>
            <span>FULL STACK DEVELOPER</span>
          </div>

          <div class="row">
            <span>LEVEL</span>
            <span>22</span>
          </div>
        </section>

        <!-- EDUCATION -->
        <section class="card">
          <div class="title">EDUCATION</div>

          <div class="entry">
            <h3>Computer Science</h3>
            <p>University Student</p>
          </div>
        </section>

        <!-- SKILLS -->
        <section class="card">
          <div class="title">MAIN SKILLS</div>

          <div class="tags">
            <span>Vue</span>
            <span>NestJS</span>
            <span>Flutter</span>
            <span>MongoDB</span>
            <span>Docker</span>
            <span>Azure</span>
          </div>
        </section>

        <!-- DOWNLOAD -->
        <section class="card">
          <div class="title">DOCUMENT</div>

          <button class="downloadCV" @click="downloadCV">
            DOWNLOAD CV
          </button>

          <a :href="cvFile" target="_blank" class="downloadCV view">
            VIEW CV
          </a>

          <div v-if="slashActive" class="transition-slash"></div>
        </section>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'
import cvFile from "../assets/files/LoengPheaktra_DevOps_CV.pdf"

const { setVideo, clearVideo, currentVideo } = useVideoManager()


const slashActive = ref(false)

const downloadCV = () => {
  slashActive.value = true

  setTimeout(() => {
    const link = document.createElement("a")
    link.href = cvFile
    link.download = "Yagami-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    slashActive.value = false
  }, 450) // match animation duration
}

onMounted(() => {
  setVideo(videos.resume)
})

onBeforeUnmount(() => {
  clearVideo()
})

onMounted(() => {
//   isMobile.value = window.innerWidth <= 768

  // videoSrc.value = new URL(
  //   '../assets/videos/persona-p3-resume.mp4',
  //   import.meta.url
  // ).href

//   mobileVideoSrc.value = new URL(
//     '../assets/videos/MOBILE-Makoto-Yuki-Persona-3.mp4',
//     import.meta.url
//   ).href
})
</script>

<style scoped>

.resume-page {
  height: 100vh;
  overflow: hidden;
  font-family: Impact, Arial Black, sans-serif;
  color: white;
}

/* VIDEO */
.bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
}

/* PANEL */
.panel {
  position: fixed;
  left: 0;
  top: 60px;

  width: 42%;
  height: calc(100vh - 60px);

  padding: 40px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;
}

/* ================= SCROLL FIX ================= */
.panel {
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 120px;

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
  opacity: .7;
}

/* GRID */
.grid {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* CARD */
.card {
  background: #0d0f1a;
  border: 2px solid #1a1d2e;

  padding: 20px;

  transform: skewX(-6deg);
}

.title {
  color: #ff2e63;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

/* ROWS */
.row {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
}

/* EDUCATION */
.entry h3 {
  margin: 0;
}

.entry p {
  opacity: .8;
}

/* TAGS */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags span {
  background: #ff2e63;
  padding: 6px 10px;
  font-size: .75rem;
  transform: skewX(-10deg);
}

/* BUTTON */
.downloadCV,
button.downloadCV,
a.downloadCV {
  all: unset;
  display: inline-flex;

  align-items: center;
  justify-content: center;

  font-family: Impact, Arial Black, sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;

  color: white;

  border: 2px solid #ff2e63;
  padding: 10px 18px;
  margin-top: 10px;
  margin-right: 10px;

  cursor: pointer;

  box-sizing: border-box;
}

.downloadCV:hover {
  background: #ff2e63;
}

/* =============== ANIMETION ================= */
.panel {
  animation: panelEnter 0.5s ease-out forwards;
}

@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.top {
  opacity: 0;
  animation: titleEnter 0.5s ease-out forwards;
  animation-delay: 0.2s;
}

@keyframes titleEnter {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card {
  opacity: 0;
  animation: cardEnter 0.4s ease-out forwards;
}

.card:nth-child(1) { animation-delay: .3s; }
.card:nth-child(2) { animation-delay: .4s; }
.card:nth-child(3) { animation-delay: .5s; }
.card:nth-child(4) { animation-delay: .6s; }
.card:nth-child(5) { animation-delay: .7s; }

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== outro animation ===== */
.panel.exit {
  animation: panelExit .35s ease forwards;
}

.transition-slash {
  position: fixed;
  top: 0;
  left: -120%;

  width: 120%;
  height: 100vh;

  background: #ff2e63;

  transform: skewX(-20deg);

  z-index: 9999;

  animation: slashOut .45s ease forwards;
}

@keyframes panelExit {
  to {
    opacity: 0;
    transform: translateX(-80px);
  }
}

@keyframes slashOut {
  to {
    left: 120%;
  }
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  .resume-page {
    overflow: hidden;
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

    /* override desktop animation */
    animation: panelEnterMobile 0.5s ease-out forwards;
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
    font-size: 2.8rem;
    line-height: 1;
  }

  .status {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  /* CARD */
  .card {
    padding: 14px;
  }

  .title {
    font-size: 0.9rem;
  }

  /* ROWS */
  .row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  /* TAGS */
  .tags span {
    font-size: 0.65rem;
    padding: 4px 8px;
  }

  /* BUTTON */
  .downloadCV,
  button.downloadCV,
  a.downloadCV {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 768px;

  padding: 10px 18px;

  border: 2px solid #ff2e63;
  color: white;
  text-decoration: none;

  transition: 0.2s;

  box-sizing: border-box;
}
}
</style>