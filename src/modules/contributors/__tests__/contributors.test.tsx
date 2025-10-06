import { TestWrapper } from "@/test-utils";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContributorsSection from "../index";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockContributors = [
  {
    id: 1,
    login: "testuser1",
    avatar_url: "https://github.com/testuser1.png",
    html_url: "https://github.com/testuser1",
    contributions: 10,
    type: "User",
    site_admin: false,
  },
  {
    id: 2,
    login: "testuser2",
    avatar_url: "https://github.com/testuser2.png",
    html_url: "https://github.com/testuser2",
    contributions: 5,
    type: "User",
    site_admin: true,
  },
];

describe("ContributorsSection", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <TestWrapper>
        <ContributorsSection />
      </TestWrapper>
    );

    expect(screen.getByText("Loading contributors...")).toBeInTheDocument();
  });

  it("should render contributors when data is loaded", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContributors,
    });

    render(
      <TestWrapper>
        <ContributorsSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Our Contributors")).toBeInTheDocument();
    });

    expect(screen.getByText("testuser1")).toBeInTheDocument();
    expect(screen.getByText("testuser2")).toBeInTheDocument();
    expect(screen.getByText("10 contributions")).toBeInTheDocument();
    expect(screen.getByText("5 contributions")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should render error state when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <TestWrapper>
        <ContributorsSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error loading contributors/)).toBeInTheDocument();
    });
  });

  it("should display total contributor count", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContributors,
    });

    render(
      <TestWrapper>
        <ContributorsSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Total contributors: 2")).toBeInTheDocument();
    });
  });

  it("should fetch contributors from correct GitHub API endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContributors,
    });

    render(
      <TestWrapper>
        <ContributorsSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/reactplay/react-kolkata/contributors"
      );
    });
  });
});
