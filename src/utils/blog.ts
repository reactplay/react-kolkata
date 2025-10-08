import { blogPostQuery } from "@/queries/utils";
import { Blog, BlogFetchResponse, HashnodeAPIResponse } from "@/types/blog";

import { HASHNODE_API_URL } from "@/base/constants/site";

// This function will run on the server
export async function getInitialBlogs(): Promise<BlogFetchResponse> {
  try {
    // Fetch the first 5 blogs for the initial load
    const res = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: blogPostQuery,
        variables: { postCount: 5, cursor: null },
      }),
      // Use caching to revalidate data periodically
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      // This will be caught by the error boundary
      throw new Error("Failed to fetch blogs");
    }
    const { data }: HashnodeAPIResponse = await res.json();
    const { edges, pageInfo } = data.publication.posts;
    const posts: Blog[] = edges.map((edge) => edge.node);
    const endCursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    return { posts, endCursor };
  } catch (error) {
    // Re-throwing the error will be caught by the nearest error.tsx boundary
    return { error: (error as Error).message, posts: [], endCursor: null };
  }
}
