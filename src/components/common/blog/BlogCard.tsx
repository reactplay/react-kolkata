import React, { useState } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { Clock, User } from "lucide-react";

import { formatBlogDate } from "@/lib/date-utils";
import { Badge } from "@/components/ui/badge";

import BlogModal from "./BlogModal";

interface BlogCardProps extends Blog {
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = (props) => {
  const {
    title,
    publishedAt,
    brief,
    id,
    author,
    tags,
    readTimeInMinutes,
    coverImage,
    featured = false,
  } = props;

  const [coverImageError, setCoverImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);

  const defaultCoverImage = "/images/tech-events-1.jpg"; // Default fallback image
  return (
    <article
      className={`group cursor-pointer rounded-xl border border-white/5 bg-white/5 p-5 transition hover:translate-y-[-2px] hover:bg-white/10 ${
        featured ? "md:col-span-2 md:row-span-2 md:p-8" : ""
      }`}
    >
      {/* Cover Image */}
      {(coverImage || !coverImageError) && (
        <div
          className={`relative mb-4 overflow-hidden rounded-lg ${
            featured ? "h-48 md:h-64" : "h-32"
          }`}
        >
          <Image
            src={coverImageError ? defaultCoverImage : coverImage?.url || defaultCoverImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={() => setCoverImageError(true)}
          />
        </div>
      )}

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1">
        {tags.slice(0, featured ? 4 : 2).map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="bg-sky-500/10 px-2 py-1 text-xs text-sky-300 hover:bg-sky-500/20"
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h3
        className={`font-medium text-sky-200 group-hover:text-sky-300 ${
          featured ? "text-xl md:text-2xl" : "text-base"
        }`}
      >
        {title}
      </h3>

      {/* Excerpt */}
      <p
        className={`mt-3 text-slate-300 ${featured ? "line-clamp-4 text-base" : "line-clamp-2 text-sm"}`}
      >
        {brief}
      </p>

      {/* Author and Meta Info */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            {authorImageError ? (
              <div className="flex h-full w-full items-center justify-center bg-slate-600">
                <User className="h-3 w-3 text-slate-400" />
              </div>
            ) : (
              <Image
                src={author.profilePicture || ""}
                alt={author.name}
                fill
                className="object-cover"
                onError={() => setAuthorImageError(true)}
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-slate-300 ${featured ? "text-sm" : "text-xs"}`}>
              {author.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{readTimeInMinutes} min</span>
          </div>
          <span className={`${featured ? "text-sm" : "text-xs"}`}>
            {formatBlogDate(publishedAt)}
          </span>
        </div>
      </div>

      <BlogModal
        key={id}
        blog={{
          id,
          title,
          publishedAt,
          brief,
          author,
          tags,
          readTimeInMinutes,
          coverImage,
          url: props.url,
        }}
      />
    </article>
  );
};

export default BlogCard;
