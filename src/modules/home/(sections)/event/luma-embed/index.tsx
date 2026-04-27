"use client";

interface LumaEmbedProps {
  eventId: string;
  className?: string;
}

export default function LumaEmbed({ eventId, className = "" }: LumaEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl ${className}`}
    >
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
    </div>
  );
}
