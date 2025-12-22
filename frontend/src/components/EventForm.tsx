import { useState } from "react"

import { Button, Card, Input } from "ui-lib"

import type { CityEvent } from "../utils/storage"

interface EventFormProps {
  point: [number, number] | null;
  onSave: (title: string, description: string, type: CityEvent["type"]) => void;
  onCancel: () => void;
}

export function EventForm({ point, onSave, onCancel }: EventFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<CityEvent["type"]>("other")

  const handleSave = () => {
    if (!title.trim()) return
    onSave(title, description, type)
  }

  return (
    <Card>
      <h3>Новое событие</h3>
      {!point && <p style={{ color: "#e63946" }}>Кликни по карте, чтобы выбрать точку.</p>}

      <p>Тип проблемы:</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["water", "heating", "electricity", "other"] as const).map((t) => (
          <Button
            key={t}
            variant={type === t ? "primary" : "secondary"}
            onClick={() => setType(t)}
          >
            {t === "water" ? "Вода" : t === "heating" ? "Отопление" : t === "electricity" ? "Электричество" : "Другое"}
          </Button>
        ))}
      </div>

      <div style={{ height: 12 }} />
      <Input value={title} onChange={setTitle} placeholder="Название проблемы" />
      <div style={{ height: 12 }} />
      <Input value={description} onChange={setDescription} placeholder="Описание проблемы" />
      <div style={{ height: 12 }} />

      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="primary" onClick={handleSave}>Сохранить</Button>
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
      </div>
    </Card>
  )
}
