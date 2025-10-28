"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link"; // Use NextLink for external and hash links
import { trackGAEvent } from "@/utils/analytics";
import { Github, Linkedin, Menu, X, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiDiscord } from "react-icons/si";

import { Link, usePathname } from "@/config/i18n/navigation"; // Use Link for internal page routes
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/custom/language-switcher";

import { XLogo } from "../icons/XLogo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const links = [
    { href: "/", label: t("home"), external: false, isHashLink: false },
    { href: "/#core-team", label: t("core_team"), external: false, isHashLink: true },
    { href: "/contributors", label: t("contributors"), external: false, isHashLink: false },
    { href: "/events", label: t("events"), external: false, isHashLink: false },
  ];

  const handleJoinClick = () => {
    trackGAEvent("join_community_click", {
      category: "CTA",
      label: "Navbar Join Button",
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled
          ? "border-b border-white/5 bg-[#0B1220]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B1220]/60"
          : ""
      )}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="React Kolkata Home">
          <div className="relative h-24 w-24">
            <Image
              alt="react kolkata brand logo"
              src="/logo.svg"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const checkPath = l.isHashLink ? l.href.split("#")[0] : l.href;
            const active =
              checkPath === "/" ? pathname === checkPath : pathname.startsWith(checkPath);
            // Use NextLink for external or hash links, use localized Link otherwise
            const LinkComponent = l.external || l.isHashLink ? NextLink : Link;

            return (
              <LinkComponent
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  // Style hash link normally, active style based on path match
                  l.isHashLink
                    ? "text-slate-300 hover:text-white"
                    : active
                      ? "text-sky-300"
                      : "text-slate-300 hover:text-white"
                )}
              >
                {l.label}
              </LinkComponent>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-4">
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label={t("x")}
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
              >
                <XLogo className="h-5 w-5 text-slate-400 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label={t("github")}
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label={t("linkedin")}
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label={t("youtube")}
                href="https://www.youtube.com/@ReactPlayIO"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label={t("discord")}
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                rel="noreferrer"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
            </li>
          </ul>
          <LanguageSwitcher />
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
              onClick={handleJoinClick}
            >
              <NextLink href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs" target="_blank">
                {t("join_community")}
              </NextLink>
            </Button>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="absolute right-0 w-1/2 border-t border-white/5 bg-[#0B1220] md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {links.map((l) => {
              const checkPath = l.isHashLink ? l.href.split("#")[0] : l.href;
              const active =
                checkPath === "/" ? pathname === checkPath : pathname.startsWith(checkPath);
              const LinkComponent = l.external || l.isHashLink ? NextLink : Link;

              return (
                <LinkComponent
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    l.isHashLink
                      ? "text-slate-300 hover:bg-white/5 hover:text-white"
                      : active
                        ? "bg-white/5 text-sky-300"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                </LinkComponent>
              );
            })}
            <Button
              asChild
              className="mt-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
              onClick={handleJoinClick}
            >
              <NextLink target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                {t("join_community")}
              </NextLink>
            </Button>

            <div className="flex justify-center py-2">
              <LanguageSwitcher />
            </div>

            <ul className="mt-2 flex flex-col gap-3">
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label={t("x")}
                  href="https://x.com/reactkolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <XLogo className="h-5 w-5" />
                    <span className="text-sm">{t("x")}</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label={t("github")}
                  href="https://github.com/reactplay/react-kolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    <span className="text-sm">{t("github")}</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label={t("linkedin")}
                  href="https://www.linkedin.com/showcase/react-kolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm">{t("linkedin")}</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label={t("youtube")}
                  href="https://www.youtube.com/@ReactPlayIO"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    <span className="text-sm">{t("youtube")}</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label={t("discord")}
                  href=" https://discord.gg/VRVfn2Vss"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <SiDiscord className="h-5 w-5" />
                    <span className="text-sm">{t("discord")}</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
