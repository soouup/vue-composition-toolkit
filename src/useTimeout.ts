import {
  ref,
  Ref,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from '@vue/runtime-dom'
import { assert, isNumber } from './utils'

export default function useTimeout(
  ms: number = 1000
): [Ref<boolean>, () => void] {
  __DEV__ &&
    assert(
      isNumber(ms),
      'You must pass a boolean value for the `useToggle` function, received: ',
      ms
    )

  const currentInstance = getCurrentInstance()
  const refReady = ref(false)
  let timer: any = null
  const setTimer = () => {
    refReady.value = false
    timer = setTimeout(() => {
      refReady.value = true
    }, ms)
  }
  const clear = () => {
    clearTimeout(timer)
  }

  if (currentInstance) {
    onMounted(setTimer)
  } else {
    setTimer()
  }

  // `onUnmounted` is called to clear the timer only when there has a component instance.
  if (currentInstance) {
    onUnmounted(clear)
  }

  return [refReady, clear]
}
