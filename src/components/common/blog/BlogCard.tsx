import React, { useState } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { Clock, User } from "lucide-react";

import { formatBlogDate } from "@/lib/date-utils";
import { useDeviceDetail } from "@/hooks/use-device-detail";
import { Badge } from "@/components/ui/badge";
import { AUTHOR_NAME_CHAR_LIMIT_MD, AUTHOR_NAME_CHAR_LIMIT_XL } from "@/base/constants/site";

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
  const { isPad, isDesktop } = useDeviceDetail();
  const [modalOpen, setModalOpen] = useState(false);

  const authorNameCharLimit: number | null = isDesktop
    ? AUTHOR_NAME_CHAR_LIMIT_XL
    : isPad
      ? AUTHOR_NAME_CHAR_LIMIT_MD
      : null;

  const defaultCoverImage = "/images/tech-events-1.jpg"; // Default fallback image
  return (
    <article
      className={`group border-border bg-background hover:bg-primary/10 grid cursor-pointer grid-rows-[auto_1fr_auto] rounded-xl border p-5 transition hover:translate-y-[-2px] ${
        featured ? "md:col-span-2 md:row-span-2 md:p-8" : ""
      }`}
      onClick={() => setModalOpen(true)}
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

      <div className="flex flex-col">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1">
          {tags.slice(0, featured ? 4 : 2).map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/15 px-2 py-1 text-xs transition-colors"
            >
              {tag.name.length > 15 ? `${tag.name.substring(0, 12)}...` : tag.name}
            </Badge>
          ))}
        </div>

        <div className="flex grow flex-col">
          {/* Title */}
          <h3
            className={`text-foreground group-hover:text-primary overflow-hidden font-medium transition-colors ${
              featured ? "text-xl md:text-2xl" : "line-clamp-3 h-18 text-base"
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p
            className={`text-muted-foreground mt-3 ${
              featured ? "line-clamp-4 text-base" : "line-clamp-2 h-10 text-sm"
            }`}
          >
            {brief}
          </p>
        </div>
      </div>
      {/* Footer: Author and Meta Info */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-nowrap">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              {authorImageError ? (
                <div className="bg-foreground/10 flex h-full w-full items-center justify-center">
                  <User className="text-foreground/60 h-3 w-3" />
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
            <span className={`text-muted-foreground ${featured ? "text-sm" : "text-xs"}`}>
              {/* for featured card and mobile screen show full author name */}
              {!featured && authorNameCharLimit && author.name.length > authorNameCharLimit
                ? `${author.name.substring(0, authorNameCharLimit - 3)}...`
                : author.name}
            </span>
          </div>

          <div className="text-muted-foreground flex items-center gap-3 text-nowrap">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{readTimeInMinutes} min</span>
            </div>
            <span className={`${featured ? "text-sm" : "text-xs"}`}>
              {formatBlogDate(publishedAt)}
            </span>
          </div>
        </div>
      </div>
      <BlogModal
        key={id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
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
