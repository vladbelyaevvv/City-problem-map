import { useEffect, useState } from "react"

import { Card } from "ui-lib"

import { loadEvents, CityEvent } from "../utils/storage"

export function AdminStatsPage() {
  const [events, setEvents] = useState<CityEvent[]>([])

  useEffect(() => {
    setEvents(loadEvents())
  }, [])

  const total = events.length
  const done = events.filter(e => e.status === 'done').length
  const inProgress = events.filter(e => e.status === 'in_progress').length
  const newEvents = events.filter(e => e.status === 'new').length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 20 }}>
      <h2>Статистика системы</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        <Card style={{ textAlign: "center", borderTop: "4px solid #3b82f6" }}>
          <div style={{ fontSize: "3em", fontWeight: "bold", color: "#3b82f6" }}>{total}</div>
          <div style={{ color: "#666" }}>Всего заявок</div>
        </Card>
        
        <Card style={{ textAlign: "center", borderTop: "4px solid #f59e0b" }}>
          <div style={{ fontSize: "3em", fontWeight: "bold", color: "#f59e0b" }}>{newEvents}</div>
          <div style={{ color: "#666" }}>Новых</div>
        </Card>
        
        <Card style={{ textAlign: "center", borderTop: "4px solid #60a5fa" }}>
          <div style={{ fontSize: "3em", fontWeight: "bold", color: "#60a5fa" }}>{inProgress}</div>
          <div style={{ color: "#666" }}>В работе</div>
        </Card>
        
        <Card style={{ textAlign: "center", borderTop: "4px solid #10b981" }}>
          <div style={{ fontSize: "3em", fontWeight: "bold", color: "#10b981" }}>{done}</div>
          <div style={{ color: "#666" }}>Выполнено</div>
        </Card>
      </div>
    </div>
  )
}
