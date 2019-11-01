import { h } from '@vue/runtime-dom'
import { useInterval, useCounter } from '../index'

export default {
  setup() {
    const [refCounter, { inc }] = useCounter(0)
    const [restart, stop] = useInterval(
      () => {
        inc()
      },
      { delay: 1000 }
    )

    return () => [
      h('h1', refCounter.value),
      h(
        'button',
        {
          onClick() {
            stop()
          }
        },
        'stop'
      ),
      h(
        'button',
        {
          onClick() {
            restart()
          }
        },
        'restart'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const [refCounter, { inc }] = useCounter(0)
    const [restart, stop] = useInterval(
      () => {
        inc()
      },
      { delay: 1000 }
    )

    return () => [
      h('h1', refCounter.value),
      h(
        'button',
        {
          onClick() {
            stop()
          }
        },
        'stop'
      ),
      h(
        'button',
        {
          onClick() {
            restart()
          }
        },
        'restart'
      )
    ]
  }
}
\`\`\`
`
