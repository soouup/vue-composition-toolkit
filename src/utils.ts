export const isDef = (val: any) => typeof val !== 'undefined'

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos)
}

export const isBoolean = (val: any) => typeof val === 'boolean'
export const isNumber = (val: any) => typeof val === 'number'
