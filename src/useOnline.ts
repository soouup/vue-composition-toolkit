import { ref, computed, onUnmounted } from '@vue/runtime-dom'

export default function useOnline() {
  const refOnline = ref(false)

  refOnline.value = navigator.onLine

  const onlineHandler = () => (refOnline.value = true)
  const offlineHandler = () => (refOnline.value = false)
  window.addEventListener('online', onlineHandler, false)
  window.addEventListener('offline', offlineHandler, false)

  onUnmounted(() => {
    window.removeEventListener('online', onlineHandler)
    window.removeEventListener('offline', offlineHandler)
  })

  return computed(() => refOnline.value)
}
