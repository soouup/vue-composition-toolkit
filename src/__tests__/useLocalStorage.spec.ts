import { render, h, nodeOps, serializeInner } from '@vue/runtime-test'
import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage', () => {
  test('render once', async () => {
    const App = {
      setup() {
        const [value] = useLocalStorage('use', 'defaultValue')
        return () => h('div', value.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')
  })
  test('set localStorage', async () => {
    const App = {
      setup() {
        const [value, setValue] = useLocalStorage('use', 'defaultValue')
        setValue('set successed')
        return () => h('div', value.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(serializeInner(root)).toBe('<div>set successed</div>')
  })
  // test('set localStorage a object value', async () => {
  //   const App = {
  //     setup() {
  //       const [value, setValue] = useLocalStorage('use', { a: 1 })
  //       setValue({
  //         a: 2
  //       })
  //       return () => h('div', {}, value.value)
  //     }
  //   }

  //   const root = nodeOps.createElement('div')
  //   render(h(App), root)
  //   expect(serializeInner(root)).toBe('<div>{a:1}</div>')
  // })
})
