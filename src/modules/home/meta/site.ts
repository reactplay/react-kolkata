import { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "React Kolkata",
  description:
    "React Kolkata is a community of React enthusiasts in Kolkata. Join us for meetups, talks, workshops, and resources.",
  keywords: [
    "React",
    "react",
    "reactjs",
    "javascript",
    "Kolkata",
    "kolkata",
    "kolkatacommunity",
    "meetup",
    "techclub",
    "Community",
    "Events",
    "JavaScript",
    "javascript",
    "TypeScript",
    "typescript",
    "Frontend",
    "frontend",
  ],
  openGraph: {
    title: "React Kolkata — Community, Events, Resources",
    description:
      "Join React Kolkata for meetups, talks, workshops, and resources. A modern hub for React developers in Kolkata.",
    url: "https://reactkolkata.com",
    images: [
      {
        url: "react-kolkata-meetup.png",
        width: 1200,
        height: 630,
        alt: "React Kolkata Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Kolkata — Community, Events, Resources",
    description:
      "Join React Kolkata for meetups, talks, workshops, and resources. A modern hub for React developers in Kolkata.",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

// storing constant to hit hashnode api call
export const HASHNODE_API_URL = "https://gql.hashnode.com";
