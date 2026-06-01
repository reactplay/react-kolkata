"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { trackGAEvent } from "@/utils/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Github, Linkedin, Mail, Users, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiDiscord } from "react-icons/si";

import { Link } from "@/config/i18n/navigation";
import { cn } from "@/lib/utils";

import { XLogo } from "../icons/XLogo";

import "./footer.css";

import { FaWhatsapp } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("relative cursor-pointer overflow-hidden", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Community First</span> <span className="text-primary/60">✦</span>
    <span>Open Source</span> <span className="text-secondary/60">✦</span>
    <span>Tech Meetups</span> <span className="text-primary/60">✦</span>
    <span>Networking</span> <span className="text-secondary/60">✦</span>
    <span>Knowledge Sharing</span> <span className="text-primary/60">✦</span>
  </div>
);

export default function Footer() {
  const t = useTranslations("Footer");
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  const handleSocialClick = (platform: string) => {
    trackGAEvent("social_icon_click", {
      category: "Social",
      label: `Footer ${platform} Click`,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, wrapperRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={wrapperRef}
      className="text-foreground cinematic-footer-wrapper relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0B1220] pt-20"
    >
      <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

      <div
        ref={giantTextRef}
        className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap select-none"
      >
        REACT KOLKATA
      </div>

      <div className="border-border/50 bg-background/60 absolute top-12 left-0 z-10 w-full scale-110 -rotate-2 overflow-hidden border-y py-4 shadow-2xl backdrop-blur-md">
        <div className="animate-footer-scroll-marquee text-muted-foreground flex w-max text-xs font-bold tracking-[0.3em] uppercase md:text-sm">
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-32 mb-16 flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-6 md:px-12">
        <div className="mb-16 flex flex-col">
          <h2
            ref={headingRef}
            className="footer-text-glow text-left text-5xl font-black tracking-tighter md:text-8xl"
          >
            Get Involved
          </h2>
        </div>

        <div ref={linksRef} className="grid w-full grid-cols-1 gap-12 md:grid-cols-3 md:gap-24">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase">Connect</h3>
              <p className="text-sm text-slate-400">Join our real-time community spaces.</p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <MagneticButton
                as={NextLink}
                href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs"
                target="_blank"
                className="footer-glass-pill text-foreground group flex w-full items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 transition-colors group-hover:bg-green-500/20">
                  <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </div>
                Join WhatsApp
              </MagneticButton>
              <MagneticButton
                as={NextLink}
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                className="footer-glass-pill text-foreground group flex w-full items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
                  <SiDiscord className="h-4 w-4 text-indigo-400" />
                </div>
                Join Discord
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">
                Explore
              </h3>
              <p className="text-sm text-slate-400">Discover events and contributors.</p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <MagneticButton
                as={NextLink}
                href="https://lu.ma/reactkolkata"
                target="_blank"
                className="footer-glass-pill text-foreground group flex w-full items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                </div>
                <span>Upcoming Events</span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/contributors"
                className="footer-glass-pill text-foreground group flex w-full items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
                  <Users className="h-4 w-4 text-indigo-400" />
                </div>
                <span>Top Contributors</span>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
                Support
              </h3>
              <p className="text-sm text-slate-400">Get in touch with the core team.</p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <MagneticButton
                as="a"
                href="mailto:reactkolkata@gmail.com"
                className="footer-glass-pill text-foreground group flex w-full items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                  <Mail className="h-4 w-4 text-emerald-400" />
                </div>
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mb-[15vh] flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
        <div className="text-muted-foreground order-2 flex gap-4 text-[10px] font-semibold tracking-widest uppercase md:order-1 md:text-xs">
          © {new Date().getFullYear()} {t("rights_reserved")}
        </div>

        <div className="order-1 flex items-center gap-4 md:order-2">
          <a
            href="https://x.com/reactkolkata"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleSocialClick("X")}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <XLogo className="h-5 w-5" />
          </a>

          <a
            href="https://github.com/reactplay/react-kolkata"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleSocialClick("GitHub")}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/showcase/react-kolkata"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleSocialClick("LinkedIn")}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <a
            href="https://www.youtube.com/@ReactPlayIO"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleSocialClick("YouTube")}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleSocialClick("YouTube")}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
