import { ref, onUnmounted, computed } from '@vue/runtime-dom'
import { isClient } from './utils'

export default function useWindowFocus() {
  const refIsFocus = ref(true)

  if (isClient) {
    const onFocus = () => (refIsFocus.value = true)
    const onBlur = () => (refIsFocus.value = false)

    window.addEventListener('focus', onFocus, false)
    window.addEventListener('blur', onBlur, false)

    onUnmounted(() => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    })
  }

  return computed(() => refIsFocus.value)
}
