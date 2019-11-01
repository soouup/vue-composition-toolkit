import { ref, Ref, UnwrapRef } from '@vue/runtime-dom'

export interface Actions<T> {
  set: (list: T[]) => void
  clear: () => void
  updateAt: (index: number, item: T) => T[]
  remove: (index: number) => T[]
  push: (...items: T[]) => number
  filter: (fn: (value: UnwrapRef<T>) => boolean) => void
  sort: (fn: (a: UnwrapRef<T>, b: UnwrapRef<T>) => number) => void
  reset: () => void
}

export default function useList<T>(
  initialList: T[] = []
): [Ref<T[]>, Actions<T>] {
  const refList = ref(initialList)

  const utils = <Actions<T>>{
    set: list => (refList.value = list as UnwrapRef<T[]>),
    clear: () => (refList.value = []),
    updateAt: (index, entry) =>
      refList.value.splice(index, 1, entry as UnwrapRef<T>),
    remove: index => refList.value.splice(index, 1),
    push: (...entry) => refList.value.push(...(entry as UnwrapRef<T[]>)),
    filter: fn => (refList.value = refList.value.filter(fn)),
    sort: fn => (refList.value = refList.value.sort(fn)),
    reset: () => (refList.value = initialList as UnwrapRef<T[]>)
  }

  return [refList, utils]
}
