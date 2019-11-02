import { h, ref } from '@vue/runtime-dom'
import { useRaf } from '../index'

export default {
  setup() {
    const refDuration = ref(0)
    const refIsKeep = ref(true)

    const [start, stop, refIsActive] = useRaf(
      d => {
        refDuration.value = d
      },
      { keep: refIsKeep }
    )

    return () => [
      h('h1', 'Duration: ' + refDuration.value),
      h(
        'input',
        {
          type: 'checkbox',
          checked: refIsKeep.value,
          onChange(e: Event) {
            refIsKeep.value = (e.target as HTMLInputElement).checked
          }
        },
        'keep'
      ),
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
    const refDuration = ref(0)
    const refIsKeep = ref(true)

    const [start, stop, refIsActive] = useRaf(
      d => {
        refDuration.value = d
      },
      { keep: refIsKeep }
    )

    return () => [
      h('h1', 'Duration: ' + refDuration.value),
      h(
        'input',
        {
          type: 'checkbox',
          checked: refIsKeep.value,
          onChange(e: Event) {
            refIsKeep.value = (e.target as HTMLInputElement).checked
          }
        },
        'keep'
      ),
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
