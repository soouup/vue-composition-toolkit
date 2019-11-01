import { ref, Ref, watch } from '@vue/runtime-dom'
import copy from 'copy-text-to-clipboard'
import { isDef } from './utils'

export default function useCopyToClipboard(
  initial?: string
): [Ref<string>, Ref<boolean>, Ref<boolean>] {
  const refClipboard = ref(initial || '')
  const refIsSuccess = ref(false)
  const refCopied = ref(false)

  watch(
    refClipboard,
    (str?: string) => {
      if (isDef(str)) {
        refCopied.value = true
        refIsSuccess.value = copy(str)
      }
    },
    { lazy: !initial, flush: 'sync' }
  )

  return [refClipboard, refIsSuccess, refCopied]
}
