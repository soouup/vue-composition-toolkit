import { ComponentOptions } from '@vue/runtime-dom'
import BooleanStory, {
  code as booleanCode
} from '../src/stories/useBoolean.story'
import ToggleStory from '../src/stories/useToggle.story'
import CounterStory from '../src/stories/useCounter.story'

interface Meta {
  title: string
  component: ComponentOptions
  code: string
}
export type MetaData = Meta[]

export default [
  { title: 'useToggle', component: ToggleStory, code: booleanCode },
  { title: 'useBoolean', component: BooleanStory, code: `` },
  { title: 'useCounter', component: CounterStory, code: `` }
] as MetaData
