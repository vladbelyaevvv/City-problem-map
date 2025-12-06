import { useState } from "react"

import { Header, Footer, MapComponent, Button, Input, Card } from "ui-lib"

export function EventsPage() {
  const [point, setPoint] = useState<[number, number] | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <>
      <Header
        title="City Problem Map"
        nav={[
          { label: "События", href: "/events" },
          { label: "Статистика", href: "/stats" },
          { label: "О проекте", href: "/about" }
        ]}
      />

      <div style={{ padding: 20 }}>
        <h2>Проблемы на карте</h2>

        <Button variant="primary" onClick={() => alert("Открыть форму")}>
          Добавить событие
        </Button>

        <br /><br />

        <MapComponent
          startPosition={[55.8, 49.1]}
          markers={[]}
          onMapClick={coords => setPoint(coords)}
        />

        {point && (
          <Card>
            <h3>Новое событие</h3>

            <Input
              value={title}
              onChange={setTitle}
              placeholder="Название проблемы"
            />

            <br />

            <Input
              value={description}
              onChange={setDescription}
              placeholder="Описание проблемы"
            />

            <br />

            <Button variant="primary">Сохранить</Button>
            <Button variant="secondary" onClick={() => setPoint(null)}>
              Отмена
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </>
  )
}
