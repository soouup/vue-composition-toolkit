import { h, ref } from '@vue/runtime-dom'
import { useRaf } from '../index'

export default {
  setup() {
    const refVal = ref(0)
    const [start, stop, refIsActive] = useRaf(() => {
      refVal.value++
    }, true)

    return () => [
      h('h1', refVal.value),
      h(
        'button',
        {
          onClick() {
            refIsActive.value ? stop() : start()
          }
        },
        refIsActive.value ? 'stop' : 'start'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refVal = ref(0)
    const [start, stop, refIsActive] = useRaf(() => {
      refVal.value++
    }, true)

    return () => [
      h('h1', refVal.value),
      h(
        'button',
        {
          onClick() {
            refIsActive.value ? stop() : start()
          }
        },
        refIsActive.value ? 'stop' : 'start'
      )
    ]
  }
}
\`\`\`
`
