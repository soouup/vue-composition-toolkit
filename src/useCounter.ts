import { ref, Ref, isRef } from '@vue/runtime-core'
import { assert, isNumber, isDef } from './utils'

type CounterArg<N = number> = Ref<N> | N

type ValueType = CounterArg | undefined
type RawValueType<V> = V extends CounterArg<infer M> ? M : undefined
function getRawValue<V extends ValueType>(val?: V): RawValueType<V> {
  return (isRef(val) ? val.value : val) as RawValueType<V>
}

function getValidValue(
  rawCount: CounterArg,
  min?: CounterArg,
  max?: CounterArg
) {
  rawCount = getRawValue(rawCount)
  min = getRawValue(min)
  max = getRawValue(max)
  if (isDef(min) && rawCount < min) rawCount = min
  if (isDef(max) && rawCount > max) rawCount = max
  return rawCount
}

type CounterResult = [
  Ref<number>,
  {
    inc(val?: CounterArg): void
    dec(val?: CounterArg): void
    set(val: CounterArg): void
    reset(): void
  }
]

export default function useCounter(
  count: CounterArg = 0,
  min?: CounterArg,
  max?: CounterArg
): CounterResult {
  // raw number
  count = getRawValue(count)
  min = getRawValue(min)
  max = getRawValue(max)

  if (__DEV__) {
    assert(
      isNumber(count),
      'Must pass a `number` or `Ref<number>` type parameter to useCounter, received(count): ',
      count
    )
    isDef(min) &&
      assert(
        isNumber(min),
        'Must pass a `number` or `Ref<number>` type parameter to useCounter, received(min): ',
        min
      )
    isDef(max) &&
      assert(
        isNumber(max),
        'Must pass a `number` or `Ref<number>` type parameter to useCounter, received(max): ',
        max
      )
  }

  // value guard
  count = getValidValue(count, min, max)

  // new refs
  const refCount = ref(count)
  const refMin = isDef(min) ? ref(min) : undefined
  const refMax = isDef(max) ? ref(max) : undefined

  function inc(val: CounterArg = 1) {
    if (!refMax || refCount.value < refMax.value) {
      refCount.value = getValidValue(
        refCount.value + getRawValue(val),
        min,
        max
      )
    }
  }

  function dec(val: CounterArg = 1) {
    if (!refMin || refCount.value > refMin.value) {
      refCount.value = getValidValue(
        refCount.value - getRawValue(val),
        min,
        max
      )
    }
  }

  function set(val: CounterArg) {
    refCount.value = getValidValue(val, refMin, refMax)
  }

  function reset() {
    refCount.value = count as number
  }

  return [
    refCount,
    {
      inc,
      dec,
      set,
      reset
    }
  ]
}
