"use client";

import { championsData } from "@/config/data/champions";
import AnimatedSection from "@/components/custom/animated-section";

import ChampionCard, { Champion } from "./champion-card";

const ChampionSection = () => {
  return (
    <AnimatedSection id="champions" className="relative overflow-hidden py-16">
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[128px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-[128px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Community <span className="text-sky-500">Champions</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-24 rounded-full bg-linear-to-r from-sky-500 to-blue-600" />
          </div>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Meet the dedicated individuals who go above and beyond to support and grow the React
            Kolkata community.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(championsData as Champion[]).map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ChampionSection;
