import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import { AdminEventsPage } from "./pages/AdminEventsPage"
import { AdminStatsPage } from "./pages/AdminStatsPage"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/admin/events">События</Link> |{" "}
          <Link to="/admin/stats">Статистика</Link>
        </nav>

        <Routes>
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/admin/stats" element={<AdminStatsPage />} />
          <Route path="*" element={<AdminEventsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
