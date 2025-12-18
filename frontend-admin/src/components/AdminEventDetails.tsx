import { Button, Card } from "ui-lib"

import type { CityEvent, EventStatus } from "../utils/storage"

interface AdminEventDetailsProps {
  event: CityEvent;
  onStatusChange: (id: string, newStatus: EventStatus) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: EventStatus; label: string }[] = [
  { value: "new", label: "Новое" },
  { value: "in_progress", label: "В работе" },
  { value: "done", label: "Выполнено" },
]

export function AdminEventDetails({ event, onStatusChange, onDelete, onClose }: AdminEventDetailsProps) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
        <h3>Редактирование события</h3>
        <Button variant="secondary" onClick={onClose} style={{ padding: "4px 8px", fontSize: "0.8em" }}>
          ✕
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "0.85em", color: "#666" }}>Заголовок</div>
        <div style={{ fontWeight: 600, fontSize: "1.1em" }}>{event.title}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "0.85em", color: "#666" }}>Описание</div>
        <div>{event.description}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "0.85em", color: "#666" }}>Тип проблемы</div>
        <div>{event.type === "water" ? "Вода" : event.type === "heating" ? "Отопление" : event.type === "electricity" ? "Электричество" : "Другое"}</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: "0.85em", color: "#666", marginBottom: 6 }}>Статус</div>
        <div style={{ display: "flex", gap: 8 }}>
          {STATUS_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={event.status === opt.value ? "primary" : "secondary"}
              onClick={() => onStatusChange(event.id, opt.value)}
              style={{
                backgroundColor: event.status === opt.value 
                  ? (opt.value === "new" ? "#f59e0b" : opt.value === "in_progress" ? "#3b82f6" : "#10b981") 
                  : undefined,
                color: event.status === opt.value ? "#fff" : undefined,
                borderColor: "transparent"
              }}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
        <Button 
          variant="secondary" 
          onClick={() => onDelete(event.id)}
          style={{ width: "100%", backgroundColor: "#fee2e2", color: "#b91c1c", borderColor: "#fecaca" }}
        >
          Удалить событие
        </Button>
      </div>
    </Card>
  )
}
