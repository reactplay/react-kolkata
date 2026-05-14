import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, User } from "lucide-react";

import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

export interface Champion {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
}

interface ChampionCardProps {
  champion: Champion;
}

const ChampionCard = ({ champion }: ChampionCardProps) => {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
      <ArchitecturalCorner />
      {/* Photo */}
      {champion.photo ? (
        <Image
          src={champion.photo}
          alt={champion.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
          className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
          <User className="h-20 w-20" />
        </div>
      )}

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

      {/* Info at bottom left */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-left">
        <h3 className="mb-1 text-xl font-bold text-white">{champion.name}</h3>
        <p className="mb-4 text-sm text-slate-300">{champion.role}</p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {champion.socials.github && (
            <Link
              href={champion.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </Link>
          )}
          {champion.socials.linkedin && (
            <Link
              href={champion.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
