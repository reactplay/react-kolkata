import Image from "next/image";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

const SponsorsSection = () => {
  const t = useTranslations("Sponsors");

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

        <div className="mt-14 flex flex-col items-center gap-8">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-slate-500 uppercase">
            Previous Sponsors
          </p>
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
            <a
              href="https://miro.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Miro"
            >
              <span className="relative block h-10 w-48 sm:h-12 sm:w-60">
                <Image
                  src="/sponsors/miro.svg"
                  alt="Miro logo"
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </span>
            </a>
            <a
              href="https://www.mindwebs.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Mind Webs Ventures"
            >
              <span className="relative block h-9 w-44 sm:h-10 sm:w-52">
                <Image
                  src="/sponsors/mindwebs.svg"
                  alt="Mind Webs Ventures logo"
                  fill
                  sizes="208px"
                  className="object-contain"
                />
              </span>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 h-px max-w-4xl bg-white/10" />
      </div>
    </AnimatedSection>
  );
};

export default SponsorsSection;
