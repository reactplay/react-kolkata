import { ReactElement } from "react";
import { NextIntlClientProvider } from "next-intl";

// Mock translations for testing
const mockMessages = {
  Hero: {
    badge: "Community • Events • Learning",
    title: "React Kolkata",
    subtitle: "Build. Learn. Connect.",
    description: "A modern hub for React developers in Kolkata.",
    join_community: "Join the Community",
    see_events: "See Upcoming Events",
  },
  About: {
    title: "About React Kolkata",
    description: "We are a community-driven group focused on knowledge-sharing.",
    what_we_do: "What We Do",
    what_we_do_description: "Discover the various ways we support and grow our developer community",
    mission: {
      title: "Our Mission",
      description: "Empower developers through events, workshops, and mentorship.",
    },
    values: {
      title: "Our Values",
      description: "Openness, inclusivity, continuous learning, and giving back.",
    },
    impact: {
      title: "Community Impact",
      description: "Monthly meetups, lightning talks, hands-on sessions.",
    },
    features: {
      technical_workshops: {
        title: "Technical Workshops",
        description: "Hands-on coding sessions covering the latest React patterns.",
      },
      community_meetups: {
        title: "Community Meetups",
        description: "Regular gatherings to network, share experiences.",
      },
      lightning_talks: {
        title: "Lightning Talks",
        description: "Quick, focused presentations on specific topics.",
      },
      project_showcases: {
        title: "Project Showcases",
        description: "Platform for members to demo their projects.",
      },
      mentorship_program: {
        title: "Mentorship Program",
        description: "Connect experienced developers with newcomers.",
      },
      open_source: {
        title: "Open Source Contributions",
        description: "Collaborative projects and contributions to the broader React ecosystem.",
      },
    },
  },
  Events: {
    title: "Events",
    description: "Join our meetups and workshops. Learn, network, and build together.",
    filter: "Filter",
    view_all: "View all",
    register: "Register",
    details: "Details",
    watch_recording: "Watch Recording",
    view_slides: "View Slides",
    upcoming_events: "Upcoming Events",
    past_events: "Past Events",
    call_for_speakers: "Call for Speakers",
    call_for_champions: "Call for Champions",
    view_all_events: "View All Events",
    view_all_past_events: "View All Past Events",
    coming_soon: "Coming Soon",
  },
  Blog: {
    title: "Latest from the Blog",
    description: "Guides, tips, and community highlights from React Kolkata.",
    filter: "Filter",
    view_all_posts: "View all posts",
    filter_by_tags: "Filter by tags",
    showing_posts: "Showing {count} of {total} posts",
    clear: "Clear",
  },
  Contributors: {
    title: "Our Contributors",
    description: "Meet the amazing people who make React Kolkata possible.",
    loading: "Loading contributors...",
    error: "Error loading contributors",
    total_contributors: "Total contributors: {count}",
    footer_note: "Contributors are automatically fetched from our GitHub repository.",
  },
};

// Test wrapper with NextIntl context
export const TestWrapper = ({ children }: { children: ReactElement }) => (
  <NextIntlClientProvider locale="en" messages={mockMessages}>
    {children}
  </NextIntlClientProvider>
);
