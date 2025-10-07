import { TestWrapper } from "@/test-utils";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BlogSection from "../index";

// Mock the dummy data
vi.mock("@/base/data/dummy", () => ({
  articles: [
    {
      id: "a-001",
      title: "React Patterns",
      date: "2025-08-02T10:30:00+05:30",
      excerpt: "Learn about React patterns",
      author: {
        id: "author-1",
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
        bio: "React developer",
      },
      tags: [
        { id: "react", name: "React", slug: "react" },
        { id: "patterns", name: "Patterns", slug: "patterns" },
      ],
      readTime: 5,
      coverImage: "https://example.com/cover1.jpg",
    },
    {
      id: "a-002",
      title: "Next.js Guide",
      date: "2025-07-18T14:15:00+05:30",
      excerpt: "Complete Next.js guide",
      author: {
        id: "author-2",
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
        bio: "Next.js expert",
      },
      tags: [
        { id: "nextjs", name: "Next.js", slug: "nextjs" },
        { id: "guide", name: "Guide", slug: "guide" },
      ],
      readTime: 8,
      coverImage: "https://example.com/cover2.jpg",
    },
    {
      id: "a-003",
      title: "React Performance",
      date: "2025-07-01T09:45:00+05:30",
      excerpt: "Optimize React performance",
      author: {
        id: "author-1",
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
        bio: "React developer",
      },
      tags: [
        { id: "react", name: "React", slug: "react" },
        { id: "performance", name: "Performance", slug: "performance" },
      ],
      readTime: 6,
      coverImage: "https://example.com/cover3.jpg",
    },
  ],
  resources: [],
}));

// Mock child components
vi.mock("../blog-card", () => ({
  default: ({ title, id }: any) => <div data-testid={`blog-card-${id}`}>{title}</div>,
}));

vi.mock("../blog-resource-card", () => ({
  default: ({ title, id }: any) => <div data-testid={`resource-card-${id}`}>{title}</div>,
}));

vi.mock("@/components/custom/animated-section", () => ({
  default: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

describe("BlogSection", () => {
  beforeEach(() => {
    cleanup();
  });
  it("should render blog section title", () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByText("Latest from the Blog")).toBeInTheDocument();
  });

  it("should render blog section description", () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(
      screen.getByText("Guides, tips, and community highlights from React Kolkata.")
    ).toBeInTheDocument();
  });

  it('should render "View all posts" link', () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByText("View all posts")).toBeInTheDocument();
  });

  it("should render filter button", () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should render all blog cards", () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByTestId("blog-card-a-001")).toBeInTheDocument();
    expect(screen.getByTestId("blog-card-a-002")).toBeInTheDocument();
    expect(screen.getByTestId("blog-card-a-003")).toBeInTheDocument();
  });

  it("should show filter section when filter button is clicked", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });
  });

  it("should display all available tags in filter section", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Patterns")).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
      expect(screen.getByText("Guide")).toBeInTheDocument();
      expect(screen.getByText("Performance")).toBeInTheDocument();
    });
  });

  it("should filter articles when tag is selected", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    // Open filter section
    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });

    // Click on React tag
    const reactTag = screen.getByText("React");
    fireEvent.click(reactTag);

    // Should show count of filtered articles
    await waitFor(() => {
      expect(screen.getByText(/Showing \d+ of \d+ posts/)).toBeInTheDocument();
    });
  });

  it("should show clear button when tags are selected", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    // Open filter section
    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });

    // Click on React tag
    const reactTag = screen.getByText("React");
    fireEvent.click(reactTag);

    // Should show clear button
    await waitFor(() => {
      expect(screen.getByText("Clear")).toBeInTheDocument();
    });
  });

  it("should clear filters when clear button is clicked", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    // Open filter section and select a tag
    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });

    const reactTag = screen.getByText("React");
    fireEvent.click(reactTag);

    await waitFor(() => {
      expect(screen.getByText("Clear")).toBeInTheDocument();
    });

    // Click clear button
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    // Clear button should disappear
    await waitFor(() => {
      expect(screen.queryByText("Clear")).not.toBeInTheDocument();
    });
  });

  it("should render resources section", () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByText("Community Resources")).toBeInTheDocument();
    expect(
      screen.getByText("Hand-picked links and tools for React developers.")
    ).toBeInTheDocument();
  });

  it('should render "Explore resources" link', () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );
    expect(screen.getByText("Explore resources")).toBeInTheDocument();
  });

  it("should toggle filter section visibility", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    const filterButton = screen.getAllByText("Filter")[0];

    // Initially filter section should not be visible
    expect(screen.queryByText("Filter by tags")).not.toBeInTheDocument();

    // Click to show
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });

    // Click to hide
    fireEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.queryByText("Filter by tags")).not.toBeInTheDocument();
    });
  });

  it("should handle multiple tag selection", async () => {
    render(
      <TestWrapper>
        <BlogSection />
      </TestWrapper>
    );

    // Open filter section
    const filterButton = screen.getAllByText("Filter")[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Filter by tags")).toBeInTheDocument();
    });

    // Select React tag
    const reactTag = screen.getByText("React");
    fireEvent.click(reactTag);

    // Select Performance tag
    const performanceTag = screen.getByText("Performance");
    fireEvent.click(performanceTag);

    // Should show filtered count
    await waitFor(() => {
      expect(screen.getByText(/Showing \d+ of \d+ posts/)).toBeInTheDocument();
    });
  });
});
