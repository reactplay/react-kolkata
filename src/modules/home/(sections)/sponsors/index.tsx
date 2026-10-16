"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getSponsors } from "@/queries/sponsors";
import type { GroupedSponsors, Sponsor } from "@/queries/sponsors";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

function SponsorLogos({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      {sponsors.map((sponsor) => {
        const logo = (
          <span className="relative block h-10 w-48 sm:h-12 sm:w-60">
            <Image
              src={sponsor.imageSrc}
              alt={`${sponsor.name} logo`}
              fill
              sizes="240px"
              className="object-contain"
            />
          </span>
        );

        return sponsor.websiteUrl ? (
          <a
            key={sponsor.name}
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${sponsor.name}`}
            title={sponsor.name}
          >
            {logo}
          </a>
        ) : (
          <span key={sponsor.name} title={sponsor.name}>
            {logo}
          </span>
        );
      })}
    </div>
  );
}

const SponsorsSection = () => {
  const t = useTranslations("Sponsors");
  const [groups, setGroups] = useState<GroupedSponsors>({ current: [], previous: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getSponsors()
      .then((data) => {
        if (isMounted) setGroups(data);
      })
      .catch(() => {
        if (isMounted) setGroups({ current: [], previous: [] });
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasCurrent = groups.current.length > 0;
  const hasPrevious = groups.previous.length > 0;
  const hasAny = hasCurrent || hasPrevious;

  return (
    <AnimatedSection id="sponsors" className="relative scroll-mt-24 bg-[#0B1220]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">Sponsors</p>
          <h2 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
            Powered by <em className="text-sky-400 italic">generous</em> sponsors
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400 sm:text-xl">
            {t("description")}
          </p>
        </div>

        {isLoading ? (
          <div
            aria-busy="true"
            aria-label="Loading sponsors"
            className="mt-14 flex min-h-[120px] items-center justify-center"
          >
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
          </div>
        ) : hasAny ? (
          <>
            {hasCurrent && (
              <div className="mt-14 flex flex-col items-center gap-8">
                <p className="text-[11px] font-semibold tracking-[0.35em] text-slate-500 uppercase">
                  {t("current_label")}
                </p>
                <SponsorLogos sponsors={groups.current} />
              </div>
            )}

            {hasPrevious && (
              <div className="mt-14 flex flex-col items-center gap-8">
                <p className="text-[11px] font-semibold tracking-[0.35em] text-slate-500 uppercase">
                  {t("previous_label")}
                </p>
                <SponsorLogos sponsors={groups.previous} />
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto mt-14 flex min-h-[160px] max-w-4xl items-center justify-center border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <p className="text-lg font-medium text-slate-400">{t("empty")}</p>
          </div>
        )}

        <div className="mx-auto mt-12 h-px max-w-4xl bg-white/10" />
      </div>
    </AnimatedSection>
  );
};

export default SponsorsSection;
