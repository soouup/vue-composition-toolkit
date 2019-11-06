import {
  createComponent,
  h,
  ref,
  ComponentOptions,
  watch,
  computed,
  reactive
} from '@vue/runtime-dom'
import { css } from 'emotion'
import { store } from '../store'
import useMarked from '../compose/useMarked'
import Resizebar, { ResizebarProps } from './Resizebar'
import { useWindowSize } from '../../src'

export default createComponent(() => {
  const refMarkdownSource = ref(store.currentMetaData.code)
  watch(
    () => store.currentMetaData.code,
    val => (refMarkdownSource.value = val)
  )
  const refDocEl = ref(null)
  useMarked(refDocEl, refMarkdownSource)

  const [, refY] = useWindowSize()
  const resizeBarProps = reactive<ResizebarProps>({
    axis: 'y',
    rootSelector: '--doc-height',
    bounds: { min: 300, max: computed(() => refY.value - 50) }
  })

  return () =>
    h(
      'main',
      {
        class: css`
          flex-grow: 1;
          padding: 10px;
          position: relative;
        `
      },
      [
        h(
          'section',
          {
            class: css`
              height: calc(${window.innerHeight}px - var(--doc-height) - 30px);
              overflow: auto;
            `
          },
          h(store.currentMetaData.component as ComponentOptions)
        ),
        h(
          'section',
          {
            class: css`
              display: flex;
              flex-direction: column;
              position: absolute;
              left: 0;
              bottom: 0;
              height: var(--doc-height);
              width: 100%;
              background-color: #fff;
            `
          },
          [
            h(Resizebar, resizeBarProps),
            h(
              'header',
              {
                class: css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  line-height: 30px;
                  height: 30px;
                  padding-left: 10px;
                  border-top: 1px solid var(--line-color);
                  border-bottom: 1px solid var(--line-color);
                `
              },
              'Docs & Code'
            ),
            h('main', { class: markdownClassName, ref: refDocEl })
          ]
        )
      ]
    )
})

const markdownClassName = css`
  line-height: 1.5;
  overflow: auto;
  margin-top: 30px;
  & > *:last-child {
    margin-bottom: 0;
  }
  & a {
    color: #0366d6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  & pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    padding: 16px;
    font-family: var(--font-code);
    margin: 15px 0;
  }
  & *:not(pre) > code {
    background-color: #f6f8fa;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 0.875rem;
    font-family: var(--font-code);
  }
  & h1,
  & h2,
  & h3,
  & h4,
  & h5 {
    font-weight: 500;
  }
  & h1 {
    font-size: 32px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.3em;
    margin-bottom: 20px;
  }
  & h2 {
    font-size: 24px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.3em;
  }
  & h3 {
    font-size: 20px;
  }
  & h4 {
    font-size: 16px;
  }
  & h5 {
    font-size: 14px;
  }
  & h5,
  & h6 {
    font-weight: 600;
  }
  & h6 {
    font-size: 12px;
  }
  & p {
    margin: 15px 0;
  }
  & ul,
  & ol {
    padding-left: 20px;
  }
  & blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6a737d;
    padding: 0 1em;
    margin: 15px 0;
  }
`
