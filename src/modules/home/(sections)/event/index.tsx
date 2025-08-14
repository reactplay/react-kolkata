import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

export default function EventsSection() {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Upcoming Events
            </h2>
            <p className="mt-2 text-slate-300">
              Join our next meetup or workshop. Learn, network, and build.
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <article
              key={e.id}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={e.image ?? "/images/tech-events-1.jpg"}
                  alt={e.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />
              </div>
              <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-sky-200">{e.title}</h3>
                <div className="mt-2 grid gap-1 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-sky-300" aria-hidden />
                    <span>{e.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-sky-300" aria-hidden />
                    <span>{e.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-300" aria-hidden />
                    <span className="line-clamp-1">{e.venue}</span>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-300">{e.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
                  >
                    <Link href={e.registrationUrl} target="_blank" rel="noreferrer">
                      Register
                    </Link>
                  </Button>
                  <Link
                    href="/events"
                    className="text-xs text-slate-300 underline-offset-4 hover:text-slate-100 hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
