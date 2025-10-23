import { BadgeCheck, Target, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";
import { features } from "@/base/constants/site";

import CoreTeam from "./core-team";

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
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/5">
            <div className="flex items-start gap-3.5">
              <div className="rounded-md bg-gradient-to-br from-blue-500/15 to-sky-400/15 p-2 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-sky-400/20">
                <Target className="h-4 w-4 text-sky-400" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-base font-medium text-slate-100"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t("mission.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-slate-200">
                  {t("mission.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-md hover:shadow-purple-500/5">
            <div className="flex items-start gap-3.5">
              <div className="rounded-md bg-gradient-to-br from-blue-500/15 to-sky-400/15 p-2 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-sky-400/20">
                <BadgeCheck className="h-4 w-4 text-sky-400" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-base font-medium text-slate-100"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t("values.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-slate-200">
                  {t("values.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-md hover:shadow-amber-500/5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3.5">
              <div className="rounded-md bg-gradient-to-br from-blue-500/15 to-sky-400/15 p-2 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-sky-400/20">
                <Zap className="h-4 w-4 text-sky-400" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-base font-medium text-slate-100"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t("impact.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-slate-300">
                  {t("impact.description")}
                </p>
              </div>
            </div>
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

        {/* Core Team Section */}
        <div className="mt-20">
          <CoreTeam />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
