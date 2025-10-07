import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import BlogList from "@/components/common/blog/BlogList";

// Component to display the blog page(/blog) with initial blogs and a load more button
const BlogPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor } = await getInitialBlogs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <BlogList
        initialBlogs={initialBlogs}
        initialEndCursor={initialEndCursor}
        showLoadMoreButton={true}
      />
    </div>
  );
};

export default BlogPage;
