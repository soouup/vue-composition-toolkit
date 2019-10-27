import { ref, Ref, onUnmounted, getCurrentInstance } from '@vue/runtime-core'
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

  const refReady = ref(false)

  const timer = setTimeout(() => {
    refReady.value = true
  }, ms)

  const clear = () => {
    clearTimeout(timer)
  }

  // `onUnmounted` is called to clear the timer only when there has a component instance.
  if (getCurrentInstance()) {
    onUnmounted(() => {
      clear()
    })
  }

  return [refReady, clear]
}
