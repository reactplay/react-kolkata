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
            className="text-foreground text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p className="text-foreground mt-6 text-lg leading-relaxed font-light sm:text-xl">
            {t("description")}
          </p>
        </div>

        {/* Highlights in Card Format */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border bg-background hover:border-primary/10 hover:bg-primary/10 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
            <h3
              className="text-foreground text-xl font-medium"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("mission.title")}
            </h3>
            <p className="text-foreground mt-4 text-sm leading-relaxed font-light sm:text-base">
              {t("mission.description")}
            </p>
          </div>
          <div className="border-border bg-background hover:border-primary/10 hover:bg-primary/10 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
            <h3
              className="text-foreground text-xl font-medium"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("values.title")}
            </h3>
            <p className="text-foreground mt-4 text-sm leading-relaxed font-light sm:text-base">
              {t("values.description")}
            </p>
          </div>
          <div className="border-border bg-background hover:border-primary/10 hover:bg-primary/10 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
            <h3
              className="text-foreground text-xl font-medium"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("impact.title")}
            </h3>
            <p className="text-foreground mt-4 text-sm leading-relaxed font-light sm:text-base">
              {t("impact.description")}
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="mt-20">
          <div className="text-center">
            <h3
              className="text-foreground text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("what_we_do")}
            </h3>
            <p className="text-foreground mt-4 text-sm font-light sm:text-base">
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
                  className="group border-border bg-background hover:border-primary/10 hover:bg-primary/10 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="from-primary/15 to-accent/20 dark:from-primary/35 dark:to-accent/30 rounded-lg bg-gradient-to-br p-2 transition-colors">
                      <Icon className="text-foreground h-5 w-5" />
                    </div>
                    <h4
                      className="text-foreground font-medium"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {t(`features.${featureKey}.title`)}
                    </h4>
                  </div>
                  <p className="text-foreground mt-3 text-sm leading-relaxed font-light sm:text-base">
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
