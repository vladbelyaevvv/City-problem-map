# Архитектурные требования для курсовой работы "City Problem Map"

## 1. Общая структура проекта

Проект выполнен как монорепозиторий (npm workspaces) и включает три отдельных приложения:

```
City-problem-map/
  frontend/         — клиентское приложение для обычного пользователя
  frontend-admin/   — административная панель
  ui-lib/           — библиотека общих UI-компонентов
  package.json      — корневой workspace
```
---

## 2. frontend (пользовательское приложение)

### Структура
```
frontend/
  src/
    pages/
      EventsPage.tsx
      StatsPage.tsx
      AboutPage.tsx
    components/
      EventForm/
      EventList/
    utils/
      storage.ts
    App.tsx
    main.tsx
  vite.config.ts
  tsconfig.json
```

### Ключевые компоненты
- EventsPage — карта и события
- StatsPage — статистика
- AboutPage — описание проекта
- EventForm — форма добавления события
- EventList — список событий
- MapComponent — используется из ui-lib
---
## 3. frontend-admin (административная панель)
### Структура
```
frontend-admin/
  src/
    pages/
      AdminEventsPage.tsx
      AdminStatsPage.tsx
    components/
      AdminEventList/
      AdminEventDetails/
    utils/
      storage.ts
    App.tsx
    main.tsx
  vite.config.ts
  tsconfig.json
```

### Основные компоненты
- AdminEventsPage — работа со всеми событиями
- AdminStatsPage — статистика по типам и статусам
- AdminEventList — таблица событий
- AdminEventDetails — просмотр/редактирование события

---

## 4. ui-lib (библиотека общих компонентов)
### Структура
```
ui-lib/
  src/
    Header/
      Header.tsx
      Header.css
    Footer/
      Footer.tsx
      Footer.css
    Map/
      MapComponent.tsx
    Button/
    Input/
    Card/
    index.ts
  tsconfig.json
```

### Экспортируемые компоненты
- Header — навигация
- Footer — нижняя панель
- MapComponent — карта (Yandex Maps API)
- базовые UI-элементы: Button, Input, Card

---

## 5. Используемые библиотеки

### Общие зависимости
| Библиотека | Назначение |
|-----------|------------|
| react ^19.2.0, react-dom ^19.2.0 | UI |
| typescript ~5.9.3 | язык разработки |
| vite ^7.2.4 | сборщик |
| react-router-dom ^7.10.1 | маршрутизация |
| @iminside/react-yandex-maps ^1.2.7 | карта |
| eslint ^9.39.1 | линтер |
| jest ^30.2.0 | тестирование |

React и react-dom находятся в root workspace и подключаются как peerDependencies в ui-lib.

---

## 6. Роутинг

### Пользовательское приложение (frontend)
| Маршрут | Страница | Назначение |
|---------|----------|------------|
| `/events` | EventsPage | карта проблем |
| `/stats` | StatsPage | статистика |
| `/about` | AboutPage | сведения о проекте |
| `*` | EventsPage | fallback |

### Админ-панель (frontend-admin)
| Маршрут | Страница | Назначение |
|---------|----------|------------|
| `/admin/events` | AdminEventsPage | управление событиями |
| `/admin/stats` | AdminStatsPage | расширенная статистика |
| `*` | AdminEventsPage | fallback |

---

## 7. Хранение данных

Все данные сохраняются в LocalStorage.  
Структура события:

```ts
{
  id: string
  title: string
  type: string
  position: [number, number]
  description: string
  status: "new" | "in-progress" | "done"
}
```