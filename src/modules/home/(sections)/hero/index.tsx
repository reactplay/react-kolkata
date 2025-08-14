import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/kolkata_image.jpg"
          alt="Abstract dark tech background with blue glow"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_top,rgba(37,99,235,0.35),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 via-transparent to-[#0B1220]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-28 lg:flex lg:items-center lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-white/5 px-3 py-1 text-xs text-amber-400">
            Community • Events • Learning
          </p>
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            React Kolkata
            <span className="block bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">
              Build. Learn. Connect.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A modern hub for React developers in Kolkata. Join our meetups, talks, and workshops to
            grow your skills and network with the community.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-sky-900/30 transition hover:from-blue-500 hover:to-sky-400"
            >
              <Link href="/join-us">Join the Community</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
            >
              <Link href="/events">See Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
