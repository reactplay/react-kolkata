import Link from "next/link";
import { BlogSectionProps } from "@/types/blog";

import BlogList from "@/components/common/blog/BlogList";
import AnimatedSection from "@/components/custom/animated-section";
import { resources } from "@/base/data/dummy";

import ResourceCard from "./blog-resource-card";

const BlogSection = ({ initialBlogs, initialEndCursor }: BlogSectionProps) => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* created component for blog to use in Blog Section and blog page */}
        <BlogList initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} />

        {/* Resources Section */}
        <div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
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
