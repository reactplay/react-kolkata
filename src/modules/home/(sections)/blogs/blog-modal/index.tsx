"use client";

import { useState } from "react";
import { Calendar, ExternalLink, User } from "lucide-react";

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
  const article = articles.find((a) => a.id === articleId);

  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-4 inline-flex text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline">
          Read More
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-white/10 bg-[#0B1220] text-slate-100">
        <DialogHeader>
          <DialogTitle
            className="text-xl font-semibold text-sky-200"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {article.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>React Kolkata Team</span>
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

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-xs text-slate-500">Published by React Kolkata Community</div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
            >
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
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
