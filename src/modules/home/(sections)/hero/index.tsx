"use client";

import Image from "next/image";
import Link from "next/link";
import { trackGAEvent } from "@/utils/analytics";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuArrowDown, LuArrowRight } from "react-icons/lu";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const t = useTranslations("Hero");

  const handleJoinClick = () => {
    trackGAEvent("join_community_click", {
      category: "CTA",
      label: "Hero Join Button",
    });
  };

  const rawTitle = t("title");
  const [firstWord, ...restWords] = rawTitle.split(" ");
  const restTitle = restWords.join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[108svh] flex-col overflow-hidden bg-[#0B1220] pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 hidden sm:block" aria-hidden="true">
        <div className="absolute inset-0">
          <Image
            src="/images/header.png"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_100%]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/90 via-[#0B1220]/20 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_28%,rgba(11,18,32,0.55)_0%,transparent_70%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1220]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B1220] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 text-slate-300"
        ></motion.div>

        <div className="mt-8 text-center sm:mt-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-lg text-amber-200/90 italic sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="font-display mt-2 text-[clamp(4.5rem,15vw,11.5rem)] leading-[0.85] tracking-tight text-balance text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]"
          >
            {firstWord}
            {restTitle ? (
              <>
                {" "}
                <em className="font-normal text-sky-400 italic">{restTitle}</em>
              </>
            ) : null}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-slate-300 sm:text-xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="xl"
              className="group h-14 rounded-none bg-indigo-600 px-8 text-base font-semibold text-white shadow-2xl shadow-indigo-500/25 transition-colors hover:bg-indigo-500"
              onClick={handleJoinClick}
            >
              <Link target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                <span className="flex items-center gap-2">
                  {t("join_community")}
                  <LuArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="h-14 rounded-none border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
            >
              <Link href="#events">
                <span className="flex items-center gap-2">
                  {t("see_events")}
                  <LuArrowDown className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="relative flex-1" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-6 sm:hidden">
        <div className="relative h-52 w-full overflow-hidden rounded-none">
          <Image
            src="/images/header.png"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_100%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-transparent to-[#0B1220]/70" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"
      >
        <dl className="grid grid-cols-1 divide-white/10 rounded-none border border-white/10 bg-[#0B1220]/60 backdrop-blur-md sm:grid-cols-3 sm:divide-x">
          {[
            { k: "Meetups", v: "Talks · Workshops · Networking" },
            { k: "Hooghly to New Town", v: "Victoria · Howrah Bridge · Tram" },
            { k: "All levels welcome", v: "Learn, build & share in public" },
          ].map((item) => (
            <div key={item.k} className="px-6 py-4 text-center sm:text-left">
              <dt className="font-display text-lg text-white italic">{item.k}</dt>
              <dd className="mt-0.5 text-xs tracking-[0.18em] text-slate-400 uppercase">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
};

export default HeroSection;
