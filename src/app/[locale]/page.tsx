import { Metadata } from "next";
import LandingPage from "@/modules/home";

import { getLocalizedPath } from "@/config/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "React Kolkata Community | Meetups, Events & Learning",
    description:
      "Join React Kolkata, the hub for React developers in Kolkata. Participate in meetups, workshops, and connect with the community to build, learn, and grow.",
    alternates: {
      canonical: getLocalizedPath("", locale),
      languages: {
        en: "/",
        bn: "/bn",
        hi: "/hi",
        es: "/es",
      },
    },
    openGraph: {
      title: "React Kolkata Community | Meetups, Events & Learning",
      description:
        "Connect with React developers in Kolkata. Join events, learn, and grow together.",
      url: getLocalizedPath("", locale),
      images: [
        {
          url: "/images/hero.jpeg",
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
      description:
        "Connect with React developers in Kolkata. Join events, learn, and grow together.",
      images: ["/images/hero.jpeg"],
    },
  };
}

export default function HomePage() {
  return <LandingPage />;
}
