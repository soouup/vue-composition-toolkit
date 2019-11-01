import { ComponentOptions } from '@vue/runtime-dom'
import BooleanStory, {
  code as booleanCode
} from '../src/stories/useBoolean.story'
import ToggleStory, { code as toggleCode } from '../src/stories/useToggle.story'
import CounterStory, {
  code as counterCode
} from '../src/stories/useCounter.story'
import CssVarStory, { code as cssVarCode } from '../src/stories/useCssVar.story'
import TimeoutStory, {
  code as timeoutCode
} from '../src/stories/useTimeout.story'
import IntervalStory, {
  code as intervalCode
} from '../src/stories/useInterval.story'
import RenderedStory, {
  code as renderedCode
} from '../src/stories/useRendered.story'
import ScrollStory, { code as scrollCode } from '../src/stories/useScroll.story'
import ScrollingStory, {
  code as scrollingCode
} from '../src/stories/useScrolling.story'
import WindowSizeStory, {
  code as windowSizeCode
} from '../src/stories/useWindowSize.story'
import CopyToClipboardStory, {
  code as copyToClipboardCode
} from '../src/stories/useCopyToClipboard.story'
import RafStory, { code as rafCode } from '../src/stories/useRaf.story'

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
  { title: 'useTimeout', component: TimeoutStory, code: timeoutCode },
  { title: 'useInterval', component: IntervalStory, code: intervalCode },
  { title: 'useRendered', component: RenderedStory, code: renderedCode },
  { title: 'useScroll', component: ScrollStory, code: scrollCode },
  { title: 'useScrolling', component: ScrollingStory, code: scrollingCode },
  { title: 'useWindowSize', component: WindowSizeStory, code: windowSizeCode },
  {
    title: 'useCopyToClipboard',
    component: CopyToClipboardStory,
    code: copyToClipboardCode
  },
  { title: 'useRaf', component: RafStory, code: rafCode }
] as MetaData
