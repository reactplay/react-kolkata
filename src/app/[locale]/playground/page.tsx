"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CodeEditor } from "@/components/custom/code-editor";
import { LivePreview } from "@/components/custom/live-preview";
import { PlaygroundControls } from "@/components/custom/playground-controls";
import { DEFAULT_REACT_CODE } from "@/types/playground";

export default function PlaygroundPage() {
  const t = useTranslations("Playground");
  const [code, setCode] = useState(DEFAULT_REACT_CODE);
  const [previewCode, setPreviewCode] = useState(DEFAULT_REACT_CODE);
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleRun = () => {
    setError(undefined);
    setPreviewCode(code);
  };

  const handleSave = () => {
    // TODO: Implement actual save to backend/localStorage
    console.log("Saving code:", code);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setCode(DEFAULT_REACT_CODE);
    setPreviewCode(DEFAULT_REACT_CODE);
    setError(undefined);
  };

  const handleShare = () => {
    // TODO: Implement actual sharing logic
    console.log("Sharing code:", code);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
      </div>

      {/* Controls */}
      <PlaygroundControls
        onRun={handleRun}
        onSave={handleSave}
        onReset={handleReset}
        onShare={handleShare}
        code={code}
        isSaved={isSaved}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Editor and Preview */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
          {/* Code Editor */}
          <div className="h-full">
            <CodeEditor
              initialCode={code}
              language="jsx"
              onChange={handleCodeChange}
            />
          </div>

          {/* Live Preview */}
          <div className="h-full">
            <LivePreview code={previewCode} error={error} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-6 border-t border-border mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">{t("tips.keyboard.title")}</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Tab - {t("tips.keyboard.tab")}</li>
              <li>• Ctrl+S - {t("tips.keyboard.save")}</li>
              <li>• Ctrl+Enter - {t("tips.keyboard.run")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("tips.features.title")}</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• {t("tips.features.autoRun")}</li>
              <li>• {t("tips.features.share")}</li>
              <li>• {t("tips.features.bookmark")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("tips.community.title")}</h3>
            <p className="text-muted-foreground">
              {t("tips.community.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
