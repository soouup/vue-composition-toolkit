import { Ref, isRef, watch, onUnmounted } from '@vue/runtime-core'
import { getRawValue, isNumber } from './utils'

interface IntervalOptions {
  delay?: Ref<number | boolean> | number | boolean
  initial?: boolean
}
export function useInterval(
  cb: () => any,
  options: IntervalOptions
): (() => any)[]

export default function useInterval(
  cb: any,
  { delay = 0, initial = true }: IntervalOptions = {}
) {
  let timer: any = null
  function start() {
    if (timer) return
    const rawDelay = getRawValue(delay)
    if (isNumber(rawDelay)) {
      timer = setInterval(cb, rawDelay)
    }
  }

  function stop() {
    clearInterval(timer)
    timer = null
  }

  if (isRef(delay)) {
    watch(delay, (newVal, oldVal, onCleanup) => {
      if (!isNumber(newVal)) return
      start()

      onCleanup(stop)
    })
  } else if (initial) {
    start()
  }

  onUnmounted(stop)

  return [start, stop]
}
