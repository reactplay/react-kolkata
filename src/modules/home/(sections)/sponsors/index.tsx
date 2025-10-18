import React from "react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

const SponsorsSection = () => {
  const t = useTranslations("Sponsors");

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

        {/* Sample Sponsor Card (styled like other feature cards) */}
        <div className="mt-12 grid justify-center">
          <div className="group max-w-3xl rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-sky-400/20 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-sky-300"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8.5 11.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 3a3.5 3.5 0 10-7 0v1h7v-1z" />
                </svg>
              </div>

              <h4
                className="font-medium text-slate-100"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {t("sample.name")}
              </h4>
            </div>

            <p className="mt-3 text-sm leading-relaxed font-light text-slate-300 sm:text-base">
              {t("sample.description")}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SponsorsSection;
