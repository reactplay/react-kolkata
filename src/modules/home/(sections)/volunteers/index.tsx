"use client";

import { useTranslations } from "next-intl";

import volunteersData from "@/config/data/volunteers.json";
import AnimatedSection from "@/components/custom/animated-section";

import VolunteerCard, { Volunteer } from "./volunteer-card";

const VolunteerSection = () => {
  const t = useTranslations("Home.Volunteers");

  return (
    <AnimatedSection id="volunteers" className="relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[128px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-[128px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">{t("description")}</p>
        </div>

        {/* Volunteers Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(volunteersData as Volunteer[]).map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>

        {/* Optional: Join as Volunteer CTA */}
        <div className="mt-20 rounded-2xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-sm">
          <h3 className="mb-4 text-xl font-semibold text-slate-100">{t("join_title")}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-slate-400">{t("join_description")}</p>
          <a
            href="https://bit.ly/react-kolkata-volunteer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-105 hover:shadow-sky-500/40 active:scale-95"
          >
            {t("join_button")}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default VolunteerSection;
