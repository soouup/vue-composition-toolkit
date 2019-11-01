import { h } from '@vue/runtime-dom'
import { useList } from '../index'

export default {
  setup() {
    const [
      list,
      { set, clear, updateAt, remove, push, filter, sort, reset }
    ] = useList([1, 2, 3, 4, 5])

    return () => [
      h('div', [
        h(
          'button',
          {
            onClick() {
              set([4, 5, 6])
            }
          },
          'Set to [4, 5, 6]'
        ),
        h(
          'button',
          {
            onClick() {
              push(Date.now())
            }
          },
          'Push timestamp'
        ),
        h(
          'button',
          {
            onClick() {
              updateAt(1, Date.now())
            }
          },
          'Update value at index 1'
        ),
        h(
          'button',
          {
            onClick() {
              remove(1)
            }
          },
          'Remove element at index 1'
        ),
        h(
          'button',
          {
            onClick() {
              filter(item => item % 2 === 0)
            }
          },
          'Filter even values'
        ),
        h(
          'button',
          {
            onClick() {
              sort((a, b) => a - b)
            }
          },
          'Sort ascending'
        ),
        h(
          'button',
          {
            onClick() {
              sort((a, b) => b - a)
            }
          },
          'Sort descending'
        ),
        h(
          'button',
          {
            onClick() {
              clear()
            }
          },
          'Clear'
        ),
        h(
          'button',
          {
            onClick() {
              reset()
            }
          },
          'Reset'
        ),
        h('pre', {}, JSON.stringify(list.value))
      ])
    ]
  }
}
export const code = `
\`\`\`js
export default {
  setup() {
    const [list, { set, clear, updateAt, remove, push, filter, sort, reset }] = useList([1, 2, 3, 4, 5])

    return () => [
      h('div', [
        h(
          'button',
          {
            onClick() {
              set([4, 5, 6])
            }
          },
          'Set to [4, 5, 6]'
        ),
        h(
          'button',
          {
            onClick() {
              push(Date.now())
            }
          },
          'Push timestamp'
        ),
        h(
          'button',
          {
            onClick() {
              updateAt(1, Date.now())
            }
          },
          'Update value at index 1'
        ),
        h(
          'button',
          {
            onClick() {
              remove(1)
            }
          },
          'Remove element at index 1'
        ),
        h(
          'button',
          {
            onClick() {
              filter(item => item % 2 === 0)
            }
          },
          'Filter even values'
        ),
        h(
          'button',
          {
            onClick() {
              sort((a, b) => a - b)
            }
          },
          'Sort ascending'
        ),
        h(
          'button',
          {
            onClick() {
              sort((a, b) => b - a)
            }
          },
          'Sort descending'
        ),
        h(
          'button',
          {
            onClick() {
              clear()
            }
          },
          'Clear'
        ),
        h(
          'button',
          {
            onClick() {
              reset()
            }
          },
          'Reset'
        ),
        h(
          'pre',
          {},
          JSON.stringify(list.value)
        )
      ])
    ]
  }
}
\`\`\`
`
