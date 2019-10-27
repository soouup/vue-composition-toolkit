import {
  h,
  render,
  nodeOps,
  serializeInner,
  nextTick,
  ref
} from '@vue/runtime-test'
import useTimeout from '../useTimeout'

const refVal = ref(0)
function createComponentWithTimer() {
  return {
    setup() {
      const [refIsReady] = useTimeout()

      return () => {
        refVal.value
        return h('div', refIsReady.value ? 'yes' : 'no')
      }
    }
  }
}

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('basic usage with default milliseconds(1000)', () => {
    const [refIsReady] = useTimeout()

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), 1000)
    expect(refIsReady.value).toBe(false)

    jest.runAllTimers()

    expect(refIsReady.value).toBe(true)
  })

  test('with specified milliseconds', () => {
    const [refIsReady] = useTimeout(2000)

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), 2000)
    expect(refIsReady.value).toBe(false)

    jest.runAllTimers()

    expect(refIsReady.value).toBe(true)
  })

  test('should not be called after the timer is cleared', () => {
    const [refIsReady, clear] = useTimeout()

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), 1000)
    expect(refIsReady.value).toBe(false)

    clear()
    expect(clearTimeout).toBeCalled()

    jest.runAllTimers()

    expect(refIsReady.value).toBe(false)
  })

  test('should work in the component', async () => {
    const App = createComponentWithTimer()

    const root = nodeOps.createElement('div')
    render(h(App), root)

    expect(setTimeout).toBeCalledTimes(1)
    expect(serializeInner(root)).toBe('<div>no</div>')

    jest.runAllTimers()
    await nextTick()

    expect(serializeInner(root)).toBe('<div>yes</div>')
  })

  test('the timer should be cleared when the component is unmounted', async () => {
    const App = createComponentWithTimer()

    const root = nodeOps.createElement('div')
    render(h(App), root)

    expect(setTimeout).toBeCalledTimes(1)
    expect(serializeInner(root)).toBe('<div>no</div>')

    render(null, root)
    jest.runAllTimers()

    expect(clearTimeout).toBeCalled()
    expect(serializeInner(root)).toBe('')
  })
})
