import { TestWrapper } from "@/test-utils";
import { EVENT_STATUS } from "@/types/event";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EventsSection from "../index";

vi.mock("@/base/data/dummy", () => ({
  events: [
    {
      id: "e-001",
      title: "React Workshop",
      venue: "Tech Hub",
      description: "Learn React fundamentals",
      registrationUrl: "#",
      type: "offline",
      startDateTime: "2025-10-12T10:00:00+05:30",
      endDateTime: "2025-10-12T12:00:00+05:30",
    },
    {
      id: "e-002",
      title: "Online Meetup",
      venue: "Zoom",
      description: "Virtual React discussion",
      registrationUrl: "#",
      type: "online",
      startDateTime: "2025-11-15T19:00:00+05:30",
      endDateTime: "2025-11-15T21:00:00+05:30",
    },
  ],
}));

vi.mock("@/lib/calendar-utils", () => ({
  getEventStatus: vi.fn(() => EVENT_STATUS.UPCOMING),
}));

vi.mock("../event-card", () => ({
  default: ({ event }: any) => (
    <div data-testid={`event-card-${event.id}`}>
      <h3>{event.title}</h3>
      <p>{event.type}</p>
    </div>
  ),
}));

vi.mock("@/components/custom/animated-section", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

describe("EventsSection Integration", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render events section with title and description", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(
      screen.getByText("Join our meetups and workshops. Learn, network, and build together.")
    ).toBeInTheDocument();
  });

  it("should render the first upcoming event card by default", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.queryByTestId("event-card-e-002")).not.toBeInTheDocument();
    expect(screen.getByText("React Workshop")).toBeInTheDocument();
    expect(screen.queryByText("Online Meetup")).not.toBeInTheDocument();
  });

  it("should render Check all past events link", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const viewAllLink = screen.getByText("Check all past events");
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink.closest("a")).toHaveAttribute(
      "href",
      "https://luma.com/reactkolkata?period=past"
    );
  });

  it("should have proper component structure", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const container = screen.getByText("Events").closest("div");
    expect(container).toBeInTheDocument();

    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.queryByTestId("event-card-e-002")).not.toBeInTheDocument();
  });

  it("should pass correct event data to EventCard components", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    expect(screen.getByText("React Workshop")).toBeInTheDocument();
    expect(screen.getByText("offline")).toBeInTheDocument(); // Event type
  });
});
