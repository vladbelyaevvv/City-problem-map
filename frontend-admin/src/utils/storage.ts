export type EventStatus = 'new' | 'in_progress' | 'done'

export type EventType = 'water' | 'heating' | 'electricity' | 'other'

export interface CityEvent {
    id: string
    title: string
    type: EventType
    position: [number, number]
    description: string
    status : EventStatus
}

const STORAGE_KEY = 'city_problems_events'

export function loadEvents(): CityEvent[] {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) { return []  }

  try {
    const parsed = JSON.parse(raw)

    if(Array.isArray(parsed)) {
      return parsed as CityEvent[]
    }

    return []
  } catch {
    return []
  }
}

export function saveEvents(events: CityEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}