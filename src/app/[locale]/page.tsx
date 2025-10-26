import { Metadata } from "next";
import LandingPage from "@/modules/home";

export const metadata: Metadata = {
  title: "React Kolkata Community | Meetups, Events & Learning",
  description:
    "Join React Kolkata, the hub for React developers in Kolkata. Participate in meetups, workshops, and connect with the community to build, learn, and grow.",
  openGraph: {
    title: "React Kolkata Community | Meetups, Events & Learning",
    description: "Connect with React developers in Kolkata. Join events, learn, and grow together.",
    url: "/",
    images: [
      {
        url: "/react-kolkata-meetup.png",
        width: 1200,
        height: 630,
        alt: "React Kolkata Community Meetup",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Kolkata Community | Meetups, Events & Learning",
    description: "Connect with React developers in Kolkata. Join events, learn, and grow together.",
    images: ["/react-kolkata-meetup.png"],
  },
};

export default function HomePage() {
  return <LandingPage />;
}
