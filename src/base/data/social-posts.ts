export type MentionPlatform = "LinkedIn" | "X" | "Instagram";

export type Mention = {
  quote: string;
  name: string;
  meta: string;
  context: string;
  href: string;
  platform: MentionPlatform;
  postedAt?: string;
  bio?: string;
  avatar?: string;
};

export const bundledMentions: Mention[] = [
  {
    quote:
      "A little late to the party with this post, but the energy from the August 23rd React Kolkata Community Meetup is still fresh! I had the absolute honor of being the Title Sponsor for this fantastic event. Connecting with such a vibrant and passionate community of developers, designers, and creators was truly inspiring. A major highlight for me was hosting the session, “Conquering the Blank Board: Brainstorming and Ideation in Miro.” Huge thanks to the React Kolkata team for organizing such a stellar meetup.",
    name: "Milon Paul",
    meta: "Title Sponsor · Aug'26 Meetup",
    context: "82 reactions · #ReactKolkata",
    href: "https://in.linkedin.com/in/milon-paul-92b798302",
    platform: "LinkedIn",
    postedAt: "2026-09-06",
    bio: "Title Sponsor of the Aug'26 Meetup · hosted the “Conquering the Blank Board” Miro ideation session",
  },
  {
    quote:
      "Great tech events aren't just attended — they're experienced. Behind every successful developer meetup is an unspoken energy: heads down debugging together, animated debates in the aisles and ideas turning into code in real time. Recently documented the vibrant energy at the React Kolkata community meetup. Their motto — “Learn together, Grow together, Build together” — came alive in every corner of the room.",
    name: "Gurdil Singh",
    meta: "Event photographer",
    context: "64 reactions · #reactkolkata",
    href: "https://in.linkedin.com/in/gurdil-singh-05124b339",
    platform: "LinkedIn",
    postedAt: "2026-09-04",
    bio: "Tech-event photographer documenting Kolkata meetups · @photographicgurdil_68",
  },
  {
    quote:
      "Thrilled to share that I attended the #ReactKolkata x #Hacktoberfest event! It was an incredible experience filled with insightful sessions — what an unforgettable day with amazing speakers, guests, and community.",
    name: "Gunj Joshi",
    meta: "Hacktoberfest attendee",
    context: "#ReactKolkata",
    href: "https://linkedin.com/in/gunjjoshi",
    platform: "LinkedIn",
    postedAt: "2026-08-30",
    bio: "The D. E. Shaw Group · attended the #ReactKolkata x Hacktoberfest event",
  },
  {
    quote:
      "React Kolkata asked me to talk about React. I talked about React, WebAssembly, distributed systems, ghosting, commitment issues and somehow rizzed an entire room of developers. Then we turned their browsers into compute nodes. Frontend by day. Distributed systems by questionable life choice. Huge love to React Kolkata, Sulagna Ghosh and the entire team for the stage, the chaos and the trust. 10/10 event. 0/10 emotional stability.",
    name: "Supratim Dhara",
    meta: "Speaker · Aug'26 Meetup",
    context: "#ReactKolkata",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7500099508253650945/",
    platform: "LinkedIn",
    bio: "Co-Founder & CTO, bechoHub · spoke on React-powered compute networks",
  },
  {
    quote:
      "Had a great day at React Kolkata as a speaker for the Second Meetup of 2026 at Techno India University. Extending thanks to Sulagna Ghosh and team for organising the meetup so well and smoothly — it was really super cool. Worth mentioning really cool OG devs I met during the meetup: Sayak Saha, Supratim Dhara and Aprajita Verma — those few hours of interaction had more impact than the whole week! It was an awesome Sunday with Wiki Kolkata. Special thanks to Tapas Adhikary for such an awesome community you have built. #rtkaug26",
    name: "Ayushman Bhattacharya",
    meta: "Speaker · Aug'26 Meetup",
    context: "#rtkaug26 · #ReactKolkata",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7497530225099173888/",
    platform: "LinkedIn",
    bio: "Lead Organizer, GDG JIS University · spoke on the “use client” client boundary",
  },
  {
    quote:
      "From writing code to building with the community. Excited to be part of the React Kolkata Meetup: Aug'26 Edition at Techno India University, Kolkata. The event brings together developers, students, AI enthusiasts, founders, and tech professionals around one common goal: learning, building, and connecting. For me, events like this are not just about attending talks — they are opportunities to learn from people actually building. Learn together. Build together. Grow together.",
    name: "Gourab Biswas",
    meta: "Attendee · Aug'26 Meetup",
    context: "#rtkaug26 · #ReactKolkata",
    href: "https://www.linkedin.com/posts/gourab-biswas-478374291_rtkaug26-reactkolkata-reactjs-ugcPost-7497203023916621825-y3JP/",
    platform: "LinkedIn",
    bio: "Developer · attended the Aug'26 Edition at Techno India University",
  },
  {
    quote:
      "A great day of learning, connecting and building at the React Kolkata Meetup Aug'26 Edition! I'm really happy to have been a part of it, held at Techno India University, Kolkata. As a Computer Science student interested in software development and modern web technologies, attending developer meetups like this is always a great opportunity — it's not just about listening to technical talks, but also about meeting people, sharing ideas, asking questions, and understanding how others are learning and building.",
    name: "Jeet Sasmal",
    meta: "Attendee · Aug'26 Meetup",
    context: "#ReactKolkata · #rtkaug26",
    href: "https://www.linkedin.com/posts/jeet-sasmal-321958406_reactkolkata-rtkaug26-reactjs-ugcPost-7497345877045387264-TOLs/",
    platform: "LinkedIn",
    bio: "Computer Science student · attended at Techno India University",
  },
  {
    quote:
      "Second React Kolkata. Even bigger inspiration. Some events you attend. Some events make you want to build more, learn more and connect more. From deep technical discussions to the Buildathon, Quiz, networking and conversations with fellow developers — a perfect reminder that the tech community grows strongest when knowledge is shared. A special shoutout to the speakers and a very special shoutout to the React Kolkata organizing team for such a welcoming, high-energy developer community.",
    name: "Sneha Chakraborty",
    meta: "Two-time attendee · Aug'26 Meetup",
    context: "#ReactKolkata",
    href: "https://www.linkedin.com/posts/sneha-chakraborty-652978324_reactkolkata-reactjs-react-activity-7500014440843763712-1PEq",
    platform: "LinkedIn",
    bio: "Attended twice · from talks to Buildathon and Quiz",
  },
  {
    quote:
      "A new milestone in my tech journey! I successfully participated in the React Kolkata Buildathon, organized in collaboration with Miro Meetup and React Siliguri at Techno India University. Being part of this Buildathon was a great opportunity to learn, build, collaborate, and challenge myself in a real-world development environment. Grateful for the experience, the learning, and the connections made along the way.",
    name: "Abhranil Dutta",
    meta: "Buildathon participant · Aug'26",
    context: "#ReactKolkata",
    href: "https://www.linkedin.com/posts/abhranil-dutta_reactkolkata-buildathon-reactjs-activity-7500241051639693312-_7U2",
    platform: "LinkedIn",
    bio: "Built at the Miro × React Siliguri Buildathon",
  },
];

const isValidMention = (item: unknown): item is Mention => {
  if (typeof item !== "object" || item === null) return false;
  const m = item as Record<string, unknown>;
  return (
    typeof m.quote === "string" &&
    typeof m.name === "string" &&
    typeof m.href === "string" &&
    (m.platform === undefined ||
      m.platform === "LinkedIn" ||
      m.platform === "X" ||
      m.platform === "Instagram")
  );
};

const normalize = (item: Mention): Mention => ({
  quote: item.quote,
  name: item.name,
  meta: typeof item.meta === "string" ? item.meta : "",
  context: typeof item.context === "string" ? item.context : "",
  href: item.href,
  platform: item.platform ?? "LinkedIn",
  postedAt: typeof item.postedAt === "string" ? item.postedAt : undefined,
  bio: typeof item.bio === "string" ? item.bio : undefined,
  avatar: typeof item.avatar === "string" ? item.avatar : undefined,
});

export function mergeMentions(remote: unknown): Mention[] {
  const seen = new Set<string>();
  const merged: Mention[] = [];

  const push = (item: Mention) => {
    const key = item.href.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(normalize(item));
  };

  if (Array.isArray(remote)) {
    for (const item of remote) {
      if (isValidMention(item)) push(item as Mention);
    }
  }
  for (const item of bundledMentions) push(item);

  return merged.sort((a, b) => (b.postedAt ?? "").localeCompare(a.postedAt ?? ""));
}

export async function fetchRemoteMentions(signal: AbortSignal): Promise<unknown> {
  const url = process.env.NEXT_PUBLIC_MENTIONS_FEED_URL;
  if (!url) return null;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Mentions feed responded ${res.status}`);
  return res.json();
}
