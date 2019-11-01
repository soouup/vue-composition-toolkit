import { h, ref } from '@vue/runtime-dom'
import { useCopyToClipboard } from '../index'

export default {
  setup() {
    const refInputVal = ref('This is the text')
    const [refClipboard, refIsSuccess, refCopied] = useCopyToClipboard()

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
      ),
      h(
        'p',
        { style: { color: refIsSuccess.value ? 'green' : 'red' } },
        refCopied.value
          ? refIsSuccess.value
            ? 'Copied'
            : 'Copy failed'
          : 'Waiting for copy'
      )
    ]
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const refInputVal = ref('This is the text')
    const [refClipboard, refIsSuccess, refCopied] = useCopyToClipboard()

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
      ),
      h(
        'p',
        { style: { color: refIsSuccess.value ? 'green' : 'red' } },
        refCopied.value
          ? refIsSuccess.value
            ? 'Copied'
            : 'Copy failed'
          : 'Waiting for copy'
      )
    ]
  }
}
\`\`\`
`
