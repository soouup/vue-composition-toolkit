import { h, ref } from '@vue/runtime-dom'
import { css } from 'emotion'
import { useScrolling } from '../index'

export default {
  setup() {
    const refEl = ref(null)
    const [refScrolling, stop] = useScrolling(refEl)

    return () => [
      h('h1', 'Scrolling: ' + refScrolling.value),
      h('div', {
        ref: refEl,
        class: css`
          width: 200px;
          height: 200px;
          overflow: scroll;
          ::after {
            content: '';
            display: block;
            height: 1000px;
            width: 1000px;
            background-color: #666;
          }
        `
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
    const [refScrolling, stop] = useScrolling(refEl)

    return () => [
      h('h1', 'Scrolling: ' + refScrolling.value),
      h('div', {
        ref: refEl,
        class: css\`
          width: 200px;
          height: 200px;
          overflow: scroll;
          ::after {
            content: '';
            display: block;
            height: 1000px;
            width: 1000px;
            background-color: #666;
          }
        \`
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
