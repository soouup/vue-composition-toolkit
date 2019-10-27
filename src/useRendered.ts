import {
  onMounted,
  onUpdated,
  ComponentInternalInstance
} from '@vue/runtime-core'

export default function useRendered(
  cb: () => any,
  target?: ComponentInternalInstance | null
) {
  onMounted(cb, target)
  onUpdated(cb, target)
}
