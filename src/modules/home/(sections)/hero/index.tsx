import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const t = useTranslations("Hero");

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
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_top,var(--hero-glow-color),transparent)] [--hero-glow-color:rgba(59,130,246,0.28)] dark:[--hero-glow-color:rgba(56,189,248,0.45)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay-from)] via-transparent to-[var(--hero-overlay-to)] [--hero-overlay-from:rgba(255,255,255,0.65)] [--hero-overlay-to:rgba(255,255,255,1)] dark:[--hero-overlay-from:rgba(11,18,32,0.6)] dark:[--hero-overlay-to:rgba(11,18,32,0.95)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-28 lg:flex lg:items-center lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="bg-foreground/5 text-foreground/80 mb-3 inline-flex rounded-full border border-amber-400/30 px-3 py-1 text-xs transition-colors dark:border-amber-400/50">
            {t("badge")}
          </p>
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
            <span className="block bg-gradient-to-r from-[var(--hero-title-from)] via-[var(--hero-title-via)] to-[var(--hero-title-to)] bg-clip-text text-transparent transition-colors [--hero-title-from:rgba(56,189,248,0.85)] [--hero-title-to:rgba(56,189,248,0.85)] [--hero-title-via:rgba(37,99,235,1)] dark:[--hero-title-from:rgba(125,211,252,0.85)] dark:[--hero-title-to:rgba(125,211,252,0.85)] dark:[--hero-title-via:rgba(96,165,250,1)]">
              {t("subtitle")}
            </span>
          </h1>
          <p className="text-foreground/70 mt-6 max-w-2xl text-lg">{t("description")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-sky-900/30 transition hover:from-blue-500 hover:to-sky-400"
            >
              <Link target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                {t("join_community")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-foreground/5 text-foreground hover:bg-foreground/10 dark:bg-foreground/10 dark:hover:bg-foreground/20 transition-colors"
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
