import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header, Footer } from "ui-lib"

import { AdminEventsPage } from "./pages/AdminEventsPage"
import { AdminStatsPage } from "./pages/AdminStatsPage"
import "./App.css"

const ADMIN_NAV = [
  { label: "Карта и управление", href: "/admin/events" },
  { label: "Статистика", href: "/admin/stats" },
]

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Header title="City Problem  Map Admin" nav={ADMIN_NAV} />
        <main className="app-content">
          <Routes>
            <Route path="/admin/events" element={<AdminEventsPage />} />
            <Route path="/admin/stats" element={<AdminStatsPage />} />
            <Route path="*" element={<AdminEventsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
