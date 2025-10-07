import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";
import { features } from "@/base/constants/site";

const AboutSection = () => {
  const t = useTranslations("About");

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-semibold text-slate-100 sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed font-light text-slate-300 sm:text-xl">
            {t("description")}
          </p>
        </div>

        {/* Highlights in Card Format */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("mission.title")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
              {t("mission.description")}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("values.title")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
              {t("values.description")}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10">
            <h3
              className="text-xl font-medium text-sky-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("impact.title")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
              {t("impact.description")}
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="mt-20">
          <div className="text-center">
            <h3
              className="text-2xl font-semibold text-slate-100 sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("what_we_do")}
            </h3>
            <p className="mt-4 text-sm font-light text-slate-300 sm:text-base">
              {t("what_we_do_description")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const featureKeys = [
                "technical_workshops",
                "community_meetups",
                "lightning_talks",
                "project_showcases",
                "mentorship_program",
                "open_source",
              ];
              const featureKey = featureKeys[index];

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
                      {t(`features.${featureKey}.title`)}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
                    {t(`features.${featureKey}.description`)}
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
