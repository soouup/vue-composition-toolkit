import { ref, Ref } from '@vue/runtime-dom'
import { isDef, assert, isBoolean } from './utils'

export default function useToggle(
  val: boolean = false
): [Ref<boolean>, (v?: boolean) => void] {
  __DEV__ &&
    assert(
      isBoolean(val),
      'You must pass a boolean value for the `useToggle` function, received: ',
      val
    )

  const refToggleValue = ref(val)

  function toggle(newVal?: boolean) {
    if (isDef(newVal)) {
      refToggleValue.value = newVal as boolean
      return
    }
    refToggleValue.value = !refToggleValue.value
  }

  return [refToggleValue, toggle]
}
