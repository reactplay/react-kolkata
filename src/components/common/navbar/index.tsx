"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link"; // Use NextLink for external links
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        "fixed top-0 z-50 flex w-full justify-center px-4 transition-all duration-300",
        scrolled ? "pt-6" : "pt-0"
      )}
      role="banner"
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between transition-all duration-500",
          scrolled
            ? "max-w-2xl rounded-full border border-white/10 bg-[#0B1220]/80 px-6 py-2 shadow-2xl backdrop-blur-xl"
            : "h-20 max-w-7xl bg-transparent px-4 sm:h-24 sm:px-6 lg:px-8"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="React Kolkata Home">
          <div
            className={cn(
              "relative transition-all duration-500",
              scrolled ? "h-10 w-28" : "h-16 w-48 sm:h-38 sm:w-56"
            )}
          >
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

        {/* Desktop Navigation Links (Hidden in Pill) */}
        <nav
          className={cn(
            "hidden items-center overflow-hidden transition-all duration-300 lg:flex",
            scrolled ? "pointer-events-none w-0 opacity-0" : "w-auto opacity-100"
          )}
          aria-label="Primary"
        >
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

        {/* Desktop Actions / Socials (Hidden in Pill) */}
        <div
          className={cn(
            "hidden items-center gap-6 overflow-hidden transition-all duration-300 lg:flex",
            scrolled ? "pointer-events-none w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
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

        {/* Menu Button (Always visible in Pill, only mobile in full) */}
        <div className="flex items-center gap-4">
          <button
            ref={toggleButtonRef}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none",
              scrolled
                ? "border border-white/10 bg-white/10 text-white hover:bg-white/20"
                : "border border-white/5 bg-white/5 text-slate-200 lg:hidden"
            )}
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
                  className="h-14 w-full rounded-2xl bg-indigo-600 text-lg"
                  onClick={() => setOpen(false)}
                >
                  <NextLink href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs" target="_blank">
                    {t("join_community")}
                  </NextLink>
                </Button>
                <div className="flex justify-center gap-8">
                  <a href="https://x.com/reactkolkata" className="text-slate-400 hover:text-white">
                    <XLogo className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/reactplay/react-kolkata"
                    className="text-slate-400 hover:text-white"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/showcase/react-kolkata"
                    className="text-slate-400 hover:text-white"
                  >
                    <Linkedin className="h-6 w-6" />
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
