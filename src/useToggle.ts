import { ref, Ref } from '@vue/runtime-core'
import { isDef } from './utils'

export default function useToggle(
  val: boolean = false
): [Ref<boolean>, (v?: boolean) => void] {
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
