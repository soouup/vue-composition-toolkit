import { ref, Ref, watch } from '@vue/runtime-dom'
import { isClient, isString } from './utils'

function useSessionStorage<Data = any>(key: string): Ref<Data>
function useSessionStorage<Data = any>(
  key: string,
  defaultValue?: Data
): Ref<Data>
function useSessionStorage<Data = any>(
  key: string,
  defaultValue?: Data,
  raw?: boolean
): Ref<Data | undefined>

function useSessionStorage<Data = any>(
  key: string,
  defaultValue?: Data,
  raw?: boolean
) {
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

export default useSessionStorage
