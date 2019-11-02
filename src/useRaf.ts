import { ref, onUnmounted, Ref, isRef, watch } from '@vue/runtime-dom'
import { getRawValue } from './utils'

type Fn = () => any

export default function useRaf(
  cb: (duration: number) => any,
  options: {
    initialRun?: boolean
    keep?: Ref<boolean> | boolean
  } = {}
): [Fn, Fn, Ref<boolean>] {
  const { initialRun, keep } = options
  let id: number
  let startTime: number = 0

  let isKeep = getRawValue(keep)
  isRef(keep) &&
    watch(keep, val => {
      isKeep = getRawValue(val)
      startTime = performance.now()
    })

  const refIsActive = ref(false)
  function step(currentTime: number) {
    refIsActive.value = true
    cb(currentTime - startTime)
    id = requestAnimationFrame(step)
  }

  function start() {
    if (!startTime || !isKeep) {
      startTime = performance.now()
    }
    id = requestAnimationFrame(step)
  }

  function cancel() {
    cancelAnimationFrame(id)
    refIsActive.value = false
  }

  onUnmounted(cancel)

  initialRun && start()

  return [start, cancel, refIsActive]
}
