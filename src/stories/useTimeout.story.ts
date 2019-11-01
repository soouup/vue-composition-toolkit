import { h, ref } from '@vue/runtime-dom'
import { useTimeout } from '../index'

export default {
  setup() {
    const refStoped = ref(false)
    const [refReady, stop] = useTimeout(2000)

    return () => [
      h('h1', refReady.value ? 'ready' : 'no'),
      h(
        'button',
        {
          onClick() {
            stop()
            refStoped.value = true
          }
        },
        refStoped.value ? 'stoped' : 'stop'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refStoped = ref(false)
    const [refReady, stop] = useTimeout(2000)

    return () => [
      h('h1', refReady.value ? 'ready' : 'no'),
      h(
        'button',
        {
          onClick() {
            stop()
            refStoped.value = true
          }
        },
        refStoped.value ? 'stoped' : 'stop'
      )
    ]
  }
}
\`\`\`
`
