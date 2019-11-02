import { h, Ref, render, nodeOps } from '@vue/runtime-test'
import useRaf from '../useRaf'
import { replaceRaf } from 'raf-stub'

declare var requestAnimationFrame: {
  add: (cb: Function) => number
  remove: (id: number) => void
  flush: (duration?: number) => void
  reset: () => void
  step: (steps?: number, duration?: number) => void
}
const frameDuration = 16
const startTime = 1

describe('useRaf', () => {
  const mockNow = jest.spyOn(performance, 'now')
  mockNow.mockImplementation(() => startTime)
  beforeAll(() => {
    replaceRaf([global], {
      frameDuration,
      startTime: 0
    })
  })

  afterEach(() => {
    requestAnimationFrame.reset()
    mockNow.mockClear()
  })

  test('should work', () => {
    const cb = jest.fn(() => {})
    let startFn: () => any, stopFn: () => any
    let refActive: Ref<boolean>
    const App = {
      setup() {
        const [start, stop, refIsActive] = useRaf(cb, { initialRun: false })
        startFn = start
        stopFn = stop
        refActive = refIsActive
        return () => null
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    // initialRun is false and the `cb` should not be called
    expect(cb).not.toBeCalled()
    expect(refActive!.value).toBe(false)
    // start
    startFn!()
    requestAnimationFrame.step()
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(frameDuration - startTime)
    expect(refActive!.value).toBe(true)
    // stop
    stopFn!()
    requestAnimationFrame.step()
    expect(cb).toBeCalledTimes(1)
    expect(refActive!.value).toBe(false)
  })

  test('initialRun & keep mode', () => {
    const cb = jest.fn(() => {})
    let refActive: Ref<boolean>
    const App = {
      setup() {
        const [, , refIsActive] = useRaf(cb, {
          initialRun: true,
          keep: true
        })
        refActive = refIsActive
        return () => null
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    // initialRun is true and the `cb` should be called
    requestAnimationFrame.step()
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(frameDuration - startTime)
    expect(refActive!.value).toBe(true)
    // Second frame
    requestAnimationFrame.step()
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith(frameDuration * 2 - startTime)
    expect(refActive!.value).toBe(true)
  })
})
