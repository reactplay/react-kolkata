"use client";

import Image from "next/image";
import NextLink from "next/link";
import { trackGAEvent } from "@/utils/analytics";
import { Github, Linkedin, Mail, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiDiscord } from "react-icons/si";

import { Link } from "@/config/i18n/navigation";

import { XLogo } from "../icons/XLogo";

const Footer = () => {
  const t = useTranslations("Footer");

  const quickLinks = [
    {
      href: "https://lu.ma/reactkolkata",
      label: t("quick_links.events"),
      external: true,
    },
    {
      href: "/contributors",
      label: t("quick_links.contributors"),
      external: false,
    },
    {
      href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs",
      label: t("quick_links.join_us"),
      external: true,
    },
  ];

  const handleSocialClick = (platform: string) => {
    trackGAEvent("social_icon_click", {
      category: "Social",
      label: `Footer ${platform} Click`,
    });
  };

  return (
    <footer className="border-t border-white/5 bg-[#0B1220]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 md:items-start lg:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-1" aria-label="React Kolkata Home">
            <div className="relative h-25 w-25">
              <Image
                alt="react kolkata brand logo"
                src="/logo.svg"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <p className="text-sm text-slate-400">{t("description")}</p>
        </div>

        <nav aria-label="Quick links" className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-200">{t("quick_links_title")}</h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <NextLink
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-slate-200"
                  >
                    {l.label}
                  </NextLink>
                ) : (
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-slate-200">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-200">{t("contact_title")}</h3>
          <ul className="mt-3 space-y-4 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden />{" "}
              <a href="mailto:reactkolkata@gmail.com" className="hover:text-slate-200">
                reactkolkata@gmail.com
              </a>
            </li>
            <li className="mt-4 flex items-center gap-4">
              <a
                className="hover:text-white"
                aria-label={t("aria_labels.x")}
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("X")}
              >
                <XLogo className="h-5 w-5 text-slate-400 hover:text-white" />
              </a>
              <a
                className="hover:text-white"
                aria-label={t("aria_labels.github")}
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("GitHub")}
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                className="hover:text-white"
                aria-label={t("aria_labels.linkedin")}
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("LinkedIn")}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                className="hover:text-white"
                aria-label={t("aria_labels.youtube")}
                href="https://www.youtube.com/@ReactPlayIO"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("YouTube")}
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                className="hover:text-white"
                aria-label={t("aria_labels.discord")}
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("Discord")}
              >
                <SiDiscord className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-6 text-center text-slate-500 sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {t("rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
