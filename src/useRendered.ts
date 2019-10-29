import {
  onMounted,
  onUpdated,
  ComponentInternalInstance
} from '@vue/runtime-dom'

export default function useRendered(
  cb: () => any,
  target?: ComponentInternalInstance | null
) {
  onMounted(cb, target)
  onUpdated(cb, target)
}
