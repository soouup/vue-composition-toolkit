import { h, Ref, render, nextTick } from '@vue/runtime-dom'
import useCssVar from '../useCssVar'

// mock
window.getComputedStyle = jest.fn().mockImplementation((el: HTMLElement) => {
  return {
    getPropertyValue(varName: string) {
      return (el.style as any)[varName]
    }
  }
})
document.documentElement.style.setProperty = jest
  .fn()
  .mockImplementation((varName: string, val: string) => {
    ;(document.documentElement.style as any)[varName] = val
  })
document.documentElement.style.setProperty('--css-var', '1')

describe('useCssVar', () => {
  test('should work', async () => {
    let refVar: Ref<string>
    const App = {
      setup() {
        refVar = useCssVar('--css-var')

        return () => h('div')
      }
    }

    const root = document.createElement('div')
    render(h(App), root)
    await nextTick()
    expect(refVar!.value).toBe('1')
    refVar!.value = '2'
    await nextTick()
    expect(
      getComputedStyle(document.documentElement).getPropertyValue('--css-var')
    ).toBe('2')
  })
})
