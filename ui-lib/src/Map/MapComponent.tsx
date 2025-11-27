import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps'
import { useState, useMemo } from 'react'

export type LatLng = number[]

export type Marker = {
  id: string
  type: string
  position: LatLng
  title: string
}

export interface MapProps {
  startPosition: LatLng
  markers: Marker[]
  width?: string | number
  height?: string | number
  zoom?: number
  onMapClick?: (coords: LatLng) => void
  onMarkerClick?: (id: string) => void
}

export function MapComponent(props: MapProps) {
  const {
    startPosition,
    markers,
    width = "100%",
    height = "400px",
    zoom = 12,
    onMapClick,
    onMarkerClick
  } = props

  const [currentZoom, setCurrentZoom] = useState(zoom)

  const mapState = useMemo(() => ({
    center: startPosition,
    zoom: currentZoom
  }), [startPosition, currentZoom])

  type YMapClickEvent = {
    get: (key: string) => LatLng
  }

  return (
    <div style={{ width, height, position: "relative" }}>
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000
      }}>
        <button onClick={() => setCurrentZoom(z => z + 1)}>+</button>
        <button onClick={() => setCurrentZoom(z => z - 1)}>-</button>
      </div>

      <YMaps>
        <Map
          state={mapState}
          width="100%"
          height="100%"
          onClick={(e: YMapClickEvent) => {
            const coords = e.get("coords")
            onMapClick?.(coords)
          }}
        >
          {markers.map((m) => (
            <Placemark
              key={m.id}
              geometry={m.position}
              onClick={() => onMarkerClick?.(m.id)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  )
}
