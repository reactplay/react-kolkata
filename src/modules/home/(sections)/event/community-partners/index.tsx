"use client";

import Image from "next/image";

import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

type Partner = {
  name: string;
  url: string;
  handle?: string;
  imageSrc?: string;
  description?: string;
};

const partners: Partner[] = [];

/*
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
    imageSrc: "/partners/Digital-Dominators-logo-official.webp",
    description: "Digital innovation and technology community",
  },
  {
    name: "React Nexus",
    url: "https://www.linkedin.com/search/results/companies/?keywords=React%20Nexus",
    handle: "@reactnexus",
    imageSrc: "/partners/react-nexus.webp",
    description: "React-focused developer community",
  },
  {
    name: "OpenSourceCon INDIA",
    url: "https://github.com/OpenSourceCon",
    handle: "@opensourcecon",
    imageSrc: "/partners/OSS_India.jpeg",
    description: "Open-source conference and community network",
  },
  {
    name: "GDGoC MCKVIE",
    url: "https://github.com/gdgocmckvie",
    handle: "@gdgocmckvie",
    imageSrc: "/partners/gdgmckv.png",
    description: "Google Developer Groups on Campus at MCKVIE",
  },
  {
    name: "INNOVATEX",
    url: "https://github.com/InnovaTex",
    handle: "@innovatex",
    imageSrc: "/partners/InnovateX Engineers Community.png",
    description: "Innovation-driven student tech community",
  },
  {
    name: "DevPath",
    url: "https://github.com/devpathindcommunity-india",
    handle: "@devpath",
    imageSrc: "/partners/devpath-new.jpg",
    description: "Developer growth and learning community",
  },
  {
    name: "CodeRush X",
    url: "https://github.com/coderushx",
    handle: "@coderushx",
    imageSrc: "/partners/CodeRush X.png",
    description: "Coding events and challenge-based community",
  },
  {
    name: "BUG BUSTERS",
    url: "https://github.com/wearebugbusters",
    handle: "@bugbusters",
    imageSrc: "/partners/BugBustersLogo.png",
    description: "Bug-hunting and engineering collaboration community",
  },
  {
    name: "MIRO MEETUPS",
    url: "https://www.linkedin.com/search/results/companies/?keywords=MIRO%20MEETUPS",
    handle: "@miromeetups",
    imageSrc: "/partners/mmkolkata logo.png",
    description: "Meetups and community collaboration network",
  },
*/

export default function CommunityPartners() {
  const hasPartners = partners.length > 0;

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

        {hasPartners ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0B1220]/50 backdrop-blur-md transition-all hover:bg-white/5"
              >
                <ArchitecturalCorner />

                <div className="relative flex h-40 w-full shrink-0 items-center justify-center p-8">
                  {partner.imageSrc ? (
                    <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={partner.imageSrc}
                        alt={partner.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 text-4xl font-bold text-white/20 ring-1 ring-white/10 transition-transform duration-700 group-hover:scale-105 group-hover:bg-white/10 group-hover:text-white/40">
                      {partner.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="relative flex flex-1 flex-col justify-between p-6 text-center">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold tracking-tight text-white transition-colors">
                        {partner.name}
                      </h4>
                      {partner.handle && (
                        <p className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase transition-colors group-hover:text-slate-400">
                          {partner.handle}
                        </p>
                      )}
                    </div>
                    {partner.description && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0B1220]/40 px-6 py-12 text-center">
            <p className="text-lg font-medium text-slate-400">
              Community partners will be updated soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
