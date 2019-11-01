import { ComponentOptions } from '@vue/runtime-dom'
import BooleanStory, {
  code as booleanCode
} from '../src/stories/useBoolean.story'
import ToggleStory, { code as toggleCode } from '../src/stories/useToggle.story'
import CounterStory, {
  code as counterCode
} from '../src/stories/useCounter.story'
import CssVarStory, { code as cssVarCode } from '../src/stories/useCssVar.story'

interface Meta {
  title: string
  component: ComponentOptions
  code: string
}
export type MetaData = Meta[]

export default [
  { title: 'useToggle', component: ToggleStory, code: toggleCode },
  { title: 'useBoolean', component: BooleanStory, code: booleanCode },
  { title: 'useCounter', component: CounterStory, code: counterCode },
  { title: 'useCssVar', component: CssVarStory, code: cssVarCode },
  { title: 'useTimeout', component: null, code: `` },
  { title: 'useInterval', component: null, code: `` },
  { title: 'useRendered', component: null, code: `` },
  { title: 'useScroll', component: null, code: `` },
  { title: 'useScrolling', component: null, code: `` },
  { title: 'useWindowSize', component: null, code: `` }
] as MetaData
