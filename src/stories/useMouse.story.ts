import { h, ref } from '@vue/runtime-dom'
import { useMouse } from '../index'

export default {
  setup() {
    const refEl = ref(null)
    const [refObject, stop] = useMouse(refEl, { wait: 200 })

    return () => [
      h('pre', JSON.stringify(refObject.value, null, 2)),
      h('div', {
        style: {
          width: '100px',
          height: '100px',
          backgroundColor: '#666'
        },
        ref: refEl
      }),
      h(
        'button',
        {
          onClick() {
            stop()
          }
        },
        'stop'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refEl = ref(null)
    const [refObject, stop] = useMouse(refEl, { wait: 200 })

    return () => [
      h('pre', JSON.stringify(refObject.value, null, 2)),
      h('div', {
        style: {
          width: '100px',
          height: '100px',
          backgroundColor: '#666'
        },
        ref: refEl
      }),
      h(
        'button',
        {
          onClick() {
            stop()
          }
        },
        'stop'
      )
    ]
  }
}
\`\`\`
`
