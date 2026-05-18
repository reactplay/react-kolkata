"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  BookOpen,
  GitPullRequest,
  Lightbulb,
  MonitorPlay,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

const tags = [
  "React.js",
  "Next.js",
  "Web Development",
  "UI/UX Design",
  "Kolkata Tech",
  "Monthly Meetups",
  "Workshops",
  "Networking",
  "Open Source",
];

const AboutSection = () => {
  const t = useTranslations("About");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });

      gsap.fromTo(
        ".feature-card",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".feature-cards-container",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".bottom-card",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".bottom-cards-container",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative" ref={containerRef}>
      <div className="no-scrollbar z-20 w-full overflow-hidden border-y border-white/5 bg-[#0B1220]/50 py-6 backdrop-blur-md">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0B1220] to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-[#0B1220] to-transparent" />

        <div className="marquee-inner flex w-max text-sm font-semibold tracking-wider whitespace-nowrap text-slate-300 uppercase">
          <div className="flex gap-16 pr-16">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-16 pr-16">
            {tags.map((tag) => (
              <span key={tag + "-dup"} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatedSection className="relative py-16">
        <div className="absolute top-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-8 text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Kolkata&apos;s <span className="text-slate-500">Premier</span> React{" "}
              <span className="text-slate-500">Community</span>
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed font-light text-slate-400 sm:text-2xl">
              React Kolkata brings together the{" "}
              <span className="font-medium text-white">brightest developers</span> and innovators
              across the city to solve real-world challenges. Join{" "}
              <span className="font-medium text-white">1000+ passionate developers</span> building
              the future.
            </p>
          </div>

          <div className="feature-cards-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Target, title: t("mission.title"), desc: t("mission.description") },
              { icon: BadgeCheck, title: t("values.title"), desc: t("values.description") },
              { icon: Zap, title: t("impact.title"), desc: t("impact.description") },
            ].map((item) => (
              <div
                key={item.title}
                className="feature-card relative overflow-hidden rounded-2xl border border-white/5 bg-[#0B1220]/50 p-8 backdrop-blur-md"
              >
                <ArchitecturalCorner />
                <div className="relative">
                  <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-400/10 p-3 ring-1 ring-white/10">
                    <item.icon className="h-6 w-6 text-sky-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="mb-16 text-center">
              <h3 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {t("what_we_do")}
              </h3>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-400">
                {t("what_we_do_description")}
              </p>
            </div>

            <div className="bottom-cards-container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "technical_workshops",
                "community_meetups",
                "lightning_talks",
                "project_showcases",
                "mentorship_program",
                "open_source",
              ].map((key) => {
                const icons: Record<string, any> = {
                  technical_workshops: Zap,
                  community_meetups: Users,
                  lightning_talks: Lightbulb,
                  project_showcases: MonitorPlay,
                  mentorship_program: BookOpen,
                  open_source: GitPullRequest,
                };
                const Icon = icons[key] || Zap;

                return (
                  <div
                    key={key}
                    className="bottom-card relative overflow-hidden rounded-2xl border border-white/5 bg-[#0B1220]/50 p-8 backdrop-blur-md"
                  >
                    <ArchitecturalCorner />
                    <div className="relative">
                      <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-400/10 p-3 ring-1 ring-white/10">
                        <Icon className="h-6 w-6 text-sky-400" />
                      </div>
                      <h4 className="mb-3 text-xl font-bold text-white">
                        {t(`features.${key}.title`)}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-400">
                        {t(`features.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;
