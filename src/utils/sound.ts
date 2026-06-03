import hoverSoundUrl from '../assets/sounds/hover.wav'
import clickSoundUrl from '../assets/sounds/click.wav'
import switchToggle from '../assets/sounds/switch_toggle.wav'

const hoverAudio = new Audio(hoverSoundUrl)
hoverAudio.volume = 0.35
hoverAudio.preload = 'auto'

const clickAudio = new Audio(clickSoundUrl)
clickAudio.volume = 0.6
clickAudio.preload = 'auto'

const switchToggleAudio = new Audio(switchToggle)
switchToggleAudio.volume = 0.6
switchToggleAudio.preload = 'auto'

let lastHover = 0
const THROTTLE = 120

export function playHover(isMobile: boolean) {
  if (isMobile) return

  const now = Date.now()
  if (now - lastHover < THROTTLE) return

  lastHover = now
  hoverAudio.pause()
  hoverAudio.currentTime = 0
  hoverAudio.play().catch(() => {})
}

export function playClick() {
  clickAudio.currentTime = 0
  clickAudio.play().catch(() => {})
}

export function playSwitchToggle() {
  switchToggleAudio.currentTime = 0
  switchToggleAudio.play().catch(() => {})
}