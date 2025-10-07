"use server";

import { blogPostQuery } from "@/queries/utils";
import { Blog, BlogFetchResponse, HashnodePublication } from "@/types/blog";

import { HASHNODE_API_URL } from "@/base/constants/site";

/**
 * Fetches more blog posts for pagination.
 * @param cursor - The ID of the last blog post to start fetching from.
 * @returns A promise that resolves to an array of Blog posts.
 */
export async function loadMoreBlogs(
  cursor: string | null,
  count: number
): Promise<BlogFetchResponse> {
  if (!cursor) {
    return { posts: [], endCursor: null };
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
    const { data }: { data: { publication: HashnodePublication } } = await res.json();
    const { edges, pageInfo } = data.publication.posts;

    const posts: Blog[] = edges.map((edge) => edge.node);
    const endCursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    return { posts, endCursor };
  } catch (error) {
    console.error("Failed to fetch more blogs:", error);
    throw new Error("Failed to fetch more blogs.");
  }
}
