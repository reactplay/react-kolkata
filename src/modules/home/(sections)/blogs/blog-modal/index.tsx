"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, ExternalLink, Github, User } from "lucide-react";

import { formatBlogDate, formatBlogRelativeTime } from "@/lib/date-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { articles } from "@/base/data/dummy";

interface BlogModalProps {
  articleId: string;
}

export default function BlogModal({ articleId }: BlogModalProps) {
  const [open, setOpen] = useState(false);
  const [coverImageError, setCoverImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);
  const article = articles.find((a) => a.id === articleId);

  const defaultCoverImage = "/images/tech-events-1.jpg";

  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-4 inline-flex text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline">
          Read More
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0B1220] text-slate-100">
        <DialogHeader>
          <DialogTitle
            className="text-xl font-semibold text-sky-200"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {article.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          {(article.coverImage || !coverImageError) && (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={coverImageError ? defaultCoverImage : article.coverImage || defaultCoverImage}
                alt={article.title}
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
              <span>{formatBlogDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="text-slate-500">{formatBlogRelativeTime(article.date)}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
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
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                    onError={() => setAuthorImageError(true)}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-200">{article.author.name}</h4>
                  {article.author.profileUrl && (
                    <a
                      href={article.author.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-slate-400">{article.author.bio}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="leading-relaxed text-slate-300">{article.excerpt}</p>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-slate-200">Key Highlights</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• In-depth technical discussions and real-world examples</li>
                <li>• Community insights and best practices</li>
                <li>• Practical tips you can implement immediately</li>
                <li>• Q&A session highlights and follow-up resources</li>
              </ul>

              <h3 className="text-lg font-medium text-slate-200">What You&apos;ll Learn</h3>
              <p className="text-slate-300">
                This article covers essential concepts and patterns that will help you build better
                React applications. From performance optimization to modern development practices,
                you&apos;ll gain valuable insights from our community&apos;s collective experience.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4">
            <div className="text-xs text-slate-500">Published by React Kolkata Community</div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
            >
              <a
                href={article.url || "https://reactplay.hashnode.dev"}
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
