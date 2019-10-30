import { h, ComponentOptions } from '@vue/runtime-dom'
import toggleStory from '../src/stories/useToggle.story'

interface Meta {
  title: string
  component: ComponentOptions
}
export type MetaData = Meta[]

export default [
  {
    title: 'useToggle',
    component: toggleStory
  },
  {
    title: 'useInterval',
    component: {
      setup() {
        return () => h('div', 'useInterval demo')
      }
    }
  }
] as MetaData
