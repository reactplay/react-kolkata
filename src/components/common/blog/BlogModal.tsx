import { useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { Calendar, Clock, ExternalLink, Github, User } from "lucide-react";

import { formatBlogDate, formatBlogRelativeTime } from "@/lib/date-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlogModalProps {
  blog: Blog;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BlogModal({ blog, modalOpen, setModalOpen }: BlogModalProps) {
  const [coverImageError, setCoverImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);

  const defaultCoverImage = "/images/tech-events-1.jpg";
  if (!blog) return null;

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="no-scrollbar max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0B1220] text-slate-100"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="pr-8 text-xl font-semibold text-sky-200"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {blog.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          {(blog.coverImage?.url || !coverImageError) && (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={
                  coverImageError ? defaultCoverImage : blog.coverImage?.url || defaultCoverImage
                }
                alt={blog.title}
                fill
                className="object-cover"
                onError={() => setCoverImageError(true)}
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatBlogDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTimeInMinutes} min read</span>
            </div>
            <div className="text-slate-500">{formatBlogRelativeTime(blog.publishedAt)}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Author Section */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                {authorImageError ? (
                  <div className="flex h-full w-full items-center justify-center bg-slate-600">
                    <User className="h-6 w-6 text-slate-400" />
                  </div>
                ) : (
                  <Image
                    src={blog.author.profilePicture}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                    onError={() => setAuthorImageError(true)}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-200">{blog.author.name}</h4>
                  {/* Assuming profileUrl might be added to author object later */}
                  {blog.author.profileUrl && (
                    <a
                      href={blog.author.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-slate-400">
                  {blog.author.bio?.text && blog.author.bio.text.length > 140
                    ? `${blog.author.bio.text.substring(0, 140)}...`
                    : blog.author.bio?.text || "Community Contributor"}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="leading-relaxed text-slate-300">{blog.brief}</p>
          </div>
          {/* End of hard-coded part */}
          <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4">
            <div className="text-xs text-slate-500">Published by React Kolkata Community</div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
            >
              <a
                href={blog.url || "https://reactplay.hashnode.dev"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                Read Full Article
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
