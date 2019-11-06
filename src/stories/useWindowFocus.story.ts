import { h } from '@vue/runtime-dom'
import { useWindowFocus } from '../index'

export default {
  setup() {
    const refFocus = useWindowFocus()

    return () => h('h1', 'IsFocus: ' + refFocus.value)
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refFocus = useWindowFocus()

    return () => h('h1', 'IsFocus: ' + refFocus.value)
  }
}
\`\`\`
`
