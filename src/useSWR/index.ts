import { ref, Ref, UnwrapRef, computed, watch } from '@vue/runtime-dom'
import useLocalStorage from '../useLocalStorage'
import useVisibilityState from '../useVisibilityState'
import useWindowFocus from '../useWindowFocus'
import { setCache, getCache } from './cache'
import { now, isClient, isDef } from '../utils'
import throttle from 'lodash.throttle'

interface SWRConfig<D = any, E = any> {
  maxAge: number
  swr: number
  initial: boolean
  revalidateOnFocus: boolean
  focusThrottleInterval: number

  // hooks
  onSuccess: (d: D, k: string, c: SWRConfig) => any
  onError: (e: E, k: string, c: SWRConfig) => any
}

const defaultConfig: SWRConfig = {
  maxAge: 0,
  swr: 0,
  initial: true,
  revalidateOnFocus: true,
  focusThrottleInterval: 5000,

  // hooks
  onSuccess: () => {},
  onError: () => {}
}

type UpdateReason = Ref<'fresh' | 'stale' | 'network'>
type SWRResult<D, E> = [
  () => any,
  {
    refData: Ref<D>
    refError: Ref<E>
    revalidate: () => any
    refReason: UpdateReason
  }
]

const STORAGE_KEY_PREFIX = 'USE_SWR_CACHED_TIME_'

type RawFetcher<D> = (...arg: any[]) => Promise<UnwrapRef<D>>
export type Fetcher<Data = any> = () => ReturnType<RawFetcher<Data>>

export default function useSWR<Data = any, Error = any>(
  key: string,
  fetch: Fetcher<Data>,
  options: Partial<SWRConfig<Data, Error>> = defaultConfig
): SWRResult<Data, Error> {
  const config = Object.assign({}, defaultConfig, options)
  const refData = ref<Data>()
  const refError = ref<Error>()
  const refReason: UpdateReason = ref('network')

  const refCachedTime = useLocalStorage(STORAGE_KEY_PREFIX + key, 0)
  const refMaxAge = computed(() => refCachedTime.value + config.maxAge)
  const refSwr = computed(() => refMaxAge.value + config.swr)

  function performFetch() {
    const refStartTime = now()
    // Is fresh, use the cache to satisfy the request
    if (refStartTime <= refMaxAge.value) {
      refData.value = getCache(key)
      refReason.value = 'fresh'
      return
    }

    // The cached value will be stale, but will be used to fulfill the API request,
    // at the same time, "in the background", a revalidation request will be made.
    if (refStartTime <= refSwr.value) {
      refReason.value = 'stale'
      refData.value = getCache(key)
      if (isClient && isDef(window.requestIdleCallback)) {
        window.requestIdleCallback(revalidate)
      } else {
        revalidate()
      }
      return
    }

    // Requests fall outside of the `stale-while-revalidate` window,
    // getting the response from the network.
    refReason.value = 'network'
    revalidate()
  }

  async function revalidate() {
    try {
      refData.value = await fetch()
      setCache(key, refData.value)
      // call onSuccess hook
      config.onSuccess && config.onSuccess(refData.value, key, config)
      // update cachedTime
      refCachedTime.value = now()
    } catch (e) {
      refError.value = e
      // call onError hook
      config.onError && config.onError(e, key, config)
    }
  }

  let lock = !config.initial
  // Re-fetch when visible & focus
  const onFocus = throttle(performFetch, config.focusThrottleInterval)
  config.revalidateOnFocus &&
    watch(
      [useVisibilityState(), useWindowFocus()],
      ([isVisible, isFocus]) => {
        !lock && (isVisible && isFocus) && onFocus()
      },
      { lazy: !config.initial }
    )

  const forceFetch = () => {
    lock = false
    performFetch()
  }

  return [
    forceFetch,
    {
      refData,
      refError,
      revalidate,
      refReason
    }
  ]
}
