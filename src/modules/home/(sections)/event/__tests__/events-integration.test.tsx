import { EVENT_STATUS, EVENT_TYPES } from "@/types/event";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EventsSection from "../index";

// Mock the dummy data with realistic events
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

// Mock calendar utils to return predictable status
vi.mock("@/lib/calendar-utils", () => ({
  getEventStatus: vi.fn(() => EVENT_STATUS.UPCOMING),
}));

// Mock child components for simpler testing
vi.mock("../event-card", () => ({
  default: ({ event }: any) => (
    <div data-testid={`event-card-${event.id}`}>
      <h3>{event.title}</h3>
      <p>{event.type}</p>
    </div>
  ),
}));

vi.mock("../event-filters", () => ({
  default: ({ filters, onUpdateFilter, onClearFilters }: any) => (
    <div data-testid="event-filters">
      <button onClick={() => onUpdateFilter("status", EVENT_STATUS.UPCOMING)}>
        Filter Upcoming
      </button>
      <button onClick={() => onUpdateFilter("type", EVENT_TYPES.ONLINE)}>Filter Online</button>
      <button onClick={onClearFilters}>Clear All</button>
      <div data-testid="current-filters">
        Status: {filters.status}, Type: {filters.type}
      </div>
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
    render(<EventsSection />);

    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(
      screen.getByText("Join our meetups and workshops. Learn, network, and build together.")
    ).toBeInTheDocument();
  });

  it("should render all event cards by default", () => {
    render(<EventsSection />);

    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-002")).toBeInTheDocument();
    expect(screen.getByText("React Workshop")).toBeInTheDocument();
    expect(screen.getByText("Online Meetup")).toBeInTheDocument();
  });

  it("should show and hide filters when filter button is clicked", async () => {
    render(<EventsSection />);

    const filterButton = screen.getByText("Filter");

    // Initially filters should not be visible
    expect(screen.queryByTestId("event-filters")).not.toBeInTheDocument();

    // Click to show filters
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Click to hide filters
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.queryByTestId("event-filters")).not.toBeInTheDocument();
    });
  });

  it("should update filters when filter component triggers updates", async () => {
    render(<EventsSection />);

    // Show filters
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Check initial state
    expect(screen.getByText("Status: all, Type: all")).toBeInTheDocument();

    // Apply status filter
    const upcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(upcomingButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming, Type: all")).toBeInTheDocument();
    });

    // Apply type filter
    const onlineButton = screen.getByText("Filter Online");
    fireEvent.click(onlineButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming, Type: online")).toBeInTheDocument();
    });
  });

  it("should clear all filters when clear button is clicked", async () => {
    render(<EventsSection />);

    // Show filters and apply some
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Apply filters
    const upcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(upcomingButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming, Type: all")).toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Status: all, Type: all")).toBeInTheDocument();
    });
  });

  it("should render View all link", () => {
    render(<EventsSection />);

    const viewAllLink = screen.getByText("View all");
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute("href", "https://luma.com/reactkolkata");
  });

  it("should have proper component structure", () => {
    render(<EventsSection />);

    // Should have main container
    const container = screen.getByText("Events").closest("div");
    expect(container).toBeInTheDocument();

    // Should have event cards grid
    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-002")).toBeInTheDocument();
  });

  it("should pass correct event data to EventCard components", () => {
    render(<EventsSection />);

    // Check that event data is passed correctly
    expect(screen.getByText("React Workshop")).toBeInTheDocument();
    expect(screen.getByText("Online Meetup")).toBeInTheDocument();
    expect(screen.getByText("offline")).toBeInTheDocument(); // Event type
    expect(screen.getByText("online")).toBeInTheDocument(); // Event type
  });
});
