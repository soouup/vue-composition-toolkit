import { h, render, ref, nodeOps, nextTick } from '@vue/runtime-test'
import useInterval from '../useInterval'

beforeEach(() => {
  jest.useFakeTimers()
})
afterEach(() => {
  jest.clearAllTimers()
})

describe('useInterval', () => {
  test('basic usage', () => {
    const refVal = ref(0)
    const App = {
      setup() {
        const [] = useInterval(
          () => {
            refVal.value++
          },
          { delay: 100 }
        )
        return () => h('div')
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3)

    // unMounted
    render(null, root)
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3) // Still 3
  })

  test('timer should be reset with dynamic milliseconds', async () => {
    const refVal = ref(0)
    const refMs = ref<number | boolean>(100)
    const App = {
      setup() {
        const [] = useInterval(
          () => {
            refVal.value++
          },
          { delay: refMs }
        )
        return () => h('div')
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(setInterval).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3)

    // Modify delay time
    ;(refMs.value as number) += 100
    await nextTick()
    expect(clearInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(100)
    expect(refVal.value).toBe(3) // Still 3
    jest.advanceTimersByTime(100)
    expect(refVal.value).toBe(4)
    // the timer should be stopped when a non-numeric value is used as a `delay`
    refMs.value = false
    await nextTick()
    expect(clearInterval).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(1000)
    expect(refVal.value).toBe(4) // Still 4
  })

  test('start & stop', async () => {
    const refVal = ref(0)
    let startFn: any
    let stopFn: any
    const App = {
      setup() {
        const [start, stop] = useInterval(
          () => {
            refVal.value++
          },
          { delay: 100 }
        )
        startFn = start
        stopFn = stop
        return () => h('div')
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(setInterval).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3)
    stopFn()
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3) // Still 3
    startFn()
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(6)
  })

  test('initial: false', async () => {
    const refVal = ref(0)
    let startFn: any
    const App = {
      setup() {
        const [start] = useInterval(
          () => {
            refVal.value++
          },
          { delay: 100, initial: false }
        )
        startFn = start
        return () => h('div')
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(setInterval).not.toBeCalled()
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(0)
    startFn()
    jest.advanceTimersByTime(300)
    expect(refVal.value).toBe(3)
  })
})
