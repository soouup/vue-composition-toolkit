import { h, ref } from '@vue/runtime-dom'
import { css } from 'emotion'
import { injectGlobal } from 'emotion'
import { useCssVar } from '../index'

injectGlobal`
  --bg-color: #999;
  body {
    background-color: var(--bg-color)
  }
`

const className = css`
  --custom-color: red;
  color: var(--custom-color);
`

export default {
  setup() {
    const refEl = ref(null)
    const refColor = useCssVar('--custom-color', refEl)
    const refGlobalColor = useCssVar('--bg-color')

    return () => [
      h(
        'div',
        {
          ref: refEl,
          class: className
        },
        'demo'
      ),
      h(
        'button',
        {
          onClick() {
            refGlobalColor.value = '#ee6f6f'
          }
        },
        'Set the global background to: #ee6f6f'
      ),
      h(
        'button',
        {
          onClick() {
            refGlobalColor.value = '#6feeae'
          }
        },
        'Set the global background to: #6feeae'
      ),
      h(
        'button',
        {
          onClick() {
            refColor.value = 'green'
          }
        },
        'green'
      ),
      h(
        'button',
        {
          onClick() {
            refColor.value = 'red'
          }
        },
        'red'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refEl = ref(null)
    const refColor = useCssVar('--custom-color', refEl)
    const refGlobalColor = useCssVar('--bg-color')

    return () => [
      h('div', { ref: refEl, class: className }, 'demo'),
      h('button', {
          onClick() {
            refGlobalColor.value = '#ee6f6f'
          }
        }, 'Set the global background to: #ee6f6f'
      ),
      h('button', {
          onClick() {
            refGlobalColor.value = '#6feeae'
          }
        }, 'Set the global background to: #6feeae'
      ),
      h('button', {
          onClick() {
            refColor.value = 'green'
          }
        }, 'green'
      ),
      h('button', {
          onClick() {
            refColor.value = 'red'
          }
        }, 'red'
      )
    ]
  }
}
\`\`\`
`
