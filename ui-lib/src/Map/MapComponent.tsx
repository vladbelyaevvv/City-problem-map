import { useState, useRef } from 'react'

import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps'

export type LatLng = [number, number]

export type Marker = {
  id: string
  type: string
  position: LatLng
  title: string
  color?: string
}

export interface MapProps {
  startPosition: LatLng
  markers: Marker[]
  width?: string | number
  height?: string | number
  zoom?: number
  onMapClick?: (coords: LatLng) => void
  onMarkerClick?: (id: string) => void
  tempMarkerPosition?: LatLng | null
}

interface YMapInstance {
  getCenter: () => LatLng;
  getZoom: () => number;
}

interface YMapEvent {
  // get позовляет достать координаты клика
  get: (key: 'coords') => LatLng; 
  // тут лежит ссылка на карту
  originalEvent: {
    map: YMapInstance;
  };
}

export function MapComponent(props: MapProps) {
  const {
    startPosition,
    markers,
    width = "100%",
    height = "400px",
    zoom = 12,
    onMapClick,
    onMarkerClick,
    tempMarkerPosition
  } = props

  const [mapState, setMapState] = useState({
    center: startPosition,
    zoom: zoom,
    controls: [] as string[] 
  })

  const handleZoom = (delta: number) => {
    setMapState(prev => ({ ...prev, zoom: prev.zoom + delta }))
  }
  
  const mapRef = useRef<YMapInstance | null>(null)

  return (
    <div style={{ width, height, position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid #e1e1e3" }}>
      <div style={{
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 5
      }}>
        <button 
          type="button"
          onClick={() => handleZoom(1)}
          style={{
            width: 32, height: 32, borderRadius: 6, border: "none", 
            background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            cursor: "pointer", fontSize: 18, fontWeight: "bold", color: "#333",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          +
        </button>
        <button 
          type="button"
          onClick={() => handleZoom(-1)}
          style={{
            width: 32, height: 32, borderRadius: 6, border: "none", 
            background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            cursor: "pointer", fontSize: 18, fontWeight: "bold", color: "#333",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          -
        </button>
      </div>

      <YMaps>
        <Map
          state={mapState}
          width="100%"
          height="100%"
          
          instanceRef={(ref) => { 
            if (ref) mapRef.current = ref as unknown as YMapInstance 
          }}

          onBoundsChange={(e: unknown) => {
            const event = e as YMapEvent
            const newCenter = event.originalEvent.map.getCenter()
            const newZoom = event.originalEvent.map.getZoom()
             
            setMapState(prev => ({ ...prev, center: newCenter, zoom: newZoom }))
          }}

          onClick={(e: unknown) => {
            const event = e as YMapEvent
            const coords = event.get("coords")
            onMapClick?.(coords)
          }}
        >
          {markers.map((m) => (
            <Placemark
              key={m.id}
              geometry={m.position}
              properties={{
                hintContent: m.title,
              }}
              options={{
                iconColor: m.color || '#1e98ff'
              }}
              onClick={() => onMarkerClick?.(m.id)}
            />
          ))}

          {tempMarkerPosition && (
            <Placemark
              geometry={tempMarkerPosition}
              options={{
                preset: 'islands#redIcon',
                draggable: true,
              }}
              properties={{
                iconCaption: 'Новое событие?'
              }}
            />
          )}

        </Map>
      </YMaps>
    </div>
  )
}
