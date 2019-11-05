// Global compile-time constants
declare var __DEV__: boolean
declare var __JSDOM__: boolean
declare var __BROWSER__: boolean
declare var __VERSION__: string
declare var Prism: any
declare module 'marked'
declare module 'raf-stub' {
  export function replaceRaf(
    roots?: Object[],
    options?: {
      frameDuration?: number
      startTime?: number
    }
  ): void
}

// https://github.com/Microsoft/TypeScript/issues/21309#issuecomment-376338415
type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}
interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => RequestIdleCallbackHandle
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
}
