import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null as HTMLAudioElement | null,
    muted: true,
    started: false,
    currentSrc: '' as string,
    isPlaying: false
  }),

  actions: {

    init(src: string) {
      if (this.started) return

      this.audio = new Audio(src)
      this.audio.loop = true
      this.audio.volume = 0.5

      this.currentSrc = src

      const saved = localStorage.getItem('audioMuted')
      this.muted = saved === '1'

      this.audio.muted = this.muted
      this.started = true

      this.setupVisibilityControl()
      this.unlock()
    },

    play() {
      if (!this.audio) return

      this.isPlaying = true

      if (!this.muted) {
        this.audio.play().catch(() => {})
      }
    },

    pause() {
      if (!this.audio) return

      this.isPlaying = false
      this.audio.pause()
    },

    changeSong(src: string) {
      if (!this.audio) return

      const wasPlaying = !this.audio.paused

      this.audio.pause()
      this.audio.src = src
      this.audio.load()

      this.currentSrc = src

      if (wasPlaying && !this.muted) {
        this.audio.play().catch(() => {})
        this.isPlaying = true
      } else {
        this.isPlaying = false
      }
    },

    toggleMute() {
      if (!this.audio) return

      this.muted = !this.muted
      this.audio.muted = this.muted

      if (!this.muted) {
        this.audio.play().catch(() => {})
        this.isPlaying = true
      }

      localStorage.setItem('audioMuted', this.muted ? '1' : '0')
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

    unlock() {
      const handler = () => {
        if (!this.audio) return

        if (!this.muted) {
          this.audio.play().catch(() => {})
          this.isPlaying = true
        }

        window.removeEventListener('pointerdown', handler)
      }

      window.addEventListener('pointerdown', handler)
    }
  }
})