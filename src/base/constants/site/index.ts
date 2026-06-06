import { LuCode, LuHeart, LuLightbulb, LuRocket, LuTarget, LuUsers } from "react-icons/lu";

export const features = [
  {
    icon: LuCode,
    title: "Technical Workshops",
    description:
      "Hands-on coding sessions covering the latest React patterns, tools, and best practices.",
  },
  {
    icon: LuUsers,
    title: "Community Meetups",
    description:
      "Regular gatherings to network, share experiences, and learn from fellow developers.",
  },
  {
    icon: LuLightbulb,
    title: "Lightning Talks",
    description:
      "Quick, focused presentations on specific topics, tips, and emerging technologies.",
  },
  {
    icon: LuRocket,
    title: "Project Showcases",
    description: "Platform for members to demo their projects and get feedback from the community.",
  },
  {
    icon: LuHeart,
    title: "Mentorship Program",
    description: "Connect experienced developers with newcomers for guidance and career support.",
  },
  {
    icon: LuTarget,
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
export const HASHNODE_API_URL = "https://gql.hashnode.com/";

// number of blogs to fetch in an api call
export const FETCH_BLOGS_COUNT_MOBILE = 4;
export const FETCH_BLOGS_COUNT_PAD = 6;
export const FETCH_BLOGS_COUNT_DESKTOP = 8;

// number of character for author in blog card
export const AUTHOR_NAME_CHAR_LIMIT_MD = 10;
export const AUTHOR_NAME_CHAR_LIMIT_XL = 13;
