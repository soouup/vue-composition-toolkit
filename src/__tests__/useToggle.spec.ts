import { isRef } from '@vue/runtime-core'
import useToggle from '../useToggle'

describe('useToggle', () => {
  test('the default should be `false`', () => {
    const [refToggleValue, toggle] = useToggle()

    expect(isRef(refToggleValue)).toBe(true)
    expect(refToggleValue.value).toBe(false)

    toggle()

    expect(refToggleValue.value).toBe(true)
  })

  test('the initial value is `true`', () => {
    const [refToggleValue, toggle] = useToggle(true)

    expect(isRef(refToggleValue)).toBe(true)
    expect(refToggleValue.value).toBe(true)

    toggle()

    expect(refToggleValue.value).toBe(false)
  })

  test('use toggle to set the specified value', () => {
    const [refToggleValue, toggle] = useToggle(true)

    expect(isRef(refToggleValue)).toBe(true)
    expect(refToggleValue.value).toBe(true)

    toggle(true)

    expect(refToggleValue.value).toBe(true)
  })
})
