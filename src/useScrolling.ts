import { ref, Ref, watch, onMounted, onUnmounted } from '@vue/runtime-core'

export default function useScrolling(
  refEl: Ref<Element | Window | null>
): [Ref<boolean>, () => void] {
  const refScrolling = ref(false)
  let timer: any = null

  function handler() {
    refScrolling.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      refScrolling.value = false
    }, 100)
  }

  let stopWatch: () => any
  onMounted(() => {
    stopWatch = watch(refEl, (el, prevEl, onCleanup) => {
      if (el) {
        el.addEventListener('scroll', handler)
      } else if (prevEl) {
        prevEl.removeEventListener('scroll', handler)
      }

      onCleanup(() => {
        refScrolling.value = false
        el && el.removeEventListener('scroll', handler)
      })
    })
  })

  onUnmounted(() => {
    refEl.value && refEl.value.removeEventListener('scroll', handler)
  })

  function stop() {
    stopWatch && stopWatch()
  }

  return [refScrolling, stop]
}
