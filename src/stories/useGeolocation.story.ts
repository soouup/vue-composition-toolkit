import { h } from '@vue/runtime-dom'
import { useGeolocation } from '../index'

export default {
  setup() {
    const refGeo = useGeolocation()

    return () => h('pre', JSON.stringify(refGeo.value, null, 2))
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refGeo = useGeolocation()

    return () => h('pre', JSON.stringify(refGeo.value, null, 2))
  }
}
\`\`\`
`
