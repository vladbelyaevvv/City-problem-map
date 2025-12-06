import { BrowserRouter, Routes, Route} from "react-router-dom"

import { AboutPage } from "./pages/AboutPage"
import { EventsPage } from "./pages/EventsPage"
import { StatsPage } from "./pages/StatsPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<EventsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
