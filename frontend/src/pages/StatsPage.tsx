import { useEffect, useMemo, useState } from "react"
import { Card } from "ui-lib"
import type { CityEvent, EventType } from "../utils/storage"
import { loadEvents } from "../utils/storage"

const TYPE_COLORS = {
  water: "#3b82f6",
  heating: "#ef4444", 
  electricity: "#eab308",
  other: "#9ca3af"
}

type TypeStats = Record<EventType, number>

export function StatsPage() {
  const [events, setEvents] = useState<CityEvent[]>([])

  useEffect(() => {
    setEvents(loadEvents())
  }, [])

  const byType = useMemo<TypeStats>(() => {
    return events.reduce<TypeStats>(
      (acc, event) => {
        acc[event.type] += 1
        return acc
      }, 
      {water: 0, heating: 0, electricity: 0, other: 0}
    )
  }, [events])

  const byStatus = useMemo(() => {
    return events.reduce<Record<string, number>>(
      (acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1
        return acc
      },
      {}
    )
  }, [events])

  const total = events.length

  return (
    <>
      <div style={{ 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        padding: "20px",
        gap: "20px"
      }}>
        <h2>Статистика</h2>
          <Card>
          <h3 style={{marginBottom: 16}}>Общая статистика</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16}}>
            <div style={{textAlign: "center"}}>
              <div style={{fontSize: "2.5em", fontWeight: "bold", color: "#3b82f6"}}>
                {total}
              </div>
              <div style={{fontSize: "0.9em", color: "#666"}}>Всего событий</div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 style={{marginBottom: 16}}>По типам проблем</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16}}>
            {Object.entries(byType).map(([type, count]) => (
              <div key={type} style={{display: "flex", alignItems: "center", gap: 12}}>
                <div style={{
                  width: 12, height: 12, 
                  borderRadius: "50%", 
                  backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS]
                }} />
                  <div style={{fontWeight: 600, marginBottom: 4}}>
                    {type === "water" ? "Вода" : 
                    type === "heating" ? "Отопление" : 
                    type === "electricity" ? "Электричество" : "Другое"}
                  </div>
                  <div style={{fontSize: "1.2em", fontWeight: "bold"}}>{count}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 style={{marginBottom: 16}}>По статусам</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16}}>
            {Object.entries(byStatus).map(([status, count]) => (
              <div key={status} style={{textAlign: "center"}}>
                <div style={{
                  fontSize: "1.5em", 
                  fontWeight: "bold",
                  color: status === "new" ? "#f59e0b" : 
                        status === "in-progress" ? "#3b82f6" : "#10b981"
                }}>
                  {count}
                </div>
                <div style={{fontSize: "0.9em", color: "#666", textTransform: "capitalize"}}>
                  {status.replace("-", " ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}