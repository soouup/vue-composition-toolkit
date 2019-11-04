import { ref, onUnmounted, computed } from '@vue/runtime-dom'
import { isDef } from './utils'

export default function useVisibilityState() {
  const refVisibility = ref(true)

  if (isDef(document) && isDef(document.visibilityState)) {
    const setVisibility = () => {
      refVisibility.value =
        document.visibilityState === 'visible' ||
        document.visibilityState === 'prerender'
    }

    document.addEventListener('visibilitychange', setVisibility, false)

    onUnmounted(() => {
      document.removeEventListener('visibilitychange', setVisibility)
    })
  }

  return computed(() => refVisibility.value)
}
