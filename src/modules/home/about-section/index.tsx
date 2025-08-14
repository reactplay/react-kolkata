import { Code, Heart, Lightbulb, Rocket, Target, Users } from "lucide-react";

import AnimatedSection from "@/components/custom/animated-section";

const features = [
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

const AboutSection = () => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-medium tracking-tight text-slate-100 sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            About React Kolkata
          </h2>
          <p className="mt-6 text-lg leading-relaxed font-light text-slate-300">
            We are a community-driven group focused on knowledge-sharing, collaboration, and career
            growth for React developers across Kolkata and beyond. Our mission is to create an
            inclusive space where developers of all levels can learn, grow, and contribute.
          </p>
        </div>

        {/* Mission, Values, Highlights */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Our Mission
            </h3>
            <p className="mt-4 leading-relaxed font-light text-slate-300">
              Empower developers through events, workshops, and mentorship while fostering an
              inclusive, welcoming community for continuous learning and growth.
            </p>
          </div>
          <div className="text-center">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Our Values
            </h3>
            <p className="mt-4 leading-relaxed font-light text-slate-300">
              Openness, inclusivity, continuous learning, and giving back by sharing knowledge,
              opportunities, and supporting each other&apos;s professional journey.
            </p>
          </div>
          <div className="text-center">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Community Impact
            </h3>
            <p className="mt-4 leading-relaxed font-light text-slate-300">
              Monthly meetups, lightning talks, hands-on sessions, and collaborations with local
              tech organizations to strengthen Kolkata&apos;s developer ecosystem.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mt-20">
          <div className="text-center">
            <h3
              className="text-2xl font-medium text-slate-100 sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              What We Do
            </h3>
            <p className="mt-4 font-light text-slate-300">
              Discover the various ways we support and grow our developer community
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-white/10 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-sky-400/20 p-2">
                      <Icon className="h-5 w-5 text-sky-300" />
                    </div>
                    <h4
                      className="font-medium text-slate-100"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {feature.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed font-light text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
