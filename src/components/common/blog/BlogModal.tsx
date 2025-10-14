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
        className="no-scrollbar border-border bg-background/95 text-foreground max-h-[90vh] max-w-3xl overflow-y-auto backdrop-blur"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-primary pr-8 text-xl font-semibold"
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
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatBlogDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTimeInMinutes} min read</span>
            </div>
            <div>{formatBlogRelativeTime(blog.publishedAt)}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/15 transition-colors"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Author Section */}
          <div className="border-border bg-foreground/5 dark:bg-foreground/10 rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                {authorImageError ? (
                  <div className="bg-foreground/10 flex h-full w-full items-center justify-center">
                    <User className="text-foreground/60 h-6 w-6" />
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
                  <h4 className="text-foreground font-medium">{blog.author.name}</h4>
                  {/* Assuming profileUrl might be added to author object later */}
                  {blog.author.profileUrl && (
                    <a
                      href={blog.author.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {blog.author.bio?.text && blog.author.bio.text.length > 140
                    ? `${blog.author.bio.text.substring(0, 140)}...`
                    : blog.author.bio?.text || "Community Contributor"}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate text-foreground dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">{blog.brief}</p>
          </div>
          {/* End of hard-coded part */}
          <div className="border-border flex items-center justify-between gap-2 border-t pt-4">
            <div className="text-muted-foreground text-xs">
              Published by React Kolkata Community
            </div>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
