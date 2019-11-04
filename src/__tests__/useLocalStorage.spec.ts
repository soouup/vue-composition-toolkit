import {
  render,
  h,
  nodeOps,
  serializeInner,
  nextTick,
  Ref
} from '@vue/runtime-test'
import useLocalStorage from '../useLocalStorage'

beforeEach(() => {
  localStorage.clear()
})

describe('useLocalStorage', () => {
  test('render once', async () => {
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('undefined')
    expect(serializeInner(root)).toBe('<div></div>')
  })

  test('render with default value', async () => {
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key', 'defaultValue')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('"defaultValue"')
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')
  })

  test('render with value already exists', async () => {
    localStorage.setItem('test-key', '"already exists value"')
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key', 'defaultValue')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('"already exists value"')
    expect(serializeInner(root)).toBe('<div>already exists value</div>')
  })

  test('set localStorage', async () => {
    let refToChange: Ref
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key', 'defaultValue')
        refToChange = refValue
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(localStorage.getItem('test-key')).toBe('"defaultValue"')
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')

    refToChange!.value = 'set value successed'
    await nextTick()
    expect(localStorage.getItem('test-key')).toBe('"set value successed"')
    expect(serializeInner(root)).toBe('<div>set value successed</div>')
  })

  test('set localStorage with a object value', async () => {
    let refToChange: Ref
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key', 'defaultValue')
        refToChange = refValue
        return () => h('div', JSON.stringify(refValue.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    refToChange!.value = {
      a: 2
    }
    await nextTick()
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })

  test('set localStorage with a object value by raw', async () => {
    let refToChange: Ref
    const App = {
      setup() {
        const refValue = useLocalStorage('test-key', 'defaultValue', true)
        refToChange = refValue
        return () => h('div', JSON.stringify(refValue.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    refToChange!.value = { a: 2 }
    await nextTick()
    expect(localStorage.getItem('test-key')).toBe(String({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })
})
