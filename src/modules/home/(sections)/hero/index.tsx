"use client";

import Image from "next/image";
import Link from "next/link";
import { trackGAEvent } from "@/utils/analytics";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
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

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpeg"
          alt="Kolkata landmark background"
          fill
          sizes="100vw"
          className="object-cover opacity-80 brightness-90 transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/70 via-transparent to-[#0B1220]" />
      </div>

      <div className="mx-auto flex h-[90vh] w-full max-w-7xl p-4 sm:px-6 md:h-auto lg:px-8">
        <div className="mt-auto flex max-w-4xl flex-col items-start text-left md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 text-slate-200">
              <MapPin className="h-5 w-5 text-sky-400" />
              <span className="text-lg font-medium shadow-md">Kolkata, West Bengal</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-6xl font-[530] tracking-tight text-white shadow-lg sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-xl leading-relaxed text-slate-300"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center"
          >
            <Button
              asChild
              size="xl"
              className="group relative h-16 overflow-hidden rounded-xl bg-indigo-600 px-10 text-xl font-bold text-white shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105 hover:bg-indigo-500"
              onClick={handleJoinClick}
            >
              <Link target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                <span className="flex items-center gap-3">
                  {t("join_community")}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>

            <div className="absolute -bottom-5 -left-18 hidden lg:block">
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 50C30 50 40 10 100 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
                <path d="M95 5L105 10L95 15" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
