export const DATE_FORMATS = {
  BLOG_DATE: "blog-date", // "Aug 2, 2025"
  SHORT_DATE: "short-date", // "8/2/25"
  LONG_DATE: "long-date", // "August 2, 2025"

  BLOG_DATETIME: "blog-datetime", // "Aug 2, 2025 at 10:30 AM"
  SHORT_DATETIME: "short-datetime", // "8/2/25, 10:30 AM"

  TIME_12H: "time-12h", // "10:30 AM"
  TIME_24H: "time-24h", // "10:30"

  EVENT_TIME_RANGE: "event-time-range", // "11:00 AM – 1:00 PM IST"

  RELATIVE: "relative", // "2 days ago"
} as const;

export type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];

export function formatDate(isoDateString: string, format: DateFormat): string {
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  switch (format) {
    case DATE_FORMATS.BLOG_DATE:
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    case DATE_FORMATS.SHORT_DATE:
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      });

    case DATE_FORMATS.LONG_DATE:
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    case DATE_FORMATS.BLOG_DATETIME:
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    case DATE_FORMATS.SHORT_DATETIME:
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    case DATE_FORMATS.TIME_12H:
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    case DATE_FORMATS.TIME_24H:
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    case DATE_FORMATS.EVENT_TIME_RANGE:
      throw new Error(
        "EVENT_TIME_RANGE format requires start and end dates. Use formatEventTimeRange() instead."
      );

    case DATE_FORMATS.RELATIVE:
      return getRelativeTime(date);

    default:
      return date.toLocaleDateString("en-US");
  }
}

function getRelativeTime(date: Date): string {
  const timeMs = date.getTime();

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export function formatEventTimeRange(
  startDateTime: string,
  endDateTime: string,
  timezone?: string
): string {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const timeZone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });

  const timezoneAbbr =
    new Intl.DateTimeFormat("en-IN", {
      timeZone,
      timeZoneName: "short",
    })
      .formatToParts(start)
      .find((part) => part.type === "timeZoneName")?.value || "";

  return `${startTime} – ${endTime} ${timezoneAbbr}`;
}

export const formatBlogDate = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.BLOG_DATE);
export const formatBlogDateTime = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.BLOG_DATETIME);
export const formatBlogRelativeTime = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.RELATIVE);

export const formatEventDate = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.BLOG_DATE);
export const formatEventTime = (startDateTime: string, endDateTime: string, timezone?: string) =>
  formatEventTimeRange(startDateTime, endDateTime, timezone);
