import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../../ui-lib/src/Header/Header"; // Поправь путь импорта если нужно
import { Footer } from "../../ui-lib/src/Footer/Footer"; // Поправь путь импорта если нужно
import { AboutPage } from "./pages/AboutPage";
import { EventsPage } from "./pages/EventsPage";
import { StatsPage } from "./pages/StatsPage";
import "./App.css";

// Конфигурация меню
const NAVIGATION = [
  { label: "Карта событий", href: "/events" },
  { label: "Статистика", href: "/stats" },
  { label: "О проекте", href: "/about" },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Header title="City Problem Map" nav={NAVIGATION} />
        
        <main className="app-content">
          <Routes>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<EventsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
