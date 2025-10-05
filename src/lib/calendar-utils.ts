import { CalendarEvent, EVENT_STATUS } from "@/types/event";

/**
 * Generate Google Calendar URL for adding an event
 * @param event - Calendar event data
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const baseUrl = "https://calendar.google.com/calendar/render";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    dates: `${formatDateForCalendar(event.startDateTime)}/${formatDateForCalendar(event.endDateTime)}`,
    ...(event.location && { location: event.location }),
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate Outlook Calendar URL for adding an event
 * @param event - Calendar event data
 * @returns Outlook Calendar URL
 */
export function generateOutlookCalendarUrl(event: CalendarEvent): string {
  const baseUrl = "https://outlook.live.com/calendar/0/deeplink/compose";

  const params = new URLSearchParams({
    subject: event.title,
    body: event.description,
    startdt: event.startDateTime,
    enddt: event.endDateTime,
    ...(event.location && { location: event.location }),
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate ICS (iCalendar) file content for download
 * @param event - Calendar event data
 * @returns ICS file content as string
 */
export function generateICSContent(event: CalendarEvent): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const startDate = formatDateForCalendar(event.startDateTime);
  const endDate = formatDateForCalendar(event.endDateTime);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//React Kolkata//Event//EN",
    "BEGIN:VEVENT",
    `UID:${event.title.replace(/\s+/g, "-").toLowerCase()}-${startDate}@react-kolkata.dev`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    ...(event.location ? [`LOCATION:${event.location}`] : []),
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Download ICS file for the event
 * @param event - Calendar event data
 */
export function downloadICSFile(event: CalendarEvent): void {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format ISO datetime for calendar URLs (YYYYMMDDTHHMMSSZ format)
 * @param isoDateTime - ISO datetime string
 * @returns Formatted datetime for calendar services
 */
function formatDateForCalendar(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Get dynamic event status based on current time
 * @param startDateTime - ISO datetime string
 * @param endDateTime - ISO datetime string
 * @returns Event status (upcoming, ongoing, or past)
 */
export function getEventStatus(
  startDateTime: string,
  endDateTime: string
): "upcoming" | "ongoing" | "past" {
  const now = new Date();
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  if (now < start) {
    return EVENT_STATUS.UPCOMING;
  } else if (now >= start && now <= end) {
    return EVENT_STATUS.ONGOING;
  } else {
    return EVENT_STATUS.PAST;
  }
}
