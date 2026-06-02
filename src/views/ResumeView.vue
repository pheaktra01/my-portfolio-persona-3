<template>
  <div class="resume-page">

    <video
      class="bg-video"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
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
            <h3>Information Technology</h3>
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

          <a
            href="/resume.pdf"
            target="_blank"
            class="download-btn"
          >
            DOWNLOAD CV
          </a>
        </section>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import videoSrc from '../assets/videos/persona-p3-resume.mp4'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
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
  height: 100vh;

  padding: 40px;

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 2;
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
.download-btn {
  display: inline-block;

  padding: 10px 18px;

  border: 2px solid #ff2e63;

  color: white;
  text-decoration: none;

  transition: .2s;
}

.download-btn:hover {
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
</style>