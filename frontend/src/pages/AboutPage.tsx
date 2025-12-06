import { Header, Footer, Card } from "ui-lib"

export function AboutPage() {
  return (
    <>
      <Header
        title="О проекте"
        nav={[
          { label: "События", href: "/events" },
          { label: "Статистика", href: "/stats" },
          { label: "О проекте", href: "/about" }
        ]}
      />

      <div style={{ padding: 20 }}>
        <Card>
          <h2>О проекте City Problem Map</h2>
          <p>
            Этот проект позволяет пользователям отмечать проблемы на карте города —
            такие как неисправности, аварии и другие события.
          </p>
          <p>
            В будущем здесь будет расширенное описание, ссылки, документация.
          </p>
        </Card>
      </div>

      <Footer />
    </>
  )
}
