import { EVENT_STATUS } from "@/types/event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  downloadICSFile,
  generateGoogleCalendarUrl,
  generateICSContent,
  generateOutlookCalendarUrl,
  getEventStatus,
} from "../calendar-utils";

describe("calendar-utils", () => {
  const mockEvent = {
    title: "React Workshop",
    description: "Learn React fundamentals",
    startDateTime: "2025-12-05T19:00:00+05:30",
    endDateTime: "2025-12-05T21:00:00+05:30",
    location: "Tech Hub, Kolkata",
  };

  describe("generateGoogleCalendarUrl", () => {
    it("should generate correct Google Calendar URL", () => {
      const url = generateGoogleCalendarUrl(mockEvent);

      expect(url).toContain("calendar.google.com/calendar/render");
      expect(url).toContain("action=TEMPLATE");
      expect(url).toContain("text=React+Workshop");
      expect(url).toContain("details=Learn+React+fundamentals");
      expect(url).toContain("location=Tech+Hub%2C+Kolkata");
    });

    it("should handle events without location", () => {
      const eventWithoutLocation = { ...mockEvent, location: undefined };
      const url = generateGoogleCalendarUrl(eventWithoutLocation);

      expect(url).toContain("calendar.google.com/calendar/render");
      expect(url).not.toContain("location=");
    });
  });

  describe("generateOutlookCalendarUrl", () => {
    it("should generate correct Outlook Calendar URL", () => {
      const url = generateOutlookCalendarUrl(mockEvent);

      expect(url).toContain("outlook.live.com/calendar/0/deeplink/compose");
      expect(url).toContain("subject=React+Workshop");
      expect(url).toContain("body=Learn+React+fundamentals");
      expect(url).toContain("startdt=2025-12-05T19%3A00%3A00%2B05%3A30");
      expect(url).toContain("enddt=2025-12-05T21%3A00%3A00%2B05%3A30");
    });
  });

  describe("generateICSContent", () => {
    it("should generate valid ICS content", () => {
      const ics = generateICSContent(mockEvent);

      expect(ics).toContain("BEGIN:VCALENDAR");
      expect(ics).toContain("VERSION:2.0");
      expect(ics).toContain("BEGIN:VEVENT");
      expect(ics).toContain("SUMMARY:React Workshop");
      expect(ics).toContain("DESCRIPTION:Learn React fundamentals");
      expect(ics).toContain("LOCATION:Tech Hub, Kolkata");
      expect(ics).toContain("END:VEVENT");
      expect(ics).toContain("END:VCALENDAR");
    });

    it("should handle events without location", () => {
      const eventWithoutLocation = { ...mockEvent, location: undefined };
      const ics = generateICSContent(eventWithoutLocation);

      expect(ics).toContain("BEGIN:VCALENDAR");
      expect(ics).not.toContain("LOCATION:");
    });
  });

  describe("getEventStatus", () => {
    const mockDate = new Date("2025-10-05T12:00:00Z");

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return UPCOMING for future events", () => {
      const futureStart = "2025-10-06T10:00:00+05:30";
      const futureEnd = "2025-10-06T12:00:00+05:30";

      const status = getEventStatus(futureStart, futureEnd);
      expect(status).toBe(EVENT_STATUS.UPCOMING);
    });

    it("should return ONGOING for current events", () => {
      const currentStart = "2025-10-05T11:00:00Z"; // 1 hour ago
      const currentEnd = "2025-10-05T13:00:00Z"; // 1 hour from now

      const status = getEventStatus(currentStart, currentEnd);
      expect(status).toBe(EVENT_STATUS.ONGOING);
    });

    it("should return PAST for completed events", () => {
      const pastStart = "2025-10-04T10:00:00+05:30";
      const pastEnd = "2025-10-04T12:00:00+05:30";

      const status = getEventStatus(pastStart, pastEnd);
      expect(status).toBe(EVENT_STATUS.PAST);
    });
  });

  // Note: isEventUpcoming and isEventToday functions were removed from calendar-utils
  // as they were not being used in the current implementation

  describe("downloadICSFile", () => {
    it("should create and trigger download", () => {
      // Mock DOM and URL APIs
      const mockLink = {
        href: "",
        download: "",
        click: vi.fn(),
      };

      const createElementSpy = vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);
      const appendChildSpy = vi
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = vi
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      // Mock URL methods
      global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
      global.URL.revokeObjectURL = vi.fn();

      downloadICSFile(mockEvent);

      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(mockLink.download).toBe("react-workshop.ics");
      expect(mockLink.click).toHaveBeenCalled();
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
      expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();

      // Cleanup
      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });
  });
});
