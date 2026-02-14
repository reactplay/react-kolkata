import { BlogSectionProps } from "@/types/blog";

import BlogList from "@/components/common/blog/BlogList";
import ErrorBoundary from "@/components/common/error-boundary";
import AnimatedSection from "@/components/custom/animated-section";

import CoreTeam from "../about/core-team";

const BlogSection = ({ initialBlogs, initialEndCursor, error }: BlogSectionProps) => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* created component for blog to use in Blog Section and blog page */}
        <ErrorBoundary>
          <BlogList initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} error={error} />
        </ErrorBoundary>

        {/* Core Team Section */}
        <div className="mt-20">
          <ErrorBoundary>
            <CoreTeam />
          </ErrorBoundary>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;
