import { ComponentOptions } from '@vue/runtime-dom'
import BooleanStory, {
  code as booleanCode
} from '../src/stories/useBoolean.story'
import ToggleStory, { code as toggleCode } from '../src/stories/useToggle.story'
import CounterStory, {
  code as counterCode
} from '../src/stories/useCounter.story'

interface Meta {
  title: string
  component: ComponentOptions
  code: string
}
export type MetaData = Meta[]

export default [
  { title: 'useToggle', component: ToggleStory, code: toggleCode },
  { title: 'useBoolean', component: BooleanStory, code: booleanCode },
  { title: 'useCounter', component: CounterStory, code: counterCode }
] as MetaData
