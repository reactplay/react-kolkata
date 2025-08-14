import Link from "next/link";

interface ResourceCardProps {
  title: string;
  date: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  date,
  excerpt,
  href,
  featured = false,
}) => {
  return (
    <article
      className={`group rounded-xl border border-white/5 bg-white/5 p-5 transition hover:translate-y-[-2px] hover:bg-white/10 ${
        featured ? "md:col-span-2 md:row-span-2 md:p-8" : ""
      }`}
    >
      <h3
        className={`font-medium text-sky-200 group-hover:text-sky-300 ${
          featured ? "text-xl md:text-2xl" : "text-base"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-1 text-slate-400 ${featured ? "text-sm" : "text-xs"}`}>{date}</p>
      <p
        className={`mt-3 text-slate-300 ${featured ? "line-clamp-4 text-base" : "line-clamp-2 text-sm"}`}
      >
        {excerpt}
      </p>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
      >
        Open Resource
      </Link>
    </article>
  );
};

export default ResourceCard;
