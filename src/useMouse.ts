import { ref, Ref, watch } from '@vue/runtime-dom'
import throttle from 'lodash.throttle'
import { isObject } from './utils'

export interface State {
  docX: number
  docY: number
  posX: number
  posY: number
  elX: number
  elY: number
  elH: number
  elW: number
}

export default function useMouse(
  refEl: Ref<Element | null>,
  options: {
    wait?: number
    leading?: boolean
    trailing?: boolean
  } = {}
): [Ref<State>, () => any] {
  const refObject = ref<State>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0
  })

  const stop = watch(refEl, (el: Element | null, prevEl, onCleanup) => {
    let moveHandler = (event: MouseEvent) => {
      if (el) {
        const {
          left,
          top,
          width: elW,
          height: elH
        } = el.getBoundingClientRect()
        const posX = left + window.pageXOffset
        const posY = top + window.pageYOffset
        const elX = event.pageX - posX
        const elY = event.pageY - posY

        Object.assign(refObject.value, {
          docX: event.pageX,
          docY: event.pageY,
          posX,
          posY,
          elX,
          elY,
          elH,
          elW
        })
      }
    }

    if (isObject(options)) {
      let wait = 0
      if (options.wait && options.wait > 0) {
        wait = options.wait
        delete options.wait
      }

      moveHandler = throttle(moveHandler, wait, options)
    }

    document.addEventListener('mousemove', moveHandler)

    onCleanup(() => {
      document.removeEventListener('mousemove', moveHandler)
    })
  })

  return [refObject, stop]
}
