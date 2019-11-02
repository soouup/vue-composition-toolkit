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
