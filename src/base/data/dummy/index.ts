import { EVENT_TYPES } from "@/types/event";

export const events = [
  {
    id: "evt-39ktH71VIdB6ynb",
    title: "React Kolkata Meetup: May’26 Edition",
    venue: "Indus Net Technologies (INT.), Kolkata",
    description:
      "Join us at the first-ever in-person meetup of React Kolkata. Calling out all the React and AI developers from the City of Joy and beyond to gather and make this event successful with learning and sharing.",
    registrationUrl: "https://luma.com/event/evt-39ktH71VIdB6ynb",
    image: "/video/poster.mp4",
    type: EVENT_TYPES.IN_PERSON,
    startDateTime: "2026-05-24T10:00:00+05:30",
    endDateTime: "2026-05-24T14:00:00+05:30",
    isFeatured: true,
  },
];

export const articles = [
  {
    id: "a-001",
    title: "React Kolkata Recap: Patterns for Scalable Apps",
    date: "2025-08-02T10:30:00+05:30",
    excerpt:
      "Highlights from our last meetup covering modularization, performance budgets, and error boundaries. We explored real-world examples from local teams and discussed best practices for building maintainable React applications at scale.",
    author: {
      id: "author-1",
      name: "Priyanka Pal",
      avatar:
        "https://ui-avatars.com/api/?name=Priyanka+Pal&size=150&background=0ea5e9&color=fff&bold=true",
      bio: "React developer and community organizer at React Kolkata",
      profileUrl: "https://github.com/priyankarpal",
    },
    tags: [
      { id: "react", name: "React", slug: "react" },
      { id: "patterns", name: "Patterns", slug: "patterns" },
      { id: "performance", name: "Performance", slug: "performance" },
    ],
    readTime: 8,
    coverImage: "/images/tech-events-1.jpg",
    url: "https://reactplay.hashnode.dev/react-kolkata-recap-patterns-for-scalable-apps",
  },
  {
    id: "a-002",
    title: "RSC in Practice: What We Learned",
    date: "2025-07-18T14:15:00+05:30",
    excerpt:
      "Real-world experience integrating Server Components and progressive data fetching. Our community members share their journey of adopting React Server Components in production applications.",
    author: {
      id: "author-2",
      name: "Badal Jain",
      avatar:
        "https://ui-avatars.com/api/?name=Badal+Jain&size=150&background=8b5cf6&color=fff&bold=true",
      bio: "Full-stack developer and open source contributor",
      profileUrl: "https://github.com/badaljain",
    },
    tags: [
      { id: "react", name: "React", slug: "react" },
      { id: "rsc", name: "Server Components", slug: "server-components" },
      { id: "nextjs", name: "Next.js", slug: "nextjs" },
    ],
    readTime: 6,
    coverImage: "/images/tech-events-2.jpg",
    url: "https://reactplay.hashnode.dev/rsc-in-practice-what-we-learned",
  },
  {
    id: "a-003",
    title: "DX Tips: Tooling, Linting, and Formatting",
    date: "2025-07-01T09:45:00+05:30",
    excerpt:
      "Our preferred configurations for ESLint, Prettier, and TypeScript to keep teams productive. A comprehensive guide to setting up development environments that scale with your team.",
    author: {
      id: "author-3",
      name: "Dev Community",
      avatar:
        "https://ui-avatars.com/api/?name=Dev+Community&size=150&background=10b981&color=fff&bold=true",
      bio: "Collective wisdom from React Kolkata community",
      profileUrl: "https://github.com/reactplay",
    },
    tags: [
      { id: "dx", name: "Developer Experience", slug: "developer-experience" },
      { id: "tooling", name: "Tooling", slug: "tooling" },
      { id: "typescript", name: "TypeScript", slug: "typescript" },
    ],
    readTime: 5,
    coverImage: "/images/tech-events-3.jpg",
    url: "https://reactplay.hashnode.dev/dx-tips-tooling-linting-and-formatting",
  },
  {
    id: "a-004",
    title: "Community Spotlight: Open Source in Kolkata",
    date: "2025-06-20T16:20:00+05:30",
    excerpt:
      "How local contributors are building impactful tools and libraries for the ecosystem. Meet the developers from Kolkata who are making a difference in the global React community.",
    author: {
      id: "author-1",
      name: "Priyanka Pal",
      avatar:
        "https://ui-avatars.com/api/?name=Priyanka+Pal&size=150&background=0ea5e9&color=fff&bold=true",
      bio: "React developer and community organizer at React Kolkata",
      profileUrl: "https://github.com/priyankarpal",
    },
    tags: [
      { id: "community", name: "Community", slug: "community" },
      { id: "opensource", name: "Open Source", slug: "open-source" },
      { id: "kolkata", name: "Kolkata", slug: "kolkata" },
    ],
    readTime: 7,
    coverImage: "/images/kolkata-hero.jpg",
    url: "https://reactplay.hashnode.dev/community-spotlight-open-source-in-kolkata",
  },
  {
    id: "a-005",
    title: "Rendering Strategies: CSR, SSR, and Streaming",
    date: "2025-05-30T11:00:00+05:30",
    excerpt:
      "A practical guide to choosing the right rendering mode for each page and component. Understanding the trade-offs and performance implications of different rendering strategies.",
    author: {
      id: "author-2",
      name: "Badal Jain",
      avatar:
        "https://ui-avatars.com/api/?name=Badal+Jain&size=150&background=8b5cf6&color=fff&bold=true",
      bio: "Full-stack developer and open source contributor",
      profileUrl: "https://github.com/badaljain",
    },
    tags: [
      { id: "react", name: "React", slug: "react" },
      { id: "ssr", name: "Server-Side Rendering", slug: "ssr" },
      { id: "performance", name: "Performance", slug: "performance" },
    ],
    readTime: 9,
    coverImage: "/images/tech-events-1.jpg",
    url: "https://reactplay.hashnode.dev/rendering-strategies-csr-ssr-and-streaming",
  },
];

export const resources = [
  {
    id: "r-001",
    title: "React Docs: Modern Fundamentals",
    date: "Updated often",
    excerpt:
      "The official React docs with up-to-date patterns and APIs. Your go-to resource for learning React concepts from the ground up.",
    link: "https://react.dev/",
  },
  {
    id: "r-002",
    title: "MDN Web Docs: Web APIs",
    date: "Reference",
    excerpt:
      "Everything you need on the web platform and APIs. Comprehensive documentation for web standards and browser APIs.",
    link: "https://developer.mozilla.org/",
  },
  {
    id: "r-003",
    title: "TypeScript Handbook",
    date: "Reference",
    excerpt:
      "A comprehensive guide for writing type-safe JavaScript. Learn how to leverage TypeScript's powerful type system in your React applications.",
    link: "https://www.typescriptlang.org/docs/handbook/intro.html",
  },
  {
    id: "r-004",
    title: "Next.js App Router Guide",
    date: "Guide",
    excerpt:
      "Patterns for data fetching, routing, and rendering in the App Router. Master the latest Next.js features and build performant applications.",
    link: "https://nextjs.org/docs/app",
  },
  {
    id: "r-005",
    title: "Recharts + shadcn/ui Charts",
    date: "Example",
    excerpt:
      "Build charts with composition and custom tooltips. Learn how to create beautiful, interactive data visualizations in React.",
    link: "https://ui.shadcn.com/",
  },
];
