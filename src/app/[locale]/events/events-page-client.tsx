"use client";

import CfpCard from "@/modules/home/(sections)/event/cfp-card";
import ChampionCard from "@/modules/home/(sections)/event/champion-card";
import EventCard from "@/modules/home/(sections)/event/event-card";
import EventCardCompact from "@/modules/home/(sections)/event/event-card-compact";
import LumaEmbed from "@/modules/home/(sections)/event/luma-embed";
import { Event, EVENT_STATUS } from "@/types/event";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuCalendar } from "react-icons/lu";

import { getEventStatus } from "@/lib/calendar-utils";
import { FEATURED_LUMA_EVENT_ID } from "@/base/constants/event";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

interface EventsPageClientProps {
  events: Event[];
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  const t = useTranslations("Events");

  const upcomingEvents = events.filter((event) => {
    const status = getEventStatus(event.startDateTime, event.endDateTime);
    return status === EVENT_STATUS.UPCOMING || status === EVENT_STATUS.ONGOING;
  });

  const pastEvents = events.filter((event) => {
    const status = getEventStatus(event.startDateTime, event.endDateTime);
    return status === EVENT_STATUS.PAST;
  });

  return (
    <main className="min-h-screen bg-[#0B1220] pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-slate-950/50 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-7xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-400">{t("description")}</p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          {/* Upcoming Events Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-sky-400 uppercase">
                {t("upcoming_events")}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 lg:grid-cols-3"
            >
              {upcomingEvents.length > 0 ? (
                <>
                  <motion.div variants={itemVariants} className="lg:col-span-2">
                    {upcomingEvents
                      .slice(0, 1)
                      .map((event) =>
                        event.id.startsWith("evt-") ? (
                          <LumaEmbed key={event.id} eventId={event.id} />
                        ) : (
                          <EventCard key={event.id} event={event} />
                        )
                      )}
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-6">
                    <CfpCard />
                    <ChampionCard />
                  </motion.div>

                  {upcomingEvents.slice(1).map((event) => (
                    <motion.div key={event.id} variants={itemVariants}>
                      {event.id.startsWith("evt-") ? (
                        <LumaEmbed eventId={event.id} />
                      ) : (
                        <EventCard event={event} />
                      )}
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div variants={itemVariants} className="lg:col-span-3">
                  <LumaEmbed eventId={FEATURED_LUMA_EVENT_ID} />
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
                  {t("past_events")}
                </h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {pastEvents.map((event) => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <EventCardCompact event={event} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <LuCalendar className="h-8 w-8 text-slate-600" />
              </div>
              <p className="text-xl font-medium text-slate-400">No events found at the moment.</p>
              <p className="mt-2 text-sm text-slate-500">Stay tuned for more updates!</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
