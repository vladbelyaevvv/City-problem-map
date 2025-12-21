import { useEffect, useState, useMemo } from "react"

import { MapComponent, Button, Card } from "ui-lib"

import { EventForm } from "../components/EventForm"
import { EventList } from "../components/EventList"
import { loadEvents, saveEvents } from "../utils/storage"

import type { CityEvent } from "../utils/storage"

const TYPE_COLORS = {
  water: "#3b82f6",       
  heating: "#ef4444",     
  electricity: "#eab308", 
  other: "#9ca3af"        
}

export function EventsPage() {
  const [point, setPoint] = useState<[number, number] | null>(null)
  
  // Состояния для данных формы удалены отсюда, они теперь внутри EventForm
  
  const [events, setEvents] = useState<CityEvent[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filterType, setFilterType] = useState<CityEvent["type"] | "all">("all")
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  useEffect(() => {
    setEvents(loadEvents())
  }, [])
  
  const handleEventSelect = (id: string) => {
    setSelectedEventId(id)
    // Скролл к элементу списка
    setTimeout(() => {
      const listItem = document.getElementById(`event-item-${id}`)

      listItem?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const filteredEvents = useMemo(() => {
    return filterType === "all" ? events : events.filter((e) => e.type === filterType)
  }, [filterType, events])

  const markers = useMemo(() => {
    return filteredEvents.map((e) => ({
      id: e.id,
      type: e.type,
      position: e.position,
      title: e.title,
      color: selectedEventId === e.id 
        ? "#000000" // цвет выбранного маркера
        : (TYPE_COLORS[e.type as keyof typeof TYPE_COLORS] || TYPE_COLORS.other)
    }))
  }, [filteredEvents, selectedEventId])

  // Функция сохранения теперь принимает данные из формы
  function handleSave(title: string, description: string, type: CityEvent["type"]) {
    if (!point) return

    const newEvent: CityEvent = {
      id: crypto.randomUUID(),
      title: title,
      type: type,
      position: point,
      description: description,
      status: "new",
    }

    const next = [newEvent, ...events]

    saveEvents(next)
    setEvents(next)

    setPoint(null)
    setIsFormOpen(false)
  }

  function handleCancel() {
    setIsFormOpen(false)
    setPoint(null)
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <h2>Проблемы на карте</h2>

      <div style={{ height: 16 }} />

      <div
        className="events-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px", 
          gap: 20,
          alignItems: "start",
          height: "100%"
        }}
      >
        {/* Левая колонка — карта */}
        <div style={{ minHeight: "500px", height: "100%" }}>
          <MapComponent
            startPosition={[55.8, 49.1]}
            markers={markers}
            tempMarkerPosition={point}
            onMapClick={(coords) => {
              setIsFormOpen(true)
              setPoint(coords)
              setSelectedEventId(null)
            }}
            onMarkerClick={(id) => handleEventSelect(id)}
            height="100%" 
          />
        </div>

        {/* Правая колонка */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Кнопка добавления (если форма закрыта) */}
          {!isFormOpen && (
            <Button
              variant="primary"
              onClick={() => {
                setIsFormOpen(true)
                setPoint(null) // Сбрасываем точку, чтобы пользователь выбрал новую
              }}
            >
                Добавить событие
            </Button>
          )}
          
          {/* Форма добавления */}
          {isFormOpen && (
            <EventForm 
              point={point}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          {/* Фильтр */}
          <Card>
            <h3>Фильтр по типу</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["all", "water", "heating", "electricity", "other"] as const).map(ft => (
                <Button
                  key={ft}
                  variant={filterType === ft ? "primary" : "secondary"}
                  onClick={() => setFilterType(ft)}
                >
                  {ft === "all" ? "Все" : 
                    ft === "water" ? "Вода" : 
                      ft === "heating" ? "Отопление" : 
                        ft === "electricity" ? "Электричество" : "Другое"}
                </Button>
              ))}
            </div>
          </Card>

          {/* Список */}
          <EventList 
            events={filteredEvents}
            selectedEventId={selectedEventId}
            onSelect={handleEventSelect}
          />

        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .events-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
