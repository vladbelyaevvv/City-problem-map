import { Card } from "ui-lib"

export function AboutPage() {
  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      padding: "20px",
      gap: "24px"
    }}>
      
      {/* главная инфа*/}
      <Card>
        <h2>City Problem Map</h2>
        <p>
          Веб-приложение для отметки и отслеживания коммунальных проблем города. 
          Пользователи отмечают проблемы на карте, администраторы меняют статусы.
        </p>
        <div style={{display: "flex", gap: 16, fontSize: "0.9em", color: "#666"}}>
          <span>React 19 + TypeScript + Yandex Maps</span>
          <span>LocalStorage</span>
          <span>Монорепозиторий (npm workspaces)</span>
        </div>
      </Card>

      {/* роли*/}
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24}}>
        <Card>
          <h3>👤 Обычный пользователь</h3>
          <ul>
            <li>Добавляет события на карту</li>
            <li>Фильтрует по типам</li>
            <li>Просматривает статистику</li>
          </ul>
        </Card>

        <Card>
          <h3>⚙️ Администратор</h3>
          <ul>
            <li>Управляет всеми событиями</li>
            <li>Меняет статусы (новое → в работе → выполнено)</li>
            <li>Удаляет события</li>
            <li>Расширенная статистика</li>
          </ul>
        </Card>
      </div>

      {/* use cases */}
      <Card>
        <h3>🎯 Как это работает</h3>
        <ol>
          <li>Пользователь кликает по карте → появляется форма</li>
          <li>Выбирает тип проблемы (вода/отопление/электричество)</li>
          <li>Событие сохраняется в LocalStorage</li>
          <li>Админ меняет статус → "в работе" → "выполнено"</li>
        </ol>
      </Card>

      {/* архитектура */}
      <Card>
        <h3>🏗️ Архитектура проекта</h3>
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
          <p>
            frontend/ — клиентское приложение
          </p>
          <p>
            frontend-admin/ — админ-панель  
          </p>
          <p>
            ui-lib/ — общие UI-компоненты (Header, Map, Button...)
          </p>
        </div>
      </Card>

      {/* о стеке технологий */}
      <Card>
        <h3>🛠️ Стек технологий</h3>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12}}>
          <div>React 19.2</div>
          <div>TypeScript 5.9</div>
          <div>Vite 7.2</div>
          <div>Yandex Maps API</div>
          <div>React Router 7</div>
          <div>LocalStorage</div>
        </div>
      </Card>
    </div>
  )
}
