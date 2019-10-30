import { reactive } from '@vue/runtime-dom'
import metaData from './metaData'

export const store = reactive({
  currentMetaData: metaData[0]
})
