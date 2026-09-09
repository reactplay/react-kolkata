"use client";

import Image from "next/image";
import NextLink from "next/link";
import { trackGAEvent } from "@/utils/analytics";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LuArrowUpRight, LuLinkedin, LuMail } from "react-icons/lu";
import { SiGithub, SiYoutube } from "react-icons/si";

import { Link } from "@/config/i18n/navigation";

import { XLogo } from "../icons/XLogo";

const communityLinks = [
  { label: "Events", href: "/#events" as const, internal: false },
  { label: "Sponsors", href: "/#sponsors" as const, internal: false },
  { label: "Partners", href: "/#partners" as const, internal: false },
];

const resourceLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
  {
    label: "Media Kit",
    href: "/media-kit",
  },
];

const socials = [
  { icon: XLogo, href: "https://x.com/reactkolkata", label: "X (Twitter)" },
  { icon: SiGithub, href: "https://github.com/reactplay/react-kolkata", label: "GitHub" },
  {
    icon: LuLinkedin,
    href: "https://www.linkedin.com/showcase/react-kolkata",
    label: "LinkedIn",
  },
  { icon: SiYoutube, href: "https://www.youtube.com/@Reactkolkata", label: "YouTube" },
  {
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs",
    label: "WhatsApp",
  },
  { icon: FaInstagram, href: "https://www.instagram.com/reactkolkata", label: "Instagram" },
];

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    trackGAEvent("social_icon_click", {
      category: "Social",
      label: `Footer ${platform} Click`,
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1220]">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl tracking-tight text-balance text-white sm:text-3xl">
              Want to <em className="text-sky-400 italic">sponsor</em>, collaborate, or partner with
              us?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              If you wanna sponsor an event, collab with us, join as a community partner, or
              anything of that kind, write to us here:
              <a
                href="mailto:reactkolkata@gmail.com?subject=Collaboration%20with%20React%20Kolkata"
                className="mt-1 block text-[15px] font-medium text-slate-200 transition-colors hover:text-white sm:text-base"
              >
                reactkolkata@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="React Kolkata Home">
            <span className="relative h-11 w-11">
              <Image
                alt="React Kolkata brand logo"
                src="/images/React_Kolkata_Logo.svg"
                fill
                sizes="44px"
                className="object-contain"
              />
            </span>
            <span className="font-display flex flex-col leading-none">
              <span className="text-2xl tracking-tight text-white">React</span>
              <span className="text-2xl tracking-tight text-sky-400 italic">Kolkata</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            A community-driven hub for React developers in Kolkata meetups, talks, and workshops for
            every level.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                onClick={() => handleSocialClick(s.label)}
                className="rounded-none p-2.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <s.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Community">
          <h3 className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase">
            Community
          </h3>
          <ul className="mt-5 space-y-3">
            {communityLinks.map((l) =>
              l.internal ? (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-slate-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ) : (
                <li key={l.label}>
                  <NextLink
                    href={l.href}
                    className="text-[15px] text-slate-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </NextLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <nav aria-label="Resources">
          <h3 className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase">
            Resources
          </h3>
          <ul className="mt-5 space-y-3">
            {resourceLinks.map((l) => (
              <li key={l.label}>
                <NextLink
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-1 text-[15px] text-slate-300 transition-colors hover:text-white"
                >
                  {l.label}
                  {l.href.startsWith("http") || l.href.startsWith("mailto") ? (
                    <LuArrowUpRight
                      className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-sky-300"
                      aria-hidden="true"
                    />
                  ) : null}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-slate-300">
            <li>
              <a
                href="mailto:reactkolkata@gmail.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <LuMail className="h-4 w-4 text-sky-400" aria-hidden="true" />
                reactkolkata@gmail.com
              </a>
            </li>
            <li className="text-sm leading-relaxed text-slate-500">Kolkata, West Bengal, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs tracking-wider text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} React Kolkata. All rights reserved.</p>
          <p className="normal-case">
            Built with <span className="text-slate-300">❤️</span> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
