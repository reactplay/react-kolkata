import { Metadata } from "next";

import { getLocalizedPath } from "@/config/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pageTitle = "Code of Conduct";
  const pageDescription =
    "How we look out for each other at React Kolkata, at our events and online.";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: getLocalizedPath("/code-of-conduct", locale),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: getLocalizedPath("/code-of-conduct", locale),
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

const sections = [
  {
    heading: "The short version",
    body: [
      "Be kind. That is really what it comes down to. React Kolkata exists so people can learn React, meet others, and have a good time doing it. Everyone who shows up, whether it is their first meetup or their fiftieth, should feel welcome here.",
    ],
  },
  {
    heading: "How we treat each other",
    body: [
      "We welcome people of every background, identity, and experience level. Beginners asking basic questions are just as important to this community as senior engineers giving talks.",
      "Give people the benefit of the doubt, listen more than you speak, and remember that there is a human being on the other side of every conversation. A little patience goes a long way, especially with newcomers who are still finding their footing.",
    ],
  },
  {
    heading: "What is never okay",
    body: [
      "Harassment of any kind has no place here. That includes offensive comments about someone's gender, identity, appearance, or background, intimidation, unwelcome attention, and deliberately disrupting talks or discussions.",
      "If someone tells you that something you said or did made them uncomfortable, please take it seriously. You do not have to agree or have a debate about it. Just stop, and move on gracefully.",
    ],
  },
  {
    heading: "At our events",
    body: [
      "Our meetups and workshops are shared spaces. Respect the speakers by listening while they talk and saving questions for the right moment. Respect the venue by cleaning up after yourself. And respect your fellow attendees by giving them space to participate too.",
      "If you see someone sitting alone or looking a bit lost, say hello. Most of us remember what it felt like to walk into our first meetup, and a friendly face makes all the difference.",
    ],
  },
  {
    heading: "In our online spaces",
    body: [
      "The same rules apply on WhatsApp, Discord, GitHub, and social media. Keep discussions friendly and on topic, do not spam the groups, and do not share anyone's personal details or private messages without their permission.",
    ],
  },
  {
    heading: "If something feels off",
    body: [
      "If you experience or witness behaviour that does not sit right with you, please reach out to us at reactkolkata@gmail.com. Tell us what happened in your own words, and we will take it from there.",
      "We will keep your message private and handle it with care. You will never get in trouble for raising a genuine concern.",
    ],
  },
  {
    heading: "What happens next",
    body: [
      "When a concern is reported, the organisers will look into it quietly and fairly. Depending on what happened, we might have a private word with the person involved, ask them to leave an event, or in serious cases, remove them from the community altogether.",
      "Our goal is never punishment for its own sake. It is simply to keep React Kolkata a place where everyone feels safe showing up.",
    ],
  },
];

export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] pb-24">
      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-none bg-sky-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
            Code of <em className="text-sky-400 italic">Conduct</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            React Kolkata works when people feel safe asking questions, sharing unfinished ideas,
            and being themselves. This page is our promise to keep it that way.
          </p>
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-3xl space-y-10 px-4 sm:px-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed text-slate-400">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <div className="p-6 sm:p-8">
          <p className="font-display text-xl text-white italic">Thank you for being here.</p>
          <p className="mt-3 leading-relaxed text-slate-400">
            Every friendly question answered, every talk given, and every newcomer welcomed is what
            makes this community what it is. We are glad you are a part of it.
          </p>
        </div>
      </div>
    </main>
  );
}
