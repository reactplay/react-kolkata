import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LuArrowLeft, LuCalendarDays } from "react-icons/lu";

import { Link } from "@/config/i18n/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const quickLinks = [
  { label: "Upcoming Events", href: "/#events" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Community Partners", href: "/#partners" },
  { label: "FAQ", href: "/#faq" },
];

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B1220]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/4 -right-20 h-96 w-96 bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 h-96 w-96 bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-36 pb-10 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg text-amber-200/90 italic sm:text-xl">
          {t("404")} · Lost in the crowd
        </p>

        <h1 className="font-display mx-auto mt-2 max-w-4xl text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-tight text-balance text-white">
          Wrong <em className="font-normal text-sky-400 italic">turn.</em>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-slate-300 sm:text-xl">
          {t("dosen't_exist_text")} The meetup is elsewhere. Let&apos;s get you back to the
          community.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            <LuArrowLeft className="h-4 w-4" aria-hidden />
            {t("go_to_home")}
          </Link>
          <Link
            href="/#events"
            className="inline-flex h-12 items-center justify-center gap-2 border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <LuCalendarDays className="h-4 w-4" aria-hidden />
            See Upcoming Events
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <nav
          aria-label="Quick links"
          className="grid grid-cols-2 divide-white/10 border border-white/10 bg-[#0B1220]/60 backdrop-blur-md sm:grid-cols-4 sm:divide-x"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-6 py-4 text-center text-xs font-medium tracking-[0.18em] text-slate-400 uppercase transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
