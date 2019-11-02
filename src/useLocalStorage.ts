import { ref, Ref, UnwrapRef } from '@vue/runtime-dom'
import { isClient, isString } from './utils'

export default function useLocalStorage(
  key: string,
  defaultValue?: any,
  raw?: boolean
): [Ref<any>, (value: any) => void] {
  function transformValToSet(val: any): string {
    return raw ? String(val) : isString(val) ? val : JSON.stringify(val)
  }

  const value = ref(defaultValue)

  if (!isClient) {
    return [value, () => {}]
  }

  try {
    const localStorageValue = localStorage.getItem(key)
    // not exists
    if (typeof localStorageValue !== 'string') {
      localStorage.setItem(key, transformValToSet(defaultValue))
    } else {
      value.value = raw
        ? localStorageValue
        : JSON.parse(localStorageValue) || null
    }
  } catch (e) {}

  const setValue = function(val: any) {
    try {
      localStorage.setItem(key, transformValToSet(val))
      value.value = val as UnwrapRef<any>
    } catch {}
  }

  return [value, setValue]
}
