import { ref, Ref, watch } from '@vue/runtime-dom'
import { isClient, isString } from './utils'

export default function useSessionStorage(
  key: string,
  defaultValue?: any,
  raw?: boolean
): Ref<any> {
  function serializedValue(val: any): string {
    return raw ? String(val) : JSON.stringify(val)
  }

  const refVal = ref(defaultValue)

  try {
    const sessionStorageValue = sessionStorage.getItem(key)
    // not exists
    if (!isString(sessionStorageValue)) {
      sessionStorage.setItem(key, serializedValue(defaultValue))
    } else {
      refVal.value = raw
        ? sessionStorageValue
        : JSON.parse(sessionStorageValue || 'null')
    }
  } catch (e) {
    console.warn(e)
  }

  watch(
    () => {
      if (!isClient) {
        return
      }
      try {
        sessionStorage.setItem(key, serializedValue(refVal.value))
      } catch (e) {
        console.warn(e)
      }
    },
    { flush: 'sync' }
  )

  return refVal
}
