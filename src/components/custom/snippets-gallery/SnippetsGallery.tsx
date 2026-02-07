"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart, Eye, Bookmark, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeSnippet } from "@/types/playground";

interface SnippetCardProps {
  snippet: CodeSnippet;
  onView?: (snippet: CodeSnippet) => void;
}

export function SnippetCard({ snippet, onView }: SnippetCardProps) {
  const t = useTranslations("Playground");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{snippet.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {snippet.description}
          </p>
        </div>
        {snippet.featured && (
          <Badge variant="default" className="ml-2">
            ⭐ {t("snippets.featured")}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className="text-xs">
          <Code2 className="w-3 h-3 mr-1" />
          {snippet.language}
        </Badge>
        {snippet.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {snippet.tags.length > 3 && (
          <span className="text-xs text-muted-foreground">
            +{snippet.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{snippet.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{snippet.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="w-4 h-4" />
            <span>{snippet.bookmarks}</span>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onView?.(snippet)}
          className="gap-2"
        >
          {t("snippets.viewCode")}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <img
          src={snippet.author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${snippet.author.name}`}
          alt={snippet.author.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-muted-foreground">
          {snippet.author.name}
        </span>
        <span className="text-xs text-muted-foreground ml-auto">
          {new Date(snippet.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
}

interface SnippetsGalleryProps {
  snippets: CodeSnippet[];
  onViewSnippet?: (snippet: CodeSnippet) => void;
}

export default function SnippetsGallery({
  snippets,
  onViewSnippet,
}: SnippetsGalleryProps) {
  const t = useTranslations("Playground");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "most-liked">("recent");

  // Get all unique tags
  const allTags = Array.from(
    new Set(snippets.flatMap((snippet) => snippet.tags))
  );

  // Filter snippets
  const filteredSnippets = selectedTag
    ? snippets.filter((snippet) => snippet.tags.includes(selectedTag))
    : snippets;

  // Sort snippets
  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "most-liked":
        return b.likes - a.likes;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
          >
            {t("snippets.all")}
          </Button>
          {allTags.slice(0, 5).map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-input rounded-md text-sm bg-background"
        >
          <option value="recent">{t("snippets.sortRecent")}</option>
          <option value="popular">{t("snippets.sortPopular")}</option>
          <option value="most-liked">{t("snippets.sortLiked")}</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {t("snippets.showing", { count: sortedSnippets.length, total: snippets.length })}
      </p>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onView={onViewSnippet}
          />
        ))}
      </div>

      {sortedSnippets.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("snippets.noResults")}</h3>
          <p className="text-muted-foreground">{t("snippets.tryDifferentFilter")}</p>
        </div>
      )}
    </div>
  );
}
