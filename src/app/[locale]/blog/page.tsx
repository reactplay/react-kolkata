import React from "react";
import { Metadata } from "next";
import Script from "next/script";
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
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        bn: "/bn/blog",
        hi: "/hi/blog",
        es: "/es/blog",
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${locale}/blog`,
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

const BlogPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor, error } = await getInitialBlogs();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "React Kolkata Blog",
    description: "Read the latest articles from the React Kolkata community.",
    url: "https://reactkolkata.com/blog",
    hasPart: (initialBlogs || []).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: blog.url,
      image: blog.coverImage?.url,
      datePublished: blog.publishedAt,
      author: {
        "@type": "Person",
        name: blog.author?.name || "React Kolkata Member",
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
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
