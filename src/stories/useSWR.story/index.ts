import { h } from '@vue/runtime-dom'
import fetch from 'unfetch'
import { useSWR } from '../../index'

const reason = {
  fresh:
    '【fresh】Is fresh, use the cache to satisfy the request, and no need to revalidate.',
  stale:
    '【stale】The cached value will be stale, but will be used to fulfill the API request, at the same time, "in the background", a revalidation request will be made.',
  network:
    '【network】Requests fall outside of the `stale-while-revalidate` window, getting the response from the network.'
}

interface Person {
  login: string
}

export default {
  setup() {
    const [fetcher, { refData, refError, refReason }] = useSWR<Person[]>(
      'contributors',
      async () => {
        const res = await fetch(
          'https://api.github.com/repos/vuejs/vue-next/contributors'
        )
        return await res.json()
      },
      {
        maxAge: 10000,
        swr: 10000,
        initial: false
      }
    )

    return () =>
      h('div', [
        h(
          'button',
          {
            onClick() {
              fetcher()
            }
          },
          'do fetch'
        ),
        h('p', 'what reason: ' + reason[refReason.value]),
        refError.value
          ? h('h1', 'Error')
          : refData.value
          ? [
              h('h1', 'Contributors:'),
              h(
                'ul',
                { style: { color: 'green' } },
                refData.value.map(o => h('li', o.login))
              )
            ]
          : h('h1', 'Loading')
      ])
  }
}

export const code = `
\`\`\`js
export default {
  setup() {
    const [fetcher, { refData, refError, refReason }] = useSWR(
      'contributors',
      async () => {
        const res = await fetch(
          'https://api.github.com/repos/vuejs/vue-next/contributors'
        )
        return await res.json()
      },
      {
        maxAge: 10000,
        swr: 10000,
        initial: false
      }
    )

    return () =>
      h('div', [
        h(
          'button',
          {
            onClick() {
              fetcher()
            }
          },
          'do fetch'
        ),
        h('p', 'what reason: ' + reason[refReason.value]),
        refError.value
          ? h('h1', 'Error')
          : refData.value
          ? h('pre', JSON.stringify(refData.value, null, 2))
          : h('h1', 'Loading')
      ])
  }
}
\`\`\`
`
