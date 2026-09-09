"use client";

import { FaInstagram, FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import { SiX } from "react-icons/si";

import { cn } from "@/lib/utils";
import type { Mention, MentionPlatform } from "@/base/data/social-posts";

const platformIcon: Record<MentionPlatform, typeof FaLinkedin> = {
  LinkedIn: FaLinkedin,
  X: SiX,
  Instagram: FaInstagram,
};
export function MentionCard({
  mention,
  fixedWidth = false,
}: {
  mention: Mention;
  fixedWidth?: boolean;
}) {
  const Icon = platformIcon[mention.platform] ?? FaLinkedin;
  return (
    <a
      href={mention.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${mention.name}'s post about React Kolkata on ${mention.platform}`}
      className={cn(
        "group flex h-full flex-col justify-between rounded-none border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.05]",
        fixedWidth && "w-[300px] shrink-0 sm:w-[400px]"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <FaQuoteLeft className="h-5 w-5 text-amber-200/70" aria-hidden="true" />
          <span
            title={`Posted on ${mention.platform}`}
            aria-label={`Posted on ${mention.platform}`}
            className="flex h-9 w-9 items-center justify-center rounded-none border border-white/10 bg-white/5 text-slate-300"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 line-clamp-5 text-[15px] leading-relaxed text-slate-300">
          &ldquo;{mention.quote}&rdquo;
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="min-w-0 flex-1">
          <p className="font-display truncate text-lg leading-tight text-white italic">
            {mention.name}
          </p>
          {mention.bio ? (
            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {mention.bio}
            </p>
          ) : null}
          <p className="mt-1 truncate text-[11px] tracking-wider text-slate-500 uppercase">
            {[mention.meta, mention.context].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span
          title={`View ${mention.name}'s profile`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-white/10 bg-white/5 text-slate-400 transition-all group-hover:border-sky-400/40 group-hover:text-sky-300"
        >
          <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
