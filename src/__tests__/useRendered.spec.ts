import { render, h, ref, nodeOps, nextTick } from '@vue/runtime-test'
import useRendered from '../useRendered'

describe('useRendered', () => {
  test('should work', async () => {
    const refVal = ref(true)
    const cb = jest.fn()
    const App = {
      setup() {
        useRendered(cb)
        return () => h('div', refVal.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    expect(cb).toBeCalledTimes(1)
    refVal.value = false
    await nextTick()
    expect(cb).toBeCalledTimes(2)
  })
})
