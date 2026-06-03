import { ref } from "vue"

const currentVideo = ref<string>("")

export function useVideoManager() {
  const setVideo = (url: string) => {
    currentVideo.value = url
  }

  const clearVideo = () => {
    currentVideo.value = ""
  }

  return {
    currentVideo,
    setVideo,
    clearVideo
  }
}