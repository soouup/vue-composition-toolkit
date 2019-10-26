import { ref } from '@vue/runtime-core'
import useCounter from '../useCounter'

describe('useCounter', () => {
  test('basic use (number)', () => {
    const [refCount, { inc, dec, set, reset }] = useCounter(0)

    expect(refCount.value).toBe(0)
    inc()
    expect(refCount.value).toBe(1)
    dec()
    expect(refCount.value).toBe(0)
    set(10)
    expect(refCount.value).toBe(10)
    reset()
    expect(refCount.value).toBe(0)
  })

  test('basic use (Ref<number>)', () => {
    const refVal = ref(0)
    const [refCount, { inc, dec, set, reset }] = useCounter(refVal)

    expect(refCount.value).toBe(0)
    inc()
    expect(refCount.value).toBe(1)
    dec()
    expect(refCount.value).toBe(0)
    set(10)
    expect(refCount.value).toBe(10)
    reset()
    expect(refCount.value).toBe(0)
  })

  test('min & max (number)', () => {
    const [refCount, { inc, dec, set, reset }] = useCounter(0, 0, 10)

    expect(refCount.value).toBe(0)
    dec()
    expect(refCount.value).toBe(0)
    inc()
    expect(refCount.value).toBe(1)
    for (let i = 0; i < 20; i++) {
      inc()
    }
    expect(refCount.value).toBe(10)
    set(-100)
    expect(refCount.value).toBe(0)
    set(3)
    expect(refCount.value).toBe(3)
    reset()
    expect(refCount.value).toBe(0)
  })

  test('min & max (Ref<number>)', () => {
    const min = ref(0)
    const max = ref(10)
    const [refCount, { inc, dec, set, reset }] = useCounter(0, min, max)

    expect(refCount.value).toBe(0)
    dec()
    expect(refCount.value).toBe(0)
    inc()
    expect(refCount.value).toBe(1)
    for (let i = 0; i < 20; i++) {
      inc()
    }
    expect(refCount.value).toBe(10)
    set(-100)
    expect(refCount.value).toBe(0)
    set(3)
    expect(refCount.value).toBe(3)
    reset()
    expect(refCount.value).toBe(0)
  })
})
