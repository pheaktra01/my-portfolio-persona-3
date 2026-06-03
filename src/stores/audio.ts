import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null as HTMLAudioElement | null,
    muted: true,
    started: false
  }),

  actions: {

    play() {
      if (!this.audio) return
      if (!this.muted) {
        this.audio.play().catch(() => {})
      }
    },

    pause() {
      if (!this.audio) return
      this.audio.pause()
    },

    setupVisibilityControl() {
      const handleVisibility = () => {
        if (!this.audio) return

        if (document.hidden) {
          this.audio.pause()
        } else {
          if (!this.muted) {
            this.audio.play().catch(() => {})
          }
        }
      }

      document.addEventListener('visibilitychange', handleVisibility)
    },

    init(src: string) {
      if (this.started) return

      this.audio = new Audio(src)
      this.audio.loop = true
      this.audio.volume = 0.5

      const saved = localStorage.getItem('audioMuted')
      this.muted = saved === '1'

      this.audio.muted = this.muted
      this.started = true

      this.unlock()
      this.setupVisibilityControl() // 🔥 add this
    },

    fadeOut() {
      if (!this.audio) return

      const interval = setInterval(() => {
        if (!this.audio) return

        if (this.audio.volume > 0.05) {
          this.audio.volume -= 0.05
        } else {
          this.audio.pause()
          clearInterval(interval)
        }
      }, 50)
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