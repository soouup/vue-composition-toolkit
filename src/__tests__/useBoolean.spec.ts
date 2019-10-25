import useToggle from '../useToggle'
import useBoolean from '../useBoolean'

describe('useBoolean', () => {
  test('useBoolean should be an alias for useToggle', () => {
    expect(useBoolean).toBe(useToggle)
  })
})
