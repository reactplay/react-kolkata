import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CalendarButtons from "../calendar-buttons";

// Mock the calendar utils
vi.mock("@/lib/calendar-utils", () => ({
  generateGoogleCalendarUrl: vi.fn(() => "https://calendar.google.com/mock-url"),
  generateOutlookCalendarUrl: vi.fn(() => "https://outlook.live.com/mock-url"),
  downloadICSFile: vi.fn(),
}));

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

describe("CalendarButtons", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const mockEvent = {
    title: "Test Event",
    description: "Test event description",
    startDateTime: "2025-10-05T18:00:00+05:30",
    endDateTime: "2025-10-05T20:00:00+05:30",
    location: "Test Location",
  };

  it("should render Google Calendar button", () => {
    render(<CalendarButtons event={mockEvent} />);
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("should render Outlook Calendar button", () => {
    render(<CalendarButtons event={mockEvent} />);
    expect(screen.getByText("Outlook")).toBeInTheDocument();
  });

  it("should render ICS download button", () => {
    render(<CalendarButtons event={mockEvent} />);

    const icsButton = screen.getByTitle("Download ICS file");
    expect(icsButton).toBeInTheDocument();
  });

  it("should open Google Calendar when Google button is clicked", async () => {
    const { generateGoogleCalendarUrl } = await import("@/lib/calendar-utils");

    render(<CalendarButtons event={mockEvent} />);

    const googleButton = screen.getByText("Google");
    fireEvent.click(googleButton);

    expect(generateGoogleCalendarUrl).toHaveBeenCalledWith(mockEvent);
    expect(mockWindowOpen).toHaveBeenCalledWith("https://calendar.google.com/mock-url", "_blank");
  });

  it("should open Outlook Calendar when Outlook button is clicked", async () => {
    const { generateOutlookCalendarUrl } = await import("@/lib/calendar-utils");

    render(<CalendarButtons event={mockEvent} />);

    const outlookButton = screen.getByText("Outlook");
    fireEvent.click(outlookButton);

    expect(generateOutlookCalendarUrl).toHaveBeenCalledWith(mockEvent);
    expect(mockWindowOpen).toHaveBeenCalledWith("https://outlook.live.com/mock-url", "_blank");
  });

  it("should download ICS file when download button is clicked", async () => {
    const { downloadICSFile } = await import("@/lib/calendar-utils");

    render(<CalendarButtons event={mockEvent} />);

    const downloadButton = screen.getByTitle("Download ICS file");
    fireEvent.click(downloadButton);

    expect(downloadICSFile).toHaveBeenCalledWith(mockEvent);
  });

  it("should have proper button styling", () => {
    render(<CalendarButtons event={mockEvent} />);

    const googleButton = screen.getByText("Google");
    const outlookButton = screen.getByText("Outlook");
    const downloadButton = screen.getByTitle("Download ICS file");

    // Check if buttons have the expected classes
    expect(googleButton).toHaveClass("flex-1", "border-white/10", "bg-white/5");
    expect(outlookButton).toHaveClass("flex-1", "border-white/10", "bg-white/5");
    expect(downloadButton).toHaveClass("border-white/10", "bg-white/5");
  });

  it("should render calendar icons in buttons", () => {
    render(<CalendarButtons event={mockEvent} />);

    const googleButton = screen.getByText("Google").closest("button");
    const outlookButton = screen.getByText("Outlook").closest("button");
    const downloadButton = screen.getByTitle("Download ICS file");

    // Check for SVG icons (lucide-react renders as svg elements)
    expect(googleButton?.querySelector("svg")).toBeInTheDocument();
    expect(outlookButton?.querySelector("svg")).toBeInTheDocument();
    expect(downloadButton?.querySelector("svg")).toBeInTheDocument();
  });

  it("should handle events without location", async () => {
    const eventWithoutLocation = { ...mockEvent, location: undefined };
    const { generateGoogleCalendarUrl } = await import("@/lib/calendar-utils");

    render(<CalendarButtons event={eventWithoutLocation} />);

    const googleButton = screen.getByText("Google");
    fireEvent.click(googleButton);

    expect(generateGoogleCalendarUrl).toHaveBeenCalledWith(eventWithoutLocation);
  });

  it("should have proper button layout", () => {
    render(<CalendarButtons event={mockEvent} />);

    const container = screen.getByText("Google").closest("div");
    expect(container).toHaveClass("flex", "items-center", "gap-1");
  });
});
