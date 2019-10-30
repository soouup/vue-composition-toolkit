import { createComponent, h } from '@vue/runtime-dom'
import { css } from 'emotion'
import { MetaData } from '../metaData'
import { store } from '../store'

const className = css`
  width: 200px;
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

interface Props {
  metaData: MetaData
}

export default createComponent({
  setup(props: Props) {
    const { metaData } = props
    return () =>
      h('sidebar', { class: className }, [
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
      ])
  }
})
