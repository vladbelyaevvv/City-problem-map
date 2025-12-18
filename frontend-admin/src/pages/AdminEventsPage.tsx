import { useEffect, useState, useMemo } from "react"

import { MapComponent } from "ui-lib"

import { AdminEventDetails } from "../components/AdminEventDetails"
import { AdminEventList } from "../components/AdminEventList"
import { loadEvents, saveEvents, CityEvent, EventStatus } from "../utils/storage"

const TYPE_COLORS = {
  water: "#3b82f6",
  heating: "#ef4444",
  electricity: "#eab308",
  other: "#9ca3af",
}

export function AdminEventsPage() {
  const [events, setEvents] = useState<CityEvent[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  useEffect(() => {
    setEvents(loadEvents()) // загрузка событий при старте

    const handleStorage = () => setEvents(loadEvents())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const handleSelect = (id: string) => {
    setSelectedEventId(id)
    setTimeout(() => {
      const listItem = document.getElementById(`event-item-${id}`)
      listItem?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const handleDelete = (id: string) => {
    if (confirm("Удалить событие безвозвратно?")) {
      const next = events.filter(e => e.id !== id)
      setEvents(next)
      saveEvents(next)
      if (selectedEventId === id) setSelectedEventId(null)
    }
  }

  const handleStatusChange = (id: string, newStatus: EventStatus) => {
    const next = events.map(e => e.id === id ? { ...e, status: newStatus } : e)
    setEvents(next)
    saveEvents(next)
  }

  //маркеры для карты
  const markers = useMemo(() => {
    return events.map((e) => ({
      id: e.id,
      type: e.type,
      position: e.position,
      title: `${e.title} (${e.status})`,
      color: selectedEventId === e.id 
        ? "#000000" 
        : (TYPE_COLORS[e.type as keyof typeof TYPE_COLORS] || TYPE_COLORS.other)
    }))
  }, [events, selectedEventId])

  const selectedEvent = useMemo(() => 
    events.find(e => e.id === selectedEventId), 
  [events, selectedEventId])

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <h2>Администрирование</h2>
      <div style={{ height: 16 }} />

      <div className="admin-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 400px",
        gap: 20, 
        height: "100%" 
      }}>
        
        {/* Карта */}
        <div style={{ minHeight: "500px", height: "100%" }}>
          <MapComponent
            startPosition={[55.8, 49.1]}
            markers={markers}
            onMapClick={() => setSelectedEventId(null)} //сбрасывает выделение
            onMarkerClick={handleSelect}
            height="100%"
          />
        </div>

        {/* Правая панель */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Если событие выбрано - показываем детали, иначе список */}
          {selectedEvent ? (
            <AdminEventDetails 
              event={selectedEvent}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onClose={() => setSelectedEventId(null)}
            />
          ) : (
            <div style={{ padding: 10, background: "#e0f2fe", borderRadius: 8, color: "#0369a1", fontSize: "0.9em" }}>
              Выберите маркер на карте или событие в списке для редактирования.
            </div>
          )}

          <AdminEventList 
            events={events}
            selectedEventId={selectedEventId}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
