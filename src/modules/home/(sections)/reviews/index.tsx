"use client";

import { useEffect, useRef, useState } from "react";

import AnimatedSection from "@/components/custom/animated-section";
import { MentionCard } from "@/components/custom/mention-card";
import { fetchRemoteMentions, mergeMentions, type Mention } from "@/base/data/social-posts";

const AUTOPLAY_MS = 4000;
const ReviewsSection = () => {
  const [mentions, setMentions] = useState<Mention[]>(() => mergeMentions(null));
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetchRemoteMentions(controller.signal)
      .then((remote) => {
        if (remote) setMentions(mergeMentions(remote));
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (paused || mentions.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = (card?.offsetWidth ?? 380) + 20;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 24;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [paused, mentions.length]);

  return (
    <AnimatedSection id="reviews" className="relative scroll-mt-24 bg-[#0B1220] py-20 sm:py-24">
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-none bg-indigo-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Community voices
          </p>
          <h2 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl">
            People are <em className="text-sky-400 italic">talking</em> about us
          </h2>
        </div>

        <div
          className="group/wall relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            role="region"
            aria-label="Latest community posts"
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] px-4 py-2"
          >
            {mentions.map((post) => (
              <div key={post.href} data-card className="flex snap-start">
                <MentionCard mention={post} fixedWidth />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ReviewsSection;
