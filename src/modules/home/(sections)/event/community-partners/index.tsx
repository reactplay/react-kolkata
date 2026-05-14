"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

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
  return (
    <section className="relative overflow-hidden py-12">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h3 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Community <span className="text-sky-500">Partners</span>
            </h3>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-slate-400">
              We collaborate with amazing tech communities to bring more value to you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full"
            >
              <article
                className={cn(
                  "relative flex h-full flex-col gap-5 rounded-xl border border-white/5 bg-[#0B1220] p-6 transition-all duration-500",
                  "hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.02] hover:shadow-2xl hover:shadow-sky-500/5"
                )}
              >
                <ArchitecturalCorner />

                <div className="flex items-start justify-between">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/5 p-2 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-sky-500/30">
                    {partner.imageSrc ? (
                      <Image
                        src={partner.imageSrc}
                        alt={partner.name}
                        fill
                        className="object-contain p-1.5 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white/30">
                        {partner.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-400" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-sky-400">
                    {partner.name}
                  </h4>
                  {partner.handle && (
                    <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase transition-colors group-hover:text-slate-400">
                      {partner.handle}
                    </p>
                  )}
                  {partner.description && (
                    <p className="line-clamp-2 text-xs leading-relaxed font-medium text-slate-400">
                      {partner.description}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
