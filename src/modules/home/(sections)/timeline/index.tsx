"use client";

import { motion } from "framer-motion";
import { Lightbulb, Rocket, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

const steps = [
  {
    id: "step-1",
    icon: Users,
    color: "blue",
  },
  {
    id: "step-2",
    icon: Lightbulb,
    color: "sky",
  },
  {
    id: "step-3",
    icon: Rocket,
    color: "purple",
  },
  {
    id: "step-4",
    icon: Zap,
    color: "amber",
  },
];

const TimelineSection = () => {
  const t = useTranslations("Timeline");

  return (
    <AnimatedSection className="relative overflow-hidden py-12">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-white/10 md:hidden" />

          <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-white/10 md:block" />

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20 md:pl-0 md:text-center"
                >
                  <div className="absolute top-0 left-0 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:-top-8 md:left-1/2 md:-translate-x-1/2">
                    <ArchitecturalCorner />
                    <div className="rounded-xl bg-linear-to-br from-blue-500/20 to-sky-400/20 p-2.5">
                      <Icon className="h-6 w-6 text-sky-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:pt-16">
                    <h3 className="mb-3 text-xl font-bold text-white">{t(`${step.id}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                      {t(`${step.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TimelineSection;
