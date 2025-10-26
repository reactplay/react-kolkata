// Event type constants
export const EVENT_TYPES = {
  ALL: "all",
  ONLINE: "online",
  OFFLINE: "offline",
  HYBRID: "hybrid",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

// Event status constants
export const EVENT_STATUS = {
  ALL: "all",
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  PAST: "past",
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export interface Event {
  id: string;
  title: string;
  venue: string;
  description: string;
  registrationUrl: string;
  image?: string;
  type: EventType;
  startDateTime: string; // ISO datetime - primary source of truth
  endDateTime: string; // ISO datetime - primary source of truth
  location?: {
    name: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  // Recording and slide links for past events
  recordingUrl?: string;
  slidesUrl?: string;
}

export interface EventFilters {
  status: EventStatus;
  type: EventType;
}

export interface CalendarEvent {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
}
