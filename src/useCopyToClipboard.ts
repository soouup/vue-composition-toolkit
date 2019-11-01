import { ref, watch } from '@vue/runtime-dom'
import copy from 'copy-text-to-clipboard'
import { isDef } from './utils'

export default function useCopyToClipboard(initial?: string) {
  const refClipboard = ref(initial)
  const refSucceeded = ref(true)

  watch(refClipboard, (str?: string) => {
    if (isDef(str)) {
      refSucceeded.value = copy(str)
    }
  })

  return refClipboard
}
