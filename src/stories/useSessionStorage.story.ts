import { useSessionStorage } from '../../src'
import { h } from '@vue/runtime-dom'
import { isString } from '../utils'

export default {
  setup() {
    const refSessionTestKey = useSessionStorage<any>('test-key', 'origin value')

    return () =>
      h('div', [
        h(
          'p',
          isString(refSessionTestKey.value)
            ? refSessionTestKey.value
            : JSON.stringify(refSessionTestKey.value)
        ),
        h('div', [
          h(
            'button',
            {
              onClick() {
                refSessionTestKey.value = 'foo'
              }
            },
            'set a string value'
          ),
          h(
            'button',
            {
              onClick() {
                refSessionTestKey.value = {
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
    const refSessionTestKey = useSessionStorage<any>('test-key', 'origin value')

    return () =>
      h('div', [
        h(
          'p',
          isString(refSessionTestKey.value)
            ? refSessionTestKey.value
            : JSON.stringify(refSessionTestKey.value)
        ),
        h('div', [
          h(
            'button',
            {
              onClick() {
                refSessionTestKey.value = 'foo'
              }
            },
            'set a string value'
          ),
          h(
            'button',
            {
              onClick() {
                refSessionTestKey.value = {
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
\`\`\`
`
