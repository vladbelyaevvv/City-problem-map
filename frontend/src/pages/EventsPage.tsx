import { useEffect, useState } from "react"
import { MapComponent, Button, Input, Card } from "ui-lib"
import type { CityEvent } from "../utils/storage"
import { loadEvents, saveEvents } from "../utils/storage"
// Обрати внимание: импорты Header и Footer удалены

const TYPE_COLORS = {
  water: "#3b82f6",       // Синий
  heating: "#ef4444",     // Красный
  electricity: "#eab308", // Желтый
  other: "#9ca3af"        // Серый
};

const TYPE_LABELS = {
  water: "Вода",
  heating: "Отопление",
  electricity: "Электричество",
  other: "Другое"
};

export function EventsPage() {
  const [point, setPoint] = useState<[number, number] | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [events, setEvents] = useState<CityEvent[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [type, setType] = useState<CityEvent["type"]>("other")
  const [filterType, setFilterType] = useState<CityEvent["type"] | "all">("all")
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(loadEvents())
  }, [])
  
  const handleEventSelect = (id: string) => {
    setSelectedEventId(id);
  };

  const filteredEvents = filterType === "all" ? events : events.filter((e) => e.type === filterType)

  const markers = filteredEvents.map((e) => ({
    id: e.id,
    type: e.type,
    position: e.position,
    title: e.title,
    color: selectedEventId === e.id 
           ? "#000000" // цвет выбранного маркера
           : (TYPE_COLORS[e.type as keyof typeof TYPE_COLORS] || TYPE_COLORS.other)
  }))

  function handleSave() {
    if (!point) return

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) return

    const newEvent: CityEvent = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      type: type,
      position: point,
      description: trimmedDescription,
      status: "new",
    }

    const next = [newEvent, ...events]

    saveEvents(next)
    setEvents(next)

    setPoint(null)
    setTitle("")
    setDescription("")
    setIsFormOpen(false)
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <h2>Проблемы на карте</h2>

      <div style={{ height: 16 }} />

      {/* Адаптивная сетка: на десктопе 2 колонки, на мобильном 1 */}
      <div
        className="events-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px", // Правая колонка фиксирована, левая занимает всё место
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
              setSelectedEventId(null);
            }}
            onMarkerClick={(id) => {
              const event = events.find(e => e.id === id);
              if(event) {
                handleEventSelect(event.id);
                const listItem = document.getElementById(`event-item-${id}`);
                listItem?.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            // Карта будет занимать 100% высоты контейнера, но не менее 500px
            height="100%" 
          />
        </div>

        {/* Правая колонка — форма/фильтр/список */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Button
            variant="primary"
            onClick={() => {
              setIsFormOpen(true)
              setPoint(null)
            }}
          >
            Добавить событие
          </Button>
          
          {isFormOpen && (
            <Card>
              <h3>Новое событие</h3>

              {!point && <p style={{color: "#e63946"}}>Кликни по карте, чтобы выбрать точку.</p>}

              <p>Тип проблемы:</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button
                  variant={type === "water" ? "primary" : "secondary"}
                  onClick={() => setType("water")}
                >
                  Вода
                </Button>

                <Button
                  variant={type === "heating" ? "primary" : "secondary"}
                  onClick={() => setType("heating")}
                >
                  Отопление
                </Button>

                <Button
                  variant={type === "electricity" ? "primary" : "secondary"}
                  onClick={() => setType("electricity")}
                >
                  Электричество
                </Button>

                <Button
                  variant={type === "other" ? "primary" : "secondary"}
                  onClick={() => setType("other")}
                >
                  Другое
                </Button>
              </div>

              <div style={{ height: 12 }} />

              <Input
                value={title}
                onChange={setTitle}
                placeholder="Название проблемы"
              />

              <div style={{ height: 12 }} />

              <Input
                value={description}
                onChange={setDescription}
                placeholder="Описание проблемы"
              />

              <div style={{ height: 12 }} />

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button variant="primary" onClick={handleSave}>
                  Сохранить
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsFormOpen(false)
                    setPoint(null)
                    setTitle("")
                    setDescription("")
                  }}
                >
                  Отмена
                </Button>
              </div>
            </Card>
          )}

          <Card>
            <h3>Фильтр по типу</h3>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button
                variant={filterType === "all" ? "primary" : "secondary"}
                onClick={() => setFilterType("all")}
              >
                Все
              </Button>

              <Button
                variant={filterType === "water" ? "primary" : "secondary"}
                onClick={() => setFilterType("water")}
              >
                Вода
              </Button>

              <Button
                variant={filterType === "heating" ? "primary" : "secondary"}
                onClick={() => setFilterType("heating")}
              >
                Отопление
              </Button>

              <Button
                variant={filterType === "electricity" ? "primary" : "secondary"}
                onClick={() => setFilterType("electricity")}
              >
                Электричество
              </Button>

              <Button
                variant={filterType === "other" ? "primary" : "secondary"}
                onClick={() => setFilterType("other")}
              >
                Другое
              </Button>
            </div>
          </Card>

          <Card
            style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
          >
            <h3>Список событий</h3>
            <p style={{fontSize: "0.9em", color: "#666", marginBottom: 10}}>
              Всего событий: {filteredEvents.length}
            </p>

            {events.length === 0 ? (
              <p>Событий пока нет.</p>
            ) : (
              <ul style={{ 
                paddingLeft: 20, 
                margin: 0,
                overflowY: "auto", 
                maxHeight: "400px", 
                paddingRight: "10px" 
              }}>
                {filteredEvents.map((e) => (
                  <li 
                    key={e.id} 
                    id={`event-item-${e.id}`}
                    onClick={() => handleEventSelect(e.id)}
                    style={{
                      marginBottom: 12, 
                      cursor: "pointer", 
                      backgroundColor: selectedEventId === e.id ? "#f3f4f6" : "transparent",
                      padding: "8px", 
                      borderRadius: "8px", 
                      border: selectedEventId === e.id ? "1px solid #3b82f6" : "1px solid transparent",
                      transition: "all 0.2s"
                    }}
                    >
                    <div style={{fontWeight: 600}}>{e.title}</div>
                    
                    <div style={{display: "flex", alignItems: "center", gap: 8, marginTop: 4}}>
                       <span style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: TYPE_COLORS[e.type as keyof typeof TYPE_COLORS] || "#ccc"
                       }} />
                       
                       <span style={{fontSize: "0.85em", color: "#555"}}>
                         {TYPE_LABELS[e.type as keyof typeof TYPE_LABELS] || e.type}
                       </span>

                       <span style={{
                         display: "inline-block",
                         padding: "2px 6px",
                         borderRadius: 4,
                         fontSize: "0.75em",
                         backgroundColor: e.status === "new" ? "#ffec99" : "#b2f2bb",
                         color: "#1f2937",
                         marginLeft: "auto" 
                       }}>
                         {e.status}
                       </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
      
      {/* Добавим стиль для медиа-запроса через тег style (или перенеси это в css файл) */}
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
