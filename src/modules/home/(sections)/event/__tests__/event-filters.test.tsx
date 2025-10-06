import { EVENT_STATUS, EVENT_TYPES } from "@/types/event";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EventFiltersComponent from "../event-filters";

describe("EventFiltersComponent", () => {
  beforeEach(() => {
    cleanup();
  });

  const mockProps = {
    filters: {
      status: EVENT_STATUS.ALL,
      type: EVENT_TYPES.ALL,
    },
    onUpdateFilter: vi.fn(),
    onClearFilters: vi.fn(),
    totalEvents: 10,
    filteredCount: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render filter title", () => {
    render(<EventFiltersComponent {...mockProps} />);
    expect(screen.getByText("Filter events")).toBeInTheDocument();
  });

  it("should render status filter label", () => {
    render(<EventFiltersComponent {...mockProps} />);
    expect(screen.getByText("Event Status")).toBeInTheDocument();
  });

  it("should render type filter label", () => {
    render(<EventFiltersComponent {...mockProps} />);
    expect(screen.getByText("Event Type")).toBeInTheDocument();
  });

  it("should render all status filter options", () => {
    render(<EventFiltersComponent {...mockProps} />);

    // Use getAllByText for "All" since it appears twice (status and type)
    expect(screen.getAllByText("All").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Ongoing")).toBeInTheDocument();
    expect(screen.getByText("Past")).toBeInTheDocument();
  });

  it("should render all type filter options", () => {
    render(<EventFiltersComponent {...mockProps} />);

    expect(screen.getAllByText("All")).toHaveLength(2); // One for status, one for type
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(screen.getByText("Hybrid")).toBeInTheDocument();
  });

  it("should call onUpdateFilter when status badge is clicked", () => {
    render(<EventFiltersComponent {...mockProps} />);

    const upcomingBadge = screen.getByText("Upcoming");
    fireEvent.click(upcomingBadge);

    expect(mockProps.onUpdateFilter).toHaveBeenCalledWith("status", EVENT_STATUS.UPCOMING);
  });

  it("should call onUpdateFilter when type badge is clicked", () => {
    render(<EventFiltersComponent {...mockProps} />);

    const onlineBadge = screen.getByText("Online");
    fireEvent.click(onlineBadge);

    expect(mockProps.onUpdateFilter).toHaveBeenCalledWith("type", EVENT_TYPES.ONLINE);
  });

  it("should show clear button when filters are active", () => {
    const propsWithFilters = {
      ...mockProps,
      filters: {
        status: EVENT_STATUS.UPCOMING,
        type: EVENT_TYPES.ONLINE,
      },
    };

    render(<EventFiltersComponent {...propsWithFilters} />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("should not show clear button when no filters are active", () => {
    render(<EventFiltersComponent {...mockProps} />);
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
  });

  it("should call onClearFilters when clear button is clicked", () => {
    const propsWithFilters = {
      ...mockProps,
      filters: {
        status: EVENT_STATUS.UPCOMING,
        type: EVENT_TYPES.ONLINE,
      },
    };

    render(<EventFiltersComponent {...propsWithFilters} />);

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(mockProps.onClearFilters).toHaveBeenCalled();
  });

  it("should show filter count when filters are active", () => {
    const propsWithFilters = {
      ...mockProps,
      filters: {
        status: EVENT_STATUS.UPCOMING,
        type: EVENT_TYPES.ALL,
      },
      filteredCount: 5,
    };

    render(<EventFiltersComponent {...propsWithFilters} />);
    // Use a more flexible text matcher since the text might be split across elements
    expect(screen.getByText(/Showing.*5.*of.*10.*events/)).toBeInTheDocument();
  });

  it("should not show filter count when no filters are active", () => {
    render(<EventFiltersComponent {...mockProps} />);
    expect(screen.queryByText(/Showing \d+ of \d+ events/)).not.toBeInTheDocument();
  });

  it("should highlight selected status filter", () => {
    const propsWithStatusFilter = {
      ...mockProps,
      filters: {
        status: EVENT_STATUS.UPCOMING,
        type: EVENT_TYPES.ALL,
      },
    };

    render(<EventFiltersComponent {...propsWithStatusFilter} />);

    const upcomingBadge = screen.getByText("Upcoming").closest("span");
    expect(upcomingBadge).toHaveClass("bg-sky-500");
  });

  it("should highlight selected type filter", () => {
    const propsWithTypeFilter = {
      ...mockProps,
      filters: {
        status: EVENT_STATUS.ALL,
        type: EVENT_TYPES.ONLINE,
      },
    };

    render(<EventFiltersComponent {...propsWithTypeFilter} />);

    const onlineBadge = screen.getByText("Online").closest("span");
    expect(onlineBadge).toHaveClass("bg-sky-500");
  });

  it("should render event type icons for non-all types", () => {
    render(<EventFiltersComponent {...mockProps} />);

    // Check that type badges have icons (SVG elements)
    const onlineBadge = screen.getByText("Online").closest("span");
    const offlineBadge = screen.getByText("Offline").closest("span");
    const hybridBadge = screen.getByText("Hybrid").closest("span");

    expect(onlineBadge?.querySelector("svg")).toBeInTheDocument();
    expect(offlineBadge?.querySelector("svg")).toBeInTheDocument();
    expect(hybridBadge?.querySelector("svg")).toBeInTheDocument();
  });
});
