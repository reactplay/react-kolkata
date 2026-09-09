import { Metadata } from "next";
import Image from "next/image";
import { LuArrowDown, LuCheck, LuFileText, LuX } from "react-icons/lu";

import { getLocalizedPath } from "@/config/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pageTitle = "Media Kit";
  const pageDescription = "Official React Kolkata logos, typography, and usage guidelines.";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: getLocalizedPath("/media-kit", locale),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: getLocalizedPath("/media-kit", locale),
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

const logos = [
  {
    name: "Primary Logo",
    file: "/media-kit/react-kolkata-logo.svg",
    downloadName: "react-kolkata-logo.svg",
    format: "SVG",
    note: "Default use. Slides, docs, partner pages, print.",
    dark: true,
  },
  {
    name: "Logo on Dark",
    file: "/media-kit/react-kolkata-logo-light.png",
    downloadName: "react-kolkata-logo-light.png",
    format: "PNG",
    note: "For dark backgrounds.",
    dark: true,
  },
  {
    name: "Logo on Light",
    file: "/media-kit/react-kolkata-logo-dark.png",
    downloadName: "react-kolkata-logo-dark.png",
    format: "PNG",
    note: "For light backgrounds.",
    dark: false,
  },
  {
    name: "Full Lockup on Dark",
    file: "/media-kit/react-kolkata-logo-full-light.png",
    downloadName: "react-kolkata-logo-full-light.png",
    format: "PNG",
    note: "Mark plus wordmark, for dark backgrounds.",
    dark: true,
  },
  {
    name: "Full Lockup on Light",
    file: "/media-kit/react-kolkata-logo-full-dark.png",
    downloadName: "react-kolkata-logo-full-dark.png",
    format: "PNG",
    note: "Mark plus wordmark, for light backgrounds.",
    dark: false,
  },
  {
    name: "Social Profile",
    file: "/media-kit/react-kolkata-social-profile.png",
    downloadName: "react-kolkata-social-profile.png",
    format: "PNG",
    note: "Avatars and profile pictures only.",
    dark: true,
  },
];

const colours = [
  { name: "Midnight", hex: "#0B1220", use: "Backgrounds" },
  { name: "Sky", hex: "#38BDF8", use: "Accents and highlights" },
  { name: "White", hex: "#FFFFFF", use: "Text on dark surfaces" },
];

const dos = [
  "Give the logo clear space on all sides.",
  "Use the light logo on dark backgrounds and vice versa.",
  "Prefer the SVG file. It stays sharp at every size.",
];

const donts = [
  "Don't stretch, squash, or rotate the logo.",
  "Don't recolour it or add shadows and outlines.",
  "Don't place it on busy backgrounds where it is hard to read.",
];

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] pb-24">
      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 bg-sky-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
            Media <em className="text-sky-400 italic">Kit</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            Official logos and fonts for anyone featuring React Kolkata. Grab what you need below.
          </p>
          <div className="mt-8">
            <a
              href="/media-kit/react-kolkata-brand-guidelines.md"
              download="react-kolkata-brand-guidelines.md"
              className="inline-flex h-12 items-center justify-center gap-2 bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              <LuFileText className="h-4 w-4" aria-hidden />
              Download Brand Guidelines
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl">Logos</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
          Pick the version that fits your background. Every file downloads straight from this page.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <div key={logo.file} className="flex flex-col border border-white/10 bg-white/[0.02]">
              <div
                className={`flex h-48 items-center justify-center p-8 ${
                  logo.dark ? "bg-[#0B1220]" : "bg-slate-100"
                }`}
              >
                <span className="relative block h-full w-full">
                  <Image
                    src={logo.file}
                    alt={`React Kolkata ${logo.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain"
                  />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{logo.name}</h3>
                  <span className="border border-white/10 px-2 py-0.5 text-xs font-medium text-slate-400">
                    {logo.format}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{logo.note}</p>
                <a
                  href={logo.file}
                  download={logo.downloadName}
                  className="mt-4 inline-flex h-10 items-center justify-center gap-2 bg-white text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
                >
                  <LuArrowDown className="h-4 w-4" aria-hidden />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl">
          Brand Colours
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {colours.map((colour) => (
            <div key={colour.hex} className="border border-white/10 bg-white/[0.02]">
              <div className="h-24 w-full" style={{ backgroundColor: colour.hex }} />
              <div className="p-4">
                <p className="font-medium text-white">{colour.name}</p>
                <p className="mt-1 text-sm text-slate-400">{colour.hex}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{colour.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl">Typography</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="font-display text-4xl text-white italic">Instrument Serif</p>
            <p className="mt-3 text-sm text-slate-400">
              Display and headlines. Italic for emphasis.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="text-4xl font-medium text-white">Inter</p>
            <p className="mt-3 text-sm text-slate-400">Body text and user interface.</p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <p className="font-mono text-4xl text-white">Geist Mono</p>
            <p className="mt-3 text-sm text-slate-400">Code and small technical details.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl">
          Using the Logo
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-medium text-white">Please do</h3>
            <ul className="mt-4 space-y-3">
              {dos.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                  <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-medium text-white">Please don&apos;t</h3>
            <ul className="mt-4 space-y-3">
              {donts.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                  <LuX className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
