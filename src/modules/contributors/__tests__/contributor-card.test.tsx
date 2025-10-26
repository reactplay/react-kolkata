import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import ContributorCard from "../contributor-card";

const mockContributor = {
  id: 1,
  login: "testuser",
  avatar_url: "https://github.com/testuser.png",
  html_url: "https://github.com/testuser",
  contributions: 15,
  type: "User",
  site_admin: false,
};

const mockAdminContributor = {
  id: 2,
  login: "adminuser",
  avatar_url: "https://github.com/adminuser.png",
  html_url: "https://github.com/adminuser",
  contributions: 25,
  type: "User",
  site_admin: true,
};

describe("ContributorCard", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render contributor information", () => {
    render(<ContributorCard contributor={mockContributor} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("15 contributions")).toBeInTheDocument();
    expect(screen.getByText("View Profile")).toBeInTheDocument();
  });

  it("should render admin badge for site admin", () => {
    render(<ContributorCard contributor={mockAdminContributor} />);

    expect(screen.getByText("adminuser")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should not render admin badge for regular user", () => {
    render(<ContributorCard contributor={mockContributor} />);

    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  it("should have correct GitHub profile link", () => {
    render(<ContributorCard contributor={mockContributor} />);

    const profileLink = screen.getByText("View Profile").closest("a");
    expect(profileLink).toHaveAttribute("href", "https://github.com/testuser");
    expect(profileLink).toHaveAttribute("target", "_blank");
    expect(profileLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render contributor avatar with correct alt text", () => {
    render(<ContributorCard contributor={mockContributor} />);

    const avatar = screen.getByAltText("testuser's avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("should handle singular contribution correctly", () => {
    const singleContributor = {
      ...mockContributor,
      contributions: 1,
    };

    render(<ContributorCard contributor={singleContributor} />);

    expect(screen.getByText("1 contribution")).toBeInTheDocument();
  });

  it("should handle multiple contributions correctly", () => {
    render(<ContributorCard contributor={mockContributor} />);

    expect(screen.getByText("15 contributions")).toBeInTheDocument();
  });
});
