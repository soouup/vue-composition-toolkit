import { ref, onUnmounted } from '@vue/runtime-dom'
import throttle from 'lodash.throttle'
import { isClient, isObject } from './utils'

export default function useWindowSize(
  initialWidth: number = 0,
  initialHeight: number = 0,
  options?: {
    wait?: number
    leading?: boolean
    trailing?: boolean
  }
) {
  const refWidth = ref(isClient ? window.innerWidth : initialWidth)
  const refHeight = ref(isClient ? window.innerHeight : initialHeight)

  if (isClient) {
    let handler = () => {
      refWidth.value = window.innerWidth
      refHeight.value = window.innerHeight
    }

    if (isObject(options)) {
      let wait = 0
      if (options.wait && options.wait > 0) {
        wait = options.wait
        delete options.wait
      }

      handler = throttle(handler, wait, options)
    }

    window.addEventListener('resize', handler)

    onUnmounted(() => {
      window.removeEventListener('resize', handler)
    })
  }

  return [refWidth, refHeight]
}
