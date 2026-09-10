"use server";

import { blogPostQuery } from "@/queries/utils";
import { Blog, BlogFetchResponse, HashnodePublication } from "@/types/blog";

import { HASHNODE_API_URL } from "@/base/constants/site";

export async function loadMoreBlogs(
  cursor: string | null,
  count: number
): Promise<BlogFetchResponse> {
  if (!cursor) {
    return { posts: [], endCursor: null, error: "No more posts to load." };
  }

  try {
    const res = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: blogPostQuery,
        variables: { postCount: count, cursor: cursor.toString() },
      }),
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

    const { data }: { data: { publication: HashnodePublication } } = await res.json();

    if (!data || !data.publication || !data.publication.posts) {
      throw new Error("Invalid response structure from blog API");
    }

    const { edges, pageInfo } = data.publication.posts;

    const posts: Blog[] = edges.map((edge) => edge.node);
    const endCursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    return { posts, endCursor, error: null };
  } catch (error) {
    return {
      posts: [],
      endCursor: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
