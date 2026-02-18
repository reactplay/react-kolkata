"use client";

import { useTranslations } from "next-intl";

import championsData from "@/config/data/champions.json";
import AnimatedSection from "@/components/custom/animated-section";

import ChampionCard, { Champion } from "./champion-card";

const ChampionSection = () => {
  const t = useTranslations("Home.Champions");

  return (
    <AnimatedSection id="champions" className="relative overflow-hidden py-24">
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

        {/* Champions Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(championsData as Champion[]).map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ChampionSection;
