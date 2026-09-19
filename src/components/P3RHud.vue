<template>
  <aside class="p3r-hud" :class="{ 'dark-hour-active': isDarkHour }">
    <!-- CALENDAR HUD MATRIX -->
    <div class="hud-frame">
      <!-- DATE SECTOR -->
      <div class="hud-date-sector">
        <div class="calendar-badge">
          <span class="month-day">{{ formattedDate }}</span>
          <span class="day-of-week" :class="dayOfWeekClass">{{ dayOfWeek }}</span>
        </div>
        <div class="time-period-tag" @click="toggleDarkHour" title="Click to trigger Dark Hour">
          <span class="period-dot">●</span>
          <span class="period-text">{{ isDarkHour ? 'DARK HOUR 影時間' : timePeriod }}</span>
        </div>
      </div>

      <!-- MOON PHASE SECTOR -->
      <div class="hud-moon-sector" @click="toggleDarkHour">
        <div class="moon-halo"></div>
        <div class="moon-glyph" :class="`phase-${moonPhaseIndex}`">
          <svg viewBox="0 0 100 100" class="moon-svg">
            <circle cx="50" cy="50" r="44" class="moon-base" />
            <path :d="moonPath" class="moon-lit" />
          </svg>
        </div>
        <div class="moon-telemetry">
          <span class="moon-phase-name">{{ moonPhaseName }}</span>
          <span class="moon-sub-tag">{{ isDarkHour ? 'TARTARUS UNLOCKED' : 'SEES // TELEMETRY' }}</span>
        </div>
      </div>
    </div>

    <!-- TARTARUS DARK HOUR GLITCH OVERLAY (WHEN ACTIVE) -->
    <div v-if="isDarkHour" class="dark-hour-screen-tint"></div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { playClick } from '../utils/sound'

const now = ref(new Date())
const isDarkHour = ref(false)
let timer: number | null = null

function updateClock() {
  now.value = new Date()
}

onMounted(() => {
  timer = window.setInterval(updateClock, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const formattedDate = computed(() => {
  const m = now.value.getMonth() + 1
  const d = now.value.getDate()
  return `${m}/${d}`
})

const dayOfWeek = computed(() => {
  return days[now.value.getDay()]
})

const dayOfWeekClass = computed(() => {
  const day = now.value.getDay()
  if (day === 0) return 'is-sun'
  if (day === 6) return 'is-sat'
  return 'is-weekday'
})

const timePeriod = computed(() => {
  const hr = now.value.getHours()
  if (hr >= 6 && hr < 12) return 'MORNING 朝'
  if (hr >= 12 && hr < 16) return 'AFTER SCHOOL 放課後'
  if (hr >= 16 && hr < 20) return 'AFTER SCHOOL 夕方'
  if (hr >= 20 && hr < 24) return 'EVENING 夜'
  return 'LATE NIGHT 深夜'
})

// Moon phase calculation based on lunar cycle (~29.53 days)
const moonPhaseIndex = computed(() => {
  // Approximate lunar age
  const year = now.value.getFullYear()
  const month = now.value.getMonth() + 1
  const day = now.value.getDate()
  const c = Math.floor(365.25 * year)
  const e = Math.floor(30.6 * month)
  const jd = c + e + day - 694039.09 // Julian day roughly
  const b = jd / 29.5305882
  const phase = (b - Math.floor(b)) * 8
  return Math.floor(phase) & 7
})

const moonPhases = [
  'NEW MOON',
  'WAXING CRESCENT',
  'FIRST QUARTER',
  'WAXING GIBBOUS',
  'FULL MOON',
  'WANING GIBBOUS',
  'LAST QUARTER',
  'WANING CRESCENT'
]

const moonPhaseName = computed(() => {
  if (isDarkHour.value) return 'FULL MOON 満月'
  return moonPhases[moonPhaseIndex.value] || 'FULL MOON'
})

// Dynamic SVG curve for moon phase visual
const moonPath = computed(() => {
  const p = isDarkHour.value ? 4 : moonPhaseIndex.value
  switch (p) {
    case 0: return 'M 50 6 A 44 44 0 0 1 50 94 A 44 44 0 0 1 50 6' // New Moon outline
    case 1: return 'M 50 6 A 44 44 0 0 1 50 94 A 20 44 0 0 0 50 6' // Crescent
    case 2: return 'M 50 6 A 44 44 0 0 1 50 94 Z' // Quarter
    case 3: return 'M 50 6 A 44 44 0 0 1 50 94 A 20 44 0 0 1 50 6' // Gibbous
    case 4: return 'M 50 6 A 44 44 0 1 1 49.99 6 Z' // Full Moon
    case 5: return 'M 50 6 A 44 44 0 0 0 50 94 A 20 44 0 0 0 50 6'
    case 6: return 'M 50 6 A 44 44 0 0 0 50 94 Z'
    default: return 'M 50 6 A 44 44 0 0 0 50 94 A 20 44 0 0 1 50 6'
  }
})

function toggleDarkHour() {
  playClick()
  isDarkHour.value = !isDarkHour.value
  if (isDarkHour.value) {
    document.body.classList.add('p3r-dark-hour')
  } else {
    document.body.classList.remove('p3r-dark-hour')
  }
}
</script>

<style scoped>
.p3r-hud {
  position: fixed;
  top: 24px;
  right: 28px;
  z-index: 998;
  user-select: none;
  font-family: 'Impact', 'Arial Black', sans-serif;
  pointer-events: auto;
}

/* ============= P3R ANGLED HUD FRAME ============= */
.hud-frame {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(3, 8, 24, 0.92) 0%, rgba(10, 24, 60, 0.88) 100%);
  border: 2px solid #00d2ff;
  padding: 6px 18px 6px 14px;
  transform: skewX(-12deg);
  box-shadow: -6px 6px 0px rgba(4, 8, 20, 0.95),
              0 0 15px rgba(0, 210, 255, 0.3);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hud-frame:hover {
  transform: skewX(-12deg) scale(1.03);
  border-color: #ff0055;
  box-shadow: -8px 8px 0px rgba(4, 8, 20, 0.95),
              0 0 20px rgba(255, 0, 85, 0.5);
}

/* ============= DATE SECTOR ============= */
.hud-date-sector {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.calendar-badge {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.month-day {
  font-size: 2.2rem;
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -1px;
  text-shadow: 2px 2px 0px #040814;
}

.day-of-week {
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 900;
  padding: 1px 7px;
  background: #00d2ff;
  color: #040814;
  transform: skewX(-6deg);
  display: inline-block;
  box-shadow: -2px 2px 0px #040814;
}

.day-of-week.is-sun {
  background: #ff0055;
  color: #ffffff;
}

.day-of-week.is-sat {
  background: #00d2ff;
  color: #040814;
}

.time-period-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 1px;
  color: #00d2ff;
  text-transform: uppercase;
}

.period-dot {
  color: #ff0055;
  font-size: 0.55rem;
  animation: p3rBlink 1.2s infinite ease-in-out;
}

@keyframes p3rBlink {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #ff0055); }
  50% { opacity: 0.2; }
}

/* ============= MOON PHASE SECTOR ============= */
.hud-moon-sector {
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 2px solid rgba(0, 210, 255, 0.4);
  padding-left: 14px;
}

.moon-glyph {
  width: 36px;
  height: 36px;
  position: relative;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.moon-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-15deg);
}

.moon-base {
  fill: #0c1830;
  stroke: #00d2ff;
  stroke-width: 2.5;
}

.moon-lit {
  fill: #ffee66;
  filter: drop-shadow(0 0 4px rgba(255, 238, 102, 0.8));
}

.moon-telemetry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.moon-phase-name {
  font-size: 0.85rem;
  font-style: italic;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.moon-sub-tag {
  font-family: monospace;
  font-size: 0.55rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: rgba(0, 210, 255, 0.6);
}

/* ============= DARK HOUR ACTIVATION STYLES ============= */
.dark-hour-active .hud-frame {
  border-color: #00ff66;
  box-shadow: -6px 6px 0px rgba(0, 20, 10, 0.95),
              0 0 25px rgba(0, 255, 102, 0.6);
  animation: tartarusPulse 2s infinite ease-in-out;
}

.dark-hour-active .moon-lit {
  fill: #00ff66;
  filter: drop-shadow(0 0 8px rgba(0, 255, 102, 0.9));
}

.dark-hour-active .month-day {
  color: #00ff66;
  text-shadow: 2px 2px 0px #021a0a;
}

.dark-hour-active .day-of-week {
  background: #00ff66;
  color: #000000;
}

.dark-hour-active .time-period-tag {
  color: #00ff66;
}

.dark-hour-active .period-dot {
  color: #ffee00;
}

@keyframes tartarusPulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25) contrast(1.1); }
}

.dark-hour-screen-tint {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 900;
  background: radial-gradient(circle at 80% 20%, rgba(0, 255, 102, 0.08) 0%, rgba(0, 15, 8, 0.4) 100%);
  mix-blend-mode: color-dodge;
  animation: tartarusGlitch 0.4s infinite alternate;
}

@keyframes tartarusGlitch {
  0% { opacity: 0.85; }
  100% { opacity: 1; }
}

/* ============= MOBILE BREAKPOINTS ============= */
@media (max-width: 768px) {
  .p3r-hud {
    top: 12px;
    right: 12px;
  }

  .hud-frame {
    padding: 4px 10px;
    gap: 8px;
    transform: skewX(-6deg);
  }

  .month-day {
    font-size: 1.5rem;
  }

  .day-of-week {
    font-size: 0.85rem;
    padding: 0 4px;
  }

  .moon-glyph {
    width: 26px;
    height: 26px;
  }

  .moon-telemetry,
  .time-period-tag {
    display: none;
  }
}
</style>
