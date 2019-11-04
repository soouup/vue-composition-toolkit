import { h } from '@vue/runtime-dom'
import { useOnline } from '../index'

export default {
  setup() {
    const refOnline = useOnline()

    return () => [
      h('h1', 'isOnline: ' + refOnline.value),
      h('p', 'Turn off computer network connections and view status')
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refOnline = useOnline()

    return () => [
      h('h1', 'isOnline: ' + refOnline.value),
      h('p', 'Turn off computer network connections and view status')
    ]
  }
}
\`\`\`
`
