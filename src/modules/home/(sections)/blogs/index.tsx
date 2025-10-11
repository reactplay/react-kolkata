import { BlogSectionProps } from "@/types/blog";

import BlogList from "@/components/common/blog/BlogList";
import AnimatedSection from "@/components/custom/animated-section";

const BlogSection = ({ initialBlogs, initialEndCursor, error }: BlogSectionProps) => {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* created component for blog to use in Blog Section and blog page */}
        <BlogList initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} error={error} />
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;
