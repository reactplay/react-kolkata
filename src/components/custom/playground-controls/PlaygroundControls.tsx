"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Play,
  Save,
  Share2,
  RotateCcw,
  Download,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlaygroundControlsProps {
  onRun?: () => void;
  onSave?: () => void;
  onReset?: () => void;
  onShare?: () => void;
  code: string;
  isSaved?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export default function PlaygroundControls({
  onRun,
  onSave,
  onReset,
  onShare,
  code,
  isSaved = false,
  isBookmarked = false,
  onToggleBookmark,
}: PlaygroundControlsProps) {
  const t = useTranslations("Playground");
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Silently fail - clipboard API may not be available
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snippet.jsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    // Generate shareable link (in real app, would save to backend first)
    const mockShareUrl = `${window.location.origin}/playground/share/${Date.now()}`;
    setShareUrl(mockShareUrl);
    
    // Copy to clipboard
    navigator.clipboard.writeText(mockShareUrl);
    
    onShare?.();
    
    // Reset after 3 seconds
    setTimeout(() => setShareUrl(null), 3000);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        <Button
          onClick={onRun}
          size="sm"
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          {t("controls.run")}
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {t("controls.reset")}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onToggleBookmark}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 fill-current" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </Button>

        <Button
          onClick={onSave}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {isSaved ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaved ? t("controls.saved") : t("controls.save")}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              {t("controls.share")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              {shareUrl ? t("controls.linkCopied") : t("controls.getLink")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? t("controls.copied") : t("controls.copyCode")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              {t("controls.download")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
