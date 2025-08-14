import React from "react";

import BlogModal from "../blog-modal";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  id: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, date, excerpt, id, featured = false }) => {
  return (
    <article
      className={`group cursor-pointer rounded-xl border border-white/5 bg-white/5 p-5 transition hover:translate-y-[-2px] hover:bg-white/10 ${
        featured ? "md:col-span-2 md:row-span-2 md:p-8" : ""
      }`}
    >
      <h3
        className={`font-medium text-sky-200 group-hover:text-sky-300 ${
          featured ? "text-xl md:text-2xl" : "text-base"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-1 text-slate-400 ${featured ? "text-sm" : "text-xs"}`}>{date}</p>
      <p
        className={`mt-3 text-slate-300 ${featured ? "line-clamp-4 text-base" : "line-clamp-2 text-sm"}`}
      >
        {excerpt}
      </p>
      <BlogModal articleId={id} />
    </article>
  );
};

export default BlogCard;
