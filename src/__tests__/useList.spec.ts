import { isRef } from '@vue/runtime-dom'

import useList from '../useList'
const [
  list,
  { set, clear, updateAt, remove, push, filter, sort, reset }
] = useList([1, 2, 3, 4, 5])

describe('useList', () => {
  test('should work', () => {
    expect(isRef(list)).toBe(true)
    expect(list.value).toEqual([1, 2, 3, 4, 5])
  })

  test('set should `[1, 2, 3]`', () => {
    set([1, 2, 3])
    expect(list.value).toEqual([1, 2, 3])
  })

  test('updateAt should `[4, 2, 3]`', () => {
    updateAt(0, 4)
    expect(list.value).toEqual([4, 2, 3])
  })

  test('remove should `[4, 3]`', () => {
    remove(1)
    expect(list.value).toEqual([4, 3])
  })

  test('push should `[4, 3, 5, 6]`', () => {
    push(5, 6)
    expect(list.value).toEqual([4, 3, 5, 6])
  })

  test('filter should `[5, 6]`', () => {
    filter((a: number) => a > 4)
    expect(list.value).toEqual([5, 6])
  })

  test('reset should `[1, 2, 3, 4, 5]`', () => {
    reset()
    expect(list.value).toEqual([1, 2, 3, 4, 5])
  })

  test('sort should `[5, 4, 3, 2, 1]`', () => {
    sort((a: number, b: number) => b - a)
    expect(list.value).toEqual([5, 4, 3, 2, 1])
  })

  test('clear should `[]`', () => {
    clear()
    expect(list.value).toEqual([])
  })
})
