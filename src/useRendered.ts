import {
  onMounted,
  onUpdated,
  ComponentInternalInstance
} from '@vue/runtime-dom'

export default function useRendered(
  cb: (isUpdate: boolean) => any,
  target?: ComponentInternalInstance | null
) {
  onMounted(() => cb(false), target)
  onUpdated(() => cb(true), target)
}
