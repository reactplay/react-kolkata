import { EVENT_STATUS, EVENT_TYPES } from "@/types/event";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import EventBadges from "../event-badges";

describe("EventBadges", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Event Type Badges", () => {
    it("should render online event badge", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      const onlineBadge = screen.getByText("Online");
      expect(onlineBadge).toBeInTheDocument();
      // Check that the badge container has the green styling
      const badgeContainer = onlineBadge.closest("span");
      expect(badgeContainer).toHaveClass("bg-green-500/60", "text-white");
    });

    it("should render offline event badge", () => {
      render(<EventBadges type={EVENT_TYPES.OFFLINE} status={EVENT_STATUS.UPCOMING} />);

      const offlineBadge = screen.getByText("Offline");
      expect(offlineBadge).toBeInTheDocument();
      // Check that the badge container has the blue styling
      const badgeContainer = offlineBadge.closest("span");
      expect(badgeContainer).toHaveClass("bg-blue-500/60", "text-white");
    });

    it("should render hybrid event badge", () => {
      render(<EventBadges type={EVENT_TYPES.HYBRID} status={EVENT_STATUS.UPCOMING} />);

      const hybridBadge = screen.getByText("Hybrid");
      expect(hybridBadge).toBeInTheDocument();
      // Check that the badge container has the purple styling
      const badgeContainer = hybridBadge.closest("span");
      expect(badgeContainer).toHaveClass("bg-purple-500/60", "text-white");
    });
  });

  describe("Event Status Badges", () => {
    it("should render upcoming status badge with correct styling", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      const upcomingBadge = screen.getByText("Upcoming");
      expect(upcomingBadge).toBeInTheDocument();
      expect(upcomingBadge).toHaveClass("bg-green-500/60", "text-white");
    });

    it("should render ongoing status badge with correct styling", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.ONGOING} />);

      const ongoingBadge = screen.getByText("Ongoing");
      expect(ongoingBadge).toBeInTheDocument();
      expect(ongoingBadge).toHaveClass("bg-orange-500/60", "text-white");
    });

    it("should render past status badge with correct styling", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.PAST} />);

      const pastBadge = screen.getByText("Past");
      expect(pastBadge).toBeInTheDocument();
      expect(pastBadge).toHaveClass("bg-gray-500/60", "text-white");
    });
  });

  describe("Badge Positioning", () => {
    it("should render both type and status badges", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      // Should render both badges
      expect(screen.getByText("Online")).toBeInTheDocument();
      expect(screen.getByText("Upcoming")).toBeInTheDocument();

      // Should have positioning containers
      const containers = screen.getAllByText(/Online|Upcoming/).map((el) => el.closest("div"));
      expect(containers.length).toBe(2);

      // At least one should have absolute positioning
      const hasAbsolutePositioning = containers.some((container) =>
        container?.classList.contains("absolute")
      );
      expect(hasAbsolutePositioning).toBe(true);
    });
  });

  describe("Icons", () => {
    it("should render globe icon for online events", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      // Check if the badge contains the globe icon (lucide-react renders as svg)
      const onlineBadge = screen.getByText("Online").closest("span");
      expect(onlineBadge?.querySelector("svg")).toBeInTheDocument();
    });

    it("should render users icon for offline events", () => {
      render(<EventBadges type={EVENT_TYPES.OFFLINE} status={EVENT_STATUS.UPCOMING} />);

      // Check if the badge contains the users icon
      const offlineBadge = screen.getByText("Offline").closest("span");
      expect(offlineBadge?.querySelector("svg")).toBeInTheDocument();
    });

    it("should render both icons for hybrid events", () => {
      render(<EventBadges type={EVENT_TYPES.HYBRID} status={EVENT_STATUS.UPCOMING} />);

      // Check if the badge contains multiple icons (globe + users)
      const hybridBadge = screen.getByText("Hybrid").closest("span");
      const icons = hybridBadge?.querySelectorAll("svg");
      expect(icons?.length).toBe(2);
    });
  });

  describe("Text Formatting", () => {
    it("should capitalize event type names", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      expect(screen.getByText("Online")).toBeInTheDocument();
      expect(screen.queryByText("online")).not.toBeInTheDocument();
    });

    it("should capitalize event status names", () => {
      render(<EventBadges type={EVENT_TYPES.ONLINE} status={EVENT_STATUS.UPCOMING} />);

      expect(screen.getByText("Upcoming")).toBeInTheDocument();
      expect(screen.queryByText("upcoming")).not.toBeInTheDocument();
    });
  });
});
