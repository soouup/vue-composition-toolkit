import { UnwrapRef } from '@vue/runtime-dom'
import { Fetcher } from './index'

const cache = new Map()

export function setCache(key: any, val: any) {
  cache.set(key, val)
}

export function getCache<T>(
  key: T
): T extends Fetcher<infer Data> ? UnwrapRef<Data> : never {
  return cache.get(key)
}
