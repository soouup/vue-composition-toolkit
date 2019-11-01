import { Ref, isRef } from '@vue/runtime-dom'

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos)
}

const toString = Object.prototype.toString
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]'
export const isClient = typeof window !== 'undefined'

export const getRawValue = <V>(val?: V): V extends Ref<infer M> ? M : V => {
  return isRef(val) ? val.value : val
}
