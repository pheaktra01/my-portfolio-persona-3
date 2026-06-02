import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null as HTMLAudioElement | null,
    muted: true,
    started: false
  }),

  actions: {
    init(src: string) {
      if (this.started) return

      this.audio = new Audio(src)
      this.audio.loop = true
      this.audio.volume = 0.5

      const saved = localStorage.getItem('audioMuted')
      this.muted = saved === '1'

      this.audio.muted = this.muted
      this.started = true

      // try play immediately (like your current tryAutoplay)
      this.audio.play().catch(() => {})

      // unlock on first interaction (like your resumePlaybackAfterGesture)
      this.unlock()
    },

    unlock() {
      const handler = () => {
        if (!this.audio) return

        if (!this.muted) {
          this.audio.play().catch(() => {})
        }

        window.removeEventListener('pointerdown', handler)
      }

      window.addEventListener('pointerdown', handler)
    },

    toggleMute() {
      if (!this.audio) return

      this.muted = !this.muted
      this.audio.muted = this.muted

      if (!this.muted) {
        this.audio.play().catch(() => {})
      }

      localStorage.setItem('audioMuted', this.muted ? '1' : '0')
    }
  }
})