import { render, h, nodeOps, serializeInner, nextTick } from '@vue/runtime-test'
import useWindowSize from '../useWindowSize'
import { wait } from './utils'

function fireResize(w: number, h: number) {
  ;(window.innerWidth as number) = w
  ;(window.innerHeight as number) = h

  window.dispatchEvent(new Event('resize'))
}

const mockWA = jest.spyOn(window, 'addEventListener')
const mockWR = jest.spyOn(window, 'removeEventListener')

afterEach(() => {
  mockWA.mockClear()
  mockWR.mockClear()
})

describe('useWindowSize', () => {
  test('should work', async () => {
    fireResize(100, 100)

    const App = {
      setup() {
        const [refWidth, refHeight] = useWindowSize()
        return () => h('div', refWidth.value + ', ' + refHeight.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    expect(window.addEventListener).toBeCalledTimes(1)
    expect(serializeInner(root)).toBe('<div>100, 100</div>')
    fireResize(200, 200)
    await nextTick()
    expect(serializeInner(root)).toBe('<div>200, 200</div>')
  })

  test('should not fire when after the component was unmounted', async () => {
    fireResize(100, 100)

    const App = {
      setup() {
        const [refWidth, refHeight] = useWindowSize()
        return () => h('div', refWidth.value + ', ' + refHeight.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(window.addEventListener).toBeCalledTimes(1)
    expect(serializeInner(root)).toBe('<div>100, 100</div>')

    render(null, root)
    fireResize(200, 200)
    await nextTick()
    expect(window.removeEventListener).toBeCalledTimes(1)
  })

  test('it should only be triggered twice when using options.wait', async () => {
    fireResize(100, 100)

    const App = {
      setup() {
        const [refWidth, refHeight] = useWindowSize(0, 0, { wait: 200 })
        return () => h('div', refWidth.value + ', ' + refHeight.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(window.addEventListener).toBeCalledTimes(1)
    expect(serializeInner(root)).toBe('<div>100, 100</div>')

    fireResize(200, 200)
    await nextTick()
    expect(serializeInner(root)).toBe('<div>200, 200</div>')
    fireResize(300, 300)
    expect(serializeInner(root)).toBe('<div>200, 200</div>')
    await wait(200)
    expect(serializeInner(root)).toBe('<div>300, 300</div>')
  })
})
