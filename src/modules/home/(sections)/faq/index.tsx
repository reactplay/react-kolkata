"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/custom/animated-section";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

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
      "We are always looking for passionate speakers! You can submit your talk proposal through our 'Call for Speakers' form available in the Events section or reach out to us on our community channels like WhatsApp or Discord.",
  },
  {
    id: "faq-4",
    question: "Who can join the community?",
    answer:
      "Anyone interested in React, JavaScript, or Frontend development can join! Whether you're a student, a professional developer, or just starting your coding journey, you are welcome at React Kolkata.",
  },
  {
    id: "faq-5",
    question: "How can I stay updated about upcoming events?",
    answer:
      "The best way to stay updated is by joining our WhatsApp community or following us on X (formerly Twitter) and LinkedIn. We also post all our events on our official website and Lu.ma page.",
  },
  {
    id: "faq-6",
    question: "Can I contribute to the React Kolkata website?",
    answer:
      "Yes! Our website is open-source. You can find our repository on GitHub and contribute by fixing bugs, adding features, or improving documentation.",
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AnimatedSection id="faq" className="relative overflow-hidden bg-[#0B1220] py-20">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col items-start">
          <h2 className="mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
            Questions Answered
          </h2>
          <p className="max-w-2xl text-xl text-slate-400">
            Everything you need to know about the community, events, and how to get involved.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden transition-all duration-500",
                "border border-white/5 bg-white/[0.02] hover:bg-white/[0.04]",
                openId === faq.id ? "border-white/10 bg-white/[0.05]" : ""
              )}
            >
              <ArchitecturalCorner />

              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
              >
                <span
                  className={cn(
                    "text-lg font-bold transition-colors duration-300",
                    openId === faq.id ? "text-white" : "text-slate-300 group-hover:text-white"
                  )}
                >
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
                    openId === faq.id
                      ? "rotate-180 border-sky-500 bg-sky-500 text-white"
                      : "border-white/10 text-slate-500 group-hover:border-white/20 group-hover:text-slate-300"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-2 pb-6">
                      <div className="mb-4 h-px w-12 bg-sky-500/50" />
                      <p className="text-base leading-relaxed text-slate-400">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default FaqSection;
