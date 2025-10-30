import { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://reactkolkata.com"),
  title: {
    default: "React Kolkata | Community, Events & Learning",
    template: "%s | React Kolkata",
  },
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
    siteName: "React Kolkata",
    images: [
      {
        url: "/react-kolkata-meetup.png",
        width: 1200,
        height: 630,
        alt: "React Kolkata Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Kolkata — Community, Events, Resources",
    description:
      "Join React Kolkata for meetups, talks, workshops, and resources. A modern hub for React developers in Kolkata.",
    images: ["/react-kolkata-meetup.png"],
    site: "@ReactKolkata",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const HASHNODE_API_URL = "https://gql.hashnode.com";
