import { h } from '@vue/runtime-dom'
import { useBoolean } from '../index'

export default {
  setup() {
    const [refVal, toggle] = useBoolean(false)

    return () =>
      h('div', [
        h('h1', refVal.value ? 'yes' : 'no'),
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
*test*

\`\`\`js
export default {
  setup() {
    const [refVal, toggle] = useBoolean(false)

    return () =>
      h('div', [
        h('h1', refVal.value ? 'yes' : 'no'),
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
