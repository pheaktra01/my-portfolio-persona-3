<template>
  <div class="persona-page">
    <div class="background-circle"></div>

    <header class="hero">
      <div class="hero-text">
        <span class="small-title">STATUS</span>
        <h1>SKILLS</h1>
        <p>FULL STACK DEVELOPER</p>
      </div>
    </header>

    <div class="content">
      <!-- Profile Card -->
      <section class="profile-card panel">
        <div class="avatar-wrapper">
          <div class="avatar-ring"></div>
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
            class="avatar"
          />
        </div>

        <div class="profile-info">
          <h2>PHEAKTRA</h2>
          <p>Software Engineering Student</p>

          <div class="level-box">
            <span>LEVEL</span>
            <strong>28</strong>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="panel skills-panel">
        <div class="panel-title">
          TECHNICAL SKILLS
        </div>

        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skill"
        >
          <div class="skill-header">
            <span>{{ skill.name }}</span>
            <span>{{ skill.level }}%</span>
          </div>

          <div class="skill-bar">
            <div
              class="skill-fill"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </section>

      <!-- Specializations -->
      <section class="panel">
        <div class="panel-title">
          SPECIALIZATIONS
        </div>

        <div class="tags">
          <span>Vue.js</span>
          <span>NestJS</span>
          <span>Flutter</span>
          <span>MongoDB</span>
          <span>Docker</span>
          <span>Azure</span>
        </div>
      </section>

      <!-- XP -->
      <section class="panel">
        <div class="panel-title">
          EXPERIENCE
        </div>

        <div class="xp-box">
          <div class="xp-label">
            8500 / 10000 XP
          </div>

          <div class="xp-bar">
            <div class="xp-fill"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  { name: 'Vue.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'NestJS', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Flutter', level: 75 },
  { name: 'Docker', level: 70 }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800&display=swap');

.persona-page {
  min-height: 100vh;
  background: #07111f;
  color: white;
  overflow: hidden;
  position: relative;
  font-family: 'Orbitron', sans-serif;
  padding: 50px;
}

/* Background */

.background-circle {
  position: fixed;
  width: 700px;
  height: 700px;
  border: 2px solid rgba(0, 174, 255, 0.2);
  border-radius: 50%;
  top: -150px;
  right: -150px;
  animation: rotate 25s linear infinite;
}

.background-circle::before {
  content: '';
  position: absolute;
  inset: 40px;
  border-radius: 50%;
  border: 2px dashed rgba(0, 174, 255, 0.15);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Hero */

.hero {
  margin-bottom: 40px;
}

.small-title {
  color: #00d4ff;
  letter-spacing: 5px;
}

.hero h1 {
  font-size: 6rem;
  margin: 0;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px #00d4ff;
}

.hero p {
  color: rgba(255,255,255,0.7);
}

/* Layout */

.content {
  display: grid;
  gap: 25px;
}

/* Panels */

.panel {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  padding: 25px;
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background: #00d4ff;
}

.panel-title {
  color: #00d4ff;
  margin-bottom: 20px;
  letter-spacing: 3px;
  font-weight: 700;
}

/* Profile */

.profile-card {
  display: flex;
  align-items: center;
  gap: 30px;
}

.avatar-wrapper {
  position: relative;
}

.avatar-ring {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid #00d4ff;
  animation: rotate 12s linear infinite;
}

.avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
}

.profile-info h2 {
  margin: 0;
  font-size: 2rem;
}

.level-box {
  margin-top: 15px;
  display: inline-flex;
  gap: 15px;
  align-items: center;
  padding: 10px 20px;
  background: rgba(0, 212, 255, 0.15);
}

.level-box strong {
  font-size: 1.8rem;
  color: #00d4ff;
}

/* Skills */

.skill {
  margin-bottom: 20px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-bar {
  height: 12px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #00d4ff,
    #0077ff
  );
  box-shadow: 0 0 20px #00d4ff;
}

/* Tags */

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tags span {
  border: 1px solid #00d4ff;
  padding: 10px 18px;
  background: rgba(0, 212, 255, 0.1);
}

/* XP */

.xp-bar {
  height: 14px;
  background: rgba(255,255,255,0.08);
  margin-top: 10px;
}

.xp-fill {
  width: 85%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #00d4ff,
    #0077ff
  );
}

@media (max-width: 768px) {
  .persona-page {
    padding: 25px;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>