import { Header, Footer, Card } from "ui-lib"

export function StatsPage() {
  return (
    <>
      <Header
        title="Статистика"
        nav={[
          { label: "События", href: "/events" },
          { label: "Статистика", href: "/stats" },
          { label: "О проекте", href: "/about" }
        ]}
      />

      <div style={{ padding: 20 }}>
        <Card>
          <h2>Статистика событий</h2>
          <p>Здесь позже будет график или таблица статистики.</p>
        </Card>
      </div>

      <Footer />
    </>
  )
}
