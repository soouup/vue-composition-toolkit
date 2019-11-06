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
import GeolocationStory, {
  code as geolocationCode
} from '../src/stories/useGeolocation.story'
import MouseStory, { code as mouseCode } from '../src/stories/useMouse.story'
import OnlineStory, { code as onlineCode } from '../src/stories/useOnline.story'
import VisibilityStateStory, {
  code as visibilityStateCode
} from '../src/stories/useVisibilityState.story'
import LocalStorageStory, {
  code as localStorageCode
} from '../src/stories/useLocalStorage.story'
import SessionStorageStory, {
  code as sessionStorageCode
} from '../src/stories/useSessionStorage.story'
import WindowFocusStory, {
  code as windowFocusCode
} from '../src/stories/useWindowFocus.story'
import SWRStory, { code as SWRCode } from '../src/stories/useSWR.story'

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
  { title: 'useRaf', component: RafStory, code: rafCode },
  {
    title: 'useGeolocation',
    component: GeolocationStory,
    code: geolocationCode
  },
  { title: 'useMouse', component: MouseStory, code: mouseCode },
  { title: 'useOnline', component: OnlineStory, code: onlineCode },
  {
    title: 'useVisibilityState',
    component: VisibilityStateStory,
    code: visibilityStateCode
  },
  {
    title: 'useLocalStorage',
    component: LocalStorageStory,
    code: localStorageCode
  },
  {
    title: 'useSessionStorage',
    component: SessionStorageStory,
    code: sessionStorageCode
  },
  {
    title: 'useWindowFocus',
    component: WindowFocusStory,
    code: windowFocusCode
  },
  { title: 'useSWR', component: SWRStory, code: SWRCode }
] as MetaData
