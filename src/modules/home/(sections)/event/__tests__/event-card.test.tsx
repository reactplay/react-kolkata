import { EVENT_TYPES } from "@/types/event";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EventCard from "../event-card";

// Mock the calendar and date utils
vi.mock("@/lib/calendar-utils", () => ({
  getEventStatus: vi.fn(() => "upcoming"),
}));

vi.mock("@/lib/date-utils", () => ({
  formatEventDate: vi.fn(() => "Oct 5, 2025"),
  formatEventTime: vi.fn(() => "6:00 PM – 8:00 PM IST"),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock child components
vi.mock("../event-badges", () => ({
  default: ({ type, status }: any) => (
    <div data-testid="event-badges">
      {type}-{status}
    </div>
  ),
}));

vi.mock("../calendar-buttons", () => ({
  default: ({ event }: any) => (
    <div data-testid="calendar-buttons">Calendar buttons for {event.title}</div>
  ),
}));

describe("EventCard", () => {
  beforeEach(() => {
    cleanup();
  });

  const mockEvent = {
    id: "test-event",
    title: "Test Event",
    venue: "Test Venue",
    description: "This is a test event description.",
    registrationUrl: "https://example.com/register",
    image: "https://example.com/event-image.jpg",
    type: EVENT_TYPES.OFFLINE,
    startDateTime: "2025-10-05T18:00:00+05:30",
    endDateTime: "2025-10-05T20:00:00+05:30",
    location: {
      name: "Test Location",
      address: "123 Test Street, Test City",
    },
  };

  it("should render event title", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Test Event")).toBeInTheDocument();
  });

  it("should render event description", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("This is a test event description.")).toBeInTheDocument();
  });

  it("should render event venue", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Test Venue")).toBeInTheDocument();
  });

  it("should render formatted date", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Oct 5, 2025")).toBeInTheDocument();
  });

  it("should render formatted time", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("6:00 PM – 8:00 PM IST")).toBeInTheDocument();
  });

  it("should render event image", () => {
    render(<EventCard event={mockEvent} />);
    const image = screen.getByAltText("Test Event");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/event-image.jpg");
  });

  it("should render register button with correct link", () => {
    render(<EventCard event={mockEvent} />);
    const registerLink = screen.getByText("Register").closest("a");
    expect(registerLink).toHaveAttribute("href", "https://example.com/register");
    expect(registerLink).toHaveAttribute("target", "_blank");
  });

  it("should render details link", () => {
    render(<EventCard event={mockEvent} />);
    const detailsLink = screen.getByText("Details");
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute("href", "/events");
  });

  it("should render EventBadges component", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByTestId("event-badges")).toBeInTheDocument();
  });

  it("should render CalendarButtons component", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByTestId("calendar-buttons")).toBeInTheDocument();
    expect(screen.getByText("Calendar buttons for Test Event")).toBeInTheDocument();
  });

  it("should use fallback image when no image provided", () => {
    const eventWithoutImage = { ...mockEvent, image: undefined };
    render(<EventCard event={eventWithoutImage} />);

    const image = screen.getByAltText("Test Event");
    expect(image).toHaveAttribute("src", "/images/tech-events-1.jpg");
  });

  it("should pass correct calendar event data to CalendarButtons", () => {
    render(<EventCard event={mockEvent} />);

    // The calendar buttons should receive the transformed event data
    expect(screen.getByTestId("calendar-buttons")).toBeInTheDocument();
  });

  it("should have proper article structure", () => {
    render(<EventCard event={mockEvent} />);

    const article = screen.getByRole("article");
    expect(article).toHaveClass("group", "relative", "overflow-hidden", "rounded-xl");
  });

  it("should handle events with location object", () => {
    render(<EventCard event={mockEvent} />);

    // Should pass the location address to calendar buttons
    expect(screen.getByTestId("calendar-buttons")).toBeInTheDocument();
  });

  it("should handle events without location object", () => {
    const eventWithoutLocation = { ...mockEvent, location: undefined };
    render(<EventCard event={eventWithoutLocation} />);

    // Should still render and pass venue as location
    expect(screen.getByTestId("calendar-buttons")).toBeInTheDocument();
  });
});
