"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Linkedin,
  MapPin,
  Menu,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

function CountUp({ to, from = 0, duration = 2, suffix = "", className }: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(from);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.4, once: true });

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const diff = to - from;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setValue(Math.round(from + diff * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, prefersReducedMotion, to, from, duration]);

  return (
    <div ref={containerRef}>
      <span className={className}>{value.toLocaleString()}</span>
      {suffix ? <span className="ml-1">{suffix}</span> : null}
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1, 0.21, 1], delay } },
  viewport: { once: true, amount: 0.3 },
});

export default function ReactKolkataNewDesign() {
  const events = [
    {
      id: "evt-2",
      title: "CTRL + React: Join the React Kolkata Chapter by ReactPlay",
      date: "Aug 30, 2025",
      location: "Virtual",
      description:
        "​In this event, our speakers will share insights on topics like React, AI, and other emerging tech. Expect practical takeaways, real-world examples, and fresh perspectives from folks working hands-on in the field.",
      link: "https://lu.ma/ze3qavyg",
      image: "/react-kolkata-meetup.png",
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] bg-[radial-gradient(1200px_800px_at_-20%_-10%,#0ea5e933,transparent),radial-gradient(1000px_700px_at_120%_-20%,#0A66C233,transparent),linear-gradient(to_bottom,#020617,black)] text-white">
      <a
        href="#main"
        className="sr-only rounded bg-white px-3 py-2 text-black focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>

      {/* Header - clean, glass, mobile-ready */}
      <header className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex h-14 w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 shadow-lg shadow-black/20 backdrop-blur-xl">
            <Link href="#" className="flex items-center gap-2 pl-1">
              <Image
                src="/images/react-kolkata-logo.png"
                alt="React Kolkata logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-sm font-semibold tracking-wide">React Kolkata</span>
              <span className="sr-only">Home</span>
            </Link>

            <nav className="ml-auto hidden items-center gap-6 md:flex">
              <Link href="#about" className="text-sm text-white/80 hover:text-white">
                About
              </Link>
              <Link href="#events" className="text-sm text-white/80 hover:text-white">
                Events
              </Link>
              <Link href="#projects" className="text-sm text-white/80 hover:text-white">
                Projects
              </Link>
              <Link href="#join" className="text-sm text-white/80 hover:text-white">
                Join
              </Link>
              <Button
                asChild
                className="bg-[#61DAFB] font-semibold text-black hover:bg-[#61DAFB]/90"
              >
                <Link href="https://lu.ma/reactkolkata" target="_blank" rel="noopener noreferrer">
                  Lu.ma
                </Link>
              </Button>
              <Button asChild className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                <Link
                  href="https://www.linkedin.com/showcase/react-kolkata/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </Link>
              </Button>
            </nav>

            <div className="ml-auto md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="text-white/90"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[320px] border-white/10 bg-slate-950/70 backdrop-blur-xl"
                >
                  <div className="space-y-6 pt-6">
                    <Link href="#about" className="block text-white/90 hover:text-white">
                      About
                    </Link>
                    <Link href="#events" className="block text-white/90 hover:text-white">
                      Events
                    </Link>
                    <Link href="#projects" className="block text-white/90 hover:text-white">
                      Projects
                    </Link>
                    <Link href="#join" className="block text-white/90 hover:text-white">
                      Join
                    </Link>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      <Button
                        asChild
                        className="bg-[#61DAFB] font-semibold text-black hover:bg-[#61DAFB]/90"
                      >
                        <Link
                          href="https://lu.ma/reactkolkata"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Subscribe on Lu.ma
                        </Link>
                      </Button>
                      <Button asChild className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                        <Link
                          href="https://www.linkedin.com/showcase/react-kolkata/posts/?feedView=all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          Follow on LinkedIn
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="relative">
          {/* subtle grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
          />
          {/* orbs */}
          <motion.div
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at 30% 30%, #61DAFB66, transparent 60%)" }}
            animate={{ x: [0, 18, -12, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at 70% 70%, #0A66C266, transparent 60%)" }}
            animate={{ x: [0, -16, 8, 0], y: [0, 12, -12, 0] }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 pt-14 pb-20 sm:pt-20 sm:pb-28">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div {...fadeUp(0)}>
                <Badge className="border border-white/10 bg-white/10">React • Kolkata</Badge>
              </motion.div>
              <motion.h1
                className="mt-5 text-4xl leading-tight font-extrabold sm:text-6xl"
                {...fadeUp(0.05)}
              >
                The place to
                <span className="mx-2 inline-block bg-gradient-to-r from-[#61DAFB] via-white to-[#0A66C2] bg-clip-text text-transparent">
                  build, learn, and ship
                </span>
                React.
              </motion.h1>
              <motion.p className="mx-auto mt-5 max-w-2xl text-white/80" {...fadeUp(0.1)}>
                A community by ReactPlay for developers in and around Kolkata. Meet peers, build
                Plays, get feedback, and grow your skills together.
              </motion.p>
              <motion.div
                className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"
                {...fadeUp(0.15)}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#61DAFB] font-semibold text-black hover:bg-[#61DAFB]/90"
                >
                  <Link href="https://lu.ma/reactkolkata" target="_blank" rel="noopener noreferrer">
                    Subscribe on Lu.ma
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                  <Link
                    href="https://www.linkedin.com/showcase/react-kolkata/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                    Follow on LinkedIn
                  </Link>
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="mt-10 flex flex-col items-center justify-center gap-6 text-sm sm:flex-row"
                {...fadeUp(0.2)}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Users className="h-4 w-4 text-[#61DAFB]" />
                  <CountUp to={100} suffix="+" className="font-semibold tabular-nums" /> members
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Calendar className="h-4 w-4 text-[#61DAFB]" />
                  <CountUp to={12} className="font-semibold tabular-nums" /> events / yr
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Sparkles className="h-4 w-4 text-[#61DAFB]" />
                  Learn by building
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About/Features */}
        <section id="about" className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Meetups & Talks",
                  desc: "IRL and online sessions with local speakers and hands‑on demos.",
                },
                {
                  title: "Build Plays",
                  desc: "Practice React with ReactPlay’s structured mini‑projects.",
                },
                {
                  title: "Collaborate",
                  desc: "Pair up, share feedback, and grow faster with peers.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <Card className="border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:bg-white/7">
                    <CardHeader>
                      <CardTitle className="text-white">{f.title}</CardTitle>
                      <CardDescription className="text-white/70">{f.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Events – horizontal scroll with snap */}
        <section id="events" className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">Upcoming Events</h2>
                <p className="text-sm text-white/70">Discover what’s next and RSVP on Lu.ma</p>
              </div>
              <div className="hidden gap-2 sm:flex">
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white"
                  onClick={() => scrollBy(-360)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white"
                  onClick={() => scrollBy(360)}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollBehavior: "smooth" }}
            >
              {/* hide scrollbar */}
              <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>

              {events.map((e, idx) => (
                <motion.div
                  key={e.id}
                  className="max-w-[360px] min-w-[320px] snap-start"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                >
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:bg-white/7">
                    <CardHeader className="p-0">
                      <Image
                        src={e.image || "/placeholder.svg"}
                        alt={`${e.title} thumbnail`}
                        height={200}
                        width={360}
                        className="rounded-t-xl border-b border-white/10 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-center gap-2 text-sm text-[#61DAFB]">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>{e.date}</span>
                      </div>
                      <CardTitle className="text-lg text-white">{e.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span>{e.location}</span>
                      </div>
                      <p className="text-sm text-white/80">{e.description}</p>
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                      >
                        <Link href={e.link} target="_blank" rel="noopener noreferrer">
                          RSVP on Lu.ma
                          <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects – Coming Soon with shimmer tiles */}
        <section id="projects" className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">Community Projects (Plays)</h2>
              <p className="text-sm text-white/70">
                We’re curating Plays from React Kolkata members — launching soon.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative h-40 overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
                  <div className="absolute inset-0 animate-pulse bg-white/[0.03]" />
                  <div className="absolute inset-x-0 h-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Want to be featured?</CardTitle>
                  <CardDescription className="text-white/70">
                    Start a Play on ReactPlay and share it with the community.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="bg-[#61DAFB] font-semibold text-black hover:bg-[#61DAFB]/90"
                  >
                    <Link href="https://reactplay.io/" target="_blank" rel="noopener noreferrer">
                      Build a Play
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="join" className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg shadow-black/20 backdrop-blur-xl sm:p-10">
              <h2 className="text-2xl font-semibold sm:text-3xl">Join React Kolkata</h2>
              <p className="mt-3 text-white/80">
                Subscribe on Lu.ma for invites and updates. Follow our LinkedIn Showcase for
                highlights and recaps.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#61DAFB] font-semibold text-black hover:bg-[#61DAFB]/90"
                >
                  <Link href="https://lu.ma/reactkolkata" target="_blank" rel="noopener noreferrer">
                    Subscribe on Lu.ma
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                  <Link
                    href="https://www.linkedin.com/showcase/react-kolkata/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                    Follow on LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-white/80">
            <Image
              src="/images/react-kolkata-logo.png"
              alt="React Kolkata logo small"
              width={18}
              height={18}
              className="rounded-sm"
            />
            <span className="text-sm">{new Date().getFullYear()} React Kolkata</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="#about">About</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#61DAFB] text-black hover:bg-[#61DAFB]/90">
              <Link href="https://lu.ma/reactkolkata" target="_blank" rel="noopener noreferrer">
                Lu.ma
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
              <Link
                href="https://www.linkedin.com/showcase/react-kolkata/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
