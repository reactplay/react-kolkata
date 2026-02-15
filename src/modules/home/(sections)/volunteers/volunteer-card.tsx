import Image from "next/image";
import Link from "next/link";
import { Github, Globe, Linkedin, Twitter, User } from "lucide-react";

export interface Volunteer {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface VolunteerCardProps {
  volunteer: Volunteer;
}

const VolunteerCard = ({ volunteer }: VolunteerCardProps) => {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10">
      {/* Photo */}
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-sky-500/20 transition-all group-hover:ring-sky-500/40">
        {volunteer.photo ? (
          <Image
            src={volunteer.photo}
            alt={`${volunteer.name}'s photo`}
            fill
            unoptimized
            className="object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
            <User className="h-12 w-12" />
          </div>
        )}
      </div>

      {/* Name & Role */}
      <h3 className="mb-1 text-xl font-bold text-slate-100">{volunteer.name}</h3>
      <span className="mb-3 inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400">
        {volunteer.role}
      </span>

      {/* Bio */}
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">{volunteer.bio}</p>

      {/* Social Links */}
      <div className="mt-auto flex gap-3">
        {volunteer.socials.github && (
          <Link
            href={volunteer.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </Link>
        )}
        {volunteer.socials.linkedin && (
          <Link
            href={volunteer.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        )}
        {volunteer.socials.twitter && (
          <Link
            href={volunteer.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
            aria-label="Twitter Profile"
          >
            <Twitter className="h-4 w-4" />
          </Link>
        )}
        {volunteer.socials.website && (
          <Link
            href={volunteer.socials.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
            aria-label="Personal Website"
          >
            <Globe className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Subtle Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

export default VolunteerCard;
