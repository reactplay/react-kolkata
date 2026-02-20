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
      // Provide meaningful error messages based on status code
      let errorMessage = `Failed to fetch blogs (HTTP ${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors[0]?.message) {
          errorMessage = errorData.errors[0].message;
        }
      } catch {
        // If error response is not JSON, use status-based message
        if (res.status === 429) {
          errorMessage = "Too many requests. Please try again in a moment.";
        } else if (res.status >= 500) {
          errorMessage = "Blog service is temporarily unavailable. Please try again later.";
        } else if (res.status === 403) {
          errorMessage = "Access denied to blog service.";
        }
      }
      throw new Error(errorMessage);
    }
    
    const { data }: HashnodeAPIResponse = await res.json();
    
    // Validate API response structure
    if (!data || !data.publication || !data.publication.posts) {
      throw new Error("Invalid response structure from blog API");
    }
    
    const { edges, pageInfo } = data.publication.posts;
    const posts: Blog[] = edges.map((edge) => edge.node);
    const endCursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    return { posts, endCursor, error: null };
  } catch (error) {
    // Re-throwing the error will be caught by the nearest error.tsx boundary
    return { error: (error as Error).message, posts: [], endCursor: null };
  }
}
