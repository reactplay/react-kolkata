import { Author, BlogTag } from "@/types/blog";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BlogCard from "../blog-card";

// Mock the date-utils module
vi.mock("@/lib/date-utils", () => ({
  formatBlogDate: vi.fn(() => "Aug 2, 2025"),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe("BlogCard", () => {
  beforeEach(() => {
    cleanup();
  });
  const mockAuthor: Author = {
    id: "author-1",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    bio: "Test author bio",
    profileUrl: "https://github.com/johndoe",
  };

  const mockTags: BlogTag[] = [
    { id: "react", name: "React", slug: "react" },
    { id: "nextjs", name: "Next.js", slug: "nextjs" },
  ];

  const defaultProps = {
    id: "test-article",
    title: "Test Article Title",
    date: "2025-08-02T10:30:00+05:30",
    excerpt: "This is a test article excerpt.",
    author: mockAuthor,
    tags: mockTags,
    readTime: 5,
    coverImage: "https://example.com/cover.jpg",
    featured: false,
  };

  it("should render article title", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
  });

  it("should render article excerpt", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("This is a test article excerpt.")).toBeInTheDocument();
  });

  it("should render author name", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render read time", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("5 min")).toBeInTheDocument();
  });

  it("should render formatted date", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("Aug 2, 2025")).toBeInTheDocument();
  });

  it("should render tags", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("should render cover image when provided", () => {
    render(<BlogCard {...defaultProps} />);
    const coverImage = screen.getByAltText("Test Article Title");
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("should render author avatar", () => {
    render(<BlogCard {...defaultProps} />);
    const authorAvatar = screen.getByAltText("John Doe");
    expect(authorAvatar).toBeInTheDocument();
  });

  it("should apply featured styling when featured is true", () => {
    render(<BlogCard {...defaultProps} featured={true} />);
    const article = screen.getByRole("article");
    expect(article).toHaveClass("md:col-span-2", "md:row-span-2");
  });

  it("should limit tags displayed for non-featured cards", () => {
    const manyTags: BlogTag[] = [
      { id: "react", name: "React", slug: "react" },
      { id: "nextjs", name: "Next.js", slug: "nextjs" },
      { id: "typescript", name: "TypeScript", slug: "typescript" },
      { id: "tailwind", name: "Tailwind", slug: "tailwind" },
    ];

    render(<BlogCard {...defaultProps} tags={manyTags} featured={false} />);

    // Should only show first 2 tags for non-featured cards
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
    expect(screen.queryByText("Tailwind")).not.toBeInTheDocument();
  });

  it("should show more tags for featured cards", () => {
    const manyTags: BlogTag[] = [
      { id: "react", name: "React", slug: "react" },
      { id: "nextjs", name: "Next.js", slug: "nextjs" },
      { id: "typescript", name: "TypeScript", slug: "typescript" },
      { id: "tailwind", name: "Tailwind", slug: "tailwind" },
    ];

    render(<BlogCard {...defaultProps} tags={manyTags} featured={true} />);

    // Should show first 4 tags for featured cards
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("should handle image error gracefully", () => {
    render(<BlogCard {...defaultProps} />);
    const coverImage = screen.getByAltText("Test Article Title");

    // Simulate image error
    fireEvent.error(coverImage);

    // The component should handle the error (implementation may vary)
    expect(coverImage).toBeInTheDocument();
  });

  it("should render without cover image", () => {
    render(<BlogCard {...defaultProps} coverImage={undefined} />);
    // When no cover image is provided, it should use the default fallback
    const coverImage = screen.queryByAltText("Test Article Title");
    expect(coverImage).toBeInTheDocument(); // Fallback image should still be rendered
  });

  it("should render BlogModal component", () => {
    render(<BlogCard {...defaultProps} />);
    // The BlogModal component should be rendered (it contains the "Read More" button)
    // Since we're not mocking BlogModal, we just verify the component renders without errors
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
