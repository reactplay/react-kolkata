import Link from "next/link";

import AnimatedSection from "@/components/custom/animated-section";
import { articles, resources } from "@/base/data/dummy";

import BlogCard from "./blog-card";
import ResourceCard from "./blog-resource-card";

const BlogSection = () => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Blog Section */}
        <div className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Latest from the Blog
              </h2>
              <p className="mt-2 text-slate-300">
                Guides, tips, and community highlights from React Kolkata.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
            >
              View all posts
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {articles.slice(0, 5).map((a, index) => (
              <BlogCard
                key={a.id}
                title={a.title}
                date={a.date}
                excerpt={a.excerpt}
                id={a.id}
                featured={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Community Resources
              </h2>
              <p className="mt-2 text-slate-300">
                Hand-picked links and tools for React developers.
              </p>
            </div>
            <Link
              href="/resources"
              className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
            >
              Explore resources
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {resources.slice(0, 5).map((r, index) => (
              <ResourceCard
                key={r.id}
                title={r.title}
                date={r.date}
                excerpt={r.excerpt}
                href={r.link ?? "#"}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;
