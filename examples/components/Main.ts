import {
  createComponent,
  h,
  computed,
  ComponentOptions
} from '@vue/runtime-dom'
import { css } from 'emotion'
import metaData from '../metaData'
import { store } from '../store'

const className = css`
  flex-grow: 1;
  padding: 10px;
`

export default createComponent({
  setup() {
    const refCurrentComponent = computed(() => {
      return metaData.filter(meta => meta.title === store.currentDemo)[0]
    })

    return () =>
      h(
        'main',
        { class: className },
        h(refCurrentComponent.value.component as ComponentOptions)
      )
  }
})
