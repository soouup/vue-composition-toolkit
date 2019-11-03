import { ref, onMounted, onUnmounted } from '@vue/runtime-dom'

export interface GeoLocationSensorState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | PositionError
}

export default function useGeolocation(options?: PositionOptions) {
  const refGeolocation = ref<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now()
  })

  const onEvent = (event: any) => {
    Object.assign(refGeolocation.value, {
      loading: false,
      accuracy: event.coords.accuracy,
      altitude: event.coords.altitude,
      altitudeAccuracy: event.coords.altitudeAccuracy,
      heading: event.coords.heading,
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      speed: event.coords.speed,
      timestamp: event.timestamp
    })
  }
  const onEventError = (error: PositionError) => {
    refGeolocation.value.loading = false
    refGeolocation.value.error = error
  }

  let watchId: number
  onMounted(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError, options)
    watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      options
    )
  })

  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchId)
  })

  return refGeolocation
}
