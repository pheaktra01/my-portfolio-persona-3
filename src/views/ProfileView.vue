<template>
  <div class="profile-page p3r-theme">
    <BackBtn />
    <IntroSlash />
    <div v-if="showSlash" class="page-slash-enter"></div>

    <div class="bg-layer-container">
        <div 
          class="bg-fallback-image"
          :class="{ 'video-is-active': isVideoLoaded }"
        ></div>

        <video
          class="bg-video"
          :class="{ 'video-ready': isVideoLoaded }"
          :src="currentVideo"
          autoplay
          loop
          muted
          playsinline
          @playing="handleVideoPlaying"
        ></video>
      </div>
    
    <div class="overlay"></div>
    <div class="giant-bg-text">P3R_SYS_2026</div>

    <div class="panel" :class="{ enter: pageReady }">
      
      <header class="top-header">
        <div class="status-ribbon"><span>SYSTEM LOADOUT ACTIVE</span></div>
        <div class="title-wrap">
          <h1 class="main-title" data-text="PROFILE">PROFILE</h1>
        </div>
        <p class="subtitle">// USER_LOADOUT_STATUS_FILE</p>
      </header>

      <div class="grid">
        
        <section 
          class="p3r-card profile-card clickable" 
          :style="{ '--i': 1 }"
          @click="onClick"
          @pointerenter="onHoverCard"
        >
          <div class="avatar-container">
            <div class="avatar-bracket-tl"></div>
            <div class="avatar-bracket-br"></div>
            <div class="avatar-skew-bg"></div>
            <img src="../assets/images/e20220993.png" class="avatar-img" alt="Avatar" />
          </div>

          <div class="profile-info">
            <div class="meta-crumbs">SYS_LINK // OPERATOR</div>
            <h2 class="user-name">LOENG PHEAKTRA</h2>
            <p class="user-role">COMPUTER SCIENCE STUDENT</p>
            <p class="user-role">> Student of Institute of Technology of Cambodia (ITC) majoring in Computer Science and Engineering.</p>

            <div class="level-badge">
              <span class="lbl">LV</span>
              <span class="val">0</span>
            </div>
            <div class="click-prompt">TAP FOR DEEPER METADATA</div>
          </div>
        </section>

        <section class="p3r-card skills-card" :style="{ '--i': 2 }">
          <div class="card-header">
            <span class="card-icon">◆</span>
            <h3 class="card-title">TECHNICAL RADAR</h3>
          </div>

          <div class="skills-list">
            <div v-for="s in skills" :key="s.name" class="skill-row">
              <div class="skill-meta">
                <span class="skill-name">{{ s.name }}</span>
                <span class="skill-val">{{ s.level }}<small>%</small></span>
              </div>
              <div class="p3r-bar-bg">
                <div class="p3r-bar-fill" :style="{ width: s.level + '%' }">
                  <div class="bar-glare"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="p3r-card tags-card" :style="{ '--i': 3 }">
          <div class="card-header">
            <span class="card-icon">◆</span>
            <h3 class="card-title">SPECIALIZATION LOADOUT</h3>
          </div>
          <h3 class="card-title">DevOps / Deployment</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Docker Container</span>
            <span class="p3r-tag">Kubernetes</span>
            <span class="p3r-tag">Nginx</span>
            <span class="p3r-tag">GitHub Actions</span>
            <span class="p3r-tag">Jenkins</span>
            <span class="p3r-tag">Ansible</span>
            <span class="p3r-tag">Terraform(learning)</span>
            <span class="p3r-tag">Load Balancing</span>
            <span class="p3r-tag">AWS / Cloudflare / Vercel / Netlify</span>
          </div>
          <h3 class="card-title">Frontend Stack</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">HTML / CSS / JavaScript</span>
            <span class="p3r-tag">TypeScript</span>
            <span class="p3r-tag">Vue</span>
            <span class="p3r-tag">Tailwind CSS</span>
          </div>
          <h3 class="card-title">Backend Stack</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Node.js</span>
            <span class="p3r-tag">Java (Spring Boot)</span>
            <span class="p3r-tag">REST API / GraphQL</span>
          </div>
          <h3 class="card-title">Database</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">MySQL</span>
            <span class="p3r-tag">MongoDB</span>
          </div>
          <h3 class="card-title">Tools & Development Environment</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Git / GitHub</span>
            <span class="p3r-tag">VS Code</span>
            <span class="p3r-tag">Postman / API Dog</span>
            <span class="p3r-tag">Figma</span>
            <span class="p3r-tag">Linux (Ubuntu) / Bash</span>
          </div>
          <h3 class="card-title">Mobile</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Flutter</span>
            <span class="p3r-tag">Dart</span>
          </div>
          <h3 class="card-title">Programming Languages</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Java</span>
            <span class="p3r-tag">C / C++</span>
          </div>
          <h3 class="card-title">Game Engine</h3>
          <div class="tag-cloud">
            <span class="p3r-tag">Godot Engine</span>
          </div>
        </section>

        <section class="p3r-card xp-card" :style="{ '--i': 4 }">
          <div class="xp-meta">
            <span class="xp-lbl">EXP COMPILER</span>
            <span class="xp-val">200 / 10000 NEXT</span>
          </div>
          <div class="p3r-bar-bg xp">
            <div class="p3r-bar-fill xp-fill" style="width: 2%"></div>
          </div>
        </section>

      </div>
    </div>

    <Transition name="p3r-modal">
      <div class="modal-backdrop" v-if="isProfileOpen" @click.self="closeProfileModal">
        <div class="p3r-modal-window">
          <button class="p3r-close-btn" @click="onClickClose" @pointerenter="onHover">
            <span>CLOSE ▲</span>
          </button>

          <div class="modal-layout">
            <div class="modal-portrait-deck">
              <div class="portrait-frame">
                <div class="scanlines"></div>
                <div class="frame-border-decor"></div>
                <img src="../assets/images/e20220993.png" class="modal-img" alt="Detail Portrait" />
                <div class="hud-tag">ID_FILE // CORE_AVATAR</div>
              </div>
            </div>

            <div class="modal-info-deck">
              <header class="modal-info-header">
                <div class="category-pill">OPERATOR_PROFILE</div>
                <h2 class="modal-name">LOENG PHEAKTRA</h2>
                <div class="sub-labels">
                  <span class="cyan-txt">@loengpheaktra</span>
                  <span class="magenta-txt">// STATUS: ACTIVE</span>
                </div>
              </header>

              <div class="modal-info-body">
                <h3 class="body-title">CORE DESCRIPTION</h3>
                <p class="body-desc">
                  I am a year 4 students of Institute of Technology of Cambodia (ITC) majoring in Computer Science and Engineering. I have a strong passion for technology and programming, and I am constantly seeking to expand my knowledge and skills in the field. My goal is to become a proficient DevOps engineer and contribute to innovative projects that make a positive impact on society.
                </p>
              </div>

              <footer class="modal-info-footer">
                <div class="status-code">SYS_STATUS_OK // DATA_VERIFIED</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BackBtn from '../components/BackBtn.vue'
import IntroSlash from '../components/IntroSlash.vue'
import { videos } from '../config/videos'
import { useVideoManager } from '../composables/useVideoManager.ts'
import { playHover, playSwitchToggle, playClick } from '../utils/sound.ts'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

const skills = [
  { name: 'GitHub', level: 80 },
  { name: 'Vue.js', level: 80 },
  { name: 'MySQL', level: 70 },
  { name: 'Figma', level: 70 },
  { name: 'Java (Springboot)', level: 60 },
  { name: 'Jenkins', level: 60 },
  { name: 'Git Action', level: 60 },
  { name: 'Docker', level: 60 },
  { name: 'Nest JS', level: 60 },
  { name: 'Nginx', level: 50 },
  { name: 'MongoDB', level: 40 },
  { name: 'Kubernetes', level: 40 },
  { name: 'AWS (EC2)', level: 20 },
]

const pageReady = ref(false)
const showSlash = ref(true)
const isProfileOpen = ref(false)
const isVideoLoaded = ref(false)

const handleVideoPlaying = () => {
  isVideoLoaded.value = true
}

function onClick(){
  openProfileModal()
  playClick()
}

function onClickClose(){
  closeProfileModal()
  playClick()
}

function onHoverCard(){
  playSwitchToggle()
}

function onHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

onMounted(() => {
  const isMobile = window.innerWidth <= 868

  if (!isMobile) {
    setVideo(videos.profile)
  }

  requestAnimationFrame(() => {
    pageReady.value = true
  })

  setTimeout(() => {
    showSlash.value = false
  }, 650)
})

onBeforeUnmount(() => {
  clearVideo()
})

const openProfileModal = () => { isProfileOpen.value = true }
const closeProfileModal = () => { isProfileOpen.value = false }
</script>

<style scoped>
/* ================= SYSTEM & THEME CONFIG ================= */
.p3r-theme {
  --p3r-blue: #00d2ff;
  --p3r-dark-blue: #0f1c3f;
  --p3r-deep-bg: #030712;
  --p3r-magenta: #ff0055;
  --p3r-white: #ffffff;
  --p3r-font: 'Impact', 'Arial Black', sans-serif;

  font-family: var(--p3r-font);
  color: var(--p3r-white);
  background-color: var(--p3r-deep-bg);

  min-height: 100vh;
  height: 100vh;
  position: relative;
  overflow: hidden; /* Lock the global viewport to prevent background shifting */
}

/* New Parent Container */
.bg-layer-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: var(--p3r-deep-bg); /* Match your theme */
}

/* HIGH-INTEGRITY VISUAL LAYER HANDLING */
.overlay, .giant-bg-text {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Crucial: Allows finger touch events to pass cleanly to the panel */
  z-index: 0;
}

.bg-fallback-image, .bg-video {
  position: absolute; /* Changed from fixed to absolute within the container */
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.bg-fallback-image {
  z-index: 1; /* Keeps image on top until video is ready */
  transition: opacity 0.8s ease-in-out;
}

.bg-fallback-image.video-is-active { 
  opacity: 0; 
}

.bg-video { 
  z-index: 0; /* Sits behind image until triggered */
  opacity: 0; 
  transition: opacity 1.2s ease-in-out; 
}

.bg-video.video-ready { 
  opacity: 0.8; 
}

/* Ensure other UI elements sit above the background container */
.overlay, .giant-bg-text, .panel {
  position: relative;
  z-index: 2;
}

.bg-fallback-image {
  background-image: url('../assets/images/profile.jpg');
  background-size: cover;
  background-position: center;
  opacity: 1;
  transition: opacity 0.5s ease;
}
.bg-fallback-image.video-is-active { opacity: 0; }

.bg-video { 
  object-fit: cover; 
  opacity: 0; 
  transition: opacity 0.5s ease; 
}
.bg-video.video-ready { opacity: 0.8; }
.overlay { z-index: 1; }

.giant-bg-text {
  top: auto; left: auto;
  bottom: -50px; right: -20px;
  width: auto; height: auto;
  font-size: 12rem;
  color: rgba(0, 210, 255, 0.04);
  font-style: italic;
  font-weight: 900;
  user-select: none;
  transform: rotate(-5deg);
}

/* ================= CONTAINER PANEL (SCROLL MECHANICS RULE) ================= */
.panel {
  position: fixed;
  left: 5%;
  top: 8%;
  width: 38%;
  height: 84vh;
  padding: 30px;
  
  /* CORE TOUCH INTERACTION DEFINITIONS */
  overflow-y: scroll !important; 
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; 
  overscroll-behavior: contain;
  pointer-events: auto !important;
  
  z-index: 2;
  box-sizing: border-box;
  opacity: 0;
  transform: translateX(-100px) skewX(-4deg);
  scrollbar-width: none; /* Hides on Firefox */
}

/* Hides on Chrome, Safari, Edge without stripping layout metrics */
.panel::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
}
.panel::-webkit-scrollbar-thumb {
  background: transparent !important;
}

.panel.enter {
  animation: p3rPanelIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes p3rPanelIn {
  to {
    opacity: 1;
    transform: translateX(0) skewX(-4deg);
  }
}

/* ================= TYPOGRAPHY & HEADER ================= */
.top-header { 
  margin-bottom: 35px; 
  display: flex;            /* Enables Flexbox */
  flex-direction: column;   /* Stacks children vertically */
  align-items: flex-start;  /* Aligns everything to the left */
}

/* Optional: Adjust spacing between items */
.top-header > * {
  margin: 0;                /* Reset default margins to control flow */
}

.status-ribbon {
  margin-bottom: 10px;      /* Spacing below the status ribbon */
}

.title-wrap { 
  margin-bottom: 8px;       /* Spacing below the title */
  display: inline-block; 
}

.status-ribbon {
  background: var(--p3r-white);
  color: var(--p3r-deep-bg);
  display: inline-block;
  padding: 3px 12px;
  font-size: 0.75rem;
  letter-spacing: 2px;
  transform: skewX(-15deg);
  margin-bottom: 10px;
  font-weight: 900;
}
.title-wrap { position: relative; display: inline-block; }
.main-title {
  font-size: 5.5rem;
  margin: 0;
  line-height: 0.9;
  font-style: italic;
  color: var(--p3r-white);
  text-shadow: 4px 4px 0px var(--p3r-blue);
}
.subtitle {
  margin: 8px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--p3r-blue);
  letter-spacing: 1px;
}

/* ================= INTERNAL LAYOUT GRID ================= */
.grid { display: flex; flex-direction: column; gap: 20px; }

/* ================= THE STYLIZED P3R CARDS ================= */
.p3r-card {
  position: relative;
  background: linear-gradient(145deg, #090e1a 0%, #111a30 100%);
  border: 3px solid var(--p3r-white);
  padding: 20px;
  box-shadow: -8px 8px 0px var(--p3r-dark-blue);
  opacity: 0;
  transform: translateX(-50px);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.25s, box-shadow 0.25s;
}
.panel.enter .p3r-card {
  animation: p3rCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
}
@keyframes p3rCardIn { to { opacity: 1; transform: translateX(0); } }

.p3r-card.clickable { cursor: pointer; }
.p3r-card.clickable:hover {
  transform: translate(8px, -4px);
  border-color: var(--p3r-blue);
  box-shadow: -16px 16px 0px var(--p3r-magenta);
}
.p3r-card:not(.clickable):hover { border-color: var(--p3r-blue); }

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
}
.card-icon { color: var(--p3r-blue); font-size: 0.8rem; }
.card-title { margin: 5; font-size: 1.2rem; letter-spacing: 1px; color: var(--p3r-white); }

/* ================= PROFILE CARD MODULE ================= */
.profile-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: var(--p3r-white);
  color: var(--p3r-deep-bg);
  border: 4px solid var(--p3r-deep-bg);
  box-shadow: -8px 8px 0px var(--p3r-blue);
}
.avatar-container { position: relative; width: 100px; height: 100px; flex-shrink: 0; }
.avatar-skew-bg { position: absolute; inset: -2px; background: var(--p3r-magenta); transform: rotate(-6deg); z-index: 1; }
.avatar-img { position: relative; width: 100%; height: 100%; object-fit: cover; border: 2px solid var(--p3r-deep-bg); z-index: 2; transform: rotate(-2deg); }

.profile-info { position: relative; width: 100%; }
.meta-crumbs { font-family: monospace; font-size: 0.65rem; color: var(--p3r-magenta); font-weight: bold; }
.user-name { margin: 2px 0; font-size: 1.9rem; line-height: 1; font-weight: 900; }
.user-role { font-family: sans-serif; font-weight: 700; font-size: 0.75rem; opacity: 0.8; margin: 0; }

.level-badge {
  margin-top: 8px;
  background: var(--p3r-deep-bg);
  color: var(--p3r-white);
  display: inline-flex;
  align-items: baseline;
  padding: 2px 10px;
  transform: skewX(-10deg);
}
.level-badge .lbl { font-size: 0.7rem; color: var(--p3r-blue); margin-right: 4px; }
.level-badge .val { font-size: 1.2rem; font-weight: 900; }
.click-prompt { font-family: monospace; font-size: 0.65rem; color: var(--p3r-blue); margin-top: 5px; text-align: right; }

/* ================= METERS & PROGRESS BARS ================= */
.skills-list { display: flex; flex-direction: column; gap: 12px; }
.skill-row { display: flex; flex-direction: column; }
.skill-meta { display: flex; justify-content: space-between; font-size: 1.05rem; margin-bottom: 2px; }
.skill-val { color: var(--p3r-blue); font-weight: 900; }
.p3r-bar-bg { height: 12px; background: var(--p3r-deep-bg); border: 1px solid rgba(255, 255, 255, 0.2); padding: 2px; overflow: hidden; }
.p3r-bar-fill { height: 100%; background: var(--p3r-blue); position: relative; transition: width 0.5s ease-in-out; }
.bar-glare { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%); }

/* ================= SPECIALIZATION TAG MATRIX ================= */
.tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
.p3r-tag { background: var(--p3r-dark-blue); border-left: 3px solid var(--p3r-blue); padding: 4px 10px; font-size: 0.8rem; font-family: sans-serif; font-weight: bold; }

/* ================= EXPERIENCE METERS ================= */
.xp-meta { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px; }
.xp-lbl { color: var(--p3r-blue); }
.p3r-bar-fill.xp-fill { background: var(--p3r-magenta); }

/* ================= THE STYLIZED SHARD MODAL SCREEN ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(12px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.p3r-modal-window {
  position: relative;
  width: 860px;
  background: var(--p3r-deep-bg);
  border: 4px solid var(--p3r-white);
  box-shadow: -20px 20px 0px var(--p3r-blue);
  transform: rotate(-1.5deg);
}
.p3r-close-btn {
  position: absolute;
  top: -44px; right: -4px;
  background: var(--p3r-magenta);
  border: 4px solid var(--p3r-white);
  border-bottom: none;
  color: var(--p3r-white);
  font-family: var(--p3r-font);
  font-size: 1rem;
  padding: 6px 24px;
  cursor: pointer;
  transform: skewX(-10deg);
}
.p3r-close-btn:hover { background: var(--p3r-white); color: var(--p3r-deep-bg); }

.modal-layout { padding: 40px; display: flex; gap: 40px; }
.modal-portrait-deck { flex: 0.9; min-width: 0; }
.portrait-frame { background: var(--p3r-dark-blue); width: 100%; height: 280px; position: relative; border: 3px solid var(--p3r-blue); display: flex; justify-content: center; align-items: center; overflow: hidden; }
.modal-img { width: 80%; height: 80%; object-fit: cover; border: 3px solid var(--p3r-white); z-index: 2; transform: rotate(3deg); }
.hud-tag { position: absolute; bottom: 8px; left: 8px; background: var(--p3r-deep-bg); color: var(--p3r-blue); font-family: monospace; font-size: 0.65rem; padding: 2px 6px; z-index: 3; border: 1px solid var(--p3r-blue); }

.modal-info-deck { flex: 1.3; display: flex; flex-direction: column; justify-content: space-between; }
.category-pill { background: var(--p3r-blue); color: var(--p3r-deep-bg); display: inline-block; padding: 2px 10px; font-size: 0.75rem; transform: skewX(-8deg); }
.modal-name { font-size: 3rem; margin: 6px 0; line-height: 1; color: var(--p3r-white); text-shadow: 2px 2px 0px var(--p3r-magenta); }
.sub-labels { display: flex; gap: 12px; font-family: monospace; font-size: 0.8rem; margin-bottom: 20px;}
.cyan-txt { color: var(--p3r-blue); }
.magenta-txt { color: var(--p3r-magenta); }
.body-title { color: var(--p3r-blue); font-size: 1.2rem; margin: 0 0 6px 0; }
.body-desc { font-family: Arial, sans-serif; font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.85); margin: 0; }
.status-code { margin-top: 20px; font-family: monospace; font-size: 0.75rem; color: var(--p3r-blue); border-top: 1px dashed rgba(0, 210, 255, 0.3); padding-top: 8px; }

/* ================= SYSTEM LAYER TRANSITIONS ================= */
.p3r-modal-enter-active, .p3r-modal-leave-active { transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1); }
.p3r-modal-enter-active .p3r-modal-window { animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.p3r-modal-leave-active .p3r-modal-window { animation: p3rSlashIn 0.2s cubic-bezier(0.25, 1, 0.5, 1) reverse forwards; }
.p3r-modal-enter-from, .p3r-modal-leave-to { opacity: 0; }

@keyframes p3rSlashIn {
  0% { transform: scale(0.85) rotate(-6deg) translateY(50px) ; opacity: 0; }
  100% { transform: scale(1) rotate(-1.5deg) translateY(0); opacity: 1; }
}

/* ================= RESPONSIVE VIEWPORTS (768PX FIXED CONTAINER) ================= */
@media (max-width: 1100px) {
  .panel { width: 50%; left: 4%; }
  .main-title { font-size: 4.2rem; }
}

@media (max-width: 768px) {
  .panel {
    width: 90% !important;
    left: 5% !important;
    top: 5% !important;
    height: 90vh !important; /* Locks structural bounds inside mobile bounds */
    padding: 20px !important;
    transform: none !important; /* Drops hardware skew matrix locks so mobile scroll isn't bypassed */
  }

  .main-title { font-size: 3.2rem; }
  .profile-card { flex-direction: column; text-align: center; padding: 30px 20px; }
  .click-prompt { text-align: center; }

  /* COMPACT SCREEN OVERLAY HANDLING */
  .modal-backdrop {
    overflow-y: auto;
    align-items: flex-start;
    padding: 60px 10px 20px 10px;
  }
  .p3r-modal-window { 
    width: 100%; 
    transform: none !important; 
    margin-bottom: 20px;
  }
  .modal-layout { flex-direction: column; padding: 25px 15px; gap: 20px; }
  .p3r-close-btn { top: -42px; right: -4px; transform: none; }
}
</style>