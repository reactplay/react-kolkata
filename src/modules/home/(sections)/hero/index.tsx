"use client";

import Image from "next/image";
import Link from "next/link";
import { trackGAEvent } from "@/utils/analytics";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const t = useTranslations("Hero");

  const handleJoinClick = () => {
    trackGAEvent("join_community_click", {
      category: "CTA",
      label: "Hero Join Button",
    });
  };

  const handleEventsClick = () => {
    trackGAEvent("see_events_click", {
      category: "CTA",
      label: "Hero See Events Button",
    });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/kolkata_image.jpg"
          alt="Abstract dark tech background with blue glow"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_top,rgba(37,99,235,0.35),transparent)]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B1220]/50 via-transparent to-[#0B1220]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-28 lg:flex lg:items-center lg:px-8 lg:py-36">
        <div className="max-w-4xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-white/5 px-3 py-1 text-xs text-amber-400">
            {t("badge")}
          </p>

          <h1
            className="text-4xl leading-snug font-bold tracking-tight wrap-break-word sm:text-5xl md:text-[2.9rem] lg:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h1>
          <h2
            className="mt-1 bg-linear-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-4xl leading-snug font-bold wrap-break-word text-transparent sm:text-5xl md:text-[2.9rem] lg:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("subtitle")}
          </h2>

          <p className="mt-8 max-w-2xl text-lg text-slate-300">{t("description")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-blue-600 to-sky-500 shadow-lg shadow-sky-900/30 transition hover:from-blue-500 hover:to-sky-400"
              onClick={handleJoinClick}
            >
              <Link target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                {t("join_community")}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              onClick={handleEventsClick}
            >
              <Link target="_blank" href="https://lu.ma/reactkolkata">
                {t("see_events")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
