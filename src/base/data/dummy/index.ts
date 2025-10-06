import { EVENT_TYPES } from "@/types/event";

export const events = [
  {
    id: "ze3qavyg",
    title: "CTRL + React: Join the React Kolkata Chapter by ReactPlay",
    venue: "Virtual",
    description:
      "In this event, our speakers will share insights on topics like React, AI, and other emerging tech. Expect practical takeaways, real-world examples, and fresh perspectives from folks working hands-on in the field. Event Schedule: Welcome Notes, Intro to Web3: Bringing Blockchain to Your React App - Aditya Singh, Context is All You Need - Akash Nath, React Router v7 Is Not as Scary as You Think - Elijah Asaolu, AI is easy only if you know how to crack it - Arindam Majumdar.",
    registrationUrl: "https://luma.com/ze3qavyg",
    image: "/images/tech-events-1.jpg",
    type: EVENT_TYPES.ONLINE,
    startDateTime: "2025-08-30T19:00:00+05:30",
    endDateTime: "2025-08-30T21:00:00+05:30",
  },
  {
    id: "sup8dxf3",
    title: "Speak Up, Tech Up! Join the React Kolkata Chapter by ReactPlay",
    venue: "Virtual",
    description:
      "In this event, our speakers will share insights on topics like React, AI, and other emerging tech. Expect practical takeaways, real-world examples, and fresh perspectives from folks working hands-on in the field. Event Schedule: Welcome notes, What is serverless inferencing in AI? - Haimantika Mitra, From JSX to the Cosmos: Navigating the React Ecosystem - Rohit Debnath, WebRTC for Frontend Devs Who've Suffered Enough Already - Sumanth, Break Time – Quick Quiz Inside, Bringing AI to your React Apps - Wadad Parker, Vibe Smart, Code Better: Things every react developer should know before vibe coding - Sayak Saha.",
    registrationUrl: "https://luma.com/sup8dxf3",
    image: "/images/tech-events-2.jpg",
    type: EVENT_TYPES.ONLINE,
    startDateTime: "2025-07-26T19:00:00+05:30",
    endDateTime: "2025-07-26T21:00:00+05:30",
  },
  {
    id: "9g6knhqp",
    title: "Hacktoberfest Special : Join the React Kolkata Chapter by ReactPlay",
    venue: "Virtual",
    description:
      "Join React Kolkata for an engaging panel discussion with open source maintainers and contributors as we gear up for Hacktoberfest. We'll talk about the realities of maintaining projects, the challenges of contribution, and how developers of all levels can meaningfully get involved in open source. Expect candid insights from experienced maintainers, practical tips for first-time contributors, and a chance to connect with the community that powers so much of the web. Whether you're curious about making your first PR or eager to share your journey, this is your space to learn, discuss, and be inspired.",
    registrationUrl: "https://luma.com/9g6knhqp",
    image: "/images/tech-events-3.jpg",
    type: EVENT_TYPES.ONLINE,
    startDateTime: "2025-10-11T19:00:00+05:30",
    endDateTime: "2025-10-11T21:00:00+05:30",
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
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "React developer and community organizer at React Kolkata",
      profileUrl: "https://github.com/priyankarpal",
    },
    tags: [
      { id: "community", name: "Community", slug: "community" },
      { id: "opensource", name: "Open Source", slug: "open-source" },
      { id: "kolkata", name: "Kolkata", slug: "kolkata" },
    ],
    readTime: 7,
    coverImage: "/images/kolkata_image.jpg",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
