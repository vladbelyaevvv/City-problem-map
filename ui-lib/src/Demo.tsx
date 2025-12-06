import { useState } from "react"

import { Button } from "./Button/Button"
import { Card } from "./Card/Card"
import { Footer } from "./Footer/Footer"
import { Header } from "./Header/Header"
import { Input } from "./Input/Input"
import { MapComponent } from "./Map/MapComponent"

export function Demo() {
  const [title, setTitle] = useState("")

  return (
    <>
      <Header 
        title="UI Playground"
        nav={[
          { label: "Главная", href: "#" },
          { label: "Компоненты", href: "#" },
          { label: "О нас", href: "#" },
        ]}
      />

      <div style={{ padding: 20 }}>
        <h1>UI Library Playground</h1>

        <Button variant="primary">Primary Button</Button>
        <br /><br />

        <Button variant="secondary">Secondary Button</Button>
        <br /><br />

        <Input 
          value={title}
          onChange={(val) => setTitle(val)}
        />
        <br /><br />

        <Card>Карточка</Card>
        <MapComponent
          startPosition={[55.820784, 49.136045]}
          markers={[]}
          onMapClick={(coords)=> console.log("Клик по карте:", coords)}
        />
        <Footer></Footer>
      </div>
    </>
  )
}
