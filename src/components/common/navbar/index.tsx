"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link"; // Use NextLink for external links
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

import { Link, usePathname } from "@/config/i18n/navigation"; // Use localized navigation for internal page routes
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/custom/language-switcher";

import { XLogo } from "../icons/XLogo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  const handleCoreTeamClick = () => {
    if (pathname === "/") {
      const el = document.getElementById("core-team");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${locale}/#core-team`);
    }
  };

  const links = [
    { href: "/", label: t("home"), external: false, isHashLink: false },
    { href: "/#core-team", label: t("core_team"), external: false, isHashLink: true },
    { href: "/contributors", label: t("contributors"), external: false, isHashLink: false },
    { href: "/events", label: t("events"), external: false, isHashLink: false },
  ];

  useEffect(() => {
    const getScrollY = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    const onScroll = () => setScrolled(getScrollY() > 8);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => document.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);

      const firstFocusable = mobileMenuRef.current?.querySelector(
        "a, button"
      ) as HTMLElement | null;

      firstFocusable?.focus();
    } else {
      toggleButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-white/10 bg-[#0B1220]/75 shadow-lg backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
      role="banner"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 max-sm:pr-4 max-sm:pl-0 sm:h-24 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="React Kolkata Home">
          <div className="relative h-40 w-58 max-sm:h-40 max-sm:w-48">
            <Image
              alt="react kolkata brand logo"
              src="/images/React-Kolkata-Logo-new.png"
              fill
              sizes="(max-width: 640px) 200px, 256px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const checkPath = l.isHashLink ? l.href.split("#")[0] : l.href;
              const active =
                checkPath === "/" ? pathname === checkPath : pathname.startsWith(checkPath);
              const LinkComponent = l.external || l.isHashLink ? NextLink : Link;

              return (
                <li key={l.href}>
                  {l.isHashLink ? (
                    <button
                      onClick={handleCoreTeamClick}
                      className={cn(
                        "cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none",
                        "text-slate-300 hover:text-white"
                      )}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <LinkComponent
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-sky-300" : "text-slate-300 hover:text-white"
                      )}
                    >
                      {l.label}
                    </LinkComponent>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions / Socials */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-2">
            {[
              { icon: XLogo, href: "https://x.com/reactkolkata", label: t("x") },
              {
                icon: Github,
                href: "https://github.com/reactplay/react-kolkata",
                label: t("github"),
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/showcase/react-kolkata",
                label: t("linkedin"),
              },
              {
                icon: FaWhatsapp,
                href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs",
                label: t("whatsapp"),
              },
            ].map((social, i) => (
              <li key={i}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-2 text-slate-400 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          {/* <Button
            asChild
            size="sm"
            className="rounded-full bg-indigo-600 hover:bg-indigo-500"
            onClick={handleJoinClick}
          >
            <NextLink href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs" target="_blank">
              {t("join_community")}
            </NextLink>
          </Button> */}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            ref={toggleButtonRef}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="mr-2 hidden sm:inline">{open ? "Close" : "Menu"}</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Full Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 right-4 left-4 z-50 rounded-3xl border border-white/10 bg-[#0B1220]/95 p-8 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              <ul className="grid gap-4">
                {links.map((l) => {
                  const LinkComponent = l.external || l.isHashLink ? NextLink : Link;

                  return (
                    <li key={l.href}>
                      {l.isHashLink ? (
                        <button
                          onClick={() => {
                            handleCoreTeamClick();
                            setOpen(false);
                          }}
                          className="text-left text-2xl font-bold text-white transition-colors hover:text-sky-400"
                        >
                          {l.label}
                        </button>
                      ) : (
                        <LinkComponent
                          href={l.href}
                          target={l.external ? "_blank" : undefined}
                          rel={l.external ? "noopener noreferrer" : undefined}
                          onClick={() => setOpen(false)}
                          className="block text-2xl font-bold text-white transition-colors hover:text-sky-400"
                        >
                          {l.label}
                        </LinkComponent>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="my-4 h-px w-full bg-white/10" />
              <div className="flex flex-col gap-6">
                <Button
                  asChild
                  className="h-14 w-full rounded-2xl bg-indigo-600 text-lg text-white"
                  onClick={() => setOpen(false)}
                >
                  <NextLink href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs" target="_blank">
                    {t("join_community")}
                  </NextLink>
                </Button>
                <div className="flex justify-center gap-8">
                  <a
                    href="https://x.com/reactkolkata"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <XLogo className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/reactplay/react-kolkata"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/showcase/react-kolkata"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
