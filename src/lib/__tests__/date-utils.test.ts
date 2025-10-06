import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  DATE_FORMATS,
  formatBlogDate,
  formatBlogDateTime,
  formatBlogRelativeTime,
  formatDate,
} from "../date-utils";

describe("date-utils", () => {
  const mockDate = new Date("2025-10-05T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("formatDate", () => {
    it("should format blog date correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.BLOG_DATE);
      expect(result).toBe("Aug 2, 2025");
    });

    it("should format short date correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.SHORT_DATE);
      expect(result).toBe("8/2/25");
    });

    it("should format long date correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.LONG_DATE);
      expect(result).toBe("August 2, 2025");
    });

    it("should format blog datetime correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.BLOG_DATETIME);
      expect(result).toMatch(/Aug 2, 2025/); // Time format may vary by locale
    });

    it("should format 12-hour time correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.TIME_12H);
      expect(result).toMatch(/10:30/);
    });

    it("should format 24-hour time correctly", () => {
      const result = formatDate("2025-08-02T10:30:00+05:30", DATE_FORMATS.TIME_24H);
      expect(result).toMatch(/10:30/);
    });

    it("should handle invalid dates gracefully", () => {
      const result = formatDate("invalid-date", DATE_FORMATS.BLOG_DATE);
      expect(result).toBe("Invalid date");
    });

    it("should format relative time for past dates", () => {
      const pastDate = "2025-10-03T12:00:00Z"; // 2 days ago
      const result = formatDate(pastDate, DATE_FORMATS.RELATIVE);
      expect(result).toBe("2 days ago");
    });

    it("should format relative time for future dates", () => {
      const futureDate = "2025-10-07T12:00:00Z"; // 2 days from now
      const result = formatDate(futureDate, DATE_FORMATS.RELATIVE);
      expect(result).toBe("in 2 days");
    });

    it("should handle recent dates correctly", () => {
      const recentDate = "2025-10-05T12:00:30Z"; // 30 seconds from now
      const result = formatDate(recentDate, DATE_FORMATS.RELATIVE);
      expect(result).toBe("in 30 seconds");
    });
  });

  describe("convenience functions", () => {
    it("formatBlogDate should work correctly", () => {
      const result = formatBlogDate("2025-08-02T10:30:00+05:30");
      expect(result).toBe("Aug 2, 2025");
    });

    it("formatBlogDateTime should work correctly", () => {
      const result = formatBlogDateTime("2025-08-02T10:30:00+05:30");
      expect(result).toMatch(/Aug 2, 2025/);
    });

    it("formatBlogRelativeTime should work correctly", () => {
      const pastDate = "2025-10-03T12:00:00Z"; // 2 days ago
      const result = formatBlogRelativeTime(pastDate);
      expect(result).toBe("2 days ago");
    });
  });

  describe("edge cases", () => {
    it("should handle leap year dates", () => {
      const result = formatBlogDate("2024-02-29T10:30:00+05:30");
      expect(result).toBe("Feb 29, 2024");
    });

    it("should handle timezone differences", () => {
      const utcDate = "2025-08-02T23:30:00Z";
      const result = formatBlogDate(utcDate);
      expect(result).toMatch(/Aug/);
    });

    it("should handle year boundaries for relative time", () => {
      const lastYear = "2024-10-05T12:00:00Z"; // 1 year ago
      const result = formatBlogRelativeTime(lastYear);
      expect(result).toBe("last year"); // Intl.RelativeTimeFormat uses smart abbreviations
    });
  });
});
