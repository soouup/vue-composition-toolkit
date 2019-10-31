import { useWindowSize } from '../../src'
import { h } from '@vue/runtime-dom'

export default {
  setup() {
    const [refW, refY] = useWindowSize()

    return () => h('div', refW.value + ', ' + refY.value)
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const [refW, refY] = useWindowSize()

    return () => h('div', refW.value + ', ' + refY.value)
  }
}
\`\`\`
`
