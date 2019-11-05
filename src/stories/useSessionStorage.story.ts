import { useSessionStorage } from '../../src'
import { h } from '@vue/runtime-dom'
import { isString } from '../utils'

export default {
  setup() {
    const refLocalStr = useSessionStorage('test-key', 'origin value')

    return () =>
      h('div', [
        h(
          'p',
          isString(refLocalStr.value)
            ? refLocalStr.value
            : JSON.stringify(refLocalStr.value)
        ),
        h('div', [
          h(
            'button',
            {
              onClick() {
                refLocalStr.value = 'foo'
              }
            },
            'set a string value'
          ),
          h(
            'button',
            {
              onClick() {
                refLocalStr.value = {
                  foo: 'bar'
                }
              }
            },
            'set a object value'
          )
        ])
      ])
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refLocalStr = useSessionStorage('test-key', 'origin value')

    return () => h('div', [
      h('p', isString(refLocalStr.value) ? refLocalStr.value : JSON.stringify(refLocalStr.value)),
      h('div', [
        h('button', {
          onClick() {
            refLocalStr.value = 'foo'
          }
        }, 'set a string value'),
        h('button', {
          onClick() {
            refLocalStr.value = {
              foo: 'bar'
            }
          }
        }, 'set a object value')
      ])
    ])
  }
}
\`\`\`
`
