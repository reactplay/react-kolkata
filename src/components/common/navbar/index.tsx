"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Menu, Twitter, X, Youtube } from "lucide-react";
import { SiDiscord } from "react-icons/si";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/contributors", label: "Contributors" },
  { href: "https://lu.ma/reactkolkata", label: "Events" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  console.log("Render: Navbar");

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
            const active = l.href === "/" ? pathname === l.href : pathname.startsWith(l.href);
            const isExternal = l.href.startsWith("http");
            return (
              <Link
                key={l.href}
                href={l.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-sky-300" : "text-slate-300 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-4">
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label="Twitter"
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label="GitHub"
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label="LinkedIn"
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label="Youtube"
                href="https://www.youtube.com/@ReactPlayIO"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                className="text-slate-400 hover:text-white"
                aria-label="Discord"
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                rel="noreferrer"
              >
                <SiDiscord className="h-6 w-6" />
              </a>
            </li>
          </ul>
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
            >
              <Link href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                Join the Community
              </Link>
            </Button>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="absolute right-0 w-1/2 border-t border-white/5 bg-[#0B1220] md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === l.href : pathname.startsWith(l.href);
              const isExternal = l.href.startsWith("http");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/5 text-sky-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Button
              asChild
              className="mt-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
            >
              <Link target="_blank" href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs">
                Join the Community
              </Link>
            </Button>
            <ul className="mt-2 flex flex-col gap-3">
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label="Twitter"
                  href="https://x.com/reactkolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Twitter className="h-5 w-5" />
                    <span className="text-sm">Twitter</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label="GitHub"
                  href="https://github.com/reactplay/react-kolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    <span className="text-sm">GitHub</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/showcase/react-kolkata"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm">Linkedin</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label="Youtube"
                  href="https://www.youtube.com/@ReactPlayIO"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    <span className="text-sm">Youtube</span>
                  </div>
                </a>
              </li>
              <li className="px-2 py-2">
                <a
                  className="text-slate-300"
                  aria-label="Discord"
                  href=" https://discord.gg/VRVfn2Vss"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2">
                    <SiDiscord className="h-5 w-5" />
                    <span className="text-sm">Discord</span>
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
