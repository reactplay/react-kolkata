"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/images/kolkata-hero.jpg";
const VIDEO_POSTER = "/images/poster.avif";

interface EventMediaProps {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
}

export default function EventMedia({ src, alt, sizes, className }: EventMediaProps) {
  const [currentSrc, setCurrentSrc] = useState(src ?? FALLBACK_IMAGE);
  const isVideo = currentSrc.toLowerCase().endsWith(".mp4");

  if (isVideo) {
    return (
      <video
        src={currentSrc}
        poster={VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onError={() => setCurrentSrc(VIDEO_POSTER)}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setCurrentSrc(FALLBACK_IMAGE)}
    />
  );
}
