"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMinus, LuPlus } from "react-icons/lu";

import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/custom/animated-section";

const faqs = [
  {
    id: "faq-1",
    question: "What is React Kolkata?",
    answer:
      "React Kolkata is a community-driven group of React enthusiasts, developers, and designers based in Kolkata. We host monthly meetups, workshops, and technical talks to share knowledge and build a strong local developer ecosystem.",
  },
  {
    id: "faq-2",
    question: "Is it free to join React Kolkata events?",
    answer:
      "Most of our community meetups and talks are free of charge. Some specialized workshops or flagship events might have a nominal fee to cover venue and refreshment costs, which will be clearly mentioned in the event details.",
  },
  {
    id: "faq-3",
    question: "How can I speak at a React Kolkata meetup?",
    answer:
      "We are always looking for passionate speakers! Submit your talk through our Call for Speakers form in the Events section, or reach out to us on WhatsApp or Discord.",
  },
  {
    id: "faq-4",
    question: "Who can join the community?",
    answer:
      "Anyone interested in React, JavaScript, or frontend development students, professionals, and complete beginners are all welcome at React Kolkata.",
  },
  {
    id: "faq-5",
    question: "How can I stay updated about upcoming events?",
    answer:
      "Join our WhatsApp community or follow us on X and LinkedIn. We also post every event on this website and our Lu.ma page.",
  },
  {
    id: "faq-6",
    question: "How can I sponsor or partner with React Kolkata?",
    answer:
      "Write to reactkolkata@gmail.com with the subject “Sponsorship” or “Partnership”. Sponsors get visibility across our events, socials, and this website and keep our meetups free for everyone.",
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AnimatedSection
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-[#0B1220] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute top-1/3 -left-24 h-96 w-96 rounded-none bg-sky-500/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">FAQ</p>
          <h2 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
            Questions, <em className="text-sky-400 italic">answered.</em>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
            Everything you need to know about the community, events, and how to get involved. Still
            stuck? Ask us directly.
          </p>
        </div>

        <div className="divide-y divide-white/10 rounded-none border border-white/10 bg-white/[0.02] px-6 backdrop-blur-sm sm:px-8">
          {faqs.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none"
                >
                  <span
                    className={cn(
                      "font-display text-xl transition-colors sm:text-2xl",
                      open ? "text-white italic" : "text-slate-200"
                    )}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-none border transition-all duration-300",
                      open
                        ? "border-indigo-500 bg-indigo-600 text-white"
                        : "border-white/15 text-slate-400"
                    )}
                  >
                    {open ? <LuMinus className="h-4 w-4" /> : <LuPlus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default FaqSection;
