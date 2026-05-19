import React, { useState } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { Clock, User } from "lucide-react";

import { formatBlogDate } from "@/lib/date-utils";
import { useDeviceDetail } from "@/hooks/use-device-detail";
import { Badge } from "@/components/ui/badge";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";
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

  // Validate required properties
  if (!title || !publishedAt || !author || !author.name) {
    console.error("BlogCard: Missing required properties", { title, publishedAt, author });
    return (
      <article className="flex cursor-not-allowed flex-col rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <p className="text-sm text-red-400">Invalid blog data</p>
      </article>
    );
  }

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
        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0B1220]/50 backdrop-blur-md transition-all duration-500 hover:border-sky-500/30 hover:bg-[#0B1220]/80 ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
        onClick={() => setModalOpen(true)}
      >
        <ArchitecturalCorner />
        {/* Cover Image */}
        <div
          className={`relative w-full overflow-hidden ${
            featured ? "aspect-video md:aspect-[16/10]" : "aspect-video"
          }`}
        >
          <Image
            src={coverImageError ? defaultCoverImage : coverImage?.url || defaultCoverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setCoverImageError(true)}
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-60" />

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-10 rounded-full bg-sky-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
              Featured Post
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {tags &&
              Array.isArray(tags) &&
              tags.slice(0, featured ? 4 : 2).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="border-sky-500/20 bg-sky-500/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-sky-400 uppercase"
                >
                  {tag.name}
                </Badge>
              ))}
          </div>

          <h3
            className={`font-bold text-white transition-colors group-hover:text-sky-400 ${
              featured ? "text-2xl leading-tight md:text-3xl" : "text-lg leading-snug"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-3 text-slate-400 ${
              featured ? "line-clamp-4 text-base md:text-lg" : "line-clamp-3 text-sm"
            }`}
          >
            {brief}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/10 transition-transform group-hover:scale-110">
                {authorImageError ? (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                ) : (
                  <Image
                    src={author.profilePicture || ""}
                    alt={author.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                    onError={() => setAuthorImageError(true)}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200">{displayAuthorName}</span>
                <span className="text-[10px] text-slate-500">{formatBlogDate(publishedAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">{readTimeInMinutes}m read</span>
            </div>
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
