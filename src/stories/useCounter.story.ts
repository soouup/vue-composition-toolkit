import { h } from '@vue/runtime-dom'
import { useCounter } from '../index'

export default {
  setup() {
    const [refCounter, { inc, dec, set, reset }] = useCounter(0)

    return () =>
      h('div', [
        h('h1', refCounter.value),
        h(
          'button',
          {
            onClick() {
              inc()
            }
          },
          'inc'
        ),
        h(
          'button',
          {
            onClick() {
              dec()
            }
          },
          'dec'
        ),
        h(
          'button',
          {
            onClick() {
              set(10)
            }
          },
          'set to 10'
        ),
        h(
          'button',
          {
            onClick() {
              reset()
            }
          },
          'reset'
        ),
        h(
          'button',
          {
            onClick() {
              inc(5)
            }
          },
          'inc(5)'
        ),
        h(
          'button',
          {
            onClick() {
              dec(3)
            }
          },
          'dec(3)'
        )
      ])
  }
}
