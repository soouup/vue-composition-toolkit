import { h } from '@vue/runtime-dom'
import { useRendered, useCounter } from '../index'

export default {
  setup() {
    const [refVal, { inc }] = useCounter(0)
    useRendered(isUpdate => {
      alert(`rendered: ${isUpdate ? 'updated' : 'mounted'}`)
    })

    return () => [
      h('h1', refVal.value),
      h(
        'button',
        {
          onClick() {
            inc()
          }
        },
        'Trigger update'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const [refVal, { inc }] = useCounter(0)
    useRendered(isUpdate => {
      alert(\`rendered: \${isUpdate ? 'updated' : 'mounted'}\`)
    })

    return () => [
      h('h1', refVal.value),
      h(
        'button',
        {
          onClick() {
            inc()
          }
        },
        'Trigger update'
      )
    ]
  }
}
\`\`\`
`
