import { ref, onUnmounted, Ref } from '@vue/runtime-dom'

type Fn = () => any

export default function useRaf(
  cb: (tt: number) => any,
  initialRun?: boolean
): [Fn, Fn, Ref<boolean>] {
  let id: number
  const refIsActive = ref(false)
  function step(tt: number) {
    refIsActive.value = true
    cb(tt)
    id = requestAnimationFrame(step)
  }

  function start() {
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
