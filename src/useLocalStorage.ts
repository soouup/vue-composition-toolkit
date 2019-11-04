import { ref, Ref, watch } from '@vue/runtime-dom'
import { isClient, isString } from './utils'

export default function useLocalStorage(
  key: string,
  defaultValue?: any,
  raw?: boolean
): Ref<any> {
  function serializedValue(val: any): string {
    return raw ? String(val) : JSON.stringify(val)
  }

  const refVal = ref(defaultValue)

  watch(() => {
    if (!isClient) {
      return
    }
    try {
      localStorage.setItem(key, serializedValue(refVal.value))
    } catch (e) {
      console.warn(e)
    }
  })

  try {
    const localStorageValue = localStorage.getItem(key)
    // not exists
    if (!isString(localStorageValue)) {
      localStorage.setItem(key, serializedValue(defaultValue))
    } else {
      refVal.value = raw
        ? localStorageValue
        : JSON.parse(localStorageValue || 'null')
    }
  } catch (e) {
    console.warn(e)
  }

  return refVal
}
