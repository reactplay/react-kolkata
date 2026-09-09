"use client";

import Image from "next/image";

type Partner = {
  name: string;
  imageSrc?: string;
};

const partners: Partner[] = [
  {
    name: "ReactPlay",
    imageSrc: "/partners/reactplay.png",
  },
  {
    name: "Digital Dominators",
    imageSrc: "/partners/Digital-Dominators-logo-official.webp",
  },
  {
    name: "React Nexus",
    imageSrc: "/partners/react-nexus.webp",
  },
  {
    name: "OpenSourceCon INDIA",
    imageSrc: "/partners/OSS_India.jpeg",
  },
  {
    name: "GDGoC MCKVIE",
    imageSrc: "/partners/gdgmckv.png",
  },
  {
    name: "INNOVATEX",
    imageSrc: "/partners/InnovateX Engineers Community.png",
  },
  {
    name: "DevPath",
    imageSrc: "/partners/devpath-new.jpg",
  },
  {
    name: "CodeRush X",
    imageSrc: "/partners/CodeRush X.png",
  },
  {
    name: "BUG BUSTERS",
    imageSrc: "/partners/BugBustersLogo.png",
  },
];

export default function CommunityPartners() {
  const hasPartners = partners.length > 0;

  return (
    <section id="partners" className="relative scroll-mt-24 overflow-hidden bg-[#0B1220] py-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-none bg-sky-500/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          Community partners
        </p>
        <h3 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
          Stronger, <em className="text-sky-400 italic">together</em>
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
          We collaborate with amazing tech communities to bring more value to you.
        </p>

        {hasPartners ? (
          <div className="marquee-paused mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee flex w-max items-center gap-3">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  title={partner.name}
                  aria-hidden={index >= partners.length || undefined}
                  className="flex shrink-0 flex-col items-center gap-2"
                >
                  {partner.imageSrc ? (
                    <span className="relative block h-12 w-52 sm:h-14 sm:w-64">
                      <Image
                        src={partner.imageSrc}
                        alt={partner.name}
                        fill
                        sizes="240px"
                        className="object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center bg-white/5 text-lg font-bold text-white/40 ring-1 ring-white/10">
                      {partner.name.charAt(0)}
                    </span>
                  )}
                  <span className="text-[11px] font-medium tracking-wide whitespace-nowrap text-slate-500">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-none border border-dashed border-white/10 bg-[#0B1220]/40 px-6 py-12 text-center">
            <p className="text-lg font-medium text-slate-400">
              Community partners will be updated soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
