import { reactive } from '@vue/runtime-dom'
import metaData from './metaData'

export const store = reactive({
  currentDemo: metaData[0].title
})
