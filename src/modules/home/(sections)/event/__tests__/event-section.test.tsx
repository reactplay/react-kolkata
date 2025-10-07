import { TestWrapper } from "@/test-utils";
import { EVENT_STATUS, EVENT_TYPES } from "@/types/event";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EventsSection from "../index";

// Mock the dummy data
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
    {
      id: "e-003",
      title: "Hybrid Conference",
      venue: "Convention Center + Online",
      description: "React conference with hybrid attendance",
      registrationUrl: "#",
      type: "hybrid",
      startDateTime: "2025-12-20T09:00:00+05:30",
      endDateTime: "2025-12-20T17:00:00+05:30",
    },
  ],
}));

// Mock calendar utils
vi.mock("@/lib/calendar-utils", () => ({
  getEventStatus: vi.fn((start) => {
    // Mock different statuses for different events
    if (start.includes("2025-10-12")) return EVENT_STATUS.UPCOMING;
    if (start.includes("2025-11-15")) return EVENT_STATUS.UPCOMING;
    if (start.includes("2025-12-20")) return EVENT_STATUS.UPCOMING;
    return EVENT_STATUS.UPCOMING;
  }),
}));

// Mock child components
vi.mock("../event-card", () => ({
  default: ({ event }: any) => <div data-testid={`event-card-${event.id}`}>{event.title}</div>,
}));

vi.mock("../event-filters", () => ({
  default: ({ filters, onUpdateFilter, onClearFilters, totalEvents, filteredCount }: any) => (
    <div data-testid="event-filters">
      <div>Status: {filters.status}</div>
      <div>Type: {filters.type}</div>
      <div>Total: {totalEvents}</div>
      <div>Filtered: {filteredCount}</div>
      <button onClick={() => onUpdateFilter("status", EVENT_STATUS.UPCOMING)}>
        Filter Upcoming
      </button>
      <button onClick={() => onUpdateFilter("type", EVENT_TYPES.ONLINE)}>Filter Online</button>
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  ),
}));

vi.mock("@/components/custom/animated-section", () => ({
  default: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

describe("EventsSection", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render events section title", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );
    expect(screen.getByText("Events")).toBeInTheDocument();
  });

  it("should render events section description", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );
    expect(
      screen.getByText("Join our meetups and workshops. Learn, network, and build together.")
    ).toBeInTheDocument();
  });

  it("should render filter button", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should render 'View all' link", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );
    expect(screen.getByText("View all")).toBeInTheDocument();
  });

  it("should render all event cards by default", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-002")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-003")).toBeInTheDocument();
  });

  it("should show filter section when filter button is clicked", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });
  });

  it("should hide filter section when filter button is clicked again", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");

    // Show filters
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Hide filters
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.queryByTestId("event-filters")).not.toBeInTheDocument();
    });
  });

  it("should pass correct props to EventFilters component", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Status: all")).toBeInTheDocument();
      expect(screen.getByText("Type: all")).toBeInTheDocument();
      expect(screen.getByText("Total: 3")).toBeInTheDocument();
      expect(screen.getByText("Filtered: 3")).toBeInTheDocument();
    });
  });

  it("should update filters when EventFilters component calls onUpdateFilter", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    const filterUpcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(filterUpcomingButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming")).toBeInTheDocument();
    });
  });

  it("should clear filters when EventFilters component calls onClearFilters", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Set a filter first
    const filterUpcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(filterUpcomingButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming")).toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByText("Clear Filters");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Status: all")).toBeInTheDocument();
      expect(screen.getByText("Type: all")).toBeInTheDocument();
    });
  });

  it("should filter events based on status", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    const filterUpcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(filterUpcomingButton);

    // All events should still be visible since they're all upcoming in our mock
    expect(screen.getByTestId("event-card-e-001")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-002")).toBeInTheDocument();
    expect(screen.getByTestId("event-card-e-003")).toBeInTheDocument();
  });

  it("should filter events based on type", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    const filterOnlineButton = screen.getByText("Filter Online");
    fireEvent.click(filterOnlineButton);

    await waitFor(() => {
      expect(screen.getByText("Type: online")).toBeInTheDocument();
    });
  });

  it("should have proper initial filter state", () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    // Filter section should not be visible initially
    expect(screen.queryByTestId("event-filters")).not.toBeInTheDocument();
  });

  it("should handle multiple filter updates", async () => {
    render(
      <TestWrapper>
        <EventsSection />
      </TestWrapper>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-filters")).toBeInTheDocument();
    });

    // Apply status filter
    const filterUpcomingButton = screen.getByText("Filter Upcoming");
    fireEvent.click(filterUpcomingButton);

    await waitFor(() => {
      expect(screen.getByText("Status: upcoming")).toBeInTheDocument();
    });

    // Apply type filter
    const filterOnlineButton = screen.getByText("Filter Online");
    fireEvent.click(filterOnlineButton);

    await waitFor(() => {
      expect(screen.getByText("Type: online")).toBeInTheDocument();
    });
  });
});
