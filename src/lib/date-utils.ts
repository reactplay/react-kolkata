/**
 * Date format constants
 */
export const DATE_FORMATS = {
  // Date only formats
  // We can extend this to any other format we want to use in the future
  BLOG_DATE: "blog-date", // "Aug 2, 2025"
  SHORT_DATE: "short-date", // "8/2/25"
  LONG_DATE: "long-date", // "August 2, 2025"

  // Date with time formats
  BLOG_DATETIME: "blog-datetime", // "Aug 2, 2025 at 10:30 AM"
  SHORT_DATETIME: "short-datetime", // "8/2/25, 10:30 AM"

  // Time only formats
  TIME_12H: "time-12h", // "10:30 AM"
  TIME_24H: "time-24h", // "10:30"

  // Relative time
  RELATIVE: "relative", // "2 days ago"
} as const;

export type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];

/**
 * Format an ISO date string to the specified format
 * @param isoDateString - ISO date string (e.g., "2025-08-02T10:30:00+05:30")
 * @param format - Date format constant
 * @returns Formatted date string
 */
export function formatDate(isoDateString: string, format: DateFormat): string {
  const date = new Date(isoDateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn("Invalid date provided to formatDate:", isoDateString);
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

    case DATE_FORMATS.RELATIVE:
      return getRelativeTime(date);

    default:
      return date.toLocaleDateString("en-US");
  }
}

/**
 * Get relative time string using native Intl.RelativeTimeFormat API
 * Based on: https://www.builder.io/blog/relative-time
 * @param date - Date object
 * @returns Relative time string (e.g., "2 days ago", "tomorrow", "in 3 hours")
 */
function getRelativeTime(date: Date): string {
  const timeMs = date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array representing one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Use Intl.RelativeTimeFormat to do the heavy lifting
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

// Convenience functions for common use cases
export const formatBlogDate = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.BLOG_DATE);
export const formatBlogDateTime = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.BLOG_DATETIME);
export const formatBlogRelativeTime = (isoDateString: string) =>
  formatDate(isoDateString, DATE_FORMATS.RELATIVE);
