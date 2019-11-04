import { h, watch } from '@vue/runtime-dom'
import { useVisibilityState } from '../index'

export default {
  setup() {
    const refVisibility = useVisibilityState()

    watch(refVisibility, () => {
      console.log('Visibility State: ', refVisibility.value)
    })

    return () => h('h1', 'Switch tabs and check the console')
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refVisibility = useVisibilityState()

    watch(refVisibility, () => {
      console.log('Visibility State: ', refVisibility.value)
    })

    return () => h('h1', 'Switch tabs and check the console')
  }
}
\`\`\`
`
