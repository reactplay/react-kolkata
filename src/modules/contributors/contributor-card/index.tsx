import Image from "next/image";
import Link from "next/link";
import { GitCommit, Github } from "lucide-react";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
  site_admin: boolean;
}

interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard = ({ contributor }: ContributorCardProps) => {
  return (
    <div className="group border-border bg-foreground/5 hover:border-primary/30 hover:bg-foreground/10 dark:bg-foreground/10 dark:hover:bg-foreground/20 relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
      {/* Avatar */}
      <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={contributor.avatar_url}
          alt={`${contributor.login}'s avatar`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Name */}
      <h3 className="text-foreground mb-2 text-center text-lg font-semibold">
        {contributor.login}
      </h3>

      {/* Contributions */}
      <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2 text-sm">
        <GitCommit className="h-4 w-4" />
        <span>
          {contributor.contributions}{" "}
          {contributor.contributions === 1 ? "contribution" : "contributions"}
        </span>
      </div>

      {/* Admin Badge */}
      {contributor.site_admin && (
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
            Admin
          </span>
        </div>
      )}

      {/* GitHub Link */}
      <div className="relative z-10 flex justify-center">
        <Link
          href={contributor.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors"
        >
          <Github className="h-4 w-4" />
          View Profile
        </Link>
      </div>

      {/* Hover Effect */}
      <div className="from-primary/10 via-primary/5 to-primary/10 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

export default ContributorCard;
