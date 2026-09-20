<template>
  <div class="profile-page p3r-theme">
    <BackBtn />
    <IntroSlash />

    <!-- BACKGROUND VIDEO / AMBIENT OCEANIC LAYER -->
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

      <!-- Persona 3 Underwater Ambient Bubbles -->
      <div class="ambient-bubbles" aria-hidden="true">
        <span v-for="n in 14" :key="n" class="bubble" :style="{ '--bi': n }"></span>
      </div>
    </div>
    
    <div class="overlay"></div>
    <div class="hud-scanlines"></div>
    <div class="giant-bg-text">P3R_STATUS_2026</div>

    <!-- MAIN TWO-COLUMN P3R STAGE -->
    <div class="p3r-stage" :class="{ enter: pageReady }">
      
      <!-- LEFT INTERACTIVE TACTICAL PANEL -->
      <main class="panel">
        
        <!-- P3R HEADER -->
        <header class="top-header">
          <div class="status-ribbon">
            <span class="ribbon-icon">◆</span>
            <span>S.E.E.S. PERSONNEL DOSSIER // REG_NO: 20220993</span>
          </div>
          <div class="title-wrap">
            <h1 class="main-title" data-text="PROFILE">PROFILE</h1>
            <span class="jp-title">ステータス</span>
          </div>
          <p class="subtitle">// USER_LOADOUT_TACTICAL_FILE</p>
        </header>

        <!-- P3R TACTICAL TAB SWITCHER -->
        <nav class="p3r-tab-nav" aria-label="Profile Sections">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: currentTab === tab.id }"
            @click="switchTab(tab.id)"
            @pointerenter="onTabHover"
          >
            <span class="tab-idx">0{{ idx + 1 }}</span>
            <span class="tab-label">{{ tab.name }}</span>
            <span class="tab-sub">{{ tab.jp }}</span>
            <span class="tab-indicator" v-if="currentTab === tab.id">▲</span>
          </button>
        </nav>

        <!-- TAB 1: STATUS (基本情報) -->
        <section v-if="currentTab === 'status'" class="tab-content" key="status">
          <!-- COMBAT CORE CARD -->
          <div class="p3r-card combat-core-card">
            <div class="card-bg-accent-slash"></div>

            <div class="card-top-row">
              <div class="combat-meta">
                <span class="sees-insignia">◆ S.E.E.S. TACTICAL COMBAT SUITE</span>
                <span class="arcana-badge">ARCANA: 0 THE FOOL 愚者</span>
              </div>
              <div class="condition-badge" title="Physical & Mental readiness">
                <span class="condition-pulse"></span>
                <span class="condition-lbl">CONDITION:</span>
                <span class="condition-val">GREAT [絶好調]</span>
              </div>
            </div>

            <div class="operator-headline">
              <h2 class="user-name">LOENG PHEAKTRA</h2>
              <p class="user-role">COMPUTER SCIENCE & ENGINEERING // ITC</p>
            </div>

            <p class="user-brief">
              Fourth-year CSE student at the Institute of Technology of Cambodia. Specializing in DevOps, cloud infrastructure, containerization, and modern full-stack systems.
            </p>

            <!-- P3R COMBAT HP & SP GAUGES -->
            <div class="combat-gauges">
              <div class="gauge-row hp-row">
                <div class="gauge-head">
                  <span class="gauge-lbl">HP</span>
                  <span class="gauge-val">999<small>/999</small></span>
                </div>
                <div class="gauge-bar-frame">
                  <div class="gauge-fill hp-fill" style="width: 100%">
                    <div class="gauge-glare"></div>
                  </div>
                </div>
              </div>

              <div class="gauge-row sp-row">
                <div class="gauge-head">
                  <span class="gauge-lbl">SP</span>
                  <span class="gauge-val">999<small>/999</small></span>
                </div>
                <div class="gauge-bar-frame">
                  <div class="gauge-fill sp-fill" style="width: 100%">
                    <div class="gauge-glare"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="level-badge-row">
              <div class="level-badge">
                <span class="lbl">LV</span>
                <span class="val">99</span>
                <span class="sub-lbl">MAX</span>
              </div>
              <div class="exp-counter">
                <span class="exp-title">NEXT EXP</span>
                <span class="exp-num">200 / 10000</span>
                <div class="exp-bar">
                  <div class="exp-bar-fill" style="width: 2%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- P3R COMBAT PARAMETERS (St / Ma / En / Ag / Lu) -->
          <div class="p3r-card params-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">COMBAT PARAMETERS // 能力値</h3>
            </div>

            <div class="params-grid">
              <div v-for="param in parameters" :key="param.key" class="param-row">
                <div class="param-badge" :style="{ '--color': param.color }">
                  <span class="param-abbr">{{ param.key }}</span>
                  <span class="param-kanji">{{ param.kanji }}</span>
                </div>
                <div class="param-info">
                  <div class="param-name-wrap">
                    <span class="param-label">{{ param.label }}</span>
                    <span class="param-score">{{ param.value }}</span>
                  </div>
                  <div class="param-bar-bg">
                    <div 
                      class="param-bar-fill" 
                      :style="{ width: param.value + '%', backgroundColor: param.color }"
                    >
                      <div class="bar-glare"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 2: PERSONA & SKILLS (ペルソナ & スキル) -->
        <section v-if="currentTab === 'persona'" class="tab-content" key="persona">
          <!-- PERSONA OVERVIEW -->
          <div class="p3r-card persona-hero-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">EQUIPPED PERSONA // 所持ペルソナ</h3>
            </div>
            <div class="persona-dossier">
              <div class="persona-name-plate">
                <span class="persona-rank">RANK S</span>
                <h3 class="persona-title">ORPHEUS <small>// SYS ARCHITECT</small></h3>
                <span class="persona-arcana-tag">ARCANA 000 : THE FOOL 愚者</span>
              </div>
              <p class="persona-lore">
                Specialized in orchestrating microservices, deploying resilient container architectures, and harmonizing modern frontend reactivity with high-throughput backend infrastructure.
              </p>
            </div>
          </div>

          <!-- 8-SLOT P3R SKILL DECK -->
          <div class="p3r-card skill-deck-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">PERSONA SKILL LOADOUT // 8-SLOT DECK</h3>
            </div>

            <div class="skills-deck">
              <div 
                v-for="(skill, i) in personaSkills" 
                :key="skill.name" 
                class="skill-slot"
                :class="{ active: activeSkill?.name === skill.name }"
                @pointerenter="selectSkill(skill)"
                @click="selectSkill(skill)"
              >
                <div class="skill-slot-header">
                  <span class="skill-index">0{{ i + 1 }}</span>
                  <span class="affinity-pill" :class="`affinity-${skill.affinity.toLowerCase()}`">
                    {{ skill.affinity }}
                  </span>
                  <span class="skill-name-txt">{{ skill.name }}</span>
                </div>
                <div class="skill-cost-badge">
                  <span class="cost-lbl">{{ skill.costType }}</span>
                  <span class="cost-val">{{ skill.cost }}</span>
                </div>
              </div>
            </div>

            <!-- ACTIVE SKILL DETAIL TACTICAL BOX -->
            <div v-if="activeSkill" class="skill-detail-inspector">
              <div class="inspector-header">
                <span class="detail-affinity" :class="`affinity-${activeSkill.affinity.toLowerCase()}`">
                  [{{ activeSkill.affinity }}]
                </span>
                <span class="detail-name">{{ activeSkill.name }}</span>
                <span class="detail-tier">MASTERY: {{ activeSkill.mastery }}%</span>
              </div>
              <p class="detail-desc">{{ activeSkill.description }}</p>
              <div class="detail-tags">
                <span v-for="tag in activeSkill.tech" :key="tag" class="detail-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 3: LOADOUT (装備・技術) -->
        <section v-if="currentTab === 'loadout'" class="tab-content" key="loadout">
          <!-- S.E.E.S. COMBAT GEAR -->
          <div class="p3r-card equipment-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">S.E.E.S. EQUIPMENT // 装備スロット</h3>
            </div>

            <div class="gear-list">
              <div v-for="gear in equipment" :key="gear.slot" class="gear-item">
                <div class="gear-slot-tag">{{ gear.slot }}</div>
                <div class="gear-info">
                  <h4 class="gear-name">{{ gear.name }}</h4>
                  <p class="gear-desc">{{ gear.desc }}</p>
                </div>
                <div class="gear-stat-badge">{{ gear.stat }}</div>
              </div>
            </div>
          </div>

          <!-- FULL TECH ARSENAL BY CATEGORY -->
          <div class="p3r-card tags-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">SPECIALIZATION LOADOUT // 専門技術</h3>
            </div>

            <div v-for="(group, gIdx) in techGroups" :key="gIdx" class="tech-group">
              <h4 class="group-title">
                <span class="group-dot">▶</span> {{ group.category }}
              </h4>
              <div class="tag-cloud">
                <span 
                  v-for="item in group.items" 
                  :key="item" 
                  class="p3r-tag"
                  @pointerenter="onHoverTag"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 4: DOSSIER (調査記録) -->
        <section v-if="currentTab === 'dossier'" class="tab-content" key="dossier">
          <div class="p3r-card dossier-summary-card">
            <div class="card-header">
              <span class="card-icon">◆</span>
              <h3 class="card-title">OPERATOR DOSSIER // 調査記録</h3>
            </div>

            <div class="dossier-meta-grid">
              <div class="meta-item">
                <span class="meta-k">NAME</span>
                <span class="meta-v">Loeng Pheaktra</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">AGE</span>
                <span class="meta-v">22</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">ACADEMY</span>
                <span class="meta-v">Institute of Technology of Cambodia (ITC)</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">DEGREE</span>
                <span class="meta-v">Year 4 // Computer Science & Engineering</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">LOCATION</span>
                <span class="meta-v">Phnom Penh, Cambodia</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">STATUS</span>
                <span class="meta-v active-status">ACTIVE // READY FOR COMBAT</span>
              </div>
            </div>

            <div class="dossier-story-box">
              <h4 class="story-title">BACKGROUND & ASPIRATION</h4>
              <p class="story-text">
                I am a passionate fourth-year engineering student dedicated to building robust software systems, high-speed frontend interfaces, and resilient cloud architectures. Having worked hands-on across Flutter, full-stack web platforms, containerized environments, and continuous delivery, my mission is to deliver seamless, production-grade solutions that solve complex real-world problems.
              </p>
            </div>

            <!-- SOCIAL NODES -->
            <div class="social-links-deck">
              <h4 class="story-title">SYSTEM_NODE_CONNECTIONS</h4>
              <div class="social-btn-row">
                <a href="https://github.com/pheaktra01" target="_blank" class="p3r-action-pill" @pointerenter="onHoverTag">
                  <span>GITHUB NODE ↗</span>
                </a>
                <a href="https://linkedin.com/in/loeng-pheaktra-2b9578413" target="_blank" class="p3r-action-pill" @pointerenter="onHoverTag">
                  <span>LINKEDIN NODE ↗</span>
                </a>
                <a href="mailto:pheaktra.loeng25@gmail.com" class="p3r-action-pill" @pointerenter="onHoverTag">
                  <span>TRANSMIT EMAIL ↗</span>
                </a>
              </div>
            </div>

            <button class="inspect-full-btn" @click="onClickOpenModal" @pointerenter="onHoverTag">
              <span>▲ OPEN FULL TARTARUS DOSSIER SCREEN</span>
            </button>
          </div>
        </section>

      </main>

      <!-- RIGHT HERO SHOWCASE (Persona 3 Reload Stylized Character & Arcana Display) -->
      <aside class="hero-showcase">
        
        <!-- FLOATING SHARDS -->
        <div class="p3r-shard shard-1"></div>
        <div class="p3r-shard shard-2"></div>
        <div class="p3r-shard shard-3"></div>

        <!-- ARCANA WATERMARK CARD -->
        <div class="arcana-display-card">
          <div class="arcana-num">000</div>
          <div class="arcana-name">THE FOOL</div>
          <div class="arcana-kanji">愚者</div>
        </div>

        <!-- HERO AVATAR DISPLAY -->
        <div 
          class="hero-portrait-stage" 
          @click="onClickOpenModal"
          @pointerenter="onHoverCard"
          title="Click to inspect dossier"
        >
          <!-- ROTATING CORNER BRACKETS -->
          <div class="bracket-tl"></div>
          <div class="bracket-br"></div>
          
          <!-- SKEWED BACKGROUND SHARDS -->
          <div class="portrait-shadow-cyan"></div>
          <div class="portrait-shadow-magenta"></div>
          
          <!-- AVATAR IMAGE -->
          <div class="portrait-frame">
            <img 
              src="../assets/images/e20220993.png" 
              class="hero-img" 
              alt="Operator Loeng Pheaktra" 
            />
            <div class="portrait-scanline"></div>
            <div class="portrait-glare"></div>
          </div>

          <!-- S.E.E.S. ARMBAND RIBBON -->
          <div class="sees-armband-ribbon">
            <span class="sees-star">★</span>
            <span class="sees-txt">S.E.E.S. EXECUTION SQUAD</span>
          </div>

          <!-- HUD OVERLAY TAG -->
          <div class="hero-hud-tag">
            <span class="hud-status-dot"></span>
            <span>ID: ITC-CS-20220993 // ANALYZED</span>
          </div>
        </div>

        <!-- HERO QUICK DOSSIER BANNER -->
        <div class="hero-tactical-banner">
          <div class="banner-line">
            <span class="b-lbl">CODE NAME</span>
            <span class="b-val">LOENG PHEAKTRA</span>
          </div>
          <div class="banner-line">
            <span class="b-lbl">ROLE CLASSIFICATION</span>
            <span class="b-val">FULL-STACK & DEVOPS ENGINEER</span>
          </div>
          <div class="banner-line">
            <span class="b-lbl">HEADQUARTERS</span>
            <span class="b-val">INSTITUTE OF TECHNOLOGY OF CAMBODIA</span>
          </div>
          <button class="banner-action-btn" @click="onClickOpenModal" @pointerenter="onHoverTag">
            <span>INSPECT FULL DOSSIER ▶</span>
          </button>
        </div>

      </aside>

    </div>

    <!-- TARTARUS / VELVET ROOM FULL-SCREEN MODAL SCREEN -->
    <Transition name="p3r-modal">
      <div 
        class="modal-backdrop" 
        v-if="isProfileOpen" 
        @click.self="closeProfileModal"
      >
        <div class="p3r-modal-window">
          <button class="p3r-close-btn" @click="onClickClose" @pointerenter="onHoverTag">
            <span>CLOSE ▲</span>
          </button>

          <div class="modal-layout">
            <!-- PORTRAIT DECK -->
            <div class="modal-portrait-deck">
              <div class="portrait-frame">
                <div class="scanlines"></div>
                <div class="frame-border-decor"></div>
                <img src="../assets/images/e20220993.png" class="modal-img" alt="Detail Portrait" />
                <div class="hud-tag">ID_FILE // 20220993</div>
              </div>
              <div class="portrait-telemetry">
                <span class="telemetry-item">STATUS: COMBAT READY</span>
                <span class="telemetry-item">AUTHENTICATION: S.E.E.S.</span>
              </div>
            </div>

            <!-- INFO DECK -->
            <div class="modal-info-deck">
              <header class="modal-info-header">
                <div class="category-pill">OPERATOR_PROFILE // TARTARUS_INTEL</div>
                <h2 class="modal-name">LOENG PHEAKTRA</h2>
                <div class="sub-labels">
                  <span class="cyan-txt">@loengpheaktra</span>
                  <span class="magenta-txt">// STATUS: DEPLOYED</span>
                  <span class="yellow-txt">// LEVEL 99 MAX</span>
                </div>
              </header>

              <div class="modal-data-block">
                <div class="data-row">
                  <span class="d-key">AGE</span>
                  <span class="d-val">22</span>
                </div>
                <div class="data-row">
                  <span class="d-key">LOCATION</span>
                  <span class="d-val">Phnom Penh, Cambodia</span>
                </div>
                <div class="data-row">
                  <span class="d-key">INSTITUTION</span>
                  <span class="d-val">Institute of Technology of Cambodia (ITC)</span>
                </div>
                <div class="data-row">
                  <span class="d-key">SPECIALTY</span>
                  <span class="d-val">DevOps, Containerization & Full-Stack Systems</span>
                </div>
              </div>

              <div class="modal-info-body">
                <h3 class="body-title">MISSION STATEMENT // DOSSIER</h3>
                <p class="body-desc">
                  I am a fourth-year Computer Science and Engineering student at the Institute of Technology of Cambodia (ITC). I am passionate about software development, especially mobile application development, and I enjoy creating applications that provide practical solutions to real-world problems. Through academic and personal projects, I have gained hands-on experience in Flutter, web development, UI implementation, and problem-solving. I am always eager to learn new technologies, collaborate with others, and continuously improve my skills. In the future, I hope to expand my expertise into cloud technologies and DevOps while continuing to grow as a software engineer.
                </p>
              </div>

              <div class="modal-social-links">
                <h3 class="body-title">SYSTEM_NODE_LINKS</h3>
                <div class="tag-cloud">
                  <a href="https://github.com/pheaktra01" target="_blank" class="p3r-tag link">GitHub Profile ↗</a>
                  <a href="https://linkedin.com/in/loeng-pheaktra-2b9578413" target="_blank" class="p3r-tag link">LinkedIn Network ↗</a>
                  <a href="mailto:pheaktra.loeng25@gmail.com" class="p3r-tag link">Direct Email ↗</a>
                </div>
              </div>

              <footer class="modal-info-footer">
                <div class="status-code">SYS_STATUS_OK // DATA_VERIFIED // S.E.E.S._APPROVED</div>
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
import { useVideoManager } from '../composables/useVideoManager'
import { playHover, playSwitchToggle, playClick } from '../utils/sound'

const { setVideo, clearVideo, currentVideo } = useVideoManager()

// State
const pageReady = ref(false)
const isProfileOpen = ref(false)
const isVideoLoaded = ref(false)
const currentTab = ref('status')

// Tactical tabs
const tabs = [
  { id: 'status', name: 'STATUS', jp: '基本情報' },
  { id: 'persona', name: 'PERSONA', jp: 'ペルソナ & スキル' },
  { id: 'loadout', name: 'LOADOUT', jp: '装備・技術' },
  { id: 'dossier', name: 'DOSSIER', jp: '調査記録' },
]

// 5 Persona 3 Combat Parameters (St / Ma / En / Ag / Lu)
const parameters = [
  { key: 'St', kanji: '力', label: 'Architecture & Full-Stack Strength', value: 95, color: '#ff3366' },
  { key: 'Ma', kanji: '魔', label: 'DevOps & Automation Magic', value: 94, color: '#a855f7' },
  { key: 'En', kanji: '耐', label: 'High Availability & Endurance', value: 98, color: '#00ff88' },
  { key: 'Ag', kanji: '速', label: 'Agility & Rapid Deployment', value: 92, color: '#00d2ff' },
  { key: 'Lu', kanji: '運', label: 'Debugging & Issue Resolution', value: 89, color: '#ffee00' },
]

// 8 Persona 3 Skill Deck
interface Skill {
  name: string
  affinity: 'SLASH' | 'FIRE' | 'ELEC' | 'ICE' | 'WIND' | 'LIGHT' | 'DARK' | 'PASSIVE'
  costType: 'HP' | 'SP' | 'TYPE'
  cost: string
  mastery: number
  description: string
  tech: string[]
}

const personaSkills: Skill[] = [
  {
    name: 'Docker & Kubernetes',
    affinity: 'SLASH',
    costType: 'HP',
    cost: '12%',
    mastery: 95,
    description: 'Deploys containerized clusters with automated self-healing, horizontal autoscaling, and isolated microservice environments.',
    tech: ['Docker', 'Kubernetes', 'Docker Compose', 'Cluster Mgmt']
  },
  {
    name: 'Vue.js & Frontend Core',
    affinity: 'FIRE',
    costType: 'SP',
    cost: '18',
    mastery: 90,
    description: 'Casts ultra-responsive reactive interfaces, dynamic state management, smooth animations, and high-fidelity Persona aesthetics.',
    tech: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia']
  },
  {
    name: 'Spring Boot & Backend',
    affinity: 'ELEC',
    costType: 'SP',
    cost: '22',
    mastery: 88,
    description: 'Channels robust Java enterprise services, RESTful API endpoints, secure authentication, and transactional integrity.',
    tech: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'REST/GraphQL']
  },
  {
    name: 'Flutter & Dart Mobile',
    affinity: 'WIND',
    costType: 'SP',
    cost: '16',
    mastery: 86,
    description: 'Conjures cross-platform native iOS & Android applications with custom UI widgets, smooth state routing, and offline storage.',
    tech: ['Flutter', 'Dart', 'Mobile UI', 'REST Client']
  },
  {
    name: 'Nginx & Traffic Routing',
    affinity: 'ICE',
    costType: 'SP',
    cost: '14',
    mastery: 87,
    description: 'Shields services with high-concurrency reverse proxying, SSL/TLS termination, rate limiting, and round-robin load balancing.',
    tech: ['Nginx', 'Load Balancing', 'SSL/TLS', 'Certbot']
  },
  {
    name: 'CI/CD Automated Pipelines',
    affinity: 'LIGHT',
    costType: 'SP',
    cost: '20',
    mastery: 92,
    description: 'Dispatches automated test runners, build gates, artifact publishing, and seamless zero-downtime production deployment.',
    tech: ['GitHub Actions', 'Jenkins', 'Ansible', 'GitOps']
  },
  {
    name: 'Database Persistence',
    affinity: 'DARK',
    costType: 'SP',
    cost: '15',
    mastery: 84,
    description: 'Manages relational ACID-compliant MySQL engines alongside schema-less MongoDB document stores for reliable data persistence.',
    tech: ['MySQL', 'MongoDB', 'Query Optimization', 'Indexing']
  },
  {
    name: 'Cloud & Perimeter Guard',
    affinity: 'PASSIVE',
    costType: 'TYPE',
    cost: 'PASS',
    mastery: 90,
    description: 'Passive mastery granting resilient cloud hosting, CDN distribution, DNS protection, and continuous serverless availability.',
    tech: ['AWS (EC2)', 'Cloudflare', 'Vercel', 'Netlify']
  },
]

const activeSkill = ref<Skill>(personaSkills[0])

function selectSkill(skill: Skill) {
  activeSkill.value = skill
  playSwitchToggle()
}

// S.E.E.S. Tactical Equipment
const equipment = [
  {
    slot: 'WEAPON // 近接',
    name: 'VS Code [Custom Theme + Bash Rig]',
    desc: 'High-precision IDE equipped with GitLens, TypeScript LSP, and fast command terminal.',
    stat: '+99 CODING ATK'
  },
  {
    slot: 'ARMOR // 防具',
    name: 'ITC Gekkoukan CSE Uniform',
    desc: 'Specialized Extracurricular Execution Squad combat vest fortified with academic CSE principles.',
    stat: '+95 RESILIENCE'
  },
  {
    slot: 'ACCESSORY // 装飾',
    name: 'S.E.E.S. Evoker // Dual High-Res Rig',
    desc: 'Dual-monitor multitasking array providing ultra-wide field of view for debugging and multi-service logs.',
    stat: '+90 PERCEPTION'
  },
  {
    slot: 'OS // 駆動系',
    name: 'Linux (Ubuntu) & Bash Terminal',
    desc: 'POSIX-compliant kernel environment supporting seamless container daemons and SSH tunnels.',
    stat: '+94 STABILITY'
  },
]

// Tech groups for Loadout tab
const techGroups = [
  {
    category: 'DevOps & Deployment',
    items: ['Docker Container', 'Kubernetes', 'Nginx', 'GitHub Actions', 'Jenkins', 'Ansible', 'Terraform (learning)', 'Load Balancing', 'AWS / Cloudflare / Vercel / Netlify']
  },
  {
    category: 'Frontend Stack',
    items: ['HTML / CSS / JavaScript', 'TypeScript', 'Vue 3', 'Tailwind CSS']
  },
  {
    category: 'Backend Stack',
    items: ['Node.js', 'Java (Spring Boot)', 'NestJS', 'REST API / GraphQL']
  },
  {
    category: 'Database Systems',
    items: ['MySQL', 'MongoDB']
  },
  {
    category: 'Mobile & Development Tools',
    items: ['Flutter', 'Dart', 'Git / GitHub', 'VS Code', 'Postman / ApiDog', 'Figma', 'Linux (Ubuntu) / Bash', 'Godot Engine']
  }
]

const handleVideoPlaying = () => {
  isVideoLoaded.value = true
}

function switchTab(tabId: string) {
  if (currentTab.value === tabId) return
  currentTab.value = tabId
  playSwitchToggle()
}

function onTabHover() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function onHoverTag() {
  const isMobile = window.innerWidth <= 868
  playHover(isMobile)
}

function onHoverCard() {
  playSwitchToggle()
}

function onClickOpenModal() {
  isProfileOpen.value = true
  playClick()
}

function onClickClose() {
  isProfileOpen.value = false
  playClick()
}

function closeProfileModal() {
  isProfileOpen.value = false
}

onMounted(() => {
  const isMobile = window.innerWidth <= 868

  if (!isMobile) {
    setVideo(videos.profile)
  }

  requestAnimationFrame(() => {
    pageReady.value = true
  })
})

onBeforeUnmount(() => {
  clearVideo()
})
</script>

<style scoped>
/* ================= SYSTEM & THEME CONFIG ================= */
.p3r-theme {
  --p3r-blue: #00d2ff;
  --p3r-dark-blue: #0f1c3f;
  --p3r-navy-bg: #030712;
  --p3r-card-bg: rgba(6, 14, 32, 0.92);
  --p3r-magenta: #ff0055;
  --p3r-hp-green: #00ff88;
  --p3r-white: #ffffff;
  --p3r-gold: #ffee00;
  --p3r-font: 'Impact', 'Arial Black', sans-serif;

  font-family: var(--p3r-font);
  color: var(--p3r-white);
  background-color: var(--p3r-navy-bg);

  min-height: 100vh;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* ================= BACKGROUND VIDEO & AMBIENT LAYER ================= */
.bg-layer-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: var(--p3r-navy-bg);
}

.overlay, .hud-scanlines, .giant-bg-text {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.overlay {
  background: radial-gradient(circle at 75% 40%, rgba(0, 210, 255, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, rgba(3, 7, 18, 0.5) 0%, rgba(3, 7, 18, 0.85) 100%);
}

.hud-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0, 210, 255, 0.02) 3px,
    rgba(0, 210, 255, 0.02) 4px
  );
}

.bg-fallback-image, .bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.bg-fallback-image {
  background-image: url('../assets/images/profile.jpg');
  background-size: cover;
  background-position: center;
  opacity: 1;
  transition: opacity 0.8s ease-in-out;
  z-index: 1;
}
.bg-fallback-image.video-is-active { opacity: 0; }

.bg-video {
  z-index: 0;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}
.bg-video.video-ready { opacity: 0.75; }

/* Persona 3 Underwater Ambient Bubbles */
.ambient-bubbles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.bubble {
  position: absolute;
  bottom: -40px;
  left: calc(var(--bi) * 7.1%);
  width: calc(6px + (var(--bi) % 4) * 4px);
  height: calc(6px + (var(--bi) % 4) * 4px);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(0, 210, 255, 0.4) 60%, rgba(0, 210, 255, 0.1));
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
  animation: floatUp calc(9s + (var(--bi) % 5) * 2s) infinite ease-in;
  animation-delay: calc(var(--bi) * 0.7s);
  opacity: 0.65;
}

@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  15% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
}

.giant-bg-text {
  top: auto; left: auto;
  bottom: -40px; right: -30px;
  width: auto; height: auto;
  font-size: 11rem;
  color: rgba(0, 210, 255, 0.04);
  font-style: italic;
  font-weight: 900;
  user-select: none;
  transform: rotate(-5deg);
}

/* ================= MAIN TWO-COLUMN STAGE ================= */
.p3r-stage {
  position: relative;
  z-index: 10;
  display: flex;
  gap: 3vw;
  width: 92%;
  max-width: 1700px;
  margin: 0 auto;
  height: 100vh;
  padding-top: 65px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.p3r-stage.enter {
  opacity: 1;
  transform: translateY(0);
}

/* ================= LEFT INTERACTIVE PANEL ================= */
.panel {
  flex: 1.15;
  height: calc(100vh - 85px);
  overflow-y: scroll !important;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding-right: 15px;
  padding-bottom: 50px;
  box-sizing: border-box;
  scrollbar-width: none;
}

.panel::-webkit-scrollbar {
  width: 0px !important;
  background: transparent !important;
}

/* ================= HEADER ================= */
.top-header {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-ribbon {
  background: var(--p3r-white);
  color: var(--p3r-navy-bg);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 14px;
  font-size: 0.72rem;
  letter-spacing: 2px;
  transform: skewX(-12deg);
  margin-bottom: 8px;
  font-weight: 900;
  box-shadow: -3px 3px 0px var(--p3r-magenta);
}

.ribbon-icon {
  color: var(--p3r-magenta);
}

.title-wrap {
  display: flex;
  align-items: baseline;
  gap: 16px;
  transform: skewX(-5deg);
}

.main-title {
  font-size: clamp(3.2rem, 5.5vw, 4.8rem);
  margin: 0;
  line-height: 0.9;
  font-style: italic;
  color: var(--p3r-white);
  text-shadow: 4px 4px 0px var(--p3r-blue), -2px -2px 0px var(--p3r-magenta);
  letter-spacing: -1px;
}

.jp-title {
  font-size: 1.5rem;
  color: var(--p3r-blue);
  font-weight: 900;
  letter-spacing: 3px;
  opacity: 0.85;
}

.subtitle {
  margin: 6px 0 0 0;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--p3r-blue);
  letter-spacing: 1.5px;
}

/* ================= TACTICAL TAB SWITCHER ================= */
.p3r-tab-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(6, 14, 32, 0.85);
  border: 2px solid rgba(0, 210, 255, 0.35);
  color: var(--p3r-white);
  font-family: var(--p3r-font);
  font-size: 0.85rem;
  padding: 7px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transform: skewX(-10deg);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -3px 3px 0px rgba(0, 0, 0, 0.8);
}

.tab-btn:hover {
  border-color: var(--p3r-blue);
  background: rgba(12, 28, 64, 0.95);
  transform: skewX(-10deg) translateY(-2px);
  box-shadow: -4px 4px 0px var(--p3r-magenta);
}

.tab-btn.active {
  background: var(--p3r-blue);
  color: var(--p3r-navy-bg);
  border-color: var(--p3r-white);
  box-shadow: -5px 5px 0px var(--p3r-magenta);
  transform: skewX(-10deg) translateY(-2px);
}

.tab-idx {
  font-size: 0.72rem;
  font-family: monospace;
  font-weight: 900;
  opacity: 0.8;
}

.tab-label {
  font-weight: 900;
  letter-spacing: 1px;
}

.tab-sub {
  font-size: 0.68rem;
  font-weight: normal;
  opacity: 0.85;
}

.tab-indicator {
  font-size: 0.65rem;
  color: var(--p3r-magenta);
}

/* ================= P3R CARDS ================= */
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: tabFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateX(-15px) skewX(-4deg); }
  to { opacity: 1; transform: translateX(0) skewX(-4deg); }
}

.p3r-card {
  position: relative;
  background: var(--p3r-card-bg);
  border: 2px solid rgba(0, 210, 255, 0.4);
  border-left: 5px solid var(--p3r-blue);
  padding: 18px 22px;
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.95), 0 0 16px rgba(0, 210, 255, 0.15);
  backdrop-filter: blur(10px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(0, 210, 255, 0.25);
  padding-bottom: 6px;
}

.card-icon {
  color: var(--p3r-blue);
  font-size: 0.8rem;
}

.card-title {
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: 1px;
  color: var(--p3r-white);
  font-style: italic;
}

/* ================= COMBAT CORE CARD ================= */
.combat-core-card {
  border-color: var(--p3r-blue);
  border-left: 6px solid var(--p3r-magenta);
}

.card-bg-accent-slash {
  position: absolute;
  top: 0; right: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(0, 210, 255, 0.08) 100%);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
  pointer-events: none;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.combat-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.sees-insignia {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-magenta);
  font-weight: 900;
  letter-spacing: 1px;
}

.arcana-badge {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-blue);
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid var(--p3r-blue);
  padding: 1px 8px;
  transform: skewX(-8deg);
  font-weight: bold;
}

.condition-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid var(--p3r-hp-green);
  padding: 2px 10px;
  transform: skewX(-8deg);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 900;
}

.condition-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--p3r-hp-green);
  box-shadow: 0 0 8px var(--p3r-hp-green);
  animation: pulseGlow 1.5s infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.condition-lbl { color: var(--p3r-white); }
.condition-val { color: var(--p3r-hp-green); }

.operator-headline {
  margin: 6px 0 4px 0;
}

.user-name {
  margin: 0;
  font-size: clamp(1.8rem, 3.2vw, 2.4rem);
  line-height: 1;
  font-style: italic;
  letter-spacing: 0px;
  color: var(--p3r-white);
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 210, 255, 0.4);
}

.user-role {
  font-family: monospace;
  font-weight: 900;
  font-size: 0.76rem;
  color: var(--p3r-blue);
  letter-spacing: 1px;
  margin: 4px 0 8px 0;
}

.user-brief {
  font-family: sans-serif;
  font-size: 0.78rem;
  line-height: 1.45;
  color: #c8e2ff;
  margin: 0 0 14px 0;
}

/* ================= HP & SP GAUGES ================= */
.combat-gauges {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0;
  background: rgba(3, 7, 18, 0.9);
  border: 1px solid rgba(0, 210, 255, 0.35);
  border-left: 4px solid var(--p3r-blue);
  padding: 10px 14px;
}

.gauge-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gauge-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.gauge-lbl {
  font-family: var(--p3r-font);
  font-size: 1rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: 1px;
}

.hp-row .gauge-lbl { color: var(--p3r-hp-green); text-shadow: 0 0 10px rgba(0, 255, 136, 0.8); }
.sp-row .gauge-lbl { color: var(--p3r-blue); text-shadow: 0 0 10px rgba(0, 210, 255, 0.8); }

.gauge-val {
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
}
.gauge-val small { color: rgba(255, 255, 255, 0.5); font-size: 0.72rem; }

.gauge-bar-frame {
  height: 13px;
  background: rgba(4, 8, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  position: relative;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.hp-fill {
  background: repeating-linear-gradient(90deg, #00ff88 0px, #00ff88 8px, #004d26 8px, #004d26 10px);
  box-shadow: 0 0 12px rgba(0, 255, 136, 0.7);
}

.sp-fill {
  background: repeating-linear-gradient(90deg, #00d2ff 0px, #00d2ff 8px, #003352 8px, #003352 10px);
  box-shadow: 0 0 12px rgba(0, 210, 255, 0.7);
}

.gauge-glare, .bar-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, transparent 65%);
}

.level-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  gap: 15px;
  flex-wrap: wrap;
}

.level-badge {
  background: var(--p3r-magenta);
  color: var(--p3r-white);
  display: inline-flex;
  align-items: baseline;
  padding: 3px 14px;
  transform: skewX(-10deg);
  border: 2px solid var(--p3r-white);
  box-shadow: -4px 4px 0px #040814;
}

.level-badge .lbl { font-size: 0.85rem; margin-right: 5px; font-weight: 900; font-style: italic; }
.level-badge .val { font-size: 1.5rem; font-weight: 900; line-height: 1; font-style: italic; }
.level-badge .sub-lbl { font-size: 0.75rem; color: var(--p3r-gold); margin-left: 5px; font-weight: 900; font-style: italic; }

.exp-counter {
  flex: 1;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.exp-title {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-blue);
  font-weight: 900;
  letter-spacing: 1px;
}

.exp-num {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 900;
  color: #ffffff;
}

.exp-bar {
  height: 6px;
  background: rgba(3, 7, 18, 0.9);
  border: 1px solid rgba(0, 210, 255, 0.4);
  overflow: hidden;
}

.exp-bar-fill {
  height: 100%;
  background: var(--p3r-magenta);
  box-shadow: 0 0 8px var(--p3r-magenta);
}

/* ================= COMBAT PARAMETERS (St/Ma/En/Ag/Lu) ================= */
.params-grid {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(3, 7, 18, 0.85);
  border: 1px solid rgba(0, 210, 255, 0.25);
  padding: 6px 12px;
}

.param-badge {
  display: flex;
  align-items: baseline;
  gap: 4px;
  background: var(--color);
  color: #040814;
  padding: 2px 8px;
  transform: skewX(-10deg);
  font-family: var(--p3r-font);
  font-weight: 900;
  min-width: 44px;
  justify-content: center;
}

.param-abbr { font-size: 0.95rem; font-style: italic; }
.param-kanji { font-size: 0.75rem; }

.param-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.param-name-wrap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.param-label {
  font-family: 'Impact', sans-serif;
  font-style: italic;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.param-score {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 900;
  color: var(--p3r-blue);
}

.param-bar-bg {
  height: 8px;
  background: rgba(4, 8, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
}

.param-bar-fill {
  height: 100%;
  position: relative;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 8px currentColor;
}

/* ================= TAB 2: PERSONA & SKILLS ================= */
.persona-hero-card {
  border-left: 6px solid var(--p3r-gold);
}

.persona-dossier {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.persona-name-plate {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.persona-rank {
  background: var(--p3r-gold);
  color: #040814;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 900;
  transform: skewX(-10deg);
}

.persona-title {
  margin: 0;
  font-size: 1.6rem;
  font-style: italic;
  color: #ffffff;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
}
.persona-title small { font-size: 0.85rem; color: var(--p3r-blue); }

.persona-arcana-tag {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--p3r-blue);
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid var(--p3r-blue);
  padding: 2px 8px;
}

.persona-lore {
  font-family: sans-serif;
  font-size: 0.76rem;
  line-height: 1.45;
  color: #d2e7ff;
  margin: 0;
}

/* 8-Slot Persona Skill Deck */
.skills-deck {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.skill-slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(3, 7, 18, 0.9);
  border: 1px solid rgba(0, 210, 255, 0.3);
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-slot:hover, .skill-slot.active {
  border-color: var(--p3r-blue);
  background: rgba(14, 32, 70, 0.95);
  box-shadow: -4px 4px 0px var(--p3r-magenta), 0 0 12px rgba(0, 210, 255, 0.3);
  transform: translateX(4px);
}

.skill-slot-header {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.skill-index {
  font-family: monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
}

.affinity-pill {
  font-family: var(--p3r-font);
  font-size: 0.65rem;
  font-style: italic;
  padding: 1px 6px;
  transform: skewX(-10deg);
  font-weight: 900;
  color: #040814;
}

.affinity-slash { background: #ff3366; }
.affinity-fire { background: #ff7700; color: #fff; }
.affinity-elec { background: #ffee00; }
.affinity-wind { background: #00ffaa; }
.affinity-ice { background: #00d2ff; }
.affinity-light { background: #ffffff; }
.affinity-dark { background: #a855f7; color: #fff; }
.affinity-passive { background: #718096; color: #fff; }

.skill-name-txt {
  font-family: var(--p3r-font);
  font-size: 0.85rem;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-cost-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: monospace;
  font-size: 0.65rem;
  line-height: 1.1;
}
.cost-lbl { color: var(--p3r-blue); }
.cost-val { color: #ffffff; font-weight: 900; }

.skill-detail-inspector {
  background: rgba(3, 7, 18, 0.95);
  border: 1px solid var(--p3r-blue);
  border-left: 5px solid var(--p3r-magenta);
  padding: 12px 14px;
}

.inspector-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}

.detail-affinity {
  font-family: var(--p3r-font);
  font-size: 0.8rem;
  font-weight: 900;
}

.detail-name {
  font-size: 1.1rem;
  font-style: italic;
  color: #ffffff;
}

.detail-tier {
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--p3r-gold);
  margin-left: auto;
  font-weight: 900;
}

.detail-desc {
  font-family: sans-serif;
  font-size: 0.78rem;
  color: #d0e4ff;
  line-height: 1.4;
  margin: 0 0 8px 0;
}

.detail-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.detail-tag {
  font-family: monospace;
  font-size: 0.68rem;
  background: rgba(0, 210, 255, 0.15);
  border: 1px solid rgba(0, 210, 255, 0.4);
  color: var(--p3r-blue);
  padding: 1px 6px;
}

/* ================= TAB 3: LOADOUT ================= */
.gear-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.gear-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(3, 7, 18, 0.85);
  border: 1px solid rgba(0, 210, 255, 0.25);
  padding: 8px 12px;
}

.gear-slot-tag {
  font-family: var(--p3r-font);
  font-size: 0.72rem;
  background: var(--p3r-magenta);
  color: #ffffff;
  padding: 2px 8px;
  transform: skewX(-10deg);
  min-width: 90px;
  text-align: center;
}

.gear-info {
  flex: 1;
}

.gear-name {
  margin: 0;
  font-size: 0.95rem;
  font-style: italic;
  color: #ffffff;
}

.gear-desc {
  margin: 2px 0 0 0;
  font-family: sans-serif;
  font-size: 0.72rem;
  color: #a0c4f0;
}

.gear-stat-badge {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 900;
  color: var(--p3r-gold);
  background: rgba(255, 238, 0, 0.12);
  border: 1px solid var(--p3r-gold);
  padding: 3px 8px;
  white-space: nowrap;
}

.tech-group {
  margin-bottom: 14px;
}

.group-title {
  margin: 0 0 6px 0;
  font-size: 0.88rem;
  font-style: italic;
  color: var(--p3r-blue);
  display: flex;
  align-items: center;
  gap: 6px;
}

.group-dot {
  font-size: 0.65rem;
  color: var(--p3r-magenta);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.p3r-tag {
  background: rgba(4, 8, 20, 0.9);
  color: #ffffff;
  border: 1px solid rgba(0, 210, 255, 0.35);
  border-left: 3px solid var(--p3r-magenta);
  padding: 4px 10px;
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: bold;
  transform: skewX(-6deg);
  transition: all 0.2s ease;
  cursor: default;
}

.p3r-tag:hover {
  background: var(--p3r-blue);
  color: var(--p3r-navy-bg);
  border-color: #ffffff;
  box-shadow: -3px 3px 0px var(--p3r-magenta);
  transform: skewX(-6deg) translateY(-2px);
}

/* ================= TAB 4: DOSSIER ================= */
.dossier-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  background: rgba(3, 7, 18, 0.85);
  border: 1px solid rgba(0, 210, 255, 0.25);
  padding: 6px 10px;
}

.meta-k {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-blue);
  font-weight: 900;
}

.meta-v {
  font-family: sans-serif;
  font-size: 0.82rem;
  color: #ffffff;
  font-weight: bold;
}

.active-status {
  color: var(--p3r-hp-green);
}

.dossier-story-box {
  background: rgba(3, 7, 18, 0.9);
  border-left: 4px solid var(--p3r-blue);
  padding: 12px 14px;
  margin-bottom: 14px;
}

.story-title {
  margin: 0 0 6px 0;
  font-size: 0.88rem;
  font-style: italic;
  color: var(--p3r-blue);
  letter-spacing: 1px;
}

.story-text {
  font-family: sans-serif;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #d0e4ff;
  margin: 0;
}

.social-links-deck {
  margin-bottom: 16px;
}

.social-btn-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.p3r-action-pill {
  background: rgba(6, 14, 32, 0.9);
  border: 1px solid var(--p3r-blue);
  border-left: 3px solid var(--p3r-magenta);
  color: #ffffff;
  text-decoration: none;
  font-family: monospace;
  font-size: 0.78rem;
  font-weight: 900;
  padding: 6px 14px;
  transform: skewX(-8deg);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.p3r-action-pill:hover {
  background: var(--p3r-blue);
  color: var(--p3r-navy-bg);
  box-shadow: -4px 4px 0px var(--p3r-magenta);
  transform: skewX(-8deg) translateY(-2px);
}

.inspect-full-btn {
  width: 100%;
  background: var(--p3r-magenta);
  border: 2px solid var(--p3r-white);
  color: #ffffff;
  font-family: var(--p3r-font);
  font-size: 0.95rem;
  padding: 10px;
  cursor: pointer;
  transform: skewX(-6deg);
  letter-spacing: 1px;
  transition: all 0.2s ease;
  box-shadow: -5px 5px 0px #040814;
}

.inspect-full-btn:hover {
  background: var(--p3r-white);
  color: var(--p3r-navy-bg);
  box-shadow: -7px 7px 0px var(--p3r-blue);
  transform: skewX(-6deg) translateY(-2px);
}

/* ================= RIGHT HERO SHOWCASE ================= */
.hero-showcase {
  flex: 0.85;
  height: calc(100vh - 85px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

/* Floating Persona 3 Shards */
.p3r-shard {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.45), rgba(255, 0, 85, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 2;
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
}

.shard-1 {
  top: 6%; right: 10%;
  width: 45px; height: 75px;
  clip-path: polygon(0 0, 100% 30%, 80% 100%, 10% 80%);
  animation: shardFloat 6s ease-in-out infinite alternate;
}

.shard-2 {
  bottom: 22%; left: 6%;
  width: 35px; height: 60px;
  clip-path: polygon(20% 0, 100% 10%, 70% 100%, 0% 70%);
  animation: shardFloat 7s ease-in-out infinite alternate-reverse;
}

.shard-3 {
  top: 35%; right: 2%;
  width: 25px; height: 45px;
  clip-path: polygon(0 20%, 100% 0, 80% 100%, 20% 90%);
  animation: shardFloat 5s ease-in-out infinite alternate;
}

@keyframes shardFloat {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-18px) rotate(8deg); }
}

/* Arcana watermark card */
.arcana-display-card {
  position: absolute;
  top: 5%;
  right: 8%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  user-select: none;
  z-index: 1;
  opacity: 0.75;
}

.arcana-num {
  font-size: 3.8rem;
  line-height: 0.85;
  color: rgba(0, 210, 255, 0.3);
  font-style: italic;
  font-weight: 900;
}

.arcana-name {
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: var(--p3r-white);
  text-shadow: 2px 2px 0px var(--p3r-blue);
  font-style: italic;
}

.arcana-kanji {
  font-size: 1.8rem;
  color: var(--p3r-magenta);
  font-weight: 900;
  line-height: 1;
}

/* Hero Portrait Stage */
.hero-portrait-stage {
  position: relative;
  width: clamp(240px, 24vw, 360px);
  aspect-ratio: 3 / 4;
  cursor: pointer;
  transform: skewX(-4deg) rotate(-2deg);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 5;
}

.hero-portrait-stage:hover {
  transform: skewX(-4deg) rotate(0deg) scale(1.03);
}

.hero-portrait-stage:hover .portrait-shadow-magenta {
  transform: translate(14px, 14px);
}

.portrait-shadow-cyan {
  position: absolute;
  inset: -6px;
  background: var(--p3r-blue);
  z-index: 1;
  transform: translate(-8px, -8px);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.6);
}

.portrait-shadow-magenta {
  position: absolute;
  inset: -6px;
  background: var(--p3r-magenta);
  z-index: 0;
  transform: translate(10px, 10px);
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.5);
}

.portrait-frame {
  position: relative;
  width: 100%;
  height: 100%;
  background: #040814;
  border: 4px solid var(--p3r-white);
  overflow: hidden;
  z-index: 2;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: contrast(1.1) brightness(1.05);
  transition: transform 0.4s ease;
}

.hero-portrait-stage:hover .hero-img {
  transform: scale(1.05);
}

.portrait-scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.25) 2px,
    rgba(0, 0, 0, 0.25) 4px
  );
  pointer-events: none;
}

.portrait-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

/* S.E.E.S. Armband Ribbon */
.sees-armband-ribbon {
  position: absolute;
  bottom: 24px;
  left: -18px;
  background: var(--p3r-magenta);
  color: #ffffff;
  padding: 4px 14px;
  font-family: var(--p3r-font);
  font-size: 0.82rem;
  letter-spacing: 1.5px;
  border: 2px solid #ffffff;
  box-shadow: -4px 4px 0px #040814;
  transform: skewX(-12deg);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sees-star { color: var(--p3r-gold); font-size: 0.85rem; }

/* Corner Brackets */
.bracket-tl, .bracket-br {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid var(--p3r-white);
  z-index: 10;
  pointer-events: none;
}

.bracket-tl { top: -10px; left: -10px; border-right: none; border-bottom: none; }
.bracket-br { bottom: -10px; right: -10px; border-left: none; border-top: none; }

.hero-hud-tag {
  position: absolute;
  top: -16px;
  right: -10px;
  background: var(--p3r-navy-bg);
  border: 1px solid var(--p3r-blue);
  color: var(--p3r-blue);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 900;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  transform: skewX(-8deg);
}

.hud-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--p3r-blue);
  box-shadow: 0 0 6px var(--p3r-blue);
}

/* Tactical banner below hero */
.hero-tactical-banner {
  margin-top: 24px;
  width: clamp(240px, 24vw, 360px);
  background: rgba(3, 7, 18, 0.9);
  border: 2px solid rgba(0, 210, 255, 0.4);
  border-left: 5px solid var(--p3r-blue);
  padding: 12px 14px;
  transform: skewX(-4deg);
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.9);
}

.banner-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px dashed rgba(0, 210, 255, 0.2);
  padding: 4px 0;
}

.b-lbl {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--p3r-blue);
  font-weight: 900;
}

.b-val {
  font-family: var(--p3r-font);
  font-style: italic;
  font-size: 0.82rem;
  color: #ffffff;
}

.banner-action-btn {
  width: 100%;
  margin-top: 10px;
  background: var(--p3r-blue);
  border: 1px solid var(--p3r-white);
  color: var(--p3r-navy-bg);
  font-family: var(--p3r-font);
  font-size: 0.85rem;
  font-weight: 900;
  padding: 6px;
  cursor: pointer;
  letter-spacing: 1px;
  transform: skewX(-6deg);
  transition: all 0.2s ease;
}

.banner-action-btn:hover {
  background: var(--p3r-magenta);
  color: #ffffff;
  box-shadow: -4px 4px 0px #040814;
}

/* ================= FULL-SCREEN TARTARUS MODAL ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(14px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.p3r-modal-window {
  position: relative;
  width: 1050px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--p3r-navy-bg);
  border: 4px solid var(--p3r-white);
  box-shadow: -18px 18px 0px var(--p3r-blue), 0 0 35px rgba(0, 210, 255, 0.35);
  transform: rotate(-1.5deg);
}

.p3r-close-btn {
  position: absolute;
  top: -44px; right: -4px;
  background: var(--p3r-magenta);
  border: 3px solid var(--p3r-white);
  border-bottom: none;
  color: var(--p3r-white);
  font-family: var(--p3r-font);
  font-size: 1rem;
  padding: 6px 24px;
  cursor: pointer;
  transform: skewX(-10deg);
  transition: background 0.2s, color 0.2s;
}

.p3r-close-btn:hover {
  background: var(--p3r-white);
  color: var(--p3r-navy-bg);
}

.modal-layout {
  padding: 36px;
  display: flex;
  gap: 36px;
}

.modal-portrait-deck {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-portrait-deck .portrait-frame {
  aspect-ratio: 3 / 4;
  background: var(--p3r-dark-blue);
  width: 100%;
  position: relative;
  border: 3px solid var(--p3r-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-img {
  width: 85%;
  height: 85%;
  object-fit: cover;
  border: 3px solid var(--p3r-white);
  z-index: 2;
  transform: rotate(2deg) scale(1.05);
  object-position: top center;
}

.hud-tag {
  position: absolute;
  bottom: 8px; left: 8px;
  background: var(--p3r-navy-bg);
  color: var(--p3r-blue);
  font-family: monospace;
  font-size: 0.65rem;
  padding: 2px 6px;
  z-index: 3;
  border: 1px solid var(--p3r-blue);
}

.portrait-telemetry {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(3, 7, 18, 0.9);
  border-left: 3px solid var(--p3r-magenta);
  padding: 6px 10px;
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--p3r-blue);
}

.modal-info-deck {
  flex: 1.4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.category-pill {
  background: var(--p3r-blue);
  color: var(--p3r-navy-bg);
  display: inline-block;
  padding: 3px 12px;
  font-size: 0.75rem;
  font-weight: 900;
  transform: skewX(-8deg);
}

.modal-name {
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 6px 0;
  line-height: 1;
  color: var(--p3r-white);
  text-shadow: 3px 3px 0px var(--p3r-magenta);
}

.sub-labels {
  display: flex;
  gap: 12px;
  font-family: monospace;
  font-size: 0.78rem;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.cyan-txt { color: var(--p3r-blue); }
.magenta-txt { color: var(--p3r-magenta); }
.yellow-txt { color: var(--p3r-gold); }

.modal-data-block {
  margin: 12px 0;
  padding: 10px 12px;
  background: rgba(0, 210, 255, 0.06);
  border-left: 3px solid var(--p3r-blue);
  font-family: monospace;
}

.data-row {
  display: flex;
  margin-bottom: 4px;
}

.d-key {
  width: 120px;
  color: var(--p3r-blue);
  font-weight: bold;
  font-size: 0.8rem;
}

.d-val {
  color: var(--p3r-white);
  font-size: 0.8rem;
}

.body-title {
  color: var(--p3r-blue);
  font-size: 1.1rem;
  margin: 0 0 6px 0;
  font-style: italic;
}

.body-desc {
  font-family: sans-serif;
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
}

.modal-social-links {
  margin-top: 16px;
  border-top: 1px solid rgba(0, 210, 255, 0.2);
  padding-top: 12px;
}

.p3r-tag.link {
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
}

.status-code {
  margin-top: 14px;
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--p3r-blue);
  border-top: 1px dashed rgba(0, 210, 255, 0.3);
  padding-top: 8px;
}

/* ================= MODAL TRANSITIONS ================= */
.p3r-modal-enter-active, .p3r-modal-leave-active {
  transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}
.p3r-modal-enter-active .p3r-modal-window {
  animation: p3rSlashIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.p3r-modal-leave-active .p3r-modal-window {
  animation: p3rSlashIn 0.2s cubic-bezier(0.25, 1, 0.5, 1) reverse forwards;
}
.p3r-modal-enter-from, .p3r-modal-leave-to { opacity: 0; }

@keyframes p3rSlashIn {
  0% { transform: scale(0.85) rotate(-6deg) translateY(40px); opacity: 0; }
  100% { transform: scale(1) rotate(-1.5deg) translateY(0); opacity: 1; }
}

/* ================= RESPONSIVE VIEWPORTS ================= */
@media (max-width: 1200px) {
  .p3r-stage {
    gap: 20px;
    width: 95%;
  }
  .hero-showcase {
    flex: 0.75;
  }
}

@media (max-width: 900px) {
  .p3r-theme {
    overflow-y: auto !important;
    height: auto;
  }
  
  .p3r-stage {
    flex-direction: column-reverse;
    height: auto;
    padding-top: 80px;
    padding-bottom: 60px;
    width: 92%;
  }

  .panel {
    flex: none;
    width: 100%;
    height: auto;
    overflow-y: visible !important;
    padding-right: 0;
  }

  .hero-showcase {
    flex: none;
    width: 100%;
    height: auto;
    margin-bottom: 25px;
  }

  .hero-portrait-stage {
    width: 220px;
  }

  .hero-tactical-banner {
    width: 100%;
    max-width: 360px;
  }

  .arcana-display-card {
    display: none;
  }

  .skills-deck {
    grid-template-columns: 1fr;
  }

  .dossier-meta-grid {
    grid-template-columns: 1fr;
  }

  .modal-layout {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  .p3r-close-btn {
    top: -40px; right: 0;
    transform: none;
  }
}

@media (max-width: 500px) {
  .main-title {
    font-size: 2.8rem;
  }
  .title-wrap {
    flex-direction: column;
    gap: 2px;
  }
  .tab-btn {
    font-size: 0.78rem;
    padding: 6px 12px;
  }
}
</style>