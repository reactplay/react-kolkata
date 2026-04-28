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
    <footer className="border-t border-white/5 bg-[#0B1220] text-slate-400">
      {/* ===== MAIN GRID ===== */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="inline-flex self-start" aria-label="React Kolkata Home">
            <div className="relative h-20 w-[220px] overflow-hidden">
              <Image
                src="/images/React-Kolkata-Logo-new.png"
                alt="React Kolkata logo"
                fill
                sizes="220px"
                className="object-cover object-left"
                priority
              />
            </div>
          </Link>

          <div className="max-w-sm space-y-3 pl-4">
            <h3 className="text-sm font-semibold text-white">{t("about_project_title")}</h3>
            <p className="text-sm leading-relaxed">{t("about_project_description")}</p>
          </div>
        </div>

        <nav aria-label="Quick links" className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <h3 className="mb-4 text-sm font-semibold text-white">{t("quick_links_title")}</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <NextLink
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      {l.label}
                    </NextLink>
                  ) : (
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <h3 className="mb-4 text-sm font-semibold text-white">{t("contact_title")}</h3>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:reactkolkata@gmail.com" className="transition hover:text-white">
                reactkolkata@gmail.com
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <a
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("X")}
                className="text-slate-400 transition hover:text-white"
              >
                <XLogo className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("GitHub")}
                className="text-slate-400 transition hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("LinkedIn")}
                className="text-slate-400 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@ReactPlayIO"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("YouTube")}
                className="text-slate-400 transition hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>

              <a
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("Discord")}
                className="text-slate-400 transition hover:text-white"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/5 py-6 text-center text-xs">
        © {new Date().getFullYear()} {t("rights_reserved")}
      </div>
    </footer>
  );
};

export default Footer;
