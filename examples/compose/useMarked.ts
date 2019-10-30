import { Ref, onMounted, onUnmounted, watch } from '@vue/runtime-dom'
import marked from 'marked'

export default function useMarked(
  refDom: Ref<Element | null>,
  refSource: Ref<string>
) {
  onMounted(() => {
    refDom.value && (refDom.value.innerHTML = marked(refSource.value))
  })

  onUnmounted(() => {
    refDom.value && (refDom.value.innerHTML = '')
  })

  watch(refSource, (val, oldVal, onCleanup) => {
    refDom.value && (refDom.value.innerHTML = marked(refSource.value))
    Prism && Prism.highlightAll()

    onCleanup(() => {
      refDom.value && (refDom.value.innerHTML = '')
    })
  })
}
