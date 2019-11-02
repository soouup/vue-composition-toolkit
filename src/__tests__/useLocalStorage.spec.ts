import { render, h, nodeOps, serializeInner } from '@vue/runtime-test'
import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage', () => {
  test('render once', async () => {
    localStorage.clear()
    const App = {
      setup() {
        const [value] = useLocalStorage('test-key')
        return () => h('div', value.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('undefined')
    expect(serializeInner(root)).toBe('<div></div>')
  })

  test('render with default value', async () => {
    localStorage.clear()
    const App = {
      setup() {
        const [value] = useLocalStorage('test-key', 'defaultValue')
        return () => h('div', value.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('defaultValue')
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')
  })

  test('set localStorage', async () => {
    localStorage.clear()
    const App = {
      setup() {
        const [value, setValue] = useLocalStorage('test-key', 'defaultValue')
        expect(localStorage.getItem('test-key')).toBe('defaultValue')
        setValue('set value successed')
        return () => h('div', value.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('set value successed')
    expect(serializeInner(root)).toBe('<div>set value successed</div>')
  })

  test('set localStorage a object value', async () => {
    localStorage.clear()
    const App = {
      setup() {
        const [value, setValue] = useLocalStorage('test-key', 'defaultValue')
        expect(localStorage.getItem('test-key')).toBe('defaultValue')
        setValue({
          a: 2
        })
        return () => h('div', JSON.stringify(value.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })

  test('set localStorage a object value with raw', async () => {
    localStorage.clear()
    const App = {
      setup() {
        const [value, setValue] = useLocalStorage(
          'test-key',
          'defaultValue',
          true
        )
        expect(localStorage.getItem('test-key')).toBe('defaultValue')
        setValue({
          a: 2
        })
        return () => h('div', JSON.stringify(value.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe(String({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })
})
