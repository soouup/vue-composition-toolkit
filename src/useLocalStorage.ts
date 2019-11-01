import { ref, Ref, UnwrapRef } from '@vue/runtime-dom'
import { isClient } from './utils'

export default function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
  raw?: boolean
): [Ref<T>, (value: any) => void] {
  const value = ref(defaultValue as T)
  if (!isClient) {
    return [value, () => {}]
  }
  try {
    const localStorageValue = localStorage.getItem(key)
    if (typeof localStorageValue !== 'string') {
      localStorage.setItem(
        key,
        raw ? String(defaultValue) : JSON.stringify(defaultValue)
      )
    } else {
      value.value = raw
        ? localStorageValue
        : JSON.parse(localStorageValue || 'null')
    }
  } catch (e) {}

  const setLocalStorage = function(val: any) {
    try {
      const serializedValue = raw ? String(val) : JSON.stringify(val)
      localStorage.setItem(key, serializedValue)
      value.value = val as UnwrapRef<any>
    } catch {}
  }

  return [value, setLocalStorage]
}
