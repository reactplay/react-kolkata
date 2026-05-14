"use client";

import { Card } from "@/components/ui/card";

interface LumaEmbedProps {
  eventId: string;
  className?: string;
}

const CardDecorator = () => (
  <>
    <span className="absolute -top-px -left-px z-10 block size-2 border-t-2 border-l-2 border-white/30"></span>
    <span className="absolute -top-px -right-px z-10 block size-2 border-t-2 border-r-2 border-white/30"></span>
    <span className="absolute -bottom-px -left-px z-10 block size-2 border-b-2 border-l-2 border-white/30"></span>
    <span className="absolute -right-px -bottom-px z-10 block size-2 border-r-2 border-b-2 border-white/30"></span>
  </>
);

export default function LumaEmbed({ eventId, className = "" }: LumaEmbedProps) {
  return (
    <Card
      className={`event-card relative w-full gap-0 overflow-hidden rounded-none border border-white/5 bg-[#0B1220]/50 py-0 shadow-2xl backdrop-blur-md ${className}`}
    >
      <CardDecorator />
      <iframe
        src={`https://luma.com/embed/event/${eventId}/simple`}
        width="100%"
        height="600"
        frameBorder="0"
        style={{ border: "none" }}
        allow="fullscreen; payment"
        aria-hidden="false"
        tabIndex={0}
        title="Luma Event Registration"
        className="min-h-[450px] lg:min-h-[600px]"
      ></iframe>
    </Card>
  );
}
