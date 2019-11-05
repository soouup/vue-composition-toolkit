import {
  render,
  h,
  nodeOps,
  serializeInner,
  nextTick,
  Ref
} from '@vue/runtime-test'
import useSessionStorage from '../useSessionStorage'

beforeEach(() => {
  sessionStorage.clear()
})

describe('useSessionStorage', () => {
  test('render once', async () => {
    const App = {
      setup() {
        const refValue = useSessionStorage('test-key')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(sessionStorage.getItem('test-key')).toBe('undefined')
    expect(serializeInner(root)).toBe('<div></div>')
  })

  test('render with default value', async () => {
    const App = {
      setup() {
        const refValue = useSessionStorage('test-key', 'defaultValue')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(sessionStorage.getItem('test-key')).toBe('"defaultValue"')
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')
  })

  test('render with value already exists', async () => {
    sessionStorage.setItem('test-key', '"already exists value"')
    const App = {
      setup() {
        const refValue = useSessionStorage('test-key', 'defaultValue')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(sessionStorage.getItem('test-key')).toBe('"already exists value"')
    expect(serializeInner(root)).toBe('<div>already exists value</div>')
  })

  test('set sessionStorage', async () => {
    let refValue: Ref
    const App = {
      setup() {
        refValue = useSessionStorage('test-key', 'defaultValue')
        return () => h('div', refValue.value)
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)
    expect(sessionStorage.getItem('test-key')).toBe('"defaultValue"')
    expect(serializeInner(root)).toBe('<div>defaultValue</div>')

    refValue!.value = 'set value successed'
    await nextTick()
    expect(sessionStorage.getItem('test-key')).toBe('"set value successed"')
    expect(serializeInner(root)).toBe('<div>set value successed</div>')
  })

  test('set sessionStorage with a object value', async () => {
    let refValue: Ref
    const App = {
      setup() {
        refValue = useSessionStorage('test-key', 'defaultValue')
        return () => h('div', JSON.stringify(refValue.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    refValue!.value = {
      a: 2
    }
    await nextTick()
    expect(sessionStorage.getItem('test-key')).toBe(JSON.stringify({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })

  test('set sessionStorage with a object value by raw', async () => {
    let refValue: Ref
    const App = {
      setup() {
        refValue = useSessionStorage('test-key', 'defaultValue', true)
        return () => h('div', JSON.stringify(refValue.value))
      }
    }

    const root = nodeOps.createElement('div')
    render(h(App), root)

    refValue!.value = { a: 2 }
    await nextTick()
    expect(sessionStorage.getItem('test-key')).toBe(String({ a: 2 }))
    expect(serializeInner(root)).toBe('<div>{"a":2}</div>')
  })
})
