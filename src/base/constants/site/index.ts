import { Code, Heart, Lightbulb, Rocket, Target, Users } from "lucide-react";

export const features = [
  {
    icon: Code,
    title: "Technical Workshops",
    description:
      "Hands-on coding sessions covering the latest React patterns, tools, and best practices.",
  },
  {
    icon: Users,
    title: "Community Meetups",
    description:
      "Regular gatherings to network, share experiences, and learn from fellow developers.",
  },
  {
    icon: Lightbulb,
    title: "Lightning Talks",
    description:
      "Quick, focused presentations on specific topics, tips, and emerging technologies.",
  },
  {
    icon: Rocket,
    title: "Project Showcases",
    description: "Platform for members to demo their projects and get feedback from the community.",
  },
  {
    icon: Heart,
    title: "Mentorship Program",
    description: "Connect experienced developers with newcomers for guidance and career support.",
  },
  {
    icon: Target,
    title: "Open Source Contributions",
    description: "Collaborative projects and contributions to the broader React ecosystem.",
  },
];

export const highlights = [
  {
    title: "Our Mission",
    description:
      "Empower developers through events, workshops, and mentorship while fostering an inclusive, welcoming community for continuous learning and growth.",
  },
  {
    title: "Our Values",
    description:
      "Openness, inclusivity, continuous learning, and giving back by sharing knowledge, opportunities, and supporting each other's professional journey.",
  },
  {
    title: "Community Impact",
    description:
      "Monthly meetups, lightning talks, hands-on sessions, and collaborations with local tech organizations to strengthen Kolkata's developer ecosystem.",
  },
];

// storing constant to hit hashnode api call
export const HASHNODE_API_URL = "https://gql.hashnode.com";

// number of blogs to fetch in an api call
export const FETCH_BLOGS_COUNT_MOBILE = 4;
export const FETCH_BLOGS_COUNT_PAD = 6;
export const FETCH_BLOGS_COUNT_DESKTOP = 8;
