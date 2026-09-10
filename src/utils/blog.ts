import { blogPostQuery } from "@/queries/utils";
import { Blog, BlogFetchResponse, HashnodeAPIResponse } from "@/types/blog";

import { HASHNODE_API_URL } from "@/base/constants/site";

export async function getInitialBlogs(): Promise<BlogFetchResponse> {
  try {
    const res = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "React-Kolkata-Website (https://reactkolkata.org)",
      },
      body: JSON.stringify({
        query: blogPostQuery,
        variables: { postCount: 5, cursor: null },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      let errorMessage = `Failed to fetch blogs (HTTP ${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors[0]?.message) {
          errorMessage = errorData.errors[0].message;
        }
      } catch {
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

    if (!data || !data.publication || !data.publication.posts) {
      throw new Error("Invalid response structure from blog API");
    }

    const { edges, pageInfo } = data.publication.posts;
    const posts: Blog[] = edges.map((edge) => edge.node);
    const endCursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    return { posts, endCursor, error: null };
  } catch (error) {
    return { error: (error as Error).message, posts: [], endCursor: null };
  }
}
