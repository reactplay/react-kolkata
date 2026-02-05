"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Handshake, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  url: string;
  handle?: string;
  imageSrc?: string;
  description?: string;
};

const partners: Partner[] = [
  {
    name: "ReactPlay",
    url: "https://reactplay.io",
    handle: "@reactplay",
    imageSrc: "/partners/reactplay.png",
    description: "Learn, Create, and Share React projects",
  },
  {
    name: "Digital Dominators",
    url: "https://www.linkedin.com/company/digital-dominators-in/",
    handle: "@digital-dominators",
    imageSrc: "/partners/Digital_Dominators.jpg",
    description: "Digital innovation and technology community",
  },
  {
    name: "React Hyderabad",
    url: "https://www.linkedin.com/company/reacthyderabad/",
    handle: "@reacthyderabad",
    imageSrc: "/partners/reacthyderabad_logo.jpeg",
    description: "React community in Hyderabad",
  },
  {
    name: "Hackspire",
    url: "https://www.hackspire.tech/",
    handle: "@hackspire",
    imageSrc: "/partners/hackspire.jpg",
    description: "Inspiring hackers and developers",
  },
  {
    name: "Cityjs India",
    url: "https://www.linkedin.com/company/cityjs-india/",
    handle: "@CityJSIndia",
    imageSrc: "/partners/cityjs.png",
    description: "Indian chapter of CityJS Conferences",
  },
  {
    name: "The Helper",
    url: "https://www.linkedin.com/company/the-helper-srmist/",
    imageSrc: "/partners/helper.png",
    description: "Academic support platform",
  },
];

export default function CommunityPartners() {
  const t = useTranslations("Events");

  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("community_partners_title")}
          </h3>
          <p className="mt-2 text-slate-300">{t("community_partners_description")}</p>
        </div>

        <Link
          href="https://tally.so/r/nPxOMB"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:flex-shrink-0"
        >
          <div className="group flex items-center gap-2 rounded-lg border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-purple-500/10 px-4 py-2.5 transition hover:border-sky-500/50 hover:from-sky-500/15 hover:to-purple-500/15">
            <Handshake className="h-4 w-4 text-sky-300" />
            <span className="text-sm font-medium text-sky-200">{t("become_partner_cta")}</span>
            <ArrowRight className="h-3.5 w-3.5 text-sky-300 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner, idx) => (
          <Link
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-full w-full p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-xl bg-slate-800/[0.9]"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <article
              className={cn(
                "relative z-20 flex h-full flex-col overflow-hidden rounded-xl border bg-white/5 p-6",
                "border-white/5",
                "group-hover:border-slate-700"
              )}
            >
              {/* Partner Logo */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg ring-1 ring-white/10">
                {partner.imageSrc ? (
                  <Image
                    src={partner.imageSrc}
                    alt={partner.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-600/30 to-violet-600/30 text-lg font-bold text-white">
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="line-clamp-1 text-base font-semibold text-sky-200">
                  {partner.name}
                </h4>
                {partner.handle && <p className="mt-1 text-xs text-slate-400">{partner.handle}</p>}
                {partner.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-300">{partner.description}</p>
                )}
              </div>

              {/* Partner Badge */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                  <Users className="h-3 w-3" />
                  <span>Partner</span>
                </div>
                <div className="ml-auto">
                  <ArrowRight className="h-4 w-4 text-sky-300 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
