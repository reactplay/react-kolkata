"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link"; // Use NextLink for external links
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { LuLinkedin, LuMenu, LuX } from "react-icons/lu";
import { SiGithub } from "react-icons/si";

import { Link, usePathname, useRouter } from "@/config/i18n/navigation"; // Use localized navigation for internal page routes
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/custom/language-switcher";

import { XLogo } from "../icons/XLogo";

type NavLink =
  | { href: string; label: string; isHashLink: false }
  | { href: string; hash: string; label: string; isHashLink: true };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const links: NavLink[] = [
    { href: "/", hash: "events", label: t("events"), isHashLink: true },
    { href: "/", hash: "sponsors", label: "Sponsors", isHashLink: true },
    { href: "/", hash: "faq", label: "FAQ", isHashLink: true },
  ];

  const handleHashClick = (hash: string) => {
    if (pathname === "/") {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${hash}`);
    }
  };

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
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:h-24 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="React Kolkata Home">
          <div
            className={cn(
              "relative transition-all duration-500",
              scrolled ? "h-8 w-8" : "h-12 w-12"
            )}
          >
            <Image
              alt="react kolkata brand logo"
              src="/images/React_Kolkata_Logo.svg"
              fill
              sizes="(max-width: 640px) 40px, 64px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display hidden flex-col leading-none min-[400px]:flex">
            <span className="text-[22px] tracking-tight text-white">React</span>
            <span className="text-[22px] tracking-tight text-sky-400 italic">Kolkata</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const key = l.isHashLink ? `${l.href}#${l.hash}` : l.href;
              const active =
                !l.isHashLink && (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href));

              return (
                <li key={key}>
                  {l.isHashLink ? (
                    <button
                      onClick={() => handleHashClick(l.hash)}
                      className={cn(
                        "cursor-pointer rounded-none px-3 py-2 text-sm font-medium transition-colors focus:outline-none",
                        "text-slate-300 hover:text-white"
                      )}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-none px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-sky-300" : "text-slate-300 hover:text-white"
                      )}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-2">
            {[
              { icon: XLogo, href: "https://x.com/reactkolkata", label: t("x") },
              {
                icon: SiGithub,
                href: "https://github.com/reactplay/react-kolkata",
                label: t("github"),
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/showcase/react-kolkata",
                label: t("linkedin"),
              },
              {
                icon: FaWhatsapp,
                href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs",
                label: t("whatsapp"),
              },
              {
                icon: FaInstagram,
                href: "https://www.instagram.com/reactkolkata",
                label: "Instagram",
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
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            ref={toggleButtonRef}
            className="inline-flex items-center justify-center rounded-none border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="mr-2 hidden sm:inline">{open ? "Close" : "Menu"}</span>
            {open ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 right-4 left-4 z-50 rounded-none border border-white/10 bg-[#0B1220]/95 p-8 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              <ul className="grid gap-4">
                {links.map((l) => {
                  const key = l.isHashLink ? `${l.href}#${l.hash}` : l.href;
                  return (
                    <li key={key}>
                      {l.isHashLink ? (
                        <button
                          onClick={() => {
                            handleHashClick(l.hash);
                            setOpen(false);
                          }}
                          className="text-left text-2xl font-bold text-white transition-colors hover:text-sky-400"
                        >
                          {l.label}
                        </button>
                      ) : (
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block text-2xl font-bold text-white transition-colors hover:text-sky-400"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="my-4 h-px w-full bg-white/10" />
              <div className="flex flex-col gap-6">
                <Button
                  asChild
                  className="h-14 w-full rounded-none bg-indigo-600 text-lg text-white"
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
                    <SiGithub className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/showcase/react-kolkata"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LuLinkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/reactkolkata"
                    className="text-slate-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="h-6 w-6" />
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
