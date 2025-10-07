"use client";

// since this component has interactivity added this component as client component
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { loadMoreBlogs } from "@/store/blogActions";
import { Blog, BlogSectionProps, BlogTag } from "@/types/blog";
import { Filter, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import BlogCard from "./BlogCard";

export default function BlogList({
  initialBlogs,
  initialEndCursor,
  showLoadMoreButton = false,
}: BlogSectionProps & { showLoadMoreButton?: boolean }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [cursor, setCursor] = useState<string | null>(initialEndCursor);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Blog");

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tagMap = new Map<string, BlogTag>();
    blogs.forEach((article) => {
      article.tags.forEach((tag) => {
        tagMap.set(tag.id, tag);
      });
    });
    return Array.from(tagMap.values());
  }, [blogs]);

  // Filter articles based on selected tags
  const filteredArticles = useMemo(() => {
    if (selectedTags.length === 0) return blogs;
    return blogs.filter((blog: Blog) => blog.tags.some((tag) => selectedTags.includes(tag.id)));
  }, [selectedTags, blogs]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const handleMoreBlogsCTA = () => {
    startTransition(async () => {
      const { posts: newBlogs, endCursor } = await loadMoreBlogs(cursor, 8);
      setBlogs((prev) => [...prev, ...newBlogs]);
      setCursor(endCursor);
    });
  };

  return (
    <div className="mb-16 flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-slate-300">{t("description")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          >
            <Filter className="mr-2 h-4 w-4" />
            {t("filter")}
          </Button>
          {/* Show only when we are not pres */}
          {!showLoadMoreButton && (
            <Link
              href="/blog"
              className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
            >
              {t("view_all_posts")}
            </Link>
          )}
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-6 items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-sm font-medium text-slate-300">Filter by tags</h3>
              {selectedTags.length > 0 && (
                <p className="text-sm text-slate-400">
                  (
                  {t("showing_posts", {
                    count: filteredArticles.length,
                    total: blogs.length,
                  })}
                  )
                </p>
              )}
            </div>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-slate-400 hover:text-slate-300"
              >
                <X className="mr-1 h-3 w-3" />
                {t("clear")}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag.id)
                    ? "bg-sky-500 text-white hover:bg-sky-600"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        {filteredArticles.map((article, index) => (
          <BlogCard
            key={article.id}
            title={article.title}
            publishedAt={article.publishedAt}
            brief={article.brief}
            id={article.id}
            author={article.author}
            tags={article.tags}
            readTimeInMinutes={article.readTimeInMinutes}
            coverImage={article.coverImage}
            featured={index === 0}
            url={article.url}
          />
        ))}
      </div>

      {showLoadMoreButton && !!cursor && (
        <div className="mt-8 text-center">
          <Button
            onClick={handleMoreBlogsCTA}
            disabled={isPending}
            className="cursor-pointer bg-sky-500 text-white hover:bg-sky-600"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
