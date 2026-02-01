import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import NewsletterSubscription from "../NewsletterSubscription";

const messages = {
  Newsletter: {
    title: "Stay Updated",
    description: "Subscribe to our newsletter to get the latest updates about events, workshops, and community news.",
    emailLabel: "Email Address",
    emailPlaceholder: "your.email@example.com",
    interestsLabel: "What are you interested in? (Optional)",
    interests: {
      events: "Upcoming Events",
      techTalks: "Tech Talks & Presentations",
      workshops: "Workshops & Hands-on Sessions",
      communityNews: "Community Updates & News",
    },
    button: {
      subscribe: "Subscribe to Newsletter",
      loading: "Subscribing...",
    },
    success: {
      title: "Successfully Subscribed!",
      message: "Thank you for subscribing. You'll receive our latest updates in your inbox.",
    },
    errors: {
      invalidEmail: "Please enter a valid email address.",
      generic: "Something went wrong. Please try again later.",
    },
    privacyNote: "We respect your privacy. Unsubscribe anytime.",
  },
};

const renderComponent = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <NewsletterSubscription />
    </NextIntlClientProvider>
  );
};

describe("NewsletterSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the newsletter form", () => {
    renderComponent();

    expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    expect(screen.getByText("Subscribe to our newsletter to get the latest updates about events, workshops, and community news.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Subscribe to Newsletter")).toBeInTheDocument();
  });

  it("renders all interest badges", () => {
    renderComponent();

    expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
    expect(screen.getByText("Tech Talks & Presentations")).toBeInTheDocument();
    expect(screen.getByText("Workshops & Hands-on Sessions")).toBeInTheDocument();
    expect(screen.getByText("Community Updates & News")).toBeInTheDocument();
  });

  it("allows selecting and deselecting interests", () => {
    renderComponent();

    const eventsBadge = screen.getByText("Upcoming Events");
    
    // Click to select
    fireEvent.click(eventsBadge);
    expect(eventsBadge.parentElement).toHaveClass("bg-primary");

    // Click again to deselect
    fireEvent.click(eventsBadge);
    expect(eventsBadge.parentElement).not.toHaveClass("bg-primary");
  });

  it("shows error for invalid email", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByText("Subscribe to Newsletter");

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    });
  });

  it("handles successful subscription", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByText("Subscribe to Newsletter");

    // Enter valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    // Wait for loading state
    await waitFor(() => {
      expect(screen.getByText("Subscribing...")).toBeInTheDocument();
    });

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText("Successfully Subscribed!")).toBeInTheDocument();
      expect(screen.getByText("Thank you for subscribing. You'll receive our latest updates in your inbox.")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("clears form after successful submission", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email Address") as HTMLInputElement;
    const submitButton = screen.getByText("Subscribe to Newsletter");
    const eventsBadge = screen.getByText("Upcoming Events");

    // Fill form
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(eventsBadge);
    fireEvent.click(submitButton);

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText("Successfully Subscribed!")).toBeInTheDocument();
    }, { timeout: 2000 });

    // Form should be cleared (but hidden behind success message)
    expect(emailInput.value).toBe("");
  });

  it("disables form during submission", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByText("Subscribe to Newsletter");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });
});
