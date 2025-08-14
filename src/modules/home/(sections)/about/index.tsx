import AnimatedSection from "@/components/custom/animated-section";
import { features, highlights } from "@/base/constants/site";

const AboutSection = () => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-semibold text-slate-100 sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            About React Kolkata
          </h2>
          <p className="mt-6 text-lg leading-relaxed font-light text-slate-300 sm:text-xl">
            We are a community-driven group focused on knowledge-sharing, collaboration, and career
            growth for React developers across Kolkata and beyond. Our mission is to create an
            inclusive space where developers of all levels can learn, grow, and contribute.
          </p>
        </div>

        {/* Highlights in Card Format */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10"
            >
              <h3
                className="text-xl font-medium text-sky-200"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* What We Do */}
        <div className="mt-20">
          <div className="text-center">
            <h3
              className="text-2xl font-semibold text-slate-100 sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              What We Do
            </h3>
            <p className="mt-4 text-sm font-light text-slate-300 sm:text-base">
              Discover the various ways we support and grow our developer community
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10"
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
                  <p className="mt-3 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
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
