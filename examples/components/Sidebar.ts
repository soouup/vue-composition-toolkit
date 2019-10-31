import { createComponent, h, reactive, computed } from '@vue/runtime-dom'
import { css } from 'emotion'
import { MetaData } from '../metaData'
import { store } from '../store'
import Resizebar from './Resizebar'
import { useWindowSize } from '../../src'

interface Props {
  metaData: MetaData
}

export default createComponent({
  setup(props: Props) {
    const { metaData } = props

    const [refX] = useWindowSize()
    const sideBarProps = reactive({
      axis: 'x',
      rootSelector: '--sidebar-width',
      bounds: { min: 200, max: computed(() => refX.value - 50) }
    })

    return () =>
      h(
        'sidebar',
        {
          class: css`
            position: relative;
            width: var(--sidebar-width);
            height: 100%;
            border-right: 1px solid var(--line-color);
            background-color: var(--sidebar-bg);
            & header {
              font-size: 16px;
              padding: 4px;
              border-bottom: 1px solid var(--line-color);
              margin-bottom: 10px;
            }
          `
        },
        [
          h(Resizebar, sideBarProps),
          h('header', 'Vue3 Composition-API Toolkit Demo'),
          h(
            'ul',
            metaData.map(meta => {
              const isCurrent = store.currentMetaData.title === meta.title

              return h(
                'li',
                {
                  onClick() {
                    store.currentMetaData = meta
                  },
                  class: css`
                    padding: 4px;
                    padding-left: 20px;
                    cursor: pointer;
                    color: ${isCurrent && 'var(--theme-color)'};
                    background-color: ${isCurrent && '#cfcdcd'};
                    :hover {
                      color: var(--theme-color);
                    }
                  `
                },
                meta.title
              )
            })
          )
        ]
      )
  }
})
