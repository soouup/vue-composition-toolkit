import { h, ref } from '@vue/runtime-dom'
import { useCopyToClipboard } from '../index'

export default {
  setup() {
    const refInputVal = ref('This is the text')
    const refClipboard = useCopyToClipboard()

    return () => [
      h('input', {
        value: refInputVal.value,
        onChange(e: InputEvent) {
          refInputVal.value = (e.target as HTMLInputElement).value
        }
      }),
      h(
        'button',
        {
          onClick() {
            refClipboard.value = refInputVal.value
          }
        },
        'Copy to Clipboard'
      )
    ]
  }
}

export const code = `
export default {
  setup() {
    const refInputVal = ref('This is the text')
    const refClipboard = useCopyToClipboard()

    return () => [
      h('input', {
        value: refInputVal.value,
        onChange(e: InputEvent) {
          refInputVal.value = (e.target as HTMLInputElement).value
        }
      }),
      h(
        'button',
        {
          onClick() {
            refClipboard.value = refInputVal.value
          }
        },
        'Copy to Clipboard'
      )
    ]
  }
}
`
