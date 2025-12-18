import { Card } from "ui-lib";
import type { CityEvent } from "../utils/storage";

const TYPE_COLORS = {
  water: "#3b82f6",
  heating: "#ef4444",
  electricity: "#eab308",
  other: "#9ca3af",
};

const TYPE_LABELS: Record<string, string> = {
  water: "Вода",
  heating: "Отопление",
  electricity: "Электричество",
  other: "Другое",
};

interface EventListProps {
  events: CityEvent[];
  selectedEventId: string | null;
  onSelect: (id: string) => void;
}

export function EventList({ events, selectedEventId, onSelect }: EventListProps) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <h3>Список событий</h3>
      <p style={{ fontSize: "0.9em", color: "#666", marginBottom: 10 }}>
        Всего событий: {events.length}
      </p>

      {events.length === 0 ? (
        <p>Событий пока нет.</p>
      ) : (
        <ul style={{ paddingLeft: 0, margin: 0, overflowY: "auto", maxHeight: "400px", paddingRight: "10px", listStyle: "none" }}>
          {events.map((e) => (
            <li
              key={e.id}
              id={`event-item-${e.id}`}
              onClick={() => onSelect(e.id)}
              style={{
                marginBottom: 12,
                cursor: "pointer",
                backgroundColor: selectedEventId === e.id ? "#f3f4f6" : "transparent",
                padding: "8px",
                borderRadius: "8px",
                border: selectedEventId === e.id ? "1px solid #3b82f6" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontWeight: 600 }}>{e.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <span style={{
                    display: "inline-block", width: 10, height: 10, borderRadius: "50%",
                    backgroundColor: TYPE_COLORS[e.type as keyof typeof TYPE_COLORS] || "#ccc"
                  }} 
                />
                <span style={{ fontSize: "0.85em", color: "#555" }}>
                  {TYPE_LABELS[e.type] || e.type}
                </span>
                <span style={{
                    display: "inline-block", padding: "2px 6px", borderRadius: 4, fontSize: "0.75em",
                    backgroundColor: e.status === "new" ? "#ffec99" : e.status === "in_progress" ? "#93c5fd" : "#b2f2bb",
                    color: "#1f2937", marginLeft: "auto"
                  }}
                >
                  {e.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
