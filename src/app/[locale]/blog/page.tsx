import React from "react";
import { Metadata } from "next";
import { getInitialBlogs } from "@/utils/blog";
import { getTranslations } from "next-intl/server";

import BlogList from "@/components/common/blog/BlogList";
import ErrorBoundary from "@/components/common/error-boundary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const pageTitle = t("title");
  const pageDescription = t("description");

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${locale}/blog`,
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
      // Optional: can add a default image
      // images: ['/images/blog-og.jpg'],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      // Optional: can add a default image
      // images: ['/images/blog-twitter.jpg'],
    },
  };
}

const BlogPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor, error } = await getInitialBlogs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ErrorBoundary>
        <BlogList
          initialBlogs={initialBlogs}
          initialEndCursor={initialEndCursor}
          error={error}
          showLoadMoreButton={true}
        />
      </ErrorBoundary>
    </div>
  );
};

export default BlogPage;
