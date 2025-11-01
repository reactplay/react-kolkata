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

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  publishedAt,
  brief,
  id,
  author,
  tags,
  readTimeInMinutes,
  coverImage,
  featured = false,
  url,
}) => {
  const [coverImageError, setCoverImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isPad, isDesktop } = useDeviceDetail();

  const authorNameLimit = isDesktop
    ? AUTHOR_NAME_CHAR_LIMIT_XL
    : isPad
      ? AUTHOR_NAME_CHAR_LIMIT_MD
      : null;

  const defaultCoverImage = "/images/tech-events-1.jpg";

  const displayAuthorName =
    !featured && authorNameLimit && author.name.length > authorNameLimit
      ? `${author.name.substring(0, authorNameLimit - 3)}...`
      : author.name;

  return (
    <>
      <article
        className={`group flex cursor-pointer flex-col rounded-xl border border-white/5 bg-white/5 p-5 transition hover:translate-y-[-2px] hover:bg-white/10 ${
          featured ? "md:col-span-2 md:row-span-2 md:p-8" : ""
        }`}
        onClick={() => setModalOpen(true)}
      >
        {/* Cover Image */}
        <div
          className={`relative mb-4 w-full overflow-hidden rounded-lg ${
            featured ? "aspect-video" : "aspect-video"
          }`}
        >
          <Image
            src={coverImageError ? defaultCoverImage : coverImage?.url || defaultCoverImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={() => setCoverImageError(true)}
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </div>

        {/* Tags, Title & Excerpt */}
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex flex-wrap gap-1">
            {tags.slice(0, featured ? 4 : 2).map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-sky-500/10 px-2 py-1 text-xs text-sky-300 hover:bg-sky-500/20"
              >
                {tag.name.length > 15 ? `${tag.name.substring(0, 12)}...` : tag.name}
              </Badge>
            ))}
          </div>

          <h3
            className={`font-medium text-sky-200 group-hover:text-sky-300 ${
              featured ? "line-clamp-2 text-xl md:text-2xl" : "line-clamp-2 text-base"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-2 text-slate-300 ${
              featured ? "line-clamp-3 text-base md:line-clamp-4" : "line-clamp-3 text-sm"
            }`}
          >
            {brief}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
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
            <span className={`truncate text-slate-300 ${featured ? "text-sm" : "text-xs"}`}>
              {displayAuthorName}
            </span>
          </div>

          <div className="flex flex-shrink-0 items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{readTimeInMinutes} min</span>
            </div>
            <span className={`whitespace-nowrap ${featured ? "text-sm" : "text-xs"}`}>
              {formatBlogDate(publishedAt)}
            </span>
          </div>
        </div>
      </article>

      {/* Blog Modal */}
      <BlogModal
        key={id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        blog={{ id, title, publishedAt, brief, author, tags, readTimeInMinutes, coverImage, url }}
      />
    </>
  );
};

export default BlogCard;
