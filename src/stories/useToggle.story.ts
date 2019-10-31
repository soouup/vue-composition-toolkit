import { h } from '@vue/runtime-dom'
import { useToggle } from '../index'

export default {
  setup() {
    const [refToggle, toggle] = useToggle(false)

    return () =>
      h('div', [
        h('h1', refToggle.value ? 'yes' : 'no'),
        h(
          'button',
          {
            onClick() {
              toggle()
            }
          },
          'toggle'
        ),
        h(
          'button',
          {
            onClick() {
              toggle(true)
            }
          },
          'toggle to yes'
        ),
        h(
          'button',
          {
            onClick() {
              toggle(false)
            }
          },
          'toggle to no'
        )
      ])
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const [refToggle, toggle] = useToggle(false)

    return () =>
      h('div', [
        h('h1', refToggle.value ? 'yes' : 'no'),
        h(
          'button',
          {
            onClick() {
              toggle()
            }
          },
          'toggle'
        ),
        h(
          'button',
          {
            onClick() {
              toggle(true)
            }
          },
          'toggle to yes'
        ),
        h(
          'button',
          {
            onClick() {
              toggle(false)
            }
          },
          'toggle to no'
        )
      ])
  }
}
\`\`\`
`
