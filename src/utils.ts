export const isDef = (val: any) => typeof val !== 'undefined'

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos)
}

const toString = Object.prototype.toString
export const isBoolean = (val: any) => typeof val === 'boolean'
export const isNumber = (val: any) => typeof val === 'number'
export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
export const isClient = typeof window !== 'undefined'
